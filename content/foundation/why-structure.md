---
type: chapter
title: Why Structure Matters
---

# Why Structure Matters

Your agent adds a new `POST /orders` REST endpoint.

Consider a codebase whose team chose gRPC for new service endpoints. The reasons remain in a meeting nobody recorded. The existing services use gRPC, but no project instruction tells the agent to follow that choice.

The agent proposes REST, a familiar option. Without a record of the decision, the reviewer has to infer whether the mixed protocols are intentional.

The handler compiles and passes its tests. The codebase now speaks two protocols. A reviewer misses the mismatch, client code starts to depend on the REST endpoint, and reversing the choice costs more than writing the Architectural Decision Record (ADR) would have.

This hypothetical PR shows the problem at its smallest: a decision exists in team memory but not in the material the agent reads. Another session can make the same choice again.

## Compounding drift

The model did not fail: given the available context, the agent reasoned correctly. The constraint was missing.

Thoughtworks' April 2026 Radar warns of cognitive debt: the widening gap between generated code and developers' understanding of the system. An undocumented decision adds a separate context problem for the agent. In this book's framing, recording the decision gives both developers and agents a rationale to check before extending the code.

Generating a refactor does not establish whether the team understands the result. Code cleanup and developer understanding need separate review, even when the tests pass.

More generated changes give a team more opportunities to repeat a missed constraint before review catches it. The time it takes to notice depends on the team's review and integration cadence.

*Sources: Thoughtworks Technology Radar Vol 34 and its release announcement (April 15, 2026), cognitive debt as the gap in developer understanding. The link between recorded decisions and agent context is this book's synthesis.*

## Structure as context

Put the durable design record in `docs/`, the agent's instructions in `AGENTS.md`, and active and archived specs in `openspec/` when using OpenSpec. Then check which of those files the agent loads for the task. For a decision the team never wrote down, the agent has only the code and conversation to work from. Every silent decision leaves room for improvisation.

Chat sessions end with the session. Committed instructions, docs, and specs carry forward into the next run: local session, CI job, new laptop, and fresh clone all start from the same files. The codebase becomes the shared context source.

Run the gRPC case forward with the structure in place:

The migration to gRPC was recorded as `docs/decisions/0014-grpc-services.md`. `AGENTS.md` lists `docs/decisions/` as canonical and instructs the agent to read it before adding a new service endpoint.

```markdown
---
status: accepted
date: 2026-03-11
---

# Migrate service endpoints from REST to gRPC

## Context and Problem Statement

The team wants new service endpoints defined through the same protobuf contracts as the existing services.

## Considered Options

- gRPC: typed contracts via protobuf, streaming, language-agnostic
- REST with OpenAPI: typed via schema, but a second contract workflow for this team
- GraphQL: another contract and client workflow for this team

## Decision Outcome

Chosen option: gRPC. Keep new endpoints in the team's existing protobuf workflow.

### Consequences

- All new endpoints must be defined as .proto methods.
- REST handlers are deprecated; do not add new ones.
```

`## Decision Outcome` and `### Consequences` put the rule where the agent can find it. If the instruction file points to the ADR and the agent loads it, the proposal has a better chance of following the protobuf workflow. A reviewer still checks the new endpoint against the decision.

Put the decision, constraint, and file map in the codebase before asking the agent to extend the system. Then check that the agent loaded the ADR and that the patch follows it.

*Sources: `iec` repo structure and this repo's AGENTS.md conventions, the docs/ + AGENTS.md + openspec/ layout the agent reads as its context. OpenSpec documentation (ongoing), the openspec/ directory where specs live.*

## The prerequisite

The remaining Intent Engineering topics each assume Foundation is in place. Agent Instructions need a `docs/` to point into. Spec-driven development needs somewhere for specs to live, and quality checks have no conventions to validate against until Foundation supplies them. Skip Foundation and the rest stops working.

Foundation is also the topic with the lowest immediate payoff. A team adopting OpenSpec on Tuesday feels the difference Wednesday. A team adopting Foundation sees the effect over months: fewer PRs that reintroduce retired stacks, fewer review comments spent rediscovering old decisions, and fewer agent sessions wasted reconstructing codebase structure from code.

## The discipline trap

A codebase that adopts Foundation and then stops maintaining it is worse than one that never adopted it. An `AGENTS.md` that still points agents to a skill the team retired or a workflow it abandoned is a confident-sounding source of wrong guidance. Nothing in the file itself flags which pointers have gone dead. An empty `docs/decisions/` directory next to a `.gitkeep` signals that ADRs are not how this team works, regardless of what the README claims.

[When Intent Engineering Fails](./when-intent-engineering-fails) names the failure modes that remain after good initial setup. Read it before committing to the practices in the rest of the book. Foundation does not deliver a perfect codebase on day one. It delivers a codebase whose context stays current as the system changes. Getting that right starts with understanding that not all documents age the same way.
