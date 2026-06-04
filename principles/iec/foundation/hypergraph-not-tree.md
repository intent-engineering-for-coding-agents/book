# IEC-FOUNDATION-HYPERGRAPH-NOT-TREE: Documents Form a Hypergraph

**Layer**: 1
**Categories**: foundation, navigation, context
**Applies-to**: all
**Summary**: Documents form a hypergraph, not a tree — agents navigate via links, not hierarchy.

## Principle

Documentation is not a tree. It is a hypergraph. Agents and humans pick the relevant context via links and skip the rest. Fast retrieval at every depth is part of the design, not an afterthought. Every document should link to its preconditions and its consequences.

## Why it matters

A tree structure forces the reader to traverse irrelevant nodes to reach the relevant one. A hypergraph lets the reader jump directly. For agents with limited context windows, this is not a nicety — it is the difference between loading the right file and loading a directory index plus every sibling file to find it.

## Violations to detect

- Documents that reference other documents only by name without links
- Navigation that relies on directory listing rather than explicit cross-references
- Missing cross-references between related ADRs or between a spec and its implementing modules

## Good practice

Every document answers: what must the reader already know before reading this? Link to it. What should the reader read next? Link to it. The hypergraph emerges from these edges.

## Sources

- intent-book, *"Why Structure" chapter*, foundation section.
- intent-book, plan.md, Living Principles appendix.
