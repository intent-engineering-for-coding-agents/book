# Cross-Team Coordination

A decision recorded where the other team's agents cannot read it is, to them, a decision that never happened. Team A changes the authentication service's token format and records it in an ADR marked Internal, in Team A's repo. Team B's agents have been parsing the old format out of the architecture docs for months, and they keep doing it, because Team A's decision log is not in their context. The breaking change reaches Team B the way these things usually do: as a production incident.

The ADR did its job for Team A. The mechanism that would have carried it to Team B did not exist.

Coordination across team boundaries is harder than coordination within a team, and the agentic layer makes it harder still. Multiple teams' agents are all reading their own architecture docs, their own AGENTS.md files, their own ADR logs. They share the runtime but not the context.

## ADRs as the cross-team mechanism

Architectural Decision Records are the cross-team coordination primitive that already exists in the SDLC. They are permanent, human-readable, typically checked into a repository, and designed to record decisions with consequences that persist after the authors have moved on.

For cross-team decisions, the ADR location matters. An ADR checked into Team A's repository is private to Team A's agents and Team A's developers who read the repo. An ADR checked into a shared architecture repository (one that all teams' agents are instructed to read) is cross-team.

The shared architecture repository pattern: a repository (or sub-directory in a monorepo) that contains ADRs for decisions affecting more than one team. Team A's agents are instructed (in `AGENTS.md`) to check the shared architecture repo before writing specs that cross service boundaries. Team B's agents do the same. The authentication token format change goes into the shared repo; both teams' agents read it.

This is not a new mechanism. It is the existing ADR practice applied at the organizational level rather than the team level. The only addition is the instruction to agents to read the shared repo as part of their pre-spec context loading.

*Sources: Michael Nygard, ["Documenting Architecture Decisions"](https://www.cognitect.com/blog/2011/11/15/documenting-architecture-decisions), Cognitect blog, Nov 15, 2011, ADRs as the durable, human-readable decision record.*

## Inner source for `.agents/` libraries

A team that has written useful skill files (a spec-quality checker, a test-strategy validator, a security-review skill) should not be the only team using them. Inner source applies: the `.agents/` directory, or selected skills within it, are contributed to a shared library that other teams can pull from.

The mechanics are the same as any inner source contribution: the team publishes the skill to a shared repository, documents its interface (what the skill expects, what it produces), and maintains it as they would a shared library. Other teams reference it from their `.agents/` directory by pulling or copying.

The pragmatic shortcut for smaller organizations: a single `shared-agents` repository with skills and instruction files that teams include in their `AGENTS.md` by reference. The team's local `AGENTS.md` loads the shared file first, then layers project-specific conventions on top. The shared file changes less often; the project-specific layer changes frequently.

Inner source for agent instructions is book synthesis. There is no widely-adopted standard for this pattern; the underlying practice borrows from how shared library dependencies work in a codebase.

## Multi-repo realities

Most teams work in multi-repo environments. The payment service is in one repository; the notification service is in another; the authentication service is in a third. Each has its own `openspec/`, its own `.agents/`, its own `AGENTS.md`. Coordination between them requires that the agents can navigate across this boundary.

Navigation happens through ADRs and through explicit cross-repo references in specs. A spec in the payment service that depends on a notification service API should reference the notification service's ADR for that API, not copy the API definition into the payment service spec. The reference is a pointer; the ADR is the canonical record. When the API changes, the ADR updates; the payment service spec reference remains valid.

MCP (Model Context Protocol) creates another path: agents that can fetch context from other repositories on demand, rather than reading only their local files. As of mid-2026, this is emerging practice. An agent working in the payment service can, in principle, call an MCP tool to fetch the current API contract from the notification service repository. The stability of this pattern depends on the MCP tooling available; the concept is sound.

Multi-repo coordination is harder at the agent level than at the code level. At the code level, shared libraries and package managers handle cross-repo dependencies. At the agent level, shared context is still largely manual: developers read the other team's architecture docs, then instruct their agent with what they found. This is a known gap.

## OpenSpec's acknowledged gap

OpenSpec is designed for single-repository work. The change folder model assumes one codebase, one spec directory, one PR. Multi-repo coordination (where a single feature requires coordinated change folders in two or three repositories) does not yet have a clean OpenSpec solution.

The current practice is: one change folder per repository, each referencing the same cross-cutting ADR. The coordination between the change folders is human: the developers from both teams agree on the ADR, then each creates their repository's change folder referencing it. The agent in each repository implements against its own spec; the integration is verified in an integration test environment shared by both teams.

This works, but it requires human coordination that the change folder model was designed to reduce. OpenSpec's roadmap includes better multi-repo support; as of mid-2026, teams building cross-repo features should plan for the manual coordination overhead.

*Sources: Fission AI, [OpenSpec](https://openspec.dev/) (ongoing), single-repository change-folder model and the roadmap's acknowledged multi-repo gap.*

## Governance without bureaucracy is still unsolved

The shared architecture repository pattern works when organizations have the governance to maintain it. A shared repo with twenty teams committing ADRs is also a shared repo that requires clear ownership, contribution guidelines, and a review process for incoming decisions. The same organizational discipline that makes internal ADRs useful (consistent format, active maintenance, genuine use by teams and agents) applies doubly to a shared architecture repository.

The alternative, where cross-team decisions are not written down, is the pattern that produced the production incident at the start of this chapter. The overhead of the shared repo is real; so is the cost of not having it.

The tooling for cross-team coordination is nascent. The community has patterns for individuals and small teams; the multi-repo, cross-team, governance-without-bureaucracy story is still being assembled.
