# ASE-TESTING-POSITIVE-NEGATIVE-MINIMUM: Every AC Needs Positive and Negative Tests

**Layer**: 1
**Categories**: testing, coverage, ac-ids
**Applies-to**: code
**Summary**: Every acceptance criterion has at least one positive and one negative test — happy-path-only is not proof.

## Principle

Every acceptance criterion has at least one positive test and at least one negative test, unless the scenario has only one direction to verify. A positive test proves the THEN holds when the WHEN is satisfied. A negative test proves the THEN does not fire when the WHEN is not satisfied: no false positives, no silent accepts. Both are required at every scenario complexity tier.

## Why it matters

A positive-only test suite proves the system does the right thing when conditions are right. It proves nothing about what the system does when conditions are wrong. An AC that says "reject invalid input" with only a test for valid input passing proves nothing about rejection.

## Violations to detect

- ACs with only positive tests
- ACs where the negative case is untestable because the spec does not describe error behavior
- Tests that verify "no error" without verifying specific behavior

## Good practice

For every AC: write the test that proves the positive case. Then write the test that proves the negative case — wrong input, missing data, expired state, unauthorized caller. Both must exist. The negative test is often the one that finds the bug.

## Sources

- ase-book, *"AC IDs + Positive/Negative Coverage" chapter*, quality section.
- ase-book, *"Tests as Proof, Not Ritual" chapter*, quality section.
