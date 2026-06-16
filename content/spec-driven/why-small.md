# Why Small?

A long spec does not fail loudly. It fails by quietly dropping things, and the more thorough the spec, the more it drops.

Consider a thorough one: dozens of acceptance criteria across a dozen scenarios, every edge case and rollback rule and audit requirement written down, days of work, and a careful review behind it. Hand it to the agent and the early criteria get implemented reliably. The later ones get code that contradicts the earlier ones. The non-goals section, somewhere in the middle, stops being weighed at all. The spec was not too short. It was too long for the agent to hold at once.

## Context window economics

Every token the agent spends reading a long spec is a token it is not spending on the codebase.

A 500-line spec splits the context window with existing code, conversation history, and generated output. By hour two, the agent has re-derived scenario 3 from scratch to make room, and that derivation contradicts the implementation it already shipped. The constraint is never checked. A small spec stays in view. A long spec does not.

Fixing these contradictions requires a second pass. That costs more than writing a smaller spec upfront.

*Sources: Anthropic, "Building effective agents" (Dec 2024), context window competition between spec and working code.*

## One PR, one spec

A spec is one PR's worth of intent. Not a requirements document covering all known future enhancements, not an architecture overview for the subsystem.

The spec size is naturally bounded by the PR size, and small PRs are already a practice most teams want. If the spec requires sixty acceptance criteria, the spec is too large. Split the change.

More importantly: the spec does not freeze the scope. You planned to fetch upstream records in one call, then find the endpoint is paginated. Scenario four no longer matches what the code has to do. Edit scenario four. A spec that contradicts the code it shipped with is worse than no spec, because the next agent reads the spec as ground truth. The spec stays live until the PR merges, then it archives.

*Sources: LeanSpec, one-PR-scoped specs and live-spec discipline.*

## The size argument

A 500-line spec describes a change too large to implement in one PR without hiding contradictory edge cases. The size limit is not primarily a context window problem. It is a scope problem.

Compression is the wrong fix. Squeezing the spec into 200 lines of dense prose buries the same scenarios. Split the change instead. The spec that fits in one PR does not describe everything. It describes one coherent thing, completely.

*Sources: LeanSpec, small-spec discipline as scope reduction rather than compression.*

## Small is not the same as vague

A spec too vague to be useful is a spec too small. "Add error handling to the API" fits in ten lines and tells the agent almost nothing. What carries a spec is specificity per line, not word count. A 200-line spec with twenty precise acceptance criteria beats a 50-line spec with five vague ones.

Write small and write precisely. Small means one PR's scope, one concrete outcome per scenario. Scope comes first.

## When the agent writes the spec

Ask the agent to draft the spec and watch what comes back: nominal case, edge cases, rollback behavior, a constraint inferred from three different files, a note about the migration path nobody asked for. The agent defaults to thoroughness. From its frame, missing a scenario is a defect. Adding an unrequested one is not.

Embed the size discipline in the agent's instructions, not just in the human review process. Require specs to stay within a page, forbid restating requirements already in the referenced ADR, specify what the output must contain. A conciseness directive in the agent's skill file carries forward to every spec it writes.

## The Rule of Ten

Quantity has a threshold. This book calls it the Rule of Ten: ten tasks in a spec, ten files in a PR. Ten wins because it is round, easy to count toward, and easy to recall when you are busy. Eight would work, twelve would work. The point is this: a number you cannot hold in your head under deadline pressure is not useful. It is a footnote.

The limit is for the humans in the loop, not the agent. The agent re-reads a twenty-three-task spec on every step. The reviewer cannot re-read a twenty-three-file diff while also judging whether the intent was right. At twenty distinct, unrelated edits, you have stopped reviewing. You have scrolled.

Calibrate the number to your stack. Go and Java touch interfaces, mocks, and call sites that a dynamic language collapses into one edit, so the honest ceiling is higher. A terse codebase pulls it down. Move it to eight, move it to twelve, tune it to your stack. What does not move is the reason: one reviewer, one sitting, the whole change in view.

When the task list goes beyond 10, stop. The spec is describing two changes. Find the natural seam, the point where each half ships and stands on its own, and split there. If you cannot find the seam, ask the coding agent to propose the split—it usually sees clearer boundaries than you will. Two specs, two branches, two PRs, with the second proposal referencing the first by spec ID. Splitting is not a failure. A spec that spawns a Part 2 was honest about its scope. The mechanics of turning acceptance criteria into a task list, one task per criteria cluster, live in the [Spec Lifecycle](./spec-lifecycle) chapter. The rule here is only about when the count is telling you to split.

## When the change is genuinely large

Some features survive the split test: one coherent thing, twelve tasks, no clean seam. Sequenced PRs handle this. Use branch names to carry the sequence: `feature/<name>-part-1`, `feature/<name>-part-2`. Share the acceptance-criterion ID namespace across the parts: `FEATURE-001` through `FEATURE-010` for part one, `FEATURE-011` onward for part two. The traceability trail stays continuous across the merge boundary, so six months later the archive still shows which test proved which scenario regardless of which PR shipped it.

Part two depends on part one merging. Note that dependency in the part-two proposal so the reviewer knows before opening the diff. Each part merges on its own test pass instead of waiting for a suite that only lands with the final PR.

File count is a rougher signal than task count. A rename propagated across fifty files is trivially reviewable: the description states the pattern, every diff is identical. A behavior change touching four deeply coupled files is genuinely hard. The real question is not the count. It is whether the reviewer understands the change from the description and a quick scan. Where file count signals trouble: fifteen files with different changes in each, no unifying pattern, no clear description. That is a scope problem wearing a file-count disguise. Find the seam and split.

The `openspec/changes/<name>/` folder does not count toward the file total. That is intent, not implementation.

*Sources: LeanSpec, small-spec discipline, and formality-to-risk matching.*

Task count alone does not ensure a complete spec. Where constraints and non-goals sit determines whether the agent weighs them at all.
