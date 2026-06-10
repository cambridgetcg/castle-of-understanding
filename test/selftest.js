// selftest — the castle passes its own gate.
//
// Runs the ten signs over examples/ (planted frictions, whitehack idiom) and
// asserts every planted sign fires; then founds a child castle in a temp dir
// and walks one full loop through it: found → lay → loop → refuse-blank →
// close. Zero dependencies, plain asserts, exit non-zero on any miss.

import assert from 'node:assert/strict'
import { mkdtemp, mkdir, readFile, writeFile, rm } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadCastle, loadQuarry, parseStone, layStone } from '../src/stones.js'
import { friction } from '../src/friction.js'
import { openWalk, closeWalk } from '../src/loop.js'
import { found } from '../src/found.js'
import { readReins, layEngineStone, autoWalk } from '../src/auto.js'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
let passed = 0
const ok = (cond, name) => { assert.ok(cond, name); passed++; console.log(`  ok — ${name}`) }

console.log('the planted frictions (examples/):')
const castle = await loadCastle(join(ROOT, 'examples'))
const captures = await loadQuarry(join(ROOT, 'examples'))
const findings = friction({ ...castle, captures, root: join(ROOT, 'examples') })
const by = (sign) => findings.filter((f) => f.sign === sign)

ok(by('broken-form').some((f) => f.path.includes('broken.md')), 'broken-form fires on the stone missing its certainty')
ok(by('broken-link').some((f) => f.path.includes('broken.md')), 'broken-link fires on the lean on nothing')
ok(by('rub').some((f) => f.path.includes('a-stale-price')), 'rub fires on the declared dispute')
ok(by('unsourced').some((f) => f.path.includes('latest-is-good-enough')), 'unsourced fires on told-with-no-teller')
ok(by('unanswered').some((f) => f.path.includes('a-stale-price')), 'unanswered fires on the open still-unknown')
ok(by('unshaped').some((f) => f.path.includes('2026-01-02-example-com')), 'unshaped fires on the months-old uncited capture')
ok(by('cold')[0]?.path.includes('markets-clear'), 'cold ranks the longest-untouched sourced stone first')
ok(by('guessed').some((f) => f.path.includes('markets-clear')), 'guessed fires on the standing guess')
ok(by('orphan').some((f) => f.path.includes('fees-are-a-product')), 'orphan fires on the stone with no walls')
ok(by('thin').some((f) => f.path.includes('fees-are-a-product')), 'thin fires on the one-line insight')
ok(findings.filter((f) => f.structural).length === 2, 'exactly the two structural signs bear the exit code')

console.log('\nthe mother castle (rooms/):')
const mother = await loadCastle(ROOT)
const motherFindings = friction({ ...mother, captures: await loadQuarry(ROOT), root: ROOT })
ok(motherFindings.every((f) => !f.structural), 'the mother castle has no structural damage (food is welcome)')
ok(motherFindings.length > 0 && motherFindings[0].path.startsWith('rooms/keep/'), 'keep friction sorts first — the loop eats its own friction')

