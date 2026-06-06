# Context Window Management

A long agent session does not announce when it starts forgetting. The answers get shorter and a little more generic. A constraint the agent read early stops being honoured. A decision it made an hour ago gets contradicted by one it makes now. Nothing failed and nobody reset anything. The context window filled, and the earliest context quietly dropped off the back to make room.

This is not a bug. Every token in the context window costs something, and it costs in two directions: reliability, because old tokens fall out as new ones arrive and the agent loses earlier context; and for teams billed per token, money. The context window will fill. The question is what fills it.

## What eats the context

Loading files is the most common way to exhaust context before the task starts. An `AGENTS.md` that imports four instruction files, a spec, two design docs, and an architecture overview has consumed thousands of tokens before the agent has written a line. If those files are loaded every session regardless of task, most sessions spend their early context on briefing they do not need.

The TOC pattern in `AGENTS.md` manages this deliberately. The agent reads the entry point, a short file that says what to load next, and loads only the instruction files relevant to the current task. Everything else stays unread.

`docs/INDEX.md` exists for the same reason. One 40-line file, full orientation. The alternative is the agent discovering structure by navigating the directory tree, which costs tokens and produces unreliable results. An index file is context economy: one read, full picture.

*Sources: Anthropic, "Building effective agents" (Dec 2024), context economy: load only what the task needs. Rick Hightower, "Agentic Coding: GSD vs Spec Kit vs OpenSpec vs Taskmaster AI" (Feb 2026), context-window pressure as a practical constraint across agentic coding tools.*

## Short sessions beat long conversations

The practical implication: do not try to accomplish a large change in a single session. Write the spec in one session and commit it. Implement in a second session with the spec loaded fresh. The second session reads the spec from the repo, not from session memory. It arrives with the full specification intact, not with a summary of a summary.

This is counterintuitive. The instinct is to keep context rich by not resetting. The reality is that a fresh session with the right files loaded is more reliable than a long session where the earliest context has been compressed or dropped. The agent in the fresh session reads what you decided. The agent in the hour-three session is reconstructing it.

Short sessions also make skills and hooks more valuable. A skill is fresh-session-safe: it carries its own procedure without relying on session memory. A hook fires regardless of session length. Both are more reliable than instructions the agent no longer has in active context.

*Sources: Anthropic, "Building effective agents" (Dec 2024), a fresh session with the right files outperforming a long, compressed one. Rick Hightower, "Agentic Coding: GSD vs Spec Kit vs OpenSpec vs Taskmaster AI" (Feb 2026), session and context discipline in agentic tools. This repo's `AGENTS.md` and skill structure, fresh-session-safe skills in practice.*

## Loading selectively

The clause on each instruction file link tells the agent which to load. A developer working on authentication loads `auth-conventions.md`. They do not load `deployment-runbook.md` or `database-schema.md`. The clauses make that decision automatic.

If the clauses are not specific enough, the agent loads conservatively, which usually means too much. Write clauses that describe the task, not the file content. "Load when working on authentication, SSO, or session management" is a task description. "Contains auth conventions" describes the file. The first tells the agent when to load. The second tells it what is inside.

## Subagents and compaction

Some tools support subagents: fresh context windows with a specific mandate. A subagent writes a spec. The main agent reviews it. A subagent searches for usages of an API. The main agent decides what to do with the results. Each runs in a clean context, does one thing, and returns a result. The main agent does not accumulate everything it might need. It delegates the parts that would fill its context to agents that do not carry its history.

Several capability-class agents now support some form of context compaction: Claude Code's `/compact`, Cursor's conversation summarisation, and similar controls in other tools. The mechanism compresses accumulated conversation history into a summary, freeing context for the next steps. The tradeoff is lossy compression: fine for broad context, risky for specific decisions that need to survive verbatim. Use it when the session has accumulated substantial successful output and the next stage needs room. Do not use it when the constraints that remain are precise.

*Sources: Anthropic docs for Claude Code `/compact` (ongoing), context compaction as a built-in control. Cursor documentation on conversation summarisation (ongoing), the same lossy-compression tradeoff in another tool.*

## The discipline

Context management is not a one-time configuration. It is an ongoing judgment: when to reset, what to load, when to delegate. The question is always the same: does the agent currently have the right information in active context for the next step?

An agent with too much context is slow and prone to self-contradiction. An agent with too little context improvises in the gaps. The balance is maintained by short sessions, selective loading, and skills that carry their own context rather than relying on what survived from an hour ago.

Context management is the discipline of keeping the agent oriented. When the orientation fails, or when other parts of the session fail, the agent enters one of a small number of predictable failure modes. Knowing which mode you are in is the first step to recovering from it.

## What context management cannot fix

Context management is necessary but not sufficient. A fresh session with perfect context still produces bad output if the agent's reasoning is fundamentally flawed, the task is genuinely ambiguous, or the codebase has contradictions the agent cannot resolve. Context management fixes the problems caused by context loss. It does not fix problems caused by bad instructions, unclear requirements, or architectural confusion.

The distinction matters when you are deciding whether to reset or redirect. If the agent was working well and then started drifting, context management (reset, selective loading, subagents) is the right tool. If the agent has been struggling from the start, the problem is upstream: the instructions are vague, the spec is unclear, or the codebase has competing patterns the agent cannot reconcile. Resetting the session will not fix those. Fixing the context will not fix a broken brief.

Some problems require better models, not better context. A model that cannot reason about concurrency will not write correct concurrent code regardless of how much context you give it. A model that hallucinates APIs will hallucinate them in a fresh session too. Context management is the discipline of keeping the agent oriented. When the agent's reasoning is the problem, orientation is not enough.
