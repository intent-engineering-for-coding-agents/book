# Glossary

Sorted alphabetically. Each entry expands the term and gives the definition this book uses.

## AC ID (Acceptance Criterion ID)

A stable, bracketed identifier (format `[PREFIX-NNN]`, e.g. `[GV-001]`, `[AUTH-014]`) attached to each acceptance scenario in a spec. Prefix is 2–4 letters from the component abbreviation so the component is immediately recognisable. Numbers are monotone: deleted IDs leave a permanent gap and are never reused. Tests carry the ID as a framework tag (e.g. JUnit `@Tag("GV-001")`), producing traceability from spec to proof. An ASE convention layered on top of OpenSpec; OpenSpec itself prescribes no ID format. See [AC IDs and Positive/Negative Coverage](/quality/ac-ids-coverage).

## AC registry

A file (`test/ac-registry.md` by convention) that maintains one row per component: prefix, component name, and next available number. Allocate IDs from this file; increment the counter atomically with the new scenario. Prevents prefix overlap and ID reuse. See [AC IDs and Positive/Negative Coverage](/quality/ac-ids-coverage).

## ADLC (Agentic Development Lifecycle)

The discipline of building AI agents *as products*: reasoning loops, evals, hallucination budgets, runtime governance (boundaries, policies, escalation paths). Distinct from ASE, where the agent is the worker rather than the product being shipped. See [Introduction](/introduction).

## ADR (Architectural Decision Record)

A document recording a single architectural decision: context, options considered, decision, consequences. The recorded decision is immutable once closed (reversing a decision creates a new ADR that references the old one), though status updates and cross-references can still be edited. Originated in Michael Nygard's 2011 post; the structured-Markdown variant used in this book is MADR. See [Document Types](/foundation/document-types).

## AGENTS.md

The canonical entry point for an AI coding agent at the root of a repository. Acts as a table of contents: short, links to detailed instruction files, points the agent at the architecture overview. Documented at agents.md.

## Agentic Software Engineering (ASE)

The framework this book describes. A set of practices that progressively make an AI coding agent less clueless about a system and the intent behind it. Organised around four topics: Foundation, AI Instructions, Spec-Driven Development, Quality and Verification.

## Brownfield

A codebase that predates ASE practices: typically years of code, undocumented decisions, business rules that exist only in institutional memory. Brownfield repos cannot adopt ASE from intent the way greenfield ones can; they bootstrap with `skeleton.md`. See [Brownfield vs Greenfield](/foundation/brownfield-vs-greenfield).

## BFF (Backend for Frontend)

An intermediate service layer that sits between front-end clients and back-end services. The BFF provides a client-specific API (aggregating, transforming, and authorizing calls) so the front-end does not talk directly to back-end services. When using OpenSpec in a multi-tier system, each tier (front-end, BFF, back-end) has its own `openspec/` directory. Cross-tier contracts are recorded in ADRs. See [OpenSpec Across Stacks](/team/openspec-across-stacks).

## BYOK (Bring Your Own Key)

A design principle where the tool uses the caller's AI provider credentials rather than supplying its own. `ase-cli`'s AI-assisted checks use BYOK via MCP: the user's agent connects to the MCP server and runs the checks using its own model access. The tool never touches API keys directly.

## Capability-class agent

A CLI agent that combines a thinking model, real tool use, and a plan or architect mode. The book targets this class specifically: Claude Sonnet/Opus 4+, Codex/GPT 5.4+, OpenCode + Deepseek 4 Pro, Junie CLI. IDE-only assistants and completion-only tools are out of scope.

## CSRF (Cross-Site Request Forgery)

A web attack class in which an authenticated user's browser is induced to submit an unintended request to a site they are logged into. Defended against with CSRF tokens, same-site cookies, or origin checks. Listed in [Security in Depth](/quality/security-in-depth).

## CVE (Common Vulnerabilities and Exposures)

A public catalogue of disclosed security flaws in software, each with a unique identifier (e.g. `CVE-2026-12345`). Dependency scanners flag direct and transitive dependencies that include packages with open CVEs. See [Security in Depth](/quality/security-in-depth).

## Cognitive debt

The AI-era analogue to technical debt: undocumented decisions and assumptions that humans hold implicitly but agents cannot read. Coined by ThoughtWorks Technology Radar Vol 34 (April 2026). See [Why Structure Matters](/foundation/why-structure).

