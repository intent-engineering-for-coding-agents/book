# The ASE Book — From Vibe to Pro (Plan v2)

> Your AI agent is productive, but clueless about your system and intention.

---

## Two Repos, One Truth

```
ase-book/                        # GitHub org
├── ase-cli/                     # The proof: CLI tool built with ASE practices
└── ase-book/                    # The book: VitePress site that references ase-cli
```

**`ase-cli` is built first.** It is a Python CLI tool that validates ASE practices.
Every feature is spec-driven. Every check has AC IDs and test traceability.
Git tags mark each phase. The repo is proof the practices work.

**`ase-book` is written second.** It teaches the practices.
It references `ase-cli` throughout — real ADRs, real specs, real traceability.
The book does not narrate building the tool. The tool stands as finished evidence.

---

## Canonical Directory Structure

One convention for both repos:

```
.
├── AGENTS.md              # AI entry point — TOC pattern, under ~50 lines
├── docs/                  # ASE documentation (the knowledge base)
│   ├── README.md          # Architecture overview (GitHub renders this automatically)
│   ├── INDEX.md            # Agent-facing map — every file listed with description
│   ├── architecture/      # C4/C5 diagrams, Structurizr DSL sources
│   ├── decisions/         # ADRs in MADR format (immutable once closed)
│   └── design/            # Feature design docs (per-feature, disposable)
├── openspec/              # OpenSpec: change proposals, delta specs, tasks
│   ├── changes/           # Active and proposed changes
│   │   └── archive/       # Completed changes (historical record)
│   └── specs/             # Canonical specs (current system behavior)
├── .agents/               # AI instruction hub
│   ├── instructions/      # Role-based context files
│   ├── skills/            # Reusable workflow skills
│   └── hooks/             # File-type specific rules
├── .github/               # CI workflows (Actions, not Pages deploy from /docs)
│   └── workflows/         # Build, test, deploy, AC traceability
├── src/                   # Source code (Python for CLI, or app code)
├── tests/                 # AC-tagged, positive/negative proof
├── content/               # VitePress book prose (ase-book only, not ase-cli)
│   ├── foundation/
│   ├── ai-instructions/
│   ├── spec-driven/
│   ├── quality/
│   ├── team-workflows/
│   ├── cross-team/
│   └── appendices/
│── LICENSE                # Apache 2.0
└── pyproject.toml         # or package.json (VitePress for ase-book)
```

### `docs/` is the canonical documentation directory

`docs/` is the one name that works everywhere. No framework collision. No GitHub Pages
conflict (deploy via Actions). No tool claims it.

Every `docs/` directory has two entry points:
- **`README.md`** — architecture overview, renders automatically on GitHub/GitLab/Bitbucket
- **`INDEX.md`** — agent-facing map, every file listed with a one-line description

The book recommends **one directory name** and one convention.

---

## The `ase-cli` Tool

### What it is

A Python CLI that validates ASE practices in any repo. Two layers:

| Layer | Technology | What it checks |
|---|---|---|
| Deterministic | Pure Python | File size, structure, MADR format, AC ID patterns, test markers, secrets |
| AI-assisted | MCP server | Top-heavy content, ADR scope leakage, AGENTS.md TOC quality, spec semantics |

The deterministic layer works on any machine. No AI required.
The AI layer starts an MCP server — the user's AI agent connects and runs semantic checks.
BYOK: the user brings their own AI. The tool doesn't care which one.

### Commands

```
ase init                  # Scaffold canonical directory structure in current repo
ase init --with-copilot   # Also emit .github/copilot-instructions.md → "See AGENTS.md"
ase init --with-claude    # Also emit CLAUDE.md → "See AGENTS.md"

ase check                 # Run deterministic checks only
ase check --all           # Run deterministic + AI-assisted (via MCP)
ase check --path src/     # Scope to a directory or file

ase generate copilot      # Emit Copilot-facing pointer + optional .github/instructions/ slices
ase generate claude        # Emit CLAUDE.md pointer
```

### Deterministic checks (runs without AI)

