# IEC-FOUNDATION-ONE-CONCEPT-PER-DOCUMENT: One Concept Per Document

**Layer**: 1
**Categories**: foundation, structure, context
**Applies-to**: all
**Summary**: One concept per document — makes the hypergraph navigable and keeps each node within context budget.

## Principle

Split documentation by concept, not by size. One concept per document makes the hypergraph navigable and keeps each node within an agent's attention budget. The two rationales point the same way: a document that covers one concept is small enough for the agent and precise enough to link to.

## Why it matters

A document that covers five related but distinct concepts cannot be linked to precisely. Every reference to it loads all five concepts into context, even when only one is relevant. The context cost compounds across sessions.

## Violations to detect

- Single ADRs covering multiple unrelated decisions
- Monolithic architecture documents covering multiple subsystems
- Instruction files mixing unrelated domains

## Good practice

If a document's heading includes "and" or covers more than one distinct topic, split it. A reader should be able to describe what the document is about in a sentence.

## Sources

- intent-book, *"Why Structure" chapter*, foundation section.
- intent-book, plan.md, Living Principles appendix.
