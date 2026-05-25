# Test Strategy and Convention

The agent wrote unit tests. That was fine for the core logic. The endpoint, though, needed an integration test: a real HTTP layer wired to a real database, with a real request shaping the response. The unit test the agent wrote mocked both. It passed. The integration broke in staging because the real ORM generated a slightly different SQL query than the mock expected. The test had proven the unit; it had proven nothing about the system.

The agent wrote unit tests because nobody told it to write anything else. It defaulted to the test type its training over-represented. The convention the team intended was in somebody's head.

## The test taxonomy

Different test types prove different things at different boundaries. A unit test proves one component in isolation. An integration test proves two or more components interacting. Neither proves what the other proves. Most non-trivial systems need more than one kind of test.

A working taxonomy — representative, not prescriptive. This is the book's synthesis, built to make test intent legible to humans and agents:

| Type | What it proves | Scope |
|---|---|---|
| **Unit** | One component in isolation; logic, edge cases, error paths | Single class or function |
| **Slice** | One framework layer with its wiring intact; external services stubbed | e.g. persistence layer, HTTP routing |
| **Integration** | Components interacting within a module; real dependencies, no stubs | Module pipeline |
| **Interface / Contract** | An API boundary or interop surface holds | Public API, Java/Kotlin interop |
| **Architectural** | Structural rules hold: no forbidden dependencies, no layer violations | Module graph |
| **Acceptance** | A user-visible scenario works end-to-end at the spec level | Feature, golden fixture |
| **E2E** | The deployed system behaves as the user expects | CLI to output, browser to API |
| **Visual regression** | Rendered output matches a stored reference; no layout shifts, no styling regressions | UI component or full-page render |
| **Smoke** | The deployed system is alive and routing correctly after a release | Deployed surface entry points |
| **Performance** | Latency or throughput stays within a defined bound | Load profile |
| **Manual** | Intent is specified in the spec; automated proof not yet written, or cannot be | Any level |

Not every project uses all types. A CLI tool may have no slice tests and no performance tests. A project without a rendered UI has no use for visual regression tests. A library with a Java interop API needs contract tests; a pure-Kotlin project does not. What matters is that the types the project uses are declared explicitly, not discovered by convention archaeology after the agent has been running for six months.

*Sources: model2diagram `docs/architecture/test-strategy.md` (the working reference implementation of the convention this chapter describes).*

## The convention document

The test taxonomy is only useful if it is written down where the agent can read it.

The convention document defines the types the project uses, the framework that covers each type, where the test files live, and what coverage thresholds apply. In model2diagram this is `docs/architecture/test-strategy.md`. The format can be as simple as a table:

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

The Level column is the second axis. Type answers what the test proves; level answers when it runs. Pre-commit tests run locally before a PR. Pre-merge tests run in CI on every branch push. Post-deploy tests run against the live system after a release. The exact labels are team-specific — some teams use pre-commit/pre-merge/post-deploy, others use L1/L2/L3. Some test types have no level: Manual sits outside the automated pipeline entirely. What matters is that both axes are declared, not inferred.

The exclusions section is equally important. Without it, the agent has no way to distinguish *not applicable* from *nobody thought of it*. The agent will suggest visual regression tests for a backend service, or performance tests for a project with no SLA, because the taxonomy is silent on both. The exclusion is a decision; it deserves a rationale, for the same reason an ADR documents rejected alternatives.

The document is part of the project's architecture documentation. It belongs alongside the project's ADRs and design documents, wherever those live. The agent reads it before writing a test. Without it the agent improvises; with it, the agent is more likely to generate a test at the right level in the right file with the right framework from the first session.

The decision to adopt a specific convention, and the rationale for each choice, belongs in an ADR. In model2diagram, ADR-0005 documents why `[PREFIX-NNN]` bracket IDs and `Test-type:` fields were chosen over alternatives. The ADR is permanent; the convention document evolves. Together they give the agent both the current state and the reasoning behind it.

*Sources: model2diagram `docs/architecture/test-strategy.md`; model2diagram `docs/decisions/0005-ac-id-and-test-type-convention.md`.*

## Scenario complexity and minimum test count

Not every scenario requires the same number of tests. In this book's convention, the minimum follows from the scenario's complexity — the number of conditions, branches, and error paths it contains.

| Scenario complexity | Minimum tests |
|---|---|
| Simple (single condition) | 1 positive + 1 negative |
| Medium (2–3 conditions or branching) | 2–3 positive + 2 negative |
| Complex (multiple paths, error handling) | Several positive + several negative |

A positive test proves the THEN holds when the WHEN is satisfied. A negative test proves the THEN does not fire when the WHEN is not satisfied: no false positives, no silent accepts. Both are required at every complexity tier; only the count scales.

This table belongs in the project's `test/scenario-template.md` alongside the scenario format. When the agent writes scenarios, it reads the template. When it implements tests, it reads the strategy. The two documents together define the surface the test suite has to cover.

*Sources: model2diagram `test/scenario-template.md`; model2diagram `docs/architecture/test-strategy.md`.*

## The AC registry

AC IDs are stable because they are monotone: numbers only go up, even when a scenario is deleted. A deleted `GV-007` leaves a permanent gap. That gap is intentional. It means any external reference — a changelog, a bug report, a comment in code — that mentions `GV-007` will find no scenario, which is the correct answer. No ambiguity about whether the ID was reused.

The registry file (`test/ac-registry.md`) maintains one row per component:

```markdown
| Prefix | Component         | Next |
|--------|-------------------|------|
| GV     | graph-validator   | 019  |
| AUTH   | authentication    | 007  |
| CONF   | configuration     | 023  |
```

Prefix is 2–4 letters from the component abbreviation. `GV` for GraphValidator, `AUTH` for authentication, `CONF` for configuration. The reader should recognise the component from the prefix without consulting the registry. The prefix is permanent; never reassign it to a different component.

The rule for adding a new scenario: look up the prefix, use the `Next` value as the ID, increment `Next`, commit the registry update atomically with the new scenario. The registry and the spec change together. A scenario without a registry update is a scenario whose author allocated an ID by guessing.

*Sources: model2diagram `test/ac-registry.md`; model2diagram `docs/decisions/0005-ac-id-and-test-type-convention.md`.*

## Tooling note

If you want to see this in practice, model2diagram at `main` has the full convention applied: `docs/architecture/test-strategy.md` defines the six types and frameworks, `test/scenario-template.md` defines the scenario format and complexity tiers, `test/ac-registry.md` holds the prefixes. Every test has two `@Tag` annotations. Every spec scenario has a `Test-type:` field. The convention is not aspirational; it is running in that companion project.

The strategy document is what separates a test suite that knows what it is proving from one that grew by accumulation. The next chapter ties the convention to the rest of the quality loop: the before-gate that checks the convention is in place before the agent writes its first test.
