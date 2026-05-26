# ASE-CONTEXT-COVER-DEFAULTS: Cover the Agent's Defaults

**Layer**: 1
**Categories**: context, instructions, agent
**Applies-to**: all
**Summary**: The most valuable negative instructions cover the agent's defaults from training data.

## Principle

The most valuable negative instructions cover the agent's defaults. Defaults come from training data, and training data is the internet, not your codebase. If your project uses a pattern the internet rarely uses, the agent will default to the common pattern. The instruction that prevents this is the most valuable one you can write.

## Why it matters

The agent's "reasonable defaults" are reasonable for the average codebase, not for yours. The agent defaults to unit tests for everything, writes comments in a style popular in open-source but not in your team, and structures code the way most tutorials do. Each of these defaults is wrong for some projects, and silent for yours until you write the instruction.

## Violations to detect

- Repeated corrections of the same agent pattern across multiple PRs
- Agent choices that are correct for most projects but wrong for yours
- Conventions the team considers obvious that the agent consistently violates

## Good practice

Identify the three patterns the agent gets wrong most often. Write the three instructions that prevent them. The negative instruction is more valuable than the positive one: "Don't default to unit tests — consult `docs/architecture/test-strategy.md` for the right test type" works better than "Write good tests."

## Sources

- ase-book, *"Writing Instructions" chapter*, ai-instructions section.
- ase-book, *"Test Strategy and Convention" chapter*, quality section.
