# Intent Engineering for Coding Agents (Plan v3)

> Structure, specs, and proof for agentic software engineering.

> Your coding agent is productive, but clueless about your system and intention.

This plan supersedes Plan v2. It records the rename and rebrand of the book from
"The ASE Book / Agentic Software Engineering" to "Intent Engineering for Coding
Agents," and the work needed to carry that name through the repo. Earlier plan files
(`plan-intent-book.md`, `plan-iec-cli.md`) were renamed to `plan-intent-book.md` and
`plan-intent-cli.md` when the CLI companion repo was renamed from `iec-cli` to
`intent-cli`. The v2 master lives in git history.

## Current book outline for review alignment

Use this section, not the rename checklist below, when running `review-chapter` or
checking a draft against the intended book arc. The book is OpenSpec-first: Intent
Engineering is the portable practice, and OpenSpec is the concrete workflow used for
the worked examples and the `iec` companion repo.

- Foreword: establish the practical tension around agentic speed, durable intent, and
  why this book argues for structure rather than prompt cleverness.
- Introduction: define Intent Engineering for Coding Agents, distinguish it from ADLC,
  name the four-topic arc, and state that OpenSpec is the reference workflow used in the book.
- Foundation: make the repo legible to an agent before any per-change intent exists.
  - Why Structure Matters: undocumented context is cognitive debt the agent cannot infer reliably.
  - Document Types: separate ADRs, design docs, specs, indexes, and generated maps by job.
  - Plain-Text-as-Code: explain why durable agent context should live in reviewable text.
  - The Map: Intent Engineering and the SDLC: locate the practice inside existing delivery loops.
  - Brownfield vs Greenfield: contrast bootstrapping from existing code with building from explicit intent.
  - When Intent Engineering Fails: name the failure modes that survive good structure.
- Agent Instructions: turn repo knowledge into instructions agents can load consistently.
  - AGENTS.md: One File Changes Everything: introduce the canonical entry point and TOC pattern.
  - From AGENTS.md to Agent Instruction Hub: split instructions, skills, and hooks by job.
  - Writing Instructions That Work: make rules specific, loadable, and verifiable.
  - Skills, Commands, and Hooks: distinguish advisory guidance from repeatable workflows and deterministic checks.
  - Context Window Management: keep agent attention focused on current work.
- Spec-Driven Development: make the change-specific intent durable before code is generated.
  - Why Specs?: show why the agent needs per-change intent, not only permanent context.
  - Why Small?: keep each spec within the size a session and reviewer can hold.
  - The Spectrum: compare raw prompts, lightweight specs, OpenSpec, and heavier SDD tooling.
  - Spec Lifecycle: follow an OpenSpec change from proposal through critique, implementation, and archive.
  - Docs > Specs > Code: argue that documentation is the durable source of truth, specs are executable acceptance-criteria guardrails, and generated code is downstream of both.
- Quality and Verification: connect spec intent to executable proof.
  - Tests as Proof, Not Ritual: treat tests as evidence that the implementation matches intent.
  - Test Strategy and Convention: declare which test type proves which boundary.
  - Agent Evaluation and Regression: test the agent setup itself when instructions, skills, or hooks change.
  - AC IDs and Positive/Negative Coverage: keep scenarios traceable to tests with stable IDs and coverage pairs.
  - Before, During, After Checkpoints: place checks across the change lifecycle.
  - Security in Depth: keep security review layered around agent-generated work.
  - PR Taxonomy: make review shape match risk and uncertainty.
  - .principles: Raising the Bar: connect local rules to a living principle catalog.
- Team Workflows: show how the OpenSpec-first workflow fits normal team delivery.
  - OpenSpec Across Stacks: scope change folders by stack and use ADRs for cross-tier contracts.
  - OpenSpec in an Existing SDLC: map change folders onto tickets, boards, PRs, ADRs, and changelogs.
  - Trunk-Based Development with Agents: keep change folders and branches short-lived.
  - Code Review for Agent-Generated Code: review intent first, then generated diff.
  - Shared Agent Instruction Conventions: keep team instructions shared without erasing role-specific briefs.
  - Cross-Team Coordination: use ADRs and inner-source instruction libraries where one repo is not enough.
  - What Is Still Evolving: be explicit about immature practices and mid-2026 limits.
- Appendices: provide reference material only: glossary, principles, tool snapshot, companion repo, checklist, credits, and Honest Maturity (what is ready now, what is experimental, what should not be oversold).

## Why rename

"The ASE Book" leaned on an acronym that is opaque to newcomers and collides with
unrelated meanings (Automotive Service Excellence, Sybase ASE). A title built on an
acronym nobody says out loud is a discoverability tax.

"Agentic Software Engineering" is a broad, emerging field term whose center of gravity
(autonomy, orchestration, multi-agent delivery) is not what this book is about. The
book's thesis is narrower and sharper: the engineer's deliverable is no longer code, it
is well-engineered intent that an agent turns into code.