| Check | What it validates |
|---|---|
| `agents-exists` | AGENTS.md present at repo root |
| `agents-size` | AGENTS.md under N lines (TOC, not encyclopedia) |
| `agents-links` | Every link in AGENTS.md has a description (not bare URL) |
| `docs-readme-exists` | `docs/README.md` present with architecture overview |
| `adr-format` | All ADRs follow MADR template (`docs/decisions/NNNN-title.md`) |
| `adr-readme` | `docs/decisions/README.md` exists and lists all ADRs |
| `docs-index-exists` | `docs/INDEX.md` present, agents load this first |
| `docs-index-stale` | `docs/INDEX.md` entries match actual files (no broken links, no orphans) |
| `spec-ac-ids` | Every spec scenario has a `[PREFIX-NNN]` AC ID |
| `spec-test-category` | Every scenario has a `**Test:**` field |
| `spec-size` | Spec files under configurable line limit (default 500) |
| `test-traceability` | Test markers reference valid, non-removed AC IDs |
| `test-coverage` | Non-`Manual` ACs have positive + negative proof tasks |
| `secrets` | No secrets in plaintext (pre-commit hook) |
| `agents-hub-structure` | `.agents/` has instructions/ and skills/ subdirs |
| `file-size` | Configurable: any .md file exceeding N lines flagged |

### AI-assisted checks (via MCP, user's AI)

| MCP Tool | What the AI evaluates |
|---|---|
| `check_top_heavy` | Does the file put constraints/non-goals/requirements in the first ~25%? |
| `check_adr_scope` | Is the ADR about architectural decisions only (no design rationale, no impl details)? |
| `check_agents_toc` | Does AGENTS.md act as a proper TOC — each link has a reason to be loaded? |
| `check_spec_quality` | Are acceptance criteria specific and testable? Scenarios complete? |

### MCP server architecture

The tool starts a lightweight MCP server. The user's AI agent discovers it.
Each semantic check is an MCP tool. The tool constructs a structured prompt,
sends the file content, gets a structured response, parses it, and reports findings.

```text
User's AI Agent ──MCP──> ase-cli MCP server ──> reads repo files
                                               ──> constructs check prompt
                                               ──> sends to user's AI (via MCP)
                                               ──> parses structured response
                                               ──> reports finding to user
```

The AI prompt for each check is version-controlled inside `ase-cli` itself —
a spec for an AI check. Dogfooding spec-driven development on the tool's own checks.

### ase-cli phases and tags

Each phase maps to a book chapter. Each tag is a checkpoint the reader can inspect.

#### Phase A — Scaffold (`v0.0.1`, commit zero)

- [ ] Init repo under `ase-book/ase-cli`
- [ ] Apache 2.0 license
- [ ] `pyproject.toml` (uv-based, Typer, Python 3.12+)
- [ ] `.gitignore` for Python
- [ ] GitHub Actions: lint + test on push

#### Phase B — Foundation (`v0.1.0`)

- [ ] Create canonical directory structure in `ase-cli` itself
    - `docs/README.md` — architecture overview (CLI + MCP server design)
    - `docs/INDEX.md` — agent-facing map of all docs
    - `docs/decisions/` — ADRs in MADR format
    - `docs/decisions/README.md` — auto-rendered ADR listing
    - `docs/design/` — empty, ready for features
    - `docs/design/README.md` — auto-rendered design doc listing
    - `openspec/` — empty, ready for spec-driven development
    - `.agents/` — empty, ready for AI instructions
    - `AGENTS.md` — stub TOC
- [ ] Write ADRs capturing real decisions:
    - ADR-0001: Python + Typer over alternatives
    - ADR-0002: `docs/` as canonical documentation directory
    - ADR-0003: Two-layer check architecture (deterministic + MCP for AI)
    - ADR-0004: BYOK via MCP (not direct API calls, not shell-out)
    - ADR-0005: MADR format for all architectural decisions
- [ ] Write initial `docs/README.md` (architecture overview)
- [ ] Write initial `docs/INDEX.md` (agent-facing map)
- [ ] Tag: `v0.1.0`

#### Phase C — AI Instructions (`v0.2.0`)

- [ ] Write `AGENTS.md` for `ase-cli` — TOC pattern
    - Project description, Python/CLI conventions
    - Links to `.agents/instructions/`
    - Available skills
- [ ] Create `.agents/instructions/` files:
    - `openspec.md` — OpenSpec workflow, AC IDs, test traceability
    - `coding-standards.md` — Python style, type hints, ruff, pytest
    - `build-and-ci.md` — uv commands, CI expectations
    - `index-maintenance.md` — when creating/renaming/deleting files under `docs/`, update `INDEX.md`
- [ ] Create `.agents/skills/update-index/` — scans `docs/`, regenerates `INDEX.md`
- [ ] Hook files as needed
- [ ] Tag: `v0.2.0`

