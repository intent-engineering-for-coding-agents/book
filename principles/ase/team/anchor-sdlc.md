# ASE-TEAM-ANCHOR-SDLC: Anchor to Existing SDLC Primitives

**Layer**: 1
**Categories**: team, process, adoption
**Applies-to**: all
**Summary**: Anchor process to existing SDLC primitives — branches, PRs, tickets, ADRs — not new ceremonies.

## Principle

Anchor team process to existing SDLC primitives. Branches, PRs, tickets, ADRs, CI pipelines — these already have tooling, muscle memory, and review culture. New ceremonies age fast; existing ones have survived because they serve a persistent need. ASE practices bolt onto these, not replace them.

## Why it matters

Introducing a new ceremony — a spec review meeting, a before-checkpoint ritual, a separate quality gate — asks the team to adopt a new habit. New habits die when the champion leaves or the pressure increases. Bolting onto existing habits embeds the practice in something the team already does.

## Violations to detect

- ASE practices that add new meeting types instead of extending existing PR reviews
- Process that requires a new tool instead of working within the existing CI pipeline
- Ceremonies that exist only because the process says they should, not because they solve a known problem

## Good practice

Spec review happens in the PR, not in a separate meeting. The before-checkpoint is part of the PR template. The after-checkpoint is the CI pipeline. The team's existing workflow is the structure; ASE provides the content.

## Sources

- ase-book, *"ASE and the SDLC" chapter*, foundation section.
- ase-book, plan.md, Living Principles appendix.
