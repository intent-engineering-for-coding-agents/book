# Skills, Commands, and Hooks

The same workflow has more than one home, and where you put it decides whether it runs.

Take a concrete one: after modifying `api-spec.yaml`, regenerate the TypeScript types so the client stays in sync with the contract.

Write it as an instruction, a line in `AGENTS.md` or an instruction file, and you have described the workflow. The agent loads the instruction, reads "regenerate the types after editing the spec", and decides whether this is the moment to act. Type it as a prompt at the moment, and nothing fundamental changes: the agent still decides. Both are advisory.

In a session focused on making a failing test pass, the agent renames a field in `api-spec.yaml` and skips the regeneration. The generated types still describe the old field, every file that imports them still compiles, and the test goes green. The drift surfaces later, at runtime, when the client reads a field the server no longer sends.

Write it as a skill and you have automated the workflow. A skill is a procedure the agent runs as discrete steps, not prose it weighs against the task in front of it. Expose that skill as a command, and a developer fires the same steps by hand. Write it as a hook and the decision disappears: the script runs on the triggering event whether the agent considered it or not.

Instructions and prompts describe the work. This chapter is about the three mechanisms that make it run: skills, commands, and hooks.

## Skills: automate the work you keep repeating

A skill is pure automation. Take a workflow you run the same way every time, cutting a release, regenerating types from a spec, refreshing a changelog, rebuilding a status report, and write the steps down as a procedure the agent executes. None of it is creative work. It is the rote sequence around the creative work, the part a shell script would handle if a shell script knew what to do with a malformed file.

The hub chapter placed skills in `.agents/skills/` and drew the line against instructions: an instruction says how the repo works, a skill does one repeatable task. What matters here is narrower. What separates a skill that runs from one the agent improvises around?

A skill runs two ways. You invoke it by name when you want it now, or the agent triggers it on its own when the task in front of it matches. Same file, same steps, two doorbells.

What the skill file contains decides whether either path works.

Discrete steps matter most. Not "regenerate the types", but "run `npm run generate:types`, check that `tsc --noEmit` passes with zero errors, and update any import paths that reference the stale generated file". Discrete steps are checkable. Prose is not.

Add a completion condition. How does the agent know it is done? "Run `tsc --noEmit`. Zero errors mean the skill is complete". Without this, the agent finishes step four and never learns there was step five.

Expect the most common failure. If `npm run generate:types` exits non-zero because the spec is malformed, what should the agent do? A skill that answers that question runs more reliably than one that leaves the agent to improvise the moment it hits the exception.

You do not have to write any of this yourself. Describe the workflow to the agent, tell it you want a reusable skill file it can invoke as a slash command, and let it draft the Markdown. Review the output, fix the steps that are wrong, and commit. The agent that wrote the skill is the agent that will run it, and it tends to know its own edge cases.

*Sources: Anthropic, "Building effective agents" (Dec 2024), discrete steps and completion conditions in skill design.*

## Commands: a skill you trigger by hand

A command is not a second kind of thing to build. Take any skill, type its name as a slash command, and you have invoked it by hand instead of waiting for the agent to reach for it. Same file, same steps. The only thing that changed is who pulled the trigger.

So why have them? The agent will not always recognize the moment. You finished the change and you want the release cut now, not whenever some future task description happens to match. Typing `/generate-types` runs the procedure on demand.

Give the command a name you will remember under pressure. `/generate-types` is one you reach for. `/synchronize-openapi-typescript-types` is one you look up. Each tool exposes its own command surface, and the keys differ, but the skill file underneath is the one you already wrote.

## Hooks: determinism, like a database trigger

A skill still waits for a trigger. You invoke it, or the agent decides the moment has come. Either way something chooses to run it, and anything that chooses can choose wrong.

A hook does not wait and does not choose. It fires on the event, every time, the way a database trigger fires on every INSERT whether the application remembered to call it or not. Edit a `.py` file, the formatter runs. Stage a commit, the secret scan runs. The agent gets no vote.

That is the whole reason hooks exist next to skills. A skill automates the work. A hook removes the decision to run it. When skipping a step once costs more than running it every time, you want the trigger, not the reminder.

Keep each hook narrow. A hook that runs `ruff` on every modified Python file does one thing and fails clearly when that thing fails. A hook that runs the full test suite on every edit blocks the agent at every step, and a blocked agent gets the hook disabled. A hook prevents one specific drift. It does not rerun CI.

Of the three mechanisms, hooks are the least settled. As of mid-2026 the syntax is tool-specific: a hook written for Claude Code does not drop into Cursor or Copilot unchanged, and one that blocks unexpectedly is awkward to debug. Expect those details to shift as the tooling matures. The advice that outlasts them is simple: start with the one check you cannot afford to have skipped, and add a second only when the first has earned its keep.

*Sources: Anthropic, "Building effective agents" (Dec 2024), the line between advisory instructions and deterministic hooks.*

## Which one, and when

Each mechanism fails differently when it is missing. Without the instruction, the agent does not know the convention and improvises. Without the skill, it knows what to do but re-derives the steps every session and sometimes gets them wrong. Without the hook, it knows what to do and usually does it, and "usually" is the problem for the steps that cannot be skipped.

Stack them in that order. Get the instruction right first: specific, testable, covering the agent's defaults. Add a skill when the same procedure shows up in more than two sessions. Add a hook when skipping the procedure causes real damage rather than drift.

The cost is real, so weigh it. A workflow you run once a month does not need a skill because the instruction covers it. A check that fails once a quarter does not need a hook, because code review catches it. Automation pays off when the procedure is frequent or the failure is expensive. Below that line, the wiring costs more than the drift it prevents.

The practical test: if the agent gets the procedure wrong twice, write the skill. If the agent skips it and something breaks, write the hook. Until then, an instruction and a code review are enough.

Managing the context that skills and hooks assume is available is the next constraint. Sessions fill, context drops off, and the agent improvising in hour two is not failing. It is working with a different set of inputs than the one that started the session. Skills and hooks cannot fix that. Context management is the next layer.
