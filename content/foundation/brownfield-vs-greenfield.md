# Brownfield vs. Greenfield: Bootstrap with skeleton.md

The retry policy lives in a function called `do_it_again_lol`. The author left years ago, and nobody knows what it retries, how many times, or why the count is three. The system has survived three rewrites and two tech leads. The original architect was certain about several things, none of which are written down anywhere.

An agent dropped into this environment improvises. At agentic speed, that improvisation compounds existing drift.

The Foundation chapters work from intent, and so does greenfield development (a codebase built from scratch, with no prior decisions to inherit) with coding agents. Before the first commit, you plan the tech stack with the agent as a sparring partner, weigh tradeoffs, and record decisions as ADRs. Specs exist before implementations do. This is the structural advantage greenfield gives you: a complete history, built forward from the beginning.

Brownfield teams adopt most of these practices immediately, without a rewrite. Agent instructions get written this week. New decisions get ADRs from this point forward. A spec-driven workflow starts on the next ticket.

The historical record is not gone. Wikis, ticket systems, internal communications, old PRs: the reasoning behind decisions is scattered across sources nobody synthesized. Feed those to the agent and ask it to produce ADRs and design documents, updating stale documentation in the same pass. Before the Foundation practices work, the brownfield repo needs that record assembled.

One warning: incorrect or outdated documentation does not sit inertly in the repo. The agent treats provided context as authoritative. A Confluence page from three major versions ago, a Slack thread from a direction the team reversed: these need a domain expert to flag before they go in. The filter is not optional.

## skeleton.md is the bootstrap

`skeleton.md` is the name this book uses for an agent-generated structural map of an existing codebase. Not a refactor plan, not a list of improvements, not a roadmap. A map.

A useful skeleton contains what a capable agent infers from reading the code: the major modules and their responsibilities, the dependencies between them, the data flows, an outline of the business rules visible from the implementation, and C4-style views of context and containers. It is the answer to "what is this system, and how does it work?", written down for the first time, possibly ever.

This map goes into `docs/`, typically as `docs/skeleton.md` to mark it as bootstrap rather than current architecture, and becomes the starting context for every subsequent agent session. Before the team has written a single ADR or written agent instructions, the agent reads the skeleton and reasons about what already exists.

## Generating one

Point a capability-class coding agent at the legacy tree. Ask for a structural map, not a refactor. A starting prompt:

> Produce a structural map of this codebase. Cover the major modules and their responsibilities, how they depend on each other, the main data flows, and any business rules visible in the implementation. Note anything you cannot determine from the code alone.

This is a goal statement, not a one-shot script. The agent works through it by reading files, tracing imports, and following dependency declarations. On a large codebase, expect multiple passes across different modules before the structure becomes clear. Let it run.

The structural output tends to land well: modules, dependencies, data flows. Business rules are harder. Some rules read directly from the code: constraint checks, guard clauses, state machines inlined in service logic. Others exist only in institutional memory, and no amount of static analysis surfaces them. The "Note anything you cannot determine" clause is load-bearing. The skeleton is not done until a domain expert has reviewed it and corrected what the agent flagged as missing.

The same prompt accepts an output layout. Append the target `docs/` structure and the agent writes the files directly: `architecture.md` for the module map, `design/` for data flows and component views, `decisions/` for anything it reconstructs from the implementation. That structure also becomes the team's docs convention from the first commit.

*Sources: Schwab, "AI as Your Legacy Code Archaeologist," Caimito blog (Feb 7, 2026), agents successfully extracting structure from legacy codebases.*

## The walking skeleton reversed

Alistair Cockburn coined "walking skeleton" in "Crystal Clear" (2004). His version is a thin end-to-end implementation built forward from intent. Enough to prove the architecture works before you fill it in.

The agentic-era `skeleton.md` reverses the direction. You are not building a skeleton to prove an architecture, but uncovering the skeleton of an architecture built without one. Same metaphor, opposite direction. The result has the same purpose: it makes the invisible structure visible, so you reason about it and build on it.

*Sources: Cockburn, "Crystal Clear: A Human-Powered Methodology for Small Teams" (Addison-Wesley, 2004), origin of the walking-skeleton pattern.*

## After the skeleton

Once `skeleton.md` exists and has been reviewed, the brownfield repo proceeds with the same Foundation practices as a greenfield one, with realistic constraints. Agent instructions are written based on what the skeleton reveals, not from scratch. ADRs capture decisions that were made implicitly and are now being made explicit. Specs cover new changes, not retrofitted to existing behavior wholesale.

Some of those decisions are not new. They are old ones nobody wrote down, the kind the retry-policy author carried out the door on their last day. Point the agent at the function, the migration, the module boundary, and ask it to reconstruct the reasoning the code's shape implies. Write the result up as a historical ADR, dated honestly as a reconstruction: "Status: reconstructed, [date]" rather than "Accepted." It will not be the actual meeting. It is the documented best guess a domain expert can correct, and the documented best guess beats the silence that put the team here.

The skeleton does not eliminate the brownfield condition. The system is still what it is, but now the agent knows it too. That is the prerequisite for any of the practices in this book working at all.

## How the skeleton dies

A skeleton that goes unreviewed and unupdated becomes worse than no skeleton. When the map drifts from the territory, a skeleton written eighteen months ago for a system refactored three times since gives the agent confident-sounding wrong information. That is more dangerous than no information, because confident-sounding wrong information gets acted on.

Treat `skeleton.md` like a living document. Update it when the system changes meaningfully. Mark sections the domain expert flagged as uncertain. Add a Last reviewed date and revisit it on a schedule the team will actually keep.

*Sources: Schwab, "AI as Your Legacy Code Archaeologist," Caimito blog (Feb 7, 2026), the skeleton-as-archaeology framing.*

When ADRs and architecture documentation cover what the skeleton approximated, delete it. Most teams will never quite reach that point. The ones who do learn that structure is a prerequisite, not a guarantee.
