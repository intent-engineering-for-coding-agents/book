# When Intent Engineering Fails

Intent Engineering does not make your codebase drift-proof. It makes drift detectable and recoverable, which is a meaningfully weaker claim, and the honest one.

The five failure modes below survive good initial setup. They are not beginner mistakes. They are what goes wrong for teams that adopted these practices in earnest and then let them slip. That is what happens to most teams, because the slip is gradual and nothing alerts you to it. The chapter exists here, before the practices, so the rest of the book does not read as sales material for itself.

## AGENTS.md rot

The entry point goes stale. `AGENTS.md` says to follow the old module layout. An ADR at `docs/decisions/0023-reverse-the-thing.md` reversed that layout nine months ago. Nobody updated `AGENTS.md`. The agent reads the instructions, not the ADR, and produces code shaped for the old system.

The fix is structural and slightly painful. Treat `AGENTS.md` as part of the architecture, not part of the initial setup. Any PR changing something `AGENTS.md` describes must update `AGENTS.md` in the same commit. This is a human discipline; no `iec check` rule catches "the convention you describe no longer matches the code". The AI Instructions topic covers what to put in `AGENTS.md`. Keeping it current stays your job.

## Dead specs

Open `openspec/changes/`. There are eleven directories. Three were implemented. Two were cancelled. One was implemented but never archived. One is partially done and the original author left. Three are competing proposals for the same change. One is from when the team tried OpenSpec for a week and stopped.

The agent reads all of them as active context.

A dead spec is worse than no spec. It tells the agent authoritatively about behaviour the system no longer has, decisions that were reversed, and acceptance criteria never proven. And it does so as the agent's first read of the change folder. Archive immediately after implementation. An un-archived spec is not historical record. It is live instruction.

Sources: De Schryver, "Keep Agentic AI Simple" (2025), clutter as a compounding factor in agent context.

## Agent-accelerated tech debt

Without spec-first discipline, the agent produces code that satisfies the immediate ask and quietly violates an architectural decision nobody read out loud. At human speed, this used to accrue across quarters. Ten agent-assisted PRs land on Tuesday and the codebase has measurably more contradictions by Wednesday afternoon.

The Spec-Driven topic exists because of this mode. Writing the spec before the agent implements gives the agent the constraints it needs. ADRs the agent reads are constraints the agent will follow. Constraints living only in human memory are constraints the agent will violate.

Sources: Yegge, "Revenge of the junior developer," Sourcegraph blog (Mar 22, 2025), agent velocity as amplifier.

## Over-spec

The team writes 500-line specs for a config rename. The spec becomes the bottleneck. Review cycles stretch. The agent, asked to implement from page-three requirements, drifts during the long reading pass and misses the requirement that mattered.

Spec length is a cost, not a quality signal. Every token spent reading the spec is a token unavailable for reasoning about the code. LeanSpec's framing applies here: if the spec is longer than the implementation would be, something has gone wrong. Match formality to risk. Payment processing earns a thorough spec. A config-key rename does not.

Sources: LeanSpec (lean-spec.dev), small-spec discipline and formality-to-risk matching.

The chapters in the Spec-Driven topic, "Why Small" and "Why Important Stuff First", go further. The summary is: small specs get implemented. Long ones get drift.

## Drift with no detection

The team has `AGENTS.md`, ADRs, specs, and good initial intentions. Six months later, six ADRs from the first month and nothing since. The most recent design doc is from March. `docs/INDEX.md` was last updated when someone new joined. Nobody violated a rule. There is no rule about update frequency. There is only drift, and nothing detecting it.

`iec check` in CI closes part of this loop. It catches structural violations before they reach main. The tool cannot catch ADRs that should have been written and were not. It cannot detect an architecture overview that was accurate a year ago and is now misleading. Detection of content drift is harder than detection of structural drift, and most of it remains a human responsibility.

The Quality and Verification topic gets the most leverage on this. Specifically, the agent-evaluation chapter, which covers how to test whether your AGENTS.md has stopped working without waiting for the next outage to find out.

## Why the rest of the book is organised the way it is

Each topic targets one or more of these modes directly:

| Failure mode | Topic that addresses it |
|---|---|
| AGENTS.md rot | AI Instructions |
| Dead specs | Spec-Driven Development |
| Agent-accelerated tech debt | Spec-Driven Development |
| Over-spec | Spec-Driven Development (Why Small, Why Important First) |
| Drift with no detection | Quality and Verification |

The point is not zero drift. That is not on offer. The point is drift that is detectable while it is still cheap to fix.

Drift with no detection is the hardest failure mode because nothing alerts you to it. You find out when something breaks in a way that traces back, through six months of accumulated mismatch, to what the agent was reading. The question that follows is what the AI Instructions topic is for: what should the agent be reading, and how do you keep it honest.

Sources: ThoughtWorks Technology Radar Vol 34 (April 2026), cognitive debt and harness engineering as the frame for drift that no check catches.
