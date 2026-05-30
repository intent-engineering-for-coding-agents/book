# ase-book — Site Design and Chapter Outlines

Part of [plan.md](plan.md). See also [plan-ase-cli.md](plan-ase-cli.md).

Chapter `*Sources:*` lines reference [references.md](references.md).

---

## The `ase-book` Book

### What it is

A VitePress site at `ase-book.dev`, deployed via GitHub Actions.
Written in Markdown. Mermaid diagrams. No vendor lock-in.

### VitePress conventions

- `srcDir: 'content'` — book prose lives in `content/`, not `docs/`
- `docs/` is reserved for ASE documentation (the repo dogfoods its own convention)
- Sidebar maps to chapter structure
- Mermaid plugin for diagrams
- GitHub Actions deploys to GitHub Pages (not the built-in `/docs` deploy)

### ase-book phases and tags

#### Phase M — Scaffold (`v0.0.1`)

- [x] Init repo under `ase-book/ase-book`
- [x] Apache 2.0 license
- [x] Init VitePress: `srcDir: 'content'`, Mermaid plugin, clean theme
- [x] GitHub Actions: build + deploy to GitHub Pages on push to `main`
- [x] Create canonical directory structure:
    - `docs/README.md` — stub
    - `docs/INDEX.md` — stub
    - `docs/decisions/` — empty
    - `docs/design/` — empty
    - `openspec/` — empty
    - `content/` — VitePress prose root (empty)
    - `AGENTS.md` — stub
- [x] Seed files: `idea.md`, `plan.md`, `principles.md`
- [x] Tag: `v0.0.1`

#### Phase N — ase-book Foundation (`v0.1.0`)

- [x] Write `docs/README.md` for the book site
    - VitePress as SSG, `content/` structure, Mermaid, Actions deploy
- [x] Write `docs/INDEX.md` — agent-facing map of all docs
- [x] Write ADRs:
    - ADR-0001: VitePress over alternatives (Hugo, Docusaurus, mdBook)
    - ADR-0002: `content/` for VitePress prose — frees `docs/` for ASE documentation
- [x] Wire `ase check` in CI on the book repo itself
- [x] Tag: `v0.1.0`

#### Phase O — ase-book AI Instructions (`v0.2.0`)

- [x] Write `AGENTS.md` for the book repo — TOC pattern
    - Role: book authoring agent
    - Content conventions, tone, audience
    - VitePress commands
- [x] Create `.agents/instructions/`:
    - `writing.md` — tone, structure, audience, formatting
    - `vitepress.md` — config, sidebar, Mermaid, deployment
    - `review.md` — how to review and critique draft content
    - `index-maintenance.md` — when creating/renaming/deleting files under `docs/`, update `INDEX.md`
- [x] Create `.agents/skills/`:
    - `draft-section` — draft a new section from outline
    - `review-chapter` — consistency, tone, DRY revi
    - `update-sidebar` — regenerate sidebar from file tree
    - `update-index` — scan `docs/`, regenerate all `INDEX.md` files
- [x] Tag: `v0.2.0`

#### Phase P — Write Foundation Chapters (`v0.3.0`)

Each chapter is an OpenSpec change proposal on the book repo.

- [x] Chapter: Why Structure Matters
    - *Sources: ThoughtWorks Technology Radar Vol 34 (cognitive debt).*
    - Compounding drift, before/after, structure as context
