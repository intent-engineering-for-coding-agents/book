# Tests as Proof, Not Ritual

Green tests feel like done. They are not the same thing. A suite can run fully green over code that is quietly broken, because the tests cover the paths the prose happened to mention and nothing else.

Imagine a spec for a file upload: validate the type, check the size limit, write the file to storage, record the metadata. The agent implements all four and writes a test for each. Every test passes. But none of them interrupts the storage write partway through, so nothing covers the case where the metadata row is saved and the file never lands. That path is in the code. It has no proof. In production, the first failed write sits undetected until a user complains about a file the database insists exists.

The tests passed. The intent was not proven. Those are different sentences.

## The bar a test has to clear

A test is proof when it would fail if the implementation diverged from the spec. Otherwise it is decoration. The distinction is operational, not philosophical. Open the spec, pick a scenario, modify the implementation to violate it, run the tests. If everything stays green, the tests do not prove that scenario. They prove that something runs.

Most test suites contain a mix of both. Tests written to cover the happy path tend to be proof. Tests written to lift coverage to a target tend to be decoration. Mutation testing is the practical detector. Flip an operator, change a constant, invert a boolean. If the suite still passes, the mutation survived, and whatever the surviving mutation touched is not actually under test. ThoughtWorks Technology Radar Vol 34 (April 2026) names mutation testing specifically as the feedback control the agentic era needs: agents will hit a coverage number; they cannot fake a mutation kill rate without writing genuine assertions.

The shift is small in code and large in intent. Stop measuring "is there a test for this line?" Start measuring "would a wrong implementation be caught?"

Positive tests are the floor, not the ceiling. A test that exercises the happy path proves the intended behaviour when everything cooperates. It proves nothing about what happens when inputs are invalid, when a dependency returns an error, when the resource does not exist, or when the function is called in the wrong state. The upload example above is the canonical case. Four tests, all positive-path. The failed-write path existed in the code and had zero proof.

Coverage follows code structure, and code structure has more dimensions than a line counter sees. Every conditional branch is a path. Every distinct return type is a path. Every exception a function can raise is a path. Each path needs at least one test. A function with no branching needs two: the intended behaviour and the condition that falls outside it. A function with three `if` branches and two exception classes needs at least six. Agentic speed does not lower this minimum; it just makes it faster to reach the wrong answer.

The practical progression for a new function: happy path first, then the primary error path, then one test per branch, then one test per exception class, then boundary values at the edges of valid input. That order matches where defects cluster in practice. It is not the order most agents default to, which is happy path followed by whatever scenarios the prose most obviously suggested. The prose suggested the normal case. The defects live in the paths the prose did not think to name.

This applies within a test type. Across test types, a different question applies: which type of test is the right proof for this scenario? Unit, integration, acceptance, end-to-end, and architectural tests each prove something the others do not. A unit test proves a function in isolation; it proves nothing about the HTTP layer above it. An integration test proves a module pipeline; it proves nothing about the deployed system. The chapter on [Test Strategy and Convention](./test-strategy) covers the taxonomy and how to encode it as a project-level convention the agent reads before it writes its first test.

*Sources: ThoughtWorks, Technology Radar Vol 34 (April 2026), mutation testing as the feedback control that detects decorative tests. Dave Farley, *Modern Software Engineering* (Addison-Wesley, 2021), engineering as feedback loops that prove intent.*

## Done means proven

The team had a definition of done that read: "implementation complete, tests passing, PR merged". That phrasing survived from the pre-agent era and stopped working the day the agent shipped its first feature in an afternoon. Implementation complete is now a low bar. Tests passing only means the tests that exist pass.

The working definition in this book: a change is done when the approved intent has executable proof that covers the paths the code actually contains, not just the path the spec described first. Approved intent is the spec, reviewed and merged. Executable proof is a test that fails when the intent is not met, on the happy path and on every branch, error, and exception path the implementation introduces. Without the spec, there is nothing to approve. Without proof across the full structure, the approval is partial. Both have to be there, and they have to be connected to each other through an identifier that does not break when the prose moves.

Farley's *Modern Software Engineering* makes the same argument from a different angle. Engineering, as a discipline, is the application of feedback loops to produce reliable outcomes. The spec is the input to the loop. The test is what closes it. Without the closing step, you have a process that produces artefacts, not engineering. The term for doing this intentionally is vibe coding. The term for doing it by accident is most agentic workflows.

