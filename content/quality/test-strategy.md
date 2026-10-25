---
type: chapter
title: Test Strategy and Convention
---

# Test Strategy and Convention

An agent asked to test an endpoint may write a unit test around the handler while mocking the HTTP layer and database. Such a test checks handler logic, but it cannot show whether a real request reaches the handler or whether persistence works. Name the boundary the acceptance criterion requires before choosing the test type.

## The test taxonomy

Different test types verify different things at different boundaries. No row in the table below substitutes for another.

A working taxonomy, representative rather than prescriptive:

| Type | What it verifies | Scope |
|---|---|---|
| Unit | One component in isolation (logic, edge cases, error paths) | Single class or function |
| Slice | One framework layer with its wiring intact (external services stubbed) | e.g. persistence layer, HTTP routing |
| Integration | Components interacting within a module (real dependencies, no stubs) | Module pipeline |
| Interface / Contract | An API boundary or interop point holds | Public API, Java/Kotlin interop |
| Architectural | Structural rules hold: no forbidden dependencies, no layer violations | Module graph |
| Acceptance | A user-visible scenario works end to end at the spec level | Feature, golden fixture |
| E2E | The deployed system behaves as the user expects | CLI to output, browser to API |
| Visual regression | Rendered output matches a stored reference | UI component or full-page render |
| Smoke | The deployed system is alive and routing correctly after a release | Deployed entry points |
| Performance | Latency or throughput stays within a defined bound | Load profile |
| Manual | Intent is specified in the spec, but automated evidence is not yet written or not practical | Any level |

Most projects settle on a subset. The important step is to write the allowed test types into a project document before the agent starts inventing its own defaults.

*Sources: Dave Farley, "Modern Software Engineering" (Addison-Wesley, 2021), tests as boundary-specific feedback loops, the basis for matching the test type to what it verifies. The taxonomy rows above are this book's synthesis.*

## The convention document

The convention document defines the types the project uses, the framework that covers each type, where the test files live, and what coverage thresholds apply. A simple table is enough:

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
```

Type answers what the test verifies. Level answers when it runs. Write both axes down in a file the agent can read, or the agent will make them up from whatever pattern it saw last.

The document belongs with the project's architecture docs, wherever those live. Direct the agent to read it before writing a test. Without that guidance, the agent has to infer the framework, file location, and run stage from the code it happens to inspect.

The decision to adopt a specific convention, and the rationale for each choice, belongs in an ADR. The ADR stays. The convention document evolves.

*Sources: Michael Nygard, "Documenting Architecture Decisions" (2011), ADRs as durable records of architectural rationale. The convention-document shape above is this book's workflow rule for making test-layer decisions readable by agents.*

## Choose cases from the criterion

The number of tests follows from the behavior, not a fixed tier. A file-size limit needs an accepted file, a rejected oversized file, and attention to the limit itself. A retry rule may need separate cases for the first failure, the last allowed attempt, and exhaustion. Use equivalence partitions and boundaries to choose cases, then inspect what each test asserts. [Tests as Evidence, Not Ritual](./tests-as-evidence) explains why a count alone is weak evidence.

*Sources: ISTQB "Certified Tester Foundation Level Syllabus v4.0.1" (September 15, 2024), equivalence partitioning and boundary value analysis. The example and review rule are this book's application to acceptance criteria.*

## The AC registry

The convention needs one more file, an AC registry that allocates acceptance-criterion IDs so two scenarios never collide on the same identifier. One row per component, updated in the same commit as any new scenario. In the companion repo, the registry lives at `tests/ac-registry.md`.

The allocation rule, the monotone-numbering discipline, and why a deleted ID leaves a permanent gap are the next chapter's subject: [AC IDs and Coverage](./ac-ids-coverage).

*Sources: intent-engineering-for-coding-agents/cli `tests/ac-registry.md` (ongoing), monotone AC registry layout and non-reuse rule.*

The convention tells the agent how to write tests. Review still needs a way to trace each test back to the acceptance criterion it verifies, including after the spec changes.
