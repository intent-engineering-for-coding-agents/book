---
type: chapter
title: "Tests as Evidence, Not Ritual"
---

# Tests as Evidence, Not Ritual

Green tests look like evidence. I have merged on that feeling more times than I care to admit, and most developers have: suite green, diff reasonable, ship it. But a suite can run fully green over code that is quietly broken, because the tests cover the paths the prose happened to mention and nothing else.

Consider a spec with one acceptance criterion: files must not exceed 10 MB. The agent writes a test that uploads a 5 MB file and asserts the response is 200. The test passes. It would still pass if the size check were deleted entirely. The AC is in the spec; the evidence is nowhere in the suite.

Code coverage will not catch this. Coverage measures whether a test touches a line, and the upload test touches plenty of them. AC coverage asks a harder question: would any test fail if this acceptance criterion were violated?

The same AC admits many implementations, a guard clause, an early return, a validator extracted into its own class, and tests anchored to one implementation go stale when the implementation changes. Tests anchored to the AC stay aligned through that churn.

None of this is perfectionism. The minimum bar is automated evidence that the implementation meets the spec. Below that bar, you are shipping on faith that the change matched the goal.

## The bar a test has to clear

A test counts as evidence when it would fail if the implementation diverged from the spec. Otherwise, it is decoration. My favorite check is crude but honest: open the spec, pick a scenario, break the implementation on purpose, and run the suite. If everything stays green, the tests never exercise that scenario.

I also distrust a complex implementation with one positive test and no negative paths. To find out how the code fails, I have to read the implementation and work out which tests are missing. That takes time, and I might misunderstand the behavior and write the new test against the wrong assumption. Worse is a simple behavior buried under pages of mocks and test setup. At that point I do not only question the test. Code that takes more effort to fake than to execute is often asking for a redesign.

I have seen tests piggyback on shared test helpers carrying their own assumptions and defects. The test appears to exercise the subject under test, but most of the behavior lives in scaffolding nobody is reviewing. This happens when passing the coverage check becomes the goal. A developer writes the quickest test that turns CI green, and a weaker coding agent generates more tests built on the same bad assumptions.

Most suites contain a mix of evidence and decoration, and mutation testing is the practical detector: flip an operator, change a constant, invert a boolean, and see whether anything complains. If the suite still passes, whatever you touched was not under test. ThoughtWorks Technology Radar Vol 34 (April 2026) recommends mutation testing as a feedback control suited to agentic delivery, which matches my reading: it is the automated version of breaking the implementation on purpose.

Stop measuring "is there a test for this line?" Start measuring "would a wrong implementation be caught?"

*Sources: Jia and Harman, "An Analysis and Survey of the Development of Mutation Testing" (IEEE TSE, 2011), mutation testing as an established technique for detecting tests that assert too little. ThoughtWorks, Technology Radar Vol 34 (April 2026), mutation testing recommended as a feedback control suited to agentic delivery.*

## Paths, not lines

The starting point is the AC, not the code. For each acceptance criterion, ask what scenarios are needed for solid evidence: the positive path where it holds, the negative paths where it is violated, and any boundary values the criterion implies.

The 10 MB limit needs at least two tests, one verifying a valid file passes and one verifying an oversized file is rejected. A tighter spec may add a third: a file at exactly 10 MB.

The prose of a spec usually describes the positive path most clearly, implies the negative paths, and forgets the boundaries. An agent generating its own test list reads the same prose we wrote and stops in the same places we would.

AC coverage does not replace the rest of testing. It answers "did we build the right change?" The rest of the strategy answers "what else breaks while doing it?"

## Choosing the right test type

This evidence model applies within a test type. Across test types, a different question applies: which test boundary gives useful evidence for this scenario?

A unit test verifies a function in isolation, nothing about the HTTP layer above it. An integration test verifies a module pipeline works together, and still nothing about the deployed system end to end. [Test Strategy and Convention](./test-strategy) covers the taxonomy and how to encode it as a project-level convention.

## Done means backed by evidence

Every team I have worked with had some variation of "implementation complete, tests passing, PR merged" as its definition of done. That phrasing came from a slower era, when writing the implementation was the expensive part. It no longer is.

The working definition in this book:

> A change is done when the approved intent (specs) has evidence and the implementation (code) has coverage.

Approved intent is the spec, reviewed and merged. Evidence is tests across every AC scenario, each failing when its criterion is violated. Coverage is tests across the paths the implementation introduces. Both have to be there.

Farley's *Modern Software Engineering* frames this as a feedback loop: the spec opens it, the test closes it. Without the closing step, the process produces artifacts, not engineering.

*Sources: Dave Farley, "Modern Software Engineering" (Addison-Wesley, 2021), engineering as feedback loops that verify intent. The done definition is this book's synthesis.*

## Why agentic speed forces the issue

A team shipping one feature a week can lean partly on social verification. A developer reviews the PR carefully, the change is small, and the reviewer still remembers the planning discussion.

A team shipping several agent-built features a day cannot, because memory does not scale to that rate. PR review under time pressure becomes scan-based: changed files, green tests, merge. I have done that scan myself, and I suspect you have too.

Push the rate up far enough, and the developer leaves the moment entirely. An unattended agent has no reviewer to ask whether a change is done, so it reads the test result instead. Evidence becomes the exit condition for the run.

Automated evidence is the only verification that scales to the speed. A test that fails when the implementation diverges from intent does not get tired or forget the spec, and it never approves a change because the diff looked reasonable. Notice that nothing here asks for more tests, only for tests that fail on wrong behavior.

## The traceability problem

Tests verify intent only when each test names the part of the intent it checks. A test named `test_retry_logic` covering five scenarios tells the developer on call almost nothing when it fails.

The fix is the acceptance criterion identifier (AC ID). Each spec scenario gets a stable and unique ID, and each test that verifies a scenario references the ID. When a scenario fails, the failure points back to the specific intent that was not met.

There is a bonus: a test scoped to one scenario and linked to its AC ID is also the clearest working example of the feature's intended interface. It shows the inputs that matter and the outputs to expect.

## Reviewing the spec before the code

Everything in this chapter assumes the spec is right. That assumption does the most work and gets the least scrutiny.

If the spec is wrong, the tests pass, the build is green, and the feature ships doing the wrong thing correctly. No automated check catches a well-implemented wrong requirement. That is a job for developers, and it has to happen before implementation starts, by reviewing the spec delta before the diff. [Trunk-Based Development with Agents](../team/trunk-based-development) covers how that review runs.

The spec does not have to contain everything it references. An ADR documenting why the retry limit is three does not belong in the scenario text. It belongs in the decision record, linked from the spec.

## Ritual tests still have a job

Some tests will always be ritual, and that is fine. Smoke tests confirm the application boots, linting confirms the syntax is current, and end-to-end tests confirm the integration is wired. They are environment and wiring checks, not evidence of intent, and a healthy suite needs them too.

The harder issue is that a test verifies what it asserts, not what the spec omitted. If the spec says nothing about zero-byte files, the suite can stay green while that path is still broken. Someone has to read the spec and ask what was left out.

## Tooling note

The [`iec` companion repo](https://github.com/intent-engineering-for-coding-agents/cli) ships test traceability and coverage checks: a deterministic scan that cross-references acceptance criterion IDs in `openspec/specs/` against test markers in the test suite. A scenario without a test marker fails the check, and a test marker referencing a scenario that no longer exists fails the check.

A test linked to the spec is the closing half of the chain the previous chapter opened. The other half is selecting the correct test type and recording that choice before the agent generates the test.
