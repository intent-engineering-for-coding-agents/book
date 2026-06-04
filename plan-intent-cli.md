# intent-cli — Tool Design and Phases

Part of [plan.md](plan.md). See also [plan-intent-book.md](plan-intent-book.md).

---

## The `intent-cli` Tool

`intent-cli` is the companion CLI tool (renamed from `iec-cli`). Public package distribution is out of scope.
This plan covers local developer use and companion-repo evidence for the book.

### What it is

A Python CLI that validates Intent Engineering practices in any repo. Two layers:

| Layer | Technology | What it checks |
|---|---|---|
| Deterministic | Pure Python | File size, structure, MADR format, AC ID patterns, test markers, secrets |
| AI-assisted | MCP server | Top-heavy content, ADR scope leakage, AGENTS.md TOC quality, spec semantics |

The deterministic layer works on any machine. No AI required.
The AI layer starts an MCP server — the user's AI agent connects and runs semantic checks.
BYOK: the user brings their own AI. The tool doesn't care which one.

### Commands

```
iec --help                # Show usage and command reference
iec --version             # Show version (from pyproject.toml)

iec init                  # Scaffold canonical directory structure in current repo
iec init --path <dir>     # Target a specific directory
iec init --dry-run        # Preview without creating files
iec init --force          # Overwrite existing files
iec init --with-claude    # Also emit CLAUDE.md with @AGENTS.md import
iec init --with-gemini    # Also emit .gemini/settings.json pointing to AGENTS.md

iec check                 # Run deterministic checks only
iec check --all           # Run deterministic + AI-assisted (via MCP)
iec check --path src/     # Scope to a directory or file

iec generate copilot      # Emit Copilot-facing pointer + optional .github/instructions/ slices
iec generate claude       # Emit CLAUDE.md pointer
iec generate gemini       # Emit .gemini/settings.json context config
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
| `tasks-complete` | A change folder's `tasks.md` has no unchecked `- [ ]` items before merge |
| `change-archived` | A completed change folder is archived (moved to `changes/archive/`, delta merged into `openspec/specs/`) — not left live on trunk |

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
User's AI Agent ──MCP──> intent-cli MCP server ──> reads repo files
                                               ──> constructs check prompt
                                               ──> sends to user's AI (via MCP)
                                               ──> parses structured response
                                               ──> reports finding to user
```

The AI prompt for each check is version-controlled inside `intent-cli` itself —
a spec for an AI check. Dogfooding spec-driven development on the tool's own checks.

### intent-cli phases and tags

Each phase maps to a book chapter. Each tag is a checkpoint the reader can inspect.

#### Phase A — Scaffold (`v0.0.1`, commit zero)

- [x] Init repo under `intent-book/iec-cli` (historical name at scaffold time; repo later moved to `intent-engineering-for-coding-agents/cli`)
- [x] Apache 2.0 license
- [x] `pyproject.toml` (uv-based, Typer, Python 3.12+)
- [x] `.gitignore` for Python
- [x] GitHub Actions: lint + test on push

#### Phase B — Foundation (`v0.1.0`)

- [x] Create canonical directory structure in `iec-cli` itself
    - [x] `docs/README.md` — architecture overview (CLI + MCP server design)
    - [x] `docs/INDEX.md` — agent-facing map of all docs
    - [x] `docs/testing-convention.md` — generic Intent Engineering testing conventions (test layers, AC IDs, traceability)
    - [x] `docs/testing-strategy.md` — iec-cli specific test strategy (layers, markers, CI wiring)
    - [x] `docs/decisions/` — ADRs in MADR format
    - [x] `docs/decisions/README.md` — auto-rendered ADR listing
    - [x] `docs/design/` — empty, ready for features
    - [x] `docs/design/README.md` — auto-rendered design doc listing
    - [x] `openspec/` — empty, ready for spec-driven development
    - [x] `.agents/` — empty, ready for agent instructions
