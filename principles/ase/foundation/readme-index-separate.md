# ASE-FOUNDATION-README-INDEX-SEPARATE: README and INDEX Serve Different Readers

**Layer**: 1
**Categories**: foundation, repo-structure, context
**Applies-to**: all
**Summary**: Every `docs/` directory has a README for humans and an INDEX for agents.

## Principle

Every `docs/` directory needs both a `README.md` (human-readable, renders on Git hosts) and an `INDEX.md` (agent-facing map for context economy). They look similar but serve different readers. A human lands on the README when browsing; an agent loads the INDEX to know what exists before deciding what to read. Collapsing them into one file is the most common mistake.

## Why it matters

README and INDEX share a directory and a lifespan, which makes them easy to conflate. But their jobs are different. A README tells a human what this directory is for. An INDEX tells an agent what files are available and which ones to load for which tasks. One file cannot serve both audiences well.

## Violations to detect

- Directories under `docs/` with no INDEX.md
- INDEX.md written as prose instead of a structured file listing with task-clause annotations
- README.md trying to serve as both human introduction and agent navigation map

## Good practice

```markdown
# README.md
This directory contains architecture decision records. Each ADR documents one decision.

# INDEX.md
## Files
- [adr-0001-use-mermaid.md](adr-0001-use-mermaid.md) — Diagram format decision
- [adr-0002-database-choice.md](adr-0002-database-choice.md) — Database selection

## Load when
- Evaluating architectural trade-offs → read all ADRs
- Working on diagrams → load adr-0001
- Working on persistence → load adr-0002
```

## Sources

- ase-book, *"Document Types" chapter*, foundation section.
- ase-book, plan.md, Living Principles appendix.
