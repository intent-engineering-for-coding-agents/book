# The Four Document Types

Open most repositories' `docs/` directory and you will find a flat list of files with similar names. Some of them are decisions. Some are designs. Some are specs that nobody archived. Some were authoritative once and have been quietly wrong for a year.

The agent loads all of them. It cannot tell which is which. Neither can the new developer who joined last month.

This is not a documentation problem. It is a *type* problem. There are four kinds of documents in an ASE repo, each with a different lifespan and a different reason to exist. Mix them and they corrupt each other. Separate them and the repo briefs itself.

## The four types, by lifespan

**Architecture overview** — `docs/README.md`. A narrative description of what the system is and how it fits together. Not a spec. Not a decision record. The briefing for anyone — human or agent — who encounters the repo cold. Lives forever; updated as the architecture changes.

**Agent-facing map** — `docs/INDEX.md`. A table. Every file under `docs/` listed with a one-line description. No prose, no story — a map. Lives forever; updated in the same commit as any file change under `docs/`.

**Architectural Decision Records** — `docs/decisions/`. One file per decision, in MADR format. What the decision was, what was considered, why this option won, what the consequences are. *Permanent and immutable once closed.* Reversing a decision creates a new ADR that references the old one. The history of why is more valuable than the current answer to what.

**Design docs** — `docs/design/`. Per-feature thinking before implementation. Options, approach, risks. Not an ADR — too narrow, too temporary. Not a spec — describes the approach, not the behaviour. Authoritative during the work; historical artefact afterwards. Not deleted; not maintained either.

**Specs** — `openspec/`. The canonical specification of system behaviour: acceptance criteria, scenarios, test definitions. Written before implementation, validated during it, archived to `openspec/changes/archive/` after. An un-archived spec is live instruction. The agent does not know it is supposed to be done.

That is technically five things, because the architecture overview and the agent map share `docs/` but serve different readers. Treating them as one — a single "documentation file" — is the most common collapse and the easiest to make.

## The lifespans matter more than the names

| Type | Lifespan | What that means in practice |
|---|---|---|
| `docs/README.md` | Permanent, updated | Always rewritten in place to stay current |
| `docs/INDEX.md` | Permanent, updated | Maintained on every file change in `docs/` |
| ADRs | Permanent, immutable | Never edited after closing; reversal = new ADR |
| Design docs | Temporary, abandoned | Authoritative during the work, dormant after |
| Specs | Temporary, archived | Moved to archive after implementation |

A team that grasps the lifespan column has the practice. A team that only learns the directory names ends up with a `docs/decisions/` graveyard of superseded specs and a `docs/design/` directory of half-finished thoughts that nobody updated and nobody deleted.

*Sources: Nygard, "Documenting Architecture Decisions," Cognitect (Nov 15, 2011) — origin of ADRs. Kopp, Armbruster, Zimmermann — MADR template (adr.github.io/madr) and CEUR-WS Vol-2072 (2018). OpenSpec (openspec.dev). LeanSpec (lean-spec.dev).*

## What conflation looks like in the wild

An ADR gets edited because the design changed. The decision history is now a lie — readers see the current state and assume that was always the chosen option. The thing that made the ADR valuable, the *why*, has been overwritten by the *what*.

A design doc gets cited six months after the feature shipped. The cite is wrong; the design described what the team intended, not what they ended up with. Anyone reasoning from it is reasoning from a draft.

A spec gets parked in `docs/` because someone thought the team should "keep" it. Now the agent reads it on every session as if the behaviour were still pending implementation. Half the agent's context window is documentation of work that finished last quarter.

Each of these is reversible. Each of them, in a real repo, takes weeks of careful pruning to undo. The simpler move is to keep the four types separate from the start.

## What `ase-cli` does

The `ase-cli` repo at `git tag v0.4.0` shows the structure live. Six ADRs in `docs/decisions/`, all closed and immutable. Design docs in `docs/design/` for features that needed upfront reasoning. Specs in `openspec/specs/` for current behaviour, with completed changes archived to `openspec/changes/archive/`. Run `ase check` against it and the structural validation passes — `docs-readme-exists`, `docs-index-exists`, `adr-format` all green.

That is not because the team is disciplined. It is because the directories make the wrong move harder than the right one. Structure is the cheapest discipline available.
