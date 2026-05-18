# AGENTS.md — One File Changes Everything

The agent was working on the auth module. The codebase used a custom token validation library the team had written to handle their Single Sign-On (SSO) provider's quirks. The agent didn't know it existed. It reached for `python-jwt`, implemented its own claims validation, and opened a PR that bypassed three security checks the custom library handled. The PR had tests. They passed. A reviewer caught it before merge, but only because they happened to have worked on the custom library two years earlier. Nobody else on the team would have known.

The agent didn't invent the vulnerability. It improvised in the absence of a briefing it was never given.

`AGENTS.md` is that briefing. One file at the repo root. Most AI coding agents look for it at the start of every session. Claude Code, GitHub Copilot, Cursor, and Codex all search for it automatically. Get that file right and the agent arrives oriented rather than guessing. Skip it and the agent improvises, every session, from general training data that knows nothing about your SSO library.

## The TOC pattern

The instinct when writing `AGENTS.md` is to fill it. Project history, coding style, dependency guidance, testing rules. Dump everything the agent might need into one long file so it never misses something important.

This is the wrong pattern. A file large enough to cover everything is a file too large to actually brief the agent. Token budgets are finite. Attention degrades with document length. An agent that loads a 2,000-line `AGENTS.md` has less context left for the actual task than one that loads 36 lines and knows where to look for everything else.

AgentPatterns.ai named the better approach the **table-of-contents (TOC) pattern**. `AGENTS.md` is a table of contents, not an encyclopedia. It is short enough to fit in a single context load, directive enough to orient the agent without overwhelming it, and precise enough to link to the specific instruction file relevant to the current task. The agent loads what it needs, not everything that might ever be needed.

`ase-cli`'s `AGENTS.md` at `v0.4.0` is 36 lines. It names the project and its purpose, lists five instruction files each with a sentence explaining when to load it, shows the key commands, and ends with a skill list. An agent starting a new session reads those 36 lines and knows exactly where to look for everything else.

## What goes in it

Three categories, in this order.

**Project identity.** What the repo is and what it produces. One paragraph or a short facts block. The agent can read the README instead, but the README is written for humans: verbose, contextual, probably not what you want as the opening brief. A dedicated identity block in `AGENTS.md` keeps this tight.

**Load-on-demand instructions.** Links to files in `.agents/instructions/`, each with a clause explaining when to load it. This is the core of the TOC pattern:

```
- [Build and CI](.agents/instructions/build-and-ci.md) — uv commands, lint, test, CI pipeline
- [Coding standards](.agents/instructions/coding-standards.md) — Python style, project structure, testing
- [OpenSpec workflow](.agents/instructions/openspec.md) — Specs, AC IDs, test traceability
```

"Load when working on authentication" is an instruction. "See auth docs" is not. The agent decides whether to load the file based on that clause. If the clause is absent, the agent loads the file anyway to check, wasting tokens on something that may not be relevant. If the clause is there and accurate, the agent makes the right call without reading the file first.

**Commands and skills.** Key commands the agent can run, and skills it can invoke. These go last because they're reference, not orientation. The agent should already know what it's doing before it needs to know what commands are available.

## Tool-agnostic by design

Claude Code reads `CLAUDE.md`. GitHub Copilot reads `.github/copilot-instructions.md`. Cursor reads `.cursorrules`. Each vendor defined their own entry point before the ecosystem converged. Codex reads `AGENTS.md` natively. No separate file needed.

The practical solution: `AGENTS.md` is the canonical briefing. Every vendor file is a generated pointer:

```markdown
# CLAUDE.md
@AGENTS.md
```

One line. Claude Code follows the reference and loads the real briefing. Any edit to `AGENTS.md` reaches every agent automatically; no vendor file needs updating. `ase generate claude` writes this file. `ase generate copilot` writes a `.github/copilot-instructions.md` that does the same for Copilot.

The rule: vendor files never contain instructions that are not also in `AGENTS.md`. The only content they add is the pointer syntax their tool requires. One source of truth, generated pointers, no authored duplicates.

## The size limit

`ase check` includes an `agents-size` rule that flags `AGENTS.md` files over a configurable line limit (default: 50 lines). This is not a hard constraint: it is a signal. A 200-line `AGENTS.md` is usually a file that started as a TOC and accumulated everything someone was afraid to leave out.

A test: can someone open `AGENTS.md` and, in under two minutes, know what the project is, which instruction file to load for their current task, and what commands to run? If yes, the file is doing its job. If they have to scroll for the answer, the TOC has become its own content problem.

## Maintenance as the actual discipline

`AGENTS.md` is the highest-leverage file in the repo. Every session reads it. That also means every stale line compounds. The agent follows outdated instructions more faithfully than no instructions, because it has no way to distinguish "this was true in March" from "this is still true today."

A link to an instruction file that was renamed six months ago silently breaks the load. A clause that says "load for auth tasks" pointing to a file that now covers payments and notifications produces a loading decision that is wrong in two directions. Neither registers as an error; both produce an agent that is confidently working from the wrong brief.

Two mitigations. First, treat `AGENTS.md` changes as load-bearing: review them with the same care as an ADR. A stale ADR misleads one decision; a stale `AGENTS.md` misleads every session. Second, run `ase check` with `agents-links` enabled. It validates that every link resolves to a real file. This does not catch stale clauses, but it catches broken pointers before the agent hits them at session start.

The deeper mitigation is the one that applies to every high-lifespan document: smaller is more maintainable. A 36-line `AGENTS.md` has 36 lines that can go stale.

*Sources: [agents.md](https://agents.md/) (de-facto AI agent entry-point file, May 2026 snapshot). AgentPatterns.ai, "AGENTS.md: Project-Level README for AI Coding Agents." Böckeler, "Navigating AI Development Workflows," Refactoring.fm.*
