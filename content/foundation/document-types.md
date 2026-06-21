# Document Types

A spec is meant to die when its feature ships. Leave one sitting in `openspec/changes/` with its acceptance criteria intact and its status unmarked, and the next agent reads it as live instruction, reimplements behavior the system already has, and opens a PR nobody knows what to do with. Nobody archived it. Nobody did anything wrong. The document outlived the job it was written for, and permanent documents do not get cleaned up.

This is not a documentation problem. It is a type problem. This book uses a small working set of document types, each with a different lifespan and a different reason to exist. The easiest way to understand why the types exist is to watch what happens when you get them wrong.

The design changes, and someone edits the original ADR instead of writing a new one. Decision history becomes a lie: readers see the current state and assume the current state was always the chosen option. The what has overwritten the why, the part that made the ADR valuable. The ADR still passes review, but it is wrong.

A design doc gets cited six months after the feature shipped. The cite is wrong. The design described what the team intended when it was created, not what they ended up with. Anyone reasoning from it is reasoning from a draft. In a PR review, that looks like two people disagreeing about the system, and neither of them is wrong about what they read.

A spec gets parked in `docs/` because someone thought the team should keep it for reference. The agent now reads work from the last quarter as live instruction, burning half its context window on stale guidance. The agent is not confused. It is following instructions that happen to be wrong, and those are harder to catch than no instructions at all.

Each case is reversible, but in a real repo, each takes weeks of careful pruning to undo. Recognizing the type is where this starts. What you do with it next is what the rest of this chapter is about.

## The types

The taxonomy below is a book synthesis. It combines established document forms such as ADRs with repo conventions that make those forms legible to coding agents.

Content documents are the baseline: wiki pages, guides, articles, reference documentation. They carry no lifecycle constraint, no structural requirement, and no size limit the agent must respect. Write them, update them in place, and let them grow or shrink as the subject demands. The agent treats them as prose to read, not instructions to execute. No archiving trigger, no immutability rule, no checkbox discipline.

The other five types each carry constraints. Content documents do not. That asymmetry is the point.

The enforcement mechanism is directory placement. Structured documents live under `docs/`. Content documents live outside it, in whatever directory fits the team's setup: `content/`, `wiki/`, `pages/`. A convention check scopes its validators to `docs/` and `openspec/`. `AGENTS.md` points the agent at the same places. Content documents are never in that path. No filename suffix is needed. The directory does that job.

*Sources: Nygard, "Documenting Architecture Decisions," Cognitect (Nov 15, 2011), the ADR concept. Kopp, Armbruster, Zimmermann, MADR template (2018), structured ADR format. OpenSpec (openspec.dev), the change-folder lifecycle. `iec` repo conventions in this project family, the docs/ vs. content/ directory placement.*

## README and INDEX files

README files live at the root of every documentation directory. GitHub, GitLab, and most hosted Git platforms render them automatically when a user navigates to that directory, and that rendering is what a README is for: a human reading on a Git host where prose, headings, and diagrams read the way they were written. The architecture overview lives in `docs/architecture/README.md`. The top-level `docs/README.md` does different work: it orients a reader to the documentation tree itself, what exists under `docs/` and where to start, not to the architecture the tree documents. Both live forever, each updated as the thing it describes changes.

INDEX files serve a different reader: the agent. Each table row lists a file and carries a one-line description. The job is not to summarize the file, but to tell the reader which file answers the need at hand. No prose, no story, no diagrams. A map. The agent loads `docs/INDEX.md` at the start of a session to orient itself before reading anything else, which means a stale entry costs more than a missing one: it sends the agent toward a file that moved, or hides one that recently landed. The fix is not a cleanup pass after the fact. It is a standing rule, and it belongs in the agent instructions `AGENTS.md` points to, not in the hub file itself: the same change that adds, renames, or removes a file updates the directory's INDEX entry and any reference to that file in its README.

README and INDEX live in the same directory, serve the same lifespan, and are the easiest types to collapse into one. That is the most common mistake. A human lands on the README when browsing in a browser. An agent loads the INDEX to know what exists before it decides what to read. Two files, same location, different jobs.

*Sources: `iec` repo conventions in this project family, the INDEX file structure, and agent-map format. GitHub and GitLab render README files automatically in directory navigation, behavior stable on both platforms as of this writing.*

## Design docs

