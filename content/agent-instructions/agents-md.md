# AGENTS.md: The Entry Point

An agent with no context reaches for the nearest thing it knows.

Suppose the agent is working on the auth module. The codebase has a custom token-validation library for the team's Single Sign-On (SSO) quirks, and the agent has no idea it exists. It reaches for `python-jwt`, writes its own claims validation, and opens a PR that bypasses checks the custom library already handled. The PR passes tests. A reviewer catches it only because they recognize the library and notice what got bypassed.

The agent did not invent the vulnerability. It improvised in the absence of a context it was never given.

`AGENTS.md` is that context: one file at the repo root, read natively by several coding agents or reached through a thin vendor-specific entry file. Get it right, and every agent arrives with the same context. Skip it, and every agent improvises from general training data that knows nothing about your SSO library.

## The TOC pattern

The instinct when writing `AGENTS.md` is to fill it. Project history, coding style, dependency guidance, testing rules. Dump everything the agent might need into one long file so it never misses a rule.

Weeks later, the file is hundreds of lines. The agent reads every line before starting any task because it cannot tell which section applies to today's task and which covers an edge case nobody has hit in months. By the time it reaches the task, a large slice of its context window is gone. The agent is not better informed, only more constrained.

AgentPatterns.ai named the better approach the table-of-contents (TOC) pattern. `AGENTS.md` is a table of contents, not an encyclopedia. It should fit in one context load. It should tell the agent which file to load next and under which condition. The agent loads the file matching the task, not every instruction file in the repo.

*Sources: [agents.md](https://agents.md/) (de-facto AI agent entry-point file, May 2026 snapshot), the AGENTS.md convention. AgentPatterns.ai, "AGENTS.md: Project-Level README for AI Coding Agents", the TOC pattern naming. GitHub Changelog, "Copilot coding agent now supports AGENTS.md custom instructions" (August 28, 2025), Copilot's native AGENTS.md support. Anthropic docs for `CLAUDE.md` support (ongoing), the `@AGENTS.md` import mechanism.*

## What goes in it

The TOC pattern implies three things, in this order:

- **Project identity:** what the repo is and what it produces, in one paragraph or a short facts block, not the README
- **Load-on-demand instructions:** links to `.agents/instructions/...` files, each with a clause saying when to load it
- **Commands and skills:** key commands and invocable skills, listed last as reference

The clause on each instruction link is where most teams cut corners. Without one, the agent opens the file only to find out whether it matters. With one, it reads the clause, sees the file is not relevant, and moves on without touching it:

```markdown
- [Build and CI](.agents/instructions/build-and-ci.md): uv commands, lint, test, CI pipeline
- [Coding standards](.agents/instructions/coding-standards.md): Python style, project structure, testing
- [OpenSpec workflow](.agents/instructions/openspec.md): Specs, AC IDs, test traceability
```

The test is simple: does the clause tell the agent *when* to load the file, or only *where* to find it? "Load when working on authentication" is an instruction. "See auth docs" is not. The first lets the agent decide without opening the file. The second sends it into the file to find out whether it matters.

## Tool-agnostic by design

Several major coding agents now read `AGENTS.md` natively. GitHub Copilot's coding agent added native support in August 2025. Claude Code still reads `CLAUDE.md` as its primary entry point, but that file is a single line:

```markdown
# CLAUDE.md
@AGENTS.md
```

Claude Code follows the import and loads the real context. Any edit to `AGENTS.md` propagates automatically.

The alternative is picking a vendor file as canonical. A repo whose source of truth is `CLAUDE.md` is implicitly Claude-first. Every other tool becomes a guest pointing at a file named after a competitor. `AGENTS.md` carries no vendor in the name, no vendor in the format, and no vendor in the spec. Adopting it with Claude Code costs one pointer file with one line. That is a small cost for a convention that belongs to no tool.

## Generated pointers, not authored duplicates

A pointer file maintained by hand drifts from `AGENTS.md` the moment one update is forgotten. The fix is not better discipline. The fix is generation: a short script that writes the pointer from `AGENTS.md` (Python, TypeScript, or whatever your repo already runs). One or two lines either way, committed as output. The developer edits `AGENTS.md`, runs the generator, and commits the result. The convention lives in the generator, not in anyone's memory.

Generated files go into the commit without ambiguity. They are clearly outputs, not sources. A developer who sees a generated file in a PR review knows not to edit it: edit the source, regenerate, commit the output.

As vendors add native support, the pointer pattern shrinks. GitHub Copilot's coding agent followed in August 2025. Today: `CLAUDE.md` with one line for Claude Code. `.github/copilot-instructions.md` with one sentence if your team uses Copilot Chat. Both committed, both generated, neither authored.

*Sources: [agents.md](https://agents.md/) (May 2026 snapshot), AGENTS.md as the canonical file vendor files point to. AgentPatterns.ai, "AGENTS.md: Project-Level README for AI Coding Agents", the one-canonical-source pattern. GitHub Changelog, "Copilot coding agent now supports AGENTS.md custom instructions" (August 28, 2025), Copilot's native AGENTS.md support that removes the need for a pointer file.*

## How it goes wrong

The TOC pattern has a failure mode: gradual accumulation. Branch naming conventions, deployment reminders, and clauses that grew from one sentence to four because the original was too vague. Months later, the file is hundreds of lines, and it started short.

The test is not the line count. Does anyone open the file and, in under two minutes, know what the project is, which instruction file to load for the current task, and what commands to run? If they have to scroll for the answer, the TOC has become its own content problem.

Size is the visible failure. Staleness is the silent one. `AGENTS.md` is the highest-impact instruction file in the repo. Every session loads it, so one stale load clause or stale repo rule affects every later task until someone fixes the file.

The agent follows outdated instructions more faithfully than no instructions, because it has no way to distinguish "this used to be true" from "this is still true". A link to an instruction file that was renamed silently breaks the load. A clause that says "load for auth tasks" pointing to a file that now covers payments and notifications produces a loading decision that is wrong in two directions.

Neither registers as an error. Both produce an agent confidently working from the wrong instructions.

Treat `AGENTS.md` changes as load-bearing. A stale ADR misleads one change. A stale `AGENTS.md` misleads every session. A small file is a file where staleness is visible.

`AGENTS.md` gets read every session. The files it points to get read only when their load clause fires. Staleness in `.agents/instructions/` is invisible until a session loads a file that no longer describes the repo. Keeping it accurate is necessary. It is not enough.

## Tooling

If you want to see this in practice, the [`iec` companion repo](https://github.com/intent-engineering-for-coding-agents/cli) has an `AGENTS.md` that fits on one screen: four instruction files with load clauses, the key commands, and a skill list. Run `iec check` with `agents-size` and `agents-links` enabled to catch files that have grown too long and links that no longer resolve. Neither rule catches stale content, but both catch structural failures before the agent does. The entry point is only the first layer. The next problem is the instruction hub it points into.

*Sources: [agents.md](https://agents.md/) (de-facto AI agent entry-point file, May 2026 snapshot), the AGENTS.md convention as entry point. AgentPatterns.ai, "AGENTS.md: Project-Level README for AI Coding Agents", the TOC pattern and size discipline. GitHub Changelog, "Copilot coding agent now supports AGENTS.md custom instructions" (August 28, 2025), Copilot's native AGENTS.md support. Böckeler, "Navigating AI Development Workflows," Refactoring.fm, reactive instruction authoring.*
