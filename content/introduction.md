# Introduction

The agent works fast. It has read more code than you ever will, and it generates a payment service in twenty minutes that would have taken you two weeks.

The agent has no idea what you decided.

The agent does not know the team chose against Redis last quarter. The agent cannot see why the auth flow, which looks redundant, is load-bearing: the incident from 2024 lives only in someone's head. The database column the agent is about to add was deprecated by a decision never recorded in an ADR. The architect who made that call left in 2023. The agent reasons brilliantly from the context it has. The constraint is the context.

AI amplifies the developer driving it. Bill Doerrfeld put it bluntly in early 2026: "AI doesn't create great developers, it amplifies them." A clueless developer with AI ships clueless code faster. An experienced developer with AI ships experienced code faster. The amplifier is neutral. What it amplifies is not.

Sources: Bill Doerrfeld, "AI doesn't create great developers, it amplifies them" (LeadDev, Jan 20, 2026), the amplifier framing: AI multiplies whatever the developer brings to it.

This is the territory of Intent Engineering, the practice this book teaches: progressively making your AI coding agent less clueless about your system and intention. Intent Engineering sits within agentic software engineering, the broader discipline of building software with AI agents as active participants. "Agentic software engineering" now appears in parts of the field, but the boundaries are still unsettled. Intent Engineering is the narrower claim: engineering the intent that an agent turns into code. Not a methodology or a process. Practices you adopt as you need them. That practice in turn fits within what some vendors and practitioners now call Developer AI: AI tooling aimed at the development workflow rather than at end users or production systems. The practices here apply wherever that category lands, regardless of which tool you use.

"Intent engineering" as a phrase is not this book's coinage. It appears in requirements engineering, vendor AI glossaries, and in communities focused on formalizing intent for AI-powered products, where it covers product intent, UX intent, and AI system design. The qualifier "for Coding Agents" in this book's title marks a narrower application: the intent you give to an agent that writes code.

Sources: intentengineering.dev (ongoing), prior broader use of the phrase this book's title distinguishes from.

An agent in Intent Engineering plays two roles. Labor is the obvious one: the agent writes the code, drafts the spec, runs the tests, opens the PR. The less-discussed role is sparring partner. Switch the agent into plan or architect mode and it pushes back on your design before a line is written. The agent surfaces the assumption you treated as settled. The agent asks what you haven't asked. The same agent that generates a payment service in twenty minutes will, five minutes earlier, point out you haven't decided what happens when the payment provider times out.

Sources: Gartner, "Developer AI Is Reshaping the Software Development Life Cycle" (2025), the Developer AI category this book situates Intent Engineering within. GLM Team, "GLM-5: Agentic, Reasoning, and Coding" (Z.ai, 2026), the reasoning-capable agent behind the sparring-partner role.

## What to expect

The book is organized around four topics. Each works on its own at a solo scale. They couple at a team scale, and the book flags where.

The first two give the agent context: the structural knowledge to execute your intent without improvising. The last two are intent: they specify the target and prove the agent hit it. Context is the substrate. Intent is the point.

Foundation: repo structure as the agent's briefing. ADRs, design docs, specs, and an agent-facing index. Not a determinism harness. The AI's non-determinism is the force you're paying for. Briefing keeps the agent from choosing wrong out of ignorance. Context, not intent: the prerequisite for everything else, with the lowest immediate payoff.

AI Instructions: `AGENTS.md` and the `.agents/` hub. Teach the agent your system once, in a place every session reads.

Spec-Driven Development: specs before code. The spec is the durable artifact. The code is downstream. Small specs ship. Large specs drift.

Quality and Verification: tests as proof of intent. Stable acceptance-criterion identifiers thread spec to test. PR taxonomy gives reviewers something to lean on, and the feedback loop closes everything else.

Topics three and four are a pair. Spec-driven development has become more visible in 2025-2026 tooling and discussion, though the practice is still young and unevenly defined. This book takes the next step: the spec aims the agent at a target, and the test package proves the agent hit it. Spec-driven without verification is only aim.

Sources: "Spec-Driven Development: From Code to Contract in the Age of AI Coding Assistants" (submitted to AIware 2026, OpenReview, Jan 2026); SolGuruz, "Spec-Driven Development Guide" (2026); IntuitionLabs, "Spec-Driven Development and Spec-Kit" (2026), spec-driven development as a more visible but still young and unevenly defined 2025-2026 practice.

After the four topics come team workflows, cross-team coordination, and a section on what is still unsettled in the field. None of the topics introduces ceremonies your team does not already have. The artifacts inside existing ceremonies change. The ceremonies stay.

