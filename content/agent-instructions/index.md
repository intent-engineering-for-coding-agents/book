# Agent Instructions

> One file at the root. Everything else follows from it.

The Foundation topic gave the repo its structure. Agent Instructions is what makes that structure legible to the agent. Without it, the agent improvises from general training data. With it, the agent arrives briefed.

The chapters in this section cover the mechanics: what goes in `AGENTS.md`, how to build the instruction hub it points into, how to write instructions that change agent behaviour, and how to manage the context window budget those instructions consume.

## Chapters

1. [AGENTS.md: One File Changes Everything](./agents-md): the TOC pattern, what goes in it, vendor pointers, and why it has to stay short
2. [From AGENTS.md to Agent Instruction Hub](./instruction-hub): `.agents/instructions/`, `.agents/skills/`, `.agents/hooks/`, one folder for all agents
3. [Writing Instructions That Work](./writing-instructions): specific instructions, negative constraints, architecture boundaries, and how to test whether they work
4. [Skills, Commands, and Hooks](./skills-commands-hooks): when to choose each type, how to write skills that run reliably, and the instruction/skill/hook triangle
5. [Context Window Management](./context-window): why context fills, short sessions, selective loading, subagents, and the INDEX as context economy
6. [Failure Modes and Recovery](./failure-modes): drift, spin, halt, hallucination, context poisoning, and tool misuse; when to reset vs redirect
