# Instructions That Work

An instruction in your repo reads: follow the team's naming conventions. Reasonable, until you notice it never says which ones. The agent fills the gap by matching the pattern it sees most often, and names a new service `orderProcessor`. The team moved to kebab-case a year ago. The old camelCase files still dominate the tree, so that is what the agent learned.

Vague instructions are not neutral. They hand the choice back to the agent, which infers it from the surrounding code. There is far more old code than new, so the pattern it keeps meeting is the outdated one. The correction lives in an ADR it never loaded. So the agent writes code in the convention the team abandoned a year ago.

## Write when you have to, not before

The instinct is to fill the instruction file before the agent starts work: expect the conventions it will need to follow, cover everything it might get wrong.

The problem: you do not know what the agent will get wrong until it gets it wrong.

An instruction written before a failure is a guess. The agent might never need it. Or the agent reads it in a situation you did not foresee, and the guess produces a failure of its own.

The practical approach in this book is: start minimal and add reactively. The agent violates a convention. Write the instruction that prevents it. That instruction is grounded in a real failure. It names the constraint that bit and prevents a repeat, instead of guarding against a problem you only guessed at.

This keeps the file short. A short instruction file loads fast and stays readable, and it is easier to keep current when conventions change. A file full of preemptive rules carries many that have never once been exercised. A file built from real failures carries nothing that is not load-bearing.

The goal is not to eliminate improvisation. For most of what the agent does, from choosing an algorithm to shaping an API response, you want it drawing on everything it knows. Constrain every decision and the instruction file stops being a briefing. It becomes a straitjacket.

*Sources: Böckeler, "Navigating AI Development Workflows," Refactoring.fm, building up instructions reactively from observed failures. Anthropic, "Building effective agents" (Dec 2024), keeping the instruction surface minimal and load-bearing.*

Instructions cover one specific failure mode: the agent improvising against your decisions. The library you chose, the module boundary you drew, the naming convention your team settled after a long argument. General engineering knowledge does not help here. Only your repo's history does, and the agent cannot read that history unless you tell it to.

## Be specific enough to be testable

A useful test for any instruction: does the agent produce a concrete behavior from it, or does it have to guess what you meant?

"Follow good security practices" gives the agent nothing concrete to act on. "Never store secrets in environment variables; use the team's `SecretConfig` class in `src/config/secrets.py`" does: the agent either uses `SecretConfig` or it does not.

Specificity closes the gap between what you wrote and what the agent does. "Keep functions small" leaves the agent to define "small". "Keep functions under 25 lines; extract when you exceed this" gives the agent a threshold to check against. The first instruction produces code of varying length depending on what the agent has seen before. The second produces code that consistently stays under the limit.

## Negative instructions do the work

Positive instructions tell the agent what to do. Negative instructions tell it what not to do. Teams write the positive ones and forget the negative, then wonder why the agent keeps doing the thing nobody told it to stop.

"Do not use the `requests` library; this repo uses `httpx` for all HTTP calls" is a negative instruction. Without it, the agent reaches for `requests` every session, because it has read more code using `requests` than `httpx`. That one negative line is the only thing keeping `httpx` consistent.

The most valuable negative instructions cover the agent's defaults. Defaults come from training data, and training data is the internet, not your codebase. Anywhere your repo diverges from common practice, write a negative instruction. The agent will not infer the divergence from the code alone. The code looks like an exception, and the agent will treat it as one.

## Architecture boundaries in plain language

Some instructions protect architecture. The agent should not touch certain directories, add dependencies outside the approved list, or overwrite generated files. These are structural constraints, not style preferences. Violate one and something downstream breaks.

Write them explicitly. "Do not modify files under `src/generated/`; they are produced by the code generator and any hand-edit will be overwritten on the next build" is an architecture boundary the agent follows. It cannot infer this from the directory name alone.

The same applies to package boundaries. "The `payments` module has no dependency on `users`; if a change requires one, raise it in the PR before implementing" prevents the agent from wiring a dependency that would violate a decision nobody told it about. Without the instruction, the agent sees a useful function in `users`, uses it, and ships a PR that looks fine until someone checks the dependency graph.

*Sources: Böckeler, "Navigating AI Development Workflows," Refactoring.fm, negative and boundary instructions in an agent workflow. Anthropic, "Building effective agents" (Dec 2024), explicit constraints and guardrails over implicit ones.*

## Testing whether your instructions work

Instructions get stale, vague, or simply wrong. The only way to know is to test them with the agent, not with a linter.

Give the agent a task that should trigger the instruction and observe the output. Ask for a new HTTP client call. Does it use `httpx`? Ask for a new service module. Does it follow the naming convention? If the agent improvises instead of following the instruction, the instruction is either missing, unclear, or not being loaded.

A second-model critique pass often surfaces the same gap: instructions that name an outcome without naming the constraint. "Write clean code" names an outcome. "Do not introduce nested ternary expressions; break them into named variables" names the constraint behind it, and only the second changes what the agent produces.

The second failure mode is instructions that are never loaded. An instruction in a file the agent does not know to read is a note to yourself. The TOC pattern in `AGENTS.md` closes this gap: every instruction file has a clause saying when to load it, so the agent makes the loading decision correctly before it has read the file.

Instructions are passive. They tell the agent how to behave, and the agent decides whether to follow. It might not read them, or read them and take them too narrowly. A harder kind of enforcement fires regardless of what the agent decides. That is what skills and hooks are for.

## When instructions backfire

Instructions constrain the agent's decisions. That is the point. Some decisions should not be constrained. An instruction that specifies the sorting algorithm prevents the agent from choosing a better one when the data shifts. Pin the exact structure of an API response, and the agent cannot adapt it when a new client needs something different. Over-constraining the agent turns it from a collaborator into a template filler.

Where is the line? Write instructions for a senior colleague who has read the entire internet but has never seen your repo. They know the language idioms and the common library APIs. Do not explain those. They do not know your team's decisions or what you tried and rejected. Document those.

The split is straightforward. Repo-specific decisions go in an instruction because the agent cannot recover them from code alone. Engineering choices stay with the agent, which has seen more good solutions than your instruction file will ever hold.

Instructions also backfire by going stale: a constraint written for last quarter's architecture gets followed confidently into today's, the same false-confidence failure a stale `AGENTS.md` produces at the entry point.

The practical test: if the agent gets the decision wrong and the fix is repo-specific, write an instruction. If the agent gets the decision wrong and the fix is general engineering knowledge, let the agent learn from the codebase. Instructions prevent drift against your decisions. They should not prevent the agent from making decisions you have not made yet.
