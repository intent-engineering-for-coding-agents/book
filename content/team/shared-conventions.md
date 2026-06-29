# Shared Agent Instruction Conventions

A convention constrains only the agents able to read it. On a solo project, that is one file and one agent. On a team, the same convention gets copied into as many instructions as there are developers, and those copies drift apart quietly.

One developer's `AGENTS.md` says: never write raw SQL, always use the ORM. A developer who joined later never saw the discussion where that was decided, and their own `AGENTS.md` says nothing about it. Their agent hits a performance problem and writes a raw query. The query is defensible in isolation. It is also out of step with every other data access path in the codebase, and the team burns a review cycle deciding whether to apply the rule retroactively or carve an exception.

The agent was not wrong. The convention was invisible to it.

The team-level fix is a shared instruction set every agent reads, regardless of who started the session.

## Team-level `AGENTS.md`

On a solo project, `AGENTS.md` is a personal instruction set. On a team, it is a shared instruction set: it documents conventions every developer and every agent should follow. The difference is ownership. Personal instruction sets drift, while the team instruction set needs an owner and a review process.

The practical structure: `AGENTS.md` at the repo root is the team's instruction set. It covers conventions that apply to every change: code style, test naming, security rules, dependency hygiene, data access patterns, and which sections of `docs/` to read for context. Individual developers do not maintain parallel `AGENTS.md` files that override the team instruction set.

Where teams get into trouble: the instruction set grows to cover every edge case a developer has explained to an agent. Six months in, it is eight hundred lines and the agent hits the context limit before reaching the security conventions. The [TOC pattern](../agent-instructions/agents-md) is the team-scale fix: keep `AGENTS.md` short, link to detail files in `.agents/instructions/`.

*Sources: [AGENTS.md](https://agents.md/) (ongoing), the AGENTS.md convention as a shared project instruction set. AgentPatterns.ai, ["AGENTS.md: Project-Level README for AI Coding Agents"](https://agentpatterns.ai/standards/agents-md/) (ongoing), keeping the instruction set short and linking out to detail files.*

## Shared `.agents/skills/` libraries

Skills worth writing once and sharing: generate a change folder from a template, run the credibility pass on a draft spec, check whether `tasks.md` is fully checked before pushing, validate that AC IDs are in the AC registry. These live in `.agents/skills/`, referenced from `AGENTS.md`, and committed to the repo.

Skills also travel across repos via an inner source: a shared `.agents/` repository teams pull from, or a directory within a shared infrastructure repo. The principle is the same as shared library dependencies: standardize what is common, extend for what is specific.

*Sources: AgentPatterns.ai, ["Evaluating AGENTS.md"](https://agentpatterns.ai/instructions/evaluating-agents-md-context-files/) (ongoing), evaluating agent context and instruction files for quality and drift.*

## Onboarding: the first agent session

The test of a team `AGENTS.md` is a new developer's first agent session. They clone the repo, start a capability-class agent, and ask it to implement a small task. The output should match the team's existing test style, data access pattern, and security conventions.

If the output is inconsistent, `AGENTS.md` has a gap. Fix the instruction set. Do not file the same failure under "welcome to the team" for every new developer to hit independently.

Onboarding is a forcing function for keeping the team instruction set current. Treating inconsistency as an onboarding task masks drift. Treating it as documentation debt surfaces it.

*Sources: AgentPatterns.ai, ["Evaluating AGENTS.md"](https://agentpatterns.ai/instructions/evaluating-agents-md-context-files/) (ongoing), evaluating agent context files for quality and drift. The first-session onboarding test is this book's team workflow heuristic.*

## When to standardize, when to leave divergent

Not every developer convention belongs in the team instruction set. Personal notes, exploratory model choice, and local branch names before the change folder exists stay local.

The test: if developer A and developer B follow a convention independently, and the outputs would be inconsistent in the same codebase, standardize it. If the convention affects only local workflow and does not show up in committed code, leave it divergent.

Data access patterns and security rules should be standardized. Architect mode for spec drafting, or whether to run the credibility pass skill manually or via a hook, stays divergent.

Over-standardizing is its own failure mode. A team `AGENTS.md` that specifies every workflow detail produces brittle agents and developers who stop making local judgment calls. The team instruction set should specify conventions that affect the codebase. Everything else is a personal setup.

Role-based personal instruction set are not divergence. A QA engineer's instructions might load extra test-coverage instructions, a security engineer's might run a threat-model pass, and a database specialist's might include query-plan analysis. These extend the team instruction set without contradicting it. A personal instruction set that adds depth is fine. One that overrides a team convention is a review problem waiting to happen.

Team conventions are organizational problems with technical artifacts. `AGENTS.md` records the agreement. It does not produce the agreement. A team that has never discussed data access conventions has to have the discussion first and record the outcome.

Shared conventions work within a team. Cross-team coordination needs a different mechanism, one already part of the SDLC and visible outside a single repo.

*Sources: [AGENTS.md](https://agents.md/) (ongoing), project-level instruction set as a repo convention. The standardize-versus-diverge test and agreement-before-instructions rule are this book's synthesis for team use.*


