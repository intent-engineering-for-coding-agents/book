# ASE-SPECS-SPEC-ELIGIBILITY: Not Every Change Earns a Spec

**Layer**: 1
**Categories**: specs, process, pragmatism
**Applies-to**: all
**Summary**: A typo fix does not earn a spec — define the threshold explicitly.

## Principle

Not every change earns a spec. A typo fix does not. A dependency bump does not. The spec-eligibility threshold is project-specific and should be documented. The question is not "what change is big enough?" but "what change carries enough risk that getting the intent wrong would hurt?"

## Why it matters

Applying the spec process to trivial changes wastes time and breeds cynicism about the process. Applying no spec to risky changes breeds production incidents. The threshold is the bridge between formalism and pragmatism.

## Violations to detect

- No documented spec-eligibility threshold
- Specs written for changes that could have been a single-sentence prompt
- High-risk changes implemented without a spec

## Good practice

Document the threshold in `AGENTS.md` or `docs/architecture/spec-convention.md`. Example: "Any change that modifies business logic, adds a new endpoint, or changes a data model requires a spec. Typo fixes, dependency bumps, and config changes do not."

## Sources

- ase-book, *"Intent Engineering and the SDLC" chapter*, foundation section.
- ase-book, *"When Intent Engineering Fails" chapter*, foundation section.
