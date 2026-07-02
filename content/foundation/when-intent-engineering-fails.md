# When Intent Engineering Fails

Intent Engineering does not prevent specs and agent instructions from falling out of sync with the codebase. It makes that gap visible and recoverable, which is a meaningfully weaker claim, and the technically accurate one.

The five failure modes below remain after good initial setup. They are not beginner mistakes. They show up after the first discipline wears off, and they do it quietly enough that the damage compounds before anyone notices. The chapter sits here, before the practices, so the rest of the book does not read like sales material for itself.

## Agent instructions rot

The entry point goes stale. The agent instructions say to follow the old module layout, while an ADR reversed that layout months ago. Nobody updated the agent instructions, so the agent reads them, not the ADR, and produces code shaped for the old system.

The fix is structural and slightly painful. Treat agent instructions as part of the architecture, not part of the initial setup. Any PR changing something the agent instructions describe must update them in the same commit. No CI check catches "the convention you describe no longer matches the code". The Agent Instructions topic covers what to put in `AGENTS.md` and `.agents/instructions/...`. Keeping these current stays your job.

## Dead specs

Open `openspec/changes/` (the OpenSpec change folder, if your team uses OpenSpec) and find a pile of directories: implemented changes, canceled changes, an implemented change never archived, a partially done change from before the original author left, and competing proposals for the same change.

Without an archive step, the agent has no signal to distinguish a canceled spec from an active one. Whatever it reads, it reads as live instruction. De Schryver's case for keeping agentic workflows simple applies directly here: the clutter compounds with every change the team leaves un-archived.

A dead spec is worse than no spec. It tells the agent, with confidence, about behavior the system no longer has, decisions that were reversed, and acceptance criteria never proven. Worse, it does so as the agent's first read of the change folder. Archive immediately after implementation. The [Spec Lifecycle](../spec-driven/spec-lifecycle) chapter builds the archive discipline that prevents this.

*Sources: De Schryver, "Keep Agentic AI Simple" (2026), clutter as a compounding factor in agent context.*

## Agent-accelerated tech debt

Without spec-first discipline, the agent produces code that satisfies the immediate ask and quietly violates an architectural decision nobody read out loud. At human speed, this kind of drift accumulated across quarters. At agent speed, a day of merged PRs adds the architectural contradictions that once took weeks of handwritten changes to produce. Yegge's framing of the agentic shift fits: velocity amplifies whatever discipline is already there, and whatever is missing.

The Spec-Driven topic exists because of this mode. Writing the spec before the agent implements gives the agent the intention it needs. Decisions written down as ADRs are constraints the agent will follow. Intent and constraints living only in human memory will be violated.

*Sources: Yegge, "Revenge of the junior developer," Sourcegraph blog (March 22, 2025), agent velocity as amplifier.*

## Over-spec

The team writes multipage specs for a config rename. The spec becomes the bottleneck. Review cycles stretch. The agent, asked to implement from requirements buried late in the spec, drifts during the long reading pass and misses the requirement that mattered.

Spec length is a cost, not a quality signal. Every token spent reading the spec is a token unavailable for reasoning about the code. LeanSpec's framing applies here: if the spec is longer than the implementation would be, something has gone wrong. Match formality to risk. Payment processing earns a thorough spec. A config-key rename does not.

The "Why Small" chapter in the Spec-Driven topic goes further.

*Sources: LeanSpec (lean-spec.dev), small-spec discipline, and formality-to-risk matching.*

## Drift with no detection

The team has agent instructions, ADRs, specs, and good initial intentions. Six months later, the codebase has six ADRs from the first month and nothing since, a design doc last touched in March, and a `docs/INDEX.md` last updated when someone new joined. Nobody violated a rule because there is no rule about update frequency. There is only drift, and nothing detecting it.

A convention check in CI covers part of this gap. It catches structural violations before they reach the main. The check does not catch ADRs that should have been written and were not. It does not detect an architecture overview that was accurate a year ago and is now misleading. Detection of content drift is harder than detection of structural drift, and most of it remains a human responsibility.

The [agent-evaluation chapter](../quality/agent-evaluation) covers what detection is available and where the limits are.

## Why the rest of the book is organized the way it is

Each topic targets one or more of these modes directly:

| Failure mode | Topic that addresses it |
|---|---|
| Agent instructions rot | Agent Instructions |
| Dead specs | Spec-Driven Development |
| Agent-accelerated tech debt | Spec-Driven Development |
| Over-spec | Spec-Driven Development (Why Small) |
| Drift with no detection | Quality and Verification |

Cognitive debt is the cost that grows when these modes go unaddressed: the undocumented decision that quietly breaks a deployment months later. ThoughtWorks uses "harness engineering" for the controls that keep the agent's context coherent enough to hold that debt down. The rest of this book is about building those controls, one failure mode at a time.

You will still get drift. The win is catching the mismatch before three stale assumptions turn into one bad deploy.

Six months of accumulated mismatch usually trace back to what the agent was reading. The Agent Instructions topic covers which files it should load and how to keep them current.

*Sources: ThoughtWorks Technology Radar Vol 34 (April 2026), cognitive debt and harness engineering as the frame for drift that no check catches.*
