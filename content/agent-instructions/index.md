---
type: index
title: Agent Instructions
---

# Agent Instructions

> One file at the root. Everything else follows from it.

Foundation gives the repo structure. Agent Instructions tells the agent which parts of that structure matter, when to load them, and which defaults to stop trusting.

This topic does not teach a better one-off prompt. It turns project-specific guidance into reviewed, source-controlled input available to later sessions and compatible vendors.

These chapters cover `AGENTS.md`, the instruction hub it points into, instructions that actually change agent behavior, and the limits imposed by the context window.

## Chapters

1. [AGENTS.md: The Entry Point](./agents-md): the TOC pattern, what goes in it, vendor pointers, and why it has to stay short
2. [Agent Instruction Hub](./instruction-hub): shared instructions and reusable skill procedures, with loading conditions and completion criteria
3. [Instructions That Work](./instructions-that-work): specific instructions, negative constraints, architecture boundaries, and how to test whether they work
4. [Context Window Management](./context-window): selective loading, recorded decisions, and when to refresh the session
