# Companion Repo

Reading a description of a practice and reading a repo that embodies it are different things. `iec` is the latter.

`iec` (Intent Engineering Checker) is the companion repository for this book. It is a real project applying the practices described in each chapter: ADRs in MADR format, specs with stable AC IDs, tests that trace back to those IDs, `AGENTS.md` wired to `.agents/` instructions and skills. The repo is the point. Browse it the way you would browse any unfamiliar codebase.

`iec` is not a validator for arbitrary repos. It does not scan your codebase against a checklist and report findings. The name reflects the tool it ships: a CLI for checking alignment in its own development workflow. Your conventions will differ from the ones here. They should.

It is also not production-grade. It is a teaching artifact.

## Repo structure

The repository at `github.com/intent-engineering-for-coding-agents/cli` is organized as follows:

```
docs/         ADRs, design docs, INDEX.md, testing strategy
openspec/     OpenSpec spec files (changes/ and specs/)
.agents/      instructions/, skills/, commands/, hooks/
AGENTS.md     entry point for all agents working in this repo
src/          CLI source code (Python)
tests/        test suite
```

`docs/` holds the living documentation: ADRs in `docs/decisions/`, design documents in `docs/design/`, and a flat `docs/INDEX.md` agents use as a map. `openspec/` holds the specs. `.agents/` holds the instruction files that `AGENTS.md` loads. The `AGENTS.md` at root follows the same wiring pattern as the one for this book.

## How to browse

Read it on GitHub to see the current state of every file. That is the primary path. `AGENTS.md` and `docs/INDEX.md` are the readable entry points; both describe the repo's conventions and where things live.

To clone it locally:

```bash
git clone https://github.com/intent-engineering-for-coding-agents/cli
```

## The git history, for the curious

The repo accumulated its structure in phases, each represented by a git tag. If you want to see how the setup evolved rather than just where it landed, the tags let you check out the repo at any point in that history:

| Tag | What it introduced |
|-----|--------------------|
| `v0.0.1` | Bare scaffold: `pyproject.toml`, `.gitignore`, CI, source stubs |
| `v0.1.0` | Foundation: `docs/`, ADRs 0001-0006, `openspec/` structure, `.agents/` scaffold |
| `v0.2.0` | Agent instructions: `AGENTS.md`, `.agents/instructions/`, `update-index` skill |
| `v0.4.0` | File and structure checkers |
| `v0.5.0` | Agent hub structure and secrets checkers |
| `v0.6.0` | Test traceability and test coverage checkers |

```bash
git checkout v0.1.0   # foundation: docs/, ADRs, openspec/ scaffold
```

## What it does not do

`iec` has no command to run against your repo. It checks alignment in its own development workflow, not in yours.

The practices in this book do not require `iec`. The repo exists to show one set of choices made visible and traceable. What matters is applying the practices to your own work, not matching this repo's structure exactly.

Sources: `iec` repository history and tag annotations (github.com/intent-engineering-for-coding-agents/cli, verified at `v0.6.0`), phase descriptions from `git tag -n1`.
