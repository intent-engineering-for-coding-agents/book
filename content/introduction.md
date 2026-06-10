# Introduction

A coding agent works fast. It has been trained and has read more code than you ever will, and it generates a payment service in five minutes that might have taken you a week or two.

The agent has no idea what you decided. No model sees the team's Redis decision from last quarter, the incident living only in someone's head, or the reason the redundant-looking auth flow is load-bearing. The database column about to be added was deprecated by a decision never recorded in an ADR. The architect who made the call left a couple of years ago. From the available context, the agent reasons brilliantly.

Coding agents amplify the developer managing them. Bill Doerrfeld put it bluntly in early 2026: "AI does not create great developers, it amplifies them". A coding agent in the hands of a clueless developer ships "clueless" code faster. An experienced developer with a coding agent ships experienced code faster. The amplifier is neutral, but not what it amplifies.

*Sources: Bill Doerrfeld, "AI doesn't create great developers, it amplifies them" (LeadDev, Jan 20, 2026), the amplifier framing: the agent multiplies whatever the developer brings to it.*

This is the territory of "Intent Engineering", the practice this book teaches: progressively making your coding agent less clueless about your system and intention. Intent Engineering sits within agentic software engineering, the broader discipline of building software with coding agents as active participants.

"Agentic software engineering" now appears in parts of the field, but the boundaries are still unsettled. Intent Engineering is the narrower claim: engineering the intent that an agent turns into code. Not a methodology, not a process, but practices you adopt as you need them. Intent Engineering in turn fits within what some vendors and practitioners now call Developer AI: agent tooling aimed at the development workflow rather than at end users or production systems.

The book is OpenSpec-first on purpose. Intent Engineering is the portable practice; OpenSpec is the concrete workflow used here because the examples need one real lifecycle, one directory shape, one archive rule, and one companion repo readers can inspect. If your team uses Spec-Kit, LeanSpec, a plain `spec.md`, or an internal workflow, translate the OpenSpec terms to your per-change spec artifact. The book will flag those translation points, but it will not pretend to be a neutral survey of every SDD tool.

*Sources: OpenSpec (openspec.dev), the change-folder, and delta-spec framework this book uses end-to-end.*

"Intent engineering" as a phrase is not this book's coinage. It appears in requirements engineering, in vendor agent glossaries, and in communities focused on formalizing intent for agent-powered products, where it covers product intent, UX intent, and agent system design. The qualifier "for Coding Agents" in this book's title marks a narrower application: the intent you give to an agent that writes code.

*Sources: intentengineering.dev (ongoing), prior broader use of the phrase this book's title distinguishes from.*

An agent in Intent Engineering plays two roles:

- Labor is the obvious one. The agent writes the code, drafts the spec, runs the tests, opens the PR.
- The less-discussed role is sparring partner.

Switch a well-briefed agent into **plan mode** (or architect mode), and it pushes back on your architecture and design before the first line of code is written. It surfaces the assumption you treated as settled and asks what you did not think to ask, and names the opportunity you walked past without even knowing.

That is not a lucky prompt or a generous model run. It is what a skilled colleague does in design review. Getting that kind of pushback on demand, every session, is a large part of what this book teaches: a _deliberate_ result of how much the agent knows about your system before you ask it to think, not a roll of the dice. The same agent that generates a payment service in five minutes will, half a minute earlier, point out you have not decided what happens when the payment provider times out, if you gave it enough information to reason with.

*Sources: Gartner, "Developer AI Is Reshaping the Software Development Life Cycle" (2025), the Developer AI category this book situates Intent Engineering within. GLM Team, "GLM-5: Agentic, Reasoning, and Coding" (Z.ai, 2026), the reasoning-capable agent behind the sparring-partner role.*

## What to expect

The book is organized around four topics. Each works at solo scale and couples with the others at team scale. The book flags those coupling points.

The first two give the agent context: the structural knowledge to execute your intent without improvising. The last two are **intent**: they specify the **target** and **prove** that the agent hit it. Context is the substrate and the intent is the point.

**Foundation:** repo structure as the agent's briefing: decisions, design docs, specs, and an agent-facing index. This is context, not intent, and the prerequisite for everything else. The payoff is slow at first: briefing keeps the agent from choosing wrong out of ignorance.

**Agent Instructions:** `AGENTS.md` and the `.agents/` hub. The book uses "agent instructions" to mean both together. Teach the agent your system once, in a place every session reads, and work out which of those rules are worth wiring into a hook in `.agents/hooks/`: a script that fires whether the agent remembers to or not.

**Spec-Driven Development:** specs before code. The spec becomes the durable artifact, with code downstream from intent. Small specs ship. Large specs drift.

**Quality and Verification:** tests as _proof of intent_. A stable ID on every acceptance criterion links it to the test that proves it, a link that survives both files being rewritten. PR taxonomy gives reviewers something to lean on, and the feedback loop closes everything else.

Topics three and four are a pair. Spec-driven development became more visible in 2025-2026 with tooling and discussion, though the practice is still young and unevenly defined, and most of what is visible stops at the aim. A spec points the agent at a target the way a crossbow aims a bolt at something barely visible downrange: deliberate, much better than guessing, and silent on whether the bolt found the mark.

OpenSpec, Spec-Kit, and the rest hand you that aim, then stop. This book walks downrange: the spec _aims_ the agent at a target, and the test package _proves_ the agent hit it. Spec-driven development without verification is only aiming and then hoping for the best.

