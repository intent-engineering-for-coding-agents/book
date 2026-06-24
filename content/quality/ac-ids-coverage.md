# AC IDs and Coverage

A spec and its tests are supposed to be the same promise written twice. Consider a spec with scenarios and a PR with tests. Some scenarios have no test at all, and some tests cover behavior the spec never mentioned. The reviewer approves it because the tests pass and the diff looks reasonable. The next change breaks the untested scenario, and the team hears about it from a customer.

A spec and a test suite that drift apart silently are worse than no spec at all. The spec creates the expectation of traceability, and drift defeats it. The fix is a small piece of mechanics: a stable identifier on every acceptance criterion, and a rule that says no scenario is real unless something with that identifier runs in CI.

## What is an Acceptance Criterion ID?

An Acceptance Criterion ID (AC ID) is a stable, scenario-level identifier: a prefix and a zero-padded number, wrapped in brackets so it is easy to spot in a heading and detect with a grep, such as `[GV-001]`, `[AUTH-014]`, `[CONF-007]`. Each acceptance scenario in a spec gets one, and tests reference the ID in a marker, a comment, or a test name. The link survives the prose being rewritten, the file being moved, the heading being reordered.

The prefix is a short uppercase abbreviation of the component or feature, usually two to four letters, the same shape as an issue-tracker project key. `GV` for GraphValidator, `AUTH` for authentication, `CONF` for configuration. Longer is allowed when a component needs it: the constraint is readability inside a bracketed heading, not a letter count. The reader recognizes the component from the prefix without looking it up, and `grep "GV-" specs/` finds every graph-validator scenario.

The ID is the contract between two files that change at different rates. The spec is rewritten during review. The tests are rewritten during implementation. Without a stable identifier, the only thing connecting them is matching prose, which is the thing that stops matching first.

This is an Intent Engineering convention layered on top of OpenSpec. OpenSpec is intentionally lightweight: its FAQ states, "Lightweight. Minimal steps, minimal process. We want to get you building as quickly as possible". OpenSpec prescribes the scenario structure (`#### Scenario: ...`) and the `WHEN/THEN` Gherkin style, but it does not mandate an ID format, test-type annotations, or positive/negative coverage rules. So yes, the scenario form sits in the BDD family. The stricter traceability and coverage rules do not. Those are this book's contribution: the quality layer that turns a spec from documented intent into provable behavior. In the companion repo, the convention is recorded in `docs/decisions/0007-ac-id-and-test-type-convention.md`.

The syntax is the easy part. A scenario written in correct Gherkin is still weak when the intent behind it is vague. Missing preconditions, ambiguous outcomes, unstated boundaries, and silent failure paths survive perfect `Given/When/Then` formatting. Better source material produces better scenarios. Practice produces better source material. The format helps the writer think. The format does not do the thinking for them.

*Sources: OpenSpec (openspec.dev) FAQ (ongoing), the lightweight `#### Scenario:` / `WHEN/THEN` structure with no mandated ID format. Cucumber "Gherkin reference" (ongoing), the `Given/When/Then` form this builds on. intent-engineering-for-coding-agents/cli `docs/decisions/0007-ac-id-and-test-type-convention.md` (ongoing), AC ID format and `Test-type:` as a project convention enforced by checks.*

## The recommended field: `Test-type:`

Each scenario in a spec carries one recommended field: `Test-type:`. It records the per-scenario test-layer decision so a reviewer knows what to expect in the review. The book recommends the field. The companion repo goes further and makes it mandatory, checked on every scenario. Omit it, and the agent infers the test layer from the scenario content alone, which works most of the time and fails at the edges.

```markdown
#### Scenario: Empty project directory [SC-001]

Test-type: Integration

**Given** an empty target directory
**When** the user runs `iec init`
**Then** the directory contains `AGENTS.md`, `docs/`, and `openspec/`
```

`Test-type:` sits on its own line before the WHEN/THEN block. That placement is deliberate: the intended test category is a design-time decision, visible during spec review, not deferred until implementation. The agent writing a test for this scenario reads `Test-type: Integration`, consults the test strategy document, picks the right framework, and puts the file in the right location. Without the field it guesses.

