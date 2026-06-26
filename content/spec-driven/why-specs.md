# Why Specs?

An agent without a spec does not refuse to act. It guesses. A good guess is indistinguishable from the right answer until the day it is not.

You ask the agent to extend a feature. It reads the existing code, infers what the code is for, and implements the extension. The inference is reasonable, but the validation lives in the controller for historical reasons nobody recorded. The agent does the architecturally tidy thing and moves it to the service layer. The tests that asserted the old controller behavior break, so the agent rewrites them to match its own implementation. Everything passes. Nobody asked for the refactor, and nobody told it not to.

The agent worked from what it saw, and what it saw did not include the intent.

## What a spec is

A spec is written intent: what this change is supposed to do, what it should not do, and how you will know when it is done.

It is not a requirements document in the enterprise sense. No stakeholder sign-off, no phase boundary, no month-long handoff. The same developer who will implement the change writes the spec and gets its intent approved before any code exists. The lifecycle is lightweight: a pull request for the proposal, then one or more for the implementation.

Acceptance criteria are the core. Each scenario names a condition and an expected outcome: when the user submits an empty form, the API returns a 400 with the fields listed. When the user submits a valid form, the record is created and the 201 is returned with the ID. These scenarios double as test definitions: each one maps to a test. The spec is not done when the prose is written. It is done when the tests pass.

This change-scoped definition is the working synthesis this book uses. It distills the lightweight spec frameworks rather than enterprise requirements practice: the spec stays small, lives beside the code, and earns its keep through acceptance criteria a test verifies.

*Sources: Fission AI, OpenSpec; LeanSpec, the change-scoped spec and acceptance-criteria structure this book's working definition distills.*

## The practical motivation

Three things break without a spec, and they break in order.

Intent disappears first. The agent that implements from a spec implements what you wrote. The agent that implements from a vague ticket or a chat message implements its best guess at what you meant. That guess is often close, sometimes right, occasionally wrong in a direction that is hard to explain without something written down.

Drift is second. Every session that extends or modifies the feature works from the code, and code is not self-documenting: it records what was built, not what was meant. The next agent infers the intent from the structure, so a build based on a misunderstanding reads as deliberate and the error compounds. Agents move faster than humans, so that compounding runs faster in an agentic codebase, the velocity-as-amplifier effect Yegge describes. A week of agent sessions on misunderstood intent produces more code than a week of human sessions.

Traceability disappears third. A code review asks "does this implementation match the spec?" only if there is a spec. A PR that arrives without one requires the reviewer to reconstruct intent from the diff, which is backward. Review the intent first, then the diff. Without the spec, the only thing to review is the diff.

*Sources: Fission AI, OpenSpec; GitHub, Spec-Kit; LeanSpec; Rick Hightower, "Agentic Coding: GSD vs Spec Kit vs OpenSpec vs Taskmaster AI" (Feb 27, 2026), the SDD frameworks that codify written intent before code as the practice this chapter argues for. Steve Yegge, "Revenge of the junior developer," Sourcegraph (Mar 22, 2025), velocity as amplifier: agents move faster, so drift accumulates faster.*

## The waterfall objection

Spec-before-code sounds like waterfall. It is not.

What makes a process waterfall is batch size and the handoff boundary, not the fact that intent comes first. Waterfall settles all requirements for the whole system up front, then hands them across a boundary: a product manager writes the requirements, a developer implements them months later with formal sign-off at each stage, the developer has no input, and the requirements do not change during implementation. This is the model agile replaced.

A spec here is the opposite end of both axes. It is scoped to one PR and written by the same person who will implement it. Writing it takes a short sitting, not a month. It gets critiqued before implementation, but by a small number of colleagues rather than a steering committee.

Written that way, spec-before-code is the agile loop run one change at a time. The cycle is short, the implementer owns it, and it ends in working software: the spec is done when its tests pass, not when its prose is written. "Working software over comprehensive documentation" is the spec's own rule, which is why it stays small, ships, and gets archived after merge. A pre-flight check, not a contract: it catches the obvious failure before takeoff and does not stop you diverting mid-flight when conditions change. A contract does. Write the spec to catch problems, not to trap you in them.

The version that does slide back toward waterfall is the oversized spec that tries to settle the whole system before any code exists. That is a batch-size failure, not an intent-first one, and keeping specs small is what prevents it.

## Not every change earns a spec

Specs add ceremony, and some changes do not earn it. A one-line fix or a configuration tweak does not need one. Neither does a feature with zero ambiguity and a trivially recoverable failure mode. The heuristic: if the expected output is obvious and the failure mode is recoverable, skip the spec. If either is false, write it.

A spec that covers everything sounds thorough. At some size, it stops being a useful guide and starts being a document the agent has to fight rather than follow. What that size is, and why it matters, is the question the next chapter takes seriously.
