# Instructions That Work

An instruction in your repo reads: follow the team's naming conventions. Reasonable, until you notice it never says which ones. The agent fills the gap by matching the pattern it sees most often, and names a new service `orderProcessor`. The team moved to kebab-case a year ago. The old camelCase files still dominate the tree, so that is what the agent learned.

Vague instructions are not neutral. They hand the choice back to the agent, which infers it from the surrounding code. There is far more old code than new, so the pattern it keeps meeting is the outdated one. The convention the team moved to was never written into the instructions the agent loads. So the agent writes code in the convention the team abandoned a year ago.

## Write when you have to, not before

The instinct is to fill the instruction file before the agent starts work: expect the conventions it will need to follow, cover everything it might get wrong.

The problem: you do not know what the agent will get wrong until it gets it wrong.

An instruction written before a failure is a guess. The agent might never need it. Or the agent reads it in a situation you did not foresee, and the guess produces a failure of its own.

The practical approach in this book is: start minimal and add reactively. The agent violates a convention. Write the instruction that prevents it. That instruction is grounded in a real failure. It states the constraint that bit and prevents a repeat, instead of guarding against a problem you only guessed at. Write it immediately: the failure is in front of you, so you can point to the exact wrong output and say what to do instead. Wait a day and you are writing from memory, not from evidence.

Only writing when something fails keeps the file short: nothing enters unless a real failure earned it. A short instruction file loads fast and stays readable, and it is easier to keep current when conventions change. A file full of preemptive rules carries many that have never once been exercised. A file built from real failures carries nothing that is not load-bearing.

The goal is not to eliminate improvisation. For most of what the agent does, from choosing an algorithm to shaping an API response, you want it drawing on everything it knows. Constrain every decision and the instruction file stops being a briefing. It becomes a straitjacket.

*Sources: Böckeler, "Navigating AI Development Workflows," Refactoring.fm, building up instructions reactively from observed failures. Anthropic, "Building effective agents" (Dec 2024), keeping the instruction surface minimal and load-bearing.*

Instructions cover one specific failure mode: the agent improvising against your decisions. The library you chose, the module boundary you drew, the naming convention your team settled after a long argument. General engineering knowledge does not help here. Only your repo's history does, and the agent cannot read that history unless you tell it to.

## Be specific enough to be testable

A useful test for any instruction: does the agent produce a concrete behavior from it, or does it have to guess what you meant?

"Follow good security practices" gives the agent nothing concrete to act on. "Never store secrets in environment variables; use the team's `SecretConfig` class in `src/config/secrets.py`" does: the agent either uses `SecretConfig` or it does not. This is Popper's falsifiability applied to instructions: a rule that cannot be violated cannot be followed.

The same principle applies beyond security. "Keep functions small" cannot be violated: there is no agreed meaning of small for the agent to miss. "Keep functions under 25 lines; extract when you exceed this" can, which means it can also be followed consistently.

## Negative instructions do the work

Positive instructions tell the agent what to do. Negative instructions tell it what not to do. Teams write the positive ones and forget the negative, then wonder why the agent keeps doing the thing nobody told it to stop.

Negative instructions are the more important category. The agent already has defaults, built from everything it was trained on, and a negative instruction is the only thing that overrides them. The opening example in this chapter was a negative instruction failure: the team never wrote "do not use camelCase." A positive rule saying "use kebab-case" might have helped, but the agent saw far more camelCase in the existing code and weighted that over the instruction. The prohibition is what closes the door.

"Do not use the `requests` library; this repo uses `httpx` for all HTTP calls" is a negative instruction. Without it, the agent reaches for `requests` every session, because it has read more code using `requests` than `httpx`. That one negative line is the only thing keeping `httpx` consistent.

The most valuable negative instructions cover the agent's defaults. Defaults come from training data, and training data is the internet, not your codebase. Anywhere your repo diverges from common practice, write a negative instruction. The agent will not infer the divergence from the code alone. The code looks like an exception, and the agent will treat it as one.

## Architecture boundaries in plain language

Some instructions protect architecture. The agent should not touch certain directories, add dependencies outside the approved list, or overwrite generated files. These are structural constraints, not style preferences. Violate one and something downstream breaks.

