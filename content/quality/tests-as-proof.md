# Tests as Proof, Not Ritual

Green tests feel like proof. They are not proof. A suite runs fully green over code that is quietly broken because the tests cover the paths the prose happened to mention and nothing else.

Consider a spec with one acceptance criterion: files must not exceed 10 MB. The agent writes a test that uploads a 5 MB file and asserts the response is 200. The test passes. It would still pass if the size check were deleted entirely. It exercises the path that works. It does not prove the limit holds. The AC is in the spec. The proof is not in the suite.

This is not a *code coverage* problem, which measures whether a test touches a line. AC coverage measures whether a test would fail if an acceptance criterion were violated. A suite reaching 100% line coverage still proves none of its ACs.

The two metrics answer different questions, and only one tells you whether the implementation matches the spec.

The same AC admits many implementations: a guard clause, an early return, a validator extracted into its own class. Each variation has different code paths, so tests written to cover one implementation prove nothing about another. If the agent regenerates the code or takes a different approach, coverage-based tests stay green while the AC goes unverified. Tests anchored to the AC remain valid through that churn. Tests anchored to the implementation do not. Code and tests that do not contribute to proving an acceptance criterion are not wrong, but they are not what this chapter is about.

The tests passed. Passing is not the same as proving.

Proof is not perfectionism. The minimum bar is automated evidence that the implementation meets the spec. The same bar applies whether the code came from an agent or a human. Acceptance criteria answer one narrow question: did the change do what the change was supposed to do? That narrow question matters because no amount of implementation detail answers it from the code alone.

Specs are often incomplete, scenarios go missing, tests assert too little. None of that makes proof impossible. The bar is imperfect, not optional. Below it, you are shipping on faith that the implementation matched the goal. Once AC coverage is in place, quality goes further: code review, inspection, and deeper testing disciplines all have room above it. The ACs have to be covered first.

## The bar a test has to clear

A test is proof when it would fail if the implementation diverged from the spec. Otherwise, it is decoration. Open the spec, pick a scenario, modify the implementation to violate it, run the tests. If everything stays green, the tests do not prove that scenario. They prove that something runs.

Most test suites contain a mix of both. Tests written to cover the happy path tend to be proof. Tests written to lift coverage to a target tend to be decoration. Mutation testing is the practical detector. Flip an operator, change a constant, invert a boolean. If the suite still passes, the mutation stayed green, and whatever it touched is not actually under test. ThoughtWorks Technology Radar Vol 34 (April 2026) recommends mutation testing as a feedback control suited to agentic delivery: agents will hit a coverage number. They cannot fake a mutation kill rate without writing genuine assertions.

Stop measuring "is there a test for this line?" Start measuring "would a wrong implementation be caught?" Which paths you need to cover to answer that for every AC is the harder question.

*Sources: Jia and Harman, "An Analysis and Survey of the Development of Mutation Testing" (IEEE TSE, 2011), mutation testing as an established technique for detecting tests that assert too little. ThoughtWorks, Technology Radar Vol 34 (April 2026), mutation testing recommended as a feedback control suited to agentic delivery.*

## Paths, not lines

The starting point is the AC, not the code. For each acceptance criterion, ask what scenarios are needed to prove it fully: the positive path where it holds, the negative paths where it is violated, and any boundary values the criterion implies. The 10 MB limit needs at least two tests: one proving a valid file passes, one proving an oversized file is rejected. Without the second, the limit is not proven, regardless of how many lines the first test touches. A more precise AC might add a third: a file at exactly 10 MB, to pin the boundary.

The prose of a spec tends to describe the positive path most clearly. The negative paths are often implied rather than stated, and boundaries are easy to overlook. An agent generating its own test list reads the same prose and stops at the same place. The practical progression for each AC: positive path first, then each way the criterion is violated, then boundary values where the criterion has a threshold. That order follows where the proof is thinnest, not where the code is most complex.

AC coverage does not replace the rest of testing. Tests that prove acceptance criteria cover the goal of the change, not every path the implementation introduces and not every risk the system carries. A branch added for an edge case the spec did not anticipate, an exception handler, a defensive check: none are tied to an AC, but all of them break. Code coverage, integration checks, architectural tests, performance tests, and security review catch failures proof does not reach. AC coverage answers "did we build the right change?" The rest of the test strategy answers "what else breaks while doing it?" Both are required. Which kind of test closes which gap is the question the next section takes on.

## Choosing the right test type

This applies within a test type. Across test types, a different question applies: which type of test is the right proof for this scenario? Unit, integration, acceptance, end-to-end, and architectural tests each prove something the others do not. A unit test proves a function in isolation. It proves nothing about the HTTP layer above it. An integration test proves a module pipeline. It proves nothing about the deployed system. The chapter on [Test Strategy and Convention](./test-strategy) covers the taxonomy and how to encode it as a project-level convention the agent reads before it writes its first test.

## Done means proven

The team had a definition of done that read: "implementation complete, tests passing, PR merged". That phrasing came from the pre-agent era and stopped working the day the agent shipped its first feature in an afternoon. Implementation complete is now a low bar. Tests passing only means the tests that exist pass.

The working definition in this book:

> A change is done when the approved intent (specs) has proof and the implementation (code) has coverage.