- [x] Chapter: Document Types
    - *Sources: Nygard 2011 (origin of ADRs); Kopp/Armbruster/Zimmermann 2018 (MADR template + paper); LeanSpec; OpenSpec. The split (README files + INDEX files + ADRs + design docs + specs) is this book's synthesis — closest published precedent is arc42.*
    - `docs/README.md` — architecture overview, renders on GitHub
    - `docs/INDEX.md` — agent-facing map, loaded first for context economy; README serves human browsers, INDEX serves the agent — same directory, different jobs, do not merge
    - ADRs: documents that manifest specific decisions (context, options considered, decision, consequences); the decision is immutable once closed; reversal = new ADR; supporting context (pros/cons, consequences, notes) may be updated in place — record an amendment at the bottom (date + WAS/NOW) so the edit is legible without git blame; introduce MADR (Markdown format by Kopp/Armbruster/Zimmermann 2018) at `docs/decisions/`
    - Design docs at `docs/design/`: matter of preference — write-and-forget OR keep current (minor changes: edit in place; major redesign: new doc, old stays for history); the discipline is consistency so the agent does not confuse a superseded design for the current one
    - Specs: manifestation of intent — acceptance criteria, scenarios, test definitions; also a task plan with checkboxes the agent works through (checkmarks force execution, prevent the agent skipping inconvenient steps); advise: instruct the agent (in AGENTS.md or the spec) to check off tasks immediately on completion — enables live progress visibility and safe interruption/resumption; written before implementation, archived after; un-archived spec is live instruction
    - Spec ≠ OpenSpec: OpenSpec is a framework managing specs through a change lifecycle; a `/specs` folder is the ad hoc alternative (common, lower ceremony, but no built-in archival prompt — dead specs accumulate)
    - Lifespans: permanent → temporary → disposable
    - Why conflating them corrupts both
    - Credit: ADRs — Michael Nygard (2011); MADR template — Oliver Kopp, Anita Armbruster, Olaf Zimmermann (2018)
- [x] Chapter: Plain-Text-as-Code
    - *Sources: Write the Docs "Docs as Code"; Mermaid; C4 model; Structurizr.*
    - Markdown, Mermaid, MADR as substrate
    - Git-diffable, vendor-independent, agent-readable
- [x] Chapter: The Map — ASE and the SDLC
    - *Sources: Farley *Modern Software Engineering*; continuousdelivery.com; Microsoft "An AI-led SDLC"; IBM "AI in SDLC".*
    - One-page diagram: SDLC phases → ASE touchpoints
    - ASE extends, does not replace
- [x] Chapter: Honest Maturity
    - *Sources: ThoughtWorks Radar adoption rings (Hold/Assess/Trial/Adopt) as lineage; CMM noted briefly to dismiss process-theatre framing.*
    - Practiced / documented / CI-enforced / target state
    - Maturity labels prevent process theatre
    - Lineage: rhymes with ThoughtWorks Radar's Hold/Assess/Trial/Adopt rings; this is staged-maturity-honesty, not CMM-style process compliance.
- [x] Chapter: Brownfield vs Greenfield — Bootstrap with skeleton.md
    - *Sources: Reversa (sandeco/reversa) — 5-phase legacy → spec pipeline for AI coding agents (Claude Code / Cursor / Codex); Schwab "AI as Your Legacy Code Archaeologist" (Caimito, Feb 7, 2026); Cockburn *Crystal Clear* (2004) — original "walking skeleton" lineage; Fujitsu Application Transform (Mar 2026) — industry-scale validation.*
    - Greenfield ASE assumes you can author AGENTS.md, ADRs, and specs from intent. Brownfield cannot — the intent is buried in years of code, dead comments, and tribal knowledge.
    - **`skeleton.md`** as the brownfield bootstrap artefact: an AI-generated structural map of an existing codebase (modules, dependencies, data flow, business-rule outline, C4 views) that seeds the agent's understanding before any new ASE work begins.
    - How to generate one: point a capability-class CLI agent at the legacy tree; ask for a structural skeleton, not a refactor. Iterate with a domain expert. Reversa is one toolchain that automates this end-to-end.
    - Why it's essential: most enterprise readers are in brownfield, not greenfield. Without a skeleton, the agent improvises against a system it doesn't understand and compounds drift.
    - Lineage note: Cockburn's "walking skeleton" (a thin end-to-end implementation, *Crystal Clear* 2004) is the etymology. The AI-era `skeleton.md` is a *reverse-engineered* map of an existing system, not a thin forward-built one. Same metaphor, different direction.
- [x] Chapter: When ASE Fails
    - *Sources: ThoughtWorks Radar Vol 34 (cognitive debt); Yegge "Revenge of the junior developer"; De Schryver "Keep Agentic AI Simple".*
    - Failure modes that survive even good foundation: AGENTS.md rot, dead specs, agent-accelerated tech debt, over-spec, drift with no detection.
    - Honest framing before the practices: ASE doesn't make your code perfect; it gives you the surface area to detect and recover. Each later topic aims a fix at one of these modes.
- [x] Throughout: reference `ase-cli` ADRs, specs, tags as evidence
- [x] Tag: `v0.3.0`

