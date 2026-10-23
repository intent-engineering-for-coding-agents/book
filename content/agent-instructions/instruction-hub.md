---
type: chapter
title: Agent Instruction Hub
---

# Agent Instruction Hub

Suppose two developers use separate instruction files for the same repo. One file still names the old module layout. Their agents produce incompatible changes even though both developers asked for the same convention.

Give both agents the same source for the project rules.

`AGENTS.md` is the entry point, and `.agents/instructions/` is what it points into. The shared files are plain Markdown in a directory without a vendor name. Check that each agent setup loads the relevant file.

## `.agents/instructions/`

An agent modifying the authentication module does not need the CI pipeline rules, and an agent writing a new checker does not need the deployment runbook. Instruction files exist so a session loading `auth.md` does not also spend context window on Kubernetes rollback steps.

`instructions/` is this book's directory convention for this layer.

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

## `.agents/skills/` {#skills}

When you keep explaining the same procedure, save the steps in a skill. The Agent Skills format packages instructions and supporting files for an agent to load when relevant. A saved procedure still needs review of the resulting files.

This book keeps procedures under `.agents/skills/` and lists their loading conditions in `AGENTS.md`. Follow your agent's discovery rules for native skills. A link in the hub gives the agent a file to read, without promising automatic discovery or a command with the same name.

*Sources: Agent Skills overview and specification (reviewed October 22, 2026), reusable instructions and description-based loading. The hub links and directory organization are this book's convention.*

For example, suppose your project generates TypeScript types from `api-spec.yaml`. Give the skill a concrete loading condition: use after changing the API contract. Write the procedure around the project's commands:

```text
1. Run npm run generate:types.
2. Run tsc --noEmit.
3. Fix stale imports or generated-type mismatches and rerun both commands.
4. Inspect the diff for changes unrelated to the API contract.
```

The completion condition is explicit: generated types match the revised contract, the type check passes, and the diff contains only the intended changes. Adapt the commands to your project before saving the procedure.

Ask the agent to use the skill by name when you need the procedure now. Use a slash command if your tool exposes one. Then inspect the output against the completion condition before accepting the change.

*Sources: The regeneration procedure and completion condition are this book's illustrative workflow guidance.*

## When the hub becomes overhead

The `.agents/` hub solves a coordination problem. When two developers use different tools, or when one developer uses multiple tools across sessions, the hub gives those tools the same instruction files and skill definitions. When neither case exists, the extra directory and pointer structure buys little.

A solo developer working with a single tool and no plans to change does not have that coordination problem. A single instruction file, whether it is called `CLAUDE.md`, `AGENTS.md`, or anything else, is enough because there is only one source.

Using `CLAUDE.md` does not prevent the hub. A `CLAUDE.md` that points into a shared instruction directory is using the hub with a different entry point.

Two things change the calculation. First, portability: a developer who does not want to get locked into one agent benefits from a shared hub even alone. Second, multi-agent workflows: running one agent to write code and another to review it is a coordination problem even for one person.

Use a simple threshold. If you maintain one instruction file and it works, keep it. If you start copying instructions between files, or if two tools produce different output from what should be the same instruction set, build the hub.

The shared files settle where the agent finds the rules. Whether those rules are specific enough to guide a change depends on the instructions themselves.

## Tooling

The [`iec` companion repo](https://github.com/intent-engineering-for-coding-agents/cli) has the four instruction files above and the `update-index` skill (checked at revision `2491a62`). See [Companion Repo](../appendices/companion-repo) for how to browse it.

*Sources: Companion CLI repository at revision `2491a62`, the four instruction files and `update-index` skill.*
