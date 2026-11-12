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

## Spec-driven development with evidence-first verification

Before the agent edits production code, agree on the expected behavior and how you will check it. This book calls that approach spec-driven development with evidence-first verification. The phrase describes our workflow, rather than a standardized method.

Write acceptance criteria with relevant positive, negative, and boundary cases. Identify the observations needed for acceptance, including manual review where automation falls short. Executable tests need not exist yet. Revise the criteria and verification plan when new information changes the requirement.

Develop code and tests in small tasks, with a concrete completion check before moving on. Tests belong before, alongside, or after the corresponding production edits according to the task. Review their assertions against the accepted requirement independently of the implementation. Preserve valid behavioral assertions through refactoring, update them when accepted behavior changes, and retire them only when the corresponding obligation ends.

Planning a check does not verify the implementation. Run it against the relevant revision and inspect whether the result supports acceptance. [Tests as Evidence, Not Ritual](../quality/tests-as-evidence) covers checking whether assertions detect relevant faults, including mutation testing. This workflow costs time in reviewing assertions and maintaining evidence even when every test passes.

*Sources: The name and workflow are this book's approach, adapted from the author's Cliewen decision 019, "Use spec-driven development with evidence-first verification" (accepted November 2, 2026).*

### BDD and ATDD as candidates

Behavior-Driven Development (BDD) is a good candidate for agreeing on behavior before implementation. Dan North describes a story's behavior through its acceptance criteria and develops examples into executable scenarios. Use those conversations to expose missing cases before an agent turns an incomplete requirement into code.

Acceptance Test-Driven Development (ATDD) is another good candidate. Agile Alliance describes collaboration among customer, development, and testing perspectives to define acceptance tests before implementation. That fits the early agreement on verification we want here. Adopting the full practice involves those perspectives, beyond asking an agent to generate tests from a spec.

This book leaves the choice to the team. BDD and ATDD help establish what acceptance means. The evidence review still has to examine whether the resulting checks detect wrong behavior.

*Sources: Dan North, "Introducing BDD" (2006), acceptance criteria expressed as executable behavior scenarios; Agile Alliance, "Acceptance Test Driven Development" (reviewed November 12, 2026), collaborative definition of acceptance tests before implementation. Their suitability for this workflow is the author's recommendation.*

### Where TDD fits

Test-Driven Development (TDD) uses a failing test to guide the next implementation step, followed by refactoring. Kent Beck describes this cycle in "Test-Driven Development: By Example".

I find unit-level TDD too low-level as the starting point for directing coding agents. It puts my attention on classes, functions, and internal interfaces before we have agreed on the system's behavior. ATDD fits how I want to work: agree on acceptance behavior first, then develop the implementation and its supporting tests.

The agent works out the internal structure within the project's architectural constraints. Unit tests still have a place in the [test strategy](../quality/test-strategy). Tests tied to a particular class layout need scrutiny during refactoring, though that coupling is a test-design choice, not a defining property of TDD.

This book leaves the order of executable test and production edits open. A team using ATDD agrees on acceptance tests before implementation without making every internal function the subject of a mandatory test-first cycle. Review still needs to establish whether the completed change meets the accepted behavior.

*Sources: Kent Beck, "Test-Driven Development: By Example" (2002), the test-first cycle; Agile Alliance, "Acceptance Test Driven Development" (reviewed November 12, 2026), acceptance tests defined before implementation from the user's perspective. The preference against unit-level TDD as the starting point for coding agents is the author's position. Test-order freedom is this book's workflow choice.*

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
