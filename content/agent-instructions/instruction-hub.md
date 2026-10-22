---
type: chapter
title: Agent Instruction Hub
---

# Agent Instruction Hub

Two developers, same repo, same language, same CI pipeline. Their pull requests still come back with different naming, different directories off-limits, different test structures. The rules diverged because the instruction files diverged.

The fix is one source that both tools point to, not better synchronization between copies.

`AGENTS.md` is the entry point, and `.agents/instructions/` is what it points into. One directory, no vendor in the name, readable by every tool.

## `.agents/instructions/`

An agent modifying the authentication module does not need the CI pipeline rules, and an agent writing a new checker does not need the deployment runbook. Instruction files exist so a session loading `auth.md` does not also spend context window on Kubernetes rollback steps.

`instructions/` is this book's name for this layer. At the time of writing, no cross-tool standard specifies this subdirectory path yet.

A focused hub stays small. Here is what one looks like in practice:

```text
.agents/instructions/
├── build-and-ci.md       # build commands, lint, test, CI pipeline
├── coding-standards.md   # coding style, project structure, testing
├── index-maintenance.md  # when and how to update a directory index
└── openspec.md           # OpenSpec extensions for specs, AC IDs, test traceability
```

`coding-standards.md` is short. Type hints, string quoting, linting rules, test naming conventions. `openspec.md` does the same for the local OpenSpec conventions without forking the tool itself.

One file per domain, not one file per task. `coding-standards.md` should cover all style conventions instead of splitting into `naming-conventions.md` and `formatting.md`. Split too far and the hub turns into another discovery problem.

## `.agents/skills/`

Skills are workflows, not context. An instruction file tells the agent how the repo works. A skill tells it how to do a repeatable task. `.agents/skills/` is the emerging standard path.

Take `update-changelog` as an example: scan commits since the last tag, extract the relevant entries, regenerate `CHANGELOG.md`. Without the skill, each session has to remember the procedure or be told again. With the skill, the repo explains the rule once and reuses the same steps every time.

Typed from the session, `/update-changelog` invokes the skill directly.

At the time of writing, running `openspec init` for a specific agent generates a full set of skills: `opsx:new`, `opsx:ff`, `opsx:apply`, `opsx:archive`, and others. The output sometimes goes to a vendor-specific directory rather than `.agents/skills/`. If you want one shared hub, copy the generated files into `.agents/skills/` after initialization.

Some CLI agents scan `.agents/skills/` natively. Many IDE integrations reach skill files through `AGENTS.md` pointers instead of reading the directory directly. Vendor-neutral structure gets you as far as the file.

*Sources: OpenAI, "Agent Skills" (developers.openai.com/codex/skills, reviewed July 1, 2026), Codex scanning `.agents/skills/` from the working directory to the repo root, plus user-level and system-level skill folders; Fission AI, "OpenSpec" (openspec.dev, ongoing), `opsx:*` skill generation via `openspec init`.*

## When the hub becomes overhead

The `.agents/` hub solves a coordination problem. When two developers use different tools, or when one developer uses multiple tools across sessions, the hub gives those tools the same instruction files and skill definitions. When neither case exists, the extra directory and pointer structure buys little.

A solo developer working with a single tool and no plans to change does not have that coordination problem. A single instruction file, whether it is called `CLAUDE.md`, `AGENTS.md`, or anything else, is enough because there is only one source.

Using `CLAUDE.md` does not prevent the hub. A `CLAUDE.md` that points into a shared instruction directory is using the hub with a different entry point.

Two things change the calculation. First, portability: a developer who does not want to get locked into one agent benefits from a shared hub even alone. Second, multi-agent workflows: running one agent to write code and another to review it is a coordination problem even for one person.

Use a simple threshold. If you maintain one instruction file and it works, keep it. If you start copying instructions between files, or if two tools produce different output from what should be the same instruction set, build the hub.

## Tooling

The [`iec` companion repo](https://github.com/intent-engineering-for-coding-agents/cli) has the four instruction files above and the `update-index` skill (checked at revision `2491a62`). See [Companion Repo](../appendices/companion-repo) for how to browse it.

*Sources: Companion CLI repository at revision `2491a62`, the four instruction files and `update-index` skill.*
