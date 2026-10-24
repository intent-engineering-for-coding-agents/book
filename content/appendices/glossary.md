---
type: appendix
title: Glossary
---

# Glossary

Definitions follow this book's usage. Entries identify book conventions explicitly and link to chapters for workflow details. Dates on living sources record when the cited definition was checked.

## AC ID (Acceptance Criterion ID)

A stable identifier linking an acceptance scenario to its tests, such as `[AUTH-014]`. In this book's convention, a component prefix and an increasing number identify the scenario, and retired IDs are never reused. See [AC IDs and Coverage](/quality/ac-ids-coverage).

## AC registry

This book's allocation record for AC IDs, conventionally `tests/ac-registry.md`. Each row records a component, its prefix, and the highest number used. See [AC IDs and Coverage](/quality/ac-ids-coverage).

## ADLC (Agentic Development Lifecycle)

A lifecycle for developing and operating AI agents as products, in EPAM's usage. This book uses the same meaning when distinguishing agent development from software development assisted by agents. See [Introduction](/introduction).

*Sources: EPAM, "Agentic Development Lifecycle (ADLC): A New Model for AI Systems Beyond SDLC" (reviewed October 21, 2026), vendor-authored agent-product lifecycle framing.*

## ADR (Architectural Decision Record)

A record of one architectural decision, its context, and its consequences. Following Michael Nygard's approach, a later ADR supersedes a reversed decision while preserving the earlier rationale. See [Document Types](/foundation/document-types).

*Sources: Michael Nygard, "Documenting Architecture Decisions" (November 15, 2011), decision-record structure and supersession.*

## Agent instructions

This book's collective term for `AGENTS.md`, instruction files, and skills in the `.agents/` hub. See [Agent Instructions](/agent-instructions/).

## Agentic Software Engineering (ASE)

This book uses ASE for software engineering with coding agents participating in implementation and verification. Intent Engineering addresses the context, specifications, and evidence used to direct their work.

## AGENTS.md

A Markdown file providing project instructions to coding agents. This book uses the root file as a short index into `.agents/`, while the format also supports instructions directly in the file and additional files in subdirectories. See [AGENTS.md: The Entry Point](/agent-instructions/agents-md).

