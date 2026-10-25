---
type: appendix
title: Companion Repo
---

# Companion Repo

`iec` (Intent Engineering Checker) is the companion repository for this book. Its job is evidence, not product adoption: ADRs in MADR format, OpenSpec changes, stable AC IDs, tests that trace back to those IDs, and `AGENTS.md` wired to `.agents/` instructions and skills.

`iec` is not a general-purpose validator for arbitrary repo layouts. The name reflects the tool it ships: a CLI for checking alignment with the conventions used in its own development workflow. Your conventions will differ from the ones here, as they should.

It is also not production-grade. The repo is a teaching artifact, and this page records what to inspect.

## Repo structure

The repository at `github.com/intent-engineering-for-coding-agents/cli` has the following layout at revision `2491a62` (checked October 22, 2026):

```text
docs/         ADRs, design docs, INDEX.md, testing strategy
openspec/     OpenSpec spec files (changes/ and specs/)
.agents/      instructions/, skills/, commands/, hooks/
AGENTS.md     shared project entry point for supported agents
src/          CLI source code (Python)
tests/        test suite
```

The `hooks/` directory contains only `.gitkeep` at this revision. It is a scaffold artifact and adds no setup requirement to the practices taught here.

*Sources: Companion CLI repository at revision `2491a62`, directory layout and `.agents/hooks/.gitkeep`.*

`docs/` holds the living documentation: ADRs in `docs/decisions/`, design documents in `docs/design/`, and a flat `docs/INDEX.md` agents use as a map. `openspec/` holds the specs. `.agents/` holds instruction files that `AGENTS.md` points to with load clauses. The `AGENTS.md` at root follows the same wiring pattern as the one for this book.

## How to browse

Read it on GitHub to see the current state of every file. That is the primary path. `AGENTS.md` and `docs/INDEX.md` are the readable entry points, and both describe the repo's conventions and where things live.

To clone it locally:

```bash
git clone https://github.com/intent-engineering-for-coding-agents/cli
```

## What it does not do

`iec` is not a general-purpose validator for arbitrary legacy repos. Its checks assume the Intent Engineering conventions are in place. Run `iec check` in a repo that follows these conventions. Uninitialized repos fail most checks by design. The companion repo is the reference example for this convention set.

The practices in this book do not require `iec`. The repo exists to show one implementation of the book's rules with files and checks you can inspect. The requirement is to apply the underlying mechanics in your own repo, not to copy `iec` directory-for-directory.

*Sources: `iec` repository (github.com/intent-engineering-for-coding-agents/cli), repository structure at revision `2491a62`.*
