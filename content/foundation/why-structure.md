# Why Structure Matters

The agent adds a `POST /orders` REST endpoint.

The team moved to gRPC months ago. Typed contracts, streaming, performance reasons that live in one architect's head, and zero files in the repo. Every other service in the codebase is gRPC. The new endpoint is REST, because every tutorial uses REST and the agent's training data is steeped in it. The handler compiles, passes its tests, and quietly reintroduces a stack the team paid migration cost to leave behind. The PR is approved. Three more PRs build clients that have to special-case this one service before someone notices the codebase now speaks two protocols. By then the choice is load-bearing, and removing it costs more than the original Architectural Decision Record (ADR) would have.

This is the small version. The codebase has hundreds of these. Each session burns a little more of the gap between what the team decided and what the codebase expresses.

## Compounding drift

The model did not fail. The agent reasoned correctly from the context it had. The constraint was the context.

ThoughtWorks called this cognitive debt in their April 2026 Radar: the AI-era analogue to technical debt, but harder to detect because no linter catches an undocumented decision. Code has static analysis. Context does not. A team that ships ten agent-assisted PRs a week makes ten chances a week to encode an unwritten constraint as a contradiction in the codebase.

At human speed, drift like this used to take quarters to compound. At agentic speed, weeks. Yegge's "Revenge of the junior developer" framed this as the velocity amplifier: agents make good architectures sharper and bad ones uninhabitable, both faster than before.

Sources: ThoughtWorks Technology Radar Vol 34 (April 2026), cognitive debt. Yegge, "Revenge of the junior developer," Sourcegraph (Mar 22, 2025), velocity as amplifier.

## Structure as briefing

Whatever lives in `docs/`, `AGENTS.md`, and `openspec/` is what the agent reads. Whatever else the team knows, the agent invents from plausible-looking patterns. The agent will improvise wherever the repo stays silent. The choice is how much it has to.

Run the gRPC case forward with structure in place:

The migration to gRPC was recorded as `docs/decisions/0014-grpc-services.md`. `AGENTS.md` lists `docs/decisions/` as canonical and instructs the agent to read it before adding a new service endpoint. The agent surfaces the constraint and proposes a `.proto` definition with the right method shape, or asks first. The decision is now enforced inside the system that created the temptation, instead of caught three PRs later by a reviewer who happened to remember the migration meeting from 2024.

Nothing about this requires policing the agent. It requires giving the agent enough briefing to make plausible guesses on its own.

Sources: `ase-cli` repo structure and this repo's AGENTS.md conventions, the docs/ + AGENTS.md + openspec/ layout the agent reads as its briefing. OpenSpec documentation (ongoing), the openspec/ directory where specs live.

## The prerequisite

The remaining ASE topics each assume Foundation is in place. AI Instructions need a `docs/` to point into. Spec-driven development needs structure for specs to live in. Quality checks need conventions to validate. Skip Foundation and the rest stops working.

Foundation is also the topic with the lowest immediate payoff. A team adopting OpenSpec on Tuesday feels the difference Wednesday. A team adopting Foundation gets value over months: fewer PRs that quietly resurrect choices the team already made, less rediscovery of past decisions, agents that no longer reintroduce stacks the team paid migration cost to leave behind. The compounding works in both directions.

## The discipline trap

A repo that adopts Foundation and then stops maintaining it is worse than a repo that never adopted it. An `AGENTS.md` last updated nine months ago is a confident-sounding lie the agent will follow. An empty `docs/decisions/` directory next to a `.gitkeep` signals that ADRs are not how this team works, regardless of what the README claims.

[When ASE Fails](./when-ase-fails) names the failure modes that survive even good initial setup. Read it before committing to the practices in the rest of the book. The point of Foundation is not a perfect repo on day one. It is a repo whose context stays current as the system changes. Getting that right starts with understanding that not all documents age the same way.
