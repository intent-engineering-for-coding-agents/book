# The Map: ASE and the SDLC

The pitch most agentic-engineering material makes is implicit: throw out your SDLC and adopt the new one. New ceremonies. New artefacts. New review process. Your existing tooling becomes legacy on contact.

The Software Development Life Cycle is the structured sequence a team runs to take software from idea to production: plan, build, review, integrate, deploy, maintain. Every team runs some version of it, whether they call it that or not.

That pitch dies on first contact with any team that has working CI, an established review culture, and a Jira board people actually use. So this book makes a different pitch.

*Agentic Software Engineering (ASE)* extends the SDLC. The ceremonies stay. The artefacts inside them change.

*Sources: Sommerville, *Software Engineering* (10th ed., Pearson, 2015), ch. 2.*

## The map

```mermaid
graph TD
    subgraph Planning
        A[Ticket / story] --> B[OpenSpec change folder<br/>spec + design + tasks]
    end
    subgraph Implementation
        C["AGENTS.md + .agents/"] --> D[Agent-assisted coding]
        B --> D
    end
    subgraph Review
        D --> E[Spec review before code review]
        E --> F[PR: docs / structural / behavior]
    end
    subgraph CI
        F --> G[ase check<br/>AC traceability<br/>tests]
        G --> H[Deploy]
    end
    subgraph Maintenance
        H --> I[Archive spec<br/>Update INDEX.md<br/>ADRs stay closed]
        I --> A
    end
```

Five phases, none of them new. Inside each, ASE adds exactly one thing.

## Planning: from ticket to spec

The change starts the way it always has. A ticket. A story. A Linear card. OpenSpec adds a sibling artefact, `openspec/changes/<name>/`, containing a proposal, a delta spec, a design doc, and a tasks file. The ticket is still the unit of tracking. The spec is the unit of intent.

Not every change earns a spec. A typo fix does not. A dependency bump does not. A bug fix is less clear-cut: if the correct behavior is self-evident, skip it; if figuring out what the system was *supposed* to do is the hard part, that reasoning belongs in a spec before anyone writes a line to restore it. Anything that touches architecture, or that you intend to hand to an agent: write the spec first. Planning is where intent gets fixed. Fixed intent is what the agent works from. Unfixed intent is what makes it produce code nobody wanted.

*Sources: Farley, *Modern Software Engineering* (Addison-Wesley, 2021), intent over artifact.*

## Implementation: brief the agent through the repo

With the spec in place, the agent needs to find it, along with the architecture overview, the constraints, and the conventions for the codebase it is about to change. That is what `AGENTS.md` is for. It loads first. From there it finds the relevant instructions and the spec for the current change. The briefing is in the repo, not in a chat message that disappears when the session ends.

The contrast matters at scale. A briefing in a chat session works for one developer for one hour. A briefing in `AGENTS.md` and `.agents/instructions/` works for every agent session, every developer, every CI run, on every machine. Same briefing, every time. The repo is the briefing.

## Review: intent first, code second

The agent commits. The PR opens. Most teams treat what comes next as one step. ASE treats it as two.

The spec delta says what the change is supposed to do. The code diff says what got built. Review the spec first. Does the intent match what was agreed? Then review the code diff. Does the implementation match the intent?

This sequencing is cheap to adopt and surprisingly effective. A reviewer who reads the code diff first anchors on whether the code is well-written. A reviewer who reads the spec first asks whether the *change* is the right change at all. That second question rarely gets asked when the diff is already in front of you.

PR taxonomy keeps the review focused. A `docs`-only PR does not need behaviour scrutiny. A `behavior` PR does not get cluttered by formatting changes that should have been their own `structural` PR. The taxonomy sounds bureaucratic. In practice it is just PR discipline with names.

## CI: the pipeline checks the conventions

`ase check` runs on every push. It validates that `AGENTS.md` is present and well-formed. That `docs/README.md` and `docs/INDEX.md` exist. That Architectural Decision Records (ADRs) follow Markdown ADR (MADR) format. That spec scenarios have stable Acceptance Criterion IDs (AC IDs) and test declarations. Not a new pipeline. A new check inside the pipeline you already have.

AC traceability links scenarios to tests. A test marked `@pytest.mark.ac("SCAFFOLD-001")` proves that scenario when it passes. The traceability survives spec archival; six months later, the audit trail still answers "which test covered this?" without grep guessing.

*Sources: Microsoft, "An AI-led SDLC" (2026). IBM, "AI in SDLC" (ongoing). continuousdelivery.com, Farley, and Humble.*

## Maintenance: the step everyone skips

After a change ships, archive the spec. Update `docs/INDEX.md` if any docs files moved. Leave ADRs closed. Update `AGENTS.md` if the change altered a convention.

This is the step where ASE most reliably falls apart in practice. Archiving takes two minutes. The cost of skipping it shows up months later, when the agent reads four half-implemented proposals as live context and produces code that satisfies none of them. By then archiving costs an afternoon of triage instead of two minutes per change.

`ase check` catches some of this. `docs-index-stale` flags the index that does not match the file tree. It cannot catch the design doc that should have become an ADR, or the convention that quietly changed without a corresponding `AGENTS.md` edit. That part stays human.

## Why not add ceremonies

New ceremonies have a half-life. Teams adopt them at the start of a quarter and drift back under deadline pressure six months later. ASE sidesteps this by plugging into the ceremonies that already have tooling, habit, and buy-in. The ask is smaller. The persistence is better.

What still fails is the gap between what a team believes it is doing and what the repo shows it is actually doing. A team that added spec review to its PR process but skips it under pressure did not adopt the practice. It adopted the intent. No SDLC map tells you the difference, and nothing in the map closes that gap on its own.
