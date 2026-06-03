# ASE-CONTEXT-IMPORTANT-FIRST: Important Context Goes at the Top

**Layer**: 1
**Categories**: context, structure, agent
**Applies-to**: all
**Summary**: Put the most important context at the top — agents read top-down and lose focus.

## Principle

Agents read top-down and lose focus. If they read only the first 50 lines of a file, the most important content must be in those 50 lines. Constraints, non-goals, and risk-bearing requirements go at the top, not buried in an appendix. The agent may never reach the rest.

## Why it matters

An agent skimming a long document processes the top, then the middle, then the bottom with decreasing attention. A critical constraint buried at line 200 may be processed with too little attention to influence behavior. This inverts conventional document structure, which buries assumptions and constraints in appendices.

## Violations to detect

- Documents where key constraints appear after long background sections
- Specs where the risk-bearing requirements are at the bottom
- Instructions where the most important directive is not in the first paragraph

## Good practice

Structure every document: what must the reader know first? Put it first. What can wait? Put it later. The first paragraph should contain the document's load-bearing claim.

## Sources

- ase-book, *"Context Window" chapter*, agent-instructions section.
- AgentPatterns.ai, *"TOC pattern" and top-down attention*, ongoing.
