# Honest Maturity

Ask the team if they practice spec-driven development. Most will say yes. Look at the last twenty PRs. Eight have specs. Six of those specs were written after the code. Two reference acceptance criteria that no test exists for.

The team is not lying. They believe they practice it. They probably did practice it for the first month after adoption. The gap between *what we believe we do* and *what the repo shows we do* is the most reliable failure mode in any engineering organisation, and ASE practices are no different.

The fix is not more process. It is honesty about where you actually are.

## Four levels, used honestly

**Practiced.** The team does this in their actual workflow, even informally. Not documented; not enforced. A developer who writes a spec before asking the agent to implement is practicing spec-driven development whether or not the team has written it up.

**Documented.** The practice is written down. Someone new can follow it without asking someone who already knows. A convention in `AGENTS.md` or `.agents/instructions/` that accurately describes how the team actually works is documented maturity.

**CI-enforced.** The pipeline fails if the practice is violated. `ase check` catches a missing `docs/README.md` before the PR can merge. A test tagged with a non-existent AC ID fails the traceability check. CI-enforced practices are the only ones a team can rely on without trust.

**Target state.** The team intends to reach this and is honest about not being there yet. The label distinguishes intent from claim.

The four levels are not stages of virtue. A practice can sit at *practiced* indefinitely if the cost of enforcement is not worth paying. The discipline is calling things by the right name.

## Why the labels matter

A team that claims CI-enforced maturity for something they actually catch in code review is not lying — they probably believe it. But the next developer trusts the pipeline. The next agent session trusts the pipeline. The pipeline is not catching what the team thinks it catches. The trust is misplaced, and the failure shows up exactly when nobody expects it.

Honest labelling produces two outcomes. First, it tells everyone — including agents — what they can rely on. *CI-enforced* means trust the pipeline. *Practiced* means ask the team. Second, it makes gaps visible, which makes them closeable. A practice marked *practiced, target: CI-enforced by Q3* is a backlog item. A practice marked *CI-enforced* that is actually only practiced is an outage waiting for the right Tuesday.

## The lineage, and the ancestor we are not claiming

The ThoughtWorks Technology Radar uses four adoption rings — Hold, Assess, Trial, Adopt — to signal how ready a technology or practice is for general use. The ASE maturity levels rhyme with that framing. They are about practice-readiness inside one team, not technology-readiness across an industry.

CMM is the obvious historical ancestor in the maturity-model literature. It is the wrong one. CMM conflated process compliance with engineering effectiveness, which produced the well-documented pattern of organisations reaching CMM Level 4 while shipping software that did not work. ASE maturity has nothing to do with certification, audit, or process compliance. It has to do with one team being honest with itself about one practice, and writing the result down.

If your organisation already runs a CMM-style assessment, the maturity labels in this book do not feed into it. They are not designed to.

*Sources: ThoughtWorks Technology Radar Vol 34 (April 2026) — adoption rings as the lineage, framing for practice-readiness rather than process compliance.*

## Applied to this book

Each topic chapter notes, where relevant, the minimum maturity at which the practice starts paying off, and what CI-enforced maturity looks like. Not every practice needs to reach CI-enforced for the book's claims to hold. Some are valuable at *practiced* and the cost of enforcement does not justify the work.

The book will say which.

## The maintenance problem

Maturity labels help only if they are kept current. A label applied once and never revisited becomes another instance of the cognitive debt the labels are supposed to prevent. The map drifts from the territory.

Doc indexing has a skill that handles drift mechanically — `update-index` scans `docs/` and regenerates listing files. There is no equivalent automation for maturity claims yet. Some of this could be wired into `ase check` later — flag any practice claimed at *CI-enforced* whose enforcing check is missing. For now it stays a human responsibility, which means it is the responsibility most likely to slip.
