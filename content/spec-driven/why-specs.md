# Why Specs?

An agent without a spec does not refuse to act. It guesses. A good guess is indistinguishable from the right answer until the day it is not.

Suppose you ask the agent to extend a feature. It reads the existing code, infers what the code is for, and implements the extension. The inference is reasonable. But the validation lived in the controller only because the first developer ran out of time and meant to move it. The agent does the architecturally tidy thing and moves it to the service layer. The tests that asserted the old controller behavior break, so the agent rewrites them to match its own implementation. Everything passes. Nobody asked for the refactor, and nobody told it not to.

The agent worked from what it could see, and what it could see did not include the intent.

## What a spec actually is

A spec is written intent: what this change is supposed to do, what it should not do, and how you will know when it is done.

It is not a requirements document in the enterprise sense. No mandatory sections about stakeholder sign-off. Written by the developer who will implement it, reviewed in the same PR as the code, archived when done. The entire lifecycle fits inside a single branch.

Acceptance criteria are the core. Each scenario names a condition and an expected outcome: when the user submits an empty form, the API returns a 400 with the fields listed. When the user submits a valid form, the record is created and the 201 is returned with the ID. These scenarios double as test definitions: each one maps to a test. The spec is not done when the prose is written. It is done when the tests pass.

This change-scoped definition is the working synthesis this book uses. It distills the lightweight spec frameworks rather than enterprise requirements practice: the spec stays small, lives beside the code, and earns its keep through acceptance criteria a test verifies.

*Sources: Fission AI, OpenSpec; LeanSpec, the change-scoped spec and acceptance-criteria structure this book's working definition distills.*

## The practical motivation

Three things break without a spec, and they break in order.

Intent disappears first. The agent that implements from a spec implements what you wrote. The agent that implements from a vague ticket or a chat message implements its best guess at what you meant. That guess is often close, sometimes right, occasionally wrong in a direction that is hard to explain without something written down.

Drift compounds second. Every session that extends or modifies the feature works from the code. The code reflects what the agent built. If the build was based on a misunderstanding, the misunderstanding compounds. Drift in an agentic codebase is faster than in a human-only one because the agent moves faster. A week of agent sessions on misunderstood intent produces more code than a week of human sessions.

Traceability disappears third. A code review asks "does this implementation match the spec?" only if there is a spec. A PR that arrives without one requires the reviewer to reconstruct intent from the diff, which is backward. Review the intent first, then the diff. Without the spec, the only thing to review is the diff.

*Sources: Fission AI, OpenSpec; GitHub, Spec-Kit; LeanSpec; Rick Hightower, "Agentic Coding: GSD vs Spec Kit vs OpenSpec vs Taskmaster AI" (Feb 27, 2026), the SDD frameworks that codify written intent before code as the practice this chapter argues for.*

## The waterfall objection

Spec-before-code sounds like waterfall. It is not.

Waterfall separates requirements from implementation across phases and teams with a handoff boundary. A product manager writes requirements. A developer implements them. Months later. With formal sign-off at each stage. The developer has no input on requirements. The requirements do not change during implementation. This is the model that failed for decades before agile.

A spec in this context is a change proposal scoped to one PR, written by the same person who will implement it. It takes an hour to write, not a month. It gets critiqued and iterated before implementation starts, but that critique is with one or two colleagues, not a steering committee. It is a pre-flight check, not a contract.

The distinction matters. A pre-flight check catches the obvious problem before takeoff. It does not prevent you from diverting mid-flight when conditions change. A contract locks you in. Write specs for the former reason.

## Not every change earns a spec

Specs add ceremony. A one-line change does not need one. A configuration tweak does not need one. A feature with zero ambiguity and a trivially recoverable failure mode might not need one. The heuristic: if the expected output is obvious and the failure mode is recoverable, skip it. If either of those is false, write the spec.

The second failure mode is a spec that looks complete but lacks specificity. "The API should handle errors gracefully" is not an acceptance criterion. "When the upstream service returns a 503, the API should retry once after 1 second, then return a 503 to the caller with `{ error: 'upstream unavailable' }`" is. The difference is not format. It is the level of detail at which a failure can be precisely described.

A spec that covers everything sounds thorough. At some size, it stops being a useful guide and starts being a document the agent has to survive rather than follow. What that size is, and why it matters, is the question the next chapter takes seriously.
