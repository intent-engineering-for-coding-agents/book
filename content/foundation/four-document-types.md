# The Four Document Types

Conflating document types is one of the most common ways a repo's documentation degrades. An architectural decision record that gets overwritten when the system changes is no longer a decision record. A design doc that is cited six months later as if it were authoritative is no longer disposable. Specs and ADRs stored in the same directory with the same naming convention look identical until the moment you need to tell them apart — at which point you cannot.

The fix is simple: treat each document type as distinct, give each type its own home, and understand that the types have fundamentally different lifespans.

## The four types

### Architecture overview — `docs/README.md`

A narrative description of what the system is and how it fits together. Not a spec. Not a decision record. A briefing for anyone — human or agent — who encounters the repo cold.

Lifespan: **permanent, but updated**. As the architecture evolves, `docs/README.md` evolves with it. It is never deleted; it is kept current.

Why it lives at `docs/README.md`: every Git host renders `README.md` automatically. The architecture overview is the first thing a developer or agent sees when they navigate to `docs/` in a browser. That automatic rendering is the point.

### Agent-facing map — `docs/INDEX.md`

A table listing every file under `docs/`, each with a one-line description of what it contains. No prose, no explanation — a map.

Lifespan: **permanent, updated on every file change**. When you add a file to `docs/`, you add a row to `docs/INDEX.md` in the same commit.

Why it matters: agents load files sequentially. Without an index, an agent exploring a large `docs/` directory must read each file to find the relevant one — expensive in tokens. With an index, the agent loads one 40-line file and knows exactly where to look. This is the context economy principle in practice.

### Architectural Decision Records — `docs/decisions/`

One file per architectural decision, in MADR format. What the decision was, what was considered, why this option was chosen, and what the consequences are.

Lifespan: **permanent and immutable once closed**. An ADR is never overwritten. If a decision is reversed, a new ADR records the reversal and references the original. The history of why a decision was made is more valuable than the decision itself.

Credit: the ADR practice originated with Michael Nygard's 2011 post "Documenting Architecture Decisions." The MADR template — the structured Markdown format used in this book — was developed by Oliver Kopp, Anita Armbruster, and Olaf Zimmermann.

*Sources: Nygard, "Documenting Architecture Decisions," Cognitect blog (Nov 15, 2011). Kopp, Armbruster, Zimmermann — MADR template (adr.github.io/madr, ongoing) and CEUR-WS Vol-2072 (2018).*

### Design docs — `docs/design/`

Per-feature documents that capture the thinking before implementation: options considered, approach chosen, key risks. Not an ADR — the decision is too narrow or too temporary to warrant permanent status. Not a spec — the design doc explains the approach; the spec defines the behaviour.

Lifespan: **temporary and disposable**. A design doc is written before implementation and is authoritative during it. Once the feature ships, the design doc becomes a historical artefact. It is not deleted — deletion makes the history unreachable — but it is not maintained either. Its authority expires at ship time.

### Specs — `openspec/`

Specifications of system behaviour: acceptance criteria, scenarios, test definitions. The canonical source of truth for what the system should do and how you prove it does.

Lifespan: **temporary, archived after implementation**. A spec is written before implementation, validated during it, and moved to `openspec/changes/archive/` after. An un-archived spec is live context — the agent treats it as active. An archived spec is historical record.

*Sources: OpenSpec (openspec.dev) — change-folder and archive workflow. LeanSpec (lean-spec.dev) — spec discipline and sizing guidance.*

## Why conflating them corrupts both

When ADRs and design docs share a directory with the same naming convention, two things happen. First, the agent cannot tell which files are authoritative and permanent (ADRs) and which are disposable (design docs). It treats them the same. Second, the humans on the team start treating them the same too — overwriting old design docs, appending to ADRs instead of closing them.

When specs and ADRs are stored together, the spec's temporary authority bleeds into the ADR's permanent status. Teams archive their specs into the decisions directory and call it "architecture documentation." Six months later the decisions directory is a graveyard of superseded specifications masquerading as permanent records.

The fix is not a documentation system or a governance process. It is four named directories with understood lifespans: `docs/README.md` and `docs/INDEX.md` for permanent orientation, `docs/decisions/` for permanent immutable records, `docs/design/` for temporary per-feature thinking, and `openspec/` for temporary behavioural specifications.

## Evidence in ase-cli

The `ase-cli` repo instantiates this pattern at `git tag v0.1.0`. Six ADRs in `docs/decisions/`, each closed and immutable. Design docs in `docs/design/` for features that needed upfront reasoning. Specs in `openspec/specs/`, with completed changes archived under `openspec/changes/archive/`. The `ase check` tool validates the structure and will flag violations.
