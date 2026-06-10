// auto — the motor. One autonomous walk: open, ask the engine, lay at most
// one new stone, close. Built to be safe before it is clever.
//
// The safety shape, stated once and enforced here:
//   - the engine is a text-only oracle. it is SHOWN the walk and ANSWERS in
//     words; it never touches the filesystem. only this runner writes, and
//     only inside the castle.
//   - autonomous walks CREATE new files only. they never edit, raze, or
//     overwrite anything — mending is for hands. a proposal stone in the keep
//     is how the motor asks for a change.
//   - the engine command is fixed in code on purpose. the reins stone chooses
//     whether and how often the motor runs — never WHAT runs. data must not
//     be able to choose a program.
//   - the reins (rooms/keep/the-reins.md) are read, never written, by this
//     file. the horse does not hold its own reins.
//   - certainty is capped at told/reasoned/guessed — an engine that has not
//     acted in the world cannot claim "tested".
//   - every autonomous walk is stamped autonomous in the ledger, and a failed
//     or empty answer is recorded, not hidden. visible failure over silent
//     success.

import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, resolve, relative, dirname } from 'node:path'
import { spawnSync } from 'node:child_process'
import { parseStone, slug, today, CERTAINTY } from './stones.js'
import { openWalk, closeWalk, isWalk } from './loop.js'

const REINS_STONE = 'rooms/keep/the-reins.md'
// The PROGRAM is fixed in code — the reins choose whether and how often the
// motor runs, never WHAT runs. Data must not be able to choose a program.
const ENGINE_CMD = 'claude'
const ENGINE_ARGS = ['-p', '--output-format', 'text'] // fixed; prompt arrives on stdin
const MAX_STONE_CHARS = 6_000

export async function readReins(root) {
  const path = join(root, REINS_STONE)
  if (!existsSync(path)) return { autonomy: 'off', reason: `${REINS_STONE} is missing — no reins, no motor.` }
  const text = await readFile(path, 'utf8')
  const key = (k, fallback) => text.match(new RegExp(`^- ${k}: (.+)$`, 'm'))?.[1]?.trim() ?? fallback
  return {
    autonomy: key('autonomy', 'off'),
    // walks-per-day rations engine walks, not stones — a failed or honest-pass
    // walk still spends the day's walk. (stones-per-day read for old castles.)
    walksPerDay: Number(key('walks-per-day', key('stones-per-day', '1'))) || 1,
  }
}

async function autoWalksToday(root) {
  try {
    const dir = join(root, 'ledger')
    let n = 0
    for (const f of (await readdir(dir)).filter(isWalk)) {
      const text = await readFile(join(dir, f), 'utf8')
      if (text.includes('(ai, autonomous)') && text.includes(`- opened: ${today()}`)) n++
    }
    return n
  } catch { return 0 }
}

function askEngine(prompt) {
  // The engine answers as text. No tools are granted; in non-interactive mode
  // it cannot approve any, so its only power is words on stdout.
  const res = spawnSync(ENGINE_CMD, ENGINE_ARGS, {
    input: prompt, encoding: 'utf8', timeout: 300_000, maxBuffer: 10 * 1024 * 1024,
  })
  if (res.error) return { err: `the engine did not run: ${res.error.message}` }
  if (res.status !== 0) return { err: `the engine exited ${res.status}: ${(res.stderr || '').slice(0, 300)}` }
  return { out: res.stdout }
}

const part = (out, name) => {
  const m = out.match(new RegExp(`^=== ${name} ===\\s*\\n([\\s\\S]*?)(?=^=== |$(?![\\s\\S]))`, 'm'))
  return m ? m[1].trim() : null
}

