# The Spectrum

How much process does renaming a config variable deserve? Adopt a full Spec-Driven Development framework and the answer is: far more than it needs. The ceremony is real, proposal, design, specs, tasks, archive, and for a large API redesign it is exactly right. Spend the same machinery on a one-line rename and it is theater. The structure that protects a risky change suffocates a trivial one.

The team that writes no specs at all, operating on prompts and conversation history alone, ships features that work until the third session extends them. Then someone asks why the validation is in the controller and nobody can answer without reading git blame.

Through 2025 and into 2026, the Spec-Driven Development (SDD) tooling spread into a recognizable spectrum, from no artifact to full governance. The tools below are a mid-2026 snapshot, not a finished landscape.

## The light end

At the minimal end is the raw prompt. Describe the feature in the chat window and let the agent implement. No artifact, no audit trail. Acceptable for throwaway code, local experiments, prototypes that will not survive the week.

One step up, GSD (Get Shit Done): structured prompting without a framework. Write a concise intent document, run the agent, commit. It produces a usable artifact but no archive, task log, or traceability trail. Hightower calls it "spec-driven development without the ceremony," and where OpenSpec's overhead exceeds a team's risk profile, it is the practical alternative.

Next is a `spec.md` file in the repo: a single Markdown file, no framework, with purpose, acceptance criteria, and a few scenarios. Written before implementation, committed with the code. The GitHub post launching Spec-Kit describes this as where most teams start with spec-driven development.

*Sources: Rick Hightower, "What Is GSD? Spec-Driven Development Without the Ceremony" (Feb 23, 2026), GSD as structured prompting that produces an artifact but no archive or traceability trail. GitHub Blog, "Spec-driven development with AI: Get started with a new open source toolkit" (Sep 2, 2025), the plain `spec.md` file as the common starting point for teams new to spec-driven development.*

## OpenSpec

OpenSpec is the next level: a structured change-folder workflow with four parts, each answering a distinct question.

| Part | File | Question |
|---|---|---|
| Propose | `proposal.md` | What is this change about and why? |
| Design | `design.md` *(optional)* | How do we intend to execute it? |
| Specs | `specs/<capability>/spec.md` | What are the acceptance criteria per capability? |
| Tasks | `tasks.md` | What is the execution plan? |

Acceptance criteria are written in Gherkin (GIVEN-WHEN-THEN): abstract enough to write quickly, concrete enough to drive test implementation. The specs are the part that actually changes the system. A change proposal is a delta on the capability model: acceptance criteria added, updated, or removed. When the change is archived, those criteria merge into the canonical `/openspec/specs/<capability>/spec.md` and the rest is discarded.

That archive becomes the canonical set of acceptance criteria for each capability, the executable guardrails a later change is measured against, and the mechanism that closes the loop between intent and proof. The design those criteria serve does not live here. It lives in `docs/`. The overhead is real and built for teams shipping production systems with multiple developers.

*Sources: Fission AI, OpenSpec, the four-part change-folder workflow and the archive as canonical capability model.*

## Spec-Kit and LeanSpec

At the enterprise end, GitHub positions Spec-Kit for large-scale, multi-team environments with compliance requirements: tooling, integrations, governance hooks. The formality is designed for the scale.

LeanSpec (lean-spec.dev) earns a mention but not a rung. It articulates the small-spec discipline the previous two chapters inherited: stay focused, keep specs short, finish before extending. Its tooling and adoption are thin next to OpenSpec, so this book takes LeanSpec's philosophy on scope and OpenSpec's machinery for lifecycle.

*Sources: GitHub Blog, "Spec-driven development with AI: Get started with a new open source toolkit" (Sep 2, 2025), Spec-Kit's targeting of large-scale, multi-team environments with compliance requirements. LeanSpec, the small-spec discipline this book absorbs while using OpenSpec for lifecycle and structure.*

## Match formality to risk

Match formality to risk is LeanSpec's framing. The table below is this book's working synthesis of it. The error is not picking the wrong tool. The error is picking one tool and applying it to every change regardless of risk.

| Change type | Appropriate formality |
|---|---|
| Local prototype, will not merge | Raw prompt |
| Small bug fix, clear scope, no edge cases | `spec.md` or skip entirely |
| New feature, single developer, medium complexity | `spec.md` |
| New feature, team collaboration, reviewable | OpenSpec change folder |
| Compliance-sensitive, multi-team, production | OpenSpec or Spec-Kit |

This is a heuristic, not a decision tree. The real question is the cost of discovering the wrong intent after implementation. Low cost, low formality. High cost, high formality.

The same dial governs how you stage the change, not only which framework you reach for. A change carrying a real decision earns a spec PR before any implementation, so the intent is corrected while correcting it is cheap. A change whose intent is visible in the diff ships as one PR. The [trunk-based development chapter](/team/trunk-based-development) works the mechanics.

*Sources: Rick Hightower, "Agentic Coding: GSD vs Spec Kit vs OpenSpec vs Taskmaster AI" (Feb 27, 2026), the formality-to-risk tradeoffs that distinguish the SDD tools across the spectrum.*

## The trade-off

More formality means more audit trail, better traceability, less improvisation surface. It also means more upfront time, more overhead per change, and more places for the process to become theater if nobody tends it.

Teams underestimate the theater risk. A heavy framework adopted by a small team produces specs written to satisfy the framework rather than guide the implementation: correct structure, shallow content, twenty minutes from a developer who wants to get to the code. Shallow specs with correct structure are worse than short specs with precise content. They look complete and are not.

The right level of formality is the one your team will maintain under deadline pressure. Start lower than you think you need. Add ceremony when you feel the pain of not having it.

Picking the rung is the easy part. The lifecycle that carries a spec from proposal to archive, and back into the codebase as proof, is where most of the work hides.
