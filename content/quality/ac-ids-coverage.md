---
type: chapter
title: AC IDs and Coverage
---

# AC IDs and Coverage

A spec and its tests are supposed to be the same promise written twice. Consider a spec with scenarios and a PR with tests. Some scenarios have no test at all, and some tests cover behavior the spec never mentioned. The reviewer approves it because the tests pass and the diff looks reasonable. The next change breaks the untested scenario, and the team hears about it from a customer.

A spec and a test suite that drift apart silently defeat the point. The spec promises traceability, but the link to the tests has broken. A stable identifier on every acceptance criterion keeps the link visible. A traceability check finds whether a matching test marker exists. It does not establish that the marked test ran or checked the criterion.

I first saw the value of acceptance criterion identifiers at a former employer. Customers and developers had one short name for the behavior under discussion. Nobody had to guess which paragraph, ticket comment, or test somebody meant.

The test side bothered me more. Anonymous tests leave no account of why they exist. I end up asking whether I am looking at evidence for an acceptance criterion, a regression test for a bug, or another line added to make a coverage dashboard green. I want a test to demonstrate how a feature works and to name the reason the project keeps it. An agent will generate another test without complaint. I still need to know why the test belongs in the suite.

## What is an Acceptance Criterion ID?

An Acceptance Criterion ID (AC ID) is a stable, scenario-level identifier: a prefix and a zero-padded number, wrapped in brackets so it is easy to spot in a heading and detect with a grep, such as `[GV-001]`, `[AUTH-014]`, `[CONF-007]`. Each acceptance scenario in a spec gets one, and tests reference the ID in a marker, a comment, or a test name. The link remains valid when the prose is rewritten, the file moves, or the heading order changes.

The prefix is a short uppercase abbreviation of the component or feature, usually two to four letters, the same shape as an issue-tracker project key. `GV` for GraphValidator, `AUTH` for authentication, `CONF` for configuration. Longer is allowed when a component needs it, since the constraint is readability inside a bracketed heading, not a letter count. The reader recognizes the component from the prefix without looking it up, and `grep "GV-" specs/` finds every graph-validator scenario.

The ID is the contract between two files that change at different rates. The spec is rewritten during review. The tests are rewritten during implementation. Without a stable identifier, the only thing connecting them is matching prose, which is the thing that stops matching first.

This is an Intent Engineering convention layered on top of OpenSpec. OpenSpec is intentionally lightweight. Its FAQ states, "Lightweight. Minimal steps, minimal process. We want to get you building as quickly as possible". OpenSpec prescribes the scenario structure (`#### Scenario: ...`) and the `WHEN/THEN` Gherkin style, but it does not mandate an ID format, test-type annotations, or positive/negative coverage rules.

The scenario form borrows Gherkin's `WHEN/THEN` notation, not the BDD practice that notation came from (the distinction is drawn in [The Spectrum](../spec-driven/the-spectrum)). The stricter traceability and coverage rules do not come from BDD either. Those are this book's contribution, the quality layer that turns a spec from documented intent into provable behavior.

In the companion repo, the convention is recorded in `docs/decisions/0007-ac-id-and-test-type-convention.md`.

The syntax is the easy part. A scenario written in correct Gherkin is still weak when the intent behind it is vague. Missing preconditions, ambiguous outcomes, unstated boundaries, and silent failure paths remain with perfect `Given/When/Then` formatting. Better source material produces better scenarios. Practice produces better source material. The format helps the writer think. The format does not do the thinking for them.

*Sources: OpenSpec (openspec.dev) FAQ (ongoing), the lightweight `#### Scenario:` / `WHEN/THEN` structure with no mandated ID format. Cucumber "Gherkin reference" (ongoing), the `Given/When/Then` form this builds on. intent-engineering-for-coding-agents/cli `docs/decisions/0007-ac-id-and-test-type-convention.md` (ongoing), AC ID format and `Test-type:` as a project convention enforced by checks.*

## The recommended field: `Test-type:`

Each scenario in a spec carries one recommended field: `Test-type:`. It records the per-scenario test-layer decision so a reviewer knows what to expect in the review. I want this choice visible in the spec PR because this is where a reviewer still has time to object. An end-to-end test in Cucumber might be excessive when an integration test covers the boundary at lower cost. Sometimes a fast unit test is enough. An architectural constraint belongs in an architecture test instead of a feature test.

