# Intent Engineering for Coding Agents

Structure, specs, and proof for agentic software engineering.

## What this book is

Intent Engineering for Coding Agents is a practical guide for senior developers who already use coding agents in real codebases. The focus is on capturing intent explicitly so an agent works from your decisions, not from guesswork.

The book stays vendor-agnostic and targets the capability class of coding agents with tool use, context windows, and real reasoning, not any single product. The practices translate across tools and repos.

## What it covers

The chapters group into five parts:

- **Foundation**: repo structure as the agent's briefing, with decisions, design docs, specs, and an agent-facing index.
- **Agent Instructions**: `AGENTS.md` and the `.agents/` hub that teach every agent how to work in your repo.
- **Spec-Driven Development**: change-sized specs before code, with OpenSpec as the working example.
- **Quality and Verification**: tests as proof of intent, stable AC IDs, PR taxonomy, and agent evaluation.
- **Team Workflows**: adoption, trunk-based development with agents, cross-team coordination, and what is still unsettled in the field.

## Repositories

This GitHub organization holds both the book and its companion tooling.

| Name | What it is | Code | Docs / Pages |
| --- | --- | --- | --- |
| **Book** | VitePress source for *Intent Engineering for Coding Agents*. | https://github.com/intent-engineering-for-coding-agents/book | https://intent-engineering-for-coding-agents.github.io/book/ |
| **Intent Engineering Checker (`iec`)** | Companion CLI that checks a repo for the conventions used in the book: `AGENTS.md`, ADRs, OpenSpec specs, and test traceability. | https://github.com/intent-engineering-for-coding-agents/cli | CLI docs and examples in `docs/` inside the repo; GitHub Pages site planned. |

## How to use this work

- Read the book chapters under `content/` in this repo, or on the published site at https://intent-engineering-for-coding-agents.github.io/book/.
- Browse the `iec` repo to see the practices applied to a real project, with ADRs, specs, and tests wired together.
- Link to this page from other repos, docs, or social posts when you want a single place that explains what Intent Engineering for Coding Agents is and where to find the code.
