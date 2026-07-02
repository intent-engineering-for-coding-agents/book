# Team Workflows and Adoption

> One OpenSpec change per developer. Most of the team coordination problems dissolve right there.

The individual practices in the earlier topics work at solo scale. This section is about what changes when there is more than one developer, and more than one agent, in the same codebase.

The coordination story is smaller than the swarm pitch suggests. Most of the trouble starts when two unreconciled changes point agents at the same surface area. Keep one developer on one change artifact at a time, review each change in its own PR, and most of the remaining work looks like ordinary SDLC discipline: branches, tickets, ADRs, and review.

This section assumes OpenSpec because the book needs one concrete workflow. The cross-tool rule is broader than OpenSpec: one developer owns one change artifact at a time, and the branch, PR, and review all trace back to it.

## Chapters

1. [OpenSpec Across Stacks](./openspec-across-stacks): when the system has multiple tiers, one `openspec/` per stack prevents cross-tier context confusion
2. [OpenSpec in an Existing SDLC](./openspec-in-existing-sdlc): how OpenSpec artifacts map onto tickets, sprint boards, stories, PR reviews, and changelogs
3. [Trunk-Based Development with Agents](./trunk-based-development): change folders as short-lived branches, merge cadence, how spec deltas reduce merge pain, intent-first review
4. [Code Review for Agent-Generated Code](./code-review-agent-code): PR shape that makes intent-first review the default, AI-assisted coverage tracing, multi-LLM critique, and the gaps reviewers and agents catch for each other
5. [Shared Agent Instruction Conventions](./shared-conventions): team-level `AGENTS.md`, shared `.agents/skills/` libraries, onboarding, and when to leave things divergent
6. [Cross-Team Coordination](./cross-team-coordination): ADRs as the cross-team mechanism, inner source for `.agents/` libraries, multi-repo realities
7. [What Is Still Evolving](./what-is-still-evolving): what the Spec-Driven Development (SDD) ecosystem has not yet figured out, a maturity-bounded account of mid-2026
