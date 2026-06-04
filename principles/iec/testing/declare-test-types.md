# IEC-TESTING-DECLARE-TEST-TYPES: Declare Which Test Types You Use

**Layer**: 1
**Categories**: testing, convention, strategy
**Applies-to**: code
**Summary**: Declare which test types the project uses — the agent defaults to unit tests for everything otherwise.

## Principle

What matters is that the types the project uses are declared explicitly, not discovered by convention archaeology after the agent has been running for six months. The agent defaults to unit tests for everything unless told otherwise. The convention document defines the types, frameworks, file locations, and coverage thresholds.

## Why it matters

Without an explicit declaration, the agent writes unit tests for everything. Endpoints, persistence, contracts, pipelines — all unit tests. The problem surfaces in staging when the real ORM generates a slightly different query than the mock expected. The test proved the unit; it proved nothing about the system.

## Violations to detect

- No test strategy document in `docs/architecture/`
- Agent consistently writing unit tests for scenarios that need integration or acceptance tests
- Team members unable to name which test types the project uses
- Tests at the wrong level discovered only in CI or staging

## Good practice

Create `docs/architecture/test-strategy.md` with a table: test type → framework → file location → when it runs. The agent reads this before writing its first test. Without it the agent improvises; with it, the agent generates a test at the right level from the first session.

## Sources

- intent-book, *"Test Strategy and Convention" chapter*, quality section.
- model2diagram `docs/architecture/test-strategy.md`.
