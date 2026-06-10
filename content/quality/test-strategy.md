# Test Strategy and Convention

Left to its own defaults, an agent reaches for the test type its training over-represents: the unit test. Fine for core logic, wrong for an endpoint. An endpoint needs a real HTTP layer wired to a real database and a real request shaping the response. Mock both and the test passes while proving nothing about the system. The unit is green, but the integration breaks in staging because the real ORM emits slightly different SQL than the mock expected.

Not a wrong call so much as an unguided one. Nobody told the agent which test type proves which kind of behavior, so it defaulted, and the convention the team intended stayed in somebody's head.

## The test taxonomy

Different test types prove different things at different boundaries. A unit test proves one component in isolation. An integration test proves two or more components interacting. Neither proves what the other proves. Most non-trivial systems need more than one kind of test.

A working taxonomy, representative rather than prescriptive. This is the book's synthesis, built to make test intent legible to humans and agents:

| Type | What it proves | Scope |
|---|---|---|
| Unit | One component in isolation; logic, edge cases, error paths | Single class or function |
| Slice | One framework layer with its wiring intact; external services stubbed | e.g. persistence layer, HTTP routing |
| Integration | Components interacting within a module; real dependencies, no stubs | Module pipeline |
| Interface / Contract | An API boundary or interop surface holds | Public API, Java/Kotlin interop |
| Architectural | Structural rules hold: no forbidden dependencies, no layer violations | Module graph |
| Acceptance | A user-visible scenario works end-to-end at the spec level | Feature, golden fixture |
| E2E | The deployed system behaves as the user expects | CLI to output, browser to API |
| Visual regression | Rendered output matches a stored reference; no layout shifts, no styling regressions | UI component or full-page render |
| Smoke | The deployed system is alive and routing correctly after a release | Deployed surface entry points |
| Performance | Latency or throughput stays within a defined bound | Load profile |
| Manual | Intent is specified in the spec; automated proof not yet written, or cannot be | Any level |

Not every project uses all types. A CLI tool may have no slice tests and no performance tests. A project without a rendered UI has no use for visual regression tests. A library with a Java interop API needs contract tests; a pure-Kotlin project does not. What matters is that the types the project uses are declared explicitly, not discovered by convention archaeology after the agent has been running for six months.

*Sources: Dave Farley, "Modern Software Engineering" (Addison-Wesley, 2021), tests as boundary-specific feedback loops, the basis for matching test type to what it proves. The taxonomy rows above are this book's synthesis.*

## The convention document

The test taxonomy is only useful if it is written down where the agent can read it.

The convention document defines the types the project uses, the framework that covers each type, where the test files live, and what coverage thresholds apply. The format is as simple as a table:

```markdown
## Test types in use

| Test Type     | Framework          | Location                                   | Level       |
|---------------|--------------------|--------------------------------------------|-------------|
| Unit          | JUnit + Kotest     | src/test/kotlin/**/*Test.kt                | pre-commit  |
| Integration   | JUnit + Kotest     | src/test/kotlin/**/*IntegrationTest.kt     | pre-merge   |
| Contract      | JUnit (Java only)  | src/test/java/**/interop/                  | pre-merge   |
| Architectural | ArchUnit           | src/test/kotlin/**/*ArchTest.kt            | pre-commit  |
| Acceptance    | JUnit + Kotest     | src/test/kotlin/**/*AcceptanceTest.kt      | pre-merge   |
| E2E           | JUnit + Kotest     | src/test/kotlin/**/*E2eTest.kt             | post-deploy |

## Excluded test types

| Type              | Reason                                      |
|-------------------|---------------------------------------------|
| Visual regression | Backend service; no rendered UI             |
| Performance       | No SLA defined; out of current scope        |
| Smoke             | No separate deployment pipeline             |
```

The Level column is the second axis. Type answers what the test proves, and level answers when it runs. Pre-commit tests run locally before a PR, pre-merge tests run in CI on every branch push, and post-deploy tests run against the live system after a release. The exact labels are team-specific: some teams use pre-commit/pre-merge/post-deploy, others use L1/L2/L3. Some test types have no level: Manual sits outside the automated pipeline entirely. What matters is that both axes are declared, not inferred.

