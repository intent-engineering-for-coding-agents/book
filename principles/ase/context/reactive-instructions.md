# ASE-CONTEXT-REACTIVE-INSTRUCTIONS: Write Instructions Reactively

**Layer**: 1
**Categories**: context, instructions, agent
**Applies-to**: all
**Summary**: Write instructions reactively — you do not know what the agent will get wrong until it gets it wrong.

## Principle

Start minimal and add instructions reactively. The agent violates a convention. Write the instruction that prevents it. You do not know what the agent will get wrong until it gets it wrong. Speculative instructions written before the failure has occurred are guesses about a problem that may never materialize.

## Why it matters

Speculative instructions bloat the context budget with rules the agent may never need. They also create a false confidence that the agent has been briefed on something it never actually violated. The reactive approach keeps the instruction set lean and each instruction tethered to a real failure.

## Violations to detect

- Instruction files with rules that have no corresponding past failure
- Instructions that describe hypothetical problems
- An instruction file growing faster than the codebase

## Good practice

The cycle: observe a failure → write the smallest instruction that prevents it → verify it works → move on. Each instruction has a documented reason for existing.

## Sources

- ase-book, *"Writing Instructions" chapter*, agent-instructions section.
