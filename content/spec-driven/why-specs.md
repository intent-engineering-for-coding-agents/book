# Why Specs?

An agent without a spec does not refuse to act. It guesses. A good guess is indistinguishable from the right answer until the day it is not.

You ask the agent to extend a feature. It reads the existing code, infers what the code is for, and implements the extension. The inference is reasonable, but the validation lived in the controller only because the first developer ran out of time and meant to move it. The agent does the architecturally tidy thing and moves it to the service layer. The tests that asserted the old controller behavior break, so the agent rewrites them to match its own implementation. Everything passes. Nobody asked for the refactor, and nobody told it not to.

The agent worked from what it saw, and what it saw did not include the intent.

## What a spec actually is

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

Waterfall separates requirements from implementation across phases and teams with a handoff boundary. A product manager writes requirements. A developer implements them months later, with formal sign-off at each stage. The developer has no input on requirements. The requirements do not change during implementation. This is the model agile replaced.

A spec here is a change proposal scoped to one PR, written by the same person who will implement it. Writing it takes an hour, not a month. It gets critiqued before implementation, but by one or two colleagues rather than a steering committee. A pre-flight check, not a contract.

A pre-flight check catches the obvious failure before takeoff. It does not stop you diverting mid-flight when conditions change. A contract does. Write the spec to catch problems, not to trap you in them.

## Not every change earns a spec

Specs add ceremony, and some changes do not earn it. A one-line fix or a configuration tweak does not need one. Neither does a feature with zero ambiguity and a trivially recoverable failure mode. The heuristic: if the expected output is obvious and the failure mode is recoverable, skip the spec. If either is false, write it.

A spec that covers everything sounds thorough. At some size, it stops being a useful guide and starts being a document the agent has to survive rather than follow. What that size is, and why it matters, is the question the next chapter takes seriously.
