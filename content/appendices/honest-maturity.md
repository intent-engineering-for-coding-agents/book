# Honest Maturity

Ask the team if they practice spec-driven development. Most will say yes. Then sample recent PRs. If specs appear after the code, or acceptance criteria have no matching tests, the practice is already drifting.

The team is not lying. They believe the practice is alive, and soon after adoption, the belief likely matched the workflow. The gap between what we believe we do and what the codebase shows we do is a common failure mode in engineering organizations. Intent Engineering practices drift the same way.

The fix is not more process, but honest labeling. This book uses three labels for any practice you adopt: practiced, documented, CI-enforced. Each label names what the team relies on now.

## Three levels, used honestly

### Practiced

Practiced means the team does the work in its actual workflow, even informally. No documentation, no enforcement, only the habit. A developer who writes a spec before asking the agent to implement is practicing spec-driven development whether or not the team docs say so. Practiced is a real starting point, and a fragile one.

### Documented

Documented means the practice is written down well enough for a new teammate to follow without asking the person who already knows. Agent instructions that accurately describe how the team works are documented maturity. Note the word accurately. An instruction file that still says "use `requests`" after the codebase moved to `httpx` is not documented maturity. It is incorrect project guidance in a file the team treats as authoritative.

### CI-enforced

CI-enforced is the only level a team relies on without trust. In a repo with those checks wired in, the pipeline fails when the practice is violated: a missing `docs/README.md` stops the PR before merge, and a test tagged with a non-existent AC ID fails the traceability check. CI-enforced practices persist through team turnover, deadline pressure, and the new developer who did not read the wiki. The other two levels do not.

A target annotation keeps current state separate from intent: `practiced, target: CI-enforced by Q3`. Writing target: CI-enforced when you are not there yet is honest roadmapping. Writing CI-enforced when code review is doing the actual catching is the failure mode this taxonomy names.

These are not CMM audit levels. No certification, no maturity score, no report for management. The discipline is calling things by the right name, not upgrading the label to look good in a retrospective.

*Sources: This three-level taxonomy is book synthesis.*

## Why the labels matter

A team claiming CI-enforced maturity for something caught in code review is not lying. They often believe the claim. The next developer trusts the pipeline, though, and the pipeline is not catching what the team thinks it catches. Misplaced trust fails exactly when nobody expects it.

Honest labeling tells everyone what they rely on: CI-enforced means trusting the pipeline, while practiced means asking the teammate who knows the rule. Honest labels also make gaps visible, which makes them closeable. A practice marked practiced, target: CI-enforced by Q3 is a backlog item. A practice marked CI-enforced but caught only in code review is an outage waiting for the right Tuesday.

Not every practice in this book needs to reach CI-enforced. Some pay off at practiced and the enforcement cost is not worth the work. A team that enforces a spec-before-code rule in code review does better work than one with a pipeline check and stale specs. For each practice you adopt, find the minimum level where it starts returning value, and decide whether CI-enforced is worth the investment.

The three levels rhyme loosely with the ThoughtWorks Radar's Hold/Assess/Trial/Adopt rings. Both scale a practice from early awareness toward confident adoption. The difference is scope. The Radar speaks to the industry: is this technique ready for widespread adoption? These three levels speak to one team: is this practice enforced here, right now? The Radar's rings tell you what the field has learned. These labels tell you what you rely on.

Your current level tells you what you rely on, and your starting point tells your adoption order. A greenfield codebase and a six-year-old production system is a different problem with different amounts of technical debt. They are different entry points, and the adoption sequence that works for one makes a mess of the other.

*Sources: ThoughtWorks Technology Radar Vol 34 (April 2026), adoption rings as practice-readiness framing. The practiced/documented/CI-enforced split is book synthesis for repo-local adoption state.*