Write them explicitly. "Do not modify files under `src/generated/`; they are produced by the code generator and any hand-edit will be overwritten on the next build" is an architecture boundary the agent follows. It cannot infer this from the directory name alone.

Most languages have an architectural constraint testing framework that encodes exactly these rules: ArchUnit for Java, NetArchTest for .NET, `dependency-cruiser` for JavaScript and TypeScript, `import-linter` for Python. If yours does, consult it when writing instructions and run it after agent changes to catch what the instructions missed.

Package boundaries need the same treatment. "The `payments` module has no dependency on `users`; if a change requires one, raise it in the PR before implementing" prevents the agent from wiring a dependency that would violate a decision nobody told it about. Without the instruction, the agent sees a useful function in `users`, uses it, and ships a PR that looks fine until someone checks the dependency graph.

*Sources: Böckeler, "Navigating AI Development Workflows," Refactoring.fm, negative and boundary instructions in an agent workflow. Anthropic, "Building effective agents" (Dec 2024), explicit constraints and guardrails over implicit ones.*

## Let the agent draft the instruction

When a failure happens, the agent has the full context: it just produced the wrong output, and the task that triggered it is still in the session. That makes it the right tool to draft the instruction that prevents a repeat. It also knows what phrasing it responds to, which a human writing in the abstract does not.

Give it the failure and ask for the instruction:

```
The agent just produced [X] when it should have produced [Y].
Write one instruction for the agent instructions file that prevents this.

Requirements:
- State the constraint, not the outcome ("do not use X" not "write clean X")
- Be specific enough that any coding agent or human can tell whether it
  was followed without additional context
- Keep it to one or two sentences
```

The "any coding agent or human" requirement is the key addition. Without it the agent writes for itself: phrasing that a strong model interprets correctly but a weaker one glosses over. Test the draft immediately while the failure is still in front of you. If the agent still improvises, sharpen the language before the instruction goes anywhere.

## Testing whether your instructions work

Instructions get stale, vague, or simply wrong. The only way to know is to test them with the agent, not with a linter.

Give the agent a task that should trigger the instruction and observe the output. Ask for a new HTTP client call. Does it use `httpx`? Ask for a new service module. Does it follow the naming convention? If the agent improvises instead of following the instruction, the instruction is either missing, unclear, or not being loaded.

Once it works, raise a PR. The review catches instructions that are too broad, too narrow, or contradict something already in the file. The PR thread also informs your teammates of the new rule: an instruction merged silently is a constraint your colleagues do not know exists and cannot challenge.

If you wrote the instruction on a strong model, test it on a weaker one before merging. A strong model fills in gaps the instruction leaves open; a weaker model exposes them. If the weaker model still improvises, the instruction is not specific enough yet. Teams that use different coding agents and models need instructions that hold across all of them, not just the most capable one in the room.

A second-model critique pass often surfaces the same gap: instructions that state an outcome without stating the constraint. "Write clean code" states an outcome. "Do not introduce nested ternary expressions; break them into named variables," states the constraint behind it, and only the second changes what the agent produces.

When an instruction does not hold, a skill or hook enforces the same constraint without asking the agent to comply.

## When instructions backfire

Instructions constrain the agent's decisions. That is the point. Some decisions should not be constrained. An instruction that specifies the sorting algorithm prevents the agent from choosing a better one when the data shifts. Pin the exact structure of an API response, and the agent cannot adapt it when a new client needs something different. Over-constraining the agent turns it from a collaborator into a template filler.

Where is the line? Write instructions for a senior colleague who has read the entire internet but has never seen your repo. They know the language idioms and the common library APIs. Do not explain those. They do not know your team's decisions or what you tried and rejected. Document those.

Instructions also backfire by going stale: a constraint written for last quarter's architecture gets followed confidently into today's, the same false-confidence failure stale instructions produce at the entry point.

The practical test: if the agent gets the decision wrong and the fix is repo-specific, write an instruction. If the agent gets the decision wrong and the fix is general engineering knowledge, let the agent learn from the codebase. Instructions prevent drift against your decisions. They should not prevent the agent from making decisions you have not made yet.
