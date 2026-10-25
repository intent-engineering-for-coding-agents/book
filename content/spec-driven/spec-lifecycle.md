---
type: chapter
title: Spec Lifecycle
---

# Spec Lifecycle

An implemented change left among active proposals gives the next agent an ambiguous starting point. Is the work unfinished, or did the developer leave the completion record behind? Keep the proposal's lifecycle aligned with the ticket it implements.

This chapter describes the book's workflow from starting a ticket to archiving its verified change. The ticket convention comes from the author's team practice. OpenSpec provides the change artifacts and archive operation.

## The stages

Start with the selected ticket and the current code and documentation. Resolve governing design decisions before asking the agent to implement them. [OpenSpec in an Existing SDLC](../team/openspec-in-existing-sdlc) explains ownership and the one-to-one ticket mapping.

```mermaid
flowchart TD
    classDef coordination fill:#64748b,stroke:#475569,color:#fff
    classDef work fill:#0d9488,stroke:#0f766e,color:#fff
    classDef evidence fill:#0891b2,stroke:#0e7490,color:#fff

    T["Start selected ticket"]:::coordination --> W["Create its proposal<br>from current code and docs"]:::work
    W --> R["Critique and review intent"]:::evidence
    R --> I["Implement and verify"]:::work
    I --> M["Review and integrate"]:::evidence
    M --> A["Archive proposal<br>then complete ticket"]:::coordination
    A --> N["Start next ticket<br>create its proposal"]:::work
    I -. "changed assumption: revise and review" .-> W
```

Write the proposal when the ticket starts. Record the requested behavior, constraints, and acceptance criteria. Use the current repository to resolve implementation questions, including changes colleagues have integrated since the tickets were planned.

Critique and review the intent before implementation. For a decision-heavy change, review the proposal in its own pull request (PR). For a small change kept in one PR, inspect the spec before the generated code. [Code Review for Agent-Generated Code](../team/code-review-agent-code) covers the review inputs and reading order.

During implementation, inspect the generated files and relevant test results against the acceptance criteria. If the code reveals an incorrect assumption, revise the proposal and review the affected requirement before continuing. The agreed sequence allows correction within a ticket.

*Sources: The lifecycle sequence, review order, and changed-assumption rule are this book's workflow synthesis based on the author's ticket-based practice.*

## Writing the task list

OpenSpec keeps implementation steps in `tasks.md` inside the change folder. Review those steps as the execution plan for the current ticket. Team-level splitting belongs before proposal creation, as described in [Why Small?](./why-small).

