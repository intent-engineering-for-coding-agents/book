---
name: change-folder-as-isolation
description: One change folder per developer-agent pair is the isolation primitive for parallel work
metadata:
  type: feedback
---

# ASE-TEAM-CHANGE-FOLDER-AS-ISOLATION: Change Folder as the Isolation Primitive

**Layer**: 2
**Categories**: team, specs, parallelism
**Applies-to**: teams with parallel agent work
**Summary**: One change folder per developer-agent pair is the isolation primitive for parallel work.

## Principle

A change folder's proposal declares the components it touches. When two change folders declare overlapping scope, the collision is visible before either branch is created. Review change folders for scope overlap at sprint planning, not after implementation is complete.

## Why it matters

Merge conflicts at the code level are expensive. Scope conflicts at the proposal level are cheap: a short conversation, a scope adjustment, a sequencing decision. The change folder is the earliest point where the collision is legible. Catching it there is the minimum cost; catching it at merge is the maximum.

## Violations to detect

- No change folder created before branching — scope not declared before implementation starts
- Multiple change folders modifying the same component without a cross-folder scope review
- Scope review happening after both implementations are complete

## Good practice

Create the change folder, including a complete proposal with affected components listed, before creating the branch. At sprint planning (or a daily standing review for continuously flowing work), scan open change folders for scope overlap. Sequence or split before either branch is created.

## Sources

- ase-book, [Team Workflows and Adoption](/team/) overview and ["Trunk-Based Development with Agents"](/team/trunk-based-development) chapter.
- Steve Yegge, ["Revenge of the junior developer"](https://sourcegraph.com/blog/revenge-of-the-junior-developer), Sourcegraph blog, Mar 22, 2025.
