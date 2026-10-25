---
type: skill
title: "Skill: update-index"
---

# Skill: update-index

Scan `docs/` and regenerate each directory's index (`INDEX.md` or the README index block) to match the files currently on disk. Each index maps only its own directory.

## When to use

- After creating any file under `docs/`
- After renaming or deleting any file under `docs/`
- When `docs/INDEX.md` might be stale (e.g. after a merge)

## What it updates

| File | Contains |
|---|---|
| `docs/INDEX.md` | Every file directly in `docs/`, plus one pointer row per immediate sub-directory index |
| `docs/decisions/README.md` | The index block between the `index:start` and `index:end` markers: all ADR files — number, title, status, date |
| `docs/design/README.md` | All design doc files — name, feature, status, date |

## Process

1. List the files directly in each `docs/` directory (not recursively)
2. Regenerate `docs/INDEX.md`:
   - One table row per same-directory file (excluding `INDEX.md` itself)
   - One pointer row per immediate sub-directory, linking to its `INDEX.md` or `README.md`
   - No links into deeper paths such as `decisions/0001-x.md`
   - Description is the file's first non-heading sentence, or derived from its H1
3. Regenerate the index block in `docs/decisions/README.md` (leave the text above the markers alone):
   - One row per `NNNN-*.md` file
   - Extract status and date from the file's frontmatter metadata lines (`* Status:`, `* Date:`)
4. Regenerate `docs/design/README.md` if any design docs exist
5. Run `npm run docs:check-index` to verify scope, broken links, and unlisted files

## Format reference

See [index-maintenance.md](.agents/instructions/index-maintenance.md) for the exact table row format per file type.
