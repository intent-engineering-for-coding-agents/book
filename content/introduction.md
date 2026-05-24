# Introduction

The agent works fast. It has read more code than you ever will. It generates a payment service in twenty minutes that would have taken you two weeks.

The agent has no idea what you actually decided.

It does not know the team chose against Redis last quarter. It cannot see why the auth flow that looks redundant is actually load-bearing: the incident from 2024 lives only in someone's head. The database column it is about to add was deprecated by a decision that never made it into an ADR. The architect who made that call left in 2023. The agent reasons brilliantly from the context it has. The constraint is the context.

AI amplifies the developer driving it. Bill Doerrfeld put it bluntly in early 2026: *AI doesn't create great developers, it amplifies them.* A clueless developer with AI ships clueless code faster. An experienced developer with AI ships experienced code faster. The amplifier is neutral; what it amplifies is not.

*Sources: Bill Doerrfeld, "AI doesn't create great developers, it amplifies them" (LeadDev, Jan 20, 2026).*

This is the territory of *Agentic Software Engineering (ASE)*, a term in active circulation for the practices that progressively make your AI agent less clueless about your system and intention. Not a methodology or a process. Just practices you adopt as you need them. ASE sits within what's increasingly called *Developer AI*: AI tooling aimed at the development workflow rather than at end users or production systems. The practices here apply wherever that category lands, regardless of which tool you use.

An agent in ASE plays two roles. Labor is the obvious one: it writes the code, drafts the spec, runs the tests, opens the PR. The less-discussed role is sparring partner. Switch it into plan or architect mode and it pushes back on your design before a line is written. It surfaces the assumption you treated as settled. It asks what you haven't asked. The same agent that generates a payment service in twenty minutes can, five minutes earlier, point out that you haven't decided what happens when the payment provider times out.

## What you can expect

The book is organized around four topics. Each works on its own at a solo scale; they couple at a team scale, and the book flags where.

**Foundation**: repo structure as the agent's briefing. ADRs, design docs, specs, and an agent-facing index. Not a determinism harness; the AI's non-determinism is the force you're paying for. Briefing keeps it from choosing wrong out of ignorance. Prerequisite for everything else, with the lowest immediate payoff.

**AI Instructions**: `AGENTS.md` and the `.agents/` hub. Teach the agent your system once, in a place every session reads.

**Spec-Driven Development**: specs before code. The spec is the durable artifact; the code is downstream. Small specs ship. Large specs drift.

**Quality and Verification**: tests as proof of intent. Stable acceptance-criterion identifiers thread spec to test. PR taxonomy gives reviewers something to lean on, and the feedback loop closes everything else.

Topics three and four are a pair. Spec-driven development has hardened into a recognized practice through 2025–2026. This book takes the next step: the spec aims the agent at a target, and the test package proves the agent hit it. Spec-driven without verification is just aim.

*Sources: "Spec-Driven Development: From Code to Contract in the Age of AI Coding Assistants" (submitted to AIware 2026, OpenReview, Jan 2026). SolGuruz, "Spec-Driven Development Guide" (2026). IntuitionLabs, "Spec-Driven Development & Spec-Kit" (2026).*

After the four topics come team workflows, cross-team coordination, and a section on what is still unsettled in the field. None of the topics introduces ceremonies your team does not already have. The artifacts inside existing ceremonies change; the ceremonies stay.

## Who this is for

You are a senior developer or architect. You already use a capability-class CLI agent: one with a thinking model, real tool use, and the autonomy to carry out a plan without checking in for every decision. The tested set: Claude Sonnet/Opus from the 4 generations onward, Codex/GPT from 5.3 onward, OpenCode + Deepseek 4 Pro, Junie CLI. Successor models in the same class should follow the same practices.

You can run one agent or several. ASE works the same way regardless of which agent runs it, though each tool has its own conventions for picking up `AGENTS.md` and `.agents/`. Wiring a specific agent into your repo is the agent's documentation problem, not this book's. The list of viable agents will shift through 2026 and beyond. The practices here should not, unless the agents themselves adopt the conventions and dissolve the need for them.

You have shipped production code under pressure. You're skeptical of hype and want more control and consistency at scale. You know what a PR is. You take it as given that developers are here to stay and humans must stay in the loop.

What you will not find here: a vendor comparison matrix. The tested-class agents are named, not ranked. Those matrices don't age in months and were never useful in the first place. Cost economics for seat-licensed AI gets one paragraph in the appendix and no chapter. And no prescription. This is the report of what teams have made work, with attribution and caveats. Adoption is pull, not push.

## ASE is not ADLC

Some readers will arrive having just finished an ADLC explainer and wonder why they need a second framework. They don't. ADLC and ASE solve different problems.

*Agentic Development Lifecycle (ADLC)* is about building agents *as products*. The development side is reasoning loops, evals, hallucination budgets, the post-deployment flywheel where evals act as a control system. The operational side is runtime governance: boundaries, policies, escalation paths that wrap a probabilistic agent in a deterministic cage. The deliverable is the agent.

ASE is the other side of the table. The agent is the worker, not the product. Labor is only half of it. The agent also sharpens your design and reminds you of what you haven't yet considered. The deliverable is the same software your team has always shipped, with an agent loaded into your repo conventions to write more of it. Your tests stay tests, not evals. CI checks Acceptance Criterion (AC) traceability rather than agent-behavior drift, and the spec describes the change rather than the agent.

If you arrived expecting eval suites, agent-architecture patterns, or governance gates for autonomous systems, the ADLC literature covers those. This book stays in the coding-agent layer: how to make an agent that writes code less clueless about your system. The two disciplines borrow vocabulary. They do not solve the same problem.

*Sources: Outshift (Cisco), "Agentic SDLC: A New Evolution in Software Engineering" (2026). EPAM, "Agentic Development Lifecycle (ADLC) Explained" (2026). Arthur AI, "The Agent Development Lifecycle (ADLC): A Blueprint to Ship Reliable AI" (YouTube, 2025). Jesper Lowgren, "Agentic AI Breaks the SDLC. Now What?" (YouTube, 2026).*

## The companion: `ase-cli`

Every practice in this book is demonstrated in a companion repo, `ase-cli`. ADRs in MADR format, specs with stable AC IDs, tests that actually trace back to those IDs. Each phase is a git tag. Check out `v0.3.0` and see what the practices look like applied to a working tool. The tags are evidence, not decoration.

## How to read

Reading linearly works. The chapters compound; earlier topics make later ones effective. Topic-by-topic also works since each topic has a self-contained introduction.

Landing here from a chapter search? Jump to the start of the topic that chapter belongs to. The four topic introductions are the smallest complete unit.

## What ASE doesn't do

ASE does not stop your agent from drifting. It gives you the surface area to detect drift and recover from it. That is a weaker claim than what most agentic-engineering material promises, and it is the one this book can actually defend. The chapter [When ASE Fails](./foundation/when-ase-fails) lists the failure modes that survive even good initial setup. It sits inside Foundation, before any of the practices.

If that framing sounds reasonable, start with [Foundation](./foundation/index.md).