#### Phase D — Spec-Driven: Core CLI + Deterministic Checks (`v0.3.0`)

- [ ] OpenSpec change proposal for `ase init` command
    - `openspec/changes/001-ase-init-scaffold/proposal.md`
    - `openspec/changes/001-ase-init-scaffold/design.md`
    - `openspec/changes/001-ase-init-scaffold/tasks.md`
    - `openspec/changes/001-ase-init-scaffold/specs/`
- [ ] OpenSpec change proposal for `ase check` deterministic framework
    - `openspec/changes/002-deterministic-checks/proposal.md`
    - Define plugin-based checker registry
    - Each check is a Python module implementing a simple interface
- [ ] OpenSpec change proposals for individual deterministic checks:
    - 003: `agents-exists` + `agents-size` + `agents-links`
    - 004: `architecture-exists` + file structure
    - 005: `adr-format` + `adr-index`
    - 006: `spec-ac-ids` + `spec-test-category`
    - 007: `spec-size` + `file-size`
    - 008: `secrets`
    - 009: `agents-hub-structure`
- [ ] Implement each check via spec → implement → verify
- [ ] Wire `ase check` to plugin registry
- [ ] Tag: `v0.3.0`

#### Phase E — Spec-Driven: Test Traceability Checks (`v0.4.0`)

- [ ] OpenSpec change proposals:
    - 010: `test-traceability` — cross-reference AC IDs in specs vs tests
    - 011: `test-coverage` — positive/negative proof pair validation
- [ ] Implement AC traceability scanner (regex-based, JUnit `@Tag`, Cucumber `@AC:`, fallback `// AC:`)
- [ ] Implement positive/negative proof pair validation
- [ ] Tag: `v0.4.0`

#### Phase F — Spec-Driven: MCP Server + AI Checks (`v0.5.0`)

- [ ] OpenSpec change proposal: MCP server
- [ ] Implement MCP server using `mcp` Python SDK
- [ ] Publish MCP tools: `check_top_heavy`, `check_adr_scope`, `check_agents_toc`, `check_spec_quality`
- [ ] Each tool constructs a structured prompt from a version-controlled template
- [ ] Tags: `v0.5.0`

#### Phase G — Spec-Driven: Vendor Generators (`v0.6.0`)

- [ ] OpenSpec change proposal: `ase generate`
- [ ] `ase generate copilot` — emits `.github/copilot-instructions.md` pointer to AGENTS.md + optional `.github/instructions/` slices
- [ ] `ase generate claude` — emits `CLAUDE.md` pointer to AGENTS.md
- [ ] Codex reads `AGENTS.md` + `.agents/` natively — no generator needed
- [ ] Tag: `v0.6.0`

#### Phase H — Quality Verification on ase-cli itself (`v0.7.0`)

- [ ] Test package for every check: AC-tagged, positive/negative proof
- [ ] CI: run `ase check --deterministic` on itself (the tool validates its own repo)
- [ ] CI: AC traceability scan — every spec scenario has test proof
- [ ] Pre-commit hooks: lint (ruff), format (ruff format), secrets scan
- [ ] Deterministic AC traceability in CI (when ready)
- [ ] Tag: `v0.7.0`

#### Phase I — Team & Polish (`v0.8.0`)

- [ ] PR taxonomy in practice: `docs`, `structural`, `behavior`
- [ ] CI gates: lint, test, AC traceability, `ase check` on self
- [ ] Documentation: README, contributing guide
- [ ] Maturity labels on all checks (which are CI-enforced vs tool-supported)
- [ ] Tag: `v0.8.0`

#### Phase J — Ship to PyPI (`v1.0.0`)

- [ ] Package metadata, README, version bump
- [ ] `uv publish` to PyPI
- [ ] CI: publish on tag
- [ ] Install verification: `uv tool install ase-cli` works
- [ ] Tag: `v1.0.0`

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

#### Phase K — Scaffold (`v0.0.1`)

- [ ] Init repo under `ase-book/ase-book`
- [ ] Apache 2.0 license
- [ ] Init VitePress: `srcDir: 'content'`, Mermaid plugin, clean theme
- [ ] GitHub Actions: build + deploy to GitHub Pages on push to `main`
- [ ] Create canonical directory structure:
    - `docs/README.md` — stub
    - `docs/INDEX.md` — stub
    - `docs/decisions/` — empty
    - `docs/design/` — empty
    - `openspec/` — empty
    - `content/` — VitePress prose root (empty)
    - `AGENTS.md` — stub
