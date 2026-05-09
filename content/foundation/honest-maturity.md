# Honest Maturity

Most teams that adopt a new practice go through the same arc: enthusiasm, partial adoption, gradual drift, and eventually a repo full of conventions that exist on paper but are not practiced. The solution is not more process. It is honesty about where you actually are.

## Four levels, used honestly

Every practice in this book can be described at one of four maturity levels:

**Practiced**: the team does this in their actual workflow, even if informally. Not documented, not enforced — just done. A developer writing a spec before asking the agent to implement is practicing spec-driven development whether or not the team has written it up.

**Documented**: the practice is written down. Others can follow it without asking someone who already knows. A written convention in `AGENTS.md` or `.agents/instructions/` that accurately describes how the team works is documented maturity.

**CI-enforced**: the pipeline fails if the practice is violated. `ase check` catches a missing `docs/README.md` before it reaches review. A test tagged with a non-existent AC ID fails the traceability check. CI-enforced practices are the only ones a team can rely on unconditionally.

**Target state**: the team intends to reach this practice but is not there yet. Naming the gap honestly prevents it from being treated as if it were already closed.

## Why the labels matter

A team that claims CI-enforced maturity for something they check manually in code review is not lying — they probably believe it. But when the next developer joins, or when the next agent session begins, the gap between the label and reality causes problems. The new developer trusts the pipeline. The pipeline does not catch what the team thought it did.

Labelling honestly produces two outcomes. First, it tells everyone — including agents — what they can actually rely on. "This convention is CI-enforced" means: trust the pipeline. "This convention is practiced" means: ask the team. Second, it makes the gaps visible, which makes them closeable. A practice labelled "practiced" with a note "target: CI-enforced by Q3" is a backlog item, not a mystery.

## Lineage

The ThoughtWorks Technology Radar uses four adoption rings — Hold, Assess, Trial, Adopt — to signal how ready a technology or practice is for use. The ASE maturity levels rhyme with this framing: they are about practice-readiness within a team, not technology-readiness across the industry.

CMM (Capability Maturity Model) is the obvious ancestor in the literature, but it is the wrong one. CMM conflated process compliance with engineering effectiveness — a team could reach CMM Level 4 while producing software that did not work. The ASE maturity levels are about a single team being honest with itself about a single practice, not about achieving certification.

*Sources: ThoughtWorks Technology Radar Vol 34 (April 2026) — adoption rings as lineage and framing for practice-readiness.*

## Applied to this book

Each chapter in the topics that follow describes a practice. Where relevant, it notes the minimum maturity level at which the practice starts delivering value, and what CI-enforced maturity looks like. Not every practice needs to reach CI-enforced for the book's claims to hold. Some are valuable at practiced maturity and the cost of enforcement is not worth it. The book will say which.

## Honest caveats

Maturity labels help only if they are updated. A label applied once and never revisited becomes part of the cognitive debt it was supposed to prevent. The index-maintenance skill in `.agents/skills/update-index.md` handles doc file indexing; there is no equivalent automation for maturity labels. That maintenance is a human responsibility — or, eventually, an AI-assisted check.
