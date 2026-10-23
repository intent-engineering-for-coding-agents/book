---
type: chapter
title: What Is Still Evolving
---

# What Is Still Evolving

The individual practices are taught directly. That editorial choice does not amount to empirical validation of Intent Engineering as a combined paradigm. The team practices remain provisional.

The team and cross-team practices are extensions of the individual workflow, not settled field standards. Some of the problems named here are real, documented, and unsolved. That is the bar this book uses.

## What is known and working

OpenSpec, Spec-Kit, LeanSpec, and GSD describe different ways to record intent before implementation. This book uses a proposal per implementation ticket. The connection between that proposal, branch scope, and review order is the book's workflow synthesis, not a result established across those projects.

Short-lived branches and trunk-based development have decades of documented practice behind them. The Intent Engineering application is narrower: change folder scope matches branch scope, and PR class matches review style.

The working taxonomy groups incompatible specs, stale agent instructions, context poisoning, and agent-accelerated drift as related team-scale failure modes. That grouping is synthesis. The controls above them remain unfinished.

*Sources: Rick Hightower, ["Agentic Coding: GSD vs Spec Kit vs OpenSpec vs Taskmaster AI"](https://spillwave.com/writing/agentic-coding-gsd-vs-spec-kit-vs-openspec-vs-taskmaster-ai-where-sdd-tools-diverge/), February 27, 2026, practitioner comparison of different spec workflows. The ticket and review mapping is this book's synthesis.*

## What has patterns but not consensus

Shared decisions need a location each affected team can read. This book uses a shared ADR repository as one possible location. The source and update path still need an owner, especially when a contract spans several code repositories.

The same ownership question applies to shared `.agents/` files. If a central skill changes, dependent teams need to know which revision they loaded and whether the procedure still fits their repositories. The versioning problem is an open question in this book's proposed team workflow.

If a team asks another agent to critique a spec, the developer still needs to decide which findings matter. A second report does not establish review quality. The book makes no model-selection rule for this optional step.

*Sources: The ownership, versioning, and optional critique questions are this book's team-workflow synthesis.*

## What is genuinely open

Documentation freshness worries me more than agent handoff. Files under `docs/` age quickly after a run of change proposals. One or two people end up nursing the documentation and checking whether archived changes altered a decision, design, architecture boundary, or constraint. Agent instructions do not detect the missing update. A skill helps only when somebody remembers to run it. I still resort to asking an agent to compare the documentation against the source tree, which is useful but not a durable control.

OpenSpec and current Spec-Driven Development (SDD) workflows focus on the change and its code. In the workflows I reviewed for this book through mid-2026, I found no convincing feedback path from a completed change into the durable documentation set. [Keeping Documentation Up to Date](../quality/keeping-docs-up-to-date) offers structural tripwires, but those checks detect suspect files rather than understand whether the design is still true. This part needs more work.

Infrastructure is another weak spot in my experience. Continuous Integration and Continuous Delivery (CI/CD), environments, and metrics belong in the intent, but I have worked on product teams that did not own those systems. A separate pull request and another group stood between the feature team and a change to development, staging, or production. The repo-local loop in this book does not account for that coordination cost yet.

There is also a capability floor. Among the coding agents I have used in 2026, weaker and cheaper models miss decisions and ignore instructions often enough to make this workflow frustrating. The book should not imply that any model with file access will behave the same way. Better models will move this floor, so I expect this assessment to need revision.

OpenSpec now documents a Stores beta for shared planning across repositories. The guide still leaves independently scoped implementation changes in each code repo and says a store does not route tasks to those repos or synchronize their Git checkouts. Somebody must sequence the work, link the PRs, and decide who owns the contract.

When one agent drafts a proposal and another implements it, the second session needs the approved proposal, relevant decisions, and current code. Yegge's Agent Fleets essay is a forecast of more agent coordination, not evidence that this handoff works reliably.

The governance problem here is concrete: a shared ADR or skill needs an owner who notices stale content and a review path for changes. A central repository does not supply either one by itself.

*Sources: Steve Yegge, ["Revenge of the junior developer"](https://sourcegraph.com/blog/revenge-of-the-junior-developer), March 22, 2025, Agent Fleets as the author's forecast. Fission AI, ["Stores: Plan in Its Own Repo"](https://github.com/Fission-AI/OpenSpec/blob/main/docs/stores-beta/user-guide.md) (reviewed October 23, 2026), shared planning and limits of the beta. The ownership question is this book's synthesis.*

## The evidentiary bar for this book

The bar this book applies to itself is simple: strong claims need strong evidence, synthesis gets labeled, and moving practices get time bounds.

The individual practices have worked examples and established predecessors, but this book has not measured the combined workflow. Documentation freshness and cross-team ownership still need stronger evidence. I expect to revise parts of this chapter as teams report what happens when they use them.

The next evidentiary step is empirical: worked examples other teams reproduce, reusable templates they adapt, and reports comparing changes before and after adoption. Useful reports should include the failures and upkeep cost, not only the clean result. The paradigm should change when repeated practice exposes a weak boundary, a needless artifact, or a control that fails under deadline pressure.

Intent Engineering is presented as a working synthesis for 2026, not the final form of the discipline. Publication starts the useful part of that process. Teams have to apply the practices, remove what does not earn its upkeep, and report where the model fails.

The reviewed tools prescribe different artifacts and workflows. Thoughtworks' April 2026 Radar notes that even the terms "spec-driven development" and "harness engineering" overlap in current usage. This book's team and organization chapters should be read with that uncertainty in mind.

These questions are unresolved. Some tooling gaps will close before the next edition. Documentation drift, ownership boundaries, and weak review discipline will remain when frameworks get new names. The work now is to distinguish limitations in today's tools from problems that require engineering judgment.

*Sources: Thoughtworks, Technology Radar Vol 34 (April 2026), inconsistent and overlapping use of spec-driven development and harness engineering terminology. The comparison of reviewed tool workflows is this book's synthesis.*
