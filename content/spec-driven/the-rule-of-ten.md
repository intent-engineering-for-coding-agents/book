# The Rule of Ten

The spec had twenty-three tasks. The team was proud of it: three days of careful breakdown, every acceptance criterion mapped to an implementation step, edge cases covered, dependencies noted. They gave it to the agent on Monday morning.

By midday it had finished eight tasks cleanly. By Wednesday it was improvising. Not wildly. The output was plausible code that satisfied the letter of each task while quietly ignoring constraints established three tasks earlier. By Friday the PR was forty percent working implementation and sixty percent confident fiction.

The spec was not wrong. It was too long to hold.

## Why ten?

Ten is easy to remember. Most of the argument is right there.

A threshold you cannot recall under deadline pressure is not a threshold — it is a footnote. Eight would work. Twelve would work. Ten works because it is round, easy to count toward, and easy to use as a stop signal. When the task list hits eleven, you notice. When it hits twenty-three, you have already stopped counting.

The practical forcing function is the point. Ten creates a moment of pause before the scope grows beyond what a human reviewer can hold in mind across a diff. The agent can re-read the spec. The reviewer cannot re-read the change while also evaluating whether the intent was correct in the first place. The limit is for the humans in the loop, not the agent.

## Spec to tasks

Converting acceptance criteria into tasks is a mechanical step most teams skip. The result is a spec with scenarios but no implementation checklist, leaving the agent to decide its own decomposition. The agent's decomposition reflects its priors, not the team's intent.

The rule: one task per acceptance-criteria cluster. If three scenarios test the same endpoint, they belong to one task. Write it as an imperative: "Implement endpoint X with validation for scenarios ACC-003, ACC-004, ACC-005." If two scenarios test unrelated behavior, they are two tasks.

If the task list reaches eleven, stop. The spec describes two changes. Find the natural seam — the point where two tasks could ship and be useful independently — and split there. The split produces two specs, two branches, two PRs: Part 1 and Part 2. The Part 2 spec references Part 1 by spec ID.

Splitting is not failure. A spec that spawns a Part 2 is a spec that was honest about scope.

## Task to subtasks

Subtasks are single-session actions: the agent starts one, finishes it without losing context, and checks it off. A subtask that requires opening more than a few files is probably a task, not a subtask.

The rule is softer here. If a task genuinely needs twelve subtasks to describe, stop and ask whether it is two tasks in disguise. Usually it is. A task that takes twelve steps to accomplish is almost certainly doing two things.

Some tasks resist decomposition. A large migration with genuinely independent steps may need twelve subtasks and there is no cleaner split. That is the exception. Treat it as one.

## PR to files

Ten is the soft default. Fifteen or twenty is fine for many teams. The number is not the point.

The real question is whether the reviewer can understand the change from the description and a quick scan, without reading every line. That depends far more on the nature of the change than on the file count. A rename propagated across fifty files is trivially reviewable: the description says what changed, every diff is identical, the reviewer confirms the pattern and moves on. A behavior change touching four deeply coupled files can be genuinely hard to review. File count is a rough proxy for complexity. Treat it as one.

Where ten files becomes meaningful as a signal: a PR that touches fifteen files with *different* changes in each, no unifying pattern, and a description that struggles to summarize what was actually done. That is a scope problem, not a file-count problem. The fix is the same as for the task list: find the seam and split.

The `openspec/changes/<name>/` folder and everything in it — proposal, delta spec, design doc, task list — does not count toward the file total. Those are intent, not implementation.

Large or complex specs benefit from a dedicated spec-only PR. The change proposal, delta spec, and design document merge before implementation begins. The review gets to evaluate whether the intent is correct before any code exists. This is not overhead. It is the review that matters most.

## Multi-PR sequences

Some features are genuinely large. They survive the Rule of Ten without a clean split: one coherent thing, twelve tasks, no seam. Sequenced PRs handle this.

Branch naming: `feature/<name>-part-1`, `feature/<name>-part-2`. The AC ID namespace is shared: `FEATURE-001` through `FEATURE-010` for part 1, `FEATURE-011` onward for part 2. The traceability trail stays continuous across the merge boundary. A test marked `@pytest.mark.ac("FEATURE-007")` belongs to part 1. One marked `FEATURE-014` belongs to part 2. Six months later, the archive shows which test proved which scenario regardless of which PR it shipped in.

Part 2 depends on Part 1 merging. Note that dependency explicitly in the Part 2 spec proposal. The reviewer should know before opening the diff.

## CI and the task list

When every checkbox in `openspec/changes/<name>/tasks.md` is checked, the spec is complete. CI can detect this state and flag it: complete, pending archive. Archive the change folder as part of the PR that clears the last task, not at the end of the week when memory of what was actually done has already faded.

This closes the loop from the dead-spec problem. A spec without CI enforcement relies on discipline to archive at the right moment. A spec with CI enforcement makes the moment visible. The active folder should contain only what is actively in progress. CI is what makes "should" into "does."

The question that remains: once the task list has the right number of items, which one does the agent tackle first?
