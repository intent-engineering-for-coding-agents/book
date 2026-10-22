---
type: appendix
title: Tooling Landscape
---

# Tooling Landscape

Start with the agent you already use. Try one scoped change before adding a spec tool or connector: load the project instructions, implement from a reviewed spec, and inspect the diff and check results. Use the failure you observe to decide what is missing.

The questions below are this book's selection guidance. They do not rank products or prescribe a model.

## What the workflow needs

| Need | What to verify | Where the book explains it |
|---|---|---|
| Repository instructions | Confirm the agent loads the intended files for the task. | [AGENTS.md](../agent-instructions/agents-md), [Instruction Hub](../agent-instructions/instruction-hub) |
| Implementation and checks | Confirm the agent edits the working files and reports the commands run, failures, and unfinished checks. | [Checkpoints](../quality/checkpoints) |
| Recorded intent | Keep the proposed behavior and acceptance criteria available for review before implementation. | [The Spectrum](../spec-driven/the-spectrum), [Spec Lifecycle](../spec-driven/spec-lifecycle) |
| External task context | Confirm the agent receives the relevant ticket or design record. Inspect the fetched content before relying on it. | [OpenSpec in an Existing SDLC](../team/openspec-in-existing-sdlc) |

A connector deserves a place when retrieving a ticket or design record is recurring work. For an occasional task, supplying the relevant excerpt and its source link is a simpler starting point. Either approach needs a check for missing or stale context.

*Sources: The selection questions and connector tradeoff are this book's workflow guidance.*

## Documentation to consult

Use the current documentation for setup and support details:

- [OpenSpec](https://openspec.dev/) for the tool used in the book's spec examples. [The Spectrum](../spec-driven/the-spectrum) also covers starting with a plain file.
- [Model Context Protocol](https://modelcontextprotocol.io/) if the workflow needs an external connector.
- [Companion Repo](./companion-repo) for the book's worked examples and their history.

Before adopting a tool, repeat the scoped task with your actual instructions and review the resulting files. A successful demonstration still leaves the team responsible for maintaining the spec and checking the implementation.
