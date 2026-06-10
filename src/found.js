// found — castles reproduce by seed, not by template.
//
// A new castle's keep is copied from THIS castle's keep — the living stones,
// not strings frozen in code — so a child inherits its mother's current
// understanding of itself, lineage stated on every stone. One deliberate
// exception: the child's reins are forced to "off". A newly founded castle
// never starts with its motor running; turning it on is a hand's first
// deliberate act.

import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { today } from './stones.js'

const MOTHER = join(dirname(fileURLToPath(import.meta.url)), '..')

export async function found(root) {
  // Look upward too: a castle is never founded inside another castle.
  for (let d = root; ; d = dirname(d)) {
    if (existsSync(join(d, 'rooms', 'keep'))) {
      console.log(`a castle already stands at ${d} — found refuses politely. (one ground, one castle.)`)
      return 1
    }
    if (dirname(d) === d) break
  }
  const motherKeep = join(MOTHER, 'rooms', 'keep')
  if (!existsSync(motherKeep)) throw new Error('the mother castle has no keep — cannot seed a child. (was the package stripped?)')

  for (const dir of ['rooms/keep', 'quarry', 'ledger']) await mkdir(join(root, dir), { recursive: true })

  let n = 0
  for (const name of (await readdir(motherKeep)).filter((f) => f.endsWith('.md'))) {
    let text = await readFile(join(motherKeep, name), 'utf8')
    text = text.replace(/^- laid: .*$/m, `- laid: ${today()}`)
    if (!text.includes('- lineage:')) {
      text = text.replace(/^(- laid: .*)$/m, `$1\n- lineage: seeded at found time from the keep of ${MOTHER}`)
    }
    if (name === 'the-reins.md') text = text.replace(/^- autonomy: .*$/m, '- autonomy: off')
    await writeFile(join(root, 'rooms/keep', name), text)
    n++
  }
  console.log(`a castle is founded. ${n} keep stones seeded (reins: off — the motor waits for a hand).`)
  console.log('lay your first stone: castle lay <room> "<one true thing>"')
  return 0
}
