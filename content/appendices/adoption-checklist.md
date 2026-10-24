---
type: appendix
title: Adoption Checklist
---

# Adoption Checklist

A starting point for applying the practices in this book to a new or existing codebase. The list starts with Foundation so later instructions can point to documented decisions and conventions.

This is not a required sequence. Apply what fits your context. Stop when the cost exceeds the value. See [Honest Maturity](/appendices/honest-maturity) for how to label what you have versus what you are working toward.

If you are using `iec` locally, `iec init` creates the directory scaffold and stub files. Edit each stub for your system before committing; an unedited stub only pretends to be documentation.

If brownfield: harvest structure, dependencies, key decisions, design constraints, and business rules into `skeleton.md` and the permanent `docs/` set before any of the below. Review that recovery pass with a domain expert before the first change proposal. Move stable findings into `docs/architecture/`, `docs/design/`, and `docs/decisions/` rather than leaving the next agent session to reverse-engineer them again from `docs/skeleton.md`. See [Brownfield vs Greenfield](/foundation/brownfield-vs-greenfield).

## Foundation

- [ ] `docs/architecture/`: architecture, updated as the system changes, not only at setup
- [ ] `docs/decisions/`: ADRs in MADR format, one per architectural decision
- [ ] `docs/analysis/`: findings from discovery, diagnosis, and spikes. Each ends in a finding, and concluded analyses stay frozen
- [ ] `docs/design/`: per-feature design docs. Decide to write-and-forget or keep-current and apply it consistently
- [ ] `openspec/` (the OpenSpec spec directory, if your team uses OpenSpec): change proposals, delta specs, archived changes
- [ ] `AGENTS.md` at the repo root, TOC pattern: short, links to `.agents/`, load clauses for each instruction file
- [ ] A map for each documentation directory: use a short README with an embedded index, or a separate `INDEX.md` when the README runs long. Point the agent to the relevant map for the task

## Agent Instructions

- [ ] `.agents/instructions/` with at least one domain-specific instruction file covering coding standards and architecture constraints
- [ ] Each instruction file has a load clause in `AGENTS.md` naming when to load it
- [ ] Confirm each agent setup loads the shared `AGENTS.md` rules, using a vendor-specific import where needed
- [ ] Add a skill when a recurring procedure needs named inputs and a completion check

## Spec-Driven Development

This checklist is OpenSpec-first because the book is OpenSpec-first. The portable practice is per-change intent with testable acceptance criteria. For the detailed change-folder lifecycle and archive discipline, see [Spec Lifecycle](/spec-driven/spec-lifecycle). If your team uses a plain `spec.md` or another framework, translate the `openspec/` paths below to your per-change spec location. See [The Spectrum](/spec-driven/the-spectrum).

- [ ] For the first change, create a proposal in `openspec/changes/<slug>/` with `proposal.md`, a delta spec under `specs/`, and `tasks.md` (add `design.md` if the change requires technical design decisions)
- [ ] Spec scenarios have AC IDs in bracket format (`[PREFIX-NNN]`) and `Test-type:` fields
- [ ] Spec-eligibility threshold documented in `AGENTS.md`: what change earns a spec, what does not
- [ ] For the ticket-based team workflow, each ticket has one proposal named with its ticket identifier
- [ ] Complete the ticket only after verification, integration, and proposal archiving. Create the next proposal when its ticket starts

## Quality and Verification

- [ ] `docs/architecture/test-strategy.md`: test types your project uses, frameworks, file locations, coverage thresholds
- [ ] `tests/ac-registry.md`: one row per component prefix with the highest number used
- [ ] Tests carry AC ID and test-type markers in the form supported by the test framework
- [ ] Important agent-facing docs declare the code they describe and expose drift when that code changes
- [ ] CI validation of structure, AGENTS.md presence, and AC traceability (`iec check` is one implementation; wire your own checks if you prefer)

## Team scale

Apply these when solo practices are stable and a second developer joins.

- [ ] Shared `AGENTS.md` and instruction files maintained in the team's repo; share reusable skills across repos when several teams need them
- [ ] Spec-review step added to the PR template
- [ ] PR taxonomy defined and communicated (`docs`, `structural`, `behavioral`)
- [ ] Cross-team ADR location established if the codebase has architectural dependencies with other teams

## What not to do on day one

Do not adopt everything at once. A team that starts with MADR ADRs, OpenSpec change folders, AC IDs, automated checks in CI, and a shared `.agents/` library in the same week is creating a process migration, not a better agent workflow. Pick one practice per topic, get it to documented maturity, and add the next one when the first is stable.

*Sources: This checklist is a practical synthesis of the four topics. The sources for each practice appear in the corresponding chapter.*
