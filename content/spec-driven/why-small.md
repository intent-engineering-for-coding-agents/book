---
type: chapter
title: Why Small?
---

# Why Small?

While your agent implements a change proposal, colleagues keep changing the code and documentation around it. A shared interface moves, an architecture decision changes, or another ticket removes a dependency your proposal assumed would remain. The longer the work stays open, the more opportunity there is for its starting assumptions to become outdated.

In my team, we split larger work into tickets before creating change proposals. We create a proposal when its ticket starts, finish the work, and archive the proposal before starting the next ticket. I prefer this to a big-bang proposal covering the whole undertaking because the next proposal starts from what we have learned and integrated.

*Sources: The ticket sequence is the author's reported team practice. The argument about changing assumptions is the book's rationale for this practice.*

## Plan the next change from the current codebase

Suppose a larger task replaces an interface used by several clients. The team agrees on an order for the tickets. After the first ticket lands, a colleague updates one client and records a revised compatibility requirement. Draft the next proposal against those changes instead of carrying forward the original assumptions unchecked.

This is the iterative part of the practice: agree on direction and dependencies, then refine each change when work begins. Writing detailed proposals for the entire sequence upfront creates more plans to reconcile when implementation teaches the team something new. [OpenSpec in an Existing SDLC](../team/openspec-in-existing-sdlc) explains the ticket-to-proposal mapping.

*Sources: The interface example is hypothetical. The planning advice is this book's synthesis from the author's workflow.*

## Integrate before the assumptions spread

I find smaller, bounded changes easier to integrate while colleagues work in parallel. A proposal spanning hours or days deserves renewed attention to the code and decisions changed by others. Elapsed time alone does not tell you where to split the work.

A merge conflict makes overlapping edits visible. A changed assumption needs a different check: suppose your patch still uses an old retry policy after a colleague changes the design document. Even if the code merges cleanly, compare the implementation with the current decision before accepting it.

Keep the proposed outcome and its tests small enough to inspect together. A short patch to a shared interface still needs careful integration review. Smaller proposals reduce the amount under consideration without guaranteeing an easy merge.

*Sources: The integration preference is the author's reported experience. The retry-policy example and review advice are this book's illustrative workflow guidance.*

## Keep the details needed for review

"Add error handling" leaves the agent to decide which failures matter and what the caller receives. Name the input, expected response, and failure behavior. Remove unrelated work before removing those details.

If the agent adds a migration or cleanup outside the ticket, review the proposed addition with the team before implementing it. Record any separate work in the ticket system. Counting files or implementation tasks does not settle whether the addition belongs in this change.

*Sources: The scope and review checks are this book's workflow guidance.*

An agreed ticket still leaves a choice about how much specification the change needs. [The Spectrum](./the-spectrum) addresses the difference between a small correction and a change requiring explicit design decisions.
