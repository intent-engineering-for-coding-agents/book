# Code Review for Agent-Generated Code

The PR has a spec delta, acceptance criteria, a constraint section, and three hundred lines of implementation. The reviewer opens the diff.

Not from laziness. The diff is what changed. Review tooling presents it first. Every code review instinct from before coding agents was trained on diffs. The spec is new, and opening it first is a deliberate choice the tooling does not prompt and most reviewers have not built into habit.

[Trunk-Based Development with Agents](./trunk-based-development) names this as intent-first review: read the spec delta before the code diff, verify intent before implementation. The problem is not knowing the correct sequence. The problem is that review tooling, PR shape, and years of reviewer habit all point toward the diff. Making intent-first review the default requires shaping the PR so the spec is the obvious starting point, not the disciplined one.

This chapter covers three things: how to shape the PR so intent-first review happens by default rather than by discipline, how to bring a second agent into the review to check what the implementation agent and the human reviewer each miss, and what each kind of reviewer reliably gets wrong.

## PR shape: the spec as the load-bearing document

A change folder plus an implementation in one PR creates a size and sequencing problem simultaneously. The spec delta is forty lines. The implementation is three hundred lines. The diff view opens on the first file changed. If the implementation files appear before the change folder in the directory tree, the reviewer arrives at the acceptance criteria after reading three hundred lines of code with a model of the feature already formed.

A reviewer who has read the implementation first reads the spec to confirm what they already understood. They verify that the spec matches the code they read, not that the code matches the spec as written. The two documents contain different information, and reading them in the wrong order treats one of them as a formality.

The two-PR shape removes this problem by separating the documents. The first PR carries only the change folder: the proposal, design notes, delta spec, and acceptance criteria. Nothing executable. The reviewer reads the spec as a spec, without implementation to bias them. Corrections to intent happen before any code exists. The second PR delivers the implementation and archives the folder. The reviewer arrives with an approved spec and reads the diff against it. The review question changes from "what is this supposed to do?" to "does this do what was approved?"

When the split applies is the question [Trunk-Based Development with Agents](./trunk-based-development) already settles: if an intent-level correction found in review would force the implementation to be redone, the spec earns its own PR, otherwise spec and code ship together with the spec delta read first inside the single PR. What the review angle adds is why the split helps the reviewer. Once the spec PR has merged, reading the diff before the intent is structurally harder, so intent-first review stops depending on discipline.

The [PR Taxonomy](../quality/pr-taxonomy) chapter establishes that `docs`, `structural`, and `behavioral` PRs use different review styles and should not mix. The spec PR, carrying only the change folder, is a docs change. The implementation PR is behavioral. The two-PR shape is the natural expression of that taxonomy for decision-heavy behavioral changes.

