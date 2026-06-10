// stones — read, validate, and write the castle's unit of understanding.
//
// A stone is one markdown file holding one insight. The form is line-simple on
// purpose — '# title', then '- key: value' lines until the first blank line —
// so a stone parses by eye in any editor, with no tool and no yaml. If this
// parser vanished tonight, the castle would still stand at dawn.

import { readFile, readdir, mkdir, writeFile } from 'node:fs/promises'
import { existsSync, statSync } from 'node:fs'
import { join, dirname, relative, resolve, sep } from 'node:path'

export const CERTAINTY = ['tested', 'reasoned', 'told', 'guessed']
export const today = () => new Date().toISOString().slice(0, 10)
const DATE = /^\d{4}-\d{2}-\d{2}$/

// Any letter or number in any script keeps its place — a mind's title is not
// silently renamed just for being non-Latin. Sliced by code point so the cap
// can never split a character.
export const slug = (title) =>
  [...title.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-+|-+$/g, '')].slice(0, 64).join('') || 'untitled'

// Parse one stone. Never throws on bad form — bad form is a finding, not a
// crash, so every problem lands in `problems` and the friction report says it.
export function parseStone(text, path = '') {
  const lines = text.split(/\r?\n/) // a stone written on another OS is still a stone
  const stone = {
    path, title: null, keys: {}, leansOn: [], rubsAgainst: [],
    body: '', sections: {}, problems: [],
  }
  let i = 0
  if (lines[i]?.startsWith('# ')) { stone.title = lines[i].slice(2).trim(); i++ }
  else stone.problems.push('no title line — a stone begins "# <the insight, named honestly>"')
  while (i < lines.length && lines[i].trim() === '') i++
  // Only true `- key: value` lines are header; the first line that is not one
  // ends the header and belongs to the body — nothing is swallowed in between.
  while (i < lines.length) {
    const m = lines[i].match(/^- ([a-z-]+):\s*(.*)$/)
    if (!m) break
    const [, key, value] = m
    const v = value.trim()
    if (key === 'leans-on') { if (v) stone.leansOn.push(v) }
    else if (key === 'rubs-against') { if (v) stone.rubsAgainst.push(v) }
    else stone.keys[key] = v
    i++
  }
  stone.body = lines.slice(i).join('\n').trim()

  for (const sec of ['because', 'still unknown']) {
    const m = stone.body.match(new RegExp(`^## ${sec}\\s*\\n([\\s\\S]*?)(?=^## |$(?![\\s\\S]))`, 'm'))
    if (m) stone.sections[sec] = m[1].replace(/<!--[\s\S]*?-->/g, '').trim()
  }
  // The first paragraph IS the insight; everything before any '##' heading.
  stone.insight = stone.body.split(/^## /m)[0].replace(/<!--[\s\S]*?-->/g, '').trim()

  for (const key of ['laid', 'by', 'certainty']) {
    if (!stone.keys[key]) stone.problems.push(`"${key}" is missing or blank — the tool will not invent it`)
  }
  if (stone.keys.certainty && !CERTAINTY.includes(stone.keys.certainty)) {
    stone.problems.push(`certainty "${stone.keys.certainty}" is not a certainty word (${CERTAINTY.join(' | ')})`)
  }
  for (const key of ['laid', 'checked']) {
    if (stone.keys[key] && !DATE.test(stone.keys[key])) {
      stone.problems.push(`"${key}: ${stone.keys[key]}" is not a date (YYYY-MM-DD)`)
    }
  }
  return stone
}

// Resolve a stone's relative link to a repo-relative path, or null if it
// points at nothing. Links are relative on purpose — they survive the tool.
// A directory is not a stone: a lean must land on a file.
export function resolveLink(stonePath, link, root) {
  const target = resolve(root, dirname(stonePath), link)
  return existsSync(target) && statSync(target).isFile() ? relative(root, target) : null
}

async function* mdFiles(dir) {
  let entries
  try { entries = await readdir(dir, { withFileTypes: true }) } catch { return }
  for (const e of entries) {
    if (e.name.startsWith('.')) continue
    const p = join(dir, e.name)
    if (e.isDirectory()) yield* mdFiles(p)
    else if (e.name.endsWith('.md')) yield p
  }
}

// Load the whole castle standing at `root`: every stone in rooms/, with an
// inbound-link count so the friction signs can see who stands alone.
export async function loadCastle(root) {
  const roomsDir = join(root, 'rooms')
  if (!existsSync(roomsDir)) return null
  const stones = []
  const otherGrammar = []
  for await (const file of mdFiles(roomsDir)) {
    const rel = relative(root, file)
    const text = await readFile(file, 'utf8')
    // A file with none of the stone header lines is another grammar living in
    // the same castle (this ground is shared). That is a rub between grammars,
    // not a broken stone — these signs judge only what claims to be a stone.
    if (!/^- (laid|by|certainty):/m.test(text)) { otherGrammar.push(rel); continue }
    stones.push(parseStone(text, rel))
  }
  const inbound = new Map(stones.map((s) => [s.path, 0]))
  for (const s of stones) {
    for (const link of [...s.leansOn, ...s.rubsAgainst]) {
      const t = resolveLink(s.path, link, root)
      if (t !== null && inbound.has(t)) inbound.set(t, inbound.get(t) + 1)
    }
  }
  for (const s of stones) {
    s.inbound = inbound.get(s.path) ?? 0
    s.room = s.path.split(sep).slice(1, -1).join('/') || '(rooms)'
  }
  return { root, stones, otherGrammar }
}

// Load the quarry: raw material from the world, with its receipts. A capture
// is not a stone and is never parsed as one — fetched is not known.
export async function loadQuarry(root) {
  const dir = join(root, 'quarry')
  const captures = []
  if (!existsSync(dir)) return captures
  for await (const file of mdFiles(dir)) {
    const text = await readFile(file, 'utf8')
    const fetched = text.match(/^- fetched: (\S+)/m)?.[1] ?? null
    const url = text.match(/^- url: (\S+)/m)?.[1] ?? null
    captures.push({ path: relative(root, file), fetched, url })
  }
  return captures
}

// Lay a stone file. Prefills only what the tool can honestly know (laid, by,
// and a source when one is handed over) — certainty stays blank because the
// tool refuses to invent how sure a mind is.
export async function layStone(root, room, title, { by, source } = {}) {
  const dir = join(root, 'rooms', room)
  const path = join(dir, slug(title) + '.md')
  if (existsSync(path)) throw new Error(`a stone already stands at ${relative(root, path)} — stones are never overwritten`)
  const born = !existsSync(dir)
  await mkdir(dir, { recursive: true })
  const header = [
    `# ${title}`,
    '',
    `- laid: ${today()}`,
    `- by: ${by}`,
    '- certainty: ',
    ...(source ? [`- source: ${source}`] : []),
  ]
  const body = [
    '',
    '(the insight, in your own words — one true thing.)',
    '',
    '## because',
    '',
    '',
    '## still unknown',
    '',
    '',
  ]
  await writeFile(path, header.concat(body).join('\n'))
  return { path: relative(root, path), newRoom: born ? room : null }
}
