---
type: chapter
title: "Brownfield vs Greenfield: Bootstrap with skeleton.md"
---

# Brownfield vs Greenfield: Bootstrap with skeleton.md

Consider a retry policy buried in a function called `do_it_again_lol`. The code shows what it retries, but the reason for the limit is missing from the docs. A new change has to decide whether that limit was deliberate or incidental.

An agent dropped into this environment improvises. At agentic speed, that improvisation compounds existing drift.

The Foundation chapters work from intent, and greenfield development gives a team a chance to record decisions before the first implementation. Plan the tech stack, weigh tradeoffs, and write the decisions the agent will need. Starting from scratch does not make the record complete by itself.

Brownfield teams adopt most of these practices immediately, without a rewrite. Agent instructions get written this week. New decisions get ADRs from this point forward. A spec-driven workflow starts on the next ticket.

The historical record is not gone. Wikis, ticket systems, internal communications, old PRs: the reasoning behind decisions is scattered across sources nobody synthesized. Feed those to the agent and ask it to produce ADRs and design documents, updating stale documentation in the same pass. Before the Foundation practices work, the brownfield codebase needs that record assembled.

One warning: a supplied document can steer the agent even when the document is obsolete. A Confluence page from an earlier release or a Slack thread about a reversed decision needs a domain expert to check it before it becomes project guidance.

Do not write the first brownfield change proposal from a cold codebase read. Harvest the existing decisions, constraints, design intent, and visible business rules first, then write the proposal against that recovered context.

## skeleton.md is the bootstrap

`skeleton.md` is the name this book uses for an agent-generated structural map of an existing codebase. Not a refactor plan, not a list of improvements, not a roadmap. A map.

A useful skeleton contains what a capable agent infers from reading the code: the major modules and their responsibilities, the dependencies between them, the data flows, an outline of the business rules visible from the implementation, and C4-style views of context and containers. It is the answer to "what is this system, and how does it work?", written down for the first time, possibly ever.

This map goes into `docs/`. This book uses `docs/skeleton.md` to mark it as bootstrap rather than current architecture. The skeleton is the first pass, not the resting place: structure eventually moves into `docs/architecture/`, data flows and component behavior into `docs/design/`, and recovered decisions and long-lived constraints into `docs/decisions/` as historical ADRs. Before the team has written a single ADR or any agent instructions, the agent reads the skeleton and reasons about what already exists.

## Generating one

Point a capability-class coding agent at the legacy tree. Ask for a structural map and recovered constraints, not a refactor. A starting prompt:

> Produce a structural map of this codebase. Cover the major modules and their responsibilities, how they depend on each other, the main data flows, the business rules visible in the implementation, and the design constraints or architectural decisions the code's shape implies. Note anything you cannot determine from the code alone.

This is a goal statement, not a one-shot script. The agent works through it by reading files, tracing imports, and following dependency declarations. On a large codebase, expect multiple passes across different modules before the structure becomes clear. Let it run.

Check the structural output against the repository: modules, dependencies, and data flows can be traced. Historical decisions and operating constraints need other evidence. A guard clause shows what the code does, not why the team chose it. The "Note anything you cannot determine" clause matters because a domain expert must review the inferred rules before the skeleton guides a change.

That review gates the first change proposal. A brownfield proposal written before this pass is guesswork with better formatting.

The same prompt accepts an output layout. Append the target `docs/` structure and the agent writes the files directly: `architecture.md` for the module map, `design/` for data flows and component views, `decisions/` for anything it reconstructs from the implementation. That structure also becomes the team's docs convention from the first commit.

*Sources: Schwab, "AI as Your Legacy Code Archaeologist," Caimito blog (February 7, 2026), agents extracting structure and business rules from legacy code.*

## The walking skeleton reversed

Alistair Cockburn coined "walking skeleton" in "Crystal Clear" (2004). His version is a thin end-to-end implementation built forward from intent. Enough to verify the architecture works before you fill it in.

The agentic-era `skeleton.md` works backward from an implementation already in production. Instead of testing a proposed architecture, it exposes the structure the codebase accumulated. Once the modules, dependencies, and constraints are visible, the team has something concrete to correct and build on.

*Sources: Cockburn, "Crystal Clear: A Human-Powered Methodology for Small Teams" (Addison-Wesley, 2004), origin of the walking-skeleton pattern.*

## After the skeleton

Once `skeleton.md` exists, has been reviewed, and has been distilled into the permanent `docs/` set, the brownfield codebase proceeds with the same Foundation practices as a greenfield one, with realistic constraints. Agent instructions get written from what the skeleton and the recovered docs reveal, not from scratch. ADRs capture decisions that were made implicitly and are only now being made explicit. And specs stay scoped to new changes, not retrofitted to existing behavior wholesale.

Some of those decisions are not new. They are old ones nobody wrote down, the kind the retry-policy author carried out the door on their last day. Point the agent at the function or the module boundary and ask it to reconstruct the reasoning the code's shape implies. Keep the draft ADR at `status: proposed`, and state in its context when the reconstruction was made and which evidence supports it. A domain expert checks the inference before the team accepts the record. The draft will not reproduce the original meeting.

*Sources: Companion CLI `adr_format.py` at revision `2491a62`, accepted status values. Treating a recovered decision as a proposed, dated reconstruction is this book's workflow guidance.*

The skeleton does not eliminate the brownfield condition. The system still carries the same old dependencies, missing decisions, and undocumented constraints. The difference is that the codebase now has files for those findings under `docs/`, so later specs and instructions can reference them instead of forcing every session to rediscover them from code.

## skeleton.md has a lifecycle

A skeleton that goes unreviewed and unupdated turns hostile. A `docs/skeleton.md` written before a module split or database migration still names the old boundaries, so the agent follows relationships that no longer exist, guided by a file that looks authoritative and is false.

Treat `skeleton.md` like a living bootstrap document while the recovery is in progress. Update it when the system changes meaningfully. Mark sections the domain expert flagged as uncertain. Add a Last reviewed date and revisit it on a schedule the team will keep.

Once ADRs, architecture docs, and design docs cover what the skeleton approximated, change its status. Remove it, archive it, or mark it plainly as historical bootstrap context that agents should ignore when reading the current design. The filename matters less than the distinction. An agent should not open `docs/skeleton.md` and `docs/architecture/overview.md` and read both as live instructions for the same system. [When Intent Engineering Fails](./when-intent-engineering-fails) follows the stale-document problem beyond the bootstrap.

*Sources: Schwab, "AI as Your Legacy Code Archaeologist," Caimito blog (February 7, 2026), the skeleton-as-archaeology framing.*
