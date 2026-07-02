# Introduction

The mindset alone does not give an agent enough to work from. A maintained codebase still needs explicit context, per-change intent, and proof that the result matched the target.

Coding agents work quickly, but speed cuts both ways. They can draft a service in minutes and drift from a design decision on the same clock. The missing variable is not intelligence. It is project-specific information.

The agent does not know what your team already decided.

That gap is easy to hide in a healthy codebase. The schema looks consistent. The tests are green. The older auth flow looks redundant but carries some rule nobody wrote down. A developer remembers the decision. The agent does not, so it extends the wrong interface and does it neatly.

Coding agents amplify the developer managing them. Bill Doerrfeld put it plainly in early 2026: "AI doesn't create great developers, it amplifies them". An under-informed developer gets the wrong code faster. An experienced developer gets correct code faster.

*Sources: Bill Doerrfeld, "AI doesn't create great developers, it amplifies them" (LeadDev, January 20, 2026), amplifier framing for agent-assisted development.*

This book calls the missing discipline Intent Engineering: giving the agent enough of your system and intent that it stops guessing at both. The practice here is narrower than the wider "agentic software engineering" language circulating through the field. This book is about the intent you hand to a coding agent, not every problem involved in building agents as products.

Intent, as this book uses the word, is what you want the agent to build or decide, stated with enough precision that it acts on your purpose instead of its own inference. It has two forms. One is change-sized: a spec for the next change. The other is durable: decisions and conventions that constrain every change after that.

The phrase "intent engineering" did not start here. `intentengineering.dev` uses it in a broader sense, covering product intent, user-experience intent, and agent-system design. Related terms are moving through 2025-2026 writing too, especially Intent-Driven Development. This book uses a narrower frame: durable repo context, spec-first change control, and executable proof for agent-generated code.

*Sources: intentengineering.dev (ongoing), broader prior use of "intent engineering". Don Johnson, "Intent-Driven Development: Define the System Before You Write the Code" (DEV, December 4, 2025), intent-driven development as specification-first software design. Vishal Mysore, "What is Intent Driven Development?" (Medium, March 9, 2026), intent-driven development as outcome-and-constraint framing for AI-assisted execution. intent-driven-development.com (ongoing), intent-above-implementation framing in current workflow language.*

The book is OpenSpec-first on purpose. Intent Engineering is the portable practice. OpenSpec is the concrete workflow used here because the examples need one lifecycle, one directory layout, one archive rule, and one companion repo readers can inspect. If your team uses a plain `spec.md`, a local spec format, LeanSpec, Spec-Kit, or an internal workflow, translate the OpenSpec terms to your own spec artifact.

*Sources: OpenSpec (openspec.dev), change-folder and delta-spec structure used throughout this book.*

## What to expect

The book is organized around four topics. The first two give the agent durable context. The last two pin a specific change and prove the generated code met the target.

**Foundation:** repo structure as the agent's context. Decisions, design docs, specs, and an agent-facing index live in plain text, in version control, where the next session can load them.

**Agent Instructions:** `AGENTS.md` and the `.agents/` hub. Teach the agent your project rules once, then decide which of those rules are important enough to enforce with hooks.

**Spec-Driven Development:** specs before code. The spec defines one change, limits the solution space, and gives the change a target richer than "do what the codebase seems to imply".

**Quality and Verification:** tests as proof of intent. Acceptance criteria trace to tests, reviewer scope stays narrow, and drift has a better chance of getting caught before merge.

Topics three and four are a pair. Spec-driven development became more visible in 2025-2026 tooling and discussion, though the practice is still young and unevenly defined, and much of the public material stops at writing the spec. This book keeps the spec, then adds the missing half: proving the generated code landed where the spec aimed it.

*Sources: "Spec-Driven Development: From Code to Contract in the Age of AI Coding Assistants" (submitted to AIware 2026, OpenReview, January 2026). SolGuruz, "Spec-Driven Development Guide" (2026), public SDD framing in current tooling discourse. IntuitionLabs, "Spec-Driven Development and Spec-Kit" (2026), current SDD framing and limits.*

After those four topics come team workflows, cross-team coordination, and the parts of this field that are still unsettled. This book does not add a second project-management layer. The existing flow stays. Tickets point to change folders. PRs carry spec deltas. CI checks proof, not only style.

If that already sounds like waterfall, [Why Specs?](./spec-driven/why-specs#the-waterfall-objection) takes the objection where the practice is introduced, not here.

## Who this is for

You are a senior developer or architect. You already use a capability-class coding agent: one with a reasoning-capable model, real tool use, and enough autonomy to carry out a plan without checking in for every small decision. The exact model roster will keep moving. The practices in this book target the class, not a frozen vendor list.

You have shipped production code under pressure, stayed skeptical of hype, and wanted more control and consistency at scale. You know what a PR is and treat human review as non-negotiable.

Vendor-agnostic is a deliberate choice here: `AGENTS.md` and `.agents/` form a shared layout, written once and read by whichever tool shows up next, so you stop betting the codebase on one vendor's roadmap.

*Sources: GitHub Changelog, "Copilot coding agent now supports AGENTS.md custom instructions" (August 28, 2025), AGENTS.md as a current vendor-supported convention.*

## When a project earns this

Most of what you build does not need all of this. A script you run once, a glue function, a prototype you delete after it answers the question: write the prompt, take the change, move on.

The discipline starts paying for itself when the work outlives the session that started it. Once a build runs into weeks, the agent is extending its own earlier changes across many sessions, and a spec stops being ceremony. The spec becomes the file the next session loads before editing the code again.

For a service meant to run in production and be maintained by the next developer on call, adopt the rest. Foundation and Agent Instructions load the codebase facts the agent does not know. Specs and verification pin one change to one target and show whether the change hit it. You do not adopt every practice at once. As the cost of getting a change wrong rises, you turn up the discipline, the same way you already vary how much process one change deserves on [the spectrum of formality](./spec-driven/the-spectrum).

## What Intent Engineering does not do

Intent Engineering does not stop drift. It gives you a clearer way to detect drift and recover from it. That is a weaker claim than much of the surrounding agent-engineering material makes, and it is the claim this book defends.

Nor does it try to make the agent deterministic. You are engineering the ground it reasons from: a better picture of your system instead of a guess. The limits of that bargain matter, and [When Intent Engineering Fails](./foundation/when-intent-engineering-fails) takes them up early, before any of the practices are sold as a cure.

The next question is structural: where do those decisions, constraints, and proofs live so the agent loads them in the first place? Start with [Foundation](./foundation/index.md).
