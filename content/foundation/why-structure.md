# Why Structure Matters

Without structure in your repo, every agent session starts from zero. The agent is capable — it is not clueless because the model is weak. It is clueless because you have not given it anything to work from. That cluelessness compounds.

## The problem: compounding drift

Each agent session produces code shaped by whatever context it can infer from the files it reads. If your repo has no architecture overview, no recorded decisions, no explicit conventions, the agent fills the gap with plausible-sounding guesses. Those guesses produce code that works locally but violates constraints the team holds implicitly — constraints that were never written down.

The next session builds on that code. The agent has no reason to flag the violation; it has no record of the constraint. It extends the violation. By session five, fixing the drift costs ten times what writing the ADR would have.

This is what the ThoughtWorks Technology Radar Vol 34 called *cognitive debt* — the AI-era analogue to technical debt, but harder to detect because no linter flags an undocumented decision. Code has static analysis. Context does not.

*Sources: ThoughtWorks Technology Radar Vol 34 (April 2026) — cognitive debt framing.*

## Structure as context

What you put in your repo determines what the agent can produce. A repo with `docs/README.md` describing the architecture, `docs/decisions/` recording why key choices were made, and `AGENTS.md` pointing the agent to those files — that repo briefs the agent before it writes a line. The agent is still clueless about things not in those files, but it is no longer inventing the things that are.

The before/after is concrete:

**Before**: a developer asks the agent to add a caching layer. The agent picks Redis, because Redis is what caching examples use. The repo actually decided against Redis six months ago — an ADR that was never written. The team discovers the violation three PRs later.

**After**: the ADR exists in `docs/decisions/`. `AGENTS.md` points the agent there. The agent reads it. It asks about caching constraints before proposing Redis. The decision is preserved and enforced without human intervention.

This is not about policing the agent. It is about giving it enough context to make good guesses on its own.

## The prerequisite for everything else

The remaining topics in this book assume Foundation is in place. AI Instructions cannot do their job if there is no `docs/` directory for instructions to point into. Spec-driven development produces specs with nowhere to live. Quality checks validate conventions that have not been written.

Foundation is not the most interesting topic. It is the one that makes the others work.

## Honest caveats

Structure has a maintenance cost. An `AGENTS.md` that is written and never updated becomes the first entry in [When ASE Fails](./when-ase-fails). A `docs/decisions/` directory with six ADRs from the first month and nothing since is a signal that the practice was adopted and then abandoned.

The goal is not a perfect repo from day one. It is a repo where structure is maintained as the system changes. The chapters that follow describe what to maintain and why.