*Sources: "Spec-Driven Development: From Code to Contract in the Age of AI Coding Assistants" (submitted to AIware 2026, OpenReview, Jan 2026); SolGuruz, "Spec-Driven Development Guide" (2026); IntuitionLabs, "Spec-Driven Development and Spec-Kit" (2026), spec-driven development as a more visible but still young and unevenly defined 2025-2026 practice.*

After the four topics come team workflows, cross-team coordination, and a section on what is still unsettled in the field. None of the topics introduces ceremonies your team does not already have. The artifacts inside existing ceremonies change, but the ceremonies stay.

What you will not find here: a vendor comparison matrix. The agent class is named, not ranked, because those matrices age in months, sometimes faster. Cost economics for seat-licensed tooling gets one paragraph in the appendix, not a chapter.

## Who this is for

You are a senior developer or architect. You already use a capability-class coding agent: one with a reasoning-capable model, real tool use, and enough autonomy to carry out a plan without checking in for every decision. At the time of writing, that class includes tools such as Claude Code, GitHub Copilot, Cursor, Codex, and OpenCode. The exact model roster will keep moving. The practices in this book target the class, not a frozen vendor list.

You have shipped production code under pressure, stayed skeptical of hype, and wanted more control and consistency at scale. You know what a PR is and treat human review as non-negotiable.

Run one agent or run several. This book treats vendor-agnostic as a deliberate choice: `AGENTS.md` and `.agents/` as the shared layout, written once and read by whichever tool shows up next. Wiring a new one in costs something today, a cost later chapters name honestly rather than wave away.

The payoff arrives once switching is inexpensive: running several agents side by side for second opinions, reviews, and benchmarking, instead of betting the whole repo on one vendor's roadmap. The list of viable agents will keep shifting through 2026 and beyond. The practices here should change more slowly, unless the tools absorb these conventions outright and the wiring cost disappears with them.

*Sources: Anthropic Docs, "Claude Code overview" (ongoing); OpenAI Docs, "Codex CLI" (ongoing); GitHub Changelog, "Copilot coding agent now supports AGENTS.md custom instructions" (Aug 28, 2025); Cursor documentation (ongoing); OpenCode Docs (ongoing), the capability-class coding agents named as the target class. Gartner, "Developer AI Is Reshaping the Software Development Life Cycle" (2025), the category-level shift that outlasts any single vendor roster.*

## Intent Engineering is not ADLC

Some readers will arrive having just finished an ADLC explainer and wonder why they need a second framework. They do not. ADLC and Intent Engineering solve different problems.

Agentic Development Lifecycle (ADLC) usually refers to building agents as products. The development side is reasoning loops, evals, hallucination budgets, the post-deployment flywheel where evals act as a control system. The operational side is runtime governance: boundaries, policies, escalation paths that wrap a probabilistic agent in a deterministic cage. The deliverable _is_ the agent.

Intent Engineering is the other side of the table. In this book's framing, the agent is the worker, _not_ the product. Labor is only half of the agent's job here. The agent also sharpens your design and reminds you of what you have not yet considered. The deliverable is the same software your team has always shipped, with an agent that knows your repo conventions doing a growing share of the writing. Your tests stay tests, not evals. CI checks Acceptance Criterion (AC) traceability rather than agent-behavior drift, and the spec describes the change rather than the agent itself.

If you arrived expecting eval suites, agent-architecture patterns, or governance gates for autonomous systems, the ADLC literature covers those. This book stays in the coding-agent layer: how to get an agent that writes code working from a well-informed picture of your system, not a guess. The two disciplines borrow the same vocabulary, but they do not solve the same problem.

*Sources: Outshift (Cisco), "Agentic SDLC: A New Evolution in Software Engineering" (2026); EPAM, "Agentic Development Lifecycle (ADLC) Explained" (2026); Arthur AI, "The Agent Development Lifecycle (ADLC): A Blueprint to Ship Reliable AI" (YouTube, 2025); Jesper Lowgren, "Agentic AI Breaks the SDLC. Now What?" (YouTube, 2026), ADLC as building agents as products with runtime governance, the discipline this book contrasts Intent Engineering against.*

## The companion: Intent Engineering Checker

The companion repo, Intent Engineering Checker (`iec`), demonstrates the core practices: ADRs in MADR format, specs with stable AC IDs, tests that trace back to those IDs, and a working agent-evaluation example that runs a baseline and a drifted version side by side and shows the eval suite catching the difference. The git history records how it got there, phase by phase, for anyone curious about the evolution. See [Companion Repo](./appendices/companion-repo) for the structure and how to browse it.

*Sources: `iec` repository history and tags (github.com/intent-engineering-for-coding-agents/cli), each phase as a git tag the reader can check out as evidence.*

## What Intent Engineering does not do

Intent Engineering does not stop your agent from drifting. It gives you the surface area to detect drift and recover from it. That is a weaker claim than what most agentic-engineering material promises, and it is the one this book defends. The chapter [When Intent Engineering Fails](./foundation/when-intent-engineering-fails) lists the failure modes that survive even good initial setup. It sits inside Foundation, before any of the practices.

Nor does it try to make the agent deterministic. The agent's non-determinism is not a bug to be engineered away. It is the same reasoning that finds the gap in your design, the same reasoning that occasionally makes a call you would not have made yourself. What you can engineer is the ground it reasons from: a well-informed picture of your system instead of a guess, so the calls the agent makes on its own are calls worth trusting.

If that framing sounds reasonable, start with [Foundation](./foundation/index.md).
