# What Is Still Evolving

The individual practices in this book are stable enough to teach. The team practices are not, and this chapter does not pretend otherwise.

The team and cross-team practices are established in principle but not yet consistent in execution. Some of the problems named here are real, documented, and unsolved. That is the honest maturity model the book has applied since the Foundation section.

## What is known and working

The individual-scale practices are practiced and documented in a growing body of evidence. Spec-driven development at the PR scope (one change folder, one spec, scoped to a single change) is used by teams across OpenSpec, Spec-Kit, LeanSpec, and GSD variants as of mid-2026. The change-folder-as-isolation primitive for parallel work is a natural extension that multiple teams have adopted. Intent-first PR review is described in the SDD community as a practice that matches review style to PR class.

Short-lived branches, trunk-based development, and PR taxonomy have decades of documented practice behind them. The Intent Engineering application of these follows from established principles: change folder scope matches branch scope, PR class matches review style.

The failure modes behind all this (incompatible specs, stale AGENTS.md, context poisoning, agent-accelerated drift) are not speculative. They are the team-scale versions of failure modes individual developers already hit, documented in the published literature since 2025. That documentation is the solid ground. What sits above it is still being assembled.

*Sources: ThoughtWorks, Technology Radar Vol 34, April 2026, the team-scale failure modes as documented rather than speculative. Rick Hightower, ["Agentic Coding: GSD vs Spec Kit vs OpenSpec vs Taskmaster AI"](https://medium.com/@richardhightower/agentic-coding-gsd-vs-spec-kit-vs-openspec-vs-taskmaster-ai-where-sdd-tools-diverge-0414dcb97e46), Medium, Feb 27, 2026, the SDD frameworks (OpenSpec, Spec-Kit, LeanSpec, GSD) in active use as of mid-2026.*

## What has patterns but not consensus

Multi-team coordination via shared ADR repositories is practiced in organizations with mature architecture review cultures. It is not yet standardized: the directory structure, contribution process, and instruction format for how agents consume shared architecture docs varies by organization. The pattern is clear, but the form is not.

Inner source for `.agents/` libraries follows well-understood inner source mechanics. What is not standardized is versioning: when a shared skill file changes, how do dependent teams know? How do they test the skill against their own codebase before adopting the update? Package management for agent instruction files does not yet exist in any recognizable form.

Multi-LLM critique (using a second model to review a spec before implementation) is not yet codified as a standard step in any SDD framework as of mid-2026. Which models to use, how to structure the critique prompt, and how to weight the critique output against the developer's judgment remain matters of individual preference.

*Sources: Rick Hightower, ["Agentic Coding: GSD vs Spec Kit vs OpenSpec vs Taskmaster AI"](https://medium.com/@richardhightower/agentic-coding-gsd-vs-spec-kit-vs-openspec-vs-taskmaster-ai-where-sdd-tools-diverge-0414dcb97e46), Medium, Feb 27, 2026, the divergence across SDD frameworks and the absence of standardized review steps. ThoughtWorks, Technology Radar Vol 34, April 2026, the fragmented, pre-consensus state of these patterns.*

## What is genuinely open

Multi-repo planning remains a gap across every SDD framework reviewed for this book. When a single feature requires coordinated changes to three repositories, the spec-driven workflow requires human coordination at points where the single-repo workflow does not. OpenSpec's roadmap acknowledges this, and so does Spec-Kit's. The problem is named. The solution is not.

Agent-to-agent handoff, where one agent completes a spec and hands the change folder to a different agent for implementation (across session boundaries), is experimentally described by Yegge's Agent Fleets framing but not yet practiced in any consistent form. The tooling does not yet support reliable agent memory across session boundaries in a way that makes handoff predictable.

Governance without bureaucracy is the aspiration that no framework has yet delivered at scale. The practices described here are voluntary and pull-based. Teams adopt them because they work, not because a governance committee mandates them. What happens when a large organization needs cross-team consistency and has mixed adoption? Across every SDD framework and community reviewed for this book, the answer is social pressure and champions. That is not a satisfying answer for an organization of two hundred developers.

*Sources: Steve Yegge, ["Revenge of the junior developer"](https://sourcegraph.com/blog/revenge-of-the-junior-developer), Sourcegraph blog, Mar 22, 2025, the Agent Fleets stage of the six-wave model as the framing for agent-to-agent handoff. Fission AI, [OpenSpec](https://openspec.dev/) (ongoing), the roadmap's acknowledged multi-repo gap.*

## The honest bar for this book

The bar this book applies to itself is the same bar it applies to any claim: strong where the evidence is strong, labeled where it is synthesis, time-bounded where the practice is evolving.

The individual practices (Foundation, Agent Instructions, Spec-Driven Development, Quality) meet a higher bar than the team practices. They are described with specificity because they have been practiced and observed with specificity. The team practices meet a lower bar by honest acknowledgment: they are directionally correct, they follow from the individual practices logically, and they are consistent with what the SDD community is building toward. Some of them will look different in two years.

ThoughtWorks Radar Vol 34 (April 2026) described the current SDD landscape as fragmented: multiple frameworks with different trade-offs, no dominant approach, significant experimentation still underway. That assessment matches what this book found. The individual-developer story is substantially complete. The team and organization story is not.

The open problems are live research questions. Some will be solved by the time the next edition lands. Others will still be open, renamed, and slightly worse. That is not a pessimistic forecast; it is what the maturity curve looks like from the inside.

*Sources: ThoughtWorks, Technology Radar Vol 34, April 2026, the assessment of the SDD landscape as fragmented with no dominant approach.*
