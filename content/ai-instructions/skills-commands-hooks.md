# Skills, Commands, and Hooks

Some work is a recipe, not a judgement call. Updating `docs/INDEX.md` after touching `docs/` is five fixed steps: scan the directory, list the files, read each heading, update the INDEX, update the subdirectory listings. Write those five steps into an instruction file and the agent follows them, mostly. Start a session mid-task or after a context reset and step four gets skipped. The INDEX drifts, and the next session loads it and gets the wrong map.

The problem was not the instruction. The problem was treating a repeatable workflow as something the agent should decide to run. Skills exist for exactly this.

## Instructions vs skills: the design question

An instruction tells the agent how your codebase works. A skill tells it how to perform a specific repeatable task. The agent reads instructions for context. It runs skills for outcomes.

Get this wrong and you end up with instructions that describe workflows in prose ("when you finish modifying `docs/`, remember to update...") and skills that describe conventions instead of steps. The result is context the agent skims and procedures the agent improvises.

The test: if a developer would describe it as a recipe, a sequence of discrete steps, it is a skill. If they would describe it as background knowledge, this is how we do things here, it is an instruction. Instructions prevent drift by keeping the agent oriented. Skills fix it when it happens.

## Writing a skill that actually runs

A skill is a Markdown file. What it contains determines whether the agent runs it correctly.

Discrete steps matter most. Not "update the documentation" but "scan `docs/` with `ls -R`; for each directory, read the heading of each Markdown file; regenerate `docs/INDEX.md` with file path and heading; regenerate each `README.md` with a sorted list". Discrete steps can be checked off. Prose cannot.

Add a completion condition. How does the agent know it is done? "Run `ase check docs-index-stale`. If it passes, the skill is complete". Without this, the agent may finish step four and not realise there is a step five.

Anticipate the most common failure. If the skill reads file headings and a file has no heading, what should the agent do? A skill that answers this question runs more reliably than one that leaves the agent to improvise at the moment it encounters the exception.

There is a shortcut for the whole section above. You do not need to write the skill yourself. Describe the workflow to the agent, tell it you want a reusable skill file it can invoke as a slash command, and let it draft the Markdown. Review the output, correct any steps that are wrong, and commit. The agent that authored the skill is the same agent that will run it. It tends to know its own edge cases.

Sources: Anthropic, "Building effective agents" (Dec 2024), discrete steps and completion conditions in skill design. Geoffrey Huntley, "Everything is a Ralph Loop" (Jan 17, 2026), the agent authoring its own skill files.

## Commands are skills with a human trigger

In Claude Code, every file in `.agents/skills/` surfaces as a `/skill-name` slash command. The same file, two invocation paths: the agent loads it autonomously when the task matches, or the developer types `/update-index` and invokes it directly.

Design for both. The autonomous path needs clear trigger criteria in `AGENTS.md` ("after modifying any file under `docs/`, run `update-index`"). The command path needs a name a developer will remember at the moment they need it. `/update-index` is memorable. `/synchronize-documentation-index-file` is not.

Cursor, VS Code with Copilot, and JetBrains AI each have their own slash command surfaces and do not read `.agents/skills/` as commands. The skill file is shared. The keyboard shortcut is per-tool.

## Hooks: the enforcement that does not ask

A hook fires without the agent deciding to fire it. Instructions are advisory. Skills are invocable. Hooks are deterministic: the trigger happens, the script runs.

The design question for a hook is not "what should the agent remember to do?" It is "what can the team not afford to have the agent forget?" Code review is advisory. A pre-commit hook is not. Both prevent the same problem, but one requires a human to apply it and one does not.

Effective hooks are narrow. A hook that runs `ruff` on every modified Python file does one thing and fails clearly when that thing fails. A hook that runs the full test suite on every file edit will block the agent at every step and either get disabled or teach the agent to avoid editing files. Hooks should prevent specific drift, not rerun CI.

The tradeoff: hook tooling is still maturing. Syntax is not standardised across tools. Failure modes when a hook blocks unexpectedly require debugging. Start with one hook that catches the one thing you cannot afford to miss. Five hooks that together try to replace CI are five ways for something to go wrong.

## The instruction/skill/hook triangle

Each type of enforcement has a different failure mode when it is missing.

Without the instruction, the agent does not know what the convention is and improvises. Without the skill, the agent knows what to do but has to re-derive the steps in every session, and sometimes gets them wrong. Without the hook, the agent knows what to do and usually does it, but "usually" is not good enough for the things that matter most.

Stack them in that order. Get the instruction right first: specific, testable, covering the agent's defaults. Add a skill when the same procedure appears in more than two sessions. Add a hook when missing the procedure causes a real problem rather than a drift.

## The learning curve

Skills and hooks require upfront investment. A skill needs discrete steps, a completion condition, and failure handling. A hook needs a trigger definition, a script, and debugging when it blocks unexpectedly. Both require learning the tooling, which varies by agent and is not standardised across tools.

Not every workflow justifies the investment. A procedure that appears once a month does not need a skill. An instruction is enough. A check that fails once a quarter does not need a hook. Code review catches it. The automation pays off when the procedure is frequent or the failure is expensive. Below that threshold, the coordination cost exceeds the benefit.

The tooling is still maturing. Hook syntax differs between Claude Code, Cursor, and Copilot. Debugging a hook that blocks unexpectedly requires understanding the agent's execution model, which is not always documented. A skill that works in one agent may need adjustments for another. The investment in skills and hooks is an investment in a moving target.

The practical test: if the agent gets the procedure wrong twice, write a skill. If the agent skips the procedure and it causes a real problem, write a hook. Before that, instructions and code review are enough. The triangle is a progression, not a checklist. Start with instructions. Add enforcement when the cost of not having it becomes visible.

Managing the context that skills and hooks assume is available is the next constraint. Sessions fill. Context drops off. The agent that performed flawlessly in hour one is improvising in hour two. That is not a skill failure or a hook failure. It is a context window problem.
