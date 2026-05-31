# Why Small?

A long spec does not fail loudly. It fails by quietly dropping things.

Imagine a thorough one: dozens of acceptance criteria across a dozen scenarios, every edge case and rollback rule and audit requirement written down, days of work and a careful review behind it. Hand it to the agent and watch the far end fray. The early criteria get implemented reliably. The later ones get code that contradicts the earlier ones. The non-goals section, somewhere in the middle, stops being weighed at all. The spec was not too short. It was too long for the agent to hold at once.

## Context window economics

Every token the agent spends tracking a long spec is a token it is not spending on the code.

This is not a theoretical concern. A 500-line spec consumes a meaningful fraction of a context window that the agent also uses for the codebase it is working in, the files it has open, the conversation history, and the code it is generating. When the spec is long enough to compete with those other inputs, the agent starts losing the thread. Not dramatically. Quietly. An early constraint is not checked against a later implementation. A non-goal mentioned in line forty-two is not weighted against a decision made in line four hundred.

An agent that finishes a small spec produces more value than an agent that drifts through a large one. Drift is not just slower. Drift produces code that partially satisfies the spec and then requires a second pass to reconcile, which costs more time than writing a smaller spec in the first place.

## One PR, one spec

A spec is a change proposal scoped to one PR. Not a requirements document covering all known future enhancements. Not an architecture overview for the whole subsystem. One PR's worth of intent.

This framing has a useful property: the spec size is naturally bounded by the PR size, and small PRs are already a practice most teams want. If the spec requires sixty acceptance criteria, the spec is too large. Split the change. Smaller PRs are easier to review, faster to merge, and safer to revert. The spec discipline reinforces the PR discipline.

It has a second useful property: the spec is not supposed to freeze the scope. Changes emerge during implementation and PR review. The spec anchors the intent so the implementation does not drift from it, but anchors is not the same as locks. When the implementation reveals that scenario four was based on a wrong assumption, update the spec. The spec is a living document until the implementation merges. After that, it archives.

*Sources: LeanSpec, the one-PR-scoped spec and small-spec discipline. Anthropic, "Building effective agents" (Dec 2024), keeping the agent's working context tight enough to hold the whole task.*

## The size argument

The specific threshold at which a spec becomes too large to follow reliably is model-dependent. Current-generation models start losing the thread on specs much longer than a few hundred lines, particularly when the spec competes with open files, conversation history, and the code being generated. That threshold will shift as models improve. The underlying argument will not.

A spec that requires 500 lines to describe is describing a change too large to implement in one PR without risking quietly incompatible edge cases. The size limit is not primarily a context window problem. It is a scope problem. Large specs describe large changes. Large changes are harder to review, harder to revert, and more likely to contain scenarios that contradict each other in ways that only surface during implementation.

The solution is not compression. Compressing a large spec into 200 lines of dense prose does not help; it just makes the dense prose harder to parse. The solution is scope reduction. Split the change. The spec that fits in one PR is not the spec that describes everything; it is the spec that describes one coherent thing, completely.

## Small is not the same as vague

Small specs create their own failure mode: a spec too vague to be useful.

"Add error handling to the API" fits in ten lines but tells the agent almost nothing. The constraint is not size. It is specificity per line. A 200-line spec with twenty precise acceptance criteria beats a 50-line spec with five vague ones, every time.

Write small and write precisely. The constraint is not "fewer words". It is "one PR's scope, one concrete outcome per scenario, nothing else". Scope is the first constraint. The second is quantity: how many tasks the spec should generate, how many files the PR should touch, and what to do when those numbers start climbing.

## Ten is a rule of thumb

Quantity has a threshold, and a decent rule of thumb is ten. Ten tasks in a spec. Ten files in a PR. The number is not magic and it is not a rule in any strict sense. Eight would work, twelve would work. Ten wins because it is round, easy to count toward, and easy to recall when you are busy. A rule of thumb you cannot hold in your head under deadline pressure is not even useful as that. It is a footnote.

The limit is for the humans in the loop, not the agent. The agent can re-read a twenty-three-task spec on every step. The reviewer cannot re-read a twenty-three-file diff while also judging whether the intent was right in the first place. Ten is roughly the point where a change still fits in one reviewer's head across a single sitting.

Why ten and not twenty? The number is not a property of the code. It is a property of the reviewer: the point past which a person stops holding the whole change in their head and starts approving it in pieces, trusting that the pieces add up. Twenty distinct, unrelated edits is past that point for almost everyone. You have not reviewed it; you have scrolled it.

That also means the number is yours to calibrate. A language that fans every change across many files (Go and Java touch interfaces, mocks, and call sites that a dynamic language collapses into one edit) pushes the honest ceiling up; a terse codebase pulls it down. Move it to eight, move it to twelve, tune it to your stack, and expect to adjust it as you learn where your own reviews start to skim. What does not move is the reason the number exists: one reviewer, one sitting, the whole change in view. Write down twenty and you have not raised the ceiling, only stopped measuring it.

When the task list reaches eleven, stop. The spec is describing two changes. Find the natural seam, the point where two halves could each ship and be useful on their own, and split there. Two specs, two branches, two PRs, with the second proposal referencing the first by spec ID. Splitting is not failure. A spec that spawns a Part 2 was honest about its scope. The mechanics of turning acceptance criteria into a task list, one task per criteria cluster, live in the [Spec Lifecycle](./spec-lifecycle) chapter; the rule here is only about when the count is telling you to split.

## When the change is genuinely large

Some features survive the split test. One coherent thing, twelve tasks, no clean seam. Sequenced PRs handle this. Branch names carry the sequence: `feature/<name>-part-1`, `feature/<name>-part-2`. The acceptance-criterion ID namespace is shared across the parts: `FEATURE-001` through `FEATURE-010` for part one, `FEATURE-011` onward for part two. The traceability trail stays continuous across the merge boundary, so six months later the archive still shows which test proved which scenario regardless of which PR shipped it. Part two depends on part one merging; note that dependency in the part-two proposal so the reviewer knows before opening the diff.

File count is a rougher signal than task count. Ten files is a soft default; fifteen or twenty is fine when the change has a unifying shape. A rename propagated across fifty files is trivially reviewable: the description states the pattern, every diff is identical, the reviewer confirms it and moves on. A behavior change touching four deeply coupled files can be genuinely hard. The real question is whether the reviewer can understand the change from the description and a quick scan. File count is a proxy for that, nothing more. Where it becomes a real signal: a PR touching fifteen files with different changes in each, no unifying pattern, and a description that struggles to say what was done. That is a scope problem wearing a file-count disguise, and the fix is the same. Find the seam and split.

The `openspec/changes/<name>/` folder and everything in it, the proposal, delta spec, design doc, and task list, does not count toward the file total. That is intent, not implementation.

*Sources: LeanSpec, small-spec discipline and formality-to-risk matching.*

Once the task list has the right number of items, the next question is which one the agent tackles first.
