# Document Types

The agent loaded the spec. Three months after the feature shipped, it was still sitting in `openspec/changes/` with its acceptance criteria intact and its status unmarked. The agent treated it as active instruction, implemented behaviour the system already had, and opened a PR nobody knew what to do with. Nobody had archived it. Nobody had done anything wrong. The type had been confused with a permanent record, and permanent records do not get cleaned up.

This is not a documentation problem. It is a *type* problem. *Agentic Software Engineering (ASE)* recognises a small set of document types, each with a different lifespan and a different reason to exist. Mix them and they corrupt each other. Separate them and the repo briefs itself.

## The types

**README files** live at the root of every documentation directory. Every Git host renders them automatically when a user navigates to that directory. The top-level `docs/README.md` is the architecture overview. It lives forever and is updated as the architecture changes.

**INDEX files** serve a different reader: the agent. A table listing every file under the directory with a one-line description. No prose, no story. A map. The agent loads `docs/INDEX.md` at the start of a session to orient itself before reading anything else. README and INDEX live in the same directory, serve the same lifespan, and are the easiest types to collapse into one. That is the most common mistake. A human lands on the README when browsing in a browser; an agent loads the INDEX to know what exists before it decides what to read. Two files, same location, different jobs.

**Architectural Decision Records (ADRs)** are documents that manifest specific decisions: what was decided, what alternatives were considered, why this option won, and what consequences follow. The value is not what was decided. It is *why*. Six months later, when a developer proposes to reintroduce the stack the team migrated away from, the ADR answers before it reaches a meeting.

The *decision itself* is immutable once closed. Reversing it means writing a new ADR that references the old one. But supporting context can be updated in place: pros and cons, discovered consequences, implementation notes. The core decision does not change. When you do update, record an amendment at the bottom of the file: the date, what changed, and the before and after. This makes the edit history legible without requiring readers to dig through git blame.

This book uses MADR (Markdown Architectural Decision Record), a structured template developed by Oliver Kopp, Anita Armbruster, and Olaf Zimmermann (2018). MADR gives every ADR the same shape: context, considered options, decision outcome, consequences. Consistent shape means the agent can scan ten ADRs in two minutes without parsing the prose of each one, and `ase check` can validate format before a decision lands in the wrong state.

**Design docs** live in `docs/design/`. Per-feature thinking: options, approach, risks. Not a decision record. Too narrow, too feature-specific. Not a spec. Describes the approach, not the behaviour. What you do with them afterward is a matter of preference. Some teams write them and move on; the code becomes the authoritative record. Others keep them current: minor detail changes get edited in place (git tracks the history), and a major redesign gets a new doc while the old one stays for historical context. Both are reasonable. The discipline that matters is not which approach you pick, but picking one and applying it consistently so the agent does not confuse a superseded design for the current one.

**Specs** are a manifestation of intent. Where an ADR records a decision that was made, a spec records what you want the system to do before you build it: acceptance criteria, scenarios, test definitions. A spec also typically contains a task plan: a checklist of implementation steps the agent works through in order. The checkboxes matter. An agent that reads a list of unchecked tasks will execute them; an agent that reads prose will summarise it. Explicit tasks with checkmarks are how you prevent the agent from skimming past a step it found inconvenient.

One instruction worth adding to your `AGENTS.md` or to the spec itself: tell the agent to check off each task immediately upon completion, not at the end of the run. This gives you live progress visibility. It also means you can interrupt safely. When you resume, the checked boxes tell you and the agent exactly where things stand. Without it, an interrupted run leaves you guessing which tasks actually finished and which were just started.

A spec is not the same thing as OpenSpec. OpenSpec is a framework for managing specs through a change lifecycle: one folder per change, containing a proposal, a delta spec, a design doc, and a task list. The spec itself is one artefact inside that structure. Some teams keep a simpler `/specs` folder with files named by feature. That works too, and is more common in smaller codebases. The cost is lifecycle management: nothing prompts archival after implementation, and dead specs accumulate without a structural check to catch them. This book uses OpenSpec throughout, but the spec concept applies regardless of how the folder is organised.

Written before implementation, archived after. An un-archived spec is live instruction. The agent does not know the work is done.

## The lifespans matter more than the names

| Type | Lifespan | What that means in practice |
|---|---|---|
| README files | Permanent, updated | Always rewritten in place to stay current |
| INDEX files | Permanent, updated | Maintained on every file change in the directory |
| ADRs | Permanent; decision frozen | Reversal = new ADR. Status changes and cross-reference edits are fine |
| Design docs | Preference-dependent | Write-and-forget, or keep current. Pick one and apply it consistently. |
| Specs | Temporary, archived | Moved to archive after implementation |

A team that grasps the lifespan column has the practice. A team that only learns the directory names ends up with a `docs/decisions/` graveyard of superseded specs and a `docs/design/` directory of half-finished thoughts that nobody updated and nobody deleted.

*Sources: Nygard, "Documenting Architecture Decisions," Cognitect (Nov 15, 2011), origin of ADRs. Kopp, Armbruster, Zimmermann, MADR template (adr.github.io/madr) and CEUR-WS Vol-2072 (2018). OpenSpec (openspec.dev).*

## What conflation looks like in the wild

An ADR gets edited because the design changed. The decision history is now a lie. Readers see the current state and assume that was always the chosen option. The *why*, the thing that made the ADR valuable, has been overwritten by the *what*.

A design doc gets cited six months after the feature shipped. The cite is wrong; the design described what the team intended, not what they ended up with. Anyone reasoning from it is reasoning from a draft.

A spec gets parked in `docs/` because someone thought the team should keep it. Now the agent reads it on every session as live instruction. Half its context window is documentation of work that finished last quarter.

Each of these is reversible. Each of them, in a real repo, takes weeks of careful pruning to undo.

## What `ase-cli` does

The `ase-cli` repo at `git tag v0.4.0` shows the structure live. Six ADRs in `docs/decisions/`, all closed and immutable. Design docs in `docs/design/` for features that needed upfront reasoning. Specs in `openspec/specs/` for current behaviour, with completed changes archived to `openspec/changes/archive/`. Run `ase check` against it and the structural validation passes: `docs-readme-exists`, `docs-index-exists`, `adr-format` all green.

That is not because the team is disciplined. It is because the directories make the wrong move harder than the right one. Structure is the cheapest discipline available. Maven and Rails called it convention over configuration. ASE adds the agent to the list of beneficiaries.