- [x] Write ADRs capturing real decisions:
    - [x] ADR-0001: Python + Typer over alternatives
    - [x] ADR-0002: `docs/` as canonical documentation directory
    - [x] ADR-0003: Two-layer check architecture (deterministic + MCP for AI)
    - [x] ADR-0004: BYOK via MCP (not direct API calls, not shell-out)
    - [x] ADR-0005: MADR format for all architectural decisions
    - [x] ADR-0006: OpenSpec for spec-driven development
- [x] Write initial `docs/README.md` (architecture overview)
- [x] Write initial `docs/INDEX.md` (agent-facing map)
- [x] Tag: `v0.1.0`

#### Phase C — Agent Instructions (`v0.2.0`)

- [x] Write `AGENTS.md` for `intent-cli` — TOC pattern
    - [x] Project description, Python/CLI conventions
    - [x] Links to `.agents/instructions/`
    - [x] Available skills
- [x] Create `.agents/instructions/` files:
    - [x] `openspec.md` — OpenSpec workflow, AC IDs, test traceability
    - [x] `coding-standards.md` — Python style, type hints, ruff, pytest
    - [x] `build-and-ci.md` — uv commands, CI expectations
    - [x] `index-maintenance.md` — when creating/renaming/deleting files under `docs/`, update `INDEX.md`
- [x] Create `.agents/skills/update-index.md` — scans `docs/`, regenerates `INDEX.md`
- [ ] Hook files as needed
- [x] Tag: `v0.2.0`

#### Phase D — Spec-Driven: Core CLI (`v0.3.0`)

**Prerequisite:** `openspec init` runs once per project to generate slash commands (`.opencode/`, `.claude/`, etc.). These are committed — generated pointers, not authored duplicates.

OpenSpec workflow per change (4 steps): **new** (`/opsx:new <name>` creates the change folder), **plan** (`/opsx:ff` fast-forwards proposal → specs → design → tasks), **apply** (`/opsx:apply` implements tasks), **archive** (`/opsx:archive` merges delta specs into `openspec/specs/`, moves to `changes/archive/<YYYY-MM-DD>-<name>/`). Artifacts can be updated anytime — no rigid phase gates. Helper commands: `/opsx:continue`, `/opsx:explore`, `/opsx:verify`, `/opsx:sync`, `/opsx:onboard`, `/opsx:bulk-archive`.

> **AC IDs are an Intent Engineering convention, not canonical OpenSpec.** OpenSpec prescribes no AC ID format; the `[PREFIX-NNN]` pattern and `**Test:**` field are layered on top to enable test traceability checks.

