# Team Workflows and Adoption

> The individual practice is precise and accountable. The team practice is where it either compounds or collapses.

One developer, one agent, one change folder. The practices described in the previous sections work well at this scale. The agent has enough context to make reasonable guesses. The spec constrains what it builds. The tests prove what it built. The PR review catches what slipped through.

Add a second developer.

Now there are two change folders, potentially modifying the same component from different intent. Two agents loading the same `AGENTS.md` but operating in isolated sessions, neither knowing what the other is doing. Two sets of tests, each written against separate specs, passing against local branches that have not yet merged. The individual practices are still correct. The system is not.

This section is about the coordination wall that appears when teams grow. Not the wall of skill (both developers are competent) but the wall of context: agents that are individually well-briefed but collectively unaware of each other. The chapters here do not introduce new ceremonies. They map ASE (Agentic Software Engineering) practices onto the SDLC primitives teams already use: branches, PR reviews, tickets, ADRs, sprint boards. The coordination problem is structural; the solution is structural.

## Chapters

1. [OpenSpec Across Stacks](./openspec-across-stacks): when the system has multiple tiers, one `openspec/` per stack prevents cross-tier context confusion
2. [Why Teams Break Agentic Workflows](./why-teams-break): N developers times M agents equals compounding drift; where individual practice runs out of road
3. [OpenSpec in an Existing SDLC](./openspec-in-existing-sdlc): how OpenSpec artifacts map onto tickets, sprint boards, stories, PR reviews, and changelogs
4. [Trunk-Based Development with Agents](./trunk-based-development): change folders as short-lived branches; merge cadence; how spec deltas reduce merge pain
5. [Code Review for Agent-Generated Code](./code-review-agent-code): spec delta first, diff second; intent-first review; when splitting a PR is worth the overhead
6. [Parallel Agents on the Same Codebase](./parallel-agents): change folder as the isolation primitive; architecture boundaries as the conflict-prevention layer
7. [Shared AI Instruction Conventions](./shared-conventions): team-level `AGENTS.md`, shared `.agents/skills/` libraries, onboarding, and when to leave things divergent
8. [Cross-Team Coordination](./cross-team-coordination): ADRs as the cross-team mechanism; inner source for `.agents/` libraries; multi-repo realities
9. [What Is Still Evolving](./what-is-still-evolving): what the SDD ecosystem has not yet figured out; a maturity-honest account of mid-2026
