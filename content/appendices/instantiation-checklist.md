# Instantiation Checklist

A starting point for applying the practices in this book to a new or existing repo. The list follows the order the topics compound: Foundation first, because Agent Instructions have nowhere to live without it.

This is not a required sequence. Apply what fits your context. Stop when the cost exceeds the value. See [Honest Maturity](/foundation/honest-maturity) for how to label what you have versus what you are working toward.

If you have `iec` installed, `iec init` creates the directory scaffold and stub files. Edit each stub for your system before committing. Unedited stubs are worse than no docs.

If brownfield: generate `skeleton.md` before any of the below. Point a capability-class agent at the existing codebase and ask for a structural map: modules, dependencies, key decisions, business rules. See [Brownfield vs Greenfield](/foundation/brownfield-vs-greenfield).

## Foundation

- [ ] `docs/architecture/`: architecture, updated as the system changes, not just at setup
- [ ] `docs/decisions/`: ADRs in MADR format, one per architectural decision
- [ ] `docs/design/`: per-feature design docs. Decide to write-and-forget or keep-current and apply it consistently
- [ ] `openspec/`: change proposals, delta specs, archived changes
- [ ] `AGENTS.md` at the repo root, TOC pattern: short, links to `.agents/`, load clauses for each instruction file
- [ ] `docs/**/README.md`: human-readable document providing an overview of the content in a directory
- [ ] `docs/**/INDEX.md`: one-line description per file in `docs/`, the agent-facing map loaded before anything else

## Agent Instructions

- [ ] `.agents/instructions/` with at least one domain-specific instruction file covering coding standards and architecture constraints
- [ ] Each instruction file has a load clause in `AGENTS.md` naming when to load it
- [ ] Vendor files wired as thin pointers: `CLAUDE.md`, `.cursorrules`, `.github/copilot-instructions.md` each contain one line pointing to `AGENTS.md`
- [ ] Skills added reactively: after the agent repeats a workflow three times, not speculatively

Optional, maturity-dependent:

- [ ] `.agents/hooks/` experiments only once the team is ready. Hook authoring is immature, so treat these as experiments rather than a required part of the hub. See [the instruction hub chapter](/agent-instructions/instruction-hub).

## Spec-Driven Development

This checklist is OpenSpec-first because the book and `iec` are OpenSpec-first. The portable practice is per-change intent with testable acceptance criteria; if your team uses a plain `spec.md` or another framework, translate the `openspec/` paths below to your per-change spec location. See [The Spectrum](/spec-driven/the-spectrum).

- [ ] First change proposal in `openspec/changes/<slug>/` with `proposal.md`, a delta spec under `specs/`, and `tasks.md` (add `design.md` if the change requires technical design decisions)
- [ ] Spec scenarios have AC IDs in bracket format (`[PREFIX-NNN]`) and `Test-type:` fields
- [ ] Spec-eligibility threshold documented in `AGENTS.md`: what change earns a spec, what does not
- [ ] Archive discipline in place: spec moves to `openspec/archive/` when the PR merges

## Quality and Verification

- [ ] `docs/architecture/test-strategy.md`: test types your project uses, frameworks, file locations, coverage thresholds
- [ ] `test/ac-registry.md`: one row per component prefix with the next available number
- [ ] Tests carry `@Tag` annotations for AC ID and test type
- [ ] `iec check` wired in CI: validates structure, AGENTS.md presence, AC traceability

## Team scale

Apply these when solo practices are stable and a second developer joins.

- [ ] Shared instruction conventions extracted from `.agents/instructions/` into a team-level repo or inner-source library
- [ ] Spec-review step added to the PR template
- [ ] PR taxonomy defined and communicated (`docs`, `structural`, `behavioral`)
- [ ] Cross-team ADR location established if the codebase has architectural dependencies with other teams

## What not to do on day one

Do not adopt everything at once. A team that starts with MADR ADRs, OpenSpec change folders, AC IDs, `iec check` in CI, and a shared `.agents/` library on the same week will abandon half of it by the end of the month. Pick one practice per topic. Get it to documented maturity. Add the next one when the first is stable.

*Sources: This checklist is a practical synthesis of the four topics. The sources for each practice appear in the corresponding chapter.*
