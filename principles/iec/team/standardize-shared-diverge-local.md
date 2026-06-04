---
name: standardize-shared-diverge-local
description: Standardize AI conventions that affect the codebase; leave local workflow choices divergent
metadata:
  type: feedback
---

# IEC-TEAM-STANDARDIZE-SHARED-DIVERGE-LOCAL: Standardize Shared, Allow Local Divergence

**Layer**: 2
**Categories**: team, conventions, adoption
**Applies-to**: team agent instruction management
**Summary**: Standardize AI conventions that affect the codebase; leave local workflow choices divergent.

## Principle

If two developers following a convention independently produce inconsistent outputs in the same codebase, the convention belongs in the team brief. If the convention affects only each developer's local workflow and does not appear in committed code, leave it to individual preference.

## Why it matters

Over-standardizing produces rigid team briefs that agents cannot navigate without hitting context limits, and developers who cannot exercise local judgment. Under-standardizing produces inconsistent codebases and agents with incompatible briefings. The line is: does this affect what gets committed?

## Violations to detect

- Team `AGENTS.md` specifying personal workflow preferences (which model to use, local note-taking format)
- No team convention for data access patterns, security rules, or test naming — leaving these to individual agents
- Convention files so long that agents hit context limits before reaching the security section

## Good practice

Team `AGENTS.md` covers: code style, test naming, security rules, dependency hygiene, data access patterns, and links to architecture docs. Individual preference covers: model selection, local branch naming, note format, skill loading sequence. The team brief is the brief for the codebase; personal setup is not the codebase's concern.

## Sources

- intent-book, ["Shared Agent Instruction Conventions"](/team/shared-conventions) chapter.
- [AGENTS.md](https://agents.md/) (ongoing).
