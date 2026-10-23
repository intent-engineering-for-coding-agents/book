---
type: chapter
title: Instructions That Work
---

# Instructions That Work

An instruction in your repo reads: follow the team's naming conventions. Reasonable, until you notice it never says which ones. The agent fills the gap by matching the pattern it sees most often, and names a new service `orderProcessor`. The team moved to kebab-case a year ago. The old camelCase files still dominate the tree, so that is what the agent learned.

Vague instructions are not neutral. They hand the choice back to the agent, and the code it sees outvotes the decision nobody wrote down.

## Write when you have to, not before

The instinct is to fill the instruction file before the agent starts work: expect the conventions it will need to follow, cover everything it might get wrong.

The problem: you do not know what the agent will get wrong until it gets it wrong.

An instruction written before a failure is a guess. The agent might never need it. Or the agent reads it in a situation you did not foresee, and the guess produces a failure of its own.

My practical rule is to start minimal and add reactively. The agent violates a convention. Write an instruction addressing the observed failure. The instruction states the constraint that bit and gives later sessions an explicit rule, instead of guarding against a problem you only guessed at.

Write it immediately: the failure is in front of you, so you point to the exact wrong output and say what to do instead. Wait a day, and you are writing from memory, not from evidence.

Adding rules after observed failures keeps speculative instructions out of the file. The approach has a cost: the first occurrence reaches the agent before the rule exists. Review and project checks still have to catch it.

The goal is not to remove improvisation. For most of what the agent does, from choosing an algorithm to shaping an API response, you want it drawing on everything it knows. Constrain every decision, and the instruction file stops being a context. It becomes a straitjacket.

*Sources: Birgitta Böckeler, "Harness engineering for coding agent users" (martinfowler.com, April 2, 2026), improving guides after repeated failures. Starting with a short file and adding rules after observed failures is the author's practice.*

Instructions are for repo-specific decisions: the library you chose, the module boundary you drew, the naming convention your team settled after a long argument. General engineering knowledge belongs elsewhere. Instructions exist for the parts of the codebase history the agent will not reconstruct reliably from code alone.

## Be specific enough to be testable

A useful test for any instruction: does the agent produce a concrete behavior from it, or does it have to guess what you meant?

"Follow good security practices" leaves the agent to guess. "Read secrets through the team's `SecretConfig` class in `src/config/secrets.py`" gives the reviewer a specific choice to inspect in the patch.

The same principle applies beyond security: "Keep functions small" has no measurable threshold, so the agent has nothing concrete to miss, while "Keep functions under 25 lines. Extract when you exceed this" gives it something to hit or miss. The agent either stays under the limit or it does not, and reviewers inspect the result without debating what "small" meant.

*Sources: The `SecretConfig` and function-length examples are illustrative. The testability check is this book's workflow guidance.*

## Name rejected alternatives

Teams write the rules for what the agent should do and forget the rules for what it should not. Then they wonder why the agent keeps doing the thing nobody told it to stop. Positive instructions tell the agent what to do. Negative instructions tell it what not to do.

When a common pattern conflicts with a repo decision, name the prohibited choice and the expected replacement together. In the opening example, "Use kebab-case for new service names. Do not copy the camelCase names in legacy files" makes the exception visible. The rule gives the reviewer something to check. It does not guarantee the agent will comply.

"Do not add `requests` for new HTTP calls. This repo uses `httpx`" is another example. Check the diff and dependency file after the task. The instruction alone does not enforce the choice.

Write a prohibition when the codebase contains a tempting old pattern or a common alternative the team has rejected. Point to the current path. Otherwise, the file fills with warnings against choices the agent had no reason to make.

*Sources: The naming and HTTP-library examples are illustrative. Pairing a prohibition with its replacement is this book's instruction-writing guidance.*

## Architecture boundaries in plain language

Some instructions protect architecture. The agent should not touch certain directories, add dependencies outside the approved list, or overwrite generated files. These are structural constraints, not style preferences. Break one, and the next generator run, architecture check, or deploy step fails.

Write them explicitly. "Do not modify files under `src/generated/`. They are produced by the code generator, and any hand-edit will be overwritten on the next build" states the boundary and the reason. Check the diff for edits under that path.

If the repository has an architecture check for package boundaries, run it after the agent changes the code. A failed check gives stronger evidence than the instruction alone.

Package boundaries need the same treatment. "The `payments` module has no dependency on `users`. If a change requires one, raise it in the PR before implementing" prevents the agent from adding an import edge that breaks the dependency graph. Without the instruction, the agent sees a useful function in `users`, imports it, and opens a PR that passes local tests but fails the architecture check.

*Sources: Birgitta Böckeler, "Harness engineering for coding agent users" (martinfowler.com, April 2, 2026), guides as feedforward controls and structural tests as feedback. The directory and package examples are illustrative.*

## Let the agent draft the instruction

When a failure happens, the agent has the full context: it produced the wrong output moments ago, and the task that triggered it is still in the session. That makes the agent useful for drafting a targeted instruction. The developer still reviews whether the rule addresses the failure without blocking valid work.

Give it the failure and ask for the instruction:

```text
The agent produced [X] when it should have produced [Y].
Write one instruction for the agent instructions file that addresses this failure.

Requirements:
- State the constraint, not the outcome ("do not use X" not "write clean X")
- Be specific enough that a coding agent or a human reviewer tells whether the rule was followed without additional context
- Keep it to one or two sentences
```

The "any coding agent or human" requirement is the key addition. Without it the agent writes for itself: phrasing a stronger model interprets correctly, but a weaker one glosses over. Test the draft immediately while the failure is still in front of you. If the agent still improvises, sharpen the language before the instruction goes anywhere.

## Testing whether your instructions work

After changing an instruction or skill, try a representative task and inspect whether the intended convention still holds. Choose a task which exercises the rule you edited. This is the book's practical check before relying on revised guidance.

For example, suppose you revise a skill for updating the documentation index. Try the procedure with a renamed file. Inspect the index and directory README listings for the new path, and check whether the old link remains. A completed index alone does not establish whether the agent followed the whole procedure.

Keep the task and starting repository state if you expect to repeat the check. Review the resulting files and run the relevant project checks. One successful attempt shows what happened on that task, without establishing reliability across other tasks or agents.

If the output violates the convention, check whether the agent loaded the revised instructions and whether another rule conflicts. Correct the guidance or its loading condition, then retry. For shared instructions, include the task and observed result in the pull request so reviewers have something concrete to inspect.

*Sources: The renamed-file example and instruction-change check are this book's workflow guidance.*

## When instructions backfire

Instructions constrain the agent's decisions. That is the point. Some decisions should stay open. An instruction that specifies the sorting algorithm blocks a better choice when the data distribution changes. Pin the exact structure of an API response, and the agent cannot adapt when a new client needs a different shape. Over-constraining the agent turns it from a collaborator into a template filler.

Where is the line? Write instructions for a senior colleague who has read the entire internet but has never seen your codebase: skip explaining the language idioms and the common library APIs they already know, and spend the words on your team's decisions and what you tried and rejected instead, since that is the part they cannot infer.

Instructions also backfire by going stale: a constraint written for last quarter's architecture gets followed confidently into today's, the same false-confidence failure stale instructions produce at the entry point.

The practical test: if the agent gets the decision wrong and the fix is repo-specific, write an instruction. If the fix is general engineering knowledge, let the codebase and review handle it. Instructions are for preserving decisions you already made, not for freezing every later decision in place.

Even a precise instruction needs to be present when the agent makes the decision. If the agent starts contradicting a rule from earlier in the session, check what remains in its working context.
