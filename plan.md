# Intent Engineering for Coding Agents (Plan v4: Launch Readiness)

> Structure, specs, and proof for agentic software engineering.

> Your coding agent is productive, but clueless about your system and intention.

Plan v3 tracked the rename and rebrand from "The ASE Book / Agentic Software
Engineering" to "Intent Engineering for Coding Agents." That work is complete. This
plan supersedes it and refocuses on the path to public launch. The v3 rename detail and
the v2 master live in git history. The detailed phase trackers are in
`plan-intent-book.md` (book) and `plan-intent-cli.md` (companion CLI).

The book content is written end to end. The companion CLI shipped at `v1.0.0`. What
remains is polish and release: a full prose read-through, launch-readiness on the site,
and the launch itself.

## Current book outline for review alignment

Use this section, not any checklist below, when running `review-chapter` or
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
  - AC IDs and Coverage: keep scenarios traceable to tests with stable IDs and coverage pairs.
  - Before, During, After Checkpoints: place checks across the change lifecycle.
  - What the Scanners Miss: keep security review layered around agent-generated work.
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
- Appendices: provide reference material only: glossary, principles, tool snapshot, companion repo, checklist, feedback, credits, and Honest Maturity (what is ready now, what is experimental, what should not be oversold).

## Decisions (locked)

Carried from v3, still in force. Full rationale is in git history (Plan v3).

- Practice name: Intent Engineering. The discipline, within agentic software engineering,
  of directing AI agents by engineering intent rather than writing code.
- Book title: Intent Engineering for Coding Agents. Subtitle: Structure, specs, and proof
  for agentic software engineering. "Proof" means executable evidence, not formal proof.
- Book repo: `intent-engineering-for-coding-agents/book`. Companion CLI:
  `intent-engineering-for-coding-agents/cli`, command `iec`.
- "Agentic software engineering" stays the umbrella field; Intent Engineering is the
  practice named beneath it.
- Licensing: book prose under CC-BY-4.0 (`LICENSE-CONTENT`), code and config under
  Apache-2.0 (`LICENSE`).
- Principles migration (`principles/iec/`, `groups/intent-book.yaml`, the mirrored table
  in `living-principles.md`) moves with the CLI later, as one unit. `IEC-*` IDs unchanged.

## Rename (v3): complete

The rename is done and verified. For the record:

- Brand and config carry the new name (`.vitepress/config.mts`, `package.json`,
  `content/index.md`, `idea.md`).
- The two ase-slugged chapters were renamed with history preserved:
  `when-intent-engineering-fails.md`, `intent-engineering-and-the-sdlc.md`.
- Prose migration applied the practice-vs-umbrella classification rule. `\bASE\b` survives
  only as intentional umbrella references and the deferred `living-principles.md` table.
- Glossary defines both Intent Engineering (the practice) and Agentic Software Engineering
  (the umbrella).
- The CLI command name resolved to `iec` (the old `ase` entry-point worry is closed).

## Status: where things stand

- Book content: complete (Foundation, Agent Instructions, Spec-Driven, Quality, Team,
  Appendices). Phases M-T shipped through tag `v0.7.0`.
- Companion CLI: complete at `v1.0.0`. See `plan-intent-cli.md`.
- Repo: public, deployed via GitHub Actions to
  https://intent-engineering-for-coding-agents.github.io/book/ (base `/book/`).
- Feedback and contributing: shipped. Per-page "Suggest a change" edit links, issue forms
  (`correction`, `suggestion`) with blank issues disabled, Discussions enabled and routed,
  `CONTRIBUTING.md`, PR template, a `Feedback & Contributing` appendix page, and a
  `Contents` nav dropdown grouping the five parts.
- Open before `v1.0.0`: full prose read-through (Phase U), launch domain decision.

## Launch readiness

Tracked in detail under `plan-intent-book.md` Phase U.5. Summary of state:

- [x] Site search (VitePress local provider).
- [x] Real home landing page (`content/index.md` hero + feature cards, replacing the
  old meta-refresh redirect).
- [x] SEO and social: `og:`/`twitter:` meta and a generated `sitemap.xml`.
- [x] Social card: `content/public/og-image.svg` (source) rasterized to
  `content/public/og-image.png` (1200x630); `og:`/`twitter:` meta point at the PNG.
- [x] Root `README.md` with overview, live URL, build commands, license scope.
- [x] Dual license: `LICENSE-CONTENT` (CC-BY-4.0) alongside `LICENSE` (Apache-2.0).
- [x] `CODE_OF_CONDUCT.md` (Contributor Covenant by reference).
- [x] Live Pages URL filled into `.github/profile/README.md`; `package.json` `repository`
  and `homepage` fields added.
- [x] Full prose read-through (Phase U) — done, many fixes applied.
- [ ] Tag `v0.8.0`.

## Author launch checklist

Carried forward. Work through these near public launch.

- [ ] Decide and buy the domain (was `intent-book.dev`; revisit under the new name).
- [ ] Submit a PR to awesome-agentic-engineering on launch day.
- [ ] Post "Show HN" on launch day, leading with the `iec` proof.
- [ ] Announce via the AI Engineer community and reach out to Latent Space.
- [ ] Cross-post a chapter excerpt to dev.to and Medium.