*Sources: [AGENTS.md](https://agents.md/) (reviewed October 21, 2026), instruction-file format and directory scope. The index layout is this book's convention.*

## Analysis document

This book's document for investigating an open question in `docs/analysis/`. Records evidence and distinguishes observed findings from inference, with status `active` during investigation and `concluded` when findings freeze. See [Document Types](/foundation/document-types).

## Behavior-Driven Development (BDD)

A collaborative development practice using concrete examples to establish expected behavior before implementation and guide automated checks. This book borrows scenario notation from BDD without requiring a Cucumber runtime. See [Gherkin](#gherkin) and [The Spectrum](/spec-driven/the-spectrum).

*Sources: Dan North, "Introducing BDD" (originally published March 2006), behavior-first development. Cucumber, "Behaviour-Driven Development" (reviewed October 21, 2026), collaboration around examples from discovery through implementation.*

## BFF (Backend for Frontend)

A backend service tailored to a particular frontend, exposing the API its client needs and coordinating calls to downstream services. See [OpenSpec Across Stacks](/team/openspec-across-stacks).

*Sources: Sam Newman, "Backends For Frontends" (reviewed October 21, 2026), client-specific backend pattern.*

## Brownfield

An existing codebase whose implementation constrains the next change. This book's brownfield adoption path starts by extracting and validating existing behavior and decisions. See [Brownfield vs Greenfield](/foundation/brownfield-vs-greenfield).

## BYOK (Bring Your Own Key)

In model tooling, an arrangement where the user supplies model-provider credentials. The companion design uses the term more loosely for reusing the developer's existing agent and model access. See [MCP](#mcp-model-context-protocol) for the separate connection protocol.

*Sources: OpenRouter, "BYOK" (reviewed October 21, 2026), user-supplied provider keys. Companion repository, ADR-0004 (reviewed October 21, 2026), the broader bring-your-own-agent design usage.*

## Capability-class agent

This book's term for a coding agent with reasoning, planning, tool use, and file editing sufficient to carry out a development task. See [Tooling Landscape](/appendices/tooling-landscape) for workflow selection questions.

## Change folder

An OpenSpec directory under `openspec/changes/` holding the artifacts for one proposed change. This book uses `proposal.md`, delta specs, `tasks.md`, and optional `design.md`, and archives the folder after verification and integration. In the author's team workflow, one ticket maps to one change proposal. See [Spec Lifecycle](/spec-driven/spec-lifecycle).

*Sources: Fission AI, OpenSpec "Concepts" (reviewed October 21, 2026), change directories and artifacts. Archiving after merge is this book's lifecycle rule.*

## Cognitive debt

The gap between a system's implementation and developers' understanding of how and why the system works. Thoughtworks' April 2026 Radar warns of this gap growing as AI generates more code. See [Why Structure Matters](/foundation/why-structure).

*Sources: Thoughtworks Technology Radar Vol 34 and its release announcement (April 15, 2026), cognitive debt as a gap in developer understanding.*

## Context engineering

Selecting and maintaining the information available to a model during a task, including instructions, retrieved files, tool definitions, and conversation history. This book applies context engineering to repository knowledge and agent instructions. See [The Human-Agent Engineering Mindset](/mindset).

*Sources: Birgitta Böckeler, "Context Engineering for Coding Agents" (February 5, 2026), configuring context for coding-agent tasks.*

## Context poisoning

This book uses the term for incorrect or stale context steering an agent toward the wrong implementation, such as a superseded API contract loaded as current guidance. See [When Intent Engineering Fails](/foundation/when-intent-engineering-fails).

## CSRF (Cross-Site Request Forgery)

An attack inducing a browser to send an unwanted request using the victim's existing authentication. Defenses include anti-CSRF tokens and origin validation, with `SameSite` cookies providing additional protection.

*Sources: OWASP, "Cross-Site Request Forgery Prevention Cheat Sheet" (reviewed October 21, 2026), attack mechanism and layered defenses.*

## CVE (Common Vulnerabilities and Exposures)

A program identifying and cataloging publicly disclosed cybersecurity vulnerabilities. A CVE ID names a vulnerability, regardless of whether a particular installation is affected or a fix exists.

*Sources: CVE Program, "About CVE" (reviewed October 21, 2026), vulnerability identification and cataloging.*

## Dead spec

This book's term for a completed, abandoned, or superseded change left among active specs. In OpenSpec, the stale folder stays under `openspec/changes/`, where an agent risks reading obsolete intent as current work. See [Spec Lifecycle](/spec-driven/spec-lifecycle).

## Diff

The source-control changes shown for review. This book distinguishes the `code diff`, the changed code, from the `diff view`, the interface presenting those changes. See [Code Review for Agent-Generated Code](/team/code-review-agent-code).

## Engineering memory

This book's term for durable project knowledge available across development sessions: decisions, architecture and design docs, contracts, specs, and agent instructions. See [Intent Engineering and the SDLC](/foundation/intent-engineering-and-the-sdlc).

## Front matter

The metadata header at the start of a document. This book uses YAML between `---` markers to declare `type`, `title`, and lifecycle `status` where applicable. See [Plain-Text-as-Code](/foundation/plain-text-as-code#front-matter-as-a-contract).

## Gherkin

Cucumber's language for describing behavior through scenarios with `Given`, `When`, and `Then` steps. This book uses a Markdown adaptation with `#### Scenario:` headings and `WHEN/THEN` clauses, rather than executable `.feature` files. See [The Spectrum](/spec-driven/the-spectrum).

*Sources: Cucumber, "Gherkin reference" (reviewed October 21, 2026), scenario language. Fission AI, OpenSpec "Concepts" (reviewed October 21, 2026), Markdown scenario structure.*

## Golden test

A regression check comparing output from a fixed input against an approved reference. For a practical check after changing agent guidance, see [Testing whether your instructions work](/agent-instructions/instructions-that-work#testing-whether-your-instructions-work).

## Greenfield

A new implementation without an existing codebase to preserve. This book's greenfield adoption path records requirements and decisions directly, before implementation. See [Brownfield vs Greenfield](/foundation/brownfield-vs-greenfield).

## GSD (Get Shit Done)

A named system for context engineering and spec-driven development with coding agents. As checked in October 2026, the original repository directs users to [GSD Core](https://github.com/open-gsd/gsd-core). See [The Spectrum](/spec-driven/the-spectrum).

*Sources: [GSD repository](https://github.com/gsd-build/get-shit-done) and its README (reviewed October 21, 2026), project identity and move to GSD Core.*

## Hook

A command or script invoked by an event. Git's `pre-commit` hook is one example.

*Sources: Git, "githooks" documentation, event-triggered scripts and the `pre-commit` event.*

## `iec`

Intent Engineering Checker, the book's companion CLI and worked repository. Demonstrates checks for documentation structure, decision records, AC ID traceability, and spec lifecycle. See [Companion Repo](/appendices/companion-repo).

*Sources: [Companion repository](https://github.com/intent-engineering-for-coding-agents/cli) (reviewed October 21, 2026), CLI scope and worked conventions.*

## Inner source

Applying open-source collaboration practices to software shared within an organization. This book extends the approach to shared agent instructions and skills. See [Cross-Team Coordination](/team/cross-team-coordination).

*Sources: InnerSource Commons, "What is InnerSource?" (reviewed October 21, 2026), internal open collaboration. Applying the approach to `.agents/` libraries is book synthesis.*

## Intent

What the developer wants an agent to build or decide, including constraints on the result. This book distinguishes change-specific intent in specs from durable intent in decisions and conventions. See [Intent Engineering](#intent-engineering).

## Intent Engineering

This book's discipline for directing coding agents through maintained project context, instructions, change-specific specs, and evidence reviewed against intent. See [Introduction](/introduction).

## LeanSpec

A spec methodology and toolset emphasizing short, focused specifications maintained alongside implementation. This book draws on its small-spec discipline. See [The Spectrum](/spec-driven/the-spectrum).

*Sources: [LeanSpec](https://www.lean-spec.dev/) (reviewed October 21, 2026), concise specs and adaptive specification workflow.*

## LLM (Large Language Model)

A language model trained on large amounts of data to process and generate text. In this book, the LLM supplies the language and reasoning component of a coding agent.

## Load clause

This book's term for an instruction stating when an agent should read a file, such as "Load when working on database migrations". See [AGENTS.md: The Entry Point](/agent-instructions/agents-md).

## MADR (Markdown Architectural Decision Record)

A Markdown template for ADRs, documented by Oliver Kopp, Anita Armbruster, and Olaf Zimmermann in 2018. This book uses its context, options, decision, and consequences structure in `docs/decisions/`.

*Sources: Kopp, Armbruster, Zimmermann, "Markdown Architectural Decision Records: Format and Tool Support" (2018), MADR format.*

## MCP (Model Context Protocol)

A protocol connecting AI applications to servers exposing tools, resources, and prompts. MCP defines the connection and exchange format, independently of the model credentials the application uses.

*Sources: Model Context Protocol, "Architecture overview" (reviewed October 21, 2026), client-server roles, exposed primitives, and protocol scope.*

## Mutation testing

Evaluating tests by introducing small changes to the code and checking whether tests fail. A surviving mutant warrants investigation: the tests missed the change, or the mutation preserved observable behavior. See [Tests as Evidence, Not Ritual](/quality/tests-as-evidence).

*Sources: Yue Jia and Mark Harman, "An Analysis and Survey of the Development of Mutation Testing" (2011), mutants, detection, and equivalent mutations.*

## OpenSpec

A spec-driven development framework organizing proposed changes as delta specs alongside proposal, design, and task artifacts. Its archive workflow merges deltas into `openspec/specs/` and preserves change folders under `openspec/changes/archive/`. See [Spec Lifecycle](/spec-driven/spec-lifecycle).

*Sources: Fission AI, OpenSpec "Concepts" (reviewed October 21, 2026), delta specs and archive workflow.*

## OWASP (Open Worldwide Application Security Project)

A nonprofit foundation supporting open application-security resources. Its Top 10 is an awareness document covering critical web application security risks.

*Sources: OWASP and "OWASP Top 10" (reviewed October 21, 2026), foundation role and Top 10 scope.*

## Prompt engineering

Designing prompts to guide a model's responses. This book treats prompt wording as one technique within the wider Intent Engineering workflow. See [Introduction](/introduction#why-this-is-more-than-prompt-engineering).

## SDD (Spec-Driven Development)

Using explicit specifications to guide implementation and verify the result. This book adds change-sized scope, stable AC IDs, and a review-and-archive lifecycle. See [Spec-Driven Development](/spec-driven/).

## skeleton.md

This book's bootstrap map of an existing codebase, drafted by an agent and validated by developers. Stable findings move into maintained architecture, design, and decision documents. See [Brownfield vs Greenfield](/foundation/brownfield-vs-greenfield).

## Skill

A reusable procedure describing what the agent should load, do, and produce. This book stores skill procedures under `.agents/skills/` and lists their loading conditions in the agent instructions. See [Agent Instruction Hub](/agent-instructions/instruction-hub#skills).

## Spec

A specification of expected system behavior, expressed here through requirements and acceptance scenarios. In this book's OpenSpec workflow, change specs describe deltas, while `openspec/specs/` holds the canonical behavior after synchronization. See [Spec Lifecycle](/spec-driven/spec-lifecycle).

*Sources: Fission AI, OpenSpec "Concepts" (reviewed October 21, 2026), distinction between delta and main specs.*

## `tasks.md`

The implementation checklist in this book's OpenSpec change folders. Tracks steps to complete the change, with acceptance behavior defined in the accompanying specs. See [Document Types](/foundation/document-types).

*Sources: Fission AI, OpenSpec "Concepts" (reviewed October 21, 2026), task artifact and completion tracking.*

## TBD (Trunk-Based Development)

A branching model where developers integrate frequently into one shared trunk and avoid long-lived development branches. Short-lived feature branches are compatible with the model. See [Trunk-Based Development with Agents](/team/trunk-based-development).

*Sources: Paul Hammant, trunkbaseddevelopment.com (reviewed October 21, 2026), shared trunk and short-lived branches.*

## Test-type field

This book's `Test-type:` annotation in an acceptance scenario, naming the intended test category, such as `Integration`. The agent resolves the category against the project's test strategy when implementing tests. See [AC IDs and Coverage](/quality/ac-ids-coverage).

## TOC pattern

The table-of-contents layout this book uses for `AGENTS.md`: a short entry file linking to detailed instructions with load clauses. See [AGENTS.md: The Entry Point](/agent-instructions/agents-md).

## Walking skeleton

A minimal end-to-end implementation connecting the main architectural components to exercise a complete path. Alistair Cockburn describes the pattern as a starting point for evolving architecture and functionality together. See [skeleton.md](#skeleton-md) for this book's separate codebase-mapping artifact.

*Sources: Alistair Cockburn, walking-skeleton definition restated in his LinkedIn post (reviewed October 21, 2026), minimal end-to-end implementation and architectural evolution.*
