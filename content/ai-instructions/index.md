# AI Instructions

> One file at the root. Everything else follows from it.

The Foundation topic gave the repo its structure. AI Instructions is what makes that structure legible to the agent. Without it, the agent improvises from general training data. With it, it arrives briefed.

The chapters in this section cover the mechanics: what goes in `AGENTS.md`, how to build the instruction hub it points into, how to write instructions that actually change agent behaviour, and how to manage the context window budget those instructions consume.

## Chapters

1. [AGENTS.md: One File Changes Everything](./agents-md): the TOC pattern, what goes in it, and why it has to stay short
2. [From AGENTS.md to AI Instruction Hub](./instruction-hub): `.agents/instructions/`, `.agents/skills/`, `.agents/hooks/`, one folder for all AI tools
