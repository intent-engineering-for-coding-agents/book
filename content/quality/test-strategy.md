# Test Strategy and Convention

Left to its own defaults, an agent reaches for the test type its training over-represents, the unit test. Fine for core logic, wrong for an endpoint. An endpoint needs a real HTTP layer wired to a real database and a real request shaping the response. Mock both and the test passes while proving little about the system.

## The test taxonomy

Different test types prove different things at different boundaries. No row in the table below substitutes for another.

A working taxonomy, representative rather than prescriptive:

| Type | What it proves | Scope |
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
| Manual | Intent is specified in the spec, but automated proof is not yet written or not practical | Any level |

Most projects settle on a subset. The important step is to write the allowed test types into a project document before the agent starts inventing its own defaults.

*Sources: Dave Farley, "Modern Software Engineering" (Addison-Wesley, 2021), tests as boundary-specific feedback loops, the basis for matching the test type to what it proves. The taxonomy rows above are this book's synthesis.*

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

Type answers what the test proves. Level answers when it runs. Write both axes down in a file the agent can read, or the agent will make them up from whatever pattern it saw last.

The document belongs with the project's architecture docs, wherever those live. The agent reads it before writing a test. Without it, every session reopens the same choices: framework, file location, level.

The decision to adopt a specific convention, and the rationale for each choice, belongs in an ADR. The ADR stays. The convention document evolves.

*Sources: Michael Nygard, "Documenting Architecture Decisions" (2011), ADRs as durable records of architectural rationale. The convention-document shape above is this book's workflow rule for making test-layer decisions readable by agents.*

## Scenario complexity and minimum test count

Not every AC is the same shape. The minimum test count follows from the AC's own complexity, the number of conditions it states rather than the paths the implementation introduces.

| AC complexity | Minimum tests |
|---|---|
| Simple (single condition) | 1 positive + 1 negative |
| Medium (2-3 conditions) | 2-3 positive + 2 negative |
| Complex (multiple conditions) | Several positive + several negative |

The underlying principle is equivalence partitioning: one test per valid partition, one per invalid. The tier mapping is this book's application of that to AC complexity. What makes a test genuine proof of its AC is the subject of [Tests as Proof, Not Ritual](./tests-as-proof).

This table belongs next to the scenario template. In the companion repo, that template lives at `tests/scenario-template.md`. The agent reads the template when writing scenarios and the strategy when implementing tests.

*Sources: Dave Farley, "Modern Software Engineering" (Addison-Wesley, 2021), tests as feedback against behavior boundaries. ISTQB "Foundation Level Syllabus" (ongoing), equivalence partitioning and boundary value analysis as the basis for minimum partition coverage. The complexity-to-count tier mapping is this book's synthesis, not a published standard.*

## The AC registry

The convention needs one more file, an AC registry that allocates acceptance-criterion IDs so two scenarios never collide on the same identifier. One row per component, updated in the same commit as any new scenario. In the companion repo, the registry lives at `tests/ac-registry.md`.

The allocation rule, the monotone-numbering discipline, and why a deleted ID leaves a permanent gap are the next chapter's subject: [AC IDs and Coverage](./ac-ids-coverage).

*Sources: intent-engineering-for-coding-agents/cli `tests/ac-registry.md` (ongoing), monotone AC registry layout and non-reuse rule.*

## Tooling note

The companion repo includes the working convention set: `tests/test-strategy.md` (test types, locations, markers), `tests/scenario-template.md` (scenario format and complexity tiers), and `tests/ac-registry.md` (prefix allocation).

The strategy document is what separates a test suite that knows what it is proving from one that grew by accumulation.

The strategy document governs what the agent tests, not how the agent is configured. The `AGENTS.md` and instruction files are code too. They regress without anyone touching the application. That is the next chapter.
