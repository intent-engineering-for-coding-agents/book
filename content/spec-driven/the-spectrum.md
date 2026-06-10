# The Spectrum

How much process does renaming a config variable deserve? Adopt a full Spec-Driven Development framework and the honest answer is: far more than it needs. The ceremony is real, proposal, design, specs, tasks, archive, and for a large API redesign it is exactly right. Spend the same machinery on a one-line rename and it is theater. The structure that protects a risky change suffocates a trivial one.

The team that writes no specs at all, operating on prompts and conversation history alone, ships features that work until the third session extends them. Then someone asks why the validation is in the controller and nobody can answer without reading git blame.

## The tools

The Spec-Driven Development (SDD) ecosystem in early 2026 had settled into a recognizable spectrum.

At the minimal end: a raw prompt to the agent. Describe the feature in the chat window and let it implement. No artifact, no audit trail. Acceptable for throwaway code, local experiments, prototypes that will not survive the week.

One step up: a `spec.md` file in the repo. A Markdown file, no framework, with purpose, acceptance criteria, and a few scenarios. Written before implementation, committed with the code, left in place or deleted. Adopted by teams who want the intent artifact without ceremony. The GitHub blog post launching Spec-Kit describes this as the starting point for most teams coming to spec-driven development for the first time.

*Sources: GitHub Blog, "Spec-driven development with AI: Get started with a new open source toolkit" (Sep 2, 2025), the plain `spec.md` file as the starting point for teams new to spec-driven development.*

OpenSpec is the next level. A structured change-folder workflow with four parts, each answering a distinct question:

| Part | File | Question |
|---|---|---|
| Propose | `proposal.md` | What is this change about and why? |
| Design | `design.md` *(optional)* | How do we intend to execute it? |
| Specs | `specs/<capability>/spec.md` | What are the acceptance criteria per capability? |
| Tasks | `tasks.md` | What is the execution plan? |

Acceptance criteria are written in Gherkin (GIVEN-WHEN-THEN): abstract enough to write quickly, concrete enough to drive test implementation. When the change is archived, the per-capability acceptance criteria merge into the canonical `/openspec/specs/<capability>/spec.md`, building a living source-of-truth for each capability's behavior. This is the mechanism that closes the loop between intent and proof.

A change proposal is a delta on the system's capability model: adding, updating, or removing the acceptance criteria that define what the system does. The `design.md` and `tasks.md` describe how to execute that delta; the `proposal.md` describes why. The specs are the thing that actually changes, which is why archiving merges them into the canonical capability model and the rest is discarded.

OpenSpec adds lifecycle management and the archive as a historical record. The workflow is designed for teams working on production systems with multiple developers. The overhead is real and intentional: the ceremony is proportional to the risk.

*Sources: Fission AI, OpenSpec, the four-part change-folder workflow and its proportional ceremony.*

At the enterprise end, GitHub positions Spec-Kit for large-scale, multi-team environments with compliance requirements. Tooling, integrations, governance hooks. The formality is designed for the scale.

*Sources: GitHub Blog, "Spec-driven development with AI" (Sep 2, 2025), Spec-Kit's targeting of large-scale, multi-team environments with compliance requirements.*

LeanSpec (lean-spec.dev) deserves a mention, though not a slot in the table. It articulates the small-spec discipline clearly: stay focused, keep specs short, finish before extending. The sizing philosophy in the previous two chapters is inherited directly from it. As an operational framework, LeanSpec has limited adoption and tooling compared to OpenSpec. This book uses OpenSpec for lifecycle and structure, and absorbs LeanSpec's philosophy on scope. If you are choosing a framework, OpenSpec is the practical choice. If you want the argument for why small specs work, LeanSpec made it first.

*Sources: LeanSpec, the small-spec discipline this book absorbs while using OpenSpec for lifecycle and structure.*

## Match formality to risk

Match formality to risk is LeanSpec's framing. The table below is this book's working synthesis of it. The error is not choosing the wrong tool. The error is applying the same tool to every change regardless of its risk profile.

| Change type | Appropriate formality |
|---|---|
| Local prototype, will not merge | Raw prompt |
| Small bug fix, clear scope, no edge cases | `spec.md` or skip entirely |
| New feature, single developer, medium complexity | `spec.md` |
| New feature, team collaboration, reviewable | OpenSpec change folder |
| Compliance-sensitive, multi-team, production | OpenSpec or Spec-Kit |

This is a heuristic table, not a decision tree. The real question: what is the cost of discovering the wrong intent after implementation? Low cost, low formality. High cost, high formality.

The same dial governs how you stage the change, not which framework you reach for. A change carrying a real decision earns a spec PR before any implementation, so the intent is corrected while correcting it is cheap. A change whose intent is visible in the diff ships as one PR. The [trunk-based development chapter](/team/trunk-based-development) works the mechanics. The deciding question is the one above, applied to a single change: what does discovering the wrong intent after implementation cost here?

*Sources: Rick Hightower, "Agentic Coding: GSD vs Spec Kit vs OpenSpec vs Taskmaster AI" (Feb 27, 2026), the formality-to-risk tradeoffs that distinguish the SDD tools across the spectrum.*

## What GSD is

GSD (Get Shit Done) is the lightest structured point on the spectrum: structured prompting without a framework. No change folder, no formal lifecycle. Write a concise intent document, run the agent, commit. Hightower describes it as "spec-driven development without the ceremony".

It is not sloppy. GSD produces a usable artifact. It does not produce an archive, a task log, or a traceability trail. For teams where OpenSpec's overhead exceeds their risk profile, GSD is the practical alternative. For teams where traceability is required, it is not.

*Sources: Rick Hightower, "What Is GSD? Spec-Driven Development Without the Ceremony" (Feb 23, 2026), GSD as structured prompting that produces an artifact but no archive or traceability trail.*

## The honest trade-off

More formality means more audit trail, better traceability, and less improvisation surface. It also means more upfront time, more overhead per change, and more places for the process to become theater if nobody tends it.

Teams underestimate the theater risk. A heavy spec framework adopted by a small team will produce specs written to satisfy the framework rather than guide the implementation. The structure will be right, but the content will be shallow, written in twenty minutes by a developer who wants to get to the code. Shallow specs with correct structure are worse than short specs with precise content: they look complete and are not.

The right level of formality is the one your team will maintain under deadline pressure. Start lower than you think you need. Add ceremony when you feel the pain of not having it. The question is what that pain looks like, and what it teaches about where on the spectrum a team belongs.

The lifecycle that turns a spec into shipped code is the practical machinery behind that question.
