# Tooling Landscape

This page is a snapshot reviewed on July 1, 2026, not a buyer's guide. The roster of agents, spec tools, and MCP servers changes faster than any book tracks well. Use the categories here to decide what is in scope, then verify current support against each tool's documentation.

## Capability-class agents

This book targets coding agents that combine a thinking-capable model, real tool use, and a plan or architect mode. The vendor roster matters less than those capabilities, but examples make the boundary concrete. As of mid-2026, examples in scope include:

| Agent | Type | Project instruction source |
|---|---|---|
| Claude Code (Anthropic) | CLI / IDE | Project memory through `CLAUDE.md` |
| Codex (OpenAI) | CLI / IDE / app / cloud | Native |
| OpenCode | CLI, open-source | Native |
| Junie (JetBrains) | CLI / IDE | Native |
| GitHub Copilot coding agent | IDE / PR | As of August 2025 |

Concrete model examples from this review date include Claude Opus 4.8 and GPT-5.5-class setups. Treat those as dated examples, not permanent cut lines. A newer or stronger model in the same capability class is still in scope.

IDE-only completion tools and chat-only assistants are out of scope. The practices in this book target the capability class, not a frozen vendor list. When a new tool combines planning, tool use, file edits, and reviewable output, evaluate it against the same patterns.

*Sources: Anthropic Claude Code overview and memory documentation (ongoing, reviewed June 28, 2026), Claude Code capability class and `CLAUDE.md` project memory; Anthropic, "Introducing Claude Opus 4.8" (May 28, 2026), dated Claude model example for coding and agentic tasks; OpenAI Codex overview, CLI, IDE extension, app features, cloud, skills, and AGENTS.md documentation (ongoing, reviewed July 1, 2026), Codex capability class, current surfaces, skills, and `AGENTS.md` support; OpenAI, "Introducing GPT-5.5" (April 23, 2026), dated GPT model example for coding, tool use, and long-context work; OpenCode Rules documentation (ongoing, reviewed June 28, 2026), OpenCode `AGENTS.md` support; JetBrains Junie documentation (June 18, 2026), Junie `AGENTS.md` guidelines; GitHub Changelog, "Copilot coding agent now supports AGENTS.md custom instructions" (August 28, 2025), Copilot AGENTS.md support. Instruction-file statuses are this page's July 1, 2026 snapshot.*

## Spec-driven tools

| Tool | Scope | Why it appears here |
|---|---|---|
| OpenSpec (openspec.dev) | Change-folder lifecycle (proposal, design, specs, tasks) | Used end-to-end in this book |
| LeanSpec (lean-spec.dev) | Lightweight spec | Small-spec discipline |
| GitHub Spec-Kit (github.com/github/spec-kit) | Enterprise toolchain | Full lifecycle, GitHub-integrated |
| GSD | Minimal ceremony | See Hightower's comparison for trade-offs |

No dominant framework has emerged as of mid-2026. ThoughtWorks Radar Vol 34 describes the SDD tool field as fragmented. Treat the table as a vocabulary map, not a recommendation list. Pick the lifecycle discipline your team will keep current under deadline pressure.

*Sources: Hightower, "Agentic Coding: GSD vs Spec Kit vs OpenSpec vs Taskmaster AI" (Spillwave, February 2026), the tool-tradeoff map. ThoughtWorks, Technology Radar Vol 34 (April 2026), the fragmented SDD tool assessment.*

## MCP servers

The Model Context Protocol (modelcontextprotocol.io) lets agents reach external tools during a session. The durable pattern is external context fetched on demand. The server names below are perishable examples from mid-2026:

| Server | Purpose | Notes |
|---|---|---|
| Atlassian Rovo MCP / `mcp-atlassian` | Jira and Confluence access | Fetches story context during spec drafting |
| Framelink MCP (GLips/Figma-Context-MCP) | Figma design data | For front-end specs, 14.9k stars as of mid-2026 |

MCP server availability, permission scope, and reliability vary by environment. Verify connectivity before relying on any external MCP server in a CI or automated context. What an agent reaches through MCP is determined by configuration and permissions, not by the tool existing.

*Sources: Model Context Protocol (modelcontextprotocol.io, ongoing), MCP as the agent-tool bridge. Atlassian Rovo MCP Server and sooperset `mcp-atlassian` documentation (ongoing), Jira and Confluence connector examples. Framelink Figma-Context-MCP (github.com/GLips/Figma-Context-MCP, ongoing), Figma connector example and star count as of mid-2026.*

## Companion tool

`iec` is the companion CLI for this book. Its history is the evidence trail for the practices the book claims are demonstrated. See [Companion Repo](./companion-repo) for phase tags and how to browse it.

## Model selection and cost

This book targets a capability class, not a specific model. Any agent combining a thinking-capable model, real tool use, and plan or architect mode falls in scope. Current frontier examples on this review date advertise stronger coding, long-context, and tool-use behavior than earlier assistants, which is why they fit spec-driven and architecture-heavy work. Treat the vendor benchmark claims as capability signals, not guarantees in your codebase. None of this means the agent follows ADRs by magic. ADR compliance still depends on whether the codebase surfaces the decision, whether the agent loads it, and whether review and verification catch drift. For direct-API users, per-token cost matters: longer instruction files and specs have a real per-call cost, and the practices in this book add tokens deliberately to improve output quality. Some commercial tools hide direct per-run accounting behind seat licenses, but the engineering tradeoff stays the same: context has cost, and stale context has a different cost. DevOps, SRE, and cloud infrastructure costs are out of scope for this book.

*Sources: OpenAI, "Introducing GPT-5.5" (April 23, 2026), dated OpenAI claims for coding, tool use, and long-context behavior; Anthropic, "Introducing Claude Opus 4.8" (May 28, 2026), dated Anthropic claims for coding and long-running agentic tasks; Paula Hingel, "AI Agent Loop Token Costs: How to Constrain Context" (Augment Code, April 6, 2026), input-token cost growth in long agent loops. The model-selection boundary and ADR-compliance caveat are this book's capability-class synthesis.*
