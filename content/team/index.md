---
type: index
title: Team Workflows and Adoption
---

# Team Workflows and Adoption

> One owned change artifact per developer. Coordination starts with visible scope.

The individual practices in the earlier topics work at solo scale. This section is about what changes when there is more than one developer, and more than one agent, in the same codebase.

The coordination story is smaller than the swarm pitch suggests. Trouble starts when two unreconciled changes point agents at the same surface area. Coordinate ownership through tickets, with one change proposal per ticket and one active ticket per developer in the workflow described here. The remaining controls build on ordinary SDLC discipline: branches, tickets, ADRs, and review.

This section assumes OpenSpec because the book needs one concrete workflow. The cross-tool rule is broader than OpenSpec: one developer owns one change artifact at a time, and the branch, PR, and review all trace back to it.

Prompt engineering focuses on the developer-agent exchange. Team-scale Intent Engineering adds ownership, shared decisions, collision detection, and a review record other developers and later agent sessions inherit.

## Chapters

1. [OpenSpec Across Stacks](./openspec-across-stacks): when the system has multiple tiers, one `openspec/` per stack narrows each agent's context to one tier
2. [OpenSpec in an Existing SDLC](./openspec-in-existing-sdlc): team coordination through tickets, one proposal per ticket, and ticket identifiers in proposal names
3. [Trunk-Based Development with Agents](./trunk-based-development): change folders as short-lived branches, merge cadence, how spec deltas reduce merge pain, intent-first review
4. [Code Review for Agent-Generated Code](./code-review-agent-code): spec-first review, optional agent-assisted coverage tracing, and checks for copied patterns or removed controls
5. [Shared Agent Instruction Conventions](./shared-conventions): team-level `AGENTS.md`, shared `.agents/skills/` libraries, onboarding, and when to leave things divergent
6. [Cross-Team Coordination](./cross-team-coordination): ADRs as the cross-team mechanism, inner source for `.agents/` libraries, multi-repo realities
7. [What Is Still Evolving](./what-is-still-evolving): what the Spec-Driven Development (SDD) ecosystem has not yet figured out, a maturity-bounded account of mid-2026
