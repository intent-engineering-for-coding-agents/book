# Spec Lifecycle

A spec with no lifecycle does not get retired. It sits there looking exactly like a live one. The agent loads a spec describing a payment integration the team abandoned eight months ago: the implementation folder is gone, but the spec is still in `openspec/specs/`, still referencing a third-party API that was replaced. The agent, being helpful, starts implementing it.

A spec without a lifecycle accumulates. Active specs look identical to abandoned ones. The agent cannot distinguish intent from archaeology.

## The five stages

The five stages below are this book's synthesis. OpenSpec supplies the change folder and the archive step. The critique stage and intent-first review are the discipline this book adds around them.

One prerequisite before the first stage: the relevant architectural decision should be closed. An ADR establishes which path is taken. The spec describes how to execute it. Writing a spec against an open architectural question inverts the dependency: you may finish the implementation before discovering the intent was wrong at the decision level. The full chain runs ADR, then design doc, then spec, then implementation, then archive.

Write: create the spec when you are about to implement, not weeks in advance. A spec written speculatively drifts: by the time the work starts, the context has shifted. Purpose, acceptance criteria, scenarios with test assignments. Get the scope wrong at this stage and nothing downstream corrects it.

Critique: run the draft past a second model before human review. Not code review. Spec review. Ask a different model to identify missing edge cases, ambiguous acceptance criteria, and scope that the implementer has unconsciously narrowed to make the work tractable. The second model approaches the spec without the first model's assumptions and will find gaps that a human reviewer, who has already heard the proposal, will skip over.

Review: the same PR review culture that applies to code applies here, with one difference. Review the spec before the implementation, not after, so the reviewer evaluates whether the intent is correct before judging whether the code matches it. [Code Review for Agent-Generated Code](../team/code-review-agent-code) works out why that order changes what the reviewer sees.

A PR that bundles a full change folder with the implementation is not small. The spec is what makes it navigable: intent is established before the diff is opened, and code review becomes verification rather than reconstruction. An agent can help here too, checking that the implementation matches the spec scenarios before the human reviewer opens the diff.

Implement: the agent works from the spec. When it deviates, update the spec rather than the implementation, unless the deviation is wrong. The spec is the source of truth during implementation. If the implementation is revealing that the spec needs to change, change the spec and let the implementation follow.

Archive: when the PR merges, archive the change folder. Delta specs merge into `openspec/specs/`. The change folder moves to `openspec/changes/archive/`. The implementation is in git. The intent is in the canonical spec. The change history is in the archive. Three things, three places, none of them confused.

The entire lifecycle lives on a branch. Create the branch, create the spec. Implement on the branch. Archive when the branch merges. The `main` branch only ever sees the canonical spec in `openspec/specs/`, the version that reflects what was shipped.

*Sources: Fission AI, OpenSpec, the change-folder stages and the archive-into-canonical-specs mechanism. Rick Hightower, "Agentic Coding: GSD vs Spec Kit vs OpenSpec vs Taskmaster AI" (Feb 27, 2026), multi-model critique as an emerging SDD step. The five-stage framing (write, critique, review, implement, archive) is this book's synthesis.*

## Writing the task list

The task list is where the spec becomes executable. A spec without one leaves the agent to decide its own decomposition. The agent will decompose based on its priors, which are not the same as the team's intent.

The rule: one task per acceptance-criteria cluster. If three scenarios test the same endpoint, they belong to one task. Write it as an imperative: not "Rate limiting?" but "Add rate-limiting to the login endpoint with scenarios ACC-003 and ACC-004". The AC IDs go in the task. The connection between intent and proof survives the archive.

Tasks are checkboxes. The agent checks each one off as it completes it. An unchecked task is a work signal. A half-checked list is a resumption point. When a session is interrupted, the task list is how the next session picks up without re-reading the entire spec from the beginning. Checkpoint discipline: each task gets its mark when complete, not in a batch at the end of the run.

For sizing guidance on how many tasks belong in a list, and when a list that grows past ten signals a scope problem, see the Rule of Ten in [Why Small?](./why-small).

The task list makes the spec executable. It does not make the spec correct. That review happens next.

## Multi-LLM critique

The single-model spec review has a blind spot: the model that wrote the spec and the model reviewing it share the same training. They share the same priors about what constitutes a complete scenario. The gaps they miss, they tend to miss together.

A second model from a different family does not share those priors. Writing the spec in your primary tool and critiquing it with a different model family catches different gaps than writing and reviewing within the same family. The difference is not always large, but for specs guiding production-critical implementations, it is consistently useful.

The practical workflow: draft in your primary tool, then send the spec to a second model with the prompt "identify missing edge cases, ambiguous acceptance criteria, and any scenarios where the failure mode is not specified". How you do this depends on your setup: a second chat session, a different IDE plugin, a CLI agent pointed at the file. The mechanism does not matter. Iterate once. The critique adds twenty minutes and catches the kind of scenario the first model never thinks to write: the empty list case, the concurrent update case, the API returning a 200 with an error payload in the body.

This is not a rigid practice. For small, low-risk specs, it is overhead. For specs touching security, payment, or anything that would constitute a long day when it goes wrong, the second-model pass is worth it.

## The dead spec problem

A dead spec is not a deleted spec. It is a change folder still sitting in `openspec/changes/`, still marked as in-flight, for a change that was implemented, abandoned, or pivoted away from weeks ago. The agent sees it, loads it as current intent, and acts on instructions that no longer apply.

The fix is tight timing on both ends. Create the spec when you are about to implement. Not before sprint planning. Not as a backlog item. Archive it the moment the PR merges. Not at the end of the week. Not when you remember. The active folder should contain only what is being built right now. Anything else is noise the agent will act on.

## Tooling note

If you want to see this workflow in practice, the `iec` repo at tag `v0.5.0` runs `iec check` on itself. The checks make lifecycle gaps visible before they become misleading instructions.

The archive is not an afterthought. It is what separates working intent from historical record. An agent that cannot distinguish the two treats the past as instruction. The archive is the mechanism that stops it. The change folder moves. The canonical spec stays. The code is in git. Three things, three places. The one that is most trusted when the code needs to change is almost certainly not the one most developers would guess.
