# Writing Instructions That Work

The instruction said "use the team's naming conventions". The agent followed it and named the new service `orderProcessor`, matching the pattern in the oldest files. The team had migrated to kebab-case eighteen months ago. Nobody updated the instruction. The convention was still there, just wrong.

Vague instructions are not neutral. They are instructions for the agent to improvise, from whatever evidence it can find. And the evidence in a codebase is not evenly distributed. Old code is plentiful. Recent decisions live in ADRs the agent may not have loaded. A vague instruction tilts improvisation toward the wrong end of history.

## Write when you have to, not before

The instinct is to fill the instruction file before the agent starts work. Anticipate the conventions it will need to follow. Cover everything it might get wrong.

The problem: you do not know what the agent will get wrong until it gets it wrong.

An instruction written before a failure is an instruction written for a hypothetical. The agent may never need it. It may also misinterpret it in a case you did not anticipate, producing a new failure the instruction was never designed to prevent.

The practical approach: start minimal and add reactively. The agent violates a convention. Write the instruction that prevents it. That instruction is now grounded in a real failure, describes the real constraint, and prevents the real thing that went wrong rather than a thing you imagined it might do.

This keeps the file short. Short instruction files load faster, stay readable, and are easier to maintain when conventions change. A file full of preemptive instructions typically contains many that have never been exercised. A file built from observed failures contains nothing that is not load-bearing.

The goal is not to eliminate improvisation. For most of what the agent does, choosing an algorithm, structuring a function, designing an API response, you want it to draw on everything it knows. An instruction file that tries to constrain every decision is not a briefing. It is a straitjacket.

Instructions cover one specific failure mode: the agent improvising against your decisions. The library you chose, the module boundary you drew, the naming convention your team settled after a long argument. Those are not areas where general engineering knowledge is useful. They are areas where only your repo's history matters, and the agent cannot read that history unless you tell it to.

## Be specific enough to be testable

A useful test for any instruction: can the agent produce a concrete behaviour from it, or does it have to guess what you meant?

"Follow good security practices" is not testable. "Never store secrets in environment variables; use the team's `SecretConfig` class in `src/config/secrets.py`" is testable. The agent either uses `SecretConfig` or it does not.

Specificity closes the gap between what you wrote and what the agent does. "Keep functions small" leaves the agent to define "small". "Keep functions under 25 lines; extract when you exceed this" gives the agent a threshold it can check. The first instruction produces code of varying length depending on what the agent has seen before. The second produces code that consistently stays under the limit.

## Negative instructions do the work

Positive instructions tell the agent what to do. Negative instructions tell it what not to do. Both are necessary. Teams typically write positive instructions and forget the negative ones, then wonder why the agent keeps doing the thing they never told it to stop.

"Do not use the `requests` library; this repo uses `httpx` for all HTTP calls" is a negative instruction. Without it, the agent reaches for `requests` every session because it has read more code using `requests` than `httpx`. The instruction is not optional. It is the reason the repo uses `httpx` consistently.

The most valuable negative instructions cover the agent's defaults. Defaults come from training data, and training data is the internet, not your codebase. Anywhere your repo diverges from common practice, write a negative instruction. The agent will not infer the divergence from the code alone; the code looks like an exception, and the agent will treat it as one.

## Architecture boundaries in plain language

Some instructions protect architecture. The agent should not touch certain directories, should not introduce dependencies outside the approved list, should not modify generated files. These are not style preferences. They are structural constraints with consequences when violated.

Write them explicitly. "Do not modify files under `src/generated/`; they are produced by the code generator and any hand-edit will be overwritten on the next build" is an architecture boundary the agent can follow. It cannot infer this from the directory name alone.

The same applies to package boundaries. "The `payments` module has no dependency on `users`; if a change requires one, raise it in the PR before implementing" prevents the agent from wiring a dependency that would violate a decision nobody told it about. Without the instruction, the agent sees a useful function in `users`, uses it, and ships a PR that looks fine until someone checks the dependency graph.

*Sources: Böckeler, "Navigating AI Development Workflows," Refactoring.fm. Anthropic, "Building effective agents" (Dec 2024).*

## Testing whether your instructions work

Instructions can be stale, vague, or simply wrong. The only way to know is to test them with the agent, not with a linter.

Give the agent a task that should trigger the instruction and observe the output. Ask for a new HTTP client call. Does it use `httpx`? Ask for a new service module. Does it follow the naming convention? If the agent improvises instead of following the instruction, the instruction is either missing, unclear, or not being loaded.

The most common gap found by a second-model critique pass is instructions that describe outcomes without describing constraints. "Write clean code" is an instruction. "Do not introduce nested ternary expressions; break them into named variables" is a testable constraint. Both can live in the same file; the second one actually controls behaviour.

The second failure mode is instructions that are never loaded. An instruction in a file the agent does not know to read is a note to yourself. The TOC pattern in `AGENTS.md` closes this gap: every instruction file has a clause saying when to load it, so the agent makes the loading decision correctly before it has read the file.

Instructions are passive. They tell the agent how to behave, and the agent decides whether to follow them. It can fail to read them, misread them, or interpret them too narrowly. There is a harder type of enforcement: the kind that fires regardless of what the agent decides. That is what skills and hooks are for.