- [ ] Seed files: `idea.md`, `plan2.md`, `principles.md` (empty stub)
- [ ] Tag: `v0.0.1`

#### Phase L — ase-book Foundation (`v0.1.0`)

- [ ] Write `docs/README.md` for the book site
    - VitePress as SSG, `content/` structure, Mermaid, Actions deploy
- [ ] Write `docs/INDEX.md` — agent-facing map of all docs
- [ ] Write ADRs:
    - ADR-0001: VitePress over alternatives (Hugo, Docusaurus, mdBook)
    - ADR-0002: `content/` for VitePress prose — frees `docs/` for ASE documentation
- [ ] Wire `ase check` in CI on the book repo itself
- [ ] Tag: `v0.1.0`

#### Phase M — ase-book AI Instructions (`v0.2.0`)

- [ ] Write `AGENTS.md` for the book repo — TOC pattern
    - Role: book authoring agent
    - Content conventions, tone, audience
    - VitePress commands
- [ ] Create `.agents/instructions/`:
    - `writing.md` — tone, structure, audience, formatting
    - `vitepress.md` — config, sidebar, Mermaid, deployment
    - `review.md` — how to review and critique draft content
    - `index-maintenance.md` — when creating/renaming/deleting files under `docs/`, update `INDEX.md`
- [ ] Create `.agents/skills/`:
    - `draft-section` — draft a new section from outline
    - `review-chapter` — consistency, tone, DRY review
    - `update-sidebar` — regenerate sidebar from file tree
    - `update-index` — scan `docs/`, regenerate all `INDEX.md` files
- [ ] Tag: `v0.2.0`

#### Phase N — Write Foundation Chapters (`v0.3.0`)

Each chapter is an OpenSpec change proposal on the book repo.

- [ ] Chapter: Why Structure Matters
    - Compounding drift, before/after, structure as context
- [ ] Chapter: The Four Document Types
    - `docs/README.md` — architecture overview, renders on GitHub
    - `docs/INDEX.md` — agent-facing map, loaded first for context economy
    - ADRs in MADR format at `docs/decisions/`
    - Design docs at `docs/design/`
    - Specs at `openspec/`
    - Lifespans: permanent → temporary → disposable
    - Why conflating them corrupts both
    - Credit: MADR — Michael Nygard et al.
- [ ] Chapter: Plain-Text-as-Code
    - Markdown, Mermaid, MADR as substrate
    - Git-diffable, vendor-independent, agent-readable
- [ ] Chapter: The Map — ASE and the SDLC
    - One-page diagram: SDLC phases → ASE touchpoints
    - ASE extends, does not replace
- [ ] Chapter: Honest Maturity
    - Practiced / documented / CI-enforced / target state
    - Maturity labels prevent process theatre
- [ ] Throughout: reference `ase-cli` ADRs, specs, tags as evidence
- [ ] Tag: `v0.3.0`

#### Phase O — Write AI Instructions Chapters (`v0.4.0`)

- [ ] Chapter: Prompt Engineering Basics
    - Where everyone starts, why it fails at scale
    - Progression: prompt → AGENTS.md → specs
- [ ] Chapter: AGENTS.md — One File Changes Everything
    - TOC pattern, what goes in it, tool-agnostic
    - Credit: agentpatterns.ai
- [ ] Chapter: From AGENTS.md to AI Instruction Hub
    - `.agents/instructions/`, `.agents/skills/`, `.agents/hooks/`
    - One folder for all AI tools
- [ ] Chapter: Writing Instructions That Work
    - Specific, negative instructions, architecture boundaries
    - Testing: how should the agent verify its own work?
- [ ] Chapter: Skills, Commands, and Hooks
    - Skills: agent-invoked workflows
    - Commands: user-triggered
    - Hooks: automated quality gates
    - Concrete example: `/update-index` skill — scans `docs/`, regenerates `INDEX.md`
    - Instructions prevent drift (`index-maintenance.md`), skills fix it when it happens
- [ ] Chapter: Context Window Management
    - Why context fills, small sessions > long conversations
    - Subagents, /compact, loading skills selectively
    - `INDEX.md` as context economy — agents load one 40-line file instead of 10×200-line files
