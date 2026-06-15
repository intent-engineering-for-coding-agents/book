# IEC-CONTEXT-AGENT-CLUELESS-NOT-BROKEN: Fix Context Before Blaming Model

**Layer**: 1
**Categories**: context, failure-modes, debugging
**Applies-to**: all
**Summary**: The agent is not broken, it is clueless — fix the context before switching models.

## Principle

When the agent produces wrong output, distinguish between a broken agent and a clueless one. A broken agent needs a different model. A clueless agent needs better information. The fix is rarely "let it keep trying." The fix is to give it what it is missing, or to make the decision on its behalf.

## Why it matters

Switching models is expensive and often unnecessary. Most agent failures are context failures — the agent was not told something it needed to know. The instinct to switch models before inspecting the context wastes time and masks the root cause.

## Violations to detect

- Switching models without first inspecting what context the agent received
- Repeated retries of the same prompt without adding missing information
- Blaming the model for failures that a better instruction would prevent

## Good practice

When the agent fails: check what files it loaded, check what it was told, check what it was not told. Fix the largest gap first. Only switch models after the context has been optimized and the failure persists.

## Sources

- intent-book, *"Context Window Management" chapter*, agent-instructions section.