> **Use a model in the capability class (thinking + agent + plan mode) for OpenSpec work.** Proposals, delta specs, and design docs are where intent gets fixed — weak models produce shallow specs that read fine but miss edge cases and architectural consequences. Default to a top-tier reasoning model (Claude Sonnet/Opus 4+, GPT 5.4+, Deepseek 4 Pro — the tested set from `idea.md`'s Audience section) for `/opsx:ff` and `/opsx:apply`; cheaper models are fine for archive merges and mechanical edits.

> **Put the agent in Plan / Spec / Architect mode when proposing changes.** Most agentic IDEs expose a planning mode that defers code edits until the spec and design are explicitly approved (Claude Code's plan mode, Cursor's Plan, Cline/Roo's Architect, OpenCode's Plan). Use it for `/opsx:new` and `/opsx:ff` so the model thinks before it writes — then drop to normal mode for `/opsx:apply`.

- [x] **Change 001 — `iec init` scaffold command**
    - [x] New + Plan: `/opsx:new ase-init` then `/opsx:ff` — creates `openspec/changes/ase-init/` with proposal, specs, design, tasks
    - [x] Specs: 21 AC IDs (SCAFFOLD-001..013, VENDOR-001..008) with `**Test:**` field per scenario
    - [x] Apply (`/opsx:apply`): implement scaffold command, `--with-claude`, `--with-gemini` flags (43/43 tasks, 21 tests, 24 ACs)
    - [x] Archive (`/opsx:archive`): merge delta specs → `openspec/specs/`, move to `changes/archive/YYYY-MM-DD-ase-init/`
- [x] **Change 002 — Deterministic check framework**
    - [x] Propose: plugin registry (11 ACs), checker interface, result format (7 ACs), `iec check` CLI (10 ACs). 28 AC IDs total across 3 specs.
    - [x] Apply: single-module check.py (85 lines), 34 tests, 98% coverage. 25/25 tasks complete.
    - [x] Archive: merge specs → openspec/specs/{checker-registry,check-result-model,check-cli}
- [x] Tag: `v0.3.0`

#### Phase E — Spec-Driven: File & Structure Checks (`v0.4.0`)

- [x] **Change 003 — Agent-facing file checks**
    - `agents-exists`, `agents-size`, `agents-links`
    - [x] Propose: 3 specs, 15 AC IDs (AGEX 3, AGSZ 6, AGLN 6), env var config for line limit
    - [x] Apply: checkers/ package, 16 tests, 71 total pass, 15/15 ACs proven
    - [x] Archive: merge specs → openspec/specs/{agents-exists,agents-links,agents-size}
- [x] **Change 004 — Architecture & file structure checks**
    - `docs-readme-exists` (FAIL, recursive), `docs-index-exists` (WARN, recursive), `docs-index-stale` (WARN, per-directory)
    - [x] Propose: 3 specs, 17 AC IDs (DRME 5, DINE 5, DINS 7)
    - [x] Apply: 17 tests, 88 total pass, 17/17 ACs proven
    - [x] Archive → openspec/specs/{docs-readme-exists,docs-index-exists,docs-index-stale}
- [x] **Change 005 — ADR format checks**
    - `adr-format`, `adr-index`
    - [x] New → Plan → Apply → Archive
- [x] Tag: `v0.4.0`

#### Phase F — Spec-Driven: Spec Quality Checks (`v0.5.0`)

- [x] **Change 006 — AC ID & test category checks**
    - `spec-ac-ids`, `spec-test-category`
    - [x] New → Plan → Apply → Archive
- [x] **Change 007 — File & spec size checks**
    - `spec-size`, `file-size`
    - [x] New → Plan → Apply → Archive
- [x] **Change 008 — Agent hub & secrets checks**
    - `agents-hub-structure`, `secrets`
    - [x] New → Plan → Apply → Archive
- [ ] Tag: `v0.5.0`

#### Phase G — Spec-Driven: Test Traceability Checks (`v0.6.0`)

- [x] **Change 009 — Test traceability**
    - `test-traceability` — cross-reference AC IDs in specs vs test markers
    - Regex-based: JUnit `@Tag`, Cucumber `@AC:`, fallback `// AC:`
    - [x] New → Plan → Apply → Archive
- [x] **Change 010 — Test coverage**
    - `test-coverage` — positive/negative proof pair validation
    - [x] New → Plan → Apply → Archive
- [x] Tag: `v0.6.0`

#### Phase G.1 — OpenSpec Change Lifecycle Checks (`v0.6.1`)

Deterministic gates that back the two-PR / spec-then-implementation model from the book's *Trunk-Based Development with Agents* chapter (`content/team/trunk-based-development.md`). Verifier pattern (ADR-0003): the check gates the merge, it does not perform the archive. No MCP required, so this slots ahead of the MCP phase.

- [ ] **Change 011 — Change lifecycle checks**
    - `tasks-complete` — fail the implementation PR when the change folder's `tasks.md` has any unchecked `- [ ]` item
    - `change-archived` — fail when a completed change folder under `openspec/changes/` (excluding `archive/`) has not been archived (moved to `changes/archive/<date>-<name>/`, delta merged into `openspec/specs/`)
    - Context-free fallback (when no git/PR context is available): flag any non-archived change whose `tasks.md` is fully checked but which has not been archived — the "finished but not archived" dead-spec signal the book warns about
    - [ ] New → Plan → Apply → Archive
- [ ] (optional, lower priority) `branch-matches-slug` — verify the branch name matches the change folder slug (`<slug>` for implementation, `spec/<slug>` for the spec PR). Needs git context, so it ships as a CI snippet or skill, not a core `iec check` checker
- [ ] Tag: `v0.6.1`

#### Phase H — Spec-Driven: MCP Server + AI Checks (`v0.7.0`)

- [ ] **Change 012 — MCP server**
    - Start MCP server on demand, publish tools: `check_top_heavy`, `check_adr_scope`, `check_agents_toc`, `check_spec_quality`
    - Each tool constructs a structured prompt from a version-controlled template
    - [ ] New → Plan → Apply → Archive
    - > **Book dependency:** `content/team/code-review-agent-code.md` references `check_spec_quality` in the present tense, as if it exists. Until this phase ships, that reference must be marked forthcoming/planned. A reference work does not name an unbuilt tool as present-tense reality. Either ship this phase before publishing, or soften the book line.
- [ ] Wire `iec check --all` to start MCP server and await AI results
- [ ] Tag: `v0.7.0`

#### Phase I — Spec-Driven: Vendor Generators (`v0.8.0`)

- [ ] **Change 013 — `iec generate` command**
    - [ ] `iec generate copilot` — emits `.github/copilot-instructions.md` pointer to AGENTS.md
    - [ ] `iec generate claude` — emits `CLAUDE.md` pointer to AGENTS.md
    - [ ] `iec generate gemini` — emits `.gemini/settings.json` with AGENTS.md context path
    - Codex reads `AGENTS.md` + `.agents/` natively — no generator needed
    - [ ] New → Plan → Apply → Archive
- [ ] Tag: `v0.8.0`

#### Phase J — Quality Verification on intent-cli itself (`v0.9.0`)

- [ ] **Convention artefacts** — establish the quality convention the book describes
    - [ ] `docs/architecture/test-strategy.md`: test types used (unit, integration, e2e), pytest frameworks per type, file locations, coverage thresholds
    - [ ] `test/ac-registry.md`: one row per component prefix; monotone counter
    - [ ] `test/scenario-template.md`: exact scenario format + complexity-tier coverage requirements (simple: 1+1, medium: 2-3+2, complex: several+several)
    - [ ] ADR: `docs/decisions/NNNN-ac-id-and-test-type-convention.md` — records the decision to adopt `[PREFIX-NNN]` IDs and `Test-type:` field in all intent-cli specs
- [ ] **Retrofit pytest markers** — add `@pytest.mark.<AC_ID>` and `@pytest.mark.<test_type>` to all existing intent-cli tests; update CI filter config
- [ ] Test package for every check: AC-tagged, positive/negative proof
- [ ] CI: run `iec check --deterministic` on itself (the tool validates its own repo)
- [ ] CI: AC traceability scan — every spec scenario has test proof
- [ ] Pre-commit hooks: lint (ruff), format (ruff format), secrets scan
- [ ] Tag: `v0.9.0`

#### Phase K — Team & Polish (`v0.10.0`)

- [ ] PR taxonomy in practice: `docs`, `structural`, `behavior`
- [ ] CI gates: lint, test, AC traceability, `iec check` on self
- [ ] Documentation: README, contributing guide
- [ ] Maturity labels on all checks (which are CI-enforced vs tool-supported)
- [ ] Tag: `v0.10.0`

#### Phase L — Local Developer Release (`v1.0.0`)

- [ ] Package metadata, README, version bump
- [ ] Local install verification for contributors
- [ ] Document how to run the CLI from a local checkout
- [ ] CI: lint, test, and self-check on tag
- [ ] Tag: `v1.0.0`
