# IEC-CONTEXT-FRESH-SESSION: Fresh Session Beats Long Session

**Layer**: 1
**Categories**: context, sessions, context-window
**Applies-to**: all
**Summary**: A fresh session with the right files loaded is more reliable than a long session with stale context.

## Principle

A fresh session with the right files loaded is more reliable than a long session where the earliest context has been compressed or dropped. Context management is not a one-time configuration — it is an ongoing judgment. When in doubt, reset the session.

## Why it matters

Long sessions accumulate context that the agent may have compressed, summarized, or lost. The agent appears to remember but is reasoning from degraded information. The symptoms are subtle: tangents that seem relevant but drift, repetition of already-resolved issues, forgetting constraints stated early in the session.

## Violations to detect

- Sessions running longer than the agent's effective context window
- Sessions where the earliest context is no longer visible
- Continuing a session after the agent has shown clear signs of context loss

## Good practice

Heuristic: if the agent was working well before it went wrong, redirect. If the session has been running long enough that you are unsure what the agent still has in context, reset. A reset costs a minute; recovering from a bad decision the agent made on degraded context costs much more.

## Sources

- intent-book, *"Context Window" chapter*, agent-instructions section.
- intent-book, *"Failure Modes" chapter*, agent-instructions section.
