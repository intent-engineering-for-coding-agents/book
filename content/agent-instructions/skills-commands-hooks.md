---
type: chapter
title: "Skills and Commands"
---

# Skills and Commands

A recurring task needs instructions precise enough for the agent to repeat the procedure.

Take a concrete example: after modifying `api-spec.yaml`, regenerate the TypeScript types so the client stays in sync with the contract.

Write the regeneration steps in a skill and tell the agent when to load it. Give the procedure a completion condition: generated types match the contract and the type check passes.

This chapter covers reusable procedures and explicit commands for invoking them.

## Skills: automate the work you keep repeating

A skill is pure automation. Take a workflow you run the same way every time, like cutting a release, regenerating types from a spec, refreshing a changelog, or rebuilding a status report, and write the steps down as a procedure the agent executes.

The difference between a reliable skill and a vague one is specificity. Spell out discrete, checkable steps instead of prose: not "regenerate the types", but "run `npm run generate:types`, confirm `tsc --noEmit` passes with zero errors, and fix any import paths still pointing at the stale file". Give it a completion condition. Name the failure you expect.

A skill runs two ways. You trigger it explicitly, typing its name as a slash command when you want it. Or the agent triggers it implicitly, matching the task in front of it against the skill's one-line description and reaching for the file on its own.

You do not have to write every skill by hand. Describe the workflow to the agent, tell it you want a reusable skill file, let it draft the Markdown, then review the result like any other generated artifact.

*Sources: Anthropic, "Building effective agents" (December 2024), workflows as predefined code paths versus agents that direct their own process.*

## Commands: a skill you trigger by hand

A command is not a second kind of thing to build. Take any skill, type its name as a slash command, and you have invoked it by hand instead of waiting for the agent to reach for it.

Commands matter because the agent will not always recognize the moment. You finished the change and want the release cut now, not whenever some future task description happens to match.

The trigger is not always a human. When an external program drives the agent, a CI step or a script wrapping the CLI, it needs a deterministic handle to call by name.

Give the command a name you will remember under pressure. `/generate-types` is one you reach for. `/synchronize-openapi-typescript-types` is one you look up.

## Agent-facing commands need an explicit contract

A command written for a person stalls an agent at the first prompt. The command prints a progress bar, asks `Continue? [y/N]`, mixes logs into the output, and waits.

This book uses a simple contract for agent-facing commands. It is a practical pattern, not a field standard.

The agent-facing version should do four plain things:

- Print the result to `stdout`, and nothing else
- Print warnings and diagnostics to `stderr`
- Fail instead of prompting
- Offer a safe check before the real command runs

Then add three controls:

- A manifest command listing available commands and required flags
- Stable error codes separating `missing file` from `missing auth`
- One explicit next step in the result when the follow-up is obvious

A short command set is enough:

```text
tool submit --agent --dry-run
tool agent manifest
```

The output should read like data, not terminal noise:

```json
{
  "command": "submit",
  "inputs": { "dataset": "dataset-42" },
  "result": "blocked",
  "errors": [
    {
      "code": "OBJECT_MISSING",
      "message": "3 files are missing from dataset-42",
      "remediation": "Run `tool dataset inspect dataset-42`"
    }
  ],
  "nextActions": [
    "tool dataset inspect dataset-42"
  ]
}
```

This is control, not polish: an agent should not have to scrape help text to discover which command lists datasets, which one mutates state, or which missing input blocked the run.

*Sources: Anthropic, "Building effective agents" (December 2024), predefined workflows, and deterministic paths. The command contract in this section is this book's synthesis.*

## Keeping the procedure available

A saved procedure still needs to reach the agent at the right moment. Put the loading condition in the instruction hub and check the resulting files before accepting the change.

*Sources: This repo's `AGENTS.md`, explicit loading conditions for reusable procedures.*

The procedure also needs the current task context. If the agent loses track of the field renamed in `api-spec.yaml`, a saved regeneration procedure alone does not tell it which change needs checking.