#### Phase Q — Write AI Instructions Chapters (`v0.4.0`)

- [x] Chapter: AGENTS.md — One File Changes Everything
    - *Sources: agents.md (de-facto spec); agentpatterns.ai "AGENTS.md as Project-Level README" (TOC pattern); Böckeler.*
    - TOC pattern, what goes in it, tool-agnostic
    - Credit: agentpatterns.ai (TOC pattern framing)
- [x] Chapter: From AGENTS.md to AI Instruction Hub
    - *Sources: agentpatterns.ai "Evaluating AGENTS.md"; Anthropic "Building effective agents" (Dec 2024).*
    - `.agents/instructions/`, `.agents/skills/`, `.agents/hooks/`
    - One folder for all AI tools
- [x] Chapter: Writing Instructions That Work
    - *Sources: Böckeler ("AI teammate" mental model); Anthropic "Building effective agents".*
    - Specific, negative instructions, architecture boundaries
    - Testing: how should the agent verify its own work?
- [x] Chapter: Skills, Commands, and Hooks
    - *Sources: Anthropic "Building effective agents"; ThoughtWorks Radar Vol 34 (harness engineering); Huntley "Everything is a Ralph Loop".*
    - Skills: agent-invoked workflows
    - Commands: user-triggered
    - Hooks: automated quality gates
    - Concrete example: `/update-index` skill — scans `docs/`, regenerates `INDEX.md`
    - Instructions prevent drift (`index-maintenance.md`), skills fix it when it happens
- [x] Chapter: Context Window Management
    - *Sources: Hightower SDD-tools comparison (Feb 2026); Anthropic "Building effective agents".*
    - Why context fills, small sessions > long conversations
    - Subagents, /compact, loading skills selectively
    - `INDEX.md` as context economy — agents load one 40-line file instead of 10×200-line files
- [x] Chapter: Failure Modes & Recovery
    - *Sources: Huntley "Everything is a Ralph Loop" (back-pressure engineering); De Schryver "Keep Agentic AI Simple"; ThoughtWorks Radar Vol 34 (cognitive debt).*
    - The taxonomy: drift (loses context mid-task), spin (loops on a sub-problem), halt (stops before done), hallucination (invents files/APIs), context poisoning (bad AGENTS.md compounds across sessions), tool misuse (wrong tool for the job).
    - Signs to watch for in each mode; recovery strategies; when to reset context vs when to redirect.
    - "The agent is not broken — it is clueless. Fix the context".
    - Maturity-honest: this is the most under-documented part of agentic engineering. The chapter says what the book asserts vs what it leaves open.
- [x] Chapter: Vendor Files That Point, Not Duplicate
    - *Sources: agents.md; agentpatterns.ai.*
    - `CLAUDE.md` → "See AGENTS.md"
    - `.github/copilot-instructions.md` → "See AGENTS.md"
    - `ase generate` — why generated files are pointers, not authored duplicates
    - Reference `ase-cli` implementation
- [x] Tag: `v0.4.0`

#### Phase R — Write Spec-Driven Chapters (`v0.5.0`)

- [x] Chapter: Why Specs?
    - *Sources: OpenSpec; GitHub Spec-Kit; LeanSpec; Hightower SDD-tools comparison.*
    - Drift, intent, traceability — the practical motivation for spec-first.
    - **[FLAG]** Address the waterfall objection directly: spec-before-code is not waterfall. Waterfall separates requirements from implementation across phases and teams with a handoff boundary. A change proposal is scoped to one PR, written by the same person who implements it, and iterated during review. The spec is not a contract; it is a pre-flight check.
- [x] Chapter: Why Small?
    - *Sources: LeanSpec; Anthropic "Building effective agents" (context engineering).*
    - Lean focus: an agent that finishes beats one that drifts. Specs over ~300 lines start losing the thread.
    - Context window economics — every token spent on a long spec is a token unavailable for code.
    - Credit: LeanSpec.
    - **[FLAG]** A spec is a change proposal scoped to one PR, not a requirements document. Changes emerge during implementation and PR review — the spec anchors intent, it does not freeze it. Small proposals mean real negotiation happens in the PR, where it belongs, not in a month-long spec review cycle.
