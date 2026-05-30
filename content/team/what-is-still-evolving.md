# What Is Still Evolving

This book has argued from evidence throughout. Where a claim rested on a published source, the source is cited. Where a taxonomy or pattern is the book's synthesis, that is labeled. Where a tool or practice is a mid-2026 snapshot, the time bound is explicit.

This chapter applies the same standard to the book itself.

The individual and small-team practices described here are stable enough to teach. The team and cross-team practices are established in principle but not yet consistent in execution. Some of the problems this section names are real, documented, and unsolved. Saying so is not a weakness; it is the honest maturity model the book has been applying since the Foundation section.

## What is known and working

The individual-scale practices are practiced and documented in a growing body of evidence. Spec-driven development at the PR scope (one change folder, one spec, one PR) is used by teams using OpenSpec, SpecKit, LeanSpec, and GSD variants as of mid-2026. The change-folder-as-isolation primitive for parallel work is a natural extension that several teams have applied independently. Intent-first PR review is described and recommended by multiple practitioners.

Short-lived branches, trunk-based development, and PR taxonomy have decades of documented practice behind them. The ASE application of these follows from established principles rather than inventing new ones: change folder scope matches branch scope, PR class matches review style.

The failure modes described in the previous sections (spec collision, AGENTS.md drift, context poisoning, drift amplification) are not speculative. They are the team-scale versions of failure modes that individual developers encounter and that have been documented in the published literature since 2025.

*Sources: ThoughtWorks, Technology Radar Vol 34, April 2026. Rick Hightower, ["Agentic Coding: GSD vs Spec Kit vs OpenSpec vs Taskmaster AI"](https://medium.com/@richardhightower/agentic-coding-gsd-vs-spec-kit-vs-openspec-vs-taskmaster-ai-where-sdd-tools-diverge-0414dcb97e46), Medium, Feb 27, 2026.*

## What has patterns but not consensus

Multi-team coordination via shared ADR repositories is practiced in organizations with mature architecture review cultures. It is not yet standardized: the directory structure, contribution process, and instruction format for how agents consume shared architecture docs varies by organization. The pattern is clear; the form it takes is not.

Inner source for `.agents/` libraries follows well-understood inner source mechanics. What is not standardized is versioning: when a shared skill file changes, how do dependent teams know? How do they test the skill against their own codebase before adopting the update? Package management for agent instruction files does not yet exist in any recognizable form.

Multi-LLM critique (using a second model to review a spec before implementation) is practiced ad hoc but not codified as a standard review step. Which models to use, how to structure the critique prompt, and how to weight the critique output against the developer's judgment are still matters of individual preference.

The "delegate, review, own" loop describes real practice. Whether it becomes the standard workflow, and what tooling emerges to support it, is being determined in 2026.

*Sources: Rick Hightower, ["Agentic Coding: GSD vs Spec Kit vs OpenSpec vs Taskmaster AI"](https://medium.com/@richardhightower/agentic-coding-gsd-vs-spec-kit-vs-openspec-vs-taskmaster-ai-where-sdd-tools-diverge-0414dcb97e46), Medium, Feb 27, 2026. ThoughtWorks, Technology Radar Vol 34, April 2026.*

## What is genuinely open

Multi-repo planning remains a gap across every SDD framework reviewed for this book. When a single feature requires coordinated changes to three repositories, the spec-driven workflow requires human coordination at points where the single-repo workflow does not. OpenSpec's roadmap acknowledges this; so does SpecKit's. The problem is named; the solution is not.

Agent-to-agent handoff, where one agent completes a spec and hands the change folder to a different agent for implementation (possibly across session boundaries), is experimentally described by Yegge's Agent Fleets framing but not yet practiced in any consistent form. The tooling does not yet support reliable agent memory across session boundaries in a way that makes handoff predictable.

Governance without bureaucracy is the aspiration that no framework has yet delivered at scale. The practices described here are voluntary and pull-based. Teams adopt them because they work, not because a governance committee mandates them. What happens when a large organization needs cross-team consistency and has mixed adoption? The existing answer is "social pressure and champions." That is not a satisfying answer for an organization of two hundred developers.

## The honest bar for this book

The bar this book applies to itself is the same bar it applies to any claim: strong where the evidence is strong, labeled where it is synthesis, time-bounded where the practice is evolving.

The individual practices (Foundation, AI Instructions, Spec-Driven Development, Quality) meet a higher bar than the team practices. They are described with specificity because they have been practiced and observed with specificity. The team practices meet a lower bar by honest acknowledgment: they are directionally correct, they follow from the individual practices logically, and they are consistent with what the SDD community is building toward. Some of them will look different in two years.

ThoughtWorks Radar Vol 34 (April 2026) described the current SDD landscape as fragmented: multiple frameworks with different trade-offs, no dominant approach, significant experimentation still underway. That assessment matches what this book found. The individual-developer story is substantially complete; the team and organization story is not.

That is an accurate description of where agentic software engineering was in mid-2026.

*Sources: ThoughtWorks, Technology Radar Vol 34, April 2026. Steve Yegge, ["Revenge of the junior developer"](https://sourcegraph.com/blog/revenge-of-the-junior-developer), Sourcegraph blog, Mar 22, 2025.*
