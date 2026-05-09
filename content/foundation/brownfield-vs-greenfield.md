# Brownfield vs Greenfield — Bootstrap with skeleton.md

The chapters in this Foundation section describe practices that assume you can start from intent. You know what the system is supposed to do. You write `AGENTS.md` based on that understanding. You author ADRs that capture decisions as you make them. You write specs from requirements.

Most enterprise readers cannot do this. The system predates ASE practices by years or decades. The intent is buried in code nobody fully understands, in comments that stopped being accurate when the feature was refactored, and in the heads of developers who may no longer be on the team. The agent that arrives in this environment improvises — and improvisation at agentic speeds compounds existing drift faster than human-speed development ever did.

This is the brownfield problem, and it requires a different starting move.

## skeleton.md as the bootstrap artefact

The brownfield bootstrap is `skeleton.md`: an AI-generated structural map of an existing codebase. Not a refactor. Not a rewrite. Not even a plan. A map.

A `skeleton.md` contains what a capable agent can infer from reading the code: the major modules and their responsibilities, the key dependencies between them, the data flow through the system, an outline of the business rules visible from the implementation, and C4-style views of context and containers. It is the answer to the question: "What is this system, and how does it work?"

This map goes into `docs/` — often as `docs/skeleton.md` initially — and becomes the starting context for every subsequent agent session. Before the team has written a single ADR or AGENTS.md entry, the agent can read the skeleton and reason about what already exists.

## How to generate one

Point a capability-class CLI agent at the legacy codebase and ask it to produce a structural skeleton — not a refactor, not a list of improvements, just a map of what is there. A useful prompt:

> "Produce a structural map of this codebase. Cover: the major modules and their responsibilities, how they depend on each other, the main data flows, and any business rules you can infer from the implementation. Note anything you cannot determine from the code alone."

Iterate the result with a domain expert. The agent will get the structure about 70–80% right. The remaining 20–30% — the business rules that exist only in institutional knowledge — requires a human who holds that knowledge. The skeleton is not done until a domain expert has reviewed it.

Commit the reviewed result. Update `docs/INDEX.md`. The skeleton is now part of the repo's context, not an artefact that lives only in a chat history.

Reversa (github.com/sandeco/reversa) is a five-phase framework that automates this end-to-end for complex legacy systems: it coordinates AI sub-agents to extract C4 diagrams, entity-relationship diagrams, state machines, and API contracts. It is one toolchain; the principle generalises to any capable CLI agent working against any codebase.

*Sources: Reversa — sandeco/reversa (GitHub, ongoing, MIT). Schwab, "AI as Your Legacy Code Archaeologist," Caimito blog (Feb 7, 2026). Fujitsu, "Generative AI service that analyzes source code and automatically generates design documents" (Mar 30, 2026) — industry-scale validation.*

## Lineage: the walking skeleton, reversed

Alistair Cockburn introduced the "walking skeleton" in *Crystal Clear* (2004) as a thin end-to-end implementation of a system — just enough to prove the architecture works, built forward from intent.

The AI-era `skeleton.md` reverses the direction. It is a map extracted backward from code that already exists. You are not building a skeleton to prove an architecture. You are uncovering the skeleton of an architecture that was built without one.

Same metaphor, opposite direction. The result has the same purpose: it makes the invisible structure visible so you can reason about it and build on it.

*Sources: Cockburn, *Crystal Clear: A Human-Powered Methodology for Small Teams* (Addison-Wesley, 2004) — origin of the "walking skeleton" pattern.*

## After the skeleton

Once `skeleton.md` exists and has been reviewed, the brownfield repo can proceed with the same practices as a greenfield repo — but with realistic constraints. AGENTS.md is written based on what the skeleton reveals, not from scratch. ADRs capture decisions that were made implicitly and are now being made explicit. Specs are written for new changes, not retrofitted to existing behaviour wholesale.

The skeleton does not eliminate the brownfield condition. It creates a foundation to build on. The system is still what it is. The agent now knows what it is.

## Honest caveats

A skeleton that goes unreviewed and unupdated becomes another form of cognitive debt. The map drifts from the territory. A skeleton written for a codebase as it was eighteen months ago — and never updated — misleads the agent more than no skeleton, because it provides confident-sounding wrong information.

Treat `skeleton.md` like any other living document: update it when the system changes significantly, flag sections that the domain expert flagged as uncertain, and mark it with a review date.
