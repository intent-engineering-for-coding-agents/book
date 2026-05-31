# Why Important Stuff First?

Where a constraint sits in a spec decides whether the agent honours it. Bury the performance requirement near the bottom, after the happy-path scenarios, and watch what happens. The agent reads top to bottom, commits to an architecture by the third scenario, and reaches the requirement with the design already poured. Meeting it would have meant a different approach. The agent keeps the one it has, because going back means undoing everything built since scenario three.

## Agents read top-down

An agent does not read a spec the way an engineer reads a spec. An engineer jumps to the constraints first to check whether the approach is even feasible. An agent reads sequentially, builds a mental model as it goes, and makes decisions as it reads.

This is not a flaw. It is how autoregressive generation works. Each token is produced in the context of all previous tokens. Early decisions are load-bearing for everything that follows. A design assumption made at line twenty is not revisited at line eighty. By line eighty, it is scaffolding.

The implication is direct: put the load-bearing information at the top. Constraints. Non-goals. The scope boundary. The one thing that, if misunderstood, corrupts the entire implementation. Not as a courtesy to the agent. Because if those constraints are not established before the agent begins designing, they may not be established at all.

*Sources: AgentPatterns.ai, "AGENTS.md: Project-Level README for AI Coding Agents", front-loading the constraints in agent-facing files. Anthropic, "Building effective agents" (Dec 2024), the agent's sequential, context-dependent reading that makes early information load-bearing.*

## The first-fifty-lines test

A useful discipline: read the first fifty lines of the spec and ask whether those lines contain the essential constraints. If the answer is no, reorder.

Essential constraints are not the same as the happy path. The happy path is what the feature does when everything works. Constraints are the limits: what the feature must not do, what it is not responsible for, what it should do when things go wrong, what performance it must hit.

Most specs written by humans in document-thinking mode bury the constraints. The introduction comes first. Then the motivation. Then the happy-path scenarios. Then the edge cases. Then the non-goals. Then the constraints. This ordering is friendly to a human reader who wants the narrative arc before the technical details. It is hostile to an agent that will make design decisions at line twenty.

The inversion is uncomfortable for a first draft. Write the narrative first, then move the constraints to the top. The spec reads slightly less like a story and slightly more like an API contract. That is the correct tradeoff.

## What goes at the top

The first section of a spec should answer three questions: What is this change not responsible for? What constraints does the implementation have to respect? What failure would be most expensive to discover late?

Non-goals are particularly valuable at the top. They close off the most common improvisation paths. The agent that encounters "this feature does not handle multi-tenancy" at line three will not wire multi-tenancy support at line sixty. The agent that encounters this note at line eighty will have already decided, based on the codebase patterns it has read, whether to add it.

The expensive failure is whichever requirement, if missed, requires the most rework. Security constraints. Performance bounds. Compliance requirements. These belong before the happy path, not after. The agent should encounter them before it has any design momentum, not when it is already committed.

## Why this inverts normal doc structure

Technical documentation conventions put prerequisites, motivation, and context before constraints. Appendices hold assumptions. The main body covers normal flow. Edge cases come at the end.

This ordering serves readers who browse before they implement. It serves an agent poorly.

The same pressure applies to `AGENTS.md`, `docs/README.md`, every file the agent loads at the start of a session. The pattern is not unique to specs. It is a general principle of writing for an agent: the most important constraint is the one the agent reads before it begins. Everything it reads after that is context for a design it is already building.

Specs that follow this principle consistently produce implementations that need fewer correction cycles. The agent implements what the spec intends rather than what the spec implies. Getting that right at the start costs a ten-minute reorder. Discovering it mid-implementation costs a diff that argues with itself.

The question of how formal the spec needs to be, and which tools support which level of formality, is the one this chapter does not answer.
