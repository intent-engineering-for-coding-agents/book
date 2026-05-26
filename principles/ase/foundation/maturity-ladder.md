# ASE-FOUNDATION-MATURITY-LADDER: Distinguish Maturity Levels

**Layer**: 1
**Categories**: foundation, process, honesty
**Applies-to**: all
**Summary**: Distinguish practiced from documented from CI-enforced from target state — honesty prevents process theater.

## Principle

Every practice in the book occupies a maturity rung: practiced (the team does it), documented (written down where the agent reads it), CI-enforced (machines verify it), or target (aspirational, not yet active). Claiming a practice is CI-enforced when it is only documented is process theater. Being explicit about where each practice sits is the defense against that theater.

## Why it matters

When an external auditor or a new team member reads that a practice is "in place," they assume CI-enforced. When the practice is actually only in someone's head, the mismatch creates false confidence. Worse, the agent may rely on a practice that is not actually enforced.

## Violations to detect

- Checklists that claim enforcement without CI verification
- Practices described in present tense that the team no longer follows
- Instructions referencing conventions that are aspirational, not active

## Good practice

Label each practice honestly:
- **Practiced**: the team does it
- **Documented**: written in `docs/` where the agent reads it
- **CI-enforced**: a machine check fails the build when violated
- **Target**: aspirational, not yet active

Not every practice needs to reach CI-enforced. Some pay off at practiced and the enforcement cost is not worth the work.

## Sources

- ase-book, *"Honest Maturity" chapter*, quality section.
- ase-book, plan.md, Living Principles appendix.
