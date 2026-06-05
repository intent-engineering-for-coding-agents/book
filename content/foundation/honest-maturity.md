# Honest Maturity

Ask the team if they practice spec-driven development. Most will say yes. Look at the last twenty PRs. Eight have specs. Six of those specs were written after the code. Two reference acceptance criteria no test exists for.

The team is not lying. They believe they practice it. They probably did practice it for the first month after adoption. The gap between what we believe we do and what the repo shows we do is the most reliable failure mode in any engineering organisation, and Intent Engineering practices are no different.

The fix is not more process. It is honesty about where you are. This chapter gives you three labels to attach to any practice you adopt: practiced, documented, CI-enforced. The label tells you where a team needs to be for the practice to work. This is where those labels come from.

## Three levels, used honestly

### Practiced

Practiced means the team does this in their actual workflow, even informally. Not documented, not enforced, just done. A developer who writes a spec before asking the agent to implement is practicing spec-driven development whether or not it is in the team docs. Practiced is the starting point. It is real, and it is fragile.

### Documented

Documented means it is written down well enough that someone new can follow it without asking someone who already knows. A convention in `AGENTS.md` or `.agents/instructions/` that accurately describes how the team works is documented maturity. Note the word accurately. An instruction file that describes how the team worked six months ago is not documented maturity. It is a historical record with delusions of authority.

### CI-enforced

CI-enforced is the only level a team relies on without trust. The pipeline fails if the practice is violated. `iec check` catches a missing `docs/README.md` before the PR merges. A test tagged with a non-existent AC ID fails the traceability check. CI-enforced practices survive team turnover, deadline pressure, and the new developer who did not read the wiki. The other two levels do not.

Each level carries a target annotation: practiced, target: CI-enforced by Q3. This distinguishes intent from claim. Writing target: CI-enforced when you are not there yet is honesty. Writing CI-enforced when you rely on code review to catch it is something else.

These are not CMM audit levels. No certification, no maturity score, no report for management. One team, honest with itself about one practice. A practice stays at practiced indefinitely if the enforcement cost is not worth the work. The discipline is calling things by the right name. Not upgrading the label to look good in a retrospective.

## Why the labels matter

A team that claims CI-enforced maturity for something they catch in code review is not lying. They probably believe it. But the next developer trusts the pipeline. The pipeline is not catching what the team thinks it catches. The trust is misplaced, and the failure shows up exactly when nobody expects it.

Honest labelling produces two outcomes. First, it tells everyone what they rely on. CI-enforced means trust the pipeline. Practiced means ask someone who knows. Second, it makes gaps visible, which makes them closeable. A practice marked practiced, target: CI-enforced by Q3 is a backlog item. A practice marked CI-enforced but caught only in code review is an outage waiting for the right Tuesday.

Not every practice in this book needs to reach CI-enforced. Some pay off at practiced and the enforcement cost is not worth the work. A team that enforces a spec-before-code rule in code review does better work than one with a pipeline check and four dead specs. For each practice you adopt, find the minimum level where it starts returning value, and decide whether CI-enforced is worth the investment.

The three levels rhyme with the ThoughtWorks Radar's Hold/Assess/Trial/Adopt rings. Both scale a practice from early awareness toward confident adoption. The difference is scope. The Radar speaks to the industry: is this technique ready for widespread adoption? These three levels speak to one team: is this practice enforced here, right now? The Radar's rings tell you what the field has learned. These labels tell you what you rely on.

Where you are tells you what you rely on. Where you are starting from tells you what order to adopt things in. A greenfield codebase and a six-year-old production system are not just different amounts of technical debt. They are different entry points, and the adoption sequence that works for one makes a mess of the other.

Sources: ThoughtWorks Technology Radar Vol 34 (April 2026), adoption rings as framing for practice-readiness.