*Sources: Fission AI, ["Concepts"](https://github.com/Fission-AI/OpenSpec/blob/main/docs/concepts.md) (reviewed October 22, 2026), `tasks.md` as the implementation checklist. The ticket boundary is the author's workflow convention.*

Tell the agent how the project connects implementation tasks to Acceptance Criterion IDs (AC IDs). For example:

```markdown
- Name the AC IDs each implementation task addresses.
- Include the tests needed to verify those criteria.
- State each test's type, such as unit or integration.
- Record unfinished checks instead of marking the task complete.
```

Inspect the resulting task list and evidence. A checked box records the agent's reported progress. Before accepting the work, verify the named tests assert the intended behavior and the diff stays within the ticket's scope.

*Sources: The instruction example and task-review checks are this book's workflow guidance.*

## Drafting acceptance criteria from upstream material

A ticket rarely arrives as acceptance criteria. It arrives as a user story, a Jobs to be Done statement, a usage scenario, or a list of requirements, and somebody has to turn it into scenarios. Some teams hand that translation to the agent. Nothing in the workflow requires the handoff.

Ron Jeffries described a user story as a card, a conversation, and a confirmation. The card is a token for the requirement, and the detail travels in conversation between customer and programmers. Mike Cohn adds that details settled in conversation become tests. The agent is not part of that conversation, so the card is all it gets.

Cohn calls the "so that" clause the most important part of a story, though not a mandatory one, because it shows why users want something. A Jobs to be Done statement carries the same reason when it names the job the customer hires the product to do.

The risk sits in the gaps. Say a story covers a successful password reset and says nothing about an expired link. The agent writes a scenario for the expired link anyway, with a plausible status code and a plausible message, and the draft looks as authoritative as the scenarios taken from the story. Nobody asked for that behavior, and now it has an ID.

Put three requests in the instruction:

- Every scenario names the story, requirement, or usage scenario it came from.
- Behavior the sources do not state goes under its own heading as an assumption or open question.
- The agent reports contradictions between sources to the developer and does not pick a side.

A developer approves the drafted scenarios before implementation starts. That approval is the independent check. When one agent context drafts the criteria, writes the code, and writes the tests, a misreading in the first step passes through the other two and the suite stays green. Ask for scenarios that cover the stated requirements and stop there, because every added permutation pushes the draft toward the [over-specification](../foundation/when-intent-engineering-fails#over-spec) the failure modes chapter describes.

The critique step below runs against these scenarios and their listed assumptions.

*Sources: Ron Jeffries, "Essential XP: Card, Conversation, Confirmation" (August 30, 2001), the card as a token and the conversation as the carrier of detail. Mike Cohn, "User Stories Applied" (Addison-Wesley, 2004), Introduction and Chapter 2, stories as just enough written down to prompt conversation, and details settled in conversation becoming tests. Mike Cohn, "User Story Template: What It Is and Why It Works So Well" (Mountain Goat Software, reviewed October 25, 2026), the "so that" clause as the most important part of a story. Clayton Christensen, Taddy Hall, Karen Dillon, and David Duncan, "Know Your Customers' 'Jobs to Be Done'" (Harvard Business Review, September 2016), customers hiring a product to do a job. Tying the missing conversation to the agent's input, the drafting requests, the approval step, and the independence caveat are this book's workflow guidance. Using stories, Jobs to be Done statements, and usage scenarios as inputs reflects the author's practice, not a field standard.*

## Critique before implementation

Ask a critic to identify ambiguous acceptance criteria, missing failure behavior, and conflicts with the current design. Supply the ticket, draft proposal, and relevant code or documentation. Review concrete findings against those inputs before changing the spec.

If you use a separate agent session, choose its inputs explicitly. A fresh session or a different model does not establish the quality of the critique. Spend the extra review effort where a mistaken requirement would force substantial rework.

*Sources: The critique inputs and effort tradeoff are this book's workflow guidance.*

## Archive before completing the ticket

In the author's team workflow, a ticket is complete only when the implementation has been verified and integrated and the change proposal is archived. Keep the ticket open while any of those steps remains unfinished. Archive status alone is not evidence of correct behavior.

OpenSpec's archive command preserves the change folder under `openspec/changes/archive/` and offers to sync delta specs that have not already been merged into the main specs. Accept or perform that sync before completing the ticket. Inspect the resulting main specs and keep the archive in version control. The next proposal needs the current specification as well as the integrated code.

Once this ticket is complete, start the next ticket in the agreed sequence and create its proposal. Other developers continue on their own tickets. Recheck dependencies and current decisions before beginning the next implementation.

*Sources: Fission AI, ["Concepts"](https://github.com/Fission-AI/OpenSpec/blob/main/docs/concepts.md) (reviewed October 22, 2026), archive history and delta-spec integration. Ticket completion and the developer's sequence are the author's reported team practice.*

## Tooling

OpenSpec's Commands reference, checked October 22, 2026, uses `/opsx:propose` to generate change artifacts and `/opsx:apply` to implement tasks. `/opsx:sync` merges delta specs into main specs. `/opsx:archive` archives a change and offers synchronization if needed. Invocation syntax varies by agent integration.

*Sources: Fission AI, ["Commands"](https://github.com/Fission-AI/OpenSpec/blob/main/docs/commands.md) (reviewed October 22, 2026), proposal, implementation, synchronization, archive operations, and integration-specific invocation.*

Archiving records the completed change. The next agent still needs the maintained design documents behind it, including decisions affecting more than one ticket.