A pointer from the spec to a specific test file path is the wrong coupling direction. Test files get renamed, test methods get extracted, and a path hardcoded in the spec goes stale without anyone noticing. That is the failure mode the practice is supposed to prevent. The right direction is from the test back to the spec: the `@Tag("SC-001")` annotation on the test is the stable link. A traceability scanner greps for `SC-001` in the test suite. It does not care which file the test lives in or what the method is named.

*Sources: intent-engineering-for-coding-agents/cli `docs/decisions/0007-ac-id-and-test-type-convention.md` (ongoing), the `Test-type:` field and test-back-to-spec tagging convention. This field is a book and companion-repo convention layered onto OpenSpec, not an OpenSpec requirement.*

## Framework tagging: two annotations, two uses

The two spec fields, `[SC-001]` and `Test-type: Integration`, map directly to two test annotations. Every test has both.

```java
@Test
@Tag("SC-001")
@Tag("integration")
void initCreatesExpectedStructure(@TempDir Path dir) { ... }
```

```python
@pytest.mark.ac("SC-001")
@pytest.mark.integration
def test_init_empty_directory(tmp_path): ...
```

Two tags, two independent uses. The traceability scanner greps for `SC-001` to verify the scenario has a corresponding test. The CI runner filters on `integration` to run only the integration tier in a specific pipeline stage, skipping e2e tests that require a deployed environment. One tagging step, two channels that never interfere.

None of this machinery is new. Test tags in JUnit, pytest, and the rest exist primarily for selective execution: run the smoke set, skip the slow e2e tier. BDD tooling went further years ago, tagging Cucumber scenarios with issue keys like `@JIRA-1234` to link a scenario back to a ticket. The AC ID convention is that same move made strict: the tag carries a registry-allocated ID, and a CI check fails when a scenario has no test wearing it.

Frameworks without a native tag mechanism fall back to a comment on the test method:

```text
// AC: SC-001 | Integration
```

The comment does not integrate with the runner filter, but it satisfies the traceability scan. The fallback is worse than the tag. It is better than nothing.

*Sources: Cucumber "Tags" (ongoing), scenario `@tags` for selective execution and for linking scenarios to issue or requirement IDs, the BDD lineage this convention borrows. JUnit 5 "Tagging and Filtering" (ongoing), `@Tag` for selective test execution. intent-engineering-for-coding-agents/cli `docs/decisions/0007-ac-id-and-test-type-convention.md` (ongoing), dual tagging by AC ID and test type. The framework-specific syntax above is illustrative implementation guidance.*

## The AC registry

AC IDs are stable because they are monotone: numbers only go up. When a scenario is deleted, its ID is not reused. Removing `GV-007` leaves a permanent gap. A changelog entry, a bug report, or a comment in code that references `GV-007` will find no scenario, which is the correct answer. No ambiguity about whether the slot was reassigned.

The registry, `tests/ac-registry.md` in the companion repo, keeps one row per component prefix. The shape is simple:

```markdown
| Prefix | Component         | Max used |
|--------|-------------------|----------|
| GV     | graph-validator   | 018      |
| AUTH   | authentication    | 006      |
| CONF   | configuration     | 022      |
```

When adding a new scenario: look up the prefix, increment its `Max used` value, use the result as the new ID, and commit the registry update in the same commit as the scenario. The registry and the spec change together. A prefix that appears in a spec but not in the registry is an ID someone allocated by guessing.

The prefix itself is permanent. Never reassign it to a different component. `GV` means graph-validator for the lifetime of the project. If the component is renamed, the prefix stays.

*Sources: intent-engineering-for-coding-agents/cli `docs/decisions/0007-ac-id-and-test-type-convention.md` (ongoing), monotone IDs, registry allocation, and permanent prefixes as repo convention.*

## Enforcing the pairs

[Tests as Proof, Not Ritual](./tests-as-proof) made the case that proving an acceptance criterion takes more than the happy path: the positive path, each way the criterion is violated, and any boundary it implies. AC IDs turn that principle into something a tool enforces. Because every scenario carries an ID and every test wears it, a check counts what proves each criterion and fails when a direction is missing.

