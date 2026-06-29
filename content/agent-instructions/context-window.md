# Context Window Management

A long agent session does not announce when it starts forgetting. The answers get shorter and a little more generic. A constraint the agent read early stops being honored, or a decision it made an hour ago gets contradicted by one it makes now. Nothing failed and nobody reset anything. The context that mattered either dropped off the back to make room, or it is still in the window, and the agent has quietly stopped attending to it.

This is not a bug. Every token in the context window costs something, and it costs in two directions. Reliability is the first. In a session that overflows, old tokens fall out as new ones arrive and the agent loses earlier context.

Long before any overflow, a window packed with files the task never needed buries the few tokens that mattered, and the model attends to them less reliably even though they remain in the window. Money is the second cost for teams billed per token. The window does not need to fill for either cost to bite. The question is what you put in it.

## What eats the context

Loading files is the most common way to exhaust context before the task starts. An `AGENTS.md` that imports four instruction files, a spec, two design docs, and an architecture overview has consumed thousands of tokens before the agent has written a line. If those files are loaded every session regardless of task, most sessions spend their early context on files they do not need.

The TOC pattern in `AGENTS.md` manages this deliberately. The agent reads the entry point, a short file that says what to load next, and loads only the instruction files relevant to the current task. Everything else stays unread.

`docs/INDEX.md` exists for the same reason. One 40-line file, full map. The alternative is the agent reconstructing structure from the raw directory tree, a noisy source it reads unreliably and at the cost of every file it opens. A curated index is what makes selective loading possible: the agent reads the map, then loads only the files the task needs.

*Sources: Anthropic, "Building effective agents" (December 2024), context economy: load only what the task needs. Rick Hightower, "Agentic Coding: GSD vs Spec Kit vs OpenSpec vs Taskmaster AI" (February 2026), context-window pressure as a practical constraint across agentic coding tools.*

## A bigger window, the same discipline

Context windows are larger in 2026 than they were a year or two ago. The wall most sessions used to hit is farther away. The discipline is not.

Two costs outlive the larger window. The first is the bill, and it compounds. Every turn re-sends the whole transcript, so each step is charged for everything before it, and a session's total cost grows with the square of its length rather than in step with it. A twenty-step loop that adds a thousand tokens a turn bills around 210,000 input tokens, not the 20,000 a per-step estimate suggests.

The second is attention. Filling a roomy window with files the task never reads buries the load-bearing tokens the same way a small window does, and the model attends to them less reliably even though they remain in the window.

So the larger window changes the failure, not the fix. You overflow less often, and you dilute the signal exactly as before. Load what the task needs, and the extra capacity buys headroom instead of a slower, more expensive, less reliable session.

*Sources: Paula Hingel, Augment Code, "AI Agent Loop Token Costs" (April 2026), a naive agent loop re-bills the full history each turn, so cumulative input tokens follow the triangular series N(N+1)/2: a 20-step run bills ~210,000 tokens against a 20,000-token per-step estimate.*

## Short sessions beat long conversations

The practical implication: do not try to achieve a large change in a single session. Write the spec in one session and commit it, then implement in a second session with the spec loaded fresh. The second session reads the spec from the repo, not from session memory. It arrives with the full specification intact, not with a summary of a summary. The [Spec Lifecycle](../spec-driven/spec-lifecycle) chapter works out the authoring side of this split.

This is counterintuitive. The instinct is to keep context rich by not resetting. A fresh session with the right files loaded is more reliable than a long session where the earliest context has been compressed or dropped. The agent in the fresh session reads what you decided. The agent in the hour-three session is reconstructing it.

Review is the third case, and the sharpest. An agent that reviews its own work in the same session does not read the diff cold: every justification for every choice it made is still in context, so it defends the code instead of auditing it. The prior reasoning does more than fill the window, it primes the conclusion, and the review confirms what a fresh reader would have questioned. Hand the review to a new session or a subagent, and the reviewer reads what is on the page, with no stake in the decisions.

Cost runs in the same direction. A long session re-bills its growing transcript at every turn, so the reset that protects attention is also where the bill stops compounding.

Short sessions also make skills and hooks more valuable. A skill is fresh-session-safe: it carries its own procedure without relying on session memory. A hook fires regardless of session length. Both are more reliable than the instruction set the agent no longer has in active context.

*Sources: Anthropic, "Building effective agents" (December 2024), a fresh session with the right files outperforming a long, compressed one. Rick Hightower, "Agentic Coding: GSD vs Spec Kit vs OpenSpec vs Taskmaster AI" (February 2026), session and context discipline in agentic tools. This repo's `AGENTS.md` and skill structure, fresh-session-safe skills in practice.*

## Loading selectively

The clause on each instruction file link tells the agent which to load. A developer working on authentication loads `auth-conventions.md`. They do not load `deployment-runbook.md` or `database-schema.md`. The clauses make that decision automatic.

If the clauses are not specific enough, the agent loads conservatively, which usually means too much. Write clauses that describe the task, not the file content. "Load when working on authentication, SSO, or session management" is a task description. "Contains auth conventions" describes the file. The first tells the agent when to load. The second tells it what is inside.

*Sources: This repo's `AGENTS.md` instruction-file links, task-describing load clauses in practice.*

## Subagents and compaction

Two mechanisms reclaim context without ending the session, and both carry a limit worth knowing. A subagent runs a delegated task in a clean window and returns only the result, so the main agent never accumulates the history behind it. Review is the case that pays off most: a subagent reads a diff the main agent produced without ever seeing the reasoning that justified it. Compaction is the other lever. Tools that summarize accumulated history reclaim space, not attention, and the summary is lossy: "use camelCase for the API fields" becomes "fixed naming", and the rule is gone. A larger context window only pushes back the moment you reach for either one.

*Sources: Anthropic docs for Claude Code `/compact` (ongoing), context compaction as a built-in control that summarizes history at the cost of exact detail.*

## The discipline

Context management is not a one-time configuration. It is an ongoing judgment, renewed at each step: when to reset the session, and what to load into it. The question is always the same: does the agent currently have the right information in an active context for the next step?

An agent with too much context is slow and prone to self-contradiction. An agent with too little context improvises in the gaps. The balance is maintained by short sessions, selective loading, and skills that carry their own context rather than relying on what remains from an hour ago.

Context management is the discipline of keeping the agent loaded with the right context. Done well, it keeps the load-bearing tokens in front of the model and the stale ones out of the way. Done well, it still does not guarantee good output. Some failures remain even with a perfectly managed window.

## What context management cannot fix

Context management is necessary but not sufficient. A fresh session with perfect context still produces bad output if the agent's reasoning is fundamentally flawed, the task is genuinely ambiguous, or the codebase has contradictions the agent cannot resolve. Context management fixes the problems caused by context loss. A vague instruction set or a contradictory codebase is not one of them.

The distinction matters when you are deciding whether to reset or redirect. If the agent was working well and then started drifting, context management (reset, selective loading, subagents) is the right tool. If the agent has been struggling from the start, the problem is upstream, in the instruction set or the codebase itself. Resetting the session will not fix those. Fixing the context will not fix a broken instruction set.

Some problems require better models, not better context. A model that cannot reason about concurrency will not write correct concurrent code regardless of how much context you give it. A model that hallucinates APIs will hallucinate them in a fresh session too.

Context management keeps the agent loaded with the right context. It does not say what this one change is meant to do. That per-change intent is the one input the instruction hub cannot carry, and supplying it is where the next topic begins.
