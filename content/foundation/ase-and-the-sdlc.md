# The Map — ASE and the SDLC

ASE does not replace your SDLC. It extends it. Every practice in this book maps to an existing phase of software development — planning, implementation, review, CI/CD, maintenance — and adds structure to what already happens there. The ceremonies stay. The artifacts change.

This chapter maps where ASE fits. Later topics go into depth on each practice. The purpose here is orientation: when you read a chapter on OpenSpec or AGENTS.md or `ase check`, you should be able to place it on the map without looking it up.

## The map

```mermaid
graph LR
    subgraph Planning
        A[Ticket / story] --> B[OpenSpec change folder\nspec + design + tasks]
    end
    subgraph Implementation
        C[AGENTS.md + .agents/] --> D[Agent-assisted coding]
        B --> D
    end
    subgraph Review
        D --> E[Spec review before code review]
        E --> F[PR — docs / structural / behavior]
    end
    subgraph CI/CD
        F --> G[ase check\nAC traceability\ntest suite]
        G --> H[Deploy]
    end
    subgraph Maintenance
        H --> I[Archive spec\nUpdate INDEX.md\nKeep ADRs closed]
        I --> A
    end
```

## Planning: from ticket to spec

The change starts the same way it always has — a ticket, a story, a Jira issue, a Linear card. OpenSpec adds a change folder alongside it: `openspec/changes/<name>/` containing a proposal, a delta spec, a design doc, and a tasks file. The ticket is still the unit of tracking. The spec is the unit of intent.

For small, low-risk changes — a typo fix, a dependency bump — no spec is needed. For anything involving behaviour, architecture, or agent-assisted implementation, a spec written before the code pays for itself in reduced ambiguity. The Spec-Driven topic covers when and how.

*Sources: Farley, *Modern Software Engineering* (Addison-Wesley, 2021) — intent over artefact.*

## Implementation: the agent is briefed, not instructed on the fly

When the agent begins implementing, it loads `AGENTS.md` as its entry point. From there it finds the relevant instruction files, the architecture overview, and the spec for the current change. It is not briefed via chat message; the briefing is in the repo.

The difference matters at scale. A briefing delivered in a chat session is lost when the session ends. A briefing in `AGENTS.md` and `.agents/instructions/` is available to every agent session, every developer, and every automated run.

## Review: intent before diff

The spec defines what the change should accomplish. The PR shows what was implemented. Review the spec delta first — does the intent match what was agreed? Then review the diff — does the implementation match the intent?

PR taxonomy keeps review focused. A PR that is exclusively documentation changes (`docs` type) does not need the same scrutiny as a PR that changes observable behaviour (`behavior` type). Mixing them makes both harder to review. The Quality topic covers taxonomy in detail.

## CI/CD: the pipeline validates ASE conventions

`ase check` runs on every push. It validates that `AGENTS.md` is present and well-formed, that `docs/README.md` and `docs/INDEX.md` exist, that ADRs follow the MADR format, that spec scenarios have AC IDs and test declarations. This is not a new gate; it is a new check added to an existing CI pipeline.

AC traceability links spec scenarios to tests. When a test marked `@pytest.mark.ac("SCAFFOLD-001")` passes, the AC with that ID is proven. When a spec is archived, the traceability record survives in the archive.

*Sources: Microsoft, "An AI-led SDLC" (2026). IBM, "AI in SDLC" (ongoing). continuousdelivery.com — Farley and Humble (ongoing).*

## Maintenance: keeping the map current

After a change ships, the spec is archived. `docs/INDEX.md` is updated if any docs files were added, renamed, or deleted. ADRs are left closed and untouched. The `AGENTS.md` is updated if the change affects conventions the agent needs to know.

The maintenance step is the one most teams skip, which is why drift compounds. Archiving a spec takes two minutes. Discovering six months later that your openspec/changes/ directory contains four half-done proposals, two cancelled ones, and one that was implemented but never archived — and that the agent has been treating all seven as active context — costs considerably more.

## What stays the same

Your sprint process, your PR workflow, your Jira board, your deployment pipeline — none of these change. ASE adds artifacts within existing steps and adds one CI check. It does not add ceremonies, standups, or review gates that did not already exist.

This is a deliberate design constraint. New ceremonies age quickly. Existing ones already have tooling, muscle memory, and review culture. ASE borrows that infrastructure rather than building its own.
