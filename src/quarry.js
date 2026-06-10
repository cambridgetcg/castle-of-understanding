// quarry — contact with the world, one chosen page at a time.
//
// The quarry holds raw material with its receipts: url, fetched date, http
// status. It is explicitly NOT understanding — no command in this tool will
// ever turn a capture into a stone, because fetched is not known. A failed
// fetch still writes a capture recording the failure: the quarry never
// pretends a page was read.

import { writeFile, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, relative } from 'node:path'
import { today } from './stones.js'

const MAX_CHARS = 200_000 // a capture is for reading, not archiving — truncation is stated in the capture

// Crude on purpose, and the capture says so: tags stripped, scripts dropped,
// entities barely decoded. JS-rendered pages and paywalls come back thin or
// broken — the capture records what actually arrived, not what a browser
// would have seen.
function extractText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\s*\n\s*\n+/g, '\n\n')
    .trim()
}

const slugUrl = (url) => {
  try {
    const u = new URL(url)
    return (u.hostname + u.pathname).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60)
  } catch { return 'unparseable-url' }
}

async function save(root, name, lines) {
  const dir = join(root, 'quarry')
  await mkdir(dir, { recursive: true })
  let path = join(dir, `${today()}-${name}.md`)
  for (let n = 2; existsSync(path); n++) path = join(dir, `${today()}-${name}-${n}.md`)
  await writeFile(path, lines.join('\n') + '\n')
  return relative(root, path)
}

export async function quarryUrl(root, url) {
  let status = 'fetch failed'
  let text = ''
  let note = ''
  try {
    const res = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(30_000) })
    status = String(res.status)
    text = extractText(await res.text())
    if (text.length > MAX_CHARS) { text = text.slice(0, MAX_CHARS); note = `truncated at ${MAX_CHARS} characters — the page went on, this capture does not` }
  } catch (e) {
    // undici hides the real reason (ENOTFOUND, ECONNREFUSED) in e.cause; a
    // receipt that cannot say WHY is a weak receipt.
    const why = e.cause?.code || e.cause?.message || e.message
    note = `the fetch failed: ${why} — this capture records the failure so the attempt is not forgotten`
  }
  const path = await save(root, slugUrl(url), [
    `# capture: ${url}`,
    '',
    `- url: ${url}`,
    `- fetched: ${today()}`,
    `- status: ${status}`,
    '- extraction: crude — tags stripped by a small regex, not a browser; what follows may be partial or mangled',
    ...(note ? [`- note: ${note}`] : []),
    '',
    'this is raw material, not understanding. fetched is not known — shape it',
    'into a stone in your own words (`castle lay <room> "<title>" --from <this file>`),',
    'or let it go.',
    '',
    '---',
    '',
    text,
  ])
  return { path, ok: !note || note.startsWith('truncated') }
}

export async function quarryStdin(root, stdinText) {
  const path = await save(root, 'pasted', [
    '# capture: pasted by hand',
    '',
    '- url: (pasted — no url; say where it came from when you shape it)',
    `- fetched: ${today()}`,
    '- status: pasted',
    '- extraction: none — kept exactly as pasted',
    '',
    'this is raw material, not understanding. fetched is not known.',
    '',
    '---',
    '',
    stdinText.trim(),
  ])
  return { path, ok: true }
}
