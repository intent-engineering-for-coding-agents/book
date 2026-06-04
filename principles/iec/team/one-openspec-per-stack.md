---
name: one-openspec-per-stack
description: Each stack in a multi-tier system gets its own openspec/ directory — prevents cross-tier context confusion
metadata:
  type: feedback
---

# IEC-TEAM-ONE-OPENSPEC-PER-STACK: One `openspec/` Per Stack

**Layer**: 2
**Categories**: team, specs, context
**Applies-to**: multi-tier systems
**Summary**: Each stack in a multi-tier system gets its own `openspec/` directory — prevents cross-tier context confusion.

## Principle

A single `openspec/` directory shared across multiple tiers (front-end, BFF, back-end) gives the agent all tiers' specs as context and no signal about which tier it is working in. One `openspec/` per stack scopes each agent's context to the work it is actually doing.

## Why it matters

Context ambiguity produces confident wrong decisions. An agent with front-end, BFF, and back-end specs in scope can pick the back-end API when the front-end contract required the BFF API. The architecture was correct; the context was not scoped.

## Violations to detect

- A single `openspec/` directory at the monorepo root covering changes to multiple stacks
- Specs in one stack's change folder that include acceptance criteria for a different stack's components
- An agent in the front-end repo loading back-end ADRs as primary context for its spec

## Good practice

`front-end/openspec/`, `bff/openspec/`, `back-end/openspec/` — each scoped to its stack. Integration contracts between stacks live in shared ADRs at `docs/decisions/`, referenced by both stacks' change folders.

## Sources

- intent-book, ["OpenSpec Across Stacks"](/team/openspec-across-stacks) chapter.
- Fission AI, [OpenSpec](https://openspec.dev/) (ongoing).
