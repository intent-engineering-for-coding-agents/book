# IEC-SPECS-REVIEW-SPEC-FIRST: Review the Spec Before the Code

**Layer**: 1
**Categories**: specs, review, sdd
**Applies-to**: all
**Summary**: Review the spec first — does the intent match? Then review the diff — does the code match the intent?

## Principle

Review the spec first. Does the intent match what was agreed? Then review the code diff. Does the implementation match the intent? Then review the diff on its own merits. Reversing this order — reviewing the code and then checking whether it matches the spec — is the most common mistake in spec-driven review.

## Why it matters

When the code is reviewed first, the reviewer's mental model is shaped by the implementation, not the intent. They evaluate whether the code looks reasonable, not whether it solves the right problem. The spec anchors the review to the problem, not the solution.

## Violations to detect

- PR reviews that begin with the code diff
- Specs that are not consulted during review
- Implementation changes that silently alter the spec without updating it

## Good practice

The PR review workflow: open the spec → read it → form an opinion about the intent → open the diff → check whether the diff matches the spec → then review the code quality. Three passes, each with a different lens.

## Sources

- intent-book, *"Why Specs" chapter*, specs section.
- intent-book, *"Before, During, After Checkpoints" chapter*, quality section.
