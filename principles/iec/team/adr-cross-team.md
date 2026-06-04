---
name: adr-cross-team
description: ADRs are the cross-team coordination primitive — permanent, public, already in the SDLC
metadata:
  type: feedback
---

# IEC-TEAM-ADR-CROSS-TEAM: ADRs as the Cross-Team Coordination Primitive

**Layer**: 2
**Categories**: team, decisions, coordination
**Applies-to**: multi-team organizations
**Summary**: ADRs are the cross-team coordination primitive — permanent, public, already in the SDLC.

## Principle

Cross-cutting architecture decisions that affect multiple teams belong in a shared ADR repository, not in a single team's decision log. Agents in any team should be instructed to check the shared ADR repository before writing specs that cross service boundaries.

## Why it matters

A team that makes a breaking API change and records it only in their own ADR log has done half the work. The other half is making the decision visible to teams whose agents will be affected by it. Shared ADRs are the mechanism; they require no new tooling, only a shared repository and an instruction to agents to read it.

## Violations to detect

- Cross-cutting decisions (authentication model, API versioning, data retention policy) recorded only in a single team's ADR log
- Agents generating cross-boundary specs without checking shared architecture ADRs
- No shared architecture repository in an organization with multiple teams sharing service contracts

## Good practice

Establish a shared architecture repository early. Include a `AGENTS.md` entry instructing agents to read the shared ADR index before writing specs for cross-service features. Treat a decision that affects multiple teams the same way you would treat a breaking API change: announce it in the shared log, not only in the team channel.

## Sources

- intent-book, ["Cross-Team Coordination"](/team/cross-team-coordination) chapter.
- Michael Nygard, ["Documenting Architecture Decisions"](https://www.cognitect.com/blog/2011/11/15/documenting-architecture-decisions), Cognitect blog, Nov 15, 2011.
