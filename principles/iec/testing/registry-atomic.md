# IEC-TESTING-REGISTRY-ATOMIC: Registry Updates Atomically With Scenarios

**Layer**: 1
**Categories**: testing, ac-ids, process
**Applies-to**: code
**Summary**: The AC registry and the spec change together — a scenario without a registry update guessed its ID.

## Principle

The rule for adding a new scenario: look up the prefix, use the Next value as the ID, increment Next, commit the registry update atomically with the new scenario. The registry and the spec change together. A scenario without a registry update is a scenario whose author allocated an ID by guessing.

## Why it matters

When the registry and the scenario are committed in separate PRs, the registry is wrong between the two commits. Another developer picks the same Next value, creates a duplicate ID. The conflict surfaces late, in review or worse, in test traceability reporting. Atomic commits prevent the gap.

## Violations to detect

- Spec scenarios with AC IDs not reflected in the registry
- Registry Next values that don't match the highest allocated ID plus one
- Duplicate AC IDs in the test suite

## Good practice

A single commit contains: the new scenario in the spec, the registry update with the incremented Next value, and any initial test scaffolding. The commit message uses the AC ID: "Add [GV-019] circular dependency detection."

## Sources

- intent-book, *"AC IDs + Positive/Negative Coverage" chapter*, quality section.
- intent-book, *"Test Strategy and Convention" chapter*, quality section.
- model2diagram `test/ac-registry.md`.
