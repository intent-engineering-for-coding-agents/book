// Fails when a tracked Markdown file lacks `type` and `title` front matter,
// or when `title` no longer matches the file's first H1.
// Usage: node scripts/check-frontmatter.mjs [pathspec ...]   (default: all tracked *.md)
import fs from 'node:fs'
import { execFileSync } from 'node:child_process'

// Named exceptions, each with a reason. A file belongs here only when a consumer
// pastes or renders it verbatim, so a header would leak into the output.
const EXCEPTIONS = new Set([
  '.github/PULL_REQUEST_TEMPLATE.md', // the forge pastes it into every pull request body
  '.github/profile/README.md', // the organization profile page renders it, header included
  'eval/01-update-index/task.md', // eval prompts are handed to the agent verbatim
  'eval/02-review-chapter/task.md',
  'eval/03-update-sidebar/task.md',
])

const specs = process.argv.length > 2 ? process.argv.slice(2) : ['*.md']
const files = execFileSync('git', ['ls-files', ...specs], { encoding: 'utf8' })
  .split('\n')
  .filter((f) => f.endsWith('.md') && !EXCEPTIONS.has(f))

const unquote = (v) => {
  v = v.trim()
  if (v.startsWith('"')) { try { return JSON.parse(v) } catch { return v } }
  return v
}

const problems = []
for (const f of files) {
  const text = fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n')
  const end = text.startsWith('---\n') ? text.indexOf('\n---\n', 4) : -1
  if (end < 0) { problems.push(`${f}: no front matter`); continue }
  const fm = text.slice(4, end)
  const get = (k) => (fm.match(new RegExp(`^${k}:[ \t]*(.+)$`, 'm')) || [])[1]
  const type = get('type')
  const title = get('title')
  if (!type) problems.push(`${f}: missing type`)
  if (!title) { problems.push(`${f}: missing title`); continue }
  const h1 = text.slice(end + 5).match(/^# (.+)$/m)
  if (h1 && type && type.trim() !== 'home' && unquote(title) !== h1[1].trim()) {
    problems.push(`${f}: title "${unquote(title)}" does not match H1 "${h1[1].trim()}"`)
  }
}

if (problems.length) {
  console.error(problems.join('\n'))
  console.error(`\n${problems.length} problem(s) in ${files.length} file(s).`)
  process.exit(1)
}
console.log(`front matter ok: ${files.length} file(s)`)
