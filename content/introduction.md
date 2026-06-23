# Introduction

A coding agent works fast. It has been trained on a lot of code, and it often generates a payment service in minutes that might have taken you days.

The agent has no idea what you decided.

Consider a repo where the Redis decision from the last quarter lives only in someone's head, and the redundant-looking auth flow is load-bearing for a reason nobody wrote down. A database column looks safe to add, but a decision already deprecated it and nobody recorded the decision in an ADR. From the available context, the agent often reasons well.

Coding agents amplify the developer managing them. Bill Doerrfeld put it bluntly in early 2026: "AI doesn't create great developers, it amplifies them". A coding agent in the hands of a clueless developer ships "clueless" code faster. An experienced developer with a coding agent ships experienced code faster. The amplifier is neutral, but not what it amplifies.

*Sources: Bill Doerrfeld, "AI doesn't create great developers, it amplifies them" (LeadDev, Jan 20, 2026), the amplifier framing: the agent multiplies whatever the developer brings to it.*

This is the territory of Intent Engineering, the practice this book teaches: progressively making your coding agent less clueless about your system and intention. Intent Engineering sits within agentic software engineering, the broader discipline of building software with coding agents as active participants.

The phrase "agentic software engineering" appears in parts of the field, but the boundaries are still unsettled. Intent Engineering is the narrower claim: engineering the intent that an agent turns into code.

Intent, as this book uses the word, is what you want the agent to build or decide, stated with enough precision that it acts on your purpose rather than its own inference. It takes two forms: per-change specs that say what to do right now, and the permanent decisions and conventions that constrain how anything is done. These are practices you adopt as you need them, not a methodology you install.

The book is OpenSpec-first on purpose. Intent Engineering is the portable practice. OpenSpec is the concrete workflow used here because the examples need one real lifecycle, one directory shape, one archive rule, and one companion repo readers inspect. If your team uses Spec-Kit, LeanSpec, a plain `spec.md`, or an internal workflow, translate the OpenSpec terms to your per-change spec artifact. The book will flag those translation points, but it will not pretend to be a neutral survey of every SDD tool.

*Sources: OpenSpec (openspec.dev), the change-folder, and delta-spec framework this book uses end-to-end.*

"Intent engineering" as a phrase is not this book's coinage. You will see it in communities focused on formalizing intent for agent-powered products, where it covers product intent, UX intent, and agent system design. The qualifier "for Coding Agents" in this book's title marks a narrower application: the intent you give to an agent that writes code.

*Sources: intentengineering.dev (ongoing), prior broader use of the phrase this book's title distinguishes from.*

An agent in Intent Engineering plays two roles:

- Labor is the obvious one. The agent writes the code, drafts the spec, runs the tests, opens the PR.
- The less-discussed role is sparring partner.

Ask a well-briefed agent to plan first, and it pushes back on your architecture and design before the first line of code is written. It surfaces the assumption you treated as settled, asks what you did not think to ask, and names the opportunity you walked past without even knowing.

That is not a lucky prompt or a generous model run. It is what a skilled colleague does in design review. Getting that kind of pushback on demand, every session, is a large part of what this book teaches. The result depends on how much the agent knows about your system before you ask it to think, not random chance. The same agent that generates a payment service in minutes will, a moment earlier, point out you have not decided what happens when the payment provider times out, if you gave it enough information to reason with.

## What to expect

The book is organized around four topics. Each works at a solo scale and couples with the others at a team scale. The book flags those coupling points.

The first two give the agent context: the structural knowledge to execute your intent without improvising. The last two are **intent**: they specify the target and prove that the agent hit it. Context is the substrate and the intent is the point.

**Foundation:** repo structure as the agent's briefing: decisions, design docs, specs, and an agent-facing index. This is context, not intent, and the prerequisite for everything else. The payoff is slow at first: briefing keeps the agent from choosing wrong out of ignorance.

