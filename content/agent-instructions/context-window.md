# Context Window Management

A long agent session does not announce when it starts forgetting. The answers get shorter and a little more generic. A constraint the agent read early stops being honored, or a decision it made an hour ago gets contradicted by one it makes now. Nothing failed and nobody reset anything. The context that mattered either dropped off the back to make room, or it is still in the window and the agent has quietly stopped attending to it.

This is not a bug. Every token in the context window costs something, and it costs in two directions. Reliability is the first. On a session that overflows, old tokens fall out as new ones arrive and the agent loses earlier context.

Long before any overflow, a window packed with files the task never needed buries the few tokens that mattered, and the model attends to them less reliably even though they remain in the window. Money is the second cost, for teams billed per token. The window does not need to fill for either cost to bite. The question is what you put in it.

## What eats the context

Loading files is the most common way to exhaust context before the task starts. An `AGENTS.md` that imports four instruction files, a spec, two design docs, and an architecture overview has consumed thousands of tokens before the agent has written a line. If those files are loaded every session regardless of task, most sessions spend their early context on briefing they do not need.

The TOC pattern in `AGENTS.md` manages this deliberately. The agent reads the entry point, a short file that says what to load next, and loads only the instruction files relevant to the current task. Everything else stays unread.

`docs/INDEX.md` exists for the same reason. One 40-line file, full orientation. The alternative is the agent reconstructing structure from the raw directory tree, a noisy source it reads unreliably and at the cost of every file it opens to find its bearings. A curated index is what makes selective loading possible: the agent reads the map, then loads only the files the task needs.

*Sources: Anthropic, "Building effective agents" (Dec 2024), context economy: load only what the task needs. Rick Hightower, "Agentic Coding: GSD vs Spec Kit vs OpenSpec vs Taskmaster AI" (Feb 2026), context-window pressure as a practical constraint across agentic coding tools.*

## A bigger window, the same discipline

By mid-2026 a million-token context window is common across the frontier model families. The wall most sessions used to hit is mostly gone. The discipline is not.

Two costs outlive the larger window. The first is the bill, and it compounds. Every turn re-sends the whole transcript, so each step is charged for everything before it, and a session's total cost grows with the square of its length rather than in step with it. A twenty-step loop that adds a thousand tokens a turn bills around 210,000 input tokens, not the 20,000 a per-step estimate suggests.

The second cost is attention. Liu et al. found that a model retrieves information placed in the middle of a long input less reliably than information at the edges, the effect they named "lost in the middle", and accuracy falls as the input grows. A window with room to spare still dilutes the signal when you fill it with files the task never reads.

So the larger window changes the failure, not the fix. You overflow less often. You drown the load-bearing tokens as easily as a small window does. Load what the task needs, and the extra capacity buys headroom instead of a slower, more expensive, less reliable session.

*Sources: Liu et al., "Lost in the Middle: How Language Models Use Long Contexts" (TACL 2024), retrieval accuracy degrades for information in the middle of long inputs and as input length grows. Paula Hingel, Augment Code, "AI Agent Loop Token Costs" (Apr 2026), a naive agent loop re-bills the full history each turn, so cumulative input tokens follow the triangular series N(N+1)/2: a 20-step run bills ~210,000 tokens against a 20,000-token per-step estimate.*

## Short sessions beat long conversations

The practical implication: do not try to achieve a large change in a single session. Write the spec in one session and commit it, then implement in a second session with the spec loaded fresh. The second session reads the spec from the repo, not from session memory. It arrives with the full specification intact, not with a summary of a summary. The [Spec Lifecycle](../spec-driven/spec-lifecycle) chapter works out the authoring side of this split.

This is counterintuitive. The instinct is to keep context rich by not resetting. A fresh session with the right files loaded is more reliable than a long session where the earliest context has been compressed or dropped. The agent in the fresh session reads what you decided. The agent in the hour-three session is reconstructing it.

