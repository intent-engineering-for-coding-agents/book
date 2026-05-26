# ASE-CONTEXT-CAPABILITY-CLASS-TARGETING: Target Capability Class

**Layer**: 1
**Categories**: context, instructions, portability
**Applies-to**: all
**Summary**: Target capability class (thinking + agent + plan mode), not vendor-agnostic vagueness.

## Principle

Capability-class targeting beats vendor-agnostic vagueness. The book targets CLI agents with thinking, agent, and plan modes. The knowledge lives in the repo (`AGENTS.md`, `.agents/`, specs) — portable across tools that share the same capability class. Writing for "any AI tool" means writing for none of them specifically.

## Why it matters

Instructions that assume a specific vendor's features become stale when vendors change. Instructions that are too generic fail to leverage any tool's strengths. Targeting a capability class — the set of features a tool must have to run the practices — keeps instructions concrete and portable.

## Violations to detect

- Instructions referencing vendor-specific commands that have no generic equivalent
- Instructions that assume features only one vendor provides
- Instructions written at a level of abstraction that the agent cannot translate into action

## Good practice

Describe what the agent needs to do, not which vendor command to run. "Resolve the `.principles` hierarchy by walking up from the target file to the git root" works across tools; "run `dot-prime`" only works where that command is installed.

## Sources

- ase-book, *"Capability-Class Targeting" concept*, ai-instructions section.
- ase-book, plan.md, Living Principles appendix.
