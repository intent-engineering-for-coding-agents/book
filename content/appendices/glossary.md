# Glossary

Sorted alphabetically. Each entry expands the term and gives the definition this book uses.

## AC ID (Acceptance Criterion ID)

A stable, bracketed identifier (format `[PREFIX-NNN]`, e.g. `[GV-001]`, `[AUTH-014]`) attached to each acceptance scenario in a spec. Prefix is 2-4 letters from the component abbreviation so the component is immediately recognizable. Numbers are monotone: deleted IDs leave a permanent gap and are never reused. Tests carry the ID as a framework tag (e.g. JUnit `@Tag("GV-001")`), producing traceability from spec to proof. This is an Intent Engineering convention layered on top of OpenSpec. OpenSpec itself prescribes no ID format. See [AC IDs and Coverage](/quality/ac-ids-coverage).

## AC registry

A file (`test/ac-registry.md` by convention) that maintains one row per component: prefix, component name, and next available number. Allocate IDs from this file. Increment the counter atomically with the new scenario. Prevents prefix overlap and ID reuse. See [AC IDs and Coverage](/quality/ac-ids-coverage).

## ADLC (Agentic Development Lifecycle)

The discipline of building agents as products: reasoning loops, evals, hallucination budgets, runtime governance (boundaries, policies, escalation paths). Distinct from Intent Engineering, where the agent is the worker rather than the product being shipped. See [Introduction](/introduction).

## ADR (Architectural Decision Record)

A document recording a single architectural decision: context, options considered, decision, consequences. The recorded decision is immutable once accepted. Reversing a decision creates a new ADR that supersedes the old one, though status updates and cross-references remain editable. The practice originated in Michael Nygard's 2011 post. The structured-Markdown variant used in this book is MADR. See [Document Types](/foundation/document-types).

## Agent instructions

This book's term for the full instruction set the agent loads: `AGENTS.md` (the entry-point file) and the `.agents/` hub it points into (instruction files, skills, and hooks). The entry point is a table of contents. The content lives in `.agents/`. "Agent instructions" refers to both together. See [Agent Instructions](/agent-instructions/).

## AGENTS.md

