# Agent Instructions

> One file at the root. Everything else follows from it.

Foundation gives the repo structure. Agent Instructions tells the agent which parts of that structure matter, when to load them, and which defaults to stop trusting.

These chapters cover `AGENTS.md`, the instruction hub it points into, instructions that actually change agent behavior, and the limits imposed by the context window. Hooks belong here too, but as an optional enforcement layer, not the starting point.

## Chapters

1. [AGENTS.md: The Entry Point](./agents-md): the TOC pattern, what goes in it, vendor pointers, and why it has to stay short
2. [Agent Instruction Hub](./instruction-hub): `.agents/instructions/`, `.agents/skills/`, `.agents/hooks/`, one folder for all agents
3. [Instructions That Work](./instructions-that-work): specific instructions, negative constraints, architecture boundaries, and how to test whether they work
4. [Skills, Commands, and Hooks](./skills-commands-hooks): when to choose each type, how to write skills that run reliably, and the instruction/skill/hook triangle
5. [Context Window Management](./context-window): why context fills, short sessions, selective loading, subagents, and the INDEX as context economy
