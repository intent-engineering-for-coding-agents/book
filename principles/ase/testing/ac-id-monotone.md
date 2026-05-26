# ASE-TESTING-AC-ID-MONOTONE: AC IDs Are Stable and Monotone

**Layer**: 1
**Categories**: testing, ac-ids, traceability
**Applies-to**: code
**Summary**: AC IDs are stable — numbers only go up, prefix is permanent, deleted IDs leave a gap.

## Principle

AC IDs are stable because they are monotone: numbers only go up, even when a scenario is deleted. A deleted `GV-007` leaves a permanent gap. That gap is intentional. It means any external reference that mentions `GV-007` will find no scenario, which is the correct answer — no ambiguity about whether the ID was reused. The prefix is permanent; never reassign it to a different component.

## Why it matters

Reusing a deleted AC ID creates silent drift. A changelog references `GV-007` as the fix for a bug. Six months later, `GV-007` is a different scenario describing different behavior. The changelog is now a lie. Monotone IDs prevent this by making deletion visible.

## Violations to detect

- AC IDs reused after a scenario is deleted
- Prefix reassigned to a different component
- Non-sequential IDs (jumps in the counter with no corresponding registry update)

## Good practice

The AC registry (`test/ac-registry.md`) maintains one row per component: prefix, component name, next counter. Adding a scenario: look up the prefix, use the Next value, increment Next, commit the registry update atomically with the new scenario. The registry and the spec change together.

## Sources

- ase-book, *"AC IDs + Positive/Negative Coverage" chapter*, quality section.
- ase-book, *"Test Strategy and Convention" chapter*, quality section.
- model2diagram `test/ac-registry.md`.
