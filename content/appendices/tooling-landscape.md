# Tooling Landscape

This page is a mid-2026 snapshot. The roster of agents, spec tools, and MCP servers changes faster than any book can track. Treat it as a starting point and verify against each tool's current documentation before relying on it.

## Capability-class agents

This book targets agents that combine a thinking-capable model, real tool use, and a plan or architect mode. At time of writing, that class includes:

| Agent | Type | AGENTS.md support |
|---|---|---|
| Claude Code (Anthropic) | CLI | Native |
| Codex CLI (OpenAI) | CLI | Via AGENTS.md standard |
| OpenCode | CLI, open-source | Via AGENTS.md standard |
| Junie (JetBrains) | IDE-embedded | Via AGENTS.md standard |
| GitHub Copilot coding agent | IDE / PR | As of Aug 2025 |

IDE-only completion tools and chat-only assistants are out of scope. The practices in this book target the capability class, not a frozen vendor list. New tools that combine thinking models with real tool use will fit the same patterns.

Sources: Anthropic Docs, "Claude Code overview" (ongoing); OpenAI Docs, "Codex CLI" (ongoing); GitHub Changelog, "Copilot coding agent now supports AGENTS.md custom instructions" (Aug 28, 2025); OpenCode Docs (ongoing); Junie documentation (ongoing), the named agents and their AGENTS.md support status as of mid-2026.

## Spec-driven tools

| Tool | Scope | Notes |
|---|---|---|
| OpenSpec (openspec.dev) | Change-folder lifecycle (proposal, design, specs, tasks) | Used end-to-end in this book |
| LeanSpec (lean-spec.dev) | Lightweight spec | Small-spec discipline |
| GitHub Spec-Kit (github.com/github/spec-kit) | Enterprise toolchain | Full lifecycle, GitHub-integrated |
| GSD | Minimal ceremony | See Hightower's comparison for trade-offs |

No dominant framework has emerged as of mid-2026. ThoughtWorks Radar Vol 34 describes the SDD landscape as fragmented. Pick the tool whose lifecycle discipline matches your team's appetite for structure.

Sources: Hightower, "Agentic Coding: GSD vs Spec Kit vs OpenSpec vs Taskmaster AI" (Medium, Feb 2026), the tool-tradeoff map. ThoughtWorks, Technology Radar Vol 34 (April 2026), the fragmented landscape assessment.

## MCP servers

The Model Context Protocol (modelcontextprotocol.io) lets agents reach external tools during a session. Relevant to the practices in this book as of mid-2026:

| Server | Purpose | Notes |
|---|---|---|
| Atlassian MCP | Jira and Confluence access | Fetches story context during spec drafting |
| Framelink MCP (GLips/Figma-Context-MCP) | Figma design data | For front-end specs; 14.9k★ as of mid-2026 |

MCP server availability, permission scope, and reliability vary by environment. Verify connectivity before relying on any external MCP server in a CI or automated context. What an agent can reach through MCP is determined by configuration and permissions, not by the tool existing.

Sources: Model Context Protocol (modelcontextprotocol.io, ongoing); Framelink Figma-Context-MCP (github.com/GLips/Figma-Context-MCP, ongoing), the two external MCP servers cited in the book's chapter content.

## Companion tool

`iec` is the companion CLI for this book. Every practice described here is demonstrated in its git history. See [Companion Repo](./companion-repo) for the structure, phase tags, and how to browse it.

## Model selection and cost

This book targets capability class, not a specific model. Any agent combining a thinking-capable model, real tool use, and plan or architect mode falls in scope. For direct-API users, per-token cost matters: longer instruction files and specs have a real per-call cost, and the practices in this book add tokens deliberately to improve output quality. For per-seat-licensed tools (Copilot Enterprise, Cursor Business), per-run accounting is irrelevant. The monthly seat covers all calls. DevOps, SRE, and cloud infrastructure costs are out of scope for this book.