## Greenfield

A new codebase, or one being built from explicit intent. Greenfield ASE adoption assumes you can author `AGENTS.md`, ADRs, and specs from requirements, not from reverse-engineering existing code.

## Golden test

A fixed, repeatable task with a known good output, used to detect regressions when something upstream changes. In this book, applied both to code (a stable input with an expected output) and to agent setups (a fixed task with structural properties the agent's output should satisfy). See [Agent Evaluation and Regression](/quality/agent-evaluation).

## LeanSpec

A lightweight spec-driven development framework focused on small, focused specs (lean-spec.dev). Source for the small-spec discipline this book inherits.

## MADR (Markdown Architectural Decision Record)

A specific Markdown template for ADRs developed by Oliver Kopp, Anita Armbruster, and Olaf Zimmermann (2018). Used in `docs/decisions/` throughout this book. The structure (context, options, decision, consequences) makes ADRs scan-readable and machine-parseable.

## MCP (Model Context Protocol)

The standard agent-tool bridge protocol (modelcontextprotocol.io). Used in this book by `ase-cli` to expose AI-assisted checks via the user's own AI agent (BYOK: bring your own key).

## Mutation testing

A technique that introduces small, semantics-changing edits (mutations) into the code under test and re-runs the test suite. A surviving mutation indicates a gap: the suite did not detect a wrong implementation. The kill rate is a feedback control on whether tests are proof or decoration. See [Tests as Proof, Not Ritual](/quality/tests-as-proof).

## OWASP (Open Worldwide Application Security Project)

A non-profit foundation publishing community-driven security resources for web applications. Best known for the OWASP Top 10, the ten most prevalent web application vulnerability classes. Used in this book as the after-gate review checklist. See [Security in Depth](/quality/security-in-depth).

## OpenSpec

A spec-driven-development framework (openspec.dev) built around a change-folder pattern: proposal, delta spec, design, tasks, archive. The book uses OpenSpec end-to-end; `ase-cli` is built with it.

## skeleton.md

An AI-generated structural map of an existing codebase: modules, dependencies, data flow, business-rule outline, C4-style views. The brownfield bootstrap artefact. See [Brownfield vs Greenfield](/foundation/brownfield-vs-greenfield).

## Spec

In this book's sense: the canonical specification of system behaviour. Acceptance criteria, scenarios, test definitions. Lives under `openspec/`, written before implementation, archived after. Distinct from a design doc (which describes the approach) and an ADR (which records a decision).

## SDD (Spec-Driven Development)

The practice of writing intent as structured, acceptance-criterion-tagged specifications before implementation. Specs are scoped to one change, archived after merge, and treated as the durable artefact from which code is generated. One of the four topics in ASE. See [Spec-Driven Development](/spec-driven/).

## Test-type field

A `Test-type:` line placed in a spec scenario before the WHEN/THEN block, naming the category of test that proves the scenario (e.g. `unit`, `integration`, `e2e`). Captures the intended test level at spec-authoring time so the agent generates the right kind of test. Resolved against the project's test strategy document at implementation time. See [AC IDs and Positive/Negative Coverage](/quality/ac-ids-coverage).

## TBD (Trunk-Based Development)

A source-control discipline in which all developers commit to a single trunk branch frequently, using short-lived feature branches (often less than a day) and avoiding long-running parallel branches. Canonical reference: Paul Hammant, trunkbaseddevelopment.com. In the ASE context, an OpenSpec change folder maps onto one or two short-lived branches that carry its name: a spec branch followed by an implementation branch for decision-heavy changes, or a single branch when the intent is visible in the diff. See [PR Taxonomy](/quality/pr-taxonomy) and [Trunk-Based Development with Agents](/team/trunk-based-development).

## TOC pattern

The table-of-contents approach to writing `AGENTS.md`: a short file at the repo root that names the project, links to instruction files in `.agents/instructions/` each with a clause saying when to load it, and lists available commands and skills. Contrast with loading all context into a single long file, which exhausts the token budget before the agent starts. Named by AgentPatterns.ai. See [AGENTS.md: One File Changes Everything](/ai-instructions/agents-md).

## Walking skeleton

A thin end-to-end implementation built forward to prove an architecture works. From Alistair Cockburn's *Crystal Clear* (2004). Etymological ancestor of the AI-era `skeleton.md`, which reverses the direction by extracting the skeleton from existing code rather than building one forward.
