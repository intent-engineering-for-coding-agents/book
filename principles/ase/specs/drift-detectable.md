# ASE-SPECS-DRIFT-DETECTABLE: Intent Engineering Makes Drift Detectable, Not Impossible

**Layer**: 1
**Categories**: specs, limits, honesty
**Applies-to**: all
**Summary**: Intent Engineering does not make your codebase drift-proof — it makes drift detectable and recoverable.

## Principle

Intent Engineering does not make your codebase drift-proof. It makes drift detectable and recoverable, which is a meaningfully weaker claim, and the honest one. No process prevents drift entirely. What Intent Engineering provides is the machinery to notice when drift has happened and the procedures to recover from it.

## Why it matters

Claiming drift-proof is dishonest and sets expectations that guarantee disappointment. Claiming drift-detectable tells the team what they can actually expect: the agent will sometimes go off-script, but the structure exists to catch it. The difference is the difference between a promise and a practice.

## Violations to detect

- Marketing claims of "zero drift" when no process can guarantee it
- Lack of drift-detection mechanisms (spec-to-code traceability, AC coverage tracking)
- No documented recovery procedure for when drift is detected

## Good practice

The drift detection stack: AC IDs link specs to tests → coverage reports show which ACs have proofs → failing tests flag when behavior changes → stale spec detection flags specs that haven't been updated alongside code. Drift happens. The question is whether you find out in review or in production.

## Sources

- ase-book, *"When Intent Engineering Fails" chapter*, foundation section.
