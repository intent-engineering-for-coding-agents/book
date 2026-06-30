# Introduction

The mindset is not enough by itself. A source-controlled workspace still needs a way to tell the agent what to load, what to build, and what proof the result must pass.

A coding agent works fast. It has been trained on a lot of code. It can generate a payment service in minutes, and it can generate the wrong one just as fast.

The agent has no idea what you decided.

Consider a repo where the Redis decision from the last quarter lives only in one developer's head, and the redundant-looking auth flow is load-bearing for a reason nobody wrote down. A database column looks safe to add, but an old ADR would have said "do not use this field" if anyone had written one. The agent sees the schema, the imports, and the passing tests. It does not see the missing decision, so it extends an interface the team had already decided to retire.

Coding agents amplify the developer managing them. Bill Doerrfeld put it bluntly in early 2026: "AI doesn't create great developers, it amplifies them". An under-informed developer gets incorrect code faster. An experienced developer gets correct code faster. The amplifier is neutral. What it amplifies is not.

*Sources: Bill Doerrfeld, "AI doesn't create great developers, it amplifies them" (LeadDev, January 20, 2026), the amplifier framing: the agent multiplies whatever the developer brings to it.*

This book calls that work Intent Engineering: giving the agent enough of your system and intent that it stops guessing at both. It is one part of building software with coding agents in the loop.

The phrase "agentic software engineering" appears in parts of the field, but the boundaries are still unsettled. Intent Engineering is the narrower claim: engineering the intent that an agent turns into code.

This book is not mainly about AI. It is about who authors what. The machine writes more of the implementation. You spend more time defining the change, setting constraints, reviewing tradeoffs, and proving the result.

Intent, as this book uses the word, is what you want the agent to build or decide, stated with enough precision that it acts on your purpose instead of its own inference. It takes two forms: per-change specs for the next change, and permanent decisions and conventions that constrain how anything is done. You adopt them as you need them. They are not a methodology you install.

The book is OpenSpec-first on purpose. Intent Engineering is the portable practice. OpenSpec is the concrete workflow used here because the examples need one lifecycle, one directory shape, one archive rule, and one companion repo readers can inspect. This is not a private spec method in disguise. If your team uses a plain `spec.md`, a local spec format, LeanSpec, Spec-Kit, or an internal workflow, translate the OpenSpec terms to your own spec artifact. The book will flag those translation points, but it will not pretend to be a neutral survey of every SDD tool.

*Sources: OpenSpec (openspec.dev), the change-folder, and delta-spec framework this book uses end-to-end.*

"Intent engineering" as a phrase is not this book's coinage. `intentengineering.dev` uses it in a broader sense, covering product intent, UX intent, and agent system design. Related vocabulary is circulating too. "Intent-Driven Development" appears in 2025-2026 essays and concept sites, usually for workflows where intent sits above implementation and guides specs, tasks, or agent execution. The qualifier "for Coding Agents" in this book's title marks a narrower application: the intent you give to an agent that writes code.

This book adopts the term because the surrounding vocabulary is moving that way. The framing here is a practical synthesis, not a field standard. It sits near current Intent-Driven Development writing, but uses the narrower term Intent Engineering for Coding Agents for one combination: durable intent, spec-first change control, and executable proof for agent-generated code.

*Sources: intentengineering.dev (ongoing), prior broader use of "intent engineering" this book's title distinguishes from. Don Johnson, "Intent-Driven Development: Define the System Before You Write the Code" (DEV, December 4, 2025), intent-driven development as specification-first software design. Vishal Mysore, "What is Intent Driven Development?" (Medium, March 9, 2026), intent-driven development as humans defining an outcome and constraints while agents handle execution. intent-driven-development.com (ongoing), IDD presented as an intent-above-spec framing for AI coding workflows.*

An agent in Intent Engineering plays two roles:

- Labor is the obvious one. The agent writes the code, drafts the spec, runs the tests, opens the PR.
- The less-discussed role is sparring partner.

Ask a well-loaded agent to plan first, and it pushes back on your architecture and design before the first line of code is written. It surfaces the assumption you treated as settled, asks what you missed, and names the opportunity you skipped.

That is not a lucky prompt or a generous model run. It is what a skilled colleague does in design review. Getting that kind of pushback on demand is a large part of what this book teaches. The result depends on how much the agent knows about your system before you ask it to think. The same agent that generates a payment service in minutes will, a moment earlier, point out you have not decided what happens when the payment provider times out, if you gave it enough information to reason with.

