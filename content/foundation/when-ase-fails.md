# When ASE Fails

ASE does not make your codebase drift-proof. It gives you the surface area to detect drift and recover from it. That is a weaker claim than "follow these practices and your agent will produce perfect code," and it is the honest one.

The failure modes below survive good initial setup. They are not beginner mistakes — they are the things that go wrong for teams that adopted ASE practices genuinely and then let them slip. Each one is listed here, before the practices that address it, so the book does not read as sales material for its own prescriptions.

## AGENTS.md rot

The entry point goes stale. The instructions describe a system that no longer exists. The architectural decision recorded in AGENTS.md was reversed six months ago, but the reversal was captured in a new ADR, not in AGENTS.md itself. The agent follows the stale instructions faithfully and produces code that fits the old system.

The fix is structural: treat AGENTS.md as part of the architecture, not part of the repo's initial setup. Any PR that changes something AGENTS.md describes must update AGENTS.md in the same commit. This is a human discipline; the AI Instructions topic (Phase Q) covers what to put in AGENTS.md and why, but the discipline of keeping it current is yours.

## Dead specs

The `openspec/changes/` directory fills with proposals that were partially implemented, partially cancelled, and partially superseded. None are archived. None are marked. The agent reads them all as active context.

A dead spec is worse than no spec. It tells the agent authoritatively about behaviour the system no longer has, decisions that were reversed, and acceptance criteria that were never proven. Archive immediately after implementation. An un-archived spec is not historical record — it is live instruction.

*Sources: De Schryver, "Keep Agentic AI Simple" (2025) — clutter as a compounding factor.*

## Agent-accelerated tech debt

Without spec-first discipline, agents produce code that satisfies the immediate request but violates existing architectural decisions. At human speed, this accrues slowly. At agentic speed — ten features implemented in a day — it accrues fast enough to make the codebase meaningfully harder to work with by the end of the week.

This failure mode is why the Spec-Driven topic exists. Writing a spec before asking the agent to implement gives the agent the constraints it needs to avoid this class of violation. It is also why ADRs are important: a constraint the agent cannot read is a constraint the agent cannot follow.

*Sources: Yegge, "Revenge of the junior developer," Sourcegraph blog (Mar 22, 2025) — agent velocity as an amplifier of both good and bad decisions.*

## Over-spec

The team writes 500-line specs for changes that would have taken 50 lines of code. The spec becomes the bottleneck. Review cycles stretch. The agent, asked to implement from the long spec, drifts during the reading pass and misses requirements buried on page three.

The LeanSpec principle applies here: if the spec is longer than the implementation would be, something has gone wrong. Match formality to risk. A change that touches payment processing deserves a thorough spec. A change that renames a configuration key does not.

Context window economics make this concrete: every token spent reading a long spec is a token unavailable for reasoning about the implementation. Spec length is not a signal of quality; it is a cost.

## Drift with no detection

The team has AGENTS.md, ADRs, specs, and good initial intentions. Six months later the ADR directory has six entries — all from the first month. The most recent design doc is from March. The INDEX.md has not been updated since the last team onboarding. Nobody violated a rule; there is no rule saying how frequently these must be updated. There is just drift, and nothing detecting it.

`ase check` in CI closes part of this loop — it catches structural violations before they reach the main branch. But `ase check` cannot catch ADRs that should have been written and were not. It cannot detect an architecture overview that was accurate a year ago but is now misleading. Detection of content drift is harder than detection of structural drift, and most of it remains a human responsibility.

## The framing for the topics that follow

Each topic in the book targets one or more of these failure modes directly:

| Failure mode | Topic |
|---|---|
| AGENTS.md rot | AI Instructions |
| Dead specs | Spec-Driven Development |
| Agent-accelerated tech debt | Spec-Driven Development |
| Over-spec | Spec-Driven Development (Why Small, Why Important First) |
| Drift with no detection | Quality and Verification |

Knowing the failure modes before learning the practices makes the practices easier to calibrate. The goal is not zero drift — that is not achievable. The goal is drift that is detectable and recoverable.

*Sources: ThoughtWorks Technology Radar Vol 34 (April 2026) — cognitive debt and harness engineering. Yegge, "Revenge of the junior developer" (2025). De Schryver, "Keep Agentic AI Simple" (2025).*
