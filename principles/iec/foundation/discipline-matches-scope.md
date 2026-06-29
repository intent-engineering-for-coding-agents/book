# IEC-FOUNDATION-DISCIPLINE-MATCHES-SCOPE: Match the Discipline to Project Scope

**Layer**: 1
**Categories**: foundation, adoption, sdd
**Applies-to**: all
**Summary**: Match the depth of the discipline to project scope — skip it for throwaway work, write specs once a build runs into weeks, adopt full Intent Engineering for production-grade systems.

## Principle

Project scope decides how much of the discipline to adopt, a separate question from how much formality a single change earns. A script, a glue function, or a prototype that gets deleted needs none of it. Once a build runs into weeks and the agent is extending its own earlier work across sessions, write specs. For a system meant to run in production and be maintained, adopt the whole of Intent Engineering: the Foundation and Agent Instructions that load the agent with context, plus the specs and verification that prove it hit the target. Adoption is graduated, not all-or-nothing.

## Why it matters

Adding an instruction hub and specs to a weekend experiment is process theater that buys nothing. Skipping them on a system that lives in production leaves the agent re-deriving decisions every session and drifting where nobody is looking. Naming the threshold lets a team decide whether a project is in scope at all before arguing about how much ceremony each change deserves.

## Violations to detect

- Full Intent Engineering setup imposed on throwaway or single-session work
- A production system run on prompts and conversation history with no durable intent
- No stated threshold for when a project graduates from prompts to specs to the full discipline

## Good practice

Treat "weeks of work" as the line to start writing specs and "meant for production" as the line to adopt the rest. Layer the practices in as the cost of getting it wrong climbs, rather than adopting all of them on day one or none of them ever.

## Sources

- intent-book, *Introduction*, "When a project earns this" section.
- intent-book, *Foreword*, "From Vibe to Pro" section.


