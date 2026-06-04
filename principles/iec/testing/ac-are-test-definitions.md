# IEC-TESTING-AC-ARE-TEST-DEFINITIONS: Acceptance Criteria Are Test Definitions

**Layer**: 1
**Categories**: testing, ac-ids, specs
**Applies-to**: code
**Summary**: Every acceptance criterion is a test definition waiting to be executed — it needs a stable ID and a proof layer.

## Principle

Acceptance criteria are test definitions waiting to be executed. Every scenario needs a stable ID in bracket format (`[GV-007]`) with a 2–4 letter component prefix, a declared test type (`Test-type: unit | integration | acceptance`), and at least one positive and one negative test. Happy-path-only coverage is not proof.

## Why it matters

An AC without an ID is untraceable. An AC without a test type is ambiguously tested. An AC with only happy-path tests proves the easy case and leaves the error case unverified. The three attributes — ID, type, and positive+negative coverage — together make an AC a verifiable claim rather than a prose description.

## Violations to detect

- Spec scenarios without stable AC IDs
- ACs with no declared test type
- Scenarios tested only with happy-path cases
- AC IDs that have changed number but retained old behavior (silent drift)

## Good practice

```markdown
### [GV-007] Circular dependency is detected and reported
**Test-type:** integration

**Given** a graph containing a cycle A → B → A
**When** the validator runs
**Then** the cycle is detected and all three nodes are listed in the error
```

The test carries `@Tag("GV-007")` and `@Tag("integration")`. Traceable from spec to code, testable in isolation, filterable in CI.

## Sources

- intent-book, *"AC IDs + Positive/Negative Coverage" chapter*, quality section.
- intent-book, *"Test Strategy and Convention" chapter*, quality section.
- model2diagram `docs/decisions/0005-ac-id-and-test-type-convention.md`.
