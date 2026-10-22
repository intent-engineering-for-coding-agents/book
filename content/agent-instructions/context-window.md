---
type: chapter
title: Context Window Management
---

# Context Window Management

If the agent starts using a field name you already replaced, stop and check its inputs. Point it to the current contract and the recorded decision before asking for another patch. Repeated corrections are a reason to inspect the working context, without assuming a particular cause such as truncation.

This chapter gives the book's working guidance for choosing what to load, what to record, and when to start again.

## Load for the next decision

Before implementing a change, name the files needed to decide what belongs in the patch: the spec, relevant instructions, and the code being changed. Use the [instruction hub](./instruction-hub) to locate the rules. Add other files when the task exposes a dependency or an unanswered question.

For example, suppose a task changes an authentication response. Load the authentication rules and current response contract first. Read deployment guidance if the change affects rollout. Loading every runbook upfront adds material you must then keep current through the session.

When the agent cites an obsolete contract, identify which file supplied the old rule. Replace the stale input and correct the document or link responsible. A new session reading the same stale file starts with the same wrong guidance.

*Sources: The file-selection example and stale-input check are this book's workflow guidance.*

## Record decisions before moving on

A conversation-only decision leaves the next session without a file to consult. Before switching from spec authoring to implementation, record the accepted behavior and unresolved questions in the spec. Keep lasting architecture decisions in the repository's decision records. [Spec Lifecycle](../spec-driven/spec-lifecycle) covers the handoff.

Suppose you agree to preserve an old response field for existing clients. Put the compatibility requirement in the spec before asking the agent to implement the rename. A note saying "discussed compatibility" leaves the implementer to reconstruct the decision.

Keep any handoff short: identify the current spec, unfinished work, and checks still needed. Link to the authoritative files instead of copying their contents into another summary which needs maintenance.

*Sources: The compatibility example and handoff guidance are this book's synthesis.*

## Refresh when corrections stop helping

Start a fresh session when the agent repeatedly reintroduces a rejected change or keeps reasoning from an outdated requirement after correction. Give the new session the current spec and relevant instructions, plus the unfinished diff. Ask it to identify the next step from those artifacts before continuing.

A reset is a chance to choose the inputs again. If the new session proposes the same wrong change, inspect the task and source files for ambiguity or conflicting rules. Another reset leaves those conflicts unresolved.

For review, provide the intended change, the diff, and the test evidence. Ask the reviewer to identify unmet requirements and unrelated edits. If you use a separate session, supply those inputs explicitly and inspect the findings. Separation alone provides no assurance of a thorough review.

*Sources: The reset criteria and review inputs are this book's workflow guidance, not claims about a particular agent runtime.*

Even with the current files loaded, the agent still needs a precise description of the change. Standing instructions describe the project. The spec must settle what this patch is supposed to do.