Approved intent is the spec, reviewed and merged. Proof is tests across every AC scenario: each one fails when its criterion is violated. Coverage is tests across the paths the implementation introduces. Both have to be there, and proof has to be connected to the spec through an identifier that does not break when the prose moves.

Farley's Modern Software Engineering frames this as a feedback loop: the spec opens it, the test closes it. Without the closing step, the process produces artifacts, not engineering. Vibe coding skips the test on purpose. Most agentic workflows skip it by default.

*Sources: Dave Farley, "Modern Software Engineering" (Addison-Wesley, 2021), engineering as feedback loops that prove intent. The done-means-proven definition is this book's synthesis.*

## Why agentic speed forces the issue

A human team shipping one feature a week relies partly on social verification. Someone reviews the PR carefully, the change is small, and the reviewer remembers the discussion. Memory carries some of the load.

An agentic team shipping several features a day cannot. Memory does not scale to that rate. PR review under time pressure becomes scanning. The reviewer who scanned the diff and approved it cannot, a week later, reconstruct what they were assuring. Without automated proof, the only thing standing between intent and production is whatever attention the human paid at the moment. That attention is exactly what the agent's speed is consuming.

Push the rate up far enough and the human leaves the moment entirely. An agent running unattended has no reviewer to ask whether a change is done, so it reads the test result instead. Proof stops being evidence a reviewer reads later and becomes the exit condition for the run: until every AC scenario passes, the agent keeps going or flags a blocker.

Automated proof is the only verification that scales to the speed. A test that fails when the implementation diverges from intent does not get tired, does not forget the spec, does not approve a change because the diff looked reasonable. The cost of writing it is paid once. The cost of skipping it is paid every time someone has to re-derive what the code is supposed to do.

A test that fires and flags a violation is not a broken test. The violation is the problem. The test found it before it shipped. At the delivery rate agents sustain, a catch before production is the most valuable outcome a test produces.

This is not a call for more tests. It is a call for tests that do the job. A suite that doubled in size last quarter and caught nothing new is a suite that grew without proving more. The number that matters is how many real defects the suite catches before they ship, and whether that number tracks the rate of change. If it does not, the tests are ritual.

## The traceability problem

Tests prove intent only when each test names the part of the intent it proves. A test named `test_retry_logic` covering five scenarios proves nothing in particular. A failure in it says "something about retries broke" and leaves the reader to read the test body to find out what.

The fix is the acceptance criterion identifier (AC ID). Each spec scenario gets a stable and unique ID, and each test that proves a scenario references the ID. When a scenario fails, the failure points back to the specific intent that was not met. When the spec changes, a quick search shows which tests cover what. The next chapter on acceptance-criterion identifiers does the mechanics. The point here is the principle: a test not linked to a spec scenario proves general behavior, not specified intent.

A test scoped to one scenario and linked to its AC ID is also the most reliable working example of the feature's intended interface. It shows the exact calling convention, the inputs that matter, and the outputs to expect. The proof requirement is what makes it accurate. A comment describing the interface drifts silently, while a test that fails in CI when the code diverges does not. It is executable documentation, accurate for as long as the spec it traces is accurate. Whether that spec is right is a question no test answers.

## Reviewing the spec before the code

Everything in this chapter assumes the spec is right. That assumption does the most work and gets the least scrutiny.

If the spec is wrong, the tests pass, the build is green, and the feature ships doing the wrong thing correctly. The feedback loop closes in the wrong place. No automated check catches a well-implemented wrong requirement. That is a human job, and it has to happen before implementation starts, by reviewing the spec delta before the diff. [Trunk-Based Development with Agents](../team/trunk-based-development) covers how that review runs. No amount of test rigor substitutes for a review of the specs.

The spec does not have to contain everything it references. An ADR documenting why the retry limit is three, or why the session expires after twenty minutes, does not belong in the scenario text. It belongs in the decision record, linked from the spec.

## Ritual Tests Earn Their Place, Proof Has a Ceiling

Some tests will always be ritual. Smoke tests that confirm the application boots. Linting that confirms the syntax is current. End-to-end tests that confirm the integration is wired. These are not proof of intent. They are proof of plumbing. They earn their place by being inexpensive and by catching the failures that have nothing to do with what the code is supposed to do. Do not confuse them with the tests that prove the spec.

The harder issue is that a test proves what it asserts, not what the spec omitted. If the spec defines the 10 MB limit but says nothing about zero-byte files, the suite runs green while a zero-byte upload hits an unhandled path. Mutation testing, covered above, catches the first kind of gap: an assertion the suite should make but does not. The second kind, a scenario the spec never considered, does not show up in any test run. Someone has to read the spec and ask what was left out.

## Tooling note

If you want to see this in practice, the [`iec` companion repo](https://github.com/intent-engineering-for-coding-agents/cli) ships test traceability and coverage checks: a deterministic scan that cross-references acceptance criterion IDs in `openspec/specs/` against test markers in the test suite. A scenario without a test marker fails the check, and a test marker referencing a scenario that no longer exists fails the check. The check does not measure how good the test is. It measures whether the link is there at all, which is the precondition for everything else in this section.

A test that proves the spec is the closing half of the loop the previous chapter opened. The open half is what the spec promised, and the closing half is what runs in CI. Between them sits the thing the agent built. Knowing a test has to fail when intent breaks is only half the craft. The other half is knowing which kind of test proves which kind of behavior and writing that down before the agent picks a test type on its own.