## Why agentic speed forces the issue

A human team shipping one feature a week can rely partly on social verification. Someone reviews the PR carefully. The change is small. The reviewer remembers the discussion. Memory carries some of the load.

An agentic team shipping several features a day cannot. Memory does not scale to that rate. PR review under time pressure becomes scanning. The reviewer who scanned the diff and approved it cannot, a week later, reconstruct what they were assuring. Without automated proof, the only thing standing between intent and production is whatever attention the human paid in the moment. That attention is exactly what the agent's speed is consuming.

Automated proof is the only verification that survives the speed. A test that fails when the implementation diverges from intent does not get tired, does not forget the spec, does not approve a change because the diff looked reasonable. The cost of writing it is paid once; the cost of skipping it is paid every time someone has to re-derive what the code is supposed to do.

This is not a call for more tests. It is a call for tests that do the job. A suite that doubled in size last quarter and caught nothing new is a suite that grew without proving more. The number that matters is how many real defects the suite catches before they ship, and whether that number tracks the rate of change. If it does not, the tests are ritual.

## The traceability problem

Tests prove intent only if you can tell which test proves which part of the intent. A test named `test_retry_logic` covering five scenarios proves nothing in particular. A failure in it says "something about retries broke" and leaves the reader to read the test body to find out what.

The fix is the acceptance criterion identifier. Each spec scenario gets a stable ID. Each test that proves a scenario references the ID. When a scenario fails, the failure points back to the specific intent that was not met. When the spec changes, a quick search shows which tests cover what. The next chapter on acceptance-criterion identifiers does the mechanics. The point here is the principle: a test that is not linked to a spec scenario proves general behaviour, not specified intent.

A test scoped to one scenario and linked to its AC ID is also the most reliable worked example of the feature's intended interface. It shows the exact calling convention, the inputs that matter, and the outputs to expect. The proof requirement is what makes it accurate. A comment describing the interface can drift silently. A test that fails in CI when the code diverges cannot. It is executable documentation, and it is free. You get it automatically when you write the test right.

## Reviewing the spec before the code

Everything in this chapter assumes the spec is right. That assumption does the most work and gets the least scrutiny.

If the spec is wrong, the tests pass, the build is green, and the feature ships doing the wrong thing correctly. The feedback loop closes in the wrong place. No automated check catches a well-implemented wrong requirement. That is a human job, and it has to happen before implementation starts, by reviewing the spec delta before the diff. [Trunk-Based Development with Agents](../team/trunk-based-development) covers how that review runs; the point here is that no amount of test rigor substitutes for it.

The spec does not have to contain everything it references. An ADR documenting why the retry limit is three, or why the session expires after twenty minutes, does not belong in the scenario text. It belongs in the decision record, linked from the spec. The spec stays readable and the reasoning stays findable.

## Ritual tests earn their place; proof has a ceiling

Some tests will always be ritual. Smoke tests that confirm the application boots. Linting that confirms the syntax is current. End-to-end tests that confirm the integration is wired. These are not proof of intent; they are proof of plumbing. They earn their place by being cheap and by catching the failures that have nothing to do with what the code is supposed to do. Do not confuse them with the tests that prove the spec.

The harder caveat is that proof has a ceiling. A test proves what it asserts. It does not prove what the spec did not think to specify. The mutation that survives the suite reveals that the suite has a hole. The scenario that was not considered reveals that the spec has a hole. Both holes are real. The first is fixable with more assertions. The second is fixable only by improving the spec. Proof closes the loop between spec and implementation. It does not close the loop between intent and reality.

## Tooling note

If you want to see this in practice, `ase-cli` at tag `v0.6.0` will ship test traceability and coverage checks: a deterministic scan that cross-references acceptance criterion IDs in `openspec/specs/` against test markers in the test suite. A scenario without a test marker fails the check. A test marker referencing a scenario that no longer exists fails the check. The check does not measure how good the test is. It measures whether the link is there at all, which is the precondition for everything else in this section.

A test that proves the spec is the closing half of the loop the previous chapter opened. The open half is what the spec promised. The closing half is what runs in CI. Between them sits the thing the agent built. The next question is how the agent setup itself gets verified, because a test suite that catches code regressions does nothing to catch the agent setup regressing into a configuration that ships worse code.
