// friction — the ten signs of thin understanding.
//
// These are bookkeeping, never semantics: date math, link math, length math.
// A confidently wrong stone with tidy headers passes clean — the signs find
// where understanding is structurally thin, and minds judge whether it is
// actually thin. Every sign cites the vow it serves and labels its own
// confidence, and an empty report is only the absence of what these small
// checks know how to see.
//
// The signs work on header structure, dates, links, and length — never on
// words in a stone's body — so a stone may freely *talk about* the signs
// without tripping them. (whitehack learned this lesson the hard way.)

import { resolveLink } from './stones.js'

const DAY = 86400000
const age = (d) => Math.floor((Date.now() - Date.parse(d)) / DAY)
const lastTouch = (s) => s.keys.checked || s.keys.laid

// Order is priority order: structural damage first, then disputes, then food.
export const SIGNS = [
  {
    id: 'broken-form',
    vow: 'every stone says who laid it, when, and how sure', cs: 6,
    confidence: 'medium-high',
    structural: true, // the only two exit-code-bearing signs are structural damage
    find: ({ stones }) => stones.flatMap((s) =>
      s.problems.map((p) => ({ path: s.path, message: p }))),
  },
  {
    id: 'broken-link',
    vow: 'a lean on nothing must be seen, not silently held', cs: 2,
    confidence: 'medium-high',
    structural: true,
    find: ({ stones, root }) => stones.flatMap((s) =>
      [...s.leansOn.map((l) => ['leans-on', l]), ...s.rubsAgainst.map((l) => ['rubs-against', l])]
        .filter(([, link]) => resolveLink(s.path, link, root) === null)
        .map(([kind, link]) => ({ path: s.path, message: `${kind}: ${link} points at no stone` }))),
  },
  {
    id: 'rub',
    vow: 'two stones that dispute each other cannot both stand forever', cs: 1,
    confidence: 'medium-high',
    find: ({ stones, root }) => stones.flatMap((s) =>
      s.rubsAgainst
        .filter((link) => resolveLink(s.path, link, root) !== null)
        .map((link) => ({ path: s.path, message: `declared dispute with ${link} — a walk should settle or sharpen it` }))),
  },
  {
    id: 'unsourced',
    vow: 'nothing told enters without saying who told it', cs: 4,
    confidence: 'medium-high',
    find: ({ stones }) => stones
      .filter((s) => s.keys.certainty === 'told' && !s.keys.source)
      .map((s) => ({ path: s.path, message: 'certainty is "told" but no source line says who told it' })),
  },
  {
    id: 'unanswered',
    vow: 'friction is food — an open question is the next walk, kept visible', cs: 2,
    confidence: 'medium-high',
    find: ({ stones }) => stones
      .filter((s) => s.sections['still unknown'])
      .map((s) => ({ path: s.path, message: `still unknown: ${firstLine(s.sections['still unknown'])}` })),
  },
  {
    id: 'unshaped',
    vow: 'fetched is not known — the quarry stays quarry until a mind shapes it', cs: 5,
    confidence: 'medium-high',
    find: ({ stones, captures }) => captures
      .filter((c) => c.fetched && age(c.fetched) > 14)
      .filter((c) => !stones.some((s) => citesCapture(s.keys.source, c.path)))
      .map((c) => ({ path: c.path, message: `raw material ${age(c.fetched)} days in the quarry, cited by no stone — shape it or let it go (14 days is stated policy, not truth)` })),
  },
  {
    id: 'cold',
    vow: 'every stone says since when — the longest-untouched are named', cs: 4,
    confidence: 'heuristic',
    find: ({ stones }) => stones
      .filter((s) => s.keys.source && lastTouch(s) && !Number.isNaN(Date.parse(lastTouch(s))))
      .sort((a, b) => Date.parse(lastTouch(a)) - Date.parse(lastTouch(b)))
      .slice(0, 3)
      .map((s) => ({ path: s.path, message: `untouched for ${age(lastTouch(s))} days — a ranking, not a violation; the oldest contact is named so a walk can re-look` })),
  },
  {
    id: 'guessed',
    vow: 'a guess is honest — and a standing invitation to firm up', cs: 6,
    confidence: 'medium-high',
    find: ({ stones }) => stones
      .filter((s) => s.keys.certainty === 'guessed')
      .map((s) => ({ path: s.path, message: 'still a guess — seek, then raise or lower it honestly' })),
  },
  {
    id: 'orphan',
    vow: 'understanding is the walls between stones, not the stones alone', cs: 3,
    confidence: 'heuristic',
    find: ({ stones }) => stones
      .filter((s) => s.leansOn.length === 0 && s.rubsAgainst.length === 0 && s.inbound === 0)
      .map((s) => ({ path: s.path, message: 'no links in or out — alone is not always wrong, but it is always worth a look' })),
  },
  {
    id: 'thin',
    vow: 'one stone, one true thing — said whole', cs: 1,
    confidence: 'heuristic',
    find: ({ stones }) => stones
      .filter((s) => s.insight.length < 80)
      .map((s) => ({ path: s.path, message: s.insight.length === 0 ? 'the insight is empty — not yet written' : `the insight is ${s.insight.length} characters — too thin to lean on, or not yet written` })),
  },
]

const firstLine = (text) => text.split('\n')[0].slice(0, 100)
const basename = (p) => p.split('/').pop()
// A citation must name the capture's filename as a whole token — "a.md" must
// not count as citing "2026-a.md" or vice versa.
const citesCapture = (source, capturePath) => {
  if (!source) return false
  const esc = basename(capturePath).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return new RegExp(`(^|[\\s/("'])${esc}([\\s)"',;]|$)`).test(source)
}

// Run every sign. Findings come back keep-room-first (friction in the loop
// compounds into every future walk), then in priority order.
export function friction({ stones, captures, root }) {
  const findings = []
  for (const sign of SIGNS) {
    for (const f of sign.find({ stones, captures, root })) {
      findings.push({ sign: sign.id, vow: sign.vow, cs: sign.cs, confidence: sign.confidence, structural: !!sign.structural, ...f })
    }
  }
  const keepFirst = (f) => (f.path.startsWith('rooms/keep/') ? 0 : 1)
  const priority = (f) => SIGNS.findIndex((s) => s.id === f.sign)
  findings.sort((a, b) => keepFirst(a) - keepFirst(b) || priority(a) - priority(b))
  return findings
}

export const fingerprint = (f) => `${f.sign}:${f.path}`