- [x] Chapter: Why Important Stuff First?
    - *Sources: agentpatterns.ai (TOC pattern, top-down attention); Anthropic "Building effective agents".*
    - Agents read top-down and lose focus. If they read only the first 50 lines — would the spec still work?
    - Practical implication: constraints, non-goals, and risk-bearing requirements go at the top, not the bottom. The AI may never reach the rest.
    - Why this inverts conventional doc structure (which buries assumptions in appendices).
- [x] Chapter: The Spectrum
    - *Sources: Hightower "GSD vs Spec Kit vs OpenSpec vs Taskmaster" (Feb 2026); GitHub Blog "Spec-driven development with AI" (2025); LeanSpec; OpenSpec; Spec-Kit.*
    - Raw prompt → spec.md → OpenSpec → SpecKit
    - Match formality to risk
- [x] Chapter: Spec Lifecycle
    - *Sources: OpenSpec; GitHub Spec-Kit; Hightower.*
    - Write → critique → review → implement → archive
    - Multi-LLM critique
- [x] Chapter: Spec > Code
    - *Sources: OpenSpec; LeanSpec; Hightower SDD-tools comparison; Farley *Modern Software Engineering* (intent over artefact).*
    - The book's load-bearing thesis. **Specifications are more important than generated code.** The implementation is disposable; the canonical spec is the durable artefact.
    - Why this inverts the historical default: with agentic regeneration, code is downstream of spec — review intent before diff, specs outlive the codebase, agents regenerate code from spec, not the reverse.
    - The bar a spec must clear to earn this status: testable, AC-tagged, sized to be readable, scoped to one change.
    - The hardest mental shift in the whole book: stop treating code as the artefact, start treating it as the output.
- [x] Tag: `v0.5.0`

#### Phase S — Write Quality Chapters (`v0.6.0`)

- [x] Chapter: Tests as Proof, Not Ritual
    - *Sources: Farley *Modern Software Engineering*; ThoughtWorks Radar Vol 34 (mutation testing as feedback control).*
    - "Done" = approved intent has executable proof; executable proof covers all paths the code contains, not just the happy path
    - Positive tests are the floor: branches, return types, exceptions each require proof
    - Progression: happy path → error path → per branch → per exception class → boundaries
    - Tests as executable documentation: proof requirement makes the demo accurate
    - **[EXPAND]** Add test taxonomy table and complexity-to-minimum-test-count table (from new Test Strategy chapter)
- [x] Chapter: Agent Evaluation & Regression
    - *Sources: ThoughtWorks Radar Vol 34 (mutation testing as feedback control); Anthropic "Building effective agents"; Hightower SDD-tools comparison.*
    - Tests prove the *code* is right; this chapter proves the *agent setup* is right. Golden tests for an agent + AGENTS.md + skill stack: did this change make the agent better or worse — measured how.
    - A/B comparison of two AGENTS.md versions on a fixed task.
    - Regression detection when a skill or hook is updated.
    - The evidence base for the central claim: at agentic speeds, manual verification is not enough. This is the feedback loop that closes it.
- [x] Chapter: AC IDs + Positive/Negative Coverage
    - *Sources: Cucumber/Gherkin (briefly, as anchor); OpenSpec; ASE convention disclaimer (AC-IDs note); model2diagram ADR-0005.*
    - Stable IDs in bracket format `[PREFIX-NNN]`; prefix 2–4 letters from component abbreviation (e.g. `GV`, `AUTH`, `CONF`) so meaning is immediately clear; monotone counter
    - `Test-type:` field on its own line in the scenario, before WHEN/THEN — intent captured at design time
    - Mandatory `**Test:**` field
    - Dual `@Tag` on the test: one for AC ID, one for test type — traceability + CI filtering in one annotation
    - AC registry (`test/ac-registry.md` pattern): one row per component, prefix + next counter, commit atomically with new scenario
    - Happy-path-only is not proof
