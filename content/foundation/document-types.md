# Document Types

Every document in a repo has a lifespan, and the trouble starts when one outlives the job it was written for. A spec is meant to die when its feature ships. Leave one sitting in `openspec/changes/` with its acceptance criteria intact and its status unmarked, and the next agent reads it as live instruction, reimplements behaviour the system already has, and opens a PR nobody knows what to do with. Nobody archived it. Nobody did anything wrong. A temporary document got treated as a permanent one, and permanent documents do not get cleaned up.

This is not a documentation problem. It is a type problem. This book uses a small working set of document types, each with a different lifespan and a different reason to exist. The easiest way to understand why the types exist is to watch what happens when you get them wrong.

An ADR gets edited because the design changed. The decision history is now a lie. Readers see the current state and assume that was always the chosen option. The why, the thing that made the ADR valuable, has been overwritten by the what. The ADR still passes review. It is wrong.

A design doc gets cited six months after the feature shipped. The cite is wrong. The design described what the team intended, not what they ended up with. Anyone reasoning from it is reasoning from a draft. In a PR review, that looks like two people disagreeing about the system, and neither of them is wrong about what they read.

A spec gets parked in `docs/` because someone thought the team should keep it for reference. Now the agent reads it on every session as live instruction. Half its context window is documentation of work that finished last quarter. The agent is not confused. The agent is following instructions that happen to be wrong, and those are harder to catch than no instructions at all.

Each of these is reversible. Each of them, in a real repo, takes weeks of careful pruning to undo. The types exist to prevent the pruning.

## The types

The taxonomy below is book synthesis. It combines established document forms such as ADRs with repo conventions that make those forms legible to coding agents.

Content documents are the baseline: wiki pages, guides, articles, reference documentation. They carry no lifecycle constraint, no structural requirement, and no size limit the agent must respect. Write them, update them in place, and let them grow or shrink as the subject demands. The agent treats them as prose to read, not instructions to execute. No archiving trigger, no immutability rule, no checkbox discipline.

The other five types each carry constraints. Content documents do not. That asymmetry is the point.

The enforcement mechanism is directory placement. Structured documents live under `docs/`; content documents live outside it, in whatever directory fits the team's setup: `content/`, `wiki/`, `pages/`. `ase check` scopes its validators to `docs/` and `openspec/`. `AGENTS.md` points the agent at the same places. Content documents are never in that path. No filename suffix is needed. The directory does that job.

Sources: Nygard, "Documenting Architecture Decisions," Cognitect (Nov 15, 2011), the ADR concept. Kopp, Armbruster, Zimmermann, MADR template (2018), structured ADR format. OpenSpec (openspec.dev), the change-folder lifecycle. `ase-cli` repo conventions in this project family, the docs/ vs content/ directory placement.

README files live at the root of every documentation directory. Every Git host renders them automatically when a user navigates to that directory. The top-level `docs/README.md` is the architecture overview. It lives forever and is updated as the architecture changes.

INDEX files serve a different reader: the agent. A table listing every file under the directory with a one-line description. No prose, no story. A map. The agent loads `docs/INDEX.md` at the start of a session to orient itself before reading anything else. README and INDEX live in the same directory, serve the same lifespan, and are the easiest types to collapse into one. That is the most common mistake. A human lands on the README when browsing in a browser; an agent loads the INDEX to know what exists before it decides what to read. Two files, same location, different jobs.

Design docs live in `docs/design/`. Per-feature thinking: options, approach, risks. Not a decision record. Too narrow, too feature-specific. Not a spec. Describes the approach, not the behaviour. What you do with them afterward is a matter of preference. Some teams write them and move on; the code becomes the authoritative record. Others keep them current: minor detail changes get edited in place (git tracks the history), and a major redesign gets a new doc while the old one stays for historical context. Both are reasonable. The discipline that matters is not which approach you pick, but picking one and applying it consistently so the agent does not confuse a superseded design for the current one.

Architectural Decision Records (ADRs) are documents that manifest specific decisions: what was decided, what alternatives were considered, why this option won, and what consequences follow. The value is not what was decided. It is why. Six months later, when a developer proposes to reintroduce the stack the team migrated away from, the ADR answers before it reaches a meeting.

