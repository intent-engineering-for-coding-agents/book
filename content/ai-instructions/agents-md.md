# AGENTS.md: One File Changes Everything

An agent briefed on nothing reaches for what it knows. Usually that is fine. Once in a while it is a security hole.

Suppose the agent is working on the auth module. The codebase has a custom token-validation library the team wrote to handle their Single Sign-On (SSO) provider's quirks, and the agent has no idea it exists. So it reaches for `python-jwt`, writes its own claims validation, and opens a PR that bypasses three checks the custom library handled. The PR has tests. They pass. A reviewer catches it before merge, but only because they happened to work on that library two years earlier. Nobody else on the team would have known.

The agent did not invent the vulnerability. It improvised in the absence of a briefing it was never given.

`AGENTS.md` is that briefing. One file at the repo root. Several current coding agents read it natively or can be pointed to it with a thin vendor-specific entry file. Claude Code reads `CLAUDE.md`, which can import it with a single `@AGENTS.md` line. The team maintains one canonical file; each tool reaches it through its own entry point. Get it right and every agent arrives oriented. Skip it, and every agent improvises from general training data that knows nothing about your SSO library.

## The TOC pattern

The instinct when writing `AGENTS.md` is to fill it. Project history, coding style, dependency guidance, testing rules. Dump everything the agent might need into one long file so it never misses something important.

Six weeks later the file is 300 lines. The agent reads every line before starting any task, because it cannot tell which section applies today from which covers an edge case nobody has hit in months. By the time it reaches the task, a significant fraction of its context window is gone. The agent is not more briefed. It is more constrained.

AgentPatterns.ai named the better approach the **table-of-contents (TOC) pattern**. `AGENTS.md` is a table of contents, not an encyclopedia. Short enough to fit in a single context load, directive enough to orient the agent, precise enough to link to the specific instruction file relevant to the current task. The agent loads what it needs, not everything that might ever be needed.

*Sources: [agents.md](https://agents.md/) (de-facto AI agent entry-point file, May 2026 snapshot). AgentPatterns.ai, "AGENTS.md: Project-Level README for AI Coding Agents". GitHub Changelog, "Copilot coding agent now supports AGENTS.md custom instructions" (Aug 28, 2025). Anthropic docs for `CLAUDE.md` support (ongoing).*

## What goes in it

Three things belong in it, in this order.

- **Project identity**: what the repo is and what it produces, in one paragraph or a short facts block, not the README
- **Load-on-demand instructions**: links to `.agents/instructions/` files, each with a clause saying when to load it
- **Commands and skills**: key commands and invocable skills, listed last as reference rather than orientation

The clause on each instruction link is where most teams cut corners. Without one, the agent loads the file just to find out whether it matters. With one, it reads the clause, decides the file is not relevant to the current task, and moves on without touching it:

```
- [Build and CI](.agents/instructions/build-and-ci.md): uv commands, lint, test, CI pipeline
- [Coding standards](.agents/instructions/coding-standards.md): Python style, project structure, testing
- [OpenSpec workflow](.agents/instructions/openspec.md): Specs, AC IDs, test traceability
```

"Load when working on authentication" is an instruction. "See auth docs" is not. If the clause is there and accurate, the agent makes the right call without reading the file first.

## Tool-agnostic by design

The ecosystem has been converging on `AGENTS.md` faster than many teams expected. Codex read it early. GitHub Copilot's coding agent added native support in August 2025. Claude Code still reads `CLAUDE.md` as its primary entry point, but that file can be a single line:

```markdown
# CLAUDE.md
@AGENTS.md
```

Claude Code follows the import and loads the real briefing. Any edit to `AGENTS.md` propagates automatically.

The alternative is picking a vendor file as canonical. A repo whose source of truth is `CLAUDE.md` is implicitly Claude-first. Every other tool becomes a guest pointing at a file named after a competitor. `AGENTS.md` carries no vendor in the name, no vendor in the format, and no vendor in the spec. The cost of adopting it with Claude Code is one pointer file with one line. That is a small cost for a convention that belongs to no tool. How those pointer files are generated and kept thin without drifting is the subject of [Vendor Files That Point, Not Duplicate](./vendor-files).

## The size limit

The TOC pattern has a failure mode: gradual accumulation. Branch naming conventions. Deployment reminders. Clauses that grew from one sentence to four because the original was too vague. Six months later, the file is 200 lines, and it started as 20. It still says `AGENTS.md` at the top.

The test is not the line count. Can someone open the file and, in under two minutes, know what the project is, which instruction file to load for the current task, and what commands to run? If they have to scroll for the answer, the TOC has become its own content problem.

## Maintenance as the actual discipline

`AGENTS.md` is the highest-leverage file in the repo. Every session loads it, via the entry-point file that imports it. That also means every stale line compounds. The agent follows outdated instructions more faithfully than no instructions, because it has no way to distinguish "this was true in March" from "this is still true today".

A link to an instruction file that was renamed six months ago silently breaks the load. A clause that says "load for auth tasks" pointing to a file that now covers payments and notifications produces a loading decision that is wrong in two directions. Neither registers as an error; both produce an agent that is confidently working from the wrong brief.

Two mitigations. First, treat `AGENTS.md` changes as load-bearing. Review them with the same care as an ADR. A stale ADR misleads one decision; a stale `AGENTS.md` misleads every session. Second, keep the file short enough that a person can review it in full in under two minutes. A small file is a file where staleness is visible.

Keeping the entry point honest is the first discipline. What it points to requires the same treatment. The instruction files in `.agents/` accumulate stale content for the same reasons `AGENTS.md` does, and they do it without the visibility that comes from being the first file every session loads.

## Tooling

If you want to see this in practice, `ase-cli`'s `AGENTS.md` at `git tag v0.4.0` fits on one screen: five instruction files with load clauses, the key commands, and a skill list. Run `ase check` with `agents-size` and `agents-links` enabled to catch files that have grown too long and links that no longer resolve. Neither rule catches stale content, but both catch structural failures before the agent does.

*Sources: [agents.md](https://agents.md/) (de-facto AI agent entry-point file, May 2026 snapshot). AgentPatterns.ai, "AGENTS.md: Project-Level README for AI Coding Agents". GitHub Changelog, "Copilot coding agent now supports AGENTS.md custom instructions" (Aug 28, 2025). Böckeler, "Navigating AI Development Workflows," Refactoring.fm.*
