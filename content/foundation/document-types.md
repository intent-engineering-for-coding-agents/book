# Document Types

A spec is meant to die when its feature ships. Leave one sitting in `openspec/changes/` and the next agent reads it as live instruction. That is not a documentation problem. It is a type problem.

This book uses a small working set of document types. Each one has a different lifespan and a different job. If you blur those jobs, the agent reads stale material as if it were current.

## The types

The taxonomy below is a working set for agent-readable repos. It combines established forms such as ADRs with repo conventions that make those forms legible to coding agents.

Content documents are the baseline: wiki pages, guides, articles, reference documentation. They carry no lifecycle constraint, no structural requirement, and no size limit the agent must respect. Write them, update them in place, and let them grow or shrink as the subject demands.

The other types carry stronger rules. That asymmetry is the point.

The enforcement mechanism is directory placement. Structured documents live under `docs/`. Content documents live outside it, in whatever directory fits the team's setup: `content/`, `wiki/`, `pages/`. A convention check scopes its validators to `docs/` and `openspec/`. `AGENTS.md` points the agent at those same places.

*Sources: Nygard, "Documenting Architecture Decisions," Cognitect (November 15, 2011), the ADR concept. Kopp, Armbruster, Zimmermann, MADR template (2018), structured ADR format. OpenSpec (openspec.dev), the change-folder lifecycle. `iec` repo conventions in this project family, the docs/ vs. content/ directory placement.*

## README and INDEX files

README files live at the root of every documentation directory. GitHub, GitLab, and most hosted Git platforms render them automatically when a user navigates to that directory, and that rendering is what a README is for, a human reading on a Git host.

INDEX files serve a different reader, the agent. Each table row lists a file and carries a one-line description. The job is not to summarize the file, but to tell the reader which file answers the need at hand. No prose, no story, no diagrams. A map.

The agent loads `docs/INDEX.md` at the start of a session to decide what to read next, so a stale entry misdirects every session that follows.

Make it a standing repo rule that the same commit adding, renaming, or removing a file also updates the directory's INDEX entry and any reference to that file in its README.

README and INDEX live in the same directory and share the same lifespan, but they do different work. A human lands on the README in a browser. An agent loads the INDEX to decide what exists before it reads further.

*Sources: `iec` repo conventions in this project family, the INDEX file structure, and agent-map format. GitHub and GitLab render README files automatically in directory navigation, behavior stable on both platforms as of this writing.*

## Design docs

Design docs live in `docs/design/` and hold per-feature thinking: options weighed, approach chosen, risks named. They are not decision records, and they are not specs: a design doc describes the approach, a spec defines the behavior.

Some teams write them and move on, others keep them current, and both are reasonable. Pick one policy and apply it consistently, so the agent does not load a 2025 design doc as if it still described the 2026 implementation.

*Sources: `iec` repo conventions in this project family, the docs/design/ placement and write-and-forget vs. keep-current treatment.*

## skeleton.md

`skeleton.md` exists to get a brownfield repo into the rest of the taxonomy. This book uses it as a first pass: reverse-engineered structure, visible business rules, recovered constraints, and the first draft of decisions nobody had written down.

That gives it a lifecycle: live while the brownfield recovery is in progress, retired once the stable findings have been distilled into the permanent `docs/` set. [Brownfield vs Greenfield](/foundation/brownfield-vs-greenfield) works out the mechanics.

*Sources: Schwab, "AI as Your Legacy Code Archaeologist," Caimito blog (February 7, 2026), agents extracting structure and business rules from legacy code. The `skeleton.md` lifecycle framing is this book's synthesis.*

## Architectural Decision Records

Architectural Decision Records (ADRs) record specific decisions: what was decided, what alternatives were considered, why this option won, and what consequences follow. What matters is the why behind the decision.

While an ADR is still proposed, change it as much as the discussion requires. Once its status moves to `accepted`, the decision freezes. Reversing it means writing a new ADR that references the old one and supersedes it, not rewriting the original to say something different.

Supporting context is not frozen. If you sharpen the record without changing the decision, record an amendment at the bottom of the file with the date and what changed.

The proposed and accepted statuses come from MADR itself, recorded in YAML front matter at the top of the file: `status: accepted`, `date: 2024-03-01`. The amendment record does not come from MADR. It is this book's own convention.

*Sources: Nygard, "Documenting Architecture Decisions," Cognitect (November 15, 2011), the ADR form and the why-over-what value. Kopp, Armbruster, Zimmermann, MADR template (adr.github.io/madr, 2018), the proposed/accepted status field in front matter. The amendment-record convention is this book's own.*

## MADR

