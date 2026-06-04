---
name: multilm-coverage
description: Use a fresh-session agent to trace acceptance criteria to tests before approving high-stakes behavioral PRs
metadata:
  type: feedback
---

# IEC-TEAM-MULTILM-COVERAGE: Fresh-Session Agent for Coverage Tracing

**Layer**: 2
**Categories**: team, review, testing
**Applies-to**: high-stakes behavioral PRs with multiple acceptance criteria
**Summary**: Use a fresh-session agent to trace acceptance criteria to tests before approving high-stakes behavioral PRs.

## Principle

The implementation agent has context that biases its own review: it resolved the spec's ambiguities and wrote tests that confirm its choices. A second agent, given only the approved spec and the implementation diff with no prior context, traces each acceptance criterion to a test, verifies the test asserts what the criterion requires, and flags criteria with no test and tests with no criterion.

## Why it matters

A common failure mode in reviewing agent-generated code is that the implementation, the tests, and the code all agree with each other but none of them agree with the acceptance criteria as written. Coverage tracing by a fresh-session agent catches this class of failure before merge. Human reviewers skip coverage tracing because it is tedious; the agent does not find it tedious.

## Violations to detect

- Behavioral PRs with dozens of acceptance criteria approved without a coverage trace
- Tests that assert a proxy condition rather than the acceptance criterion's stated requirement
- Acceptance criteria with no corresponding test in the test suite
- Tests with no acceptance criterion to trace to (untethered tests or scope additions)

## Good practice

For high-stakes behavioral changes, open a fresh session after the implementation is complete. Provide the approved spec and the diff with no prior context. Ask it to enumerate acceptance criteria, locate corresponding tests, verify assertions match requirements, and flag gaps. Treat the output as a checklist that directs the human reviewer's attention. For small changes with three or fewer acceptance criteria, skip this step.

## Sources

- intent-book, ["Code Review for Agent-Generated Code"](/team/code-review-agent-code) chapter, "Multi-LLM critique" section.
- Birgitta Böckeler, ["Navigating AI Development Workflows"](https://refactoring.fm/p/navigating-ai-development-workflows), Refactoring.fm, using a second model or fresh session to critique without implementation-context bias.
