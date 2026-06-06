# Shared Agent Instruction Conventions

A convention only constrains the agents that can read it. On a solo project that is one file and one agent. On a team it is as many briefs as there are developers, and they drift apart quietly.

One developer's `AGENTS.md` says: never write raw SQL, always use the ORM. A developer who joined later never saw the discussion where that was decided, and their own `AGENTS.md` says nothing about it. Their agent hits a performance problem and writes a raw query. It is the right call for that one query. It is also out of step with every other data access in the codebase, and the team burns a review cycle deciding whether to apply the rule retroactively or carve an exception.

The agent was not wrong. The convention was just not visible to it.

Shared agent instruction conventions are the team-level answer to this problem: conventions that every agent in every session reads, regardless of who started the session or which developer they are working with.

## Team-level `AGENTS.md`

On a solo project, `AGENTS.md` is a personal brief. On a team, it is a shared brief: it documents conventions that every developer and every agent should operate under. The difference is ownership. Personal briefs can drift. Team briefs need an owner and a review process.

The practical structure: `AGENTS.md` at the repo root is the team's brief. It covers the conventions that apply to every change: code style, test naming, security rules, dependency hygiene, data access patterns, and which sections of `docs/` to read for context. Individual developers do not maintain their own parallel `AGENTS.md` files that override parts of the team brief. The team brief is the brief.

Where teams get into trouble: the team brief grows to cover every edge case any developer has ever had to explain to an agent. Six months in, it is eight hundred lines and the agent hits the context limit before reaching the security conventions at the bottom. The [TOC pattern](../agent-instructions/agents-md) is the fix at team scale exactly as it is for a solo brief: keep `AGENTS.md` short, link to detail files in `.agents/instructions/`.

*Sources: [AGENTS.md](https://agents.md/) (ongoing), the AGENTS.md convention as a shared project brief. AgentPatterns.ai, ["AGENTS.md: Project-Level README for AI Coding Agents"](https://agentpatterns.ai/standards/agents-md/) (ongoing), keeping the brief short and linking out to detail files.*

## Shared `.agents/skills/` libraries

Skills worth writing once and sharing: generate a change folder from a template, run the credibility pass on a draft spec, check whether `tasks.md` is fully checked before pushing, validate that AC IDs are in the AC registry. These live in `.agents/skills/` and are referenced from `AGENTS.md`. On a team, the skills are committed to the repo and are available to every agent.

Skills can also be shared across repos via inner source: a shared `.agents/` repository that teams pull from, or a directory within a shared infrastructure repo. The shared skills define the team's common procedures. Individual repos extend them with project-specific additions. The principle is the same as shared library dependencies: standardize what is common, extend for what is specific.

*Sources: AgentPatterns.ai, ["Evaluating AGENTS.md"](https://agentpatterns.ai/instructions/evaluating-agents-md-context-files/) (ongoing), evaluating agent context and instruction files for quality and drift.*

## Onboarding: the first agent session

The test of a team `AGENTS.md` is a new developer's first agent session. They clone the repo, start a capability-class agent, and ask it to implement a small task. The agent reads `AGENTS.md`, loads the referenced instruction files, and produces output consistent with the team's existing code.

If the output is inconsistent (wrong test style, wrong data access pattern, missing security convention), the `AGENTS.md` has a gap. The gap should be filled by someone who noticed it, not filed as a "welcome to the team" problem for every new developer to hit independently.

Onboarding is a forcing function for keeping the team brief current. Every new developer who hits an inconsistency between `AGENTS.md` and actual team practice is identifying a drift. Treating it as an onboarding task masks the drift. Treating it as a documentation debt surfaces it.

## When to standardize, when to leave divergent

Not every developer convention needs to be in the team brief. Some conventions are personal preference with no team impact: how the developer structures their own notes, which model they use for exploratory work, how they name their local branches before the change folder is created.

The test: if developer A and developer B both follow a convention independently, and the outputs would be inconsistent in the same codebase, standardize it. If the outputs would be independent (the convention affects only each developer's local workflow and does not show up in committed code), leave it divergent.

Data access patterns: standardize. Security rules: standardize. Whether to use the architect mode for spec drafting: leave divergent. Whether to run the credibility pass skill manually or via a hook: leave divergent.

Over-standardizing is its own failure mode. A team `AGENTS.md` that specifies every workflow detail produces agents that are inflexible and developers who feel they cannot make local judgment calls. The team brief should specify conventions that affect the codebase. Everything else is personal setup.

Role-based personal briefs are not divergence. A QA engineer's personal `AGENTS.md` might load extra test-coverage instructions. A security engineer's might always run a threat-model pass. A database specialist's might include query-plan analysis steps. These extend the team brief for the developer's domain without contradicting it. The distinction is direction: a personal brief that adds depth is fine; one that overrides a team convention is a problem waiting to surface in review.

## Conventions are organizational, not technical

Team conventions are organizational problems with technical artifacts. The `AGENTS.md` records what was agreed. It does not produce the agreement. A team that has never discussed data access conventions cannot resolve the problem by writing a convention file. They have to have the discussion first and record the outcome.

Convention drift on a team is slower than on a solo project and harder to detect. A solo developer feels the immediate pain when their own `AGENTS.md` is stale. A team member may not notice that the brief is out of date until a new developer's agent produces something unexpected. Regular reviews of the team brief (quarterly, or after major architecture changes) are maintenance, not overhead.

Shared conventions work within a team. Cross-team coordination needs a different mechanism, one that is already part of the SDLC and does not require a shared repo.
