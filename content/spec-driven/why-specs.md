---
type: chapter
title: Why Specs?
---

# Why Specs?

An agent without a spec does not refuse to act. It guesses. A good guess is indistinguishable from the right answer until the day it is not.

You ask the agent to extend a feature. It reads the existing code, infers what the code is for, and implements the extension. The inference is reasonable, but the validation lives in the controller for historical reasons nobody recorded. The agent does the architecturally tidy thing and moves it to the service layer. The tests that asserted the old controller behavior break, so the agent rewrites them to match its own implementation. Everything passes. Nobody asked for the refactor, and nobody told it not to.

The agent worked from what it saw, and what it saw did not include the intent.

## What a spec is

A spec is written intent: what this change is supposed to do, what it should not do, and how you will know when it is done.

This book uses a proposal for one implementation ticket, reviewed before code changes. The developer working the ticket writes it against the current code and documentation. The proposal and implementation can have separate reviews without prescribing a pull request count.

Acceptance criteria are the core. Each scenario names a condition and an expected outcome: when the user submits an empty form, the API returns a 400 with the fields listed. When the user submits a valid form, the record is created, and the 201 is returned with the ID. The scenarios guide test design. A matching test marker alone does not prove the behavior, so review the assertions as well as the spec.

This book uses a change-scoped definition drawn from lightweight spec frameworks rather than enterprise requirements practice. The spec stays small and lives beside the code. Each criterion needs test evidence or an explicit manual review path, and the reviewer checks whether that evidence addresses the stated behavior.

*Sources: Fission AI, OpenSpec, change proposals and scenario structure. LeanSpec, concise change-scoped specifications. The ticket boundary and test-evidence rule are this book's workflow guidance.*

## Not test-first, not behavior-first

The first artifact decides what gets pinned down. A test written first against a class pins down that class: its methods, its collaborators, its shape. A scenario written first pins down what the system does for whoever uses it.

Test-Driven Development (TDD) puts the test first. Kent Beck's cycle is to write a failing test, write the code that makes it pass, and refactor. For a coding agent the appeal is plain, because a failing test is a signal the agent runs by itself. For a unit or a class, the fit is good.

In my experience the tests TDD produces sit too close to the code being written. That fits a class. It fits a whole system less well, because the test names a structure the next refactor or the next agent session is free to change. The opening example of this chapter shows what coupling to structure costs: the agent moved validation out of the controller, and the tests asserting the old controller behavior broke.

Behavior-Driven Development (BDD) came out of teaching TDD. Dan North writes that misunderstandings about TDD almost always came back to the word "test", so he moved the vocabulary to behavior. In his account a story's behavior is simply its acceptance criteria.

This book puts scenarios first. You review the proposed behavior, constraints, and acceptance criteria before asking the agent to implement them. The agent drafts code and tests at the layer the [test strategy](../quality/test-strategy) names, and the developer reviews both against the agreed change.

TDD stays available below the scenarios. It fits units, and where the boundary is stable it fits slice and integration tests too. Acceptance and end-to-end tests come from the scenarios, and the book leaves the use of TDD to the team.

So when a tester reaches for the BDD label and braces for step definitions, the reflex is reasonable and the target is wrong. The notation stayed. The practice underneath changed.

*Sources: Kent Beck, "Test-Driven Development: By Example" (2002), the test-first cycle. Dan North, "Introducing BDD" (Better Software, 2006), misunderstandings about TDD tracing back to the word "test", and a story's behavior as its acceptance criteria. The coupling concern, the scenarios-first order, and TDD as an optional technique below the scenarios are this book's position and the author's experience, not a field finding.*

## The practical motivation

Three things break without a spec, and they break in order.

Intent disappears first. A spec gives the agent a target and gives the reviewer a record to compare with the patch. A vague ticket leaves both to infer what the change was meant to accomplish.

Drift is second. When a later session sees only the code, it may treat a mistaken implementation as the intended pattern. A recorded decision or spec gives the reviewer a way to challenge that inference.

Traceability disappears third. A code review asks "does this implementation match the spec?" only if there is a spec. A PR that arrives without one requires the reviewer to reconstruct intent from the diff, which is backward. Review the intent first, then the diff. Without the spec, the only thing to review is the diff.

*Sources: The intent, drift, and review sequence above are this book's rationale for a change-scoped spec.*

## The waterfall objection

Spec-before-code sounds like waterfall. It is not.

The risk is a large batch of requirements handed to implementation with no room to revise them. Writing down intent before a change does not require that handoff.

A proposal here follows one implementation ticket. The developer can revise it when review or implementation exposes a mistaken assumption. The cost is an extra artifact to keep aligned with the code.

Written that way, spec-before-code runs one change at a time. The implementer owns the proposal and revises it when the code or review exposes a mistake. Completion still requires verified, integrated behavior and an archived proposal. The spec stays small and records the behavior the reviewer checks before accepting the patch.

The version that does slide back toward waterfall is the oversized spec that tries to settle the whole system before any code exists. That is a batch-size failure, not an intent-first one. Small, change-scoped specs reduce the batch size behind the risk.

## Not every change earns a spec

Specs add ceremony, and some changes do not earn it. A one-line fix or a configuration tweak does not need one. Neither does a feature with zero ambiguity and a trivially recoverable failure mode. The heuristic: if the expected output is obvious and the failure mode is recoverable, skip the spec. If either is false, write it.

A spec that covers everything sounds thorough. At some size, it stops being a useful guide and starts being a document the agent has to fight rather than follow. What that size is, and why it matters, is the question the next chapter takes seriously.