The decision itself is immutable once closed. Reversing it means writing a new ADR that references the old one. But supporting context can be updated in place: pros and cons, discovered consequences, implementation notes. The core decision does not change. When you do update, record an amendment at the bottom of the file: the date, what changed, and the before and after. This makes the edit history legible without requiring readers to dig through git blame.

This book uses MADR (Markdown Architectural Decision Record), a structured template developed by Oliver Kopp, Anita Armbruster, and Olaf Zimmermann (2018). MADR gives every ADR the same shape: context, considered options, decision outcome, consequences. Consistent shape means the agent scans several ADRs quickly without parsing the prose shape of each one, and `ase check` validates format before a decision lands in the wrong state.

Specs are a manifestation of intent. Where an ADR records a decision that was made, a spec records what you want the system to do before you build it: acceptance criteria, scenarios, test definitions. A spec also typically contains a task plan: a checklist of implementation steps the agent works through in order. The checkboxes matter. An agent that reads a list of unchecked tasks will execute them; an agent that reads prose will summarise it. Explicit tasks with checkmarks are how you prevent the agent from skimming past a step it found inconvenient.

One instruction worth adding to your `AGENTS.md` or to the spec itself: tell the agent to check off each task immediately upon completion, not at the end of the run. This gives you live progress visibility. It also means you interrupt safely. When you resume, the checked boxes tell you and the agent exactly where things stand. Without it, an interrupted run leaves you guessing which tasks finished and which were just started.

A spec is not the same thing as OpenSpec. OpenSpec is a framework for managing specs through a change lifecycle: one folder per change, containing a proposal, a delta spec, a design doc, and a task list. The spec itself is one artefact inside that structure. Some teams keep a simpler `/specs` folder with files named by feature. That works too, and is more common in smaller codebases. The cost is lifecycle management: nothing prompts archival after implementation, and dead specs accumulate without a structural check to catch them. This book uses OpenSpec throughout, but the spec concept applies regardless of how the folder is organised.

Written before implementation, archived after. An un-archived spec is live instruction. The agent does not know the work is done.

## The lifespans matter more than the names

| Type | Lifespan | What that means in practice |
|---|---|---|
| Content documents | Permanent, updated | Write and evolve in place; no lifecycle or size constraints |
| README files | Permanent, updated | Always rewritten in place to stay current |
| INDEX files | Permanent, updated | Maintained on every file change in the directory |
| Design docs | Preference-dependent | Write-and-forget, or keep current. Pick one and apply it consistently. |
| ADRs | Permanent; decision frozen | Reversal = new ADR. Status changes and cross-reference edits are fine |
| Specs | Temporary, archived | Moved to archive after implementation |

A team that grasps the lifespan column has the practice. A team that only learns the directory names ends up with a `docs/decisions/` graveyard of superseded specs and a `docs/design/` directory of half-finished thoughts that nobody updated and nobody deleted.

Sources: Nygard, "Documenting Architecture Decisions," Cognitect (Nov 15, 2011), origin of ADRs. Kopp, Armbruster, Zimmermann, MADR template (adr.github.io/madr) and CEUR-WS Vol-2072 (2018), structured ADR format. OpenSpec (openspec.dev), the spec lifecycle and archive discipline.

## Tooling

If you want to see this in practice, `ase-cli` at `git tag v0.4.0` has the structure live: ADRs in `docs/decisions/`, design docs in `docs/design/`, specs in `openspec/specs/` with completed changes archived. Run `ase check` and the structural validators pass. It is not a showcase. It is what the structure looks like when this taxonomy has been applied consistently over the life of a real project.

Structure is the cheapest discipline available. Maven and Rails called it convention over configuration. ASE adds the agent to the list of beneficiaries.

All of it assumes the documents are in a format the agent processes. A type taxonomy tells you where to put things and how long to keep them. It does not guarantee the agent reads them. An architecture diagram embedded in a Keynote file is still a Keynote file, regardless of which directory it sits in.
