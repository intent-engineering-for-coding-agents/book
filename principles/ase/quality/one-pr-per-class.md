# ASE-QUALITY-ONE-PR-PER-CLASS: One PR Per Change Class

**Layer**: 1
**Categories**: quality, pr, review
**Applies-to**: code
**Summary**: `docs`, `structural`, and `behavior` PRs use different review styles — one PR per class.

## Principle

Three PR classes: `docs`, `structural`, `behavior`. Three review styles. One PR per class. A docs PR that contains a single character of code change is no longer a docs PR. A behavioral change bundled with a structural refactor hides the signal in the noise. Separating them makes each diff reviewable against its own standard.

## Why it matters

When a PR mixes behavioral and structural changes, the reviewer must simultaneously evaluate whether the behavior is correct and whether the structure is sound. The mental context-switching degrades both evaluations. The behavioral change may be correct but the structural change may have unintended side effects — or vice versa — and neither is cleanly reviewed.

## Violations to detect

- PRs labeled `docs` that contain code changes
- Behavioral changes mixed with formatting or structural refactors
- No PR classification system in use

## Good practice

Label every PR: `docs`, `structural`, `behavior`. The label tells reviewers what lens to apply. Behavioral changes do not include drive-by formatting — surface the observation in the PR description as a follow-up, not a side effect.

## Sources

- ase-book, *"PR Taxonomy" chapter*, quality section.
- Hammant, trunkbaseddevelopment.com.
