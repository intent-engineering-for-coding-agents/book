---
name: tbd-change-folder-branch
description: A change folder maps onto branches that share its name; decision-heavy changes ship a spec PR before the implementation PR, which archives at merge
metadata:
  type: feedback
---

# ASE-TEAM-TBD-CHANGE-FOLDER-BRANCH: Change Folder Maps to Short-Lived Branches

**Layer**: 2
**Categories**: team, process, trunk-based-development
**Applies-to**: teams using trunk-based development
**Summary**: A change folder maps onto branches that share its name; decision-heavy changes ship a spec PR before the implementation PR, which archives at merge.

## Principle

A change folder is delivered through branches that carry its name and its scope. For a change with decision content, the spec ships on its own PR first (`spec/<slug>`), reviewed for intent and merged, before the implementation PR (`<slug>`) delivers the code and archives the folder. For a change whose intent is visible in the diff (a bug fix, a mechanical refactor, a library bump), one branch and one PR carry both. What stays invariant: every branch traces to exactly one change folder, and the implementation branch archives the folder at merge. The choice between one PR and two is decided by whether an intent-level correction found in code review would force the implementation to be redone, not by size.

## Why it matters

The correspondence between change folder and branch makes scope visible at the version-control level. Branch names match change folder slugs; anyone looking at the open branches can see what is in flight and what its scope is. Splitting the spec PR from the implementation PR puts the cheap correction (the acceptance criteria) before the expensive one (the implementation), so a wrong intent costs an edit instead of a rewrite.

## Violations to detect

- More than one change folder on a single branch
- An implementation branch that merges without archiving its change folder
- A spec PR merged to `main` with no implementation PR opened to follow it (a dead spec on the trunk)
- Branch names that do not correspond to the change folder slug, making scope opaque
- A decision-heavy change implemented before its spec was reviewed

## Good practice

Name the implementation branch for the change folder slug. For decision-heavy changes, review and merge the spec on a `spec/<slug>` PR first, then implement on `<slug>`. Promote archiving and task completion from `AGENTS.md` instruction to a CI gate on the implementation PR: the check refuses the merge until the folder is archived and `tasks.md` is fully checked. Keep the spec PR and implementation PR in the same cycle so a merged-but-unimplemented spec is never mistaken for a finished one. Enable auto-delete-branch-on-merge.

## Sources

- ase-book, ["Trunk-Based Development with Agents"](/team/trunk-based-development) chapter.
- Paul Hammant, [trunkbaseddevelopment.com](https://trunkbaseddevelopment.com/) (ongoing).
