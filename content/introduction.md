# Introduction

The agent works fast. It has read more code than you ever will. It generates a payments service in twenty minutes that would have taken you two weeks.

The agent has no idea what you actually decided.

It does not know the team chose against Redis last quarter. It does not know the auth flow that looks redundant exists because of an incident in 2024. It does not know the database column it is about to add was already deprecated in an Architectural Decision Record (ADR) that was never written, by an architect who left in 2023. The agent reasons brilliantly from the context it has. The constraint is the context.

This is the territory of *Agentic Software Engineering (ASE)*, a term in active circulation for the practices that progressively make your AI agent less clueless about your system and intention. Not a methodology. Not a process. Practices, adopted as you need them.

## What you can expect

The book is organised around four topics. Each can be adopted on its own at solo scale; they couple at team scale, and the book says where.

**Foundation**: repo structure as the agent's briefing. ADRs, design docs, specs, and the agent-facing index. The prerequisite for everything else, and the topic with the lowest immediate payoff.

**AI Instructions**: `AGENTS.md` and the `.agents/` hub. Teach the agent your system once, in a place every session reads.

**Spec-Driven Development**: specs before code. Why the spec is the durable artefact and the code is downstream. Why small specs ship and large specs drift.

**Quality and Verification**: tests as proof of intent. Stable acceptance-criterion identifiers that link spec to test. PR taxonomy. The feedback loop that closes everything else.

After the four topics, the book covers team workflows, cross-team coordination, and an honest section on what is still unsettled in the field. None of the topics introduces ceremonies your team does not already have. The artefacts inside existing ceremonies change; the ceremonies stay.

## Who this is for

You are a senior developer or architect. You already use a capability-class CLI agent, one that combines a thinking model, real tool use, and a plan or architect mode. The book has been written against the tested set: Claude Sonnet/Opus 4+, Codex/GPT 5.4+, OpenCode + Deepseek 4 Pro, Junie CLI. Other agents in the same class should follow the same practices.

You are not a beginner who needs an explanation of what a PR is. You are not someone using IDE auto-complete and asking whether AI will replace developers. You are skeptical of hype, you have shipped production code under pressure, and you want more control and consistency at scale.

## Who this is not for

This is not an operations book. DevOps and SRE concerns belong in their own books: Kubernetes topologies, observability stacks, deployment pipelines. Cost economics for seat-licensed AI gets one paragraph in the appendix and no chapter.

This is not a tool review. The tested-class agents are named; the book does not rank them. Vendor comparison matrices age in months and were never useful in the first place.

This is not prescription. It is the report of what teams have made work, with attribution and honest caveats. Adoption is pull, not push.

## The companion: `ase-cli`

Every practice in this book is demonstrated in a companion repo, `ase-cli`. Real ADRs in MADR format. Real specs with stable AC IDs. Real test traceability. Each phase is a git tag. Checkout `v0.3.0` and see what the practices look like applied to a working tool. The book references the tags as evidence, not as decoration.

## How to read

Linearly works. The chapters compound. Foundation makes AI Instructions effective, AI Instructions make Spec-Driven workable, Spec-Driven feeds Quality. Topic-by-topic also works: each topic has a self-contained introduction.

If you are landing here from a search on a chapter that interested you, jump to the start of the topic that chapter belongs to. The four topic introductions are the smallest complete unit of the book.

## One more honest note

ASE does not stop your agent from drifting. It gives you the surface area to detect drift and recover from it. That is a weaker claim than what most agentic-engineering material promises, and it is the one this book can actually defend. The chapter [When ASE Fails](./foundation/when-ase-fails) lists the failure modes that survive even good initial setup. It sits inside Foundation deliberately, before any of the practices, so the book does not read as sales material for itself.

If that framing sounds reasonable, start with [Foundation](./foundation/).
