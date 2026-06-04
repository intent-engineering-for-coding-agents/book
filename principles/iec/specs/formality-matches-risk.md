# IEC-SPECS-FORMALITY-MATCHES-RISK: Match Formality to Risk

**Layer**: 1
**Categories**: specs, risk, sdd
**Applies-to**: all
**Summary**: Match formality to risk — payment processing earns a thorough spec; a config-key rename does not.

## Principle

Match formality to risk. Payment processing earns a thorough spec with explicit ACs, security review, and multi-LLM critique. A config-key rename does not. The spectrum runs from a raw prompt through a formatted `spec.md` to a full OpenSpec with test traceability. The right level is the lowest one that catches the risks the change carries.

## Why it matters

Overspecifying trivial changes wastes time and context. Underspecifying risky changes produces implementations that pass tests but violate intent. Every project has a threshold below which the spec is not worth writing. Being explicit about that threshold prevents both extremes.

## Violations to detect

- Heavyweight spec process applied to typo fixes or dependency bumps
- Raw prompts used for changes that touch payment, auth, or data integrity
- No documented threshold for when a change earns a spec

## Good practice

Define the spec-eligibility threshold in `AGENTS.md` or `docs/architecture/spec-convention.md`. The question is not "what change is big enough?" but "what change carries enough risk that guessing wrong would hurt?"

## Sources

- intent-book, *"The Spectrum" chapter*, specs section.
- intent-book, *"When Intent Engineering Fails" chapter*, foundation section.