- [ ] Chapter: Debugging and Recovery
    - Drift, spin, halt — signs and strategies
    - "The agent is not broken — it is clueless. Fix the context."
- [ ] Chapter: Vendor Files That Point, Not Duplicate
    - `CLAUDE.md` → "See AGENTS.md"
    - `.github/copilot-instructions.md` → "See AGENTS.md"
    - `ase generate` — why generated files are pointers, not authored duplicates
    - Reference `ase-cli` implementation
- [ ] Tag: `v0.4.0`

#### Phase P — Write Spec-Driven Chapters (`v0.5.0`)

- [ ] Chapter: Why Specs?
    - Drift, intent, traceability, Spec > Code
- [ ] Chapter: Why Small?
    - Context window economics, LeanSpec rule: under 300 lines
    - Credit: LeanSpec
- [ ] Chapter: Why Important Stuff First?
    - Agents read top-down, lose focus
    - If they read only the first 50 lines — would it still work?
- [ ] Chapter: The Spectrum
    - Raw prompt → spec.md → OpenSpec → SpecKit
    - Match formality to risk
- [ ] Chapter: Spec Lifecycle
    - Write → critique → review → implement → archive
    - Multi-LLM critique
- [ ] Chapter: Spec > Code
    - Implementation is disposable. The spec is not.
- [ ] Tag: `v0.5.0`

#### Phase Q — Write Quality Chapters (`v0.6.0`)

- [ ] Chapter: Tests as Proof, Not Ritual
    - "Done" = approved intent has executable proof
    - AI speed makes automated proof mathematically required
- [ ] Chapter: AC IDs + Positive/Negative Coverage
    - Stable IDs, mandatory `**Test:**` field
    - Happy-path-only is not proof
- [ ] Chapter: Before / During / After Checkpoints
    - Before: architecture, AGENTS.md, design system
    - During: spec writing, hooks, context management
    - After: verification, refactoring, review
- [ ] Chapter: Security in Depth
    - Secrets, injection, dependencies — guardrails in AGENTS.md
    - OWASP as review checklist
- [ ] Chapter: PR Taxonomy
    - `docs`, `structural`, `behavior` — why mixing makes review harder
- [ ] Chapter:.principles — Raising the Bar
    - dot-scout → dot-prime → code → dot-audit
    - Complements specs and tests, does not replace them
- [ ] Tag: `v0.6.0`

#### Phase R — Write Team + Cross-Team Chapters (`v0.7.0`)

- [ ] Chapter: Why Teams Break Agentic Workflows
    - N developers × M agents = compounding drift
- [ ] Chapter: Trunk-Based Development with Agents
    - Small batches, short-lived branches, frequent integration
    - Credit: Dave Farley
- [ ] Chapter: Parallel Agents on the Same Codebase
    - Spec ownership, architecture boundaries as isolation
- [ ] Chapter: Shared AI Instruction Conventions
    - Team-level AGENTS.md, shared skills, onboarding
- [ ] Chapter: Code Review for Agent-Generated Code
    - Intent-first review, PR taxonomy, pair review
- [ ] Chapter: Cross-Team Coordination
    - ADRs as cross-team mechanism, shared conventions
    - Inner source: sharing `.agents/` libraries
- [ ] Chapter: What Is Still Evolving
    - Maturity honesty applies to the book itself
- [ ] Tag: `v0.7.0`

#### Phase S — Appendices + Polish (`v0.8.0`)

- [ ] Appendix: Tooling Landscape (links to living page)
    - CLI agents, spec tools, MCP essentials
    - Model selection and cost management
- [ ] Appendix: Instantiation Checklist
    - How to adopt ASE practices in your repo
    - What to copy, what to adapt
    - `ase init` as starting point
- [ ] Appendix: Living Principles → dot-principles
- [ ] Appendix: Credits and References
    - Dave Farley, Michael Nygard, LeanSpec, OpenSpec, SpecKit, dot-principles
- [ ] Final review: full read-through, verify all git tags, cross-reference ase-cli
- [ ] Tag: `v0.8.0`

#### Phase T — Release (`v1.0.0`)

- [ ] Buy `ase-book.dev`, make repo public
- [ ] Final VitePress build, deploy
- [ ] Tag: `v1.0.0`

---

## Full Phase Map

