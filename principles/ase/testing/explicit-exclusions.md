# ASE-TESTING-EXPLICIT-EXCLUSIONS: Exclude Test Types Explicitly

**Layer**: 1
**Categories**: testing, convention, clarity
**Applies-to**: code
**Summary**: The agent cannot distinguish "not applicable" from "nobody thought of it" — exclude explicitly.

## Principle

The exclusions section in the test strategy is as important as the inclusions. Without it, the agent has no way to distinguish *not applicable* from *nobody thought of it*. The agent will suggest visual regression tests for a backend service, or performance tests for a project with no SLA, because the taxonomy is silent on both.

## Why it matters

An agent that sees a test taxonomy with no exclusions assumes all types apply by default. It proposes tests the project does not need, wasting context and review time. Worse, it may generate a test framework configuration that no one asked for and no one will maintain.

## Violations to detect

- Test strategy that lists used types but no excluded types
- Agent proposing test types the project does not use
- Test framework dependencies added to the project without team discussion

## Good practice

Alongside the test types table, add an "Excluded test types" table with a reason for each exclusion. "Visual regression — backend service, no rendered UI." "Performance — no SLA defined, out of current scope." The exclusion is a decision; it deserves a rationale.

## Sources

- ase-book, *"Test Strategy and Convention" chapter*, quality section.
- model2diagram `docs/architecture/test-strategy.md`.