Design docs live in `docs/design/` and hold per-feature thinking: options weighed, approach chosen, risks named. They are not decision records, too narrow and too feature-specific to carry that weight, and they are not specs either. A design doc describes the approach. A spec defines the behavior. What you do with them afterward is a matter of preference.

Some teams write them and move on, and the code becomes the authoritative record. Others keep them current: minor detail changes get edited in place (git tracks the history), and a major redesign gets a new doc while the old one stays for historical context. Both are reasonable. The discipline that matters is not which approach you pick, but picking one and applying it consistently so the agent does not confuse a superseded design for the current one.

*Sources: `iec` repo conventions in this project family, the docs/design/ placement and write-and-forget vs. keep-current treatment.*

## Architectural Decision Records

Architectural Decision Records (ADRs) are documents that manifest specific decisions: what was decided, what alternatives were considered, why this option won, and what consequences follow. The value is not what was decided. It is why. Six months later, when a developer proposes reintroducing the stack the team moved away from, the ADR answers the question before a meeting is called.

While an ADR is still proposed, change it as much as the discussion requires. That is what the proposal stage exists for. Once its status moves to `accepted`, the decision freezes. Reversing it means writing a new ADR that references the old one and supersedes it, not rewriting the original to say something different. Supporting context is not frozen: pros and cons, discovered consequences, implementation notes, the kind of adjustment that sharpens the record without changing what was decided. When you make that kind of adjustment, record an amendment at the bottom of the file: the date, what changed, and the before and after.

The proposed and accepted statuses come from MADR itself, recorded in a YAML front matter block at the top of the file: `status: accepted`, `date: 2024-03-01`. That structure is what turns the gate into something a convention check or an agent verifies directly, rather than a rule a reader has to infer from prose. The amendment record does not come from MADR. It is this book's own convention. Without it, there is no way to tell whether the supporting context in an ADR was part of the original decision or a correction added afterward. That ambiguity is exactly what the immutability rule exists to prevent.

*Sources: Nygard, "Documenting Architecture Decisions," Cognitect (Nov 15, 2011), the ADR form, and the why-over-what value. Kopp, Armbruster, Zimmermann, MADR template (adr.github.io/madr, 2018), the proposed/accepted status field in front matter. The amendment-record convention is this book's own.*

## MADR

This book uses MADR (Markdown Architectural Decision Records), a structured template developed by Oliver Kopp, Anita Armbruster, and Olaf Zimmermann (2018). MADR gives every ADR the same shape: context, considered options, decision outcome, consequences. Consistent shape means the agent scans several ADRs quickly without parsing the prose shape of each one, and a convention check validates the format before a decision lands in the wrong state.

The "considered options" section is not boilerplate. Rejected options tell the agent which paths were already evaluated and ruled out. An agent that sees only the chosen option will re-propose the alternatives on its own. One that sees the rejected options with their reasoning will not. The why-not carries the same weight as the why.

A secondary reason MADR works: its headings are plain English doing real labor. Write `## Considered Options` and the agent fills it correctly without a footnote, the same way it would under `## Risks` or `## Open Questions`. That is not the agent recognizing MADR. It is the agent reading words that already say what they mean, and MADR's template is built from exactly those kinds of headings. You get the benefit whether or not the agent has ever seen the standard by name.

Some formats need more than that. Gherkin's `Given/When/Then` and OpenAPI's schema structure are not self-explanatory from the words alone. An agent either has encountered that exact convention at scale, in which case it produces the real thing, or it has not, in which case it produces something that merely looks like it. That is where naming a field standard genuinely substitutes for writing your own specification of it: the agent's training carries the convention, and your documentation does not have to. Inventing a custom format forces you to explain it from nothing. Naming a standard the agent already knows means you do not have to. That only pays off where the convention itself is the hard part, not the words around it.

*Sources: Kopp, Armbruster, Zimmermann, MADR template (adr.github.io/madr) and CEUR-WS Vol-2072 (2018), the template's plain-English section headings. The named-standard-versus-custom-format argument is book synthesis.*

## Specs

Specs are a manifestation of _intent_, the behavioral kind. Where an ADR records a decision and the reasoning behind it, a spec records what the system must do as a result, before you build it. It comes with acceptance criteria, scenarios, test definitions. A spec also typically contains a task plan: a checklist of implementation steps the agent works through in order.