| Step | Repo | Tag | What |
|---|---|---|---|
| A | ase-cli | `v0.0.1` | Scaffold — pyproject.toml, CI, .gitignore |
| B | ase-cli | `v0.1.0` | Foundation — directory structure, ADRs, architecture.md |
| C | ase-cli | `v0.2.0` | AI Instructions — AGENTS.md, .agents/ hub |
| D | ase-cli | `v0.3.0` | Spec-Driven — `ase init` + deterministic check framework |
| E | ase-cli | `v0.4.0` | Spec-Driven — test traceability checks |
| F | ase-cli | `v0.5.0` | Spec-Driven — MCP server + AI checks |
| G | ase-cli | `v0.6.0` | Spec-Driven — vendor generators |
| H | ase-cli | `v0.7.0` | Quality — test package, CI, self-validation |
| I | ase-cli | `v0.8.0` | Polish — PR taxonomy, maturity labels |
| J | ase-cli | `v1.0.0` | Ship to PyPI |
| K | ase-book | `v0.0.1` | Scaffold — VitePress, CI, seed files |
| L | ase-book | `v0.1.0` | Foundation — architecture.md, ADRs |
| M | ase-book | `v0.2.0` | AI Instructions — AGENTS.md, .agents/ skills |
| N | ase-book | `v0.3.0` | Write Foundation chapters |
| O | ase-book | `v0.4.0` | Write AI Instructions chapters |
| P | ase-book | `v0.5.0` | Write Spec-Driven chapters |
| Q | ase-book | `v0.6.0` | Write Quality chapters |
| R | ase-book | `v0.7.0` | Write Team + Cross-Team chapters |
| S | ase-book | `v0.8.0` | Appendices + polish |
| T | ase-book | `v1.0.0` | Release — domain, public |

---

## Technical Stack

| Concern | Choice | Why |
|---|---|---|
| Book prose | Markdown | Plain-Text-as-Code |
| Book site | VitePress | Proven, clean, Mermaid built-in |
| Book hosting | GitHub Pages via Actions | Free, git-native, `docs/` stays free |
| Diagrams | Mermaid | Plain text, git-diffable, GitHub renders |
| ADRs | MADR | Lightweight, plain text, structured |
| Spec tool | OpenSpec | AC IDs, test traceability, archive flow |
| CLI tool | Python + Typer | Universal, readable, `uv tool install` |
| MCP | `mcp` Python SDK | BYOK, agent-agnostic |
| Package manager | uv | Fast, single tool, pipx-compatible |
| Lint | ruff | Fast, comprehensive |
| CI | GitHub Actions | Free, git-native |
| License | Apache 2.0 | Consistent with PTAC ecosystem |

---

## Sources to Cherry-Pick

| Source | Used For |
|---|---|
| Dave Farley / Modern Software Engineering | Trunk-based dev, CI, sampling theory |
| MADR (adr.github.io/madr) — Michael Nygard et al. | ADR format |
| LeanSpec (lean-spec.dev) | Small specs, first principles |
| OpenSpec (openspec.dev) | Spec lifecycle, AC IDs, archive |
| GitHub SpecKit | Enterprise end of spec spectrum |
| AGENTS.md (agentpatterns.ai) | TOC pattern, instruction hub |
| dot-principles/example-catalog | PTAC principles, quality uplift |
| MCP (modelcontextprotocol.io) | Agent-tool bridge standard |

---

## Living Principles

*(Append as they emerge during building and writing)*

- Each document type has a different lifespan. ADRs are permanent. Specs are disposable. Conflating them corrupts both.
- Put the most important context at the top — agents read top-down and lose focus.
- Small specs outperform large specs — an agent that finishes is better than one that drifts.
- The spec is the durable artifact. The implementation is disposable.
- AI generates code faster than you can verify manually. Automated proof is not optional — it is mathematically required at agentic speeds.
- Distinguish practiced from documented from CI-enforced from target state. Maturity honesty prevents process theatre.
- One source of truth for AI instructions. Vendor files are generated pointers, not authored duplicates.
- Vendor-agnostic over vendor-locked. The knowledge lives in the repo, not in a tool.
- `docs/` is for architecture, decisions, and design. Not for your static site. Point your SSG elsewhere.
- Every `docs/` directory has a `README.md` (human-readable, renders on Git hosts) and an `INDEX.md` (agent-facing map, context economy). They look similar but serve different readers.
- Give credit where credit is due. A book that hides its shoulders is weaker, not stronger.

---

## Open Questions

- Domain: `ase-book.dev` — buy when going public
- PyPI package name: `ase-cli` — verify availability
- When to announce / share externally?