The check is deterministic: scan the spec, identify scenarios, count positive and negative tests per scenario, fail when a positive-direction scenario has no negative pair (or vice versa), unless the scenario has only one direction to verify. "When the user submits an empty form, the API returns a 400" is itself a negative-direction scenario. Its positive counterpart ("a valid form returns a 201") is a separate scenario with its own ID. This is coverage of acceptance criteria, not the percentage of code lines a test run executes. It measures the shape of the suite, not the quality of any one test.

*Sources: intent-engineering-for-coding-agents/cli `docs/decisions/0007-ac-id-and-test-type-convention.md` (ongoing), positive and negative coverage as the companion-repo convention.*

## A worked example

A spec for a "delete a user" endpoint, with three scenarios:

```markdown
#### Scenario: Delete an existing user [USR-008]

Test-type: Integration

**Given** a user with id 42 exists
**When** DELETE /users/42 is called
**Then** the response is 204 and the user no longer exists

#### Scenario: Delete a non-existent user [USR-009]

Test-type: Integration

**Given** no user with id 999 exists
**When** DELETE /users/999 is called
**Then** the response is 404 with `{ error: 'not found' }`

#### Scenario: Delete an already-deleted user [USR-010]

Test-type: Integration

**Given** user 42 was deleted previously
**When** DELETE /users/42 is called
**Then** the response is 410 with `{ error: 'gone' }`
```

Three scenarios, three IDs, three `Test-type:` fields. `USR` is the prefix because this feature is about users, readable at a glance. The test type is `Integration` because these scenarios exercise a real HTTP layer against a real database. A unit test with a mocked repository would not prove the HTTP status codes or the ORM query. USR-008 is the positive case, while USR-009 and USR-010 are negative cases. The AC-coverage check sees the pair. The traceability scanner greps for `USR-009` in the test suite and finds the tagged test.

What is unusual here is not the structure. Acceptance scenarios in this form predate Intent Engineering by twenty years. What is unusual is the strictness: the ID is in the scenario heading and tagged on the test, and both are checked by a tool. The strictness is what makes the link survive an agentic codebase, where everything changes faster than anyone tracks by hand.

A generated scenario should therefore be treated as a draft, not a verdict. When the scenario is too weak to write a good test from, the problem is upstream in the acceptance criteria, the missing context, or the review discipline around them. The syntax did its job. The intent did not.

*Sources: Cucumber "Gherkin reference" (ongoing), the `Given/When/Then` acceptance-scenario form. intent-engineering-for-coding-agents/cli `docs/decisions/0007-ac-id-and-test-type-convention.md` (ongoing), strict AC ID and `Test-type:` pairing as the companion-repo convention.*

## The format is flexible, the link is not

The bracket format is a convention, not a law. `[PROJECT-NNN]`, `[FEAT-NNN]`, and `SCAFFOLD-001` all work. What matters is that a repo picks one shape, holds to it, and never lets two scenarios share an ID. Stability and the gaps left by withdrawn scenarios are the registry's concern, settled above.

Tests that prove the wrong thing still pass. An AC ID linking to a test that asserts a different behavior than the scenario specifies looks fine to the traceability check and fails the underlying purpose. The check verifies the link exists, not whether the test asserts what the scenario describes. That second judgment is not out of reach, though: line up the scenario's `Given/When/Then` against the test's setup, action, and assertions, and a mismatch shows. A human reviewer makes that call, and so does an agent handed both artifacts and asked whether they agree. That comparison is what the next chapter on lifecycle checkpoints is built around.

Refactoring spec scenarios is the failure mode to watch for. A scenario being rewritten to clarify its intent is fine. The ID stays, the wording changes, and the test still proves the new wording because the new wording describes the same behavior. A scenario being rewritten to specify a different behavior, while keeping the ID, is silent drift. The fix is to retire the old ID and assign a new one. Same discipline as ADRs: when the decision changes, the new artifact gets a new identifier.

*Sources: intent-engineering-for-coding-agents/cli `docs/decisions/0007-ac-id-and-test-type-convention.md` (ongoing), stable IDs, non-reuse, and traceability rules. Michael Nygard, "Documenting Architecture Decisions" (2011), new identifiers for changed decisions as the ADR analogy used here.*

IDs and pairs are the mechanics. The next chapter is where those mechanics fit into a project's schedule: when each check runs, before and during and after the change.
