---
type: chapter
title: When Intent Engineering Fails
---

# When Intent Engineering Fails

Intent Engineering does not prevent specs and agent instructions from falling out of sync with the codebase. It makes that gap visible and recoverable, which is a meaningfully weaker claim, and the technically accurate one.

The five failure modes below remain after good initial setup. They are not beginner mistakes. They show up after the first discipline wears off, and they do it quietly enough that the damage compounds before anyone notices. The chapter sits here, before the practices, so the rest of the book does not read like sales material for itself.

## Agent instructions rot

The entry point goes stale. The agent instructions say to follow the old module layout, while an ADR reversed that layout months ago. Nobody updated the agent instructions, so the agent reads them, not the ADR, and produces code shaped for the old system.

Treat agent instructions as maintained project files. When a PR changes a convention they describe, review the instruction in the same change. A link checker catches a missing file, but semantic drift needs someone to compare the rule with the new code. The Agent Instructions topic covers what to put in `AGENTS.md` and `.agents/instructions/...`.

## Dead specs

Open `openspec/changes/` (the OpenSpec change folder, if your team uses OpenSpec) and find a pile of directories: implemented changes, canceled changes, an implemented change never archived, a partially done change from before the original author left, and competing proposals for the same change.

Without an archive step, a canceled proposal can remain beside active work. A later session needs its status and the current spec to tell which one governs the change. This book uses an archive rule to keep the working set clear.

A dead proposal might describe behavior the system no longer has or a decision the team reversed. If the agent loads it without a status check, the old acceptance criteria can steer the patch. Archive the proposal after the implementation is integrated. The [Spec Lifecycle](../spec-driven/spec-lifecycle) chapter builds this discipline into the workflow.

*Sources: Fission AI, OpenSpec "Concepts" (reviewed October 22, 2026), the change-folder archive lifecycle. The stale-proposal failure example and archive discipline are this book's workflow synthesis.*

## Agent-accelerated tech debt

An agent working from a vague request can satisfy the immediate ask while missing an architectural decision absent from its inputs. Each merged patch that copies the new pattern makes the error harder to recognize. The risk grows with the rate of unreviewed changes, but no calendar estimate follows from that observation.

The Spec-Driven topic exists because of this mode. Writing the spec before implementation gives the agent a target it would otherwise have to infer. Decisions written down as ADRs enter the agent's context as explicit constraints. Intent left only in developer memory remains exposed to omission or contradiction.

*Sources: The repeated-pattern example and its risk are this book's synthesis.*

## Over-spec

Suppose a config rename receives a spec covering unrelated cleanup and future migration work. The agent now has several proposed changes to interpret, and the reviewer has to separate the requested rename from the additions. Remove the unrelated scope before implementation.

Use [Why Small?](../spec-driven/why-small) to decide where to split, and [The Spectrum](../spec-driven/the-spectrum) to choose the appropriate formality.

*Sources: The over-scoped rename example is this book's illustrative workflow guidance.*

## Drift with no detection

Suppose a team writes agent instructions and ADRs during setup, then leaves them untouched through several changes. A design doc still names a removed component, and `docs/README.md` points to a renamed file. The next agent session reads those files as current project context.

A required convention check in CI covers part of this gap. It blocks a merge when a configured structural check fails. The check does not catch ADRs that should have been written and were not. It does not detect an architecture overview that was accurate a year ago and is now misleading.

Detection of content drift is harder than detection of structural drift, and most of it remains a developer and reviewer responsibility.

*Sources: GitHub, "About protected branches" (reviewed October 22, 2026), required status checks as merge gates. The limits of structural checks are this book's workflow analysis.*

[Keeping Documentation Up to Date](../quality/keeping-docs-up-to-date) covers checks for stale documents. After changing agent guidance, [try a representative task](../agent-instructions/instructions-that-work#testing-whether-your-instructions-work) and inspect whether the intended convention still holds.

## Why the rest of the book is organized the way it is

Each topic targets one or more of these modes directly:

| Failure mode | Topic that addresses it |
|---|---|
| Agent instructions rot | Agent Instructions |
| Dead specs | Spec-Driven Development |
| Agent-accelerated tech debt | Spec-Driven Development |
| Over-spec | Spec-Driven Development (Why Small) |
| Drift with no detection | Quality and Verification |

Thoughtworks uses "cognitive debt" for the gap between generated code and developers' understanding of it. A stale decision record is a different problem: the agent receives obsolete context. This book addresses that problem through maintained instructions, specs, and review.

Drift will still happen. Catch the mismatch before stale assumptions turn into one bad deploy.

The Agent Instructions topic covers which files the agent should load and how to keep them current.

*Sources: Thoughtworks Technology Radar Vol 34 (April 2026), cognitive debt as a gap in developer understanding. The link to stale repo context is this book's synthesis.*
