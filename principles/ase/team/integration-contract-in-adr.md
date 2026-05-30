---
name: integration-contract-in-adr
description: Cross-tier API contracts belong in ADRs, not in individual stack specs
metadata:
  type: feedback
---

# ASE-TEAM-INTEGRATION-CONTRACT-IN-ADR: Integration Contract Belongs in an ADR

**Layer**: 2
**Categories**: team, specs, decisions
**Applies-to**: multi-tier systems
**Summary**: Cross-tier API contracts belong in ADRs, not in individual stack specs.

## Principle

The contract between two tiers (endpoint shape, request/response format, authentication boundary) is permanent architecture — it outlives the change folders that first established it. Record it in an ADR at `docs/decisions/`; reference the ADR from both stacks' change folders.

## Why it matters

A spec is temporary: it is archived after the change is implemented. An ADR is permanent. A contract recorded only in a spec disappears from the canonical architecture record when the spec is archived. Agents writing new specs that cross the same boundary find no contract and improvise.

## Violations to detect

- BFF API shape defined in a front-end change folder spec rather than in an ADR
- Two stacks' change folders each defining their side of a contract independently, without a shared ADR
- A contract change made by editing a spec rather than superseding the governing ADR

## Good practice

When a feature requires a new cross-tier contract: create the ADR first, have both teams review it, then each team creates their change folder referencing the ADR for contract details. When the contract changes, the ADR is updated or superseded — both teams' agents see the update automatically if they load the ADR as part of their context.

## Sources

- ase-book, ["OpenSpec Across Stacks"](/team/openspec-across-stacks) chapter.
- Michael Nygard, ["Documenting Architecture Decisions"](https://www.cognitect.com/blog/2011/11/15/documenting-architecture-decisions), Cognitect blog, Nov 15, 2011.
