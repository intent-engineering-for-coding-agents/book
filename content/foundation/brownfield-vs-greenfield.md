# Brownfield vs Greenfield: Bootstrap with skeleton.md

Consider a retry policy buried in a function called `do_it_again_lol`. The author left years ago, and nobody knows what it retries or why it retries at all. The system went through several rewrites and handoffs. The original architect was certain about several things, none of which are written down anywhere.

An agent dropped into this environment improvises. At agentic speed, that improvisation compounds existing drift.

The Foundation chapters work from intent, and so does greenfield development with coding agents: a codebase built from scratch, with no prior decisions to inherit. Before the first commit, you plan the tech stack with the agent as a sparring partner, weigh tradeoffs, and record decisions as ADRs. Specs exist before implementations do. This is the structural advantage greenfield gives you: a complete history, built forward from the beginning.

Brownfield teams adopt most of these practices immediately, without a rewrite. Agent instructions get written this week. New decisions get ADRs from this point forward. A spec-driven workflow starts on the next ticket.

The historical record is not gone. Wikis, ticket systems, internal communications, old PRs: the reasoning behind decisions is scattered across sources nobody synthesized. Feed those to the agent and ask it to produce ADRs and design documents, updating stale documentation in the same pass. Before the Foundation practices work, the brownfield repo needs that record assembled.

One warning: incorrect or outdated documentation does not sit inertly in the repo. The agent treats the provided context as authoritative. A Confluence page from three major versions ago, a Slack thread from a direction the team reversed: these need a domain expert to flag before they go in. The filter is not optional.

Do not write the first brownfield change proposal from a cold repo read. Harvest the existing decisions, constraints, design intent, and visible business rules first, then write the proposal against that recovered context.

## skeleton.md is the bootstrap

`skeleton.md` is the name this book uses for an agent-generated structural map of an existing codebase. Not a refactor plan, not a list of improvements, not a roadmap. A map.

A useful skeleton contains what a capable agent infers from reading the code: the major modules and their responsibilities, the dependencies between them, the data flows, an outline of the business rules visible from the implementation, and C4-style views of context and containers. It is the answer to "what is this system, and how does it work?", written down for the first time, possibly ever.

This map goes into `docs/`. This book uses `docs/skeleton.md` to mark it as bootstrap rather than current architecture. The skeleton is the first pass, not the resting place. Structure moves into `docs/architecture/`. Data flows and component behavior move into `docs/design/`. Recovered decisions and long-lived constraints move into `docs/decisions/` as historical ADRs. Before the team has written a single ADR or any agent instructions, the agent reads the skeleton and reasons about what already exists.

## Generating one

Point a capability-class coding agent at the legacy tree. Ask for a structural map and recovered constraints, not a refactor. A starting prompt:

> Produce a structural map of this codebase. Cover the major modules and their responsibilities, how they depend on each other, the main data flows, the business rules visible in the implementation, and the design constraints or architectural decisions the code's shape implies. Note anything you cannot determine from the code alone.

This is a goal statement, not a one-shot script. The agent works through it by reading files, tracing imports, and following dependency declarations. On a large codebase, expect multiple passes across different modules before the structure becomes clear. Let it run.

The structural output tends to land well: modules, dependencies, data flows. Business rules, historical decisions, and operating constraints are harder. Some rules read directly from the code: constraint checks, guard clauses, state machines inlined in service logic. Some design decisions show up indirectly in module boundaries, dependency choices, and defensive code paths. Others exist only in institutional memory, and no amount of static analysis surfaces them. The "Note anything you cannot determine" clause is load-bearing. The skeleton is not done until a domain expert has reviewed it and corrected what the agent flagged as missing.

That review gates the first change proposal. A brownfield proposal written before this pass is guesswork with better formatting.

The same prompt accepts an output layout. Append the target `docs/` structure and the agent writes the files directly: `architecture.md` for the module map, `design/` for data flows and component views, `decisions/` for anything it reconstructs from the implementation. That structure also becomes the team's docs convention from the first commit.

Do not leave the harvest trapped in `skeleton.md`. Move stable findings into the permanent docs set before the first proposal: architecture in `docs/architecture/`, durable design constraints in `docs/design/`, and reconstructed decisions in `docs/decisions/`. `skeleton.md` gets the repo through bootstrap. Later work should read the permanent docs, not keep circling back to the excavation notes.

*Sources: Schwab, "AI as Your Legacy Code Archaeologist," Caimito blog (February 7, 2026), agents extracting structure and business rules from legacy code.*

## The walking skeleton reversed

Alistair Cockburn coined "walking skeleton" in "Crystal Clear" (2004). His version is a thin end-to-end implementation built forward from intent. Enough to prove the architecture works before you fill it in.

The agentic-era `skeleton.md` reverses the direction. You are not building a skeleton to prove an architecture, but uncovering the skeleton of an architecture built without one. Same metaphor, opposite direction. The result has the same purpose: it makes the invisible structure visible, so you reason about it and build on it.

*Sources: Cockburn, "Crystal Clear: A Human-Powered Methodology for Small Teams" (Addison-Wesley, 2004), origin of the walking-skeleton pattern.*

## After the skeleton

Once `skeleton.md` exists, has been reviewed, and has been distilled into the permanent `docs/` set, the brownfield repo proceeds with the same Foundation practices as a greenfield one, with realistic constraints. Agent instructions are written based on what the skeleton and the recovered docs reveal, not from scratch. ADRs capture decisions that were made implicitly and are now being made explicit. Specs cover new changes, not retrofitted to existing behavior wholesale.

Some of those decisions are not new. They are old ones nobody wrote down, the kind the retry-policy author carried out the door on their last day. Point the agent at the function or the module boundary and ask it to reconstruct the reasoning the code's shape implies. Write the result up as a historical ADR, dated honestly as a reconstruction: "Status: reconstructed, [date]" rather than "Accepted." It will not reproduce the actual meeting. A domain expert corrects it, and the documented best guess beats the silence that put the team here.

The skeleton does not eliminate the brownfield condition. The system still carries the same old dependencies, missing decisions, and undocumented constraints. The difference is that the repo now has files for those findings under `docs/`, so later specs and instructions can reference them instead of forcing every session to rediscover them from code.

## skeleton.md has a lifecycle

A skeleton that goes unreviewed and unupdated becomes worse than no skeleton. A `docs/skeleton.md` written before a module split or database migration still names the old boundaries, so the agent follows relationships that no longer exist. That failure mode is worse than missing documentation because the repo now contains a file that looks authoritative and is false.

This book's rule is straightforward. `skeleton.md` starts the bootstrap. Then the stable findings move into permanent `docs/`. After that, the skeleton either stays as marked history or leaves the active docs set. Once `docs/architecture/`, `docs/design/`, and `docs/decisions/` cover the same ground, new proposals and new agent sessions should stop loading `docs/skeleton.md` as the place to learn the system.

Treat `skeleton.md` like a living bootstrap document while the recovery is in progress. Update it when the system changes meaningfully. Mark sections the domain expert flagged as uncertain. Add a Last reviewed date and revisit it on a schedule the team will keep.

Once ADRs, architecture docs, and design docs cover what the skeleton approximated, change its status. Remove it, archive it, or mark it plainly as historical bootstrap context that agents should ignore when reading the current design. The filename matters less than the distinction. An agent should not open `docs/skeleton.md` and `docs/architecture/overview.md` and read both as live instructions for the same system.

*Sources: Schwab, "AI as Your Legacy Code Archaeologist," Caimito blog (February 7, 2026), the skeleton-as-archaeology framing.*