async function buildPrompt(root, walk) {
  const keepStone = async (name) => {
    try { return await readFile(join(root, 'rooms/keep', name), 'utf8') } catch { return `(${name} is missing)` }
  }
  const onTable = []
  for (const f of walk.findings) {
    try { onTable.push(`--- ${f.path} ---\n${await readFile(join(root, f.path), 'utf8')}`) } catch { /* a finding may point at a vanished file; the packet already says so */ }
  }
  const packet = await readFile(walk.path, 'utf8')
  return `You are the autonomous engine of a castle of understanding — a folder of plain-markdown stones on this device. A walk has been opened for you. You answer in words only: you cannot touch files. The runner will lay AT MOST ONE new stone from your answer, exactly as the rules below say.

THE LAW (rooms/keep/the-law.md):
${await keepStone('the-law.md')}

THE STONE FORM (rooms/keep/the-stone-form.md):
${await keepStone('the-stone-form.md')}

THE WALK PACKET (ledger/${walk.n}):
${packet.replace(/<!-- friction-fingerprints-at-open:.*?-->/s, '')}

THE STONES AND CAPTURES ON THE TABLE:
${onTable.join('\n\n') || '(none — the findings carry their own context)'}

RULES THE RUNNER ENFORCES (it refuses, it does not trust):
- You may LAY one new stone only. You cannot edit, raze, or overwrite existing stones, and you cannot touch the reins. If the friction calls for an edit (a source to add, a certainty to move, a dispute to settle), lay a proposal stone in room "keep" that says exactly what to change and why — a hand will do it on a later walk.
- Your certainty may be reasoned, told, or guessed — never tested. You have not acted in the world.

ASKED OF YOU (the runner cannot check these — honesty here is yours):
- Pick exactly ONE finding from "the friction on the table". Walk small.
- Write in your own words. Claim only what you actually conclude. Joy is welcome; overclaiming is not.
- If no finding can honestly be advanced by words alone, say so under "picked" and leave the stone section empty. An honest pass lays no stone, and that is a good walk too.

ANSWER EXACTLY IN THIS SHAPE (the === lines are required):

=== picked ===
(the one finding you chose, and why — or why you pass)
=== stone ===
room: <existing room name, or a new lowercase-hyphen name>
# <title — the insight, named honestly>

- laid: (runner stamps)
- by: (runner stamps)
- certainty: <reasoned|told|guessed>
- source: <where this came from — name the stones or captures you leaned on>
- leans-on: <relative path from the new stone to a stone it builds on; repeat the line per link; omit if none>

<first paragraph: the one true thing, in your own words>

## because
<your reasoning — inspectable>

## still unknown
<the honest open edge this stone leaves>
=== laid or mended ===
(one or two sentences: what you laid and which friction it answers)
=== the loop examined ===
(did the procedure mislead, block, or bore you? "ran clean" if not — blank is not an answer)`
}