`Test-type:` is this book's chosen field name. OpenSpec does not require it. The companion repo goes further and makes it mandatory, checked on every scenario. Omit the field, and the agent selects the layer from the scenario content alone. The generated test might verify a component, while the acceptance criterion describes behavior visible only through the HTTP boundary.

```markdown
#### Scenario: Empty project directory [SC-001]

Test-type: Integration

**Given** an empty target directory
**When** the user runs the project's init command
**Then** the directory contains `AGENTS.md`, `docs/`, and `openspec/`
```

`Test-type:` sits on its own line before the WHEN/THEN block. That placement is deliberate. The intended test category is a design-time decision, visible during spec review, not deferred until implementation. The agent writing a test for this scenario reads `Test-type: Integration`, consults the test strategy document, picks the right framework, and puts the file in the right location. Without the field it makes that choice for itself.

A pointer from the spec to a specific test file path is the wrong coupling direction. Test files get renamed, test methods get extracted, and a path hardcoded in the spec goes stale without anyone noticing. That is the failure mode the practice is supposed to prevent. The right direction is from the test back to the spec. The `@Tag("SC-001")` annotation on the test is the stable link. A traceability scanner greps for `SC-001` in the test suite. It does not care which file the test lives in or what the method is named.

*Sources: intent-engineering-for-coding-agents/cli `docs/decisions/0007-ac-id-and-test-type-convention.md` (ongoing), the `Test-type:` field and test-back-to-spec tagging convention. This field name is a book and companion-repo convention layered onto OpenSpec, not an OpenSpec requirement.*

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

Two tags, two uses. The traceability scanner greps for `SC-001` to find a matching test marker. The CI runner can filter on `integration` in a pipeline stage that excludes end-to-end tests requiring a deployed environment. A matching marker says nothing about the assertion's quality.

Test tags in JUnit and pytest support selective execution: run the smoke set, skip the slow end-to-end tier. Cucumber also supports tags that link scenarios to external requirements. This book's AC ID convention adds a registry-allocated ID and a check for missing test markers.

Frameworks without a native tag mechanism fall back to a comment on the test method:

```text
// AC: SC-001 | Integration
```

The comment does not integrate with the runner filter, but it satisfies the traceability scan. The fallback is worse than the tag but better than nothing.

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

When adding a new scenario: look up the prefix, increment its `Max used` value, use the result as the new ID, and commit the registry update in the same commit as the scenario. The registry and the spec change together. A prefix that appears in a spec but not in the registry is an ID someone allocated by individual choice instead of through the registry.

The prefix itself is permanent. Never reassign it to a different component. `GV` means graph-validator for the lifetime of the project. If the component is renamed, the prefix stays.

*Sources: intent-engineering-for-coding-agents/cli `docs/decisions/0007-ac-id-and-test-type-convention.md` (ongoing), monotone IDs, registry allocation, and permanent prefixes as repo convention.*

## The registry is a work queue

A registry that only reports percentages is a dashboard. A reviewer cannot act on a dashboard. The useful form is a work queue: one row per acceptance criterion, one status, one next move.

I use three states for this work queue:

- `covered`: a reviewer has checked the tagged test's assertions at the declared boundary
- `partial`: some evidence exists, but one observable part is still missing
- `gap`: no evidence linked to the acceptance criterion

One small table is enough:

| AC ID | Status | Why |
|---|---|---|
| `AUTH-014` | `covered` | tagged assertions checked against the scenario |
| `AUTH-015` | `partial` | positive path covered, boundary case missing |
| `AUTH-016` | `gap` | no tagged evidence |

The `partial` state matters because real suites often land there. A team wrote the 403-path test. The session-expired redirect is still untested. Marking that row `covered` lies; marking it `gap` throws away the evidence already written. `partial` keeps the missing edge visible without pretending the whole scenario is open.

The row itself should carry the next task. For `AUTH-015`, the note might read: `403 path covered; expired-session redirect still untested`. The next test is then clear from the registry entry alone, no detective work needed.

