# Adoption Checklist

A starting point for applying the practices in this book to a new or existing repo. The list follows the order the topics compound: Foundation first, because Agent Instructions have nowhere to live without it.

This is not a required sequence. Apply what fits your context. Stop when the cost exceeds the value. See [Honest Maturity](/appendices/honest-maturity) for how to label what you have versus what you are working toward.

If you are using `iec` locally, `iec init` creates the directory scaffold and stub files. Edit each stub for your system before committing. Unedited stubs are worse than no docs.

If brownfield: harvest structure, dependencies, key decisions, design constraints, and business rules into `skeleton.md` and the permanent `docs/` set before any of the below. Review that recovery pass with a domain expert before the first change proposal. Move stable findings into `docs/architecture/`, `docs/design/`, and `docs/decisions/` rather than leaving the next agent session to reverse-engineer them again from `docs/skeleton.md`. See [Brownfield vs Greenfield](/foundation/brownfield-vs-greenfield).

## Foundation

- [ ] `docs/architecture/`: architecture, updated as the system changes, not only at setup
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

- [ ] `.agents/hooks/` experiments only once the team is ready. As of mid-2026, hook authoring is immature, so treat hooks as experiments rather than a required part of the hub. See [the instruction hub chapter](/agent-instructions/instruction-hub).

## Spec-Driven Development

This checklist is OpenSpec-first because the book is OpenSpec-first. The portable practice is per-change intent with testable acceptance criteria. For the detailed change-folder lifecycle and archive discipline, see [Spec Lifecycle](/spec-driven/spec-lifecycle). If your team uses a plain `spec.md` or another framework, translate the `openspec/` paths below to your per-change spec location. See [The Spectrum](/spec-driven/the-spectrum).

- [ ] First change a proposal in `openspec/changes/<slug>/` with `proposal.md`, a delta spec under `specs/`, and `tasks.md` (add `design.md` if the change requires technical design decisions)
- [ ] Spec scenarios have AC IDs in bracket format (`[PREFIX-NNN]`) and `Test-type:` fields
- [ ] Spec-eligibility threshold documented in `AGENTS.md`: what change earns a spec, what does not
- [ ] Archive discipline in place: spec moves to `openspec/changes/archive/` when the PR merges

## Quality and Verification

- [ ] `docs/architecture/test-strategy.md`: test types your project uses, frameworks, file locations, coverage thresholds
- [ ] `test/ac-registry.md`: one row per component prefix with the next available number
- [ ] Tests carry `@Tag` annotations for AC ID and test type
- [ ] Important agent-facing docs declare the code they describe and surface drift when that code changes
- [ ] CI validation of structure, AGENTS.md presence, and AC traceability (`iec check` is one implementation; wire your own checks if you prefer)

## Team scale

Apply these when solo practices are stable and a second developer joins.

- [ ] Shared instruction conventions extracted from `.agents/instructions/` into a team-level repo or inner-source library
- [ ] Spec-review step added to the PR template
- [ ] PR taxonomy defined and communicated (`docs`, `structural`, `behavioral`)
- [ ] Cross-team ADR location established if the codebase has architectural dependencies with other teams

## What not to do on day one

Do not adopt everything at once. A team that starts with MADR ADRs, OpenSpec change folders, AC IDs, automated checks in CI, and a shared `.agents/` library in the same week is creating a process migration, not a better agent workflow. Pick one practice per topic, get it to documented maturity, and add the next one when the first is stable.

*Sources: This checklist is a practical synthesis of the four topics. The sources for each practice appear in the corresponding chapter.*