The structure matters. In current practice, an agent that reads a list of discrete unchecked steps tends to work through them in sequence. The same content written as prose gets summarized, and a step the agent finds low-priority quietly collapses into the summary instead of the work. The checklist format is what keeps that step from disappearing. The checkbox itself does something else, and it is worth a separate instruction to get it right.

One instruction worth adding to your `AGENTS.md` or to the spec itself: tell the agent to check off each task immediately upon completion, not at the end of the run. This gives you live progress visibility. It also means you interrupt safely. When you resume, the checked boxes tell you and the agent exactly where things stand. Without it, an interrupted run leaves you guessing which tasks finished and which were still in progress.

*Sources: OpenSpec documentation (openspec.dev), the task-list structure within a spec change folder. The checklist-vs-prose behavioral tendency is a current-practice observation.*

## Specs and OpenSpec

A spec is not the same thing as OpenSpec. OpenSpec is a framework for managing specs through a change lifecycle: one folder per change, containing `proposal.md`, `tasks.md`, delta specs (one per capability under `specs/`), and optionally `design.md` for changes that require technical design decisions. The spec itself is one artifact inside that structure. Some teams keep a simpler `/specs` folder with files named by feature. That works too and is more common in smaller codebases. The cost is lifecycle management: nothing prompts archival after implementation, and dead specs accumulate without a structural check to catch them. This book uses OpenSpec throughout, but the spec concept applies regardless of how the folder is organized.

*Sources: OpenSpec (openspec.dev, Fission-AI/OpenSpec), the change-folder structure: `proposal.md`, `tasks.md`, delta specs under `specs/`, and optional `design.md`.*

## Archiving

A spec lives in two moments: written before the work begins, archived once it ends. Skip the second, and the agent treats settled work as an open task.

Specs are temporary: they move to `openspec/changes/archive/` after implementation. The full archiving mechanics, the retention discipline, and the dead-spec failure mode that results from skipping this step are in [Spec Lifecycle](/spec-driven/spec-lifecycle).

*Sources: OpenSpec documentation, `concepts.md` (Fission-AI/OpenSpec), the archive folder mechanics.*

## The lifespans matter more than the names

| Type | Lifespan | What that means in practice |
|---|---|---|
| Content documents | Permanent, updated | Write and evolve in place. No lifecycle or size constraints |
| README files | Permanent, updated | Updated in place, written for human readers on Git hosts, not the agent |
| INDEX files | Permanent, updated | Maintained on every file change in the directory |
| Design docs | Preference-dependent | Write-and-forget, or keep current. Pick one and apply it consistently. |
| ADRs | Permanent, decision frozen at accepted | Proposed: freely editable. Accepted: decision frozen. Reversal = new ADR. Supporting edits need an amendment record. |
| Specs | Temporary, archived | Moved to archive after implementation |

A team that grasps the lifespan column has the practice. A team that only learns the directory names ends up with a `docs/decisions/` graveyard of superseded specs and a `docs/design/` directory of half-finished thoughts that nobody updated and nobody deleted.

Structure is the cheapest discipline available. Convention over configuration is an old argument, one Maven and Rails built ecosystems on. Intent Engineering extends it to a new reader: the agent.

*Sources: Nygard, "Documenting Architecture Decisions," Cognitect (Nov 15, 2011), origin of ADRs. Kopp, Armbruster, Zimmermann, MADR template (adr.github.io/madr) and CEUR-WS Vol-2072 (2018), structured ADR format. OpenSpec (openspec.dev), the spec lifecycle and archive discipline. Apache Maven, "Standard Directory Layout" (2014), the canonical convention-over-configuration directory layout. David Heinemeier Hansson, "The Rails Doctrine" (2016), convention over configuration codified as a framework pillar.*

## Tooling

If you want to see this in practice, the `iec` CLI repository has the structure live:

- ADRs in `docs/decisions/`,
- design docs in `docs/design/`,
- specs in `openspec/specs/` with completed changes archived.

Run `iec check` and the structural validators pass. It is not a showcase. It is what the structure looks like when this taxonomy has been applied consistently over the life of a real project.

*Sources: `iec` CLI (github.com/intent-engineering-for-coding-agents/cli), the document taxonomy applied to a live project.*

## The taxonomy assumes a readable format

All of it assumes the documents are in a format the agent processes. A type taxonomy tells you where to put things and how long to keep them. It does not guarantee the agent reads them. An architecture diagram embedded in a Keynote file is still a Keynote file, regardless of which directory it sits in.