The field has a clean stack above prompt engineering. Context engineering covers what
the agent sees. Intent engineering covers what should be built and how to verify it. The
book's four topics map onto it: Foundation and Agent Instructions supply context; Spec-Driven
Development and Quality/Verification are intent proper. The book is renamed to name what it
teaches.

## Decisions (locked)

- Practice name: Intent Engineering. The discipline, within agentic software engineering,
  of directing AI agents by engineering intent rather than writing code. Context
  (Foundation, Agent Instructions) is the substrate that makes intent executable. Specs state
  the target. Verification proves the hit.
- Book title: Intent Engineering for Coding Agents. The domain qualifier differentiates
  the book from the generic, already-used term "intent engineering" (intentengineering.dev,
  vendor glossaries, the arXiv "Intent Formalization" paper) and removes the "intent =
  UX/product intent" ambiguity. The public title intentionally omits "AI" because the book
  focuses on coding agents as the working role, not artificial intelligence as a broad category.
- Subtitle: Structure, specs, and proof for agentic software engineering. "Proof" means
  executable evidence through tests, traceability, and reviewable artifacts, not formal
  mathematical proof.
- Book repo: intent-engineering-for-coding-agents. The full slug carries the same domain
  qualifier as the title and avoids relying on the generic phrase "intent engineering" alone.
- ASE stays as the umbrella. "Agentic software engineering" remains the broader discipline
  the practice sits within. It is not deleted; the practice is named beneath it.
- CLI renamed to `intent-cli`, command name `iec`. The companion CLI repo was renamed from
  `iec-cli` to `intent-cli`; the command is `iec` (Intent Engineering Checker). Short,
  distinctive, same shape as `ase`, no collision risk. Nothing is published so no backwards
  compatibility constraint applies. Public package distribution remains out of scope.
  Contributor-facing notes explain how to run the CLI locally when readers inspect the tool as
  supporting evidence.
- The principles catalog (`principles/iec/`, `groups/intent-book.yaml`, and the mirrored table
  in `content/appendices/living-principles.md`) moves with the CLI later, as one unit. The
  `IEC-*` principle IDs are not renamed in this pass. (The CLI repo rename to `intent-cli`
  does not constitute the full principles migration; that remains deferred.)

## The classification rule (the heart of this rename)

Every existing "ASE" token is one of two things. Classify, do not blind-replace.

- Practice reference becomes "Intent Engineering". Anything meaning the framework, the four
  topics, or the thing this book teaches. Examples: "the first topic of ASE", "adopt ASE",
  "ASE practices", "When ASE Fails", "ASE and the SDLC", "the Foundation chapter applies it
  to ASE". This is the large majority of occurrences.
- Umbrella reference keeps "agentic software engineering". The places that situate the
  practice within the broader field, or contrast it with adjacent fields (the ADLC contrast
  in the introduction and glossary). Rewrite these so the relationship is explicit: "Intent
  Engineering sits within agentic software engineering."

Default for this book: an unqualified "ASE" almost always means the practice, so it becomes
Intent Engineering. The umbrella term appears only where it is doing positioning work.

## Changes: rename now

### 1. Brand and config

- `.vitepress/config.mts`: `title: 'ASE Book'` becomes `'Intent Engineering'`. `description`
  becomes `'Intent Engineering for Coding Agents: Structure, specs, and proof for agentic
  software engineering'`. The GitHub social link uses the org repo at
  `https://github.com/intent-engineering-for-coding-agents/intent-book`. The companion CLI lives at `https://github.com/intent-engineering-for-coding-agents/cli`.
- `content/index.md` (home hero): `name` becomes `"Intent Engineering"`. `text` becomes
  `"for Coding Agents"`. `tagline` becomes "Structure, specs, and proof for agentic software
  engineering."
- `package.json`: `name` becomes `"intent-engineering-for-coding-agents"`. `description`
  becomes "Intent Engineering for Coding Agents: Structure, specs, and proof for agentic
  software engineering." (Cosmetic. This is the book's npm package, not the CLI.)
- `package-lock.json`: root package `name` becomes `"intent-engineering-for-coding-agents"`
  to match `package.json`.
- `idea.md`: title line and the mindmap root and "When ASE Fails" node updated.

### 2. Prose migration (apply the classification rule)

Files carrying "ASE" as the practice (execution applies the rule line by line):
`content/introduction.md`, `content/foundation/index.md`,
`content/foundation/when-ase-fails.md`, `content/foundation/ase-and-the-sdlc.md`,
`content/foundation/plain-text-as-code.md`, `content/foundation/why-structure.md`,
`content/foundation/document-types.md`, `content/foundation/honest-maturity.md`,
`content/quality/ac-ids-coverage.md`, `content/quality/dot-principles.md`,
`content/team/what-is-still-evolving.md`, `references.md`.

