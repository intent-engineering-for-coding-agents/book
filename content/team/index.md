# Team Workflows and Adoption

> One OpenSpec change per developer. Most of the team coordination problem dissolves right there.

The individual practices in the previous sections work at solo scale. This section is about what changes when there is more than one developer, and more than one agent, in the same codebase.

Less than the swarm pitch wants you to believe. Most of the agentic team problem is manufactured by skipping the one rule that prevents it: one developer owns one OpenSpec change at a time. Each change is an isolated proposal, on its own short-lived branch, reviewed in its own PR. Nobody points two agents at the same component from two unreconciled specs. Keep that rule and there is no special "coordination wall" left to scale. What remains is the SDLC every team already runs: branches, pull requests, tickets, ADRs.

So this is not a theory of agent swarms. It is how the one-change-per-developer rule slots into the ceremonies you already have. Where the architecture has clean boundaries, services behind API contracts, modules with explicit exports, parallel work across developers is safe almost by default, because the contracts coordinate for you. Where it does not, the fix is an ADR that draws the boundary, not a new process.

The genuinely unsolved part comes last, in [What Is Still Evolving](./what-is-still-evolving): autonomous agent-to-agent handoff, where agents coordinate with no human in the loop, is not solved by anyone in mid-2026. This book does not pretend otherwise. It describes what works now, which is smaller and more boring than the swarm pitch, and which ships.

## Chapters

1. [OpenSpec Across Stacks](./openspec-across-stacks): when the system has multiple tiers, one `openspec/` per stack prevents cross-tier context confusion
2. [OpenSpec in an Existing SDLC](./openspec-in-existing-sdlc): how OpenSpec artifacts map onto tickets, sprint boards, stories, PR reviews, and changelogs
3. [Trunk-Based Development with Agents](./trunk-based-development): change folders as short-lived branches; merge cadence; how spec deltas reduce merge pain; intent-first review
4. [Code Review for Agent-Generated Code](./code-review-agent-code): PR shape that makes intent-first review the default; AI-assisted coverage tracing; multi-LLM critique; what humans and agents each miss
5. [Shared Agent Instruction Conventions](./shared-conventions): team-level `AGENTS.md`, shared `.agents/skills/` libraries, onboarding, and when to leave things divergent
6. [Cross-Team Coordination](./cross-team-coordination): ADRs as the cross-team mechanism; inner source for `.agents/` libraries; multi-repo realities
7. [What Is Still Evolving](./what-is-still-evolving): what the SDD ecosystem has not yet figured out; a maturity-honest account of mid-2026
