# ASE-QUALITY-DOCS-PR-ZERO-CODE: A Docs PR Must Contain Zero Code Changes

**Layer**: 1
**Categories**: quality, pr, process
**Applies-to**: code
**Summary**: A docs PR that contains a single character of code change is no longer a docs PR.

## Principle

A docs PR that contains a single character of code change is no longer a docs PR. It is a mixed PR. The docs label tells reviewers they can skip behavioral verification, focus on clarity and accuracy, and trust that no behavior changed. A code change hidden in a docs PR violates that trust.

## Why it matters

The review style for a docs PR is fundamentally different from the review style for a behavioral PR. When a PR labeled `docs` contains code, reviewers apply the wrong lens. The code change gets a docs-level review — which is to say, not reviewed for correctness at all.

## Violations to detect

- PRs labeled `docs` that modify source files
- Combined PRs where documentation and code changes are interleaved
- Reviewers applying behavioral scrutiny to docs-labeled PRs

## Good practice

If a code change surfaces during documentation work, it gets its own PR with its own label. The docs PR and the code PR can be in flight simultaneously, referencing each other, but they are separate reviews.

## Sources

- ase-book, *"PR Taxonomy" chapter*, quality section.
