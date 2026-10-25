// Fails when the repo's documentation map is broken: required entry files are
// missing, a docs/ directory has no index, an index row points outside its scope
// or at a missing file, or a file in the directory is not listed.
// Usage: node scripts/check-docs-index.mjs
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'

const REQUIRED = ['AGENTS.md', 'docs/README.md', 'docs/INDEX.md']
const tracked = new Set(
  execFileSync('git', ['ls-files', 'docs'], { encoding: 'utf8' }).split('\n').filter(Boolean),
)
const problems = []

for (const f of REQUIRED) if (!fs.existsSync(f)) problems.push(`${f}: required file is missing`)

// A directory counts as substantive when it, or a descendant, tracks a file other than .gitkeep.
const substantive = (dir) =>
  [...tracked].some((f) => f.startsWith(`${dir}/`) && path.basename(f) !== '.gitkeep')

const dirs = new Set(['docs'])
for (const f of tracked) {
  for (let d = path.posix.dirname(f); d !== '.'; d = path.posix.dirname(d)) dirs.add(d)
}

const read = (f) => fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n')

for (const dir of [...dirs].filter(substantive).sort()) {
  // INDEX.md wins when both forms exist; otherwise the README carries a marked block.
  let indexFile = `${dir}/INDEX.md`
  let text
  if (tracked.has(indexFile)) {
    text = read(indexFile)
  } else {
    indexFile = `${dir}/README.md`
    if (!tracked.has(indexFile)) { problems.push(`${dir}: no INDEX.md or README.md index`); continue }
    const m = read(indexFile).match(/<!-- index:start -->([\s\S]*?)<!-- index:end -->/)
    if (!m) { problems.push(`${indexFile}: no index:start/index:end block`); continue }
    text = m[1]
  }

  const listed = new Set()
  for (const row of text.split('\n').filter((l) => l.startsWith('|'))) {
    const target = (row.match(/\]\(([^)]+)\)/) || [])[1]
    if (!target) continue
    const inScope = !target.includes('/') || /^[^/.][^/]*\/(INDEX|README)\.md$/.test(target)
    if (!inScope || /^[a-z]+:/.test(target)) {
      problems.push(`${indexFile}: "${target}" is outside the index scope (same-directory file or child INDEX/README only)`)
      continue
    }
    if (!tracked.has(`${dir}/${target}`)) problems.push(`${indexFile}: "${target}" does not exist`)
    listed.add(target)
  }

  // Every file directly in the directory, and every child index, must appear.
  const expected = new Set()
  for (const f of tracked) {
    if (path.posix.dirname(f) === dir && path.basename(f) !== '.gitkeep') {
      if (!(indexFile.endsWith('README.md') && f === indexFile)) expected.add(path.posix.basename(f))
    }
    const rel = f.startsWith(`${dir}/`) ? f.slice(dir.length + 1).split('/') : []
    if (rel.length === 2 && substantive(`${dir}/${rel[0]}`)) {
      expected.add(tracked.has(`${dir}/${rel[0]}/INDEX.md`) ? `${rel[0]}/INDEX.md` : `${rel[0]}/README.md`)
    }
  }
  for (const e of expected) if (!listed.has(e)) problems.push(`${indexFile}: "${e}" is not listed`)
}

if (problems.length) {
  console.error([...new Set(problems)].join('\n'))
  console.error(`\n${new Set(problems).size} problem(s) in the docs index.`)
  process.exit(1)
}
console.log(`docs index ok: ${[...dirs].filter(substantive).length} director(ies)`)
