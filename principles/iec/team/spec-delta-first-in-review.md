---
name: spec-delta-first-in-review
description: In PR review, read the spec delta before the code diff — intent-first review
metadata:
  type: feedback
---

# IEC-TEAM-SPEC-DELTA-FIRST-IN-REVIEW: Read the Spec Delta Before the Diff

**Layer**: 2
**Categories**: team, review, specs
**Applies-to**: all PR reviews
**Summary**: In PR review, read the spec delta before the code diff — intent-first review.

## Principle

The spec delta answers: does this intent match what was planned? Is anything missing? The diff answers: does this implementation match the spec? The sequence matters. A reviewer who reads the diff first has no reference point for intent; they approve what looks correct rather than what the spec required.

## Why it matters

Agent-generated code can be syntactically correct, well-tested, and functionally wrong relative to the spec. The test that would have caught the divergence is often present but asserted against the wrong condition. Catching this requires reading the spec first and verifying the diff against it.

## Violations to detect

- PR template that places the spec delta reference after the test plan or deployment checklist
- Code reviews that approve with comments only on code style, not on spec alignment
- PRs opened without a spec delta when the change is behavioral

## Good practice

The first section of the PR description links to the change folder. The reviewer opens the spec delta first — not the diff — and verifies intent before implementation. The PR template enforces this sequence by placing the spec reference at the top.

## Sources

- intent-book, ["Trunk-Based Development with Agents"](/team/trunk-based-development) chapter, "Review at merge" section.
- intent-book, ["Code Review for Agent-Generated Code"](/team/code-review-agent-code) chapter, "PR shape: the spec as the load-bearing document" section.
- Fission AI, [OpenSpec](https://openspec.dev/) (ongoing).
