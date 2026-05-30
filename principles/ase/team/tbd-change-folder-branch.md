---
name: tbd-change-folder-branch
description: An OpenSpec change folder corresponds to one short-lived branch — create together, archive and merge together
metadata:
  type: feedback
---

# ASE-TEAM-TBD-CHANGE-FOLDER-BRANCH: Change Folder Maps to Short-Lived Branch

**Layer**: 2
**Categories**: team, process, trunk-based-development
**Applies-to**: teams using trunk-based development
**Summary**: An OpenSpec change folder corresponds to one short-lived branch — create together, archive and merge together.

## Principle

One change folder, one branch, one PR, one merge. The change folder defines the scope; the branch is the implementation vehicle. A merged branch with an unarchived change folder is a change folder the agent might still be writing against. A branch with multiple change folders is a branch with mixed scope and mixed review style.

## Why it matters

The correspondence between change folder and branch makes scope visible at the version-control level. Branch names match change folder slugs; anyone looking at the open branches can see exactly what changes are in flight and what their scope is.

## Violations to detect

- Multiple change folders on a single branch
- A merged branch whose change folder was not archived at merge time
- Branch names that do not correspond to change folder slugs, making scope opaque

## Good practice

When creating a change folder, create the branch simultaneously with the same name as the change folder slug. When the PR merges, archive the change folder in the same step. The `AGENTS.md` should instruct the agent to verify the change folder is archived before considering the task complete.

## Sources

- ase-book, ["Trunk-Based Development with Agents"](/team/trunk-based-development) chapter.
- Paul Hammant, [trunkbaseddevelopment.com](https://trunkbaseddevelopment.com/) (ongoing).
