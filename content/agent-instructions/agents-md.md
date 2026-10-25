---
type: chapter
title: "AGENTS.md: The Entry Point"
---

# AGENTS.md: The Entry Point

An agent with no context reaches for the nearest thing it knows.

Suppose the agent is working on the auth module. The codebase has a custom token-validation library for the team's Single Sign-On (SSO) quirks, and the agent has no idea it exists. It reaches for `python-jwt`, writes its own claims validation, and opens a PR that bypasses checks the custom library already handled. The PR passes tests. A reviewer catches it only because they recognize the library and notice what got bypassed.

`AGENTS.md` gives supported agents a place to find the missing project rule. Put the token-validation library and the relevant security check there, then confirm the agent loaded the file. A file in the repo does not by itself prove the agent used it.

## The TOC pattern

The instinct when writing `AGENTS.md` is to fill it. Project history, coding style, dependency guidance, testing rules. Dump everything the agent might need into one long file so it never misses a rule.

Weeks later, the file is hundreds of lines. A session that loads the whole file spends context on sections unrelated to today's task. The agent still has to distinguish the current rule from an edge case nobody has hit in months.

AgentPatterns.ai named the table-of-contents (TOC) pattern. Keep `AGENTS.md` short enough to orient the session. Each link should say when a second file matters. Ask the agent to load the relevant file and confirm it did so before relying on the rule.

*Sources: [agents.md](https://agents.md/) (de-facto AI agent entry-point file, May 2026 snapshot), the AGENTS.md convention. AgentPatterns.ai, "AGENTS.md: Project-Level README for AI Coding Agents", the TOC pattern naming. GitHub Changelog, "Copilot coding agent now supports AGENTS.md custom instructions" (August 28, 2025), Copilot's native AGENTS.md support.*

## What goes in it

The TOC pattern implies three things, in this order:

- **Project identity:** what the repo is and what it produces, in one paragraph or a short facts block, not the README
- **Load-on-demand instructions:** links to `.agents/instructions/...` files, each with a clause saying when to load it
- **Commands and skills:** key commands and invocable skills, listed last as reference

The clause on each instruction link explains when the file matters. Without one, the agent has to open the file to find out whether it applies:

```markdown
- [Build and CI](.agents/instructions/build-and-ci.md): uv commands, lint, test, CI pipeline
- [Coding standards](.agents/instructions/coding-standards.md): Python style, project structure, testing
- [OpenSpec workflow](.agents/instructions/openspec.md): Specs, AC IDs, test traceability
```

The test is simple: does the clause tell the agent *when* to load the file, or only *where* to find it? "Load when working on authentication" is an instruction. "See auth docs" is not. The first lets the agent decide without opening the file. The second sends it into the file to find out whether it matters.

## Tool-agnostic by design

Keep the shared project rules in `AGENTS.md`. Check how your agent loads this file before adding a vendor-specific entry file.

For a setup which loads `CLAUDE.md`, Anthropic documents this import:

```markdown
@AGENTS.md
```

Put the pointer beside `AGENTS.md`. The import reads the shared file, so editing a project rule does not require regenerating the pointer. Confirm the intended file loaded when starting a session.

*Sources: Anthropic, ["How Claude remembers your project"](https://code.claude.com/docs/en/memory) (reviewed October 22, 2026), importing `AGENTS.md` from `CLAUDE.md` and checking loaded instructions. Keeping the shared rules in one file is this book's convention.*

## How it goes wrong

The TOC pattern has a failure mode: gradual accumulation. Branch naming conventions, deployment reminders, and clauses that grew from one sentence to four because the original was too vague. Months later, the file is hundreds of lines, and it started short.

The test is not the line count. Does anyone open the file and, in under two minutes, know what the project is, which instruction file to load for the current task, and what commands to run? If they have to scroll for the answer, the TOC has become its own content problem.

Size is the visible failure. Staleness is the silent one. A stale entry-point rule reaches each session that loads the file, while a stale ADR affects work that depends on the decision. Check both the links and the rules when the underlying workflow changes.

An outdated instruction presents the old rule as current. A link to an instruction file that was renamed breaks the load unless the agent notices the missing path. A clause that says "load for auth tasks" pointing to a file that now covers payments and notifications sends the reader to the wrong place.

An instruction file may sit unread until a relevant task calls for it, so staleness in `.agents/instructions/` can stay invisible for a while. Keeping the hub itself accurate does not catch that kind of drift.

## Automated checks

A line limit and a check for undescribed links are cheap to automate. Neither resolves the linked paths or catches stale instructions, so check those separately. The entry point is only the first layer. The next problem is the instruction hub it points into.

*Sources: The link and staleness review is this book's guidance.*
