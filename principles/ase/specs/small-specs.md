# ASE-SPECS-SMALL-SPECS: Small Specs Outperform Large

**Layer**: 1
**Categories**: specs, context, sdd
**Applies-to**: all
**Summary**: Small specs outperform large specs — an agent that finishes beats one that drifts.

## Principle

Small specs outperform large specs. An agent that finishes is better than one that drifts. Specs over approximately 300 lines start losing the thread. Context window economics mean every token spent on a long spec is a token unavailable for code.

## Why it matters

A long spec consumes the agent's attention budget before it writes a single line of code. The agent begins implementation with degraded context, increasing the probability of drift. A spec that is too long to read in one session is a spec the agent will implement from an incomplete understanding.

## Violations to detect

- Specs exceeding ~300 lines of prose
- Specs covering multiple independent changes
- Specs where the constraints are buried after long background sections

## Good practice

A spec is a change proposal scoped to one PR, not a requirements document. If it describes more than one change, split it. If it requires a table of contents, split it.

## Sources

- ase-book, *"Why Small" chapter*, specs section.
- LeanSpec; Anthropic, *"Building effective agents"* (Dec 2024).
