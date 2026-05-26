# ASE-CONTEXT-ONE-SOURCE-OF-TRUTH: One Source of Truth for Instructions

**Layer**: 1
**Categories**: context, instructions, vendor-files
**Applies-to**: all
**Summary**: One source of truth for AI instructions; vendor files are generated pointers, not authored duplicates.

## Principle

The canonical instruction lives in one place. Vendor-specific files — `.github/copilot-instructions.md`, `.claude/rules/`, `CLAUDE.md` — are generated pointers to the canonical source, not independently authored copies. If the same rule appears in three vendor files, one of them will be wrong within a week.

## Why it matters

Authored duplicates diverge. One developer updates the Copilot file but forgets the Claude file. The next developer sees the stale file and assumes it reflects current practice. The agent loads the stale file and acts on outdated instructions. Generated duplicates from a single source eliminate this failure mode.

## Violations to detect

- Vendor-specific instruction files with content not generated from a canonical source
- The same rule expressed differently in different vendor files
- Vendor files that exist without a corresponding canonical file in `.agents/`

## Good practice

The canonical instructions live in `.agents/`. Vendor files are generated or contain a pointer: "Follow the instructions in `.agents/instructions/writing.md`." Update once, regenerate everywhere.

## Sources

- ase-book, *"Vendor Files" chapter*, ai-instructions section.
- ase-book, *"Instruction Hub" chapter*, ai-instructions section.
- ase-book, plan.md, Living Principles appendix.
