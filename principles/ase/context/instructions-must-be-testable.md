# ASE-CONTEXT-INSTRUCTIONS-MUST-BE-TESTABLE: Instructions Must Be Testable

**Layer**: 1
**Categories**: context, instructions, quality
**Applies-to**: all
**Summary**: Can the agent produce concrete behavior from this instruction, or does it have to guess?

## Principle

A useful test for any instruction: can the agent produce a concrete behavior from it, or does it have to guess what you meant? Vague instructions — "write good tests," "follow best practices" — are not instructions. They are aspirations. The agent already knows those words; it does not know what they mean in your codebase.

## Why it matters

An instruction that the agent cannot translate into a specific action is wasted context. Worse, it creates the illusion that the agent has been briefed when it has not. The team trusts that the agent "knows to write good tests" when the instruction gave the agent nothing actionable.

## Violations to detect

- Instructions with no concrete examples
- Instructions that use words like "proper," "good," "clean," or "best" without defining them
- Instructions that describe outcomes without describing the steps to achieve them

## Good practice

Bad: "Follow clean architecture principles."
Good: "Place business logic in `src/core/`. Controllers in `src/api/` delegate to services in `src/core/`. Controllers must not import repository interfaces directly."

## Sources

- ase-book, *"Writing Instructions" chapter*, agent-instructions section.
