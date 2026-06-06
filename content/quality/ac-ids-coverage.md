# AC IDs and Positive/Negative Coverage

A spec and its tests are supposed to be the same promise written twice. Imagine a spec with five scenarios and a PR that ships eight tests. Two scenarios have no test at all. Three tests cover behavior the spec never mentioned. The reviewer approves it, because the tests pass and the diff looks reasonable. The next change to that feature breaks the two untested scenarios, and the team hears about it from a customer.

A spec and a test suite that drift apart silently are worse than no spec at all. The spec creates the expectation of traceability. The drift defeats it. The fix is a small piece of mechanics: a stable identifier on every acceptance criterion, and a rule that says no scenario is real unless something with that identifier runs in CI.

## What an Acceptance Criterion ID (AC ID) is

An AC ID is a stable, scenario-level identifier. Format: a bracketed prefix and a zero-padded number, such as `[GV-001]`, `[AUTH-014]`, `[CONF-007]`. Each acceptance scenario in a spec gets one. Tests reference the ID in a marker, a comment, or a test name. The link survives the prose being rewritten, the file being moved, the heading being reordered.

The prefix is 2–4 letters from the component or feature abbreviation. `GV` for GraphValidator, `AUTH` for authentication, `CONF` for configuration. The reader recognizes the component from the prefix without looking it up. Brackets make IDs visually distinct from the rest of the heading and grep-friendly: `grep "GV-" specs/` finds every graph-validator scenario instantly.

The ID is the contract between two files that change at different rates. The spec is rewritten during review. The tests are rewritten during implementation. Without a stable identifier, the only thing connecting them is matching prose, which is exactly the thing that does not match for long. With an identifier, the test moves, the scenario heading changes, the file splits into two, and the linkage holds.

This is an Intent Engineering convention layered on top of OpenSpec. OpenSpec is intentionally lightweight: its FAQ states, "Lightweight. Minimal steps, minimal process. We want to get you building as quickly as possible." OpenSpec prescribes the scenario structure (`#### Scenario: ...`) and the `WHEN/THEN` Gherkin style, but it does not mandate an ID format, test-type annotations, or positive/negative coverage rules. Those are this book's contribution: the quality layer that turns a spec from documented intent into provable behavior.

*Sources: OpenSpec (openspec.dev) and its FAQ (2026), the lightweight `#### Scenario:` / `WHEN/THEN` structure with no mandated ID format. Cucumber/Gherkin scenario structure, the `Given/When/Then` form this builds on. `iec` ADR-0005 "AC ID and Test-Type Convention" (2026-05-22), the AC ID and `Test-type:` convention this chapter documents.*

## The recommended field: `Test-type:`

Each scenario in a spec carries one recommended field: `Test-type:`. It records the per-scenario test-layer decision so a reviewer knows what to expect in a PR. Every scenario where it is omitted forces the agent to infer the test layer from the scenario content alone, which works most of the time and fails at the edges. Traceability, the link from spec to test, runs the other direction: the AC ID travels with the test, not with the spec.

```markdown
#### Scenario: Empty project directory [SC-001]

Test-type: integration

**Given** an empty target directory
**When** the user runs `iec init`
**Then** the directory contains `AGENTS.md`, `docs/`, and `openspec/`
```

`Test-type:` sits on its own line before the WHEN/THEN block. That placement is deliberate: the intended test category is a design-time decision, visible during spec review, not deferred until implementation. The agent writing a test for this scenario reads `Test-type: integration`, consults the test strategy document, picks the right framework, and puts the file in the right location. Without the field it guesses; with it, the category is locked at spec review.

A pointer from the spec to a specific test file path is the wrong coupling direction. Test files get renamed. Test methods get extracted. A path hardcoded in the spec goes stale without anyone noticing, which is the failure mode the practice is supposed to prevent. The right direction is from the test back to the spec: the `@Tag("SC-001")` annotation on the test is the stable link. A traceability scanner greps for `SC-001` in the test suite. It does not care which file the test lives in or what the method is named.

## Framework tagging: two annotations, two uses

The two spec fields, `[SC-001]` and `Test-type: integration`, map directly to two `@Tag` annotations on the test. Every test has both.

```java
@Test
@Tag("SC-001")
@Tag("integration")
void initCreatesExpectedStructure(@TempDir Path dir) { ... }
```

```python
@pytest.mark.SC_001
@pytest.mark.integration
def test_init_empty_directory(tmp_path): ...
```

Two tags, two independent uses. The traceability scanner greps for `SC-001` to verify the scenario has a corresponding test. The CI runner filters on `integration` to run only the integration tier in a specific pipeline stage, skipping e2e tests that require a deployed environment. One annotation operation; two traceability channels that serve different purposes and never interfere with each other.

Frameworks without a native tag mechanism fall back to a comment on the test method: `// AC: SC-001 | integration`. The comment does not integrate with the runner filter, but it satisfies the traceability scan. The fallback is worse than the tag; it is better than nothing.