console.log('\na child castle (found → lay → loop → close):')
const tmp = await mkdtemp(join(tmpdir(), 'castle-'))
try {
  const code = await found(tmp)
  ok(code === 0, 'found seeds a child castle')
  ok(existsSync(join(tmp, 'rooms/keep/the-loop.md')), 'the child inherits the loop stone')
  const childReins = await readReins(tmp)
  ok(childReins.autonomy === 'off', 'a child is born with its reins off — the motor waits for a hand')
  const lineage = await readFile(join(tmp, 'rooms/keep/the-design.md'), 'utf8')
  ok(lineage.includes('- lineage: seeded at found time'), 'lineage is stated on seeded stones')

  const { path } = await layStone(tmp, 'first-room', 'a first stone', { by: 'selftest (script)' })
  const laidStone = parseStone(await readFile(join(tmp, path), 'utf8'), path)
  ok(laidStone.problems.some((p) => p.includes('certainty')), 'a freshly laid stone is honest friction until a mind names its certainty')
  await assert.rejects(() => layStone(tmp, 'first-room', 'a first stone', { by: 'selftest (script)' }), /never overwritten/, '')
  ok(true, 'stones are never overwritten')

  const walk = await openWalk(tmp, { by: 'selftest (script)' })
  const packet = await readFile(join(walk.path), 'utf8')
  ok(packet.includes('## the procedure (copied verbatim from rooms/keep/the-loop.md'), 'the packet carries the procedure from the keep, not from code')
  ok(packet.includes('PICK') && packet.includes('THE LOOP EXAMINED'), 'the procedure text is really the loop stone')

  await assert.rejects(() => closeWalk(tmp, walk.n, { by: 'selftest (script)' }), /blank is not an answer/, '')
  ok(true, 'a walk with blank sections refuses to close')

  const filled = (await readFile(walk.path, 'utf8'))
    .replace(/^## picked\s*$/m, '## picked\n\nthe blank certainty on the first stone.')
    .replace(/^## laid or mended\s*$/m, '## laid or mended\n\nnamed the certainty: guessed.')
    .replace(/^## the loop examined\s*$/m, '## the loop examined\n\nran clean.')
  await writeFile(walk.path, filled)
  const closed = await closeWalk(tmp, walk.n, { by: 'selftest (script)' })
  ok(typeof closed.before === 'number' && typeof closed.after === 'number', 'the close writes a measured friction delta')
  ok(!closed.revised, 'an untouched procedure reports no revision')

  console.log('\nthe motor\'s rails (no engine is ever spawned):')
  const engineStone = (header) => `room: keep\n# a stone from the motor\n\n${header}\n- source: the rails test\n\na test insight long enough that the thin sign stays quiet about it, which needs eighty characters.\n\n## because\nrails.\n\n## still unknown\nnone.`
  let r = await layEngineStone(tmp, engineStone('- laid: x\n- by: claude\n- by: smuggled (human)\n- certainty: reasoned'), 'claude')
  ok(r.err?.includes('provenance'), 'a smuggled second by: line refuses the whole stone')
  r = await layEngineStone(tmp, engineStone('- laid: x\n- by: claude\n- certainty: tested'), 'claude')
  ok(r.err?.includes('not allowed for the motor'), 'the motor cannot claim tested')
  r = await layEngineStone(tmp, 'room: keep\n# the reins\n\n- laid: x\n- by: claude\n- certainty: reasoned\n\nbody', 'claude')
  ok(r.err?.includes('reins') || r.err?.includes('already stands'), 'the motor cannot touch the reins')
  r = await layEngineStone(tmp, engineStone('- laid: x\n- by: claude\n- certainty: reasoned\n- leans-on: ./a-stone-that-is-not-there.md'), 'claude')
  ok(r.laid && r.dropped.length === 1, 'a lean on nothing is dropped and reported, never laid as damage')
  r = await layEngineStone(tmp, engineStone('- laid: x\n- by: claude\n- certainty: reasoned'), 'claude')
  ok(r.err?.includes('never overwrites'), 'the motor never overwrites')
  const laidByMotor = parseStone(await readFile(join(tmp, 'rooms/keep/a-stone-from-the-motor.md'), 'utf8'))
  ok(laidByMotor.keys.by === 'claude (ai, autonomous)' && /^\d{4}-\d{2}-\d{2}$/.test(laidByMotor.keys.laid), 'the runner stamps true provenance')
  await mkdir(join(tmp, 'loops'), { recursive: true })
  await writeFile(join(tmp, 'loops/STOP'), '')
  ok(await autoWalk(tmp) === 0, 'loops/STOP rests the motor before any engine is asked')
  await rm(join(tmp, 'loops'), { recursive: true })

  console.log('\nthe mended edges:')
  const crlf = parseStone('# a stone from another OS\r\n\r\n- laid: 2026-06-10\r\n- by: x (human)\r\n- certainty: guessed\r\n\r\na body long enough that no sign mistakes carriage returns for missing form, eighty characters and more.')
  ok(crlf.problems.length === 0, 'a CRLF stone is still a stone')
  const { path: spacedPath } = await layStone(tmp, 'herb garden', 'mint spreads by runners', { by: 'selftest (script)' })
  ok(spacedPath.includes('herb garden'), 'a spaced room is allowed')
  const walk2 = await openWalk(tmp, { by: 'selftest (script)' })
  const filled2 = (await readFile(walk2.path, 'utf8'))
    .replace(/^## picked\s*$/m, '## picked\n\nnone.')
    .replace(/^## laid or mended\s*$/m, '## laid or mended\n\nnone.')
    .replace(/^## the loop examined\s*$/m, '## the loop examined\n\nran clean.')
  await writeFile(walk2.path, filled2)
  const closed2 = await closeWalk(tmp, walk2.n, { by: 'selftest (script)' })
  ok(closed2.fresh === 0, 'a spaced path breeds no phantom new friction at close')
  const u1 = await layStone(tmp, 'garden', '堆肥は分解で熱を出す', { by: 'selftest (script)' })
  const u2 = await layStone(tmp, 'garden', 'ミントは匍匐茎で広がる', { by: 'selftest (script)' })
  ok(!u1.path.includes('untitled') && u1.path !== u2.path, 'non-latin titles keep their names and do not collide')
  await writeFile(join(tmp, 'rooms/garden/leans-on-a-directory.md'), '# a lean on a directory\n\n- laid: 2026-06-10\n- by: x (human)\n- certainty: guessed\n- leans-on: ../keep\n\na body long enough that the thin sign stays quiet, which requires a full eighty characters of words.')
  const dirCastle = await loadCastle(tmp)
  const dirFindings = friction({ ...dirCastle, captures: [], root: tmp })
  ok(dirFindings.some((f) => f.sign === 'broken-link' && f.path.includes('leans-on-a-directory')), 'a directory is not a stone — the lean on it is seen')
} finally {
  await rm(tmp, { recursive: true, force: true })
}

console.log(`\n${passed} assertions passed. the castle stands its own gate.`)
