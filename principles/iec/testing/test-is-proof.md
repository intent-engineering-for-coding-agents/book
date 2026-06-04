# IEC-TESTING-TEST-IS-PROOF: A Test is Proof, Not Decoration

**Layer**: 1
**Categories**: testing, proof, coverage
**Applies-to**: code
**Summary**: A test is proof when it would fail if the implementation diverged from the spec — otherwise it is decoration.

## Principle

A test is proof when it would fail if the implementation diverged from the spec. Otherwise it is decoration. The distinction is operational, not philosophical. A test that passes regardless of what the code does proves nothing. A test that only passes when the code matches the spec proves at least one aspect of correctness.

## Why it matters

Coverage metrics count decoration and proof equally. A test suite with 90% coverage and no actual verification of behavior is worse than a test suite with 50% coverage that proves every claim. The metric misleads; the proof requirement corrects it.

## Violations to detect

- Tests with no assertions
- Tests that assert `not null` or `is defined` but not the value
- Tests that pass when the implementation is intentionally broken
- Coverage celebrated without inspection of what the tests actually verify

## Good practice

Stop measuring "is there a test for this line?" Start measuring "would a wrong implementation be caught?" The metric shifts from coverage to detection. A 70% detection rate is more honest than a 95% coverage number.

## Sources

- intent-book, *"Tests as Proof, Not Ritual" chapter*, quality section.
- Dave Farley, *Modern Software Engineering*.
