# IEC-FOUNDATION-STALE-STRUCTURE-WORSE-THAN-NONE: Stale Structure Misleads

**Layer**: 1
**Categories**: foundation, maintenance, context
**Applies-to**: all
**Summary**: Stale documentation misleads more than no documentation.

## Principle

A repo that adopts Intent Engineering Foundation practices and then stops maintaining them is worse than a repo that never adopted them. An instruction file that describes how the team worked six months ago is not documented maturity — it is a historical record with delusions of authority. A stale ADR misleads one decision; a stale `AGENTS.md` misleads every session.

## Why it matters

The agent trusts what it reads. When a stale document describes behavior the system no longer has, the agent acts on wrong information. The damage compounds: every session that loads the stale file makes decisions based on a version of reality that no longer exists.

## Violations to detect

- `AGENTS.md` referencing instruction files that were renamed or deleted
- ADRs describing decisions that have been silently reversed
- Design documents that have not been updated alongside implementation changes
- Instruction files that describe conventions the team stopped following

## Good practice

Treat `AGENTS.md` as part of the architecture. Any PR that changes something `AGENTS.md` describes must update `AGENTS.md` in the same commit. Run a link checker and freshness scan in CI.

## Sources

- intent-book, *"When Intent Engineering Fails" chapter*, foundation section.
- intent-book, *"Honest Maturity" chapter*, quality section.
- intent-book, *"AGENTS.md" chapter*, agent-instructions section.
