# Code Review for Agent-Generated Code

The diff was clean. The agent had written tidy, well-tested code. The reviewer approved it in ten minutes. Three days later, a support ticket arrived: the new export endpoint was skipping validation on the `reason` field for premium-tier users. The spec had explicitly listed this as acceptance criterion `[EXP-004]`. The test for `[EXP-004]` was present but asserted the wrong tier. The implementation had matched the wrong test. The reviewer had reviewed the diff; nobody had compared the diff to the spec.

The failure was not in the code. It was in the review sequence: the diff was read before the spec. The diff looked correct. It was the spec that would have caught the divergence.

## Read the spec delta first

Intent-first review is the practice of reading the spec delta before the code diff. Not as a formality. As the primary review. The questions to answer from the spec delta are: does this intent match what was planned? Is anything missing from the acceptance criteria? Are the edge cases named?

Only after those questions are answered does the diff get opened. The diff-review question is different: does this implementation match the spec? The sequence matters because the spec is the source of truth; the diff is a claim against that source of truth.

A PR template that buries the spec delta reference at the bottom, after the test plan and the deployment checklist, is a PR template that produces reviewers who skip to the diff. The spec delta should be the first section in the PR description, with a direct link to the change folder. The reviewer should not have to hunt for it.

*Sources: Fission AI, [OpenSpec](https://openspec.dev/) (ongoing). ThoughtWorks, Technology Radar Vol 34, April 2026.*

## The PR taxonomy applied

The PR taxonomy chapter (in the Quality section) describes three classes of change: docs, structural, and behavioral. Agent-generated PRs benefit from this taxonomy in a specific way: agents routinely produce behavioral changes that include structural side effects.

The agent implementing a new endpoint may also notice that a helper function is duplicated and refactor it. The helper function refactor belongs in a separate structural PR, not bundled with the behavioral change. The reviewer of the behavioral PR should be reading spec-versus-diff; the reviewer of the structural PR should be checking call sites. These are different review styles; bundling them degrades both.

The `AGENTS.md` instruction for this is: behavioral changes do not include drive-by refactors. A refactor noticed during implementation is a follow-up, named in the PR description, shipped separately. The PR that ships the spec is behavioral; the PR that ships the cleanup is structural.

*Sources: Paul Hammant, [trunkbaseddevelopment.com](https://trunkbaseddevelopment.com/) (ongoing).*

## Split the spec PR from the implementation PR

For a change with real intent to get right, the spec ships first, on its own PR: the proposal and delta spec, no code. The reviewer reads and approves the intent (are the acceptance criteria right, are the edge cases named, is anything missing) before a line of implementation exists. Then the implementation lands on a second PR, against an already-approved spec. This is the default for feature work, and the reason is economic: an intent-level correction is cheap before the agent implements and expensive after. Catching a wrong acceptance criterion in the spec PR costs an edit. Catching it in the code PR costs the implementation.

Not every change earns the split. A bug fix, a mechanical refactor, a library upgrade: the intent is visible in the diff, there is no separable decision to lock, and a spec PR would be ceremony. Ship those as one PR with the spec delta riding along. The test for which shape to use is in the [trunk-based development chapter](/team/trunk-based-development): would an intent-level correction force the implementation to be redone?

Either way, the spec is the review handle. A change folder's implementation PR is not small (the test file might be two hundred lines, the implementation three hundred) and a reviewer opening it cold will scan. The spec is what makes it reviewable: the reviewer checks the diff against named acceptance criteria one at a time rather than holding the whole thing in working memory. `[EXP-001]`: find the test, find the implementation, verify alignment. `[EXP-002]`: repeat. That works whether the spec was approved on a prior PR or sits at the top of the same one.

## Multi-LLM critique

A spec that one agent wrote and one developer approved has one perspective. A second agent, given the spec and no knowledge of the implementation, can find gaps that the authoring perspective missed. This is multi-LLM critique: using a different model (or the same model in a fresh session) to read the spec and raise objections before implementation begins.

The output of a multi-LLM critique pass is a list of concerns: missing edge cases, ambiguous acceptance criteria, hidden coupling to components the spec does not reference. The developer reviews the concerns and edits the spec before handing it to implementation. The critique adds fifteen minutes; it catches problems that would cost hours to fix post-implementation.

The forward reference: `ase-cli`'s MCP tool `check_spec_quality` performs a version of this critique automatically, flagging common spec deficiencies (missing negative test scenarios, undefined error behavior, acceptance criteria that describe implementation rather than behavior). As of mid-2026, this is an early tool; the pattern of automated spec critique is more stable than the specific tooling.

*Sources: Birgitta Böckeler, ["Navigating AI Development Workflows"](https://refactoring.fm/p/navigating-ai-development-workflows), Refactoring.fm. ThoughtWorks, Technology Radar Vol 34, April 2026.*

## What humans skip and agents miss

Human reviewers have biases: they read the changed lines and skip the unchanged context. They approve changes that match their mental model of the feature, even when the spec says otherwise. They struggle with test-case coverage: whether the test suite covers all the branches, not just the happy path.

Agents have different gaps. They miss intent: a change that passes all checks but produces behavior the spec did not anticipate. They miss context: a component that looks correct in isolation but fails when integrated with something the agent did not read. They miss precedent: a pattern established three months ago in a different part of the codebase that this implementation violates.

The review process works when humans and agents each cover their own gaps. Humans verify intent and integration. Agents verify coverage and consistency. A review workflow that asks the agent to check the implementation against the spec scenarios for deviations and scope creep is a review workflow where the human can focus on the questions agents cannot answer.

## Honest caveats

Intent-first review requires that the spec is actually maintained and accurate. A spec that diverged from intent during implementation (because the implementation revealed a constraint the spec did not anticipate) needs to be updated before review. A reviewed PR should have a spec delta that matches the implementation; if the spec and the diff contradict each other, one of them is wrong. The developer owns resolving the contradiction before the PR is opened.

The review works when there is one developer per change, which is the rule the whole section rests on: one OpenSpec change, one developer. Whether that change ships as a single PR or as a spec PR followed by an implementation PR, one person owns it end to end. What makes that rule hold across a team is not more process. It is a shared set of conventions every agent reads, so two developers' agents make the same calls without having to negotiate them first.
