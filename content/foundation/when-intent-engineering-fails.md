# When Intent Engineering Fails

Intent Engineering does not prevent specs and agent instructions from falling out of sync with the codebase. It makes that gap visible and recoverable, which is a meaningfully weaker claim, and the honest one.

The five failure modes below survive good initial setup. They are not beginner mistakes. They emerge once the initial discipline wears off, gradually enough that nothing alerts you before the damage compounds. The chapter exists here, before the practices, so the rest of the book does not read as sales material for itself.

## Agent instructions rot

The entry point goes stale. The agent instructions say to follow the old module layout, while an ADR at `docs/decisions/0023-reverse-the-thing.md` reversed that layout nine months ago. Nobody updated the agent instructions, so the agent reads them, not the ADR, and produces code shaped for the old system.

The fix is structural and slightly painful. Treat agent instructions as part of the architecture, not part of the initial setup. Any PR changing something the agent instructions describe must update them in the same commit. This is a human discipline. No CI check catches "the convention you describe no longer matches the code". The Agent Instructions topic covers what to put in `AGENTS.md` and `.agents/instructions/...`. Keeping these current stays your job.

## Dead specs

Open `openspec/changes/` and find eleven directories: three implemented, two canceled, one implemented but never archived, one partially done before the original author left, three competing proposals for the same change, and one from when the team tried OpenSpec for a week and stopped.

Without an archive step, the agent has no signal to distinguish a canceled spec from an active one. Whatever it reads, it reads as live instruction.

A dead spec is worse than no spec. It tells the agent authoritatively about behavior the system no longer has, decisions that were reversed, and acceptance criteria never proven. Worse, it does so as the agent's first read of the change folder. Archive immediately after implementation. An un-archived spec is not a historical record, but live instruction. The [Spec Lifecycle](../spec-driven/spec-lifecycle) chapter builds the archive discipline that prevents this.

*Sources: De Schryver, "Keep Agentic AI Simple" (2025), clutter as a compounding factor in agent context.*

## Agent-accelerated tech debt

Without spec-first discipline, the agent produces code that satisfies the immediate ask and quietly violates an architectural decision nobody read out loud. At human speed, this used to grow across quarters. Ten agent-assisted PRs landed on Tuesday, and the codebase had measurably more contradictions by Wednesday afternoon.

The Spec-Driven topic exists because of this mode. Writing the spec before the agent implements gives the agent the intention it needs. Decisions written down as ADRs are constraints the agent will follow. Intent and constraints living only in human memory will be violated.

*Sources: Yegge, "Revenge of the junior developer," Sourcegraph blog (Mar 22, 2025), agent velocity as amplifier.*

## Over-spec

The team writes 500-line specs for a config rename. The spec becomes the bottleneck. Review cycles stretch. The agent, asked to implement from page-three requirements, drifts during the long reading pass and misses the requirement that mattered.

Spec length is a cost, not a quality signal. Every token spent reading the spec is a token unavailable for reasoning about the code. LeanSpec's framing applies here: if the spec is longer than the implementation would be, something has gone wrong. Match formality to risk. Payment processing earns a thorough spec. A config-key rename does not.

*Sources: LeanSpec (lean-spec.dev), small-spec discipline, and formality-to-risk matching.*

The chapters in the Spec-Driven topic, "Why Small" and "Why Important Stuff First", go further.

## Drift with no detection

The team has agent instructions, ADRs, specs, and good initial intentions. Six months later, the repo has six ADRs from the first month and nothing since, a design doc last touched in March, and a `docs/INDEX.md` last updated when someone new joined. Nobody violated a rule because there is no rule about update frequency. There is only drift, and nothing detecting it.

A convention check in CI closes part of this loop. It catches structural violations before they reach the main. The check cannot catch ADRs that should have been written and were not. It cannot detect an architecture overview that was accurate a year ago and is now misleading. Detection of content drift is harder than detection of structural drift, and most of it remains a human responsibility.

The Quality and Verification topic gets the most leverage on this. Specifically, the agent-evaluation chapter, which covers how to test whether your agent instructions have stopped working without waiting for the next outage to find out.

## Why the rest of the book is organized the way it is

Each topic targets one or more of these modes directly:

| Failure mode | Topic that addresses it |
|---|---|
| Agent instructions rot | Agent Instructions |
| Dead specs | Spec-Driven Development |
| Agent-accelerated tech debt | Spec-Driven Development |
| Over-spec | Spec-Driven Development (Why Small, Why Important First) |
| Drift with no detection | Quality and Verification |

The point is not zero drift. That is not on offer. The point is a drift that is detectable while it is still inexpensive to fix.

You find out when something breaks in a way that traces back, through six months of accumulated mismatch, to what the agent was reading. The question that follows is what the Agent Instructions topic is for: what should the agent be reading, and how do you keep it honest.

*Sources: ThoughtWorks Technology Radar Vol 34 (April 2026), cognitive debt and harness engineering as the frame for drift that no check catches.*