The exclusions section is equally important. Without it, the agent has no way to distinguish "not applicable" from "nobody thought of it". The agent will suggest visual regression tests for a backend service, or performance tests for a project with no SLA, because the taxonomy is silent on both. The exclusion is a decision; it deserves a rationale, for the same reason an ADR documents rejected alternatives.

The document is part of the project's architecture documentation and belongs alongside the project's ADRs and design documents, wherever those live. The agent reads it before writing a test. Without it the agent improvises, and with it, the agent is more likely to generate a test at the right level in the right file with the right framework from the first session.

The decision to adopt a specific convention, and the rationale for each choice, belongs in an ADR. The ADR is permanent; the convention document evolves. Together they give the agent both the current state and the reasoning behind it.

*Sources: Michael Nygard, "Documenting Architecture Decisions" (2011), ADRs as durable records of architectural rationale. The convention-document shape above is this book's workflow rule for making test-layer decisions readable by agents.*

## Scenario complexity and minimum test count

Not every scenario requires the same number of tests. In this book's convention, the minimum follows from the scenario's complexity: the number of conditions, branches, and error paths it contains.

| Scenario complexity | Minimum tests |
|---|---|
| Simple (single condition) | 1 positive + 1 negative |
| Medium (2–3 conditions or branching) | 2–3 positive + 2 negative |
| Complex (multiple paths, error handling) | Several positive + several negative |

A positive test proves the THEN holds when the WHEN is satisfied. A negative test proves the THEN does not fire when the WHEN is not satisfied: no false positives, no silent accepts. Both are required at every complexity tier; only the count scales.

This complexity-to-test-count table is the book's convention. It is not an OpenSpec field and not a common industry standard; it is the minimum shape this book uses so agents do not collapse every scenario to one happy-path test.

This table belongs in the project's `test/scenario-template.md` alongside the scenario format. When the agent writes scenarios, it reads the template, and when it implements tests, it reads the strategy. The two documents together define the surface the test suite has to cover.

*Sources: Dave Farley, "Modern Software Engineering" (Addison-Wesley, 2021), tests as feedback against behavior boundaries. The complexity tiers and minimum counts are this book's convention, not an external standard.*

## The AC registry

The convention needs one more file: a registry at `test/ac-registry.md` that allocates acceptance-criterion IDs so two scenarios never collide on the same identifier. One row per component, updated in the same commit as any new scenario. It is part of the convention surface the agent reads before writing tests, which is why it earns a short mention here. The allocation rule, the monotone-numbering discipline, and why a deleted ID leaves a permanent gap are the next chapter's subject: [AC IDs and Positive/Negative Coverage](./ac-ids-coverage).

*Sources: `iec` ADR-0005 "AC ID and Test-Type Convention" (2026-05-22), the AC registry convention demonstrated by the companion repo. This section is a preview; the next chapter owns the mechanics.*

## Tooling note

The `iec` companion repo is planned to ship the full convention: `docs/architecture/test-strategy.md` defining the types and frameworks, `test/scenario-template.md` defining the scenario format and complexity tiers, `test/ac-registry.md` holding the prefixes, and every test double-tagged with AC ID and test type. (Not yet present as of `v0.6.0`; check the companion repo for current status.)

The strategy document is what separates a test suite that knows what it is proving from one that grew by accumulation.

*Sources: `iec` companion repo status at `v0.6.0`, planned test-strategy, scenario-template, AC registry, and double-tagging demo not yet shipped.*

## When the strategy needs to change

A test strategy that never changes is either perfect or, far more often, stale. The convention document is living: it gains a row when the team adopts a framework or needs a new test type, and it gets corrected when the original call was wrong, with the ADR holding the rationale. The drift signal is concrete. If the agent generates tests that miss current practice the strategy is stale, and if the team writes tests the strategy does not cover it is incomplete.

A living strategy keeps the test suite honest as the project changes. What it cannot keep honest is the setup that writes the tests. The `AGENTS.md` and instruction files are code too, and they regress without anyone touching the application. That is the next chapter.