## The AC registry

AC IDs are stable because they are monotone: numbers only go up. When a scenario is deleted, its ID is not reused. `GV-007` removed leaves a permanent gap. A changelog entry, a bug report, or a comment in code that references `GV-007` will find no scenario, which is the correct answer. No ambiguity about whether the slot was reassigned.

The registry file, `test/ac-registry.md` in the repo, maintains one row per component:

```markdown
| Prefix | Component         | Next |
|--------|-------------------|------|
| GV     | graph-validator   | 019  |
| AUTH   | authentication    | 007  |
| CONF   | configuration     | 023  |
```

When adding a new scenario: look up the prefix, use the `Next` value as the ID, increment `Next`, commit the registry update in the same commit as the scenario. The registry and the spec change together. A prefix that appears in a spec but not in the registry is an ID someone allocated by guessing.

The prefix itself is permanent. Never reassign it to a different component. `GV` means graph-validator for the lifetime of the project. If the component is renamed, the prefix stays.

## Positive proof is not enough

The default test for "user submits a valid form" passes when the form is accepted. That is one half of the proof. The other half is that an invalid form is rejected, with the right error, at the right layer. Both halves are required. The happy-path-only test suite proves that the feature works in the easy case. It says nothing about the failure case, which is where features break in production.

The rule: every acceptance criterion has at least one positive test and at least one negative test, unless the scenario has only one direction to verify. "When the user submits an empty form, the API returns a 400" is itself a negative-direction scenario; the positive direction is a separate scenario ("when the user submits a valid form, the API returns a 201"). Both scenarios exist. Both have tests.

This sounds like doubling the work. It doubles the test count, not the work. The two tests share setup, share the request structure, share the fixtures. What differs is the assertion. A 400 is asserted instead of a 201; an error payload is asserted instead of a success payload. The cost is small. The defect class it catches is the one that ships when the positive test passes and nobody wrote the negative.

A coverage check makes this deterministic: scan the spec, identify scenarios, count positive and negative tests per scenario, fail when a positive-direction scenario has no negative pair (or vice versa). The check does not measure quality. It measures the shape of the suite.

## A worked example

A spec for a "delete a user" endpoint, with three scenarios:

```markdown
#### Scenario: Delete an existing user [USR-008]

Test-type: integration

**Given** a user with id 42 exists
**When** DELETE /users/42 is called
**Then** the response is 204 and the user no longer exists

#### Scenario: Delete a non-existent user [USR-009]

Test-type: integration

**Given** no user with id 999 exists
**When** DELETE /users/999 is called
**Then** the response is 404 with `{ error: 'not found' }`

#### Scenario: Delete an already-deleted user [USR-010]

Test-type: integration

**Given** user 42 was deleted previously
**When** DELETE /users/42 is called
**Then** the response is 410 with `{ error: 'gone' }`
```

Three scenarios, three IDs, three `Test-type:` fields. `USR` is the prefix because this feature is about users, readable at a glance. The test type is `integration` because these scenarios exercise a real HTTP layer against a real database; a unit test with a mocked repository would not prove the HTTP status codes or the ORM query. The positive case is USR-008. The two negative cases are USR-009 and USR-010. The coverage check sees the pair. The traceability scanner greps for `USR-009` in the test suite and finds the tagged test, whether it lives in `test_users.py` or somewhere else entirely.

What is unusual here, by general industry practice, is not the structure. Acceptance scenarios in this form predate Intent Engineering by twenty years. What is unusual is the strictness: the ID is in the scenario heading and tagged on the test, and both are checked by a tool. The strictness is what makes the link survive an agentic codebase, where everything changes faster than memory can track it.

## The format is flexible, the link is not

The ID format is conventional. `[PROJECT-NNN]` works. `[FEAT-NNN]` works. `SCAFFOLD-001` works. What matters is that the format is consistent within a repo, the IDs are stable once assigned, and the IDs do not collide. Numbering does not have to be dense; gaps from withdrawn scenarios are fine.

Tests that prove the wrong thing still pass. An AC ID linking to a test that asserts a different behavior than the scenario specifies looks fine to the traceability check and fails the underlying purpose. The check verifies the link exists. It does not verify the test is correct. That is what the human spec review is for, and what the next chapter on lifecycle checkpoints is built around.

Refactoring spec scenarios is the failure mode to watch for. A scenario being rewritten to clarify its intent is fine; the ID stays, the wording changes, the test still proves the new wording because the new wording describes the same behavior. A scenario being rewritten to specify a different behavior, while keeping the ID, is silent drift. The fix is to retire the old ID and assign a new one. Same discipline as ADRs: when the decision changes, the new artifact gets a new identifier.

IDs and pairs are the mechanics. The next chapter is where those mechanics fit into a project's calendar: when each check is paid attention to, before and during and after the change.