**Agent Instructions:** `AGENTS.md` and the `.agents/` hub. The book uses "agent instructions" to mean both together. Teach the agent your system once, in a place every session reads, and work out which of those rules are worth wiring into a hook in `.agents/hooks/`: a script that fires whether the agent remembers to or not.

**Spec-Driven Development:** specs before code. Documentation is the durable source of truth, the spec pins the behavior of a single change, and the code is downstream of both. Small specs ship. Large specs drift.

**Quality and Verification:** tests as _proof of intent_. A stable ID on every acceptance criterion links it to the test that proves it, a link that survives both files being rewritten. PR taxonomy gives reviewers something to lean on, and the feedback loop closes everything else.

Topics three and four are a pair. Spec-driven development became more visible in 2025-2026 with tooling and discussion, though the practice is still young and unevenly defined, and most of what is visible stops at the aim. A spec narrows the solution space and pins the behavior of a change. The spec does not verify that the implementation hit the target.

OpenSpec, Spec-Kit, and the rest hand you the aim, then stop. This book adds the second half: the spec aims the agent at a target, and the test package proves the agent hit it. Spec-driven development without verification is aiming and then hoping for the best.

*Sources: "Spec-Driven Development: From Code to Contract in the Age of AI Coding Assistants" (submitted to AIware 2026, OpenReview, Jan 2026); SolGuruz, "Spec-Driven Development Guide" (2026); IntuitionLabs, "Spec-Driven Development and Spec-Kit" (2026), spec-driven development as a more visible but still young and unevenly defined 2025-2026 practice.*