// Lay the engine's stone — with every safety rail between its words and the
// disk. Exported so the selftest can walk every rail without spawning an
// engine; the engine itself gains nothing, it only ever emits text.
export async function layEngineStone(root, stoneText, engineName) {
  const roomMatch = stoneText.match(/^room: ([a-z0-9/-]+)\s*\n/)
  if (!roomMatch) return { err: 'no "room:" line — nothing laid' }
  const room = roomMatch[1].replace(/\.\./g, '').replace(/^\/+|\/+$/g, '')
  if (!room) return { err: 'room name empty after sanitizing — nothing laid' }
  let body = stoneText.slice(roomMatch[0].length).trim()
  if (body.length > MAX_STONE_CHARS) return { err: `stone is ${body.length} chars (cap ${MAX_STONE_CHARS}) — a stone is one insight, not an essay. nothing laid` }

  const parsed = parseStone(body)
  if (!parsed.title) return { err: 'no title line — nothing laid' }
  if (!['reasoned', 'told', 'guessed'].includes(parsed.keys.certainty)) {
    return { err: `certainty "${parsed.keys.certainty}" not allowed for the motor (reasoned|told|guessed) — nothing laid` }
  }

  // The runner stamps the truth of provenance; the engine's own claims for
  // these lines are discarded — every such line, not just the first.
  body = body
    .replace(/^- laid: .*$/gm, `- laid: ${today()}`)
    .replace(/^- by: .*$/gm, `- by: ${engineName} (ai, autonomous)`)
  // If the engine omitted the stamp lines, add them — the runner, not the
  // engine, is the authority on provenance.
  if (!/^- laid: /m.test(body)) body = body.replace(/^(# .*)$/m, `$1\n\n- laid: ${today()}`)
  if (!/^- by: /m.test(body)) body = body.replace(/^(- laid: .*)$/m, `$1\n- by: ${engineName} (ai, autonomous)`)
  // One stone, one provenance. A second laid/by/certainty line is the engine
  // speaking where only the runner may — refuse the whole stone.
  for (const key of ['laid', 'by', 'certainty']) {
    const count = (body.match(new RegExp(`^- ${key}: `, 'gm')) || []).length
    if (count > 1) return { err: `${count} "- ${key}:" lines — the runner stamps provenance once. nothing laid` }
  }

  // Final gate: the stone must stand whole after stamping — the motor never
  // lays structural damage.
  const final = parseStone(body)
  if (final.problems.length) return { err: `the stone would be broken-form (${final.problems[0]}) — nothing laid` }

  const dir = join(root, 'rooms', room)
  const path = join(dir, slug(parsed.title) + '.md')
  const rel = relative(root, path)
  if (!resolve(path).startsWith(resolve(root, 'rooms') + '/')) return { err: 'stone path escaped rooms/ — nothing laid' }
  if (rel === REINS_STONE) return { err: 'the motor tried to touch the reins — nothing laid' }
  if (existsSync(path)) return { err: `a stone already stands at ${rel} — the motor never overwrites. nothing laid` }

  // A lean on nothing would be structural damage laid by a machine — drop the
  // link and say so, rather than wound the castle.
  const dropped = []
  body = body.split('\n').filter((line) => {
    const m = line.match(/^- (leans-on|rubs-against): (.+)$/)
    if (!m) return true
    if (existsSync(resolve(dirname(path), m[2].trim()))) return true
    dropped.push(m[2].trim())
    return false
  }).join('\n')

  await mkdir(dir, { recursive: true })
  await writeFile(path, body.trimEnd() + '\n')
  return { laid: rel, dropped }
}

async function fillSection(packetPath, name, text) {
  const packet = await readFile(packetPath, 'utf8')
  // The engine's words are shown verbatim but inset four spaces — they can
  // never become the packet's own structure.
  await writeFile(packetPath, packet.replace(new RegExp(`(^## ${name}\\s*\\n)`, 'm'), `$1\n${text.replace(/^/gm, '    ')}\n`))
}

export async function autoWalk(root) {
  // The standing castle's kill switch stops this motor too — one castle, one
  // STOP, no matter whose wing the motor lives in. Checking costs nothing.
  if (existsSync(join(root, 'loops', 'STOP'))) {
    console.log('loops/STOP exists — the castle-wide stop. the motor rests. (remove the file to resume.)')
    return 0
  }
  const reins = await readReins(root)
  if (reins.autonomy !== 'on') {
    console.log(reins.reason || `the reins are off (${REINS_STONE}) — no autonomous walk. that is obedience, not failure.`)
    return 0
  }
  const already = await autoWalksToday(root)
  if (already >= reins.walksPerDay) {
    console.log(`the motor already walked ${already}x today (reins: walks-per-day ${reins.walksPerDay}) — resting. peace over pace.`)
    return 0
  }

  const by = `${ENGINE_CMD} (ai, autonomous)`
  const walk = await openWalk(root, { by })
  console.log(`walk ${walk.n} opened by the motor — ${walk.totalFriction} findings, ${walk.findings.length} on the table.`)

  const fail = async (msg) => {
    await fillSection(walk.path, 'picked', msg)
    await fillSection(walk.path, 'laid or mended', 'nothing — the walk failed before laying. visible failure over silent success.')
    await fillSection(walk.path, 'the loop examined', 'the walk did not reach this step.')
    await closeWalk(root, walk.n, { by })
    console.error(`walk ${walk.n}: ${msg}`)
    return 1
  }

  const prompt = await buildPrompt(root, walk)
  const answer = askEngine(prompt)
  if (answer.err) return fail(`the engine did not answer: ${answer.err}`)

  const picked = part(answer.out, 'picked')
  const stoneText = part(answer.out, 'stone')
  const laidOrMended = part(answer.out, 'laid or mended')
  const examined = part(answer.out, 'the loop examined')
  if (!picked || !laidOrMended || !examined) return fail('the answer was malformed (missing sections) — nothing laid.')

  // The engine can think for minutes. Check the kill switch and the reins
  // again before touching disk — a STOP touched mid-walk stops THIS walk,
  // not just the next one.
  if (existsSync(join(root, 'loops', 'STOP'))) {
    return fail('loops/STOP appeared while the engine was thinking — nothing laid. the motor rests.')
  }
  if ((await readReins(root)).autonomy !== 'on') {
    return fail('the reins turned off while the engine was thinking — nothing laid. that is obedience, not failure.')
  }

  let laidNote = 'nothing laid — the engine passed honestly.'
  if (stoneText) {
    const result = await layEngineStone(root, stoneText, ENGINE_CMD)
    if (result.err) return fail(result.err)
    laidNote = `laid ${result.laid}` + (result.dropped.length ? ` (dropped link(s) to nothing: ${result.dropped.join(', ')})` : '')
  }

  await fillSection(walk.path, 'picked', picked)
  await fillSection(walk.path, 'laid or mended', `${laidNote}\n\n${laidOrMended}`)
  await fillSection(walk.path, 'the loop examined', examined)
  const closed = await closeWalk(root, walk.n, { by })
  console.log(`walk ${walk.n} closed — ${laidNote}`)
  console.log(`friction before: ${closed.before} — after: ${closed.after} — new: ${closed.fresh}`)
  return 0
}