This book uses MADR (Markdown Architectural Decision Records), a structured template developed by Oliver Kopp, Anita Armbruster, and Olaf Zimmermann (2018). MADR gives every ADR the same shape: context, considered options, decision outcome, consequences.

The "considered options" section is not boilerplate. Rejected options tell the agent which paths were already evaluated and ruled out. The why-not carries almost as much weight as the why.

A second reason MADR works is that the headings already say what belongs under them. Write `## Considered Options` and the agent usually fills it correctly without extra explanation.

*Sources: Kopp, Armbruster, Zimmermann, MADR template (adr.github.io/madr) and CEUR-WS Vol-2072 (2018), the template's plain-English section headings. The named-standard-versus-custom-format argument is book synthesis.*

## Specs

Specs are the behavioral form of intent. Where an ADR records a decision and the reasoning behind it, a spec records what the system must do as a result, before you build it. It usually carries acceptance criteria, scenarios, test definitions, and a task plan.

The structure matters. A list of discrete unchecked steps keeps the work concrete. The same content written as prose gets summarized and blurred.

One instruction is worth adding to your `AGENTS.md` or to the spec itself. Tell the agent to check off each task immediately upon completion, not at the end of the run. That gives you live progress visibility and makes interruption safer.

*Sources: OpenSpec documentation (openspec.dev), the task-list structure within a spec change folder. The checklist-vs-prose behavioral tendency is a current-practice observation.*

## Specs and OpenSpec

A spec is not the same thing as OpenSpec. OpenSpec is a framework for managing specs through a change lifecycle: one folder per change, containing `proposal.md`, `tasks.md`, delta specs under `specs/`, and optionally `design.md` for changes that require technical design decisions. The spec itself is one artifact inside that structure.

Some teams keep a simpler `/specs` folder with files named by feature. That works too. The cost is lifecycle management, since nothing prompts archival after implementation.

This book uses OpenSpec throughout, but the spec concept applies regardless of how the folder is organized.

*Sources: OpenSpec (openspec.dev, Fission-AI/OpenSpec), the change-folder structure: `proposal.md`, `tasks.md`, delta specs under `specs/`, and optional `design.md`.*

## Archiving

A spec lives in two moments: written before the work begins, archived once it ends.

Specs are temporary and move to `openspec/changes/archive/` after implementation. The full mechanics are in [Spec Lifecycle](/spec-driven/spec-lifecycle).

*Sources: OpenSpec documentation, `concepts.md` (Fission-AI/OpenSpec), the archive folder mechanics.*

## The lifespans matter more than the names

| Type | Lifespan | What that means in practice |
|---|---|---|
| Content documents | Permanent, updated | Write and evolve in place. No lifecycle or size constraints |
| README files | Permanent, updated | Updated in place, written for human readers on Git hosts |
| INDEX files | Permanent, updated | Maintained on every file change in the directory |
| Design docs | Preference-dependent | Write-and-forget, or keep current. Pick one and apply it consistently. |
| ADRs | Permanent, decision frozen at accepted | Proposed: freely editable. Accepted: decision frozen. Reversal = new ADR. Supporting edits need an amendment record. |
| `skeleton.md` | Temporary bootstrap, then historical or retired | Live only during brownfield recovery. Distill stable findings into permanent `docs/`, then archive, remove, or mark as historical. |
| Specs | Temporary, archived | Moved to archive after implementation |

A team that grasps the lifespan column has the practice. A team that only learns the directory names ends up with superseded specs in the wrong place and half-live design notes nobody trusts.

*Sources: Nygard, "Documenting Architecture Decisions," Cognitect (November 15, 2011), origin of ADRs. Kopp, Armbruster, Zimmermann, MADR template (adr.github.io/madr) and CEUR-WS Vol-2072 (2018), structured ADR format. OpenSpec (openspec.dev), the spec lifecycle and archive discipline. Apache Maven, "Standard Directory Layout" (2014), the canonical convention-over-configuration directory layout. David Heinemeier Hansson, "The Rails Doctrine" (2016), convention over configuration codified as a framework pillar.*

## Tooling

The `iec` CLI repository has the structure live:

- ADRs in `docs/decisions/`
- design docs in `docs/design/`
- specs in `openspec/specs/` with completed changes archived

Run `iec check` and the structural validators pass. The point is that a later session can tell a live spec from an archived one without asking you.

*Sources: `iec` CLI (github.com/intent-engineering-for-coding-agents/cli), the document taxonomy applied to a live project.*

## The taxonomy assumes a readable format

All of this assumes the documents are in a format the agent can read. A type taxonomy tells you where to put things and how long to keep them. It does not extract text from a Keynote file or a screenshot.