None of this requires AI in principle. A disciplined team could write the docs, specs, constraints, and proof package by hand. Coding agents change the economics. More implementation work moves to the machine. More design burden stays with you.

## What to expect

The book is organized around four topics. Each works at a solo scale and couples with the others at a team scale. The book flags those coupling points.

The first two give the agent context: the structural knowledge to execute your intent without improvising. The last two are **intent**: they specify the target and prove that the agent hit it.

Foundation: repo structure as the agent's context: decisions, design docs, specs, and an agent-facing index. This is context, not intent, and the prerequisite for everything else. The payoff is slow at first: the agent reads the recorded decision instead of inventing a solution from code patterns alone.

Agent Instructions: `AGENTS.md` and the `.agents/` hub. The book uses "agent instructions" to mean both together. Teach the agent your system once, in a place every session reads, and work out which of those rules are worth wiring into a hook in `.agents/hooks/`: a script that fires whether the agent remembers to or not.

Spec-Driven Development: specs before code. Documentation is the durable source of truth, the spec pins the behavior of a single change, and the code is downstream of both. Small specs ship. Large specs drift.

Quality and Verification: tests as _proof of intent_. A stable ID on every acceptance criterion links it to the test that proves it, a link that remains valid when both files are rewritten. PR taxonomy gives reviewers something to lean on, and the feedback loop closes everything else.

Topics three and four are a pair. Spec-driven development showed up more often in 2025-2026 tooling and discussion, though the practice is still young and unevenly defined, and most examples stop at the spec. A spec narrows the solution space and pins the behavior of a change. It does not tell you whether the generated code landed there.

In the SDD material reviewed for this book, the emphasis is heavier on aiming the change than on proving the result. This book adds the second half: the spec aims the agent at a target, and the test package proves the agent hit it. Spec-driven development without verification is aiming and then hoping for the best.

*Sources: "Spec-Driven Development: From Code to Contract in the Age of AI Coding Assistants" (submitted to AIware 2026, OpenReview, January 2026); SolGuruz, "Spec-Driven Development Guide" (2026); IntuitionLabs, "Spec-Driven Development and Spec-Kit" (2026), spec-driven development as a more visible but still young and unevenly defined 2025-2026 practice.*

