# ASE-QUALITY-THREE-GATES: Quality is Three Gates, Not One

**Layer**: 1
**Categories**: quality, checkpoints, process
**Applies-to**: all
**Summary**: Quality is three gates in sequence (before, during, after), each looking at what the others cannot see.

## Principle

Quality is not a single gate. It is three gates in sequence, each looking at something the others cannot see. Before: did the work start from a stable foundation? During: was the work carried out against a real spec, with the right context? After: does the artefact actually prove what it claims to prove?

## Why it matters

A single gate — "did the build pass?" — checks only the after. It does not check whether the agent had the right architecture document loaded, whether the spec was still being negotiated during implementation, or whether the test actually proves the behavior. Three gates catch what one gate misses.

## Violations to detect

- Quality defined only by CI passing
- No check that the agent loaded the right context before starting
- No verification that the spec was stable during implementation
- Tests that pass but don't prove the spec's claims

## Good practice

Before: verify `AGENTS.md` is current, architecture docs are readable by the agent, test strategy is in place. During: hold the spec stable, verify the agent is working from the right context. After: review spec → review diff against spec → review diff on own merits → verify tests prove the spec, not just pass.

## Sources

- ase-book, *"Before, During, After Checkpoints" chapter*, quality section.
- Anthropic, *"Building effective agents"* (Dec 2024).