This registry-as-work-queue pattern is this book's convention. OpenSpec does not require it. The point is not the exact file shape. The point is that missing evidence should sit in the same place as the IDs it is missing from.

*Sources: intent-engineering-for-coding-agents/cli (ongoing), AC registry examples and checker workflow. The `covered` / `partial` / `gap` work-queue pattern in this section is this book's synthesis built on top of AC traceability.*

## Enforcing the pairs

[Tests as Evidence, Not Ritual](./tests-as-evidence) made the case for checking positive, negative, and boundary behavior where the criterion calls for them. AC IDs make test markers countable. A reasonable CI rule fails when a non-Manual scenario has no marker and warns when it has fewer than two.

A marker check counts markers, not test direction or assertions. Two tests carrying the same ID can both exercise the happy path and still pass the count check. "When the user submits an empty form, the API returns a 400" is a negative-direction scenario. Its positive counterpart ("a valid form returns a 201") is a separate scenario with its own ID. A reviewer must inspect the tests for the missing behavior and boundaries.

*Sources: The marker-presence and two-marker thresholds follow the companion repo's checks at revision `2491a62`. The positive/negative review rule is this book's guidance.*

## When a criterion dies, its tests die

Every test in the suite needs a stated reason to exist. Either it carries an AC ID, or it carries a marker saying what else it is for. A test with neither is an orphan, and nobody reviewing the diff knows whether deleting it is safe.

Take `AUTH-015`, withdrawn from the spec. The registry keeps the gap, and `grep -r "AUTH-015" tests/` lists every test written for it. A test tagged only with `AUTH-015` is deleted in the same PR as the spec change. A test tagged with two IDs loses one tag and stays. If a test's assertions still guard behavior the team wants, the scenario was never dead, so it comes back under a new ID.

An agent handed an untagged suite finds the tests relevant to a change well enough. Names, imports, and assertions point at the right files, so for locating tests the ID is a convenience. Deletion is the harder job, because the agent has to prove a negative: no other reason keeps this test alive. The test body does not carry that reason. The agent either leaves dead tests in place until the suite is slow and full of noise, or removes the one test guarding behavior nobody wrote down.

### Tests with no criterion

Some tests have nothing to do with an acceptance criterion, and they still declare what they are. The companion repo's convention uses three markers: `BASELINE` for structural or coverage-threshold protection, `SANITY` for toolchain readiness, and `ARCHITECTURAL` for rules like dependency direction.

```java
@Test
@Tag("ARCHITECTURAL")
void domainDoesNotDependOnInfrastructure() { ... }
```

A test for a bug fix follows a stricter rule. If it proves externally visible behavior, the scenario gets written first and the test carries its ID. The test then lives and dies with that scenario. Only a test with no externally visible behavior to name gets a reason marker, and I would add the issue number or the removal condition in a comment beside it. That last habit is my suggestion, not part of the companion convention.

### The criterion as yardstick

The ID also gives you something to hold a changed test against. A refactoring or an agent "fixing" a red test leaves a test that passes, and passing says nothing about whether it still covers the criterion. Suppose the agent reacts to a failing test for `USR-009` by loosening the assertion to `status != 200`. The suite goes green. The scenario says 404 with `{ error: 'not found' }`, and the tag points straight at it.