## Who this is for

You are a senior developer or architect. You already use a capability-class CLI agent: one with a reasoning-capable model, real tool use, and enough autonomy to carry out a plan without checking in for every decision. At the time of writing, that class includes tools such as Claude Code, Codex CLI, OpenCode, and Junie CLI. The exact model roster will keep moving. The practices in this book target the class, not a frozen vendor list.

Run one agent or run several. Intent Engineering works broadly the same way regardless of which agent runs it, though each tool has its own conventions for picking up `AGENTS.md` and `.agents/`. Wiring a specific agent into your repo is the agent's documentation problem, not this book's. The list of viable agents will shift through 2026 and beyond. The practices here should change more slowly, unless the tools themselves absorb these conventions and make some of the repo scaffolding unnecessary.

Sources: Anthropic Docs, "Claude Code overview" (ongoing); OpenAI Docs, "Codex CLI" (ongoing); OpenCode Docs (ongoing); Junie documentation in this repo, the capability-class CLI agents named as the target class. Gartner, "Developer AI Is Reshaping the Software Development Life Cycle" (2025), the category-level shift that outlasts any single vendor roster.

You have shipped production code under pressure. You're skeptical of hype and want more control and consistency at scale. You know what a PR is. You take it as given that developers are here to stay and humans must stay in the loop.

What you will not find here: a vendor comparison matrix. The agent class is named, not ranked. Those matrices age in months, sometimes faster. Cost economics for seat-licensed AI gets one paragraph in the appendix and no chapter. And no prescription. This book is a report on what practitioners and toolmakers have described as workable so far, with attribution and caveats. Adoption is pull, not push.

## Intent Engineering is not ADLC

Some readers will arrive having just finished an ADLC explainer and wonder why they need a second framework. They do not. ADLC and Intent Engineering solve different problems.

Agentic Development Lifecycle (ADLC) usually refers to building agents as products. The development side is reasoning loops, evals, hallucination budgets, the post-deployment flywheel where evals act as a control system. The operational side is runtime governance: boundaries, policies, escalation paths that wrap a probabilistic agent in a deterministic cage. The deliverable is the agent.

Intent Engineering is the other side of the table. In this book's framing, the agent is the worker, not the product. Labor is only half of it. The agent also sharpens your design and reminds you of what you haven't yet considered. The deliverable is the same software your team has always shipped, with an agent loaded into your repo conventions to write more of it. Your tests stay tests, not evals. CI checks Acceptance Criterion (AC) traceability rather than agent-behavior drift, and the spec describes the change rather than the agent.

If you arrived expecting eval suites, agent-architecture patterns, or governance gates for autonomous systems, the ADLC literature covers those. This book stays in the coding-agent layer: how to make an agent that writes code less clueless about your system. The two disciplines borrow vocabulary. They do not solve the same problem.

Sources: Outshift (Cisco), "Agentic SDLC: A New Evolution in Software Engineering" (2026); EPAM, "Agentic Development Lifecycle (ADLC) Explained" (2026); Arthur AI, "The Agent Development Lifecycle (ADLC): A Blueprint to Ship Reliable AI" (YouTube, 2025); Jesper Lowgren, "Agentic AI Breaks the SDLC. Now What?" (YouTube, 2026), ADLC as building agents as products with runtime governance, the discipline this book contrasts Intent Engineering against.

## The companion: `ase-cli`

Every practice in this book is demonstrated in a companion repo, `ase-cli`. ADRs in MADR format, specs with stable AC IDs, tests that trace back to those IDs. Each phase is a git tag. Check out `v0.3.0` and see what the practices look like applied to a working tool. The tags are evidence, not decoration.

Sources: `ase-cli` repository history and tags in this project family, each phase as a git tag the reader can check out as evidence.

## How to read

Reading linearly works. The chapters compound; earlier topics make later ones effective. Topic-by-topic also works since each topic has a self-contained introduction.

Landing here from a chapter search? Jump to the start of the topic the chapter belongs to. The four topic introductions are the smallest complete unit.

## What Intent Engineering doesn't do

Intent Engineering does not stop your agent from drifting. It gives you the surface area to detect drift and recover from it. That is a weaker claim than what most agentic-engineering material promises, and it is the one this book defends. The chapter [When Intent Engineering Fails](./foundation/when-intent-engineering-fails) lists the failure modes that survive even good initial setup. It sits inside Foundation, before any of the practices.

If that framing sounds reasonable, start with [Foundation](./foundation/index.md).
