# Why Structure Matters

Your agent adds a new `POST /orders` REST endpoint.

Consider a codebase that moved to gRPC months ago for typed contracts, streaming, and performance reasons that live in one architect's head and zero files in the docs. Every other service in the codebase is gRPC.

REST is what the model reaches for by default. The decision to leave it behind and replace it with gRPC happened in a team meeting but never became a readable file, for the agent or anyone else.

The handler compiles and passes its tests. The codebase now speaks two protocols. A reviewer misses the mismatch, client code starts to depend on the REST endpoint, and reversing the choice costs more than writing the Architectural Decision Record (ADR) would have.

This one PR is the smallest version of the problem. The codebase holds hundreds like it, each one an undocumented decision waiting to be overwritten. The count keeps climbing. Every agent session widens the gap between what the team decided and what the code now says.

## Compounding drift

The model did not fail. Given the available context, the agent reasoned correctly. The constraint was missing.

ThoughtWorks called this cognitive debt in their April 2026 Radar: the agentic-era analogue to technical debt, but harder to detect because no linter catches an undocumented decision. Code has static analysis. Context does not. A team that ships ten agent-assisted PRs a week makes ten chances a week to encode an unwritten constraint as a contradiction in the codebase.

There is a flip side: the same agents that run up cognitive debt also clear code debt faster. A refactor that took a sprint now takes an afternoon. The debt does not disappear. It moves from the code to the gap between what the team decided and what the codebase expresses.

At human speed, drift like this used to take quarters to compound. At agentic speed, it takes weeks, sometimes days. Yegge's "Revenge of the junior developer" framed this as the velocity amplifier: agents make good architectures sharper and bad ones uninhabitable, both faster than before.

*Sources: ThoughtWorks Technology Radar Vol 34 (April 2026), cognitive debt. Yegge, "Revenge of the junior developer," Sourcegraph (March 22, 2025), velocity as amplifier.*

## Structure as context

Whatever lives in `docs/` (the durable design record), `AGENTS.md` (the agent's instructions), and `openspec/` (the active and archived specs when using OpenSpec) is what the agent reads. Whatever else the team knows, the agent invents from plausible-looking patterns. The agent improvises wherever the codebase stays silent. The only question is how much silence you leave.

Chat sessions end with the session. Committed instructions, docs, and specs survive into the next run: local session, CI job, new laptop, and fresh clone all start from the same files. The codebase becomes the shared context source.

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

The agent does not have to read the reasoning to find the constraint. `## Decision Outcome` and `### Consequences` put the rule where the agent finds it. From there, the agent proposes a `.proto` definition with the right method shape, or asks first. The decision is enforced inside the system that created the temptation, instead of caught later by a reviewer who happened to remember the migration meeting from months back.

None of this is about policing the agent. The mechanism is simpler: put the decision, constraint, and file map in the codebase before asking the agent to extend the system.

*Sources: `iec` repo structure and this repo's AGENTS.md conventions, the docs/ + AGENTS.md + openspec/ layout the agent reads as its context. OpenSpec documentation (ongoing), the openspec/ directory where specs live.*

## The prerequisite

The remaining Intent Engineering topics each assume Foundation is in place. Agent Instructions need a `docs/` to point into. Spec-driven development needs somewhere for specs to live, and quality checks have no conventions to validate against until Foundation supplies them. Skip Foundation and the rest stops working.

Foundation is also the topic with the lowest immediate payoff. A team adopting OpenSpec on Tuesday feels the difference Wednesday. A team adopting Foundation sees the effect over months: fewer PRs that reintroduce retired stacks, fewer review comments spent rediscovering old decisions, and fewer agent sessions wasted reconstructing codebase structure from code.

## The discipline trap

A codebase that adopts Foundation and then stops maintaining it is worse than one that never adopted it. An `AGENTS.md` that still points agents to a skill the team retired or a workflow it abandoned is a confident-sounding source of wrong guidance. Nothing in the file itself flags which pointers have gone dead. An empty `docs/decisions/` directory next to a `.gitkeep` signals that ADRs are not how this team works, regardless of what the README claims.

[When Intent Engineering Fails](./when-intent-engineering-fails) names the failure modes that remain after good initial setup. Read it before committing to the practices in the rest of the book. Foundation does not deliver a perfect codebase on day one. It delivers a codebase whose context stays current as the system changes. Getting that right starts with understanding that not all documents age the same way.
