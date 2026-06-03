# ASE-CONTEXT-AGENTS-MD-IS-TOC: AGENTS.md is a Table of Contents

**Layer**: 1
**Categories**: context, agents-md, instructions
**Applies-to**: all
**Summary**: `AGENTS.md` is a table of contents, not an encyclopedia — short enough for one context load.

## Principle

`AGENTS.md` is a table of contents, not an encyclopedia. Short enough to fit in a single context load, directive enough to orient the agent, precise enough to link to the specific instruction file relevant to the current task. The agent reads `AGENTS.md` on every session start. If it is too long, the agent skims or fails to load it. If it is outdated, the agent is misled every session.

## Why it matters

A stale ADR misleads one decision; a stale `AGENTS.md` misleads every session. The cost of maintenance is proportional to the file's size — a short `AGENTS.md` is cheap to keep current, a long one accumulates drift.

## Violations to detect

- `AGENTS.md` exceeding ~200 lines of prose
- Instruction content in `AGENTS.md` that should be in `.agents/` files
- Links in `AGENTS.md` pointing to files that no longer exist
- Descriptions of behavior or conventions that are no longer accurate

## Good practice

```markdown
# AGENTS.md: Project Name

## Instructions
- [Writing conventions](.agents/instructions/writing.md)
- [Voice guide](.agents/instructions/voice.md)

## Skills
- **draft-section**: draft a content section from an outline
- **credibility-pass**: run the mandatory provenance check

## Commands
npm run docs:dev     # local dev server
npm run docs:build   # build to .vitepress/dist/
```

Short. Directive. Links to the right file for each task.

## Sources

- ase-book, *"AGENTS.md" chapter*, agent-instructions section.
- AgentPatterns.ai, *"AGENTS.md: Project-Level README for AI Coding Agents"*, ongoing.
