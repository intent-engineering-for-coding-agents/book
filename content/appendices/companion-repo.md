# Companion Repo

`iec` (Intent Engineering Checker) is the companion repository for this book. Its job is evidence, not product adoption: ADRs in MADR format, OpenSpec changes, stable AC IDs, tests that trace back to those IDs, and `AGENTS.md` wired to `.agents/` instructions and skills.

`iec` is not a general-purpose validator for arbitrary repo layouts. The name reflects the tool it ships: a CLI for checking alignment with the conventions used in its own development workflow. Your conventions will differ from the ones here, as they should.

It is also not production-grade. The repo is a teaching artifact, and this page records what to inspect.

## Repo structure

The repository at `github.com/intent-engineering-for-coding-agents/cli` is organized as follows:

```text
docs/         ADRs, design docs, INDEX.md, testing strategy
openspec/     OpenSpec spec files (changes/ and specs/)
.agents/      instructions/, skills/, commands/, hooks/
AGENTS.md     entry point for all agents working in this repo
src/          CLI source code (Python)
tests/        test suite
```

`docs/` holds the living documentation: ADRs in `docs/decisions/`, design documents in `docs/design/`, and a flat `docs/INDEX.md` agents use as a map. `openspec/` holds the specs. `.agents/` holds the instruction files that `AGENTS.md` loads. The `AGENTS.md` at root follows the same wiring pattern as the one for this book.

## How to browse

Read it on GitHub to see the current state of every file. That is the primary path. `AGENTS.md` and `docs/INDEX.md` are the readable entry points, and both describe the repo's conventions and where things live.

To clone it locally:

```bash
git clone https://github.com/intent-engineering-for-coding-agents/cli
```

## The git history, for the curious

The repo accumulated its structure in phases, each represented by a git tag. If you want to see how the setup evolved rather than where it landed, check out the repo at any point in that history:

| Tag | What it introduced |
|-----|--------------------|
| `v0.0.1` | Bare scaffold: `pyproject.toml`, `.gitignore`, CI, source stubs |
| `v0.1.0` | Foundation: `docs/`, ADRs 0001-0006, `openspec/` structure, `.agents/` scaffold |
| `v0.2.0` | Agent instructions: `AGENTS.md`, `.agents/instructions/`, `update-index` skill |
| `v0.3.0` | Version-tagging conventions, no new structure |
| `v0.4.0` | File and structure checkers |
| `v0.5.0` | Agent hub structure and secrets checkers |
| `v0.6.0` | Test traceability and test coverage checkers |

```bash
git checkout v0.1.0   # foundation: docs/, ADRs, openspec/ scaffold
```

The tags above cover the progression this book teaches. The CLI did not stop there. It reached `v1.0.0`, and the tags from `v0.7.0` onward add checkers and conventions beyond this book's teaching scope: OpenSpec lifecycle gates (`tasks-complete`, `change-archived`), maturity labels on each check, and a PR taxonomy applied to the tool's own development. This page stays with `v0.0.1` through `v0.6.0` because those tags map onto the practices each chapter introduces. Read the later tags in the repo if you want to see where the tool went after the book's snapshot.

## What it does not do

`iec` is not a general-purpose validator for arbitrary legacy repos. Its checks assume the Intent Engineering conventions are in place. Run `iec check` in a repo that follows these conventions. Uninitialized repos fail most checks by design. The companion repo is the reference example for this convention set.

The practices in this book do not require `iec`. The repo exists to show one implementation of the book's rules with files, tags, and checks you can inspect. The requirement is to apply the underlying mechanics in your own repo, not to copy `iec` directory-for-directory.

*Sources: `iec` repository history and tag annotations (github.com/intent-engineering-for-coding-agents/cli), repository structure and phase descriptions from `git tag -n1`.*