Key prose rewrite, `content/introduction.md`: replace the "This is the territory of Agentic
Software Engineering (ASE)..." paragraph with one that introduces Intent Engineering as the
practice and positions it within agentic software engineering. Keep the Developer AI framing
and the ADLC contrast intact.

### 3. Reframe the four-topics narrative (content, not find/replace)

The title promises intent, but two topics (Foundation, Agent Instructions) are context. To keep
the title honest, frame context as in service of intent wherever the four topics are
introduced as a set.

- `content/introduction.md` ("What to expect"): the first two topics give the agent context;
  the last two are intent. Context is the substrate, intent is the point.
- `content/foundation/index.md`: Foundation grounds the agent so your intent becomes
  executable, not a co-equal subject.
- `idea.md` topic descriptions and mindmap match.

### 4. File and link renames (the two ase-slugged chapters)

- `content/foundation/when-ase-fails.md` becomes `when-intent-engineering-fails.md`
- `content/foundation/ase-and-the-sdlc.md` becomes `intent-engineering-and-the-sdlc.md`

Use `git mv` to preserve history. Each rename requires updating every inbound link:

- `.vitepress/config.mts` sidebar entries (text and link): "The Map: ASE and the SDLC"
  becomes "The Map: Intent Engineering and the SDLC". "When ASE Fails" becomes "When Intent
  Engineering Fails".
- `content/foundation/index.md` chapter list links (items 4 and 7).
- `content/foundation/why-structure.md` cross-link to "When ASE Fails".
- `content/appendices/glossary.md` "See ..." links.
- `references.md` ("cited in 'The Map: ASE and the SDLC'").
- Grep the old slugs across `content/` before finalizing to catch any other cross-references.

### 5. Glossary (`content/appendices/glossary.md`)

- Repoint "## Agentic Software Engineering (ASE)" to define the umbrella field, not "the
  framework this book describes."
- Add "## Intent Engineering": the practice this book teaches, within agentic software
  engineering. Context serves intent. Specs and verification are intent proper.
- Update entries that reference the practice: ADLC entry ("Distinct from ASE"), Brownfield
  ("predates ASE practices", "adopt ASE from intent"), Greenfield ("Greenfield ASE
  adoption"), SDD ("one of the four topics in ASE").
- Follow `.agents/instructions/glossary-maintenance.md` for first-use expansion.

## Deferred: explicitly NOT in this pass

- `iec-cli` CLI tool name (kept for now — subsequently renamed to `intent-cli` with command `iec`).
- `principles/iec/` tree, `groups/intent-book.yaml`, and the mirrored `living-principles.md`
  table. They move with the CLI later, as one unit.
- GitHub owner for the selected repo slug `intent-engineering-for-coding-agents` and domain
  `intent-book.dev`. Launch-time brand decisions, tracked in the launch checklist below.
- `groups/intent-book.yaml`, `.idea/intent-book.iml`. Internal and editor config, low value.

## Order of operations

1. Brand and config edits (section 1) and glossary (section 5). Establishes the canonical new
   vocabulary.
2. File renames and all inbound link updates (section 4).
3. Prose migration pass applying the classification rule (section 2).
4. Four-topics reframe (section 3).
5. Build and verify.

## Verification

- `npm run docs:build` completes with no dead-link errors (catches missed inbound links from
  the two renamed files).
- Grep `"ASE Book"` and `"The ASE Book"` across `content/`, configs, `package.json`, and
  `idea.md`. Zero results.
- Grep `\bASE\b` across `content/`. Only intentional umbrella references remain (and the
  deferred `living-principles.md` table). Spot-read each to confirm it positions the practice
  within the field rather than naming the practice. Tooling token `principles/iec/` is expected
  and allowed; `iec-cli` should no longer appear — it is now `intent-cli` / `iec`.
- `npm run docs:dev`. Visually confirm the hero, nav title, and the two renamed chapter pages
  render and link correctly.
- Read `content/introduction.md` and the glossary end to end for umbrella-versus-practice
  coherence and the context-serves-intent framing.

## Open decisions (not blocking this pass)

- CLI command name locked as `iec` (Intent Engineering Checker). Propagate to all book
  references (`iec init`, `iec check`, `iec generate`) before v1.0.0.
- Principles migration (`principles/iec/`, `groups/intent-book.yaml`): moves with the CLI as one
  unit when the CLI is ready for it.
- External brand at launch: GitHub org is `intent-engineering-for-coding-agents` (confirmed);
  domain remains a launch-time decision.

## Author launch checklist

Carried forward from v2. Work through these near public launch.

- [ ] Decide and buy the domain (was `intent-book.dev`; revisit under the new name).
- [ ] Submit a PR to awesome-agentic-engineering on launch day.
- [ ] Post "Show HN" on launch day, leading with the `iec` proof.
- [ ] Announce via the AI Engineer community and reach out to Latent Space.
- [ ] Cross-post a chapter excerpt to dev.to and Medium.
