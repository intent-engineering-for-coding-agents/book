---
name: review-complementarity
description: Human reviewers verify intent and integration; agent reviewers verify coverage and consistency; neither replaces the other
metadata:
  type: feedback
---

# IEC-TEAM-REVIEW-COMPLEMENTARITY: Human and Agent Reviewers Cover Different Gaps

**Layer**: 2
**Categories**: team, review, quality
**Applies-to**: all PR reviews involving agent-generated code
**Summary**: Human reviewers verify intent and integration; agent reviewers verify coverage and consistency; neither replaces the other.

## Principle

Human reviewers catch what agent reviewers miss: integration failures, whether the acceptance criteria were right in the first place, and whether the feature works as intended in production. Agent reviewers catch what human reviewers miss: acceptance criteria with no test, tests that assert the wrong condition, and implementation changes with no criterion to trace to. The combination covers more of the failure surface than either alone.

## Why it matters

Agent-generated code has a specific failure mode: well-formatted, well-tested code that precisely implements the wrong thing. Human reviewers under time pressure apply the competence heuristic (careful-looking code gets less scrutiny) and skip coverage tracing (tedious). Agent reviewers lack runtime context and miss silent ambiguity resolutions. Treating one kind of review as sufficient leaves one half of the failure surface unexamined.

## Violations to detect

- Code review that consists only of a human reading the diff (no coverage trace, no spec alignment check)
- Code review delegated entirely to an agent (no human intent-and-integration check)
- Review approval with no verification that every acceptance criterion has a test
- Review approval with no check on whether the implementation integrates correctly with downstream services

## Good practice

In PR review: the human reads the spec delta for intent, checks integration assumptions, and verifies that the acceptance criteria describe the right behavior. The agent (fresh session or review tool) traces acceptance criteria to tests and flags scope additions. Neither reviewer's pass is optional for high-stakes behavioral changes.

## Sources

- intent-book, ["Code Review for Agent-Generated Code"](/team/code-review-agent-code) chapter, "What human reviewers miss, what agent reviewers miss" section.
- ThoughtWorks Technology Radar Vol 34 (April 2026), automated feedback controls at the merge gate as the model for systematic coverage checks that scale past manual review.