Cost runs the same direction. A long session re-bills its growing transcript on every turn, so the reset that protects attention is also where the bill stops compounding.

Short sessions also make skills and hooks more valuable. A skill is fresh-session-safe: it carries its own procedure without relying on session memory. A hook fires regardless of session length. Both are more reliable than instructions the agent no longer has in active context.

*Sources: Anthropic, "Building effective agents" (Dec 2024), a fresh session with the right files outperforming a long, compressed one. Rick Hightower, "Agentic Coding: GSD vs Spec Kit vs OpenSpec vs Taskmaster AI" (Feb 2026), session and context discipline in agentic tools. This repo's `AGENTS.md` and skill structure, fresh-session-safe skills in practice.*

## Loading selectively

The clause on each instruction file link tells the agent which to load. A developer working on authentication loads `auth-conventions.md`. They do not load `deployment-runbook.md` or `database-schema.md`. The clauses make that decision automatic.

If the clauses are not specific enough, the agent loads conservatively, which usually means too much. Write clauses that describe the task, not the file content. "Load when working on authentication, SSO, or session management" is a task description. "Contains auth conventions" describes the file. The first tells the agent when to load. The second tells it what is inside.

*Sources: This repo's `AGENTS.md` instruction-file links, task-describing load clauses in practice.*

## Subagents and compaction

Some tools support subagents: fresh context windows with a specific mandate. A subagent writes a spec for the main agent to review, or searches for usages of an API, so the main agent decides what to do with the results. Each subagent runs in a clean context, does one thing, and returns a result. The main agent does not accumulate everything it might need. It delegates the parts that would fill its context to agents that do not carry its history.

Several capability-class agents now support context compaction: Claude Code's `/compact`, Cursor's conversation summarization, and similar controls elsewhere. Each compresses accumulated history into a summary, freeing context for the steps that follow. The tradeoff is lossy: the summary keeps the gist but paraphrases away exact detail. "Use camelCase for the API fields" becomes "fixed naming", and the rule is gone.

Compaction reclaims space, not attention. A summary that is still large dilutes the signal as much as the history it replaced. Compact when the session has piled up successful output and the next step needs room. Keep the history when the remaining constraints are precise.

A larger context window only pushes back the moment you reach for `/compact`. It does not remove the tradeoff.

*Sources: Anthropic docs for Claude Code `/compact` (ongoing), context compaction as a built-in control. Cursor documentation on conversation summarization (ongoing), the same lossy-compression tradeoff in another tool.*

## The discipline

Context management is not a one-time configuration. It is an ongoing judgment, renewed at each step: when to reset the session, and what to load into it. The question is always the same: does the agent currently have the right information in active context for the next step?

An agent with too much context is slow and prone to self-contradiction. An agent with too little context improvises in the gaps. The balance is maintained by short sessions, selective loading, and skills that carry their own context rather than relying on what survived from an hour ago.

Context management is the discipline of keeping the agent oriented. When the orientation fails, or when other parts of the session fail, the agent enters one of a small number of predictable [failure modes](./failure-modes). Knowing which mode you are in is the first step to recovering from it.

## What context management cannot fix

Context management is necessary but not sufficient. A fresh session with perfect context still produces bad output if the agent's reasoning is fundamentally flawed, the task is genuinely ambiguous, or the codebase has contradictions the agent cannot resolve. Context management fixes the problems caused by context loss. A vague brief or a contradictory codebase is not one of them.

The distinction matters when you are deciding whether to reset or redirect. If the agent was working well and then started drifting, context management (reset, selective loading, subagents) is the right tool. If the agent has been struggling from the start, the problem is upstream, in the brief or the codebase itself. Resetting the session will not fix those. Fixing the context will not fix a broken brief.

Some problems require better models, not better context. A model that cannot reason about concurrency will not write correct concurrent code regardless of how much context you give it. A model that hallucinates APIs will hallucinate them in a fresh session too. Context management keeps the agent oriented. When the agent's reasoning is the problem, orientation is not enough.
