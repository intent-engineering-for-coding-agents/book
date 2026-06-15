# Intent Engineering and the SDLC

This chapter rejects a tempting pitch: replace your SDLC with a new one. New ceremonies, new artifacts, a new review process. Existing tooling becomes legacy on contact.

The pitch fails where the engineering process already has teeth: Continuous Integration (CI) catches mistakes, reviewers defend standards, and the Jira board drives planning. This chapter makes the opposite move. Keep the delivery loop. Change the artifacts moving through the loop.

This book uses Spec-Driven Development for the broader practice of _writing intent before writing code_. Intent Engineering is this book's version of the practice. The Software Development Life Cycle (SDLC) stays in place.

*Sources: Sommerville, Software Engineering (10th ed., Pearson, 2015), ch. 2, the SDLC as the structured sequence from idea to production.*

## The map

Read the diagram as an overlay: gray marks the existing process, and teal marks the Intent Engineering context, artifact, review step, or check added to the loop.

```mermaid
graph TD
    classDef existing fill:#64748b,stroke:#475569,color:#fff
    classDef ie fill:#0d9488,stroke:#0f766e,color:#fff

    subgraph Legend:
        direction LR
        L1[Existing SDLC]:::existing
        L2[Intent Engineering]:::ie
    end
    subgraph Planning
        A[Ticket / story]:::existing --> B[OpenSpec change folder<br/>proposal + delta specs + tasks]:::ie
    end
    subgraph Implementation
        C["Agent instructions<br/>AGENTS.md + .agents/"]:::ie --> D["Coding<br/>(agent assisted)"]:::existing
        J["Structured documentation<br/>docs/"]:::ie --> D
        K["Acceptance criteria<br/>openspec/specs"]:::ie --> D
        B --> D
    end
    subgraph Review
        D --> E[Spec review before code review]:::ie
        E --> F[PR: docs / structural / behavioral]:::ie
    end
    subgraph "Continuous Integration (CI)"
        F --> G[Conventions check<br/>AC traceability tests]:::ie
        G --> H[Deploy]:::existing
    end
    subgraph Maintenance
        H --> I[Archive spec<br/>Refresh INDEX.md]:::ie
        I --> A
    end
```

Familiar phases, different evidence. What the agent reads when it starts work is what the previous phase filed.

## Planning: from ticket to spec

The change starts in the usual place: a ticket, a story, a Linear card. In this book's OpenSpec workflow, the sibling artifact is `openspec/changes/<name>/`: `proposal.md`, delta specs (one per capability under `specs/`), `tasks.md`, and optionally `design.md`. The ticket tracks the work, and the spec is where intent lives.

Most changes do not need a spec. Typo fixes and dependency bumps should stay light. Bugs need judgment. If the correct behavior is obvious, skip the spec. If reconstructing the intended behavior is the hard part, put the reasoning in a spec before restoring the code.

Architecture changes and agent-led implementation need the target before code exists. Without a target, the agent fills the empty space with plausible work nobody requested.

*Sources: Farley, Modern Software Engineering (Addison-Wesley, 2021), intent over artifact.*

## Implementation: use the repo briefing

During implementation, the agent enters the coding step through the repo briefing: `AGENTS.md`, `.agents/`, project docs under `docs/`, canonical specs under `openspec/specs/`, and the spec for the current change.

[Why Structure Matters](./why-structure) explains the deeper rule: the repo is the briefing. The SDLC map only needs the placement because implementation is where durable context meets code generation.

## Review: intent first, code second

Once a PR exists, a normal review path collapses intent and code into one diff conversation. Intent Engineering separates them.

The spec delta describes the intended behavior, while the code diff shows what got built. Read the spec first: does intent match agreement? Then read the code: does the implementation match intent?

The sequence moves one question earlier: are we building the right change at all? Once the diff dominates the screen, the question gets expensive. [Code Review for Agent-Generated Code](../team/code-review-agent-code) takes up the mechanics of making spec-first review the default path.

PR taxonomy gives the reviewer a second guardrail: a `docs`-only PR skips behavior scrutiny, and a `behavioral` PR does not belong in the same diff as formatting churn. The taxonomy sounds bureaucratic. In practice, names are cheaper than mixed diffs.

## CI: the pipeline checks the conventions

A convention check runs on every push and validates `AGENTS.md`, the presence of `docs/README.md` and `docs/INDEX.md`, Markdown Architectural Decision Record (MADR) format for ADRs, and stable Acceptance Criterion IDs (AC IDs) with test declarations on spec scenarios. This is not a new pipeline, only a new check inside the pipeline you already have.

AC traceability links scenarios to tests: a passing test marked `@pytest.mark.ac("SCAFFOLD-001")` proves the named scenario, and the traceability survives spec archival. Later, the audit trail still answers "which test covered this?" without grep guessing.

*Sources: Dave Farley and Jez Humble, continuousdelivery.com (ongoing), CI as the gate run on every push. Microsoft, "An AI-led SDLC" (2026, vendor-authored); IBM, "AI in SDLC" (ongoing, vendor-authored), the broader move to fold AI-era checks into the existing pipeline rather than standing up a new one.*

## Maintenance: the step everyone skips

After a change ships, archive the spec, update `docs/INDEX.md` when docs move, mark ADRs accepted or rejected and leave them. If a decision reverses, supersede with a new ADR. Never rewrite the original.

Update agent instructions when a convention changes. Agent instructions are code, and code changes go through a pull request. That is how the team reviews the change and stays informed that agent behavior has shifted. On a solo project the PR is optional, but the principle holds.

Skipped archive work looks harmless at first. The cost shows up later, when the agent reads half-implemented proposals as live context and writes code for a change nobody is making anymore. By then archive work has become triage.

Checks catch the mechanical part: an index-staleness rule compares the index with the file tree, but no check knows if a design doc deserved ADR promotion or an undocumented convention changed. Judgment stays human.

*Sources: Michael Nygard, "Documenting Architecture Decisions" (Cognitect, 2011), a reversed decision becomes a new superseding ADR rather than an edit to the original. The archive-on-ship discipline and the agent instructions-as-code rule are this book's workflow guidance.*

## Tooling

`iec check` is a CLI tool that validates these conventions locally or in CI. It is one implementation of the gate, not a requirement for the practice. See [Companion Repo](../appendices/companion-repo) for the repo layout.

## Why not add ceremonies

New ceremonies have a half-life. Teams adopt them with enthusiasm and drift back under deadline pressure. The design is to sidestep the churn by plugging into existing ceremonies rather than replacing them. A smaller ask survives longer.

*Sources: Farley, Modern Software Engineering (Addison-Wesley, 2021), sustainable process over heavyweight ceremony.*

When a team adds spec review to the PR checklist and skips the step under pressure, the practice exists in intention only. No process map catches that. The missing archived spec does. The harder question is whether the team knows it is missing. That question sharpens in codebases where the decisions were never written down at all.
