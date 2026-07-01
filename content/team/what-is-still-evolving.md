# What Is Still Evolving

The individual practices in this book have enough evidence and repetition to teach directly. The team practices need more evidence, and this chapter does not pretend otherwise.

The team and cross-team practices are extensions of the individual workflow, not settled field standards. Some of the problems named here are real, documented, and unsolved. That is the bar this book uses.

## What is known and working

The individual-scale practices are documented in a growing body of evidence. Spec-Driven Development (SDD) at PR scope (one change folder, one spec, scoped to a single change) appears across OpenSpec, Spec-Kit, LeanSpec, and GSD variants as of mid-2026. The change-folder-as-isolation primitive for parallel work is this book's extension of those workflows. Intent-first PR review follows from matching review style to PR class.

Short-lived branches and trunk-based development have decades of documented practice behind them. The Intent Engineering application is narrower: change folder scope matches branch scope, and PR class matches review style.

The failure modes behind all this (incompatible specs, stale agent instructions, context poisoning, agent-accelerated drift) are not speculative. They are team-scale versions of failure modes the published sources already document. The controls above them are still being assembled.

*Sources: Rick Hightower, ["Agentic Coding: GSD vs Spec Kit vs OpenSpec vs Taskmaster AI"](https://pub.spillwave.com/agentic-coding-gsd-vs-spec-kit-vs-openspec-vs-taskmaster-ai-where-sdd-tools-diverge-0414dcb97e46), Spillwave, February 27, 2026, OpenSpec, Spec-Kit, LeanSpec, and GSD as active SDD variants. The change-folder-as-isolation primitive and intent-first PR review mapping are this book's synthesis.*

## What has patterns but not consensus

Multi-team coordination via shared ADR repositories borrows from mature architecture review cultures. Agent workflows still diverge here: one company keeps a central architecture repo, another mirrors ADRs into each product repo, a third links out from `AGENTS.md` and hopes developers follow the trail. Shared decisions are the recurring pattern. The packaging is still all over the place.

Inner source for `.agents/` libraries follows well-understood shared-library mechanics. What is not standardized is versioning: when a shared skill file changes, how do dependent teams know? How do they test the skill against their own codebase before adopting the update? In the sources reviewed for this book, no shared package-management convention for agent instruction files appears as of mid-2026.

Multi-LLM critique (using a second model to review a spec before implementation) is not yet codified as a standard step in the SDD sources reviewed for this book as of mid-2026. Which models to use, how to structure the critique prompt, and how to weight the critique output against the developer's judgment remain matters of individual preference.

*Sources: Rick Hightower, ["Agentic Coding: GSD vs Spec Kit vs OpenSpec vs Taskmaster AI"](https://pub.spillwave.com/agentic-coding-gsd-vs-spec-kit-vs-openspec-vs-taskmaster-ai-where-sdd-tools-diverge-0414dcb97e46), Spillwave, February 27, 2026, the divergence across SDD frameworks and the absence of standardized review steps.*

## What is genuinely open

Multi-repo planning remains a gap in the SDD sources reviewed for this book. When one feature needs coordinated changes across three repositories, somebody still has to sequence the work, line up the PRs, and decide which repo carries the contract change first. OpenSpec's Workspaces roadmap names multi-repo planning as an in-development team problem. That is a straight admission of a gap. It is not a workflow yet.

Agent-to-agent handoff, where one agent completes a spec and hands the change folder to a different agent for implementation (across session boundaries), is experimentally described by Yegge's Agent Fleets framing but not yet practiced in any consistent form. The tooling does not yet support reliable agent memory across session boundaries in a way that makes handoff predictable.

No framework in the sources reviewed for this book has delivered governance without bureaucracy at scale. The practices described here are voluntary and pull-based. Teams adopt them because the local payoff is obvious, not because a central group wrote a policy deck. In the sources reviewed for this book, large-scale consistency still comes down to champions, review habits, and a few teams doing the tedious maintenance work. That approach does not scale cleanly to two hundred developers spread across ten repos.

*Sources: Steve Yegge, ["Revenge of the junior developer"](https://sourcegraph.com/blog/revenge-of-the-junior-developer), Sourcegraph blog, March 22, 2025, the Agent Fleets stage of the six-wave model as the framing for agent-to-agent handoff. Fission AI, [OpenSpec](https://openspec.dev/) (ongoing), Workspaces roadmap naming multi-repo planning as an in-development team problem. Governance without bureaucracy is this book's open-problem framing.*

## The evidentiary bar for this book

The bar this book applies to itself is simple: strong claims need strong evidence, synthesis gets labeled, and moving practices get time bounds.

The individual practices (Foundation, Agent Instructions, Spec-Driven Development, Quality) are far enough along to teach directly. The team practices are not. The evidence base is thinner, the patterns are looser, and some of the advice in this chapter will age badly. Better to say that plainly than to sand it down into certainty.

The current SDD tool set is still fragmented: multiple frameworks, different trade-offs, no dominant approach, significant experimentation still underway. That is the picture this book found. The individual-developer story is further along. The team and organization story is still messy.

These are live practice questions, not decorative caveats. A few should settle before the next edition. A few will come back with new names and the same operational headache. That is the view from inside a young field: half the work is learning which problems are still real.

*Sources: ThoughtWorks, Technology Radar Vol 34, April 2026, the assessment of the SDD tool set as fragmented with no dominant approach.*
