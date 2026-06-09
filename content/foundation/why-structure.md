# Why Structure Matters

The agent adds a new `POST /orders` REST endpoint.

The team moved to gRPC months ago due to typed contracts, streaming, performance reasons that live in one architect's head, and zero files in the repo. Every other service in the codebase is gRPC.

REST is what the agent's model absorbed during its base training. The decision to leave it behind and replace it for gRPC happened in a team meeting but never became a readable file, for the agent or anyone else. This crucial information now only lives in the heads of the team members who happen to remember the decision.

The handler compiles, passes its tests, and quietly reintroduces a stack the team paid migration cost to leave behind. The PR is approved. Three more PRs build clients that have to special-case this one service before someone notices the codebase now speaks two protocols. By then the choice is load-bearing, and removing it costs more than the original Architectural Decision Record (ADR) would have.

This one PR is the smallest version of the problem. The codebase holds hundreds like it, each one an undocumented decision waiting to be quietly overwritten. And the count keeps climbing. Every agent session is one more chance to widen the gap between what the team decided and what the code now says.

## Compounding drift

The model did not fail. The agent reasoned correctly from the context made available to it. The constraint was the lack of context.

ThoughtWorks called this cognitive debt in their April 2026 Radar: the agentic-era analogue to technical debt, but harder to detect because no linter catches an undocumented decision. Code has static analysis. Context does not. A team that ships ten agent-assisted PRs a week makes ten chances a week to encode an unwritten constraint as a contradiction in the codebase. There is a flip side: the same agents that introduce documentation debt also clear code debt faster. A refactor that took a sprint now takes an afternoon. The debt does not disappear. It migrates from the code to the gap between what the team decided and what the repo expresses.

At human speed, drift like this used to take quarters to compound. At agentic speed, weeks, sometimes days. Yegge's "Revenge of the junior developer" framed this as the velocity amplifier: agents make good architectures sharper and bad ones uninhabitable, both faster than before.

*Sources: ThoughtWorks Technology Radar Vol 34 (April 2026), cognitive debt. Yegge, "Revenge of the junior developer," Sourcegraph (Mar 22, 2025), velocity as amplifier.*

## Structure as briefing

Whatever lives in `docs/` (the durable design record), `AGENTS.md` (the agent's brief), and `openspec/` (the active and archived specs when using OpenSpec) is what the agent reads. Whatever else the team knows, the agent invents from plausible-looking patterns. The agent will improvise wherever the repo stays silent. The choice is how much it has to.

Run the gRPC case forward with the structure in place:

The migration to gRPC was recorded as `docs/decisions/0014-grpc-services.md`. `AGENTS.md` lists `docs/decisions/` as canonical and instructs the agent to read it before adding a new service endpoint.

```markdown
---
status: accepted
date: 2026-03-11
---

# Migrate service endpoints from REST to gRPC

## Context and Problem Statement

REST endpoints lack typed contracts and cannot support streaming.
Performance profiling identified protocol overhead as a bottleneck.

## Considered Options

- gRPC: typed contracts via protobuf, streaming, language-agnostic
- REST with OpenAPI: typed via schema, widely understood, no streaming
- GraphQL subscriptions: streaming support, heavier client tooling

## Decision Outcome

Chosen option: gRPC. It is the only option that satisfies all three constraints.

### Consequences

- All new endpoints must be defined as .proto methods.
- REST handlers are deprecated; do not add new ones.
```

The agent does not have to read the reasoning to find the constraint. It reads `## Decision Outcome` and `### Consequences`. The structure is what makes that possible. The agent surfaces the constraint and proposes a `.proto` definition with the right method shape, or asks first. The decision is now enforced inside the system that created the temptation, instead of caught three PRs later by a reviewer who, by coincidence, happened to remember the migration meeting from 2024.

None of this is about policing the agent. The point is handing the agent enough context to reason instead of guess.

*Sources: `iec` repo structure and this repo's AGENTS.md conventions, the docs/ + AGENTS.md + openspec/ layout the agent reads as its briefing. OpenSpec documentation (ongoing), the openspec/ directory where specs live.*

## The prerequisite

The remaining Intent Engineering topics each assume Foundation is in place. Agent Instructions need a `docs/` to point into. Spec-driven development needs structure for specs to live in. Quality checks need conventions to validate. Skip Foundation and the rest stops working.

Foundation is also the topic with the lowest immediate payoff. A team adopting OpenSpec on Tuesday feels the difference Wednesday. A team adopting Foundation gets value over months: fewer PRs that quietly resurrect choices the team already made, less rediscovery of past decisions, agents that no longer reintroduce stacks the team paid migration cost to leave behind. The compounding works in both directions.

## The discipline trap

A repo that adopts Foundation and then stops maintaining it is worse than a repo that never adopted it. An `AGENTS.md` that still points agents to a skill the team retired or a workflow it abandoned is a confident-sounding source of wrong guidance. Nothing in the file itself flags which pointers have gone dead. An empty `docs/decisions/` directory next to a `.gitkeep` signals that ADRs are not how this team works, regardless of what the README claims.

[When Intent Engineering Fails](./when-intent-engineering-fails) names the failure modes that survive even good initial setup. Read it before committing to the practices in the rest of the book. The point of Foundation is not a perfect repo on day one. It is a repo whose context stays current as the system changes. Getting that right starts with understanding that not all documents age the same way.