- [x] Chapter: Test Strategy and Convention
    - *Sources: model2diagram `docs/architecture/test-strategy.md`; model2diagram `test/scenario-template.md`; model2diagram `docs/decisions/0005-ac-id-and-test-type-convention.md`.*
    - The problem: the agent defaults to unit tests for everything; the team's convention is not visible unless it is written down
    - Test taxonomy: unit, slice, integration, interface/contract, acceptance, architectural, e2e, performance, manual — what each type proves at which boundary
    - Not every project uses all types; define the ones that apply and be explicit
    - The convention lives in `docs/architecture/test-strategy.md` (or equivalent) — frameworks per type, file locations, coverage thresholds; this document is what the agent reads
    - Scenario complexity tiers → minimum test count: simple (1+1), medium (2–3 + 2), complex (several + several)
    - The convention document belongs in the Before gate alongside the design system
- [x] Chapter: Before / During / After Checkpoints
    - *Sources: Anthropic "Building effective agents"; agentpatterns.ai.*
    - Before: architecture, AGENTS.md, design system, **test strategy document**
    - During: spec writing, hooks, context management
    - After: verification, refactoring, review
- [x] Chapter: Security in Depth
    - *Sources: OWASP Top 10; ThoughtWorks Radar Vol 34 (zero trust, sandboxed execution, prompt injection).*
    - Pattern replication — the agent copies broken auth patterns because it does not distinguish trusted from untested
    - Deference to the user on unsafe security decisions — the agent accepts any answer to "should I disable this check?"
    - The cleanup PR that removes a security control — each looked redundant, each was there for a reason
    - The agent as attack surface — prompt injection, compromised tool definitions, model weights
- [x] Chapter: PR Taxonomy
    - *Sources: Hammant trunkbaseddevelopment.com; Farley *Modern Software Engineering*.*
    - `docs`, `structural`, `behavior` — why mixing makes review harder
- [x] Chapter: .principles — Raising the Bar
    - *Sources: dot-principles repo; dot-principles example-catalog.*
    - dot-scout → dot-prime → code → dot-audit
    - Complements specs and tests, does not replace them
- [x] Tag: `v0.6.0`

#### Phase T — Write Team + Cross-Team Chapters (`v0.7.0`)

> **Framing:** anchor every chapter to a well-known SDLC primitive (TBD, PR review, sprint board, ADR) rather than inventing ASE-branded ceremonies. **Patterns, not prescription.** Adoption is pull, not push — the book describes what teams have made work, not what they must do.

- [x] Chapter: OpenSpec Across Stacks *(precedes bridge chapter; pairs with it)*
    - *Sources: Fission AI, OpenSpec; Framelink MCP for Figma (GLips/Figma-Context-MCP, 14.9k★ as of mid-2026). Multi-tier directory guidance is book synthesis.*
    - Front-end: the spec pattern is identical; what changes is the context the agent reads
    - Design system docs under `docs/design/` — component conventions, animation rules, accessibility requirements, state management patterns. What Figma captures visually, the design system doc captures as convention.
    - Figma via MCP: Framelink MCP lets agents fetch layout metadata, component structure, spacing, and colors from Figma files. Spec references the Figma frame link; the agent fetches design data during implementation. The spec focuses on behavior (states, validation, edge cases, loading/error/empty); MCP covers visuals. [PERISHABLE: MCP connector availability and quality are a mid-2026 snapshot.]
    - User flows and navigation logic belong in `docs/architecture/`, referenced by the spec
    - Multi-tier: one `openspec/` per stack (front-end, BFF, back-end), not one unified. A single `openspec/` across stacks gives the agent three codebases of context it doesn't need and three sets of canonical specs it shouldn't trust.
    - The integration contract — BFF API, event schema — lives in an ADR at `docs/decisions/`, referenced by specs in both stacks
    - When a change spans tiers (rare), each tier gets its own change folder referencing the same cross-cutting ADR
- [x] Chapter: OpenSpec in an Existing SDLC *(bridge chapter)*
    - *Sources: OpenSpec; Hightower "GSD vs Spec Kit vs OpenSpec vs Taskmaster" (delegate-review-own loop framing); Framelink MCP for Figma (GLips/Figma-Context-MCP).*
    - You don't need a new methodology — you need to know which existing slot each artifact fits in
    - Change folder ↔ ticket (Jira / Linear / GitHub Issue) — and when to skip the ticket entirely
    - User Story → Acceptance Criteria conversion: one Jira story maps to 1–N OpenSpec change folders. The story provides the why and what; the spec provides the testable how. The spec references the Jira issue ID for traceability.
    - Atlassian MCP: the agent fetches Jira story context and Confluence pages during spec drafting. The AGENTS.md should instruct the agent to check Jira for the linked story before writing.
    - Figma → spec handoff: paste the Figma frame link in the spec; the agent fetches design data via Framelink MCP. Spec covers behavior; MCP covers visuals. Cross-reference the OpenSpec Across Stacks chapter.
    - Spec delta ↔ PR review focus (review intent before diff)
    - `tasks.md` ↔ sprint board / kanban column
    - Archive ↔ changelog / release notes
    - ADRs ↔ architecture review board (or its absence)
    - The "delegate, review, own" loop — the emerging cross-tool operating model in SDD writing (2026)