*Sources: Fission AI, [OpenSpec](https://openspec.dev/) (ongoing), the change folder as the unit of spec-first review.*

## AI-assisted coverage review

A common failure mode in reviewing agent-generated code: the implementation agrees with the tests, the tests agree with each other, and neither agrees with the acceptance criteria. All three artifacts are internally consistent. All three are wrong relative to the spec.

An agent brought into the review with the spec and the implementation checks one thing efficiently: does every acceptance criterion have a corresponding test, and does the test assert what the criterion requires? This is coverage tracing. It is tedious enough that human reviewers skip it in practice. The agent does not find it tedious.

Ask it to enumerate each acceptance criterion, locate the corresponding test, and state what the test asserts. Flag any criterion with no test. Flag any test whose assertion does not match the criterion's requirement. Flag any test with no corresponding criterion.

The agent also checks scope. A behavioral implementation should deliver what the spec describes and nothing more. An agent working inside a long session accumulates context and adds small improvements: a helper function it needed, a config flag that seemed useful, a refactor it noticed while passing through. These additions are not in the spec. A reviewing agent, comparing the diff against the acceptance criteria, flags each changed line with no criterion to trace to.

What the review agent does not catch reliably: integration failures, whether the acceptance criteria were right in the first place, or whether the feature will work as intended in production. Those require judgment. The coverage and consistency check does not require judgment. That is the point.

A `check_spec_quality` command for `iec`'s MCP interface is planned: it will compare an implementation against its spec, trace acceptance criteria to tests, and flag deviations and scope additions. This is forthcoming.

*Sources: ThoughtWorks Technology Radar Vol 34 (April 2026), automated feedback controls at the merge gate as the model for systematic coverage checks that scale past manual review.*

## Multi-LLM critique

The implementation agent has context that biases its review. By the time the PR opens, it has resolved the spec's ambiguities, decided which edge cases were in scope, and written tests that confirm its choices. Asking it to review the same code produces the same choices confirmed again.

Birgitta Böckeler describes using a second model or a fresh session to critique a spec before implementation begins: the second agent reads without the context that shaped the first agent's decisions and finds gaps the author's session learned to overlook. The same approach extends to the review stage.

Open a fresh session. Provide the approved spec and the implementation diff, with no prior context from the implementation conversation. Ask it to enumerate the acceptance criteria and verify each one against the test suite. Ask it to flag anything in the diff with no acceptance criterion. Ask it to flag any acceptance criterion with no test.

The output is a checklist, not a verdict. The human reviewer uses it to direct attention toward the sections most likely to contain gaps. The fresh agent locates where to look. The human decides whether the divergence is a defect, a spec omission, or an intentional extension that needs to be documented before it becomes undocumented behavior.

This step is not free. It costs a context load and a review pass. For high-stakes behavioral changes where the spec has dozens of acceptance criteria, the tracing it provides is worth it. For a change with three acceptance criteria and three tests, skipping this step is defensible.

*Sources: Birgitta Böckeler, ["Navigating AI Development Workflows"](https://refactoring.fm/p/navigating-ai-development-workflows), Refactoring.fm, using a second model or fresh session to critique a spec without implementation-context bias.*

## What human reviewers miss, what agent reviewers miss

The gaps are complementary. Each reviewer covers what the other does not.

Human reviewers tend to miss three things in agent-generated code. These are analytical observations from the structure of spec-driven review, not sourced findings.

The competence heuristic. Code that is well-formatted, well-named, and well-tested reads as careful. Careful-looking code triggers reduced scrutiny. The reviewer notes the test exists and moves on without asking whether the test asserts the right thing. Agent output is consistently well-formatted, and this consistency suppresses the adversarial reading a behavioral change is owed.

Unchanged context. Review tooling shows what changed. The connection between the change and the rest of the system does not appear in the diff unless the reviewer actively opens neighboring files. An agent-generated change that introduces a dependency on a function three files away leaves no trace in the changed lines. The reviewer does not see what was not red or green.

Constraints past the top. The [Why Important Stuff First?](../spec-driven/why-important-first) chapter addresses this from the authoring side: agents lose focus reading top-down. The same applies in review. A reviewer who reads the acceptance criteria and skips the constraint section approves an implementation that handles the happy path correctly and the constrained edge case incorrectly. The constraint was in the spec, in section three.

Agent reviewers tend to miss two things.

Integration context. The implementation is correct against the spec. The service it calls has a latency the spec did not model. The middleware runs in a different order in production than in test. The agent reviewed the code and the spec. It did not review the runtime behavior of the system the code will integrate with.

Silent ambiguity resolution. Ambiguous acceptance criteria get resolved. The agent resolves them in the direction that makes the implementation simplest, without surfacing the choice as a choice. The implementation is internally consistent. Whether the resolution was correct is a question nobody asked.

A human doing intent-and-integration review and an agent doing coverage-and-consistency review together cover more of the failure surface than either alone. Neither covers it completely.

## The review is one gate

These practices raise the quality of what ships. They are not a guarantee. ThoughtWorks Technology Radar Vol 34 names cognitive debt as the agentic-era failure mode: the undocumented assumption that propagates through subsequent changes until it surfaces in production. The review catches divergences between spec and implementation. It does not catch divergences between the spec and reality, or the spec and what the user actually needed.

At agentic speeds, the review gate handles more volume than before. The quality of what reaches it depends on the spec that preceded it. The quality of the spec depends on the discipline applied upstream: intent stated clearly, scope constrained, constraints at the top.

A disciplined review process is only as consistent as the conventions that back it. One reviewer who reads spec-first and another who reads diff-first, reviewing code generated by the same agent against the same spec, produce different results. The conventions that make intent-first review consistent across the team are the same conventions that make everything else consistent: a shared brief that every agent and every developer reads before the first session.

*Sources: ThoughtWorks Technology Radar Vol 34 (April 2026), cognitive debt as the agentic-era failure mode that the merge gate alone is not sufficient to prevent.*
