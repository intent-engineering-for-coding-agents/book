# IEC-QUALITY-HOLD-SPEC-STABLE: Hold the Spec Stable During Implementation

**Layer**: 2
**Categories**: quality, specs, process
**Applies-to**: all
**Summary**: A spec still being negotiated during implementation causes drift to wherever the agent guesses it is heading.

## Principle

A spec that is still being negotiated while the implementation is happening produces an implementation that matches neither the original spec nor the final one. It matches the agent's guess at where the negotiation was heading. Hold the spec stable from the moment implementation starts until the PR is ready for review.

## Why it matters

The agent reads the spec at the start of implementation. If the spec changes during implementation, the agent does not re-read it unless explicitly told. The implementation drifts to wherever the agent last saw the spec. The resulting code is a patchwork of the old spec, the agent's guesses, and whatever corrections the developer managed to convey in follow-up prompts.

## Violations to detect

- Spec being edited while implementation is in progress
- Implementation that references spec details from before the most recent spec edit
- Developer corrections that override the spec rather than updating it

## Good practice

The spec is a contract between the intent and the implementation. Once implementation starts, the spec is frozen. If the spec must change, pause implementation, update the spec, and restart. The pause costs less than recovering from an implementation that followed a moving target.

## Sources

- intent-book, *"Before, During, After Checkpoints" chapter*, quality section.