- [x] Chapter: Trunk-Based Development with Agents
    - *Sources: Hammant trunkbaseddevelopment.com (canonical TBD); Hammant *Trunk-Based Development and Branch by Abstraction* (Leanpub, 2020); Farley *Modern Software Engineering* + continuousdelivery.com.*
    - Anchor: Paul Hammant's TBD as the canonical reference — small batches, short-lived branches, frequent integration. Farley's *MSE* and *Continuous Delivery* (with Humble) are the secondary anchors for the CI feedback-loop framing.
    - OpenSpec change folder ↔ short-lived branch
    - Merge cadence with parallel changes; how spec deltas reduce merge pain
- [x] Chapter: Code Review for Agent-Generated Code
    - *Sources: ThoughtWorks Radar Vol 34 (mutation testing, feedback controls); Böckeler.*
    - Review the spec delta first, the diff second
    - Intent-first review; PR taxonomy (`docs`, `structural`, `behavior`)
    - PR size: a full change folder + implementation is not a small PR; the spec is what makes it reviewable
    - Splitting the PR: spec documents first (intent review), implementation second (code review) — when this is worth the overhead
    - AI-assisted review: agent checks implementation against spec scenarios for deviations, scope creep, missing scenarios; forward reference to `ase-cli` MCP `check_spec_quality`
    - Pair review with another agent (multi-LLM critique)
    - What to look for that humans skip and agents miss
- [x] Chapter: Shared AI Instruction Conventions
    - *Sources: agents.md; agentpatterns.ai.*
    - Team-level `AGENTS.md`, shared `.agents/skills/` libraries, onboarding
    - When to standardize, when to leave divergent
- [x] Chapter: Cross-Team Coordination
    - *Sources: Nygard 2011 (ADRs as cross-team mechanism); ThoughtWorks Radar Vol 34.*
    - ADRs as cross-team mechanism (permanent, public, already part of the SDLC)
    - Inner source: sharing `.agents/` libraries across teams
    - Multi-repo realities — and OpenSpec's own roadmap gap
- [x] Chapter: What Is Still Evolving
    - *Sources: ThoughtWorks Radar Vol 34 (market fragmentation, term-coining); Hightower SDD-tools comparison.*
    - Maturity honesty applies to the book itself
    - What the SDD ecosystem has not yet figured out (multi-repo planning, agent-to-agent handoff, governance without bureaucracy)
- [ ] Tag: `v0.7.0`  <!-- chapters complete; tag pending build verification -->

#### Phase U — Appendices + Polish (`v0.8.0`)

- [ ] Appendix: Tooling Landscape (links to living page)
    - CLI agents, spec tools, MCP essentials
    - Model selection and cost: capability-class criterion (thinking + agent + plan mode); per-token pricing matters for direct-API readers; per-seat pricing (Copilot Enterprise, Cursor Business) makes per-run accounting irrelevant. One paragraph, not a chapter — DevOps and SRE are out of scope.
- [ ] Appendix: Instantiation Checklist
    - How to adopt ASE practices in your repo
    - What to copy, what to adapt
    - `ase init` as starting point
- [x] Appendix: Living Principles → dot-principles
- [ ] Appendix: Credits and References
    - Dave Farley, Michael Nygard, LeanSpec, OpenSpec, SpecKit, dot-principles
- [ ] Final review: full read-through, verify all git tags, cross-reference ase-cli
- [ ] Tag: `v0.8.0`

#### Phase V — Release (`v1.0.0`)

- [ ] Buy `ase-book.dev`, make repo public
- [ ] Final VitePress build, deploy
- [ ] Tag: `v1.0.0`
