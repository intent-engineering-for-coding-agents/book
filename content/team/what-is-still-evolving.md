# What Is Still Evolving

The individual practices in this book have enough evidence and repetition to teach directly. The team practices need more caveats, and this chapter does not pretend otherwise.

The team and cross-team practices are plausible extensions of the individual workflow, not settled field standards. Some of the problems named here are real, documented, and unsolved. That is the honest maturity model the book has applied since the Foundation section.

## What is known and working

The individual-scale practices are documented in a growing body of evidence. Spec-Driven Development (SDD) at PR scope (one change folder, one spec, scoped to a single change) appears across OpenSpec, Spec-Kit, LeanSpec, and GSD variants as of mid-2026. The change-folder-as-isolation primitive for parallel work is this book's extension of those workflows. Intent-first PR review follows from matching review style to PR class.

Short-lived branches and trunk-based development have decades of documented practice behind them. The Intent Engineering application is narrower: change folder scope matches branch scope, and PR class matches review style.

The failure modes behind all this (incompatible specs, stale agent instructions, context poisoning, agent-accelerated drift) are not speculative. They are team-scale versions of failure modes documented in the published sources this book uses from 2025 onward. The controls above them are still being assembled.

*Sources: ThoughtWorks, Technology Radar Vol 34, April 2026, cognitive debt and fragmented SDD tooling as documented failure context. Rick Hightower, ["Agentic Coding: GSD vs Spec Kit vs OpenSpec vs Taskmaster AI"](https://medium.com/@richardhightower/agentic-coding-gsd-vs-spec-kit-vs-openspec-vs-taskmaster-ai-where-sdd-tools-diverge-0414dcb97e46), Medium, Feb 27, 2026, OpenSpec, Spec-Kit, LeanSpec, and GSD as active SDD variants. The change-folder-as-isolation primitive and intent-first PR review mapping are this book's synthesis.*

## What has patterns but not consensus

Multi-team coordination via shared ADR repositories borrows from mature architecture review cultures. It is not yet standardized for agent workflows: the directory structure, contribution process, and instruction format for how agents consume shared architecture docs varies by organization. The pattern is clear, but the form is not.

Inner source for `.agents/` libraries follows well-understood shared-library mechanics. What is not standardized is versioning: when a shared skill file changes, how do dependent teams know? How do they test the skill against their own codebase before adopting the update? This book found no widely adopted package-management convention for agent instruction files as of mid-2026.

Multi-LLM critique (using a second model to review a spec before implementation) is not yet codified as a standard step in the SDD sources reviewed for this book as of mid-2026. Which models to use, how to structure the critique prompt, and how to weight the critique output against the developer's judgment remain matters of individual preference.

*Sources: Rick Hightower, ["Agentic Coding: GSD vs Spec Kit vs OpenSpec vs Taskmaster AI"](https://medium.com/@richardhightower/agentic-coding-gsd-vs-spec-kit-vs-openspec-vs-taskmaster-ai-where-sdd-tools-diverge-0414dcb97e46), Medium, Feb 27, 2026, the divergence across SDD frameworks and the absence of standardized review steps. ThoughtWorks, Technology Radar Vol 34, April 2026, the fragmented, pre-consensus state of these patterns.*

## What is genuinely open

Multi-repo planning remains a gap in the SDD sources reviewed for this book. When a single feature requires coordinated changes to three repositories, the spec-driven workflow requires human coordination at points where the single-repo workflow does not. OpenSpec's Workspaces roadmap names multi-repo planning as an in-development team problem. The problem is named. The solution is not.

Agent-to-agent handoff, where one agent completes a spec and hands the change folder to a different agent for implementation (across session boundaries), is experimentally described by Yegge's Agent Fleets framing but not yet practiced in any consistent form. The tooling does not yet support reliable agent memory across session boundaries in a way that makes handoff predictable.

Governance without bureaucracy is the aspiration this book has not seen any framework deliver at scale. The practices described here are voluntary and pull-based. Teams adopt them because they work, not because a governance committee mandates them. What happens when a large organization needs cross-team consistency and has mixed adoption? In the sources reviewed for this book, the answer is social pressure and champions. That answer gets thin in an organization of two hundred developers.

*Sources: Steve Yegge, ["Revenge of the junior developer"](https://sourcegraph.com/blog/revenge-of-the-junior-developer), Sourcegraph blog, Mar 22, 2025, the Agent Fleets stage of the six-wave model as the framing for agent-to-agent handoff. Fission AI, [OpenSpec](https://openspec.dev/) (ongoing), Workspaces roadmap naming multi-repo planning as an in-development team problem. Governance without bureaucracy is this book's open-problem framing.*

## The honest bar for this book

The bar this book applies to itself is the same bar it applies to any claim: strong where the evidence is strong, labeled where it is synthesis, time-bounded where the practice is evolving.

The individual practices (Foundation, Agent Instructions, Spec-Driven Development, Quality) meet a higher bar than the team practices. They are described with more specificity because the evidence base is stronger. The team practices meet a lower bar by honest acknowledgment: they are directionally useful, they follow from the individual practices, and they are consistent with what the SDD community is building toward. Some of them will look different in two years.

ThoughtWorks Radar Vol 34 (April 2026) described the current SDD tool set as fragmented: multiple frameworks with different trade-offs, no dominant approach, significant experimentation still underway. That assessment matches what this book found. The individual-developer story is further along. The team and organization story is not.

The open problems are live practice questions. Some should be solved by the time the next edition lands. Others will still be open, renamed, and slightly worse. That is not a pessimistic forecast. It is what the maturity curve looks like from the inside.

*Sources: ThoughtWorks, Technology Radar Vol 34, April 2026, the assessment of the SDD tool set as fragmented with no dominant approach.*
