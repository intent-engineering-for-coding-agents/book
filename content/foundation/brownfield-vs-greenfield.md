# Brownfield vs Greenfield: Bootstrap with skeleton.md

The retry policy lives in a function called `do_it_again_lol`. The author left years ago. Nobody knows what it retries, how many times, or why the count is three. The system has survived three rewrites and two tech leads. The original architect was certain about several things, none of which are written down anywhere.

An agent dropped into this environment improvises. At agentic speed, that improvisation compounds existing drift faster than human-pace work ever did.

The Foundation chapters in this topic work from intent. You know what the system is supposed to do, so you write `AGENTS.md` from that knowledge, author Architectural Decision Records (ADRs) as decisions are made, write specs from requirements. If you are reading this book at work, you are looking at a codebase where none of that is possible. The intent is buried. Before any of those practices apply, the brownfield repo needs a different starting move.

## skeleton.md is the bootstrap

`skeleton.md` is the name this book uses for an agent-generated structural map of an existing codebase. Not a refactor plan. Not a list of improvements. Not a roadmap. A map.

A useful skeleton contains what a capable agent infers from reading the code: the major modules and their responsibilities, the dependencies between them, the data flows, an outline of the business rules visible from the implementation, and C4-style views of context and containers. It is the answer to "what is this system, and how does it work?", written down for the first time, possibly ever.

This map goes into `docs/`, typically as `docs/skeleton.md` to mark it as bootstrap rather than current architecture, and becomes the starting context for every subsequent agent session. Before the team has written a single ADR or filled out an `AGENTS.md`, the agent reads the skeleton and reasons about what already exists.

## Generating one

Point a capability-class CLI agent at the legacy tree. Ask for a structural map, not a refactor. A useful prompt:

> Produce a structural map of this codebase. Cover the major modules and their responsibilities, how they depend on each other, the main data flows, and any business rules you can infer from the implementation. Note anything you cannot determine from the code alone.

On a first pass, the agent will often get the structure mostly right. The remaining slice is business rules that exist only in institutional memory, and that requires a human who holds that memory. The skeleton is not done until a domain expert has reviewed it and corrected what the agent could not see.

Commit the reviewed result. Update `docs/INDEX.md`. The skeleton is now part of the repo's context. It is not an artefact in a chat history that disappears the moment the session closes.

Reversa (sandeco/reversa, MIT) automates this end-to-end for complex legacy systems. It is a five-phase framework that coordinates sub-agents to extract C4 diagrams, entity-relationship diagrams, state machines, and API contracts, running inside current coding-agent toolchains such as Claude Code, Cursor, or Codex. Reversa is one toolchain. The principle generalises: a capable agent produces a useful skeleton against many codebases, given a domain expert and a few iterations.

Sources: Reversa, sandeco/reversa (GitHub, ongoing, MIT). Schwab, "AI as Your Legacy Code Archaeologist," Caimito blog (Feb 7, 2026). Fujitsu, "Generative AI service that analyzes source code and automatically generates design documents" (Mar 30, 2026), industry-scale validation of the same pattern.

## The walking skeleton, reversed

Alistair Cockburn coined "walking skeleton" in "Crystal Clear" (2004). His version is a thin end-to-end implementation built forward from intent. Enough to prove the architecture works before you fill it in.

The agentic-era `skeleton.md` reverses the direction. You are not building a skeleton to prove an architecture. You are uncovering the skeleton of an architecture built without one. Same metaphor, opposite direction. The result has the same purpose: it makes the invisible structure visible so you reason about it and build on it.

Sources: Cockburn, "Crystal Clear: A Human-Powered Methodology for Small Teams" (Addison-Wesley, 2004), origin of the walking-skeleton pattern.

## After the skeleton

Once `skeleton.md` exists and has been reviewed, the brownfield repo proceeds with the same Foundation practices as a greenfield one, with realistic constraints. `AGENTS.md` is written based on what the skeleton reveals, not from scratch. ADRs capture decisions that were made implicitly and are now being made explicit. Specs cover new changes, not retrofitted to existing behaviour wholesale.

The skeleton does not eliminate the brownfield condition. The system is still what it is. What changes is that the agent now knows what it is. That is the prerequisite for any of the practices in this book working at all.

## How the skeleton dies

A skeleton that goes unreviewed and unupdated becomes worse than no skeleton. The map drifts from the territory. A skeleton written eighteen months ago for a system refactored three times since gives the agent confident-sounding wrong information. That is more dangerous than no information, because confident-sounding wrong information gets acted on.

Treat `skeleton.md` like a living document. Update it when the system changes meaningfully. Mark sections the domain expert flagged as uncertain. Add a Last reviewed date and revisit it on a schedule the team will actually keep.

Sources: Reversa, sandeco/reversa (GitHub, ongoing, MIT), automated skeleton generation for complex legacy systems. Schwab, "AI as Your Legacy Code Archaeologist," Caimito blog (Feb 7, 2026), the skeleton-as-archaeology framing. Fujitsu, "Generative AI service that analyzes source code and automatically generates design documents" (Mar 30, 2026), industry-scale validation. Cockburn, "Crystal Clear" (2004), the walking-skeleton pattern this reverses.

The skeleton's job ends when ADRs and `docs/README.md` cover what it covered. At that point it can be archived. Most teams will never quite reach that point.
