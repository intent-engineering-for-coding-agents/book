# IEC-QUALITY-SYNC-ENGINEERING-MEMORY: Synchronize Engineering Memory

**Layer**: 1
**Categories**: quality, documentation, agent
**Applies-to**: all
**Summary**: A release updates the code and the engineering memory the next agent will read.

## Principle

A release updates more than code. It updates the engineering memory the next developer and the next coding agent will read: Architectural Decision Records (ADRs), architecture overviews, design docs, diagrams, contracts, README files, INDEX files, and agent instructions affected by the change.

## Why it matters

The next agent session starts from the repo context, not from what the reviewer remembers. If a release changes the system but leaves the durable context behind, the next session receives stale instructions. The agent then generates code from a system model the codebase no longer implements.

## Violations to detect

- Behavioral PRs changing architecture without updating affected `docs/` artifacts
- ADRs left accepted after a later change supersede the decision
- Design docs or diagrams still describing components, contracts, or flows removed by the release
- Agent instructions still naming commands, files, or conventions changed by the release

## Good practice

During the after-gate, ask the agent to inspect the diff and list affected engineering-memory artifacts. Include small updates in the same pull request. For larger architecture updates, open a follow-up with an owner and a blocking reference from the implementation PR. The agent proposes the synchronization. Review owns whether the record is true.

## Sources

- intent-book, *"Intent Engineering and the SDLC" chapter*, foundation section.
- intent-book, *"Keeping Documentation Up to Date" chapter*, quality section.
- ISO/IEC/IEEE 42010:2022, architecture description as the artifact expression of architecture.

