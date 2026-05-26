# ASE-TESTING-EVERY-PATH: Every Path Needs a Test

**Layer**: 1
**Categories**: testing, coverage, proof
**Applies-to**: code
**Summary**: Every conditional branch, distinct return type, and exception path needs at least one test.

## Principle

Every conditional branch is a path. Every distinct return type is a path. Every exception a function can raise is a path. Each path needs at least one test. Positive tests are the floor, not the ceiling. The progression: happy path → error path → per branch → per exception class → boundary values.

## Why it matters

A function with five conditional branches and one test only proves behavior for the exact conditions of that test. The other four branches can be broken silently. The agent that writes only happy-path tests creates a test suite that proves the easy case and leaves the hard cases unverified.

## Violations to detect

- Functions with conditional branches where not all branches are tested
- Exception-throwing code with no test for the exception path
- Functions returning different types or nullable values with no test for each variant
- Test suites where all tests use the same input values

## Good practice

For each function, enumerate the paths: each `if`/`else` branch, each `when` clause, each exception type, each null/empty/boundary input. Write one test per path. The test name names the path: `should throw ValidationError when input is null`.

## Sources

- ase-book, *"Tests as Proof, Not Ritual" chapter*, quality section.
- ase-book, *"Test Strategy and Convention" chapter*, quality section.