The de-facto entry point for a coding agent at the root of a repository as of the May 2026 snapshot of [agents.md](https://agents.md/). Acts as a table of contents: short, links to detailed instruction files, points the agent at the architecture overview.

## Agentic Software Engineering (ASE)

The broader discipline of building software with coding agents as active participants in the development process. Intent Engineering sits within agentic software engineering as the specific practice of directing agents by engineering intent rather than writing code.

## Behavior-Driven Development (BDD)

The collaboration practice Gherkin's `Given/When/Then` notation came from: scenarios written with business stakeholders, then bound to step definitions that a tool such as Cucumber executes. This book borrows the notation, not the practice. Its scenarios carry no step-definition layer and no Cucumber runtime, and they are authored before the code exists and compiled to tests by the agent rather than written against code that already runs. See [Gherkin](#gherkin) and [The Spectrum](/spec-driven/the-spectrum).

## Brownfield

A codebase that predates Intent Engineering practices: typically years of code, undocumented decisions, business rules that exist only in institutional memory. Brownfield repos cannot adopt Intent Engineering from intent the way greenfield ones do. They bootstrap with `skeleton.md`. See [Brownfield vs Greenfield](/foundation/brownfield-vs-greenfield).

## BFF (Backend for Frontend)

An intermediate service layer that sits between front-end clients and back-end services. The BFF provides a client-specific API (aggregating, transforming, and authorizing calls) so the front-end does not talk directly to back-end services. When using OpenSpec in a multi-tier system, each tier (front-end, BFF, back-end) has its own `openspec/` directory. Cross-tier contracts are recorded in ADRs. See [OpenSpec Across Stacks](/team/openspec-across-stacks).

## BYOK (Bring Your Own Key)

A design principle where the tool uses the caller's model provider credentials rather than supplying its own. In the `iec` design, agent-assisted checks use BYOK via MCP: the user's agent connects to the MCP server and runs checks using its own model access. The tool never touches API keys directly.

## Capability-class agent

A coding agent that combines a thinking model, real tool use, and a plan or architect mode. The book targets this class specifically. As of mid-2026, examples in this book include Claude Code with Claude Sonnet 4.5, Codex CLI with GPT-5.2, GitHub Copilot's coding agent with a comparable frontier model, OpenCode, and Junie. Newer models of similar or higher capability stay in scope. Completion-only tools are out of scope.

## Change folder

The unit of work in OpenSpec: a directory under `openspec/changes/` named with a slug matching the branch. Contains `proposal.md`, delta specs under `specs/`, `tasks.md`, and optionally `design.md`. Moves to `openspec/changes/archive/` when the PR merges. See [Spec Lifecycle](/spec-driven/spec-lifecycle).

## CSRF (Cross-Site Request Forgery)

A web attack class in which an authenticated user's browser is induced to submit an unintended request to a site they are logged into. Defended against with CSRF tokens, same-site cookies, or origin checks. Listed in [What the Scanners Miss](/quality/what-the-scanners-miss).

## CVE (Common Vulnerabilities and Exposures)

A public catalog of disclosed security flaws in software, each with a unique identifier (e.g. `CVE-2026-12345`). Dependency scanners flag direct and transitive dependencies that include packages with open CVEs. See [What the Scanners Miss](/quality/what-the-scanners-miss).

## Cognitive debt

The agentic-era analogue to technical debt: undocumented decisions and assumptions that humans hold implicitly but agents cannot read. Coined by ThoughtWorks Technology Radar Vol 34 (April 2026). See [Why Structure Matters](/foundation/why-structure).

## Context engineering

The practice of deliberately controlling what enters a model's context window: instructions, retrieved files, tool definitions, conversation history, and other task-relevant information. In this book, context engineering covers part of the Foundation and Agent Instructions work, but not the full Intent Engineering loop of specs, proof, review, and durable decisions. See [The Human-Agent Engineering Mindset](/human-agent-engineering-mindset).

## Context poisoning

A failure mode in which stale, incorrect, or irrelevant documents loaded into the agent's context cause it to act on false premises. The agent treats provided context as authoritative, so an outdated architecture doc, a superseded spec, or wrong instruction files produce wrong output with apparent confidence. See [When Intent Engineering Fails](/foundation/when-intent-engineering-fails).

## Dead spec

An un-archived OpenSpec change folder still sitting in `openspec/changes/`, marked in-flight, for a change that was implemented, abandoned, or pivoted away from. The agent loads it as current intent and acts on instructions that no longer apply. An un-archived spec is a live instruction, not a historical record. See [Spec Lifecycle](/spec-driven/spec-lifecycle).

## Engineering memory

The durable repo context developers and coding agents read before the next change: ADRs, architecture overview, design docs, diagrams, specs, contracts, README files, INDEX files, conventions, and agent instructions. ADRs record decisions inside engineering memory, but they are not the whole memory. See [Intent Engineering and the SDLC](/foundation/intent-engineering-and-the-sdlc).

## Gherkin

The `Given/When/Then` (here `WHEN/THEN`) scenario notation from Cucumber, used in this book as a specification language for acceptance criteria, one scenario per behavior. OpenSpec prescribes the `#### Scenario:` heading and the `WHEN/THEN` body. The notation is borrowed; the [BDD](#behavior-driven-development-bdd) practice it originates from is not. See [The Spectrum](/spec-driven/the-spectrum) and [AC IDs and Coverage](/quality/ac-ids-coverage).

## Greenfield

A new codebase, or one being built from explicit intent. Greenfield Intent Engineering adoption assumes you write `AGENTS.md`, ADRs, and specs from requirements, not from reverse-engineering existing code.

## Golden test

A fixed, repeatable task with a known good output, used to detect regressions when something upstream changes. In this book, applied both to code (a stable input with an expected output) and to agent setups (a fixed task with structural properties the agent's output should satisfy). See [Agent Evaluation and Regression](/quality/agent-evaluation).

## GSD (Get Shit Done)

The lightest structured point on the spec-driven spectrum: structured prompting without a framework. Write a concise intent document, run the agent, commit. It produces a usable artifact but no archive, task log, or traceability trail, which makes it the practical alternative for teams whose risk profile does not warrant OpenSpec's overhead. See [The Spectrum](/spec-driven/the-spectrum).

## Hook

A deterministic script wired to a file-system or session event (post-edit, pre-commit, etc.) that runs automatically, independent of agent memory. Hooks enforce rules the agent might otherwise forget to apply. Stored in `.agents/hooks/`. Distinct from skills (invocable on demand) and instruction files (advisory). See [Agent Instruction Hub](/agent-instructions/instruction-hub).

## `iec`

The companion CLI for this book (Intent Engineering Checker). Validates the structural conventions the book describes: `docs/` layout, ADR format (MADR), `AGENTS.md` presence, AC ID traceability, and spec lifecycle. The companion repo also records the MCP/BYOK design for agent-assisted checks. Source at github.com/intent-engineering-for-coding-agents/cli. See [Companion Repository](/appendices/companion-repo).

## Inner source

The practice of sharing `.agents/` skill and instruction files across team boundaries within an organization, using the same contribution and review patterns as shared libraries. Teams publish useful skills to a shared repository. Other teams pull from it. As of mid-2026, no widely-adopted standard exists for this pattern. See [Cross-Team Coordination](/team/cross-team-coordination).

## Intent

What a developer encodes for a coding agent to act on. In this book, intent takes two forms: per-change specs that state what to build right now (the immediate intention), and the permanent architectural decisions and coded conventions that constrain how anything gets built. See [Spec-Driven Development](/spec-driven/) for the per-change form. See [Foundation](/foundation/) and [Agent Instructions](/agent-instructions/) for the permanent substrate. See [Intent Engineering](#intent-engineering).

## Intent Engineering

The practice this book teaches. Within agentic software engineering, intent engineering is the discipline of directing coding agents by engineering well-structured intent rather than writing code directly. Context (Foundation, Agent Instructions) is the substrate that makes intent executable. Specs state the target. Verification proves the result. See [Introduction](/introduction).

## LeanSpec

A lightweight spec-driven development framework focused on small, focused specs (lean-spec.dev). Source for the small-spec discipline this book inherits.

## Load clause

A condition line in an instruction file (or in `AGENTS.md`) that states when the agent should load it: for example, "Load when working on database migrations" or "Load before writing any spec." The TOC pattern depends on load clauses to enable selective loading. Without them the agent has no basis for choosing what to read and either loads everything or nothing. See [AGENTS.md: The Entry Point](/agent-instructions/agents-md).

## MADR (Markdown Architectural Decision Record)

A specific Markdown template for ADRs developed by Oliver Kopp, Anita Armbruster, and Olaf Zimmermann (2018). Used in `docs/decisions/` throughout this book. The structure (context, options, decision, consequences) makes ADRs scan-readable and machine-parseable.

## MCP (Model Context Protocol)

The agent-tool bridge protocol documented at modelcontextprotocol.io. In this book, the `iec` design uses MCP to expose agent-assisted checks through the user's own coding agent (BYOK: bring your own key).

## Mutation testing

A technique that introduces small, semantics-changing edits (mutations) into the code under test and re-runs the test suite. A mutation that stays green indicates a gap: the suite did not detect a wrong implementation. The kill rate is a feedback control on whether tests are proof or decoration. See [Tests as Proof, Not Ritual](/quality/tests-as-proof).

## OWASP (Open Worldwide Application Security Project)

A non-profit foundation publishing community-driven security resources for web applications. Best known for the OWASP Top 10, the ten most prevalent web application vulnerability classes. Used in this book as the after-gate review checklist. See [What the Scanners Miss](/quality/what-the-scanners-miss).

## OpenSpec

A spec-driven-development framework (openspec.dev) built around a change-folder pattern: `proposal.md`, delta specs per capability under `specs/`, `tasks.md`, and optional `design.md`. On archive, delta specs are applied to the canonical `openspec/specs/` and the full change folder moves to `openspec/changes/archive/`. The book uses OpenSpec end-to-end. `iec` is built with it.

## Prompt engineering

The practice of shaping one prompt or instruction exchange so a model responds usefully. This book treats prompt engineering as a useful but too-small frame for production coding-agent work, where the harder problem is keeping repo context, specs, tests, and decisions aligned across sessions. See [The Human-Agent Engineering Mindset](/human-agent-engineering-mindset).

## skeleton.md

An agent-generated structural map of an existing codebase: modules, dependencies, data flow, business-rule outline, C4-style views. In this book, `skeleton.md` is the brownfield bootstrap map, not the file an agent should keep treating as current architecture forever. Its stable findings move into `docs/architecture/`, `docs/design/`, and `docs/decisions/`. After that, the skeleton becomes history or gets retired. See [Brownfield vs Greenfield](/foundation/brownfield-vs-greenfield).

## Skill

A named, reusable agent workflow stored as a Markdown file in `.agents/skills/`. Invocable via slash command (`/draft-section`) or an autonomous trigger in the agent instructions. A skill describes a multi-step procedure: what to load, what to do, what to produce. Distinct from an instruction file (standing rules) and a hook (fires automatically). See [Agent Instruction Hub](/agent-instructions/instruction-hub).

## Spec

In this book's sense: the canonical specification of system behavior. Acceptance criteria, scenarios, test definitions. Lives under `openspec/`, written before implementation, archived after. Distinct from a design doc (which describes the approach) and an ADR (which records a decision).

## SDD (Spec-Driven Development)

The practice of writing intent as structured, acceptance-criterion-tagged specifications before implementation. Specs are scoped to one change, archived after merge, and serve as the canonical acceptance criteria from which code is generated and against which it is proven. The durable source of truth for design is `docs/`, not the spec. One of the four topics in Intent Engineering. See [Spec-Driven Development](/spec-driven/).

## Test-type field

A `Test-type:` line placed in a spec scenario before the WHEN/THEN block, naming the category of test that proves the scenario (e.g. `unit`, `integration`, `e2e`). Captures the intended test level at spec-authoring time so the agent generates the right kind of test. Resolved against the project's test strategy document at implementation time. See [AC IDs and Coverage](/quality/ac-ids-coverage).

## `tasks.md`

A checklist file inside an OpenSpec change folder that lists the implementation steps for a change. The agent checks off tasks as it completes them. A change folder with unchecked tasks should not have a PR open. See [Document Types](/foundation/document-types).

## TBD (Trunk-Based Development)

A source-control discipline in which all developers commit to a single trunk branch frequently, using short-lived feature branches (often less than a day) and avoiding long-running parallel branches. Canonical reference: Paul Hammant, trunkbaseddevelopment.com. In the Intent Engineering context, an OpenSpec change folder maps onto one or two short-lived branches that carry its name: a spec branch followed by an implementation branch for decision-heavy changes, or a single branch when the intent is visible in the diff. See [PR Taxonomy](/quality/pr-taxonomy) and [Trunk-Based Development with Agents](/team/trunk-based-development).

## TOC pattern

The table-of-contents approach to writing `AGENTS.md`: a short file at the repo root that names the project, links to instruction files in `.agents/instructions/` each with a clause saying when to load it, and lists available commands and skills. Contrast with loading all context into a single long file, which exhausts the token budget before the agent starts. Named by AgentPatterns.ai. See [AGENTS.md: The Entry Point](/agent-instructions/agents-md).

## Walking skeleton

A thin end-to-end implementation built forward to prove an architecture works. From Alistair Cockburn's "Crystal Clear" (2004). Etymological ancestor of the agentic-era `skeleton.md`, which reverses the direction by extracting the skeleton from existing code rather than building one forward.
