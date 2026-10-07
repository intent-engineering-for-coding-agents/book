# IEC-CONTEXT-CAPABILITY-CLASS-TARGETING: Target Capability Class

**Layer**: 1
**Categories**: context, instructions, portability
**Applies-to**: all
**Summary**: Target a capability class (reasoning, tool use, file editing, planning), not one vendor roster.

## Principle

Capability-class targeting beats vendor-agnostic vagueness. The target class includes coding agents with reasoning, tool use, file editing, and a planning mode. The knowledge lives in the repo (`AGENTS.md`, `.agents/`, specs), portable across tools in the same capability class. Writing for "any AI tool" means writing for none of them specifically.

## Why it matters

Instructions that assume a specific vendor's features become stale when vendors change. Instructions that are too generic fail to leverage any tool's strengths. Targeting a capability class — the set of features a tool must have to run the practices — keeps instructions concrete and portable.

## Violations to detect

- Instructions referencing vendor-specific commands that have no generic equivalent
- Instructions that assume features only one vendor provides
- Instructions written at a level of abstraction that the agent cannot translate into action

## Good practice

Describe what the agent needs to do, not which vendor command to run. Apply the replacement test: remove the named agent, framework, or command and check whether the underlying control still makes sense. "Resolve the rules hierarchy by walking up from the target file to the git root" still works after tool replacement. "Run `lint-docs`" only works where that command is installed.

## Sources

- intent-book, *"Capability-Class Targeting" concept*, agent-instructions section.
- intent-book, plan.md, Living Principles appendix.