The companion repo names this the AC fidelity check, an agent-assisted review of whether a tagged test still proves its scenario, because a test sometimes carries the right tag and asserts the wrong thing. It is the same comparison as in [the section on flexible formats](#the-format-is-flexible-the-link-is-not), but run on every change to the test, not once at review.

The unit of that check is the set of tests, because one criterion usually has several. A happy path, a boundary, an error body, and a persistence check often all carry `USR-009`. Together they have to cover every observable part of the `Then`. Removing one test during a cleanup is fine when the others still cover its part. Otherwise the registry row drops to `partial`.

### What the checks see

At revision `d89cc01`, the companion repo's `test-traceability` check fails when a non-Manual scenario has no marker and also when a marker names an ID that no spec carries. Retiring `AUTH-015` without deleting its tests therefore breaks the build. Earlier revisions only warned on orphaned markers, which left the green build this section argues against.

A second check, `test-untagged`, warns on test files that carry neither an AC marker nor a `BASELINE`, `SANITY`, or `ARCHITECTURAL` marker. It works per file. A file with one tagged test and ten anonymous ones passes, and telling a product-behavior test from a baseline test stays a review judgment.

A marker declares a reason without proving it, and `BASELINE` is the obvious home for tests nobody wants to defend. A growing `BASELINE` pile in review is the next cleanup.

*Sources: intent-engineering-for-coding-agents/cli `docs/testing-convention.md` (ongoing), the `BASELINE`/`SANITY`/`ARCHITECTURAL` markers, the rule that behavior tests carry an AC marker, and the AC fidelity check layer. intent-engineering-for-coding-agents/cli `src/iec_cli/checkers/test_traceability.py` and `test_untagged.py` at revision `d89cc01`, fail on missing and orphaned markers, warn on untagged test files. Retirement of tests with their criterion, the set-of-tests view, and the reason-comment habit are this book's synthesis.*

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

Three scenarios, three IDs, three `Test-type:` fields. `USR` is the prefix because this feature is about users, readable at a glance. The test type is `Integration` because these scenarios call for evidence across the HTTP and persistence boundaries. A unit test with a mocked repository would not verify either integration. USR-008 is the positive case, while USR-009 and USR-010 are negative cases. The reviewer checks those cases in the test suite. The traceability scanner only finds a tagged test for each ID.

What is unusual here is not the structure. Acceptance scenarios in this form predate Intent Engineering by twenty years. What is unusual is the strictness. The ID is in the scenario heading and tagged on the test, and both are checked by a tool. The strictness keeps the link intact in an agentic codebase, where everything changes faster than anyone tracks by hand.

A generated scenario should therefore be treated as a draft, not a verdict ([Spec Lifecycle](../spec-driven/spec-lifecycle#drafting-acceptance-criteria-from-upstream-material) lists the conditions for letting an agent draft them). When the scenario is too weak to write a good test from, the problem is upstream in the acceptance criteria, the missing context, or the review discipline around them. The syntax did its job. The intent did not.

*Sources: Cucumber "Gherkin reference" (ongoing), the `Given/When/Then` acceptance-scenario form. intent-engineering-for-coding-agents/cli `docs/decisions/0007-ac-id-and-test-type-convention.md` (ongoing), strict AC ID and `Test-type:` pairing as the companion-repo convention.*

## The format is flexible, the link is not

The bracket format is a convention, not a law. `[PROJECT-NNN]`, `[FEAT-NNN]`, and `SCAFFOLD-001` all work. What matters is that a repo picks one shape, holds to it, and never lets two scenarios share an ID. Stability and the gaps left by withdrawn scenarios are the registry's concern, settled above.

Tests that verify the wrong thing still pass. An AC ID linking to a test that asserts a different behavior than the scenario specifies looks fine to the traceability check and fails the underlying purpose. The check verifies the link exists, not whether the test asserts what the scenario describes.

Line up the scenario's `Given/When/Then` against the test's setup, action, and assertions. A reviewing agent can help locate a mismatch, but its report needs checking against both artifacts. [Code Review for Agent-Generated Code](../team/code-review-agent-code#trace-the-implementation-to-the-spec) describes the comparison.

Refactoring spec scenarios is the failure mode to watch for. A scenario being rewritten to clarify its intent is fine. The ID stays, the wording changes, and the test still verifies the new wording because the new wording describes the same behavior. A scenario being rewritten to specify a different behavior, while keeping the ID, is silent drift. The fix is to retire the old ID and assign a new one. Same discipline as ADRs: when the decision changes, the new artifact gets a new identifier.

*Sources: intent-engineering-for-coding-agents/cli `docs/decisions/0007-ac-id-and-test-type-convention.md` (ongoing), stable IDs, non-reuse, and traceability rules. Michael Nygard, "Documenting Architecture Decisions" (2011), new identifiers for changed decisions as the ADR analogy used here.*

IDs make the link between a spec and its tests visible. Documentation can use a lighter link to code paths so a change flags prose that needs another look. [Keeping Documentation Up to Date](./keeping-docs-up-to-date) develops that check.