After the four topics come team workflows, cross-team coordination, and a section on what is still unsettled in the field. This book does not add a second project-management layer. It changes what moves through the existing one: tickets link to change folders, PRs carry spec deltas, ADRs settle cross-team decisions, and CI checks proof instead of only code style. If "specs before code" already sounds like waterfall, [the waterfall objection](./spec-driven/why-specs#the-waterfall-objection) answers it where the practice is introduced: the spec here is one change-sized pre-flight check, and the loop still runs one PR at a time.

What you will not find here:

- A vendor comparison matrix. The agent class is named, not ranked, because those matrices age in months, sometimes faster.
- A chapter on seat-license economics. Cost economics for seat-licensed tooling gets one paragraph in the appendix, not a chapter.

## Who this is for

You are a senior developer or architect. You already use a capability-class coding agent: one with a reasoning-capable model, real tool use, and enough autonomy to carry out a plan without checking in for every decision. The exact model roster will keep moving. The practices in this book target the class, not a frozen vendor list.

You have shipped production code under pressure, stayed skeptical of hype, and wanted more control and consistency at scale. You know what a PR is and treat human review as non-negotiable.

Run one agent or run several. This book treats vendor-agnostic as a deliberate choice: `AGENTS.md` and `.agents/` as the shared layout, written once and read by whichever tool shows up next. Wiring a new one costs something today, a cost later chapters name honestly rather than wave away.

The payoff arrives when adding another tool means one pointer file and a few load clauses. Then you run one agent for the patch, another for review, and a third against the same golden task, instead of betting the repo on one vendor's roadmap. The list of viable agents will keep shifting through 2026 and beyond. The practices here should change more slowly, unless the tools absorb these conventions outright and the wiring cost disappears with them.

*Sources: GitHub Changelog, "Copilot coding agent now supports AGENTS.md custom instructions" (August 28, 2025), native support for the AGENTS.md convention as a current vendor example.*

## When a project earns this

Most of what you build does not need any of this: a script you run once, a glue function, a prototype you delete once it answers the question.

Reach for the chat window, describe what you want, take the code. Adding specs and an instruction hub to a weekend experiment is the theater this book warns against.

The discipline starts paying for itself when the work outlives the session that started it. A simple rule of thumb: once a build runs into weeks, the agent is extending its own earlier patches across many sessions, and a spec stops being ceremony. The spec is the file the next session loads before it edits the code again, so the agent extends an approved target instead of re-deriving one from the current implementation. That is the point where the repo needs specs.

For a service meant to run in production and be maintained by the next developer on call, adopt the rest. Foundation and Agent Instructions load the repo facts the agent does not know. Specs and verification pin one change to one target and show whether the patch hit it. You do not adopt every practice at once. As the cost of getting a change wrong rises, you turn up the discipline, the same way you already vary how much process one change deserves on [the spectrum of formality](./spec-driven/the-spectrum). That question is per change. This one is per project.

## Intent Engineering fits your SDLC

The acronym collision is real. In 2025-2026, ADLC and agentic SDLC labels showed up around two different jobs: building agents as products and using coding agents inside ordinary software delivery. This book uses the narrower boundary.

When the deliverable is an agent, the control surface belongs to agent engineering. OpenAI's Agents SDK documentation names agents, tools, handoffs, guardrails, human review, state, and observability as the machinery around a growing agent workflow. Anthropic's agent guidance puts the same pressure in plainer terms: keep the design simple, compose focused tools, and evaluate the system.

That is real work. It is also a different product.

This book works the other side of the table. Here the agent is the worker, not the product. Labor is only half the job. The agent also sharpens your design and names what you have not considered.

The deliverable is the same software your team has always shipped, with an agent informed by your repo conventions doing a growing share of the writing. Your tests remain tests, not a separate eval harness. In this book's workflow, Continuous Integration (CI) checks whether every Acceptance Criterion (AC) traces to a passing test. The spec describes the change, never the agent behind the patch.

So there is no new lifecycle to adopt. Planning, implementation, review, CI, maintenance: the phases stay, and the artifacts moving through them change. Write down where the spec lands, where the agent picks up, and where human review gates the merge. [Intent Engineering and the SDLC](./foundation/intent-engineering-and-the-sdlc) maps that placement phase by phase.

This book treats Intent Engineering and agent-product lifecycle work as disciplines with overlapping vocabulary and different jobs. One governs an agent you ship and operate. The other governs a coding agent inside the software lifecycle you already run.

*Sources: Sommerville, "Software Engineering" (2015), SDLC as structured software delivery phases; OpenAI Agents SDK documentation (ongoing, reviewed June 28, 2026), agents, tools, handoffs, guardrails, human review, state, and observability as agent-product control surfaces; Anthropic, "Building effective agents" (December 2024), simple composable agent systems and evaluation guidance; EPAM, "Agentic Development Lifecycle (ADLC): A New Model for AI Systems Beyond SDLC" (2026), ADLC vocabulary for building and operating agents in production; Outshift (Cisco), "Agentic SDLC: A New Evolution in Software Engineering" (2026), agentic SDLC vocabulary for coding-agent delivery. The worker-versus-product split is this book's synthesis.*

## The companion: Intent Engineering Checker

The companion repo, Intent Engineering Checker (`iec`), demonstrates the core practices: ADRs in MADR format, specs with stable AC IDs, tests that trace back to those IDs, and a working agent-evaluation example that runs a baseline and a drifted version side by side and shows the eval suite catching the difference. The git history records how it got there, phase by phase, for anyone curious about the evolution. See [Companion Repo](./appendices/companion-repo) for the structure and how to browse it.

*Sources: `iec` repository history and tags (github.com/intent-engineering-for-coding-agents/cli), each phase as a git tag the reader checks out as evidence.*

## What Intent Engineering does not do

Intent Engineering does not stop your agent from drifting. It gives you the surface area to detect drift and recover from it. That is a weaker claim than what most agentic-engineering material promises, and it is the one this book defends. The chapter [When Intent Engineering Fails](./foundation/when-intent-engineering-fails) lists the failure modes that remain after good initial setup. It sits inside Foundation, before any of the practices.

Nor does it try to make the agent deterministic. The agent's non-determinism is not a bug to be engineered away. It is the same reasoning that finds the gap in your design, the same reasoning that occasionally makes a call you would not have made yourself. What you engineer is the ground it reasons from: a well-informed picture of your system instead of a guess, so the calls the agent makes on its own are calls worth trusting.

If that framing sounds reasonable, start with [Foundation](./foundation/index.md).
