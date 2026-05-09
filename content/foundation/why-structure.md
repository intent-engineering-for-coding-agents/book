# Why Structure Matters

The agent picks Redis.

It is a fine choice. Most caching examples use Redis. The team chose against Redis six months ago — for reasons that live in one person's memory and zero files in the repo. The agent had no way to know. The PR is approved. Three more PRs build on it before someone notices, and by then the choice is load-bearing. Removing it costs more than the original ADR would have.

This is a small story. The codebase has hundreds of these. Each session burns a little more of the gap between what the team decided and what the codebase actually expresses.

## Compounding drift

The model did not fail. The agent reasoned correctly from the context it had. The constraint was the context.

ThoughtWorks called this *cognitive debt* in their April 2026 Radar — the AI-era analogue to technical debt, but harder to detect because no linter catches an undocumented decision. Code has static analysis. Context does not. A team that ships ten agent-assisted PRs a week is making ten chances a week to encode an unwritten constraint as a contradiction in the codebase.

At human speed, drift like this used to take quarters to compound. At agentic speed, weeks. Yegge's "Revenge of the junior developer" framed this as the velocity amplifier — agents make good architectures sharper and bad ones uninhabitable, both faster than before.

*Sources: ThoughtWorks Technology Radar Vol 34 (April 2026) — cognitive debt. Yegge, "Revenge of the junior developer," Sourcegraph (Mar 22, 2025) — velocity as amplifier.*

## Structure as briefing

Whatever lives in `docs/`, `AGENTS.md`, and `openspec/` is what the agent reads. Whatever else the team knows, the agent invents from plausible-looking patterns. The choice is not whether the agent improvises — it always improvises — but how much it has to.

Take the Redis case again, run it forward with structure in place:

The decision was recorded as an ADR in `docs/decisions/0014-no-redis.md`. `AGENTS.md` lists `docs/decisions/` as canonical. The agent reads the ADR before proposing the cache. The agent surfaces the constraint and asks. The decision is now enforced in the system that created the temptation, instead of caught three PRs later by a human reviewer who happened to remember.

Nothing about this requires policing the agent. It requires giving the agent enough briefing to make plausible guesses on its own — which is what the rest of this Foundation section is about.

## The prerequisite

The remaining topics in this book each assume Foundation is in place. AI Instructions need a `docs/` to point into. Spec-driven development needs structure for specs to live in. Quality checks need conventions to validate. Skip Foundation and the rest stops working.

Foundation is also the topic with the lowest immediate payoff. A team can adopt OpenSpec on Tuesday and feel the difference Wednesday. A team that adopts Foundation gets value over months — fewer surprised-glance PRs, less rediscovery of past decisions, agents that no longer reinvent caching strategies. The compounding works in both directions.

## The discipline trap

A repo that adopts Foundation and then stops maintaining it is worse than a repo that never adopted it. An `AGENTS.md` last updated nine months ago is a confident-sounding lie the agent will follow. An empty `docs/decisions/` directory next to a `.gitkeep` is a signal that ADRs are not how this team works, regardless of what the README claims.

The seventh chapter in this section, [When ASE Fails](./when-ase-fails), names the failure modes that survive even good initial setup. Read it before you commit to the practices in the rest of the book. The point of Foundation is not a perfect repo on day one. It is a repo whose context stays current as the system changes.
