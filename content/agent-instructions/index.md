# Agent Instructions

> One file at the root. Everything else follows from it.

The Foundation topic gave the codebase its structure. Agent Instructions is what tells the agent which files describe that structure, which ones are load-bearing, and when to load them. Without it, the agent falls back to general training data. With it, the agent starts from codebase-specific inputs.

The chapters in this topic cover the mechanics: what goes in `AGENTS.md`, how to build the instruction hub it points into, how to write instructions that change agent behavior, and how to keep an instruction load within the context window. Hooks are part of the hub too, but they are optional and maturity-dependent. Leave that directory empty until the rest is stable.

## Chapters

1. [AGENTS.md: The Entry Point](./agents-md): the TOC pattern, what goes in it, vendor pointers, and why it has to stay short
2. [Agent Instruction Hub](./instruction-hub): `.agents/instructions/`, `.agents/skills/`, `.agents/hooks/`, one folder for all agents
3. [Instructions That Work](./instructions-that-work): specific instructions, negative constraints, architecture boundaries, and how to test whether they work
4. [Skills, Commands, and Hooks](./skills-commands-hooks): when to choose each type, how to write skills that run reliably, and the instruction/skill/hook triangle
5. [Context Window Management](./context-window): why context fills, short sessions, selective loading, subagents, and the INDEX as context economy