After the four topics come team workflows, cross-team coordination, and a section on what is still unsettled in the field. None of the topics introduces ceremonies your team does not already have. The artifacts inside existing ceremonies change, but the ceremonies stay. If "specs before code" already read as waterfall, [the waterfall objection](./spec-driven/why-specs#the-waterfall-objection) answers it where the practice is introduced: the spec here is one change-sized pre-flight check, the agile loop runs one PR at a time, not a big design up front.

What you will not find here:

- A vendor comparison matrix. The agent class is named, not ranked, because those matrices age in months, sometimes faster.
- A chapter on seat-license economics. Cost economics for seat-licensed tooling gets one paragraph in the appendix, not a chapter.

## Who this is for

You are a senior developer or architect. You already use a capability-class coding agent: one with a reasoning-capable model, real tool use, and enough autonomy to carry out a plan without checking in for every decision. The exact model roster will keep moving. The practices in this book target the class, not a frozen vendor list.

You have shipped production code under pressure, stayed skeptical of hype, and wanted more control and consistency at scale. You know what a PR is and treat human review as non-negotiable.

Run one agent or run several. This book treats vendor-agnostic as a deliberate choice: `AGENTS.md` and `.agents/` as the shared layout, written once and read by whichever tool shows up next. Wiring a new one in costs something today, a cost later chapters name honestly rather than wave away.

The payoff arrives once switching is inexpensive: running several agents side by side for second opinions, reviews, and benchmarking, instead of betting the whole repo on one vendor's roadmap. The list of viable agents will keep shifting through 2026 and beyond. The practices here should change more slowly, unless the tools absorb these conventions outright and the wiring cost disappears with them.

*Sources: GitHub Changelog, "Copilot coding agent now supports AGENTS.md custom instructions" (Aug 28, 2025), native support for the AGENTS.md convention as a current vendor example.*

## When a project earns this

Most of what you build does not need any of this:

- A script you run once.
- A glue function.
- A prototype that exists to answer a question and then gets deleted.

Reach for the chat window, describe what you want, take the code. Adding specs and an instruction hub to a weekend experiment is the theater this book warns against.

The discipline earns its keep when the work outlives the session that started it. The rule of thumb here: once a build runs into weeks, the agent is extending its own earlier work across many sessions, and a spec stops being ceremony. The spec is what the agent loads before it writes the next increment, so it builds on the last decision instead of guessing at it. That is the line to start writing specs.

For a system meant to run in production and be maintained by someone after you, adopt the rest. Foundation and Agent Instructions brief the agent on the system it is changing. Specs and verification point it at the target and prove it arrived. None of this is all-or-nothing. You take on more of the discipline as the cost of getting it wrong climbs, the same dial you reach for when deciding how much process a single change deserves on [the spectrum of formality](./spec-driven/the-spectrum). That question is per change. This one is per project: whether to bring the discipline to bear at all.

## Intent Engineering fits your SDLC

In 2025-2026, a common ADLC argument said the traditional Software Development Lifecycle (SDLC) no longer fits agentic systems. The proposed fix was a new lifecycle for agents. Intent Engineering does not replace your SDLC. The practice runs inside the lifecycle your team already has.

One common proposal is the Agentic Development Lifecycle (ADLC), aimed at building agents as products. The development side covers reasoning loops, evals, hallucination budgets, and the post-deployment flywheel where evals act as a control system. The operational side is runtime governance: boundaries, policies, and escalation paths around a probabilistic agent. The deliverable _is_ the agent.

For autonomous-agent products, ADLC earns its place.

This book works the other side of the table. Here the agent is the worker, not the product. Labor is only half the job. The agent also sharpens your design and names what you have not considered.

The deliverable is the same software your team has always shipped, with an agent informed by your repo conventions doing a growing share of the writing. Your tests stay tests, not evals. Continuous Integration (CI) keeps checking whether every Acceptance Criterion (AC) traces to a passing test, the same gate CI ran before an agent touched the repo. The spec describes the change, never the agent behind the patch.

So there is no new lifecycle to adopt. Planning, implementation, review, CI, maintenance: the phases stay, and the artifacts moving through them change. Write down where the spec lands, where the agent picks up, and where human review gates the merge. [Intent Engineering and the SDLC](./foundation/intent-engineering-and-the-sdlc) maps that placement phase by phase.

This book treats Intent Engineering and ADLC as disciplines with overlapping vocabulary and different jobs. One governs how you build agents as products. The other governs how a coding agent works inside the software lifecycle you already run.

*Sources: Outshift (Cisco), "Agentic SDLC: A New Evolution in Software Engineering" (2026), Agentic SDLC as a current lifecycle proposal for agent-driven software delivery; EPAM, "Agentic Development Lifecycle (ADLC): A New Model for AI Systems Beyond SDLC" (2026), ADLC for building and operating agents in production; Arthur AI, "The Agent Development Lifecycle (ADLC): A Blueprint to Ship Reliable AI" (YouTube, 2025), ADLC as a lifecycle for reliable AI agents; Jesper Lowgren, "Agentic AI Breaks the SDLC. Now What?" (YouTube, 2026), the stronger breaks-the-SDLC framing this section time-bounds and narrows.*

## The companion: Intent Engineering Checker

The companion repo, Intent Engineering Checker (`iec`), demonstrates the core practices: ADRs in MADR format, specs with stable AC IDs, tests that trace back to those IDs, and a working agent-evaluation example that runs a baseline and a drifted version side by side and shows the eval suite catching the difference. The git history records how it got there, phase by phase, for anyone curious about the evolution. See [Companion Repo](./appendices/companion-repo) for the structure and how to browse it.

*Sources: `iec` repository history and tags (github.com/intent-engineering-for-coding-agents/cli), each phase as a git tag the reader checks out as evidence.*

## What Intent Engineering does not do

Intent Engineering does not stop your agent from drifting. It gives you the surface area to detect drift and recover from it. That is a weaker claim than what most agentic-engineering material promises, and it is the one this book defends. The chapter [When Intent Engineering Fails](./foundation/when-intent-engineering-fails) lists the failure modes that survive even good initial setup. It sits inside Foundation, before any of the practices.

Nor does it try to make the agent deterministic. The agent's non-determinism is not a bug to be engineered away. It is the same reasoning that finds the gap in your design, the same reasoning that occasionally makes a call you would not have made yourself. What you engineer is the ground it reasons from: a well-informed picture of your system instead of a guess, so the calls the agent makes on its own are calls worth trusting.

If that framing sounds reasonable, start with [Foundation](./foundation/index.md).
