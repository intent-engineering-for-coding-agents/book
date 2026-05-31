# The Spectrum

How much process does renaming a config variable deserve? Adopt a full Spec-Driven Development framework and the honest answer is: a great deal more than it needs. The ceremony is real, proposal, design, tasks, delta spec, archive, and for a large API redesign it is exactly right. Spend the same machinery on a one-line rename and it is theatre. The structure that protects a risky change suffocates a trivial one.

The team that writes no specs at all, operating on prompts and conversation history alone, ships features that work until the third session extends them. Then someone asks why the validation is in the controller and nobody can answer without reading git blame.

## The tools

The Spec-Driven Development (SDD) ecosystem in early 2026 had settled into a recognisable spectrum.

At the minimal end: a raw prompt to the agent. Describe the feature in the chat window, let it implement. No artifact. No audit trail. Acceptable for throwaway code, local experiments, prototypes that will not survive the week.

One step up: a `spec.md` file in the repo. Just a Markdown file, no framework. Purpose, acceptance criteria, a few scenarios. Written before implementation, committed with the code, left in place or deleted. Adopted by teams who want the intent artifact without ceremony. The GitHub blog post launching Spec-Kit describes this as the starting point for most teams coming to spec-driven development for the first time.

*Sources: GitHub Blog, "Spec-driven development with AI: Get started with a new open source toolkit" (Sep 2, 2025), the plain `spec.md` file as the starting point for teams new to spec-driven development.*

OpenSpec is the next level. A structured change-folder workflow: proposal, delta specs, design document, task list, archive. Adds lifecycle management and the archive as a historical record. Designed for teams working on production systems with multiple developers. The overhead is real and intentional: the ceremony is proportional to the risk.

*Sources: Fission AI, OpenSpec, the structured change-folder workflow (proposal, delta specs, design, tasks, archive) and its proportional ceremony.*

At the enterprise end, GitHub Spec-Kit targets large-scale, multi-team environments with compliance requirements. Tooling, integrations, governance hooks. The formality is designed for the scale.

*Sources: GitHub Blog, "Spec-driven development with AI" (Sep 2, 2025), Spec-Kit's targeting of large-scale, multi-team environments with compliance requirements.*

LeanSpec (lean-spec.dev) deserves a mention, though not a slot in the table. It articulates the small-spec discipline clearly: stay focused, keep specs short, finish before extending. The sizing philosophy in the previous two chapters is inherited directly from it. As an operational framework, however, LeanSpec has limited adoption and tooling compared to OpenSpec. This book uses OpenSpec for lifecycle and structure, and absorbs LeanSpec's philosophy on scope. If you are choosing a framework, OpenSpec is the practical choice. If you want the argument for why small specs work, LeanSpec made it first.

*Sources: LeanSpec, the small-spec discipline this book absorbs while using OpenSpec for lifecycle and structure.*

## Match formality to risk

The error is not choosing the wrong tool. The error is applying the same tool to every change regardless of its risk profile.

| Change type | Appropriate formality |
|---|---|
| Local prototype, will not merge | Raw prompt |
| Small bug fix, clear scope, no edge cases | `spec.md` or skip entirely |
| New feature, single developer, medium complexity | `spec.md` |
| New feature, team collaboration, reviewable | OpenSpec change folder |
| Compliance-sensitive, multi-team, production | OpenSpec or Spec-Kit |

This is a heuristic table, not a decision tree. The real question: what is the cost of discovering the wrong intent after implementation? Low cost, low formality. High cost, high formality.

The same dial governs how you stage the change, not just which framework you reach for. A change carrying a real decision earns a spec PR before any implementation, so the intent is corrected while correcting it is cheap. A change whose intent is visible in the diff ships as one PR. The [trunk-based development chapter](/team/trunk-based-development) works the mechanics; the deciding question is the one above, applied to a single change: what does discovering the wrong intent after implementation cost here?

*Sources: Rick Hightower, "Agentic Coding: GSD vs Spec Kit vs OpenSpec vs Taskmaster AI" (Feb 27, 2026), the formality-to-risk tradeoffs that distinguish the SDD tools across the spectrum.*

## What GSD is

GSD (Get Shit Done) is the lightest structured point on the spectrum: structured prompting without a framework. No change folder. No formal lifecycle. Write a concise intent document, run the agent, commit. Hightower describes it as "spec-driven development without the ceremony".

It is not sloppy. GSD produces a usable artifact. It just does not produce an archive, a task log, or a traceability trail. For teams where OpenSpec's overhead exceeds their risk profile, GSD is the practical alternative. For teams where traceability is required, it is not.

*Sources: Rick Hightower, "What Is GSD? Spec-Driven Development Without the Ceremony" (Feb 23, 2026), GSD as structured prompting that produces an artifact but no archive or traceability trail.*

## The honest trade-off

More formality means more audit trail, better traceability, and less improvisation surface. It also means more upfront time, more overhead per change, and more places for the process to become theatre if nobody tends it.

Teams underestimate the theatre risk. A heavy spec framework adopted by a small team will produce specs written to satisfy the framework rather than guide the implementation. The structure will be right. The content will be shallow, written in twenty minutes by a developer who wants to get to the code. Shallow specs with correct structure are worse than short specs with precise content: they look complete and are not.

The right level of formality is the one your team will maintain under deadline pressure. Start lower than you think you need. Add ceremony when you feel the pain of not having it. The question is what that pain looks like, and what it teaches about where on the spectrum a team actually belongs.

## The arc

Teams do not usually choose their formality level consciously. They accumulate it in response to pain.

The first production regression with no audit trail is the usual catalyst for adding a `spec.md`. Something breaks. The review meeting starts. Someone asks why the agent made the decision it made. Nobody knows: the reasoning was in a chat window that no longer exists. A Markdown file would have cost thirty minutes. The incident cost a day.

The step from `spec.md` to OpenSpec usually follows collaboration, or repetition. Two developers, same codebase, different agents, conflicting intent. Or the same kind of drift recurring: the spec existed but the second agent rewrote what the first had built, because nobody recorded what the first had decided. When the pattern repeats, the team reaches for structure.

Karpathy's *vibe coding* is not a failure mode. It is a deliberate posture: intentional, exploration-mode, no audit trail, no long-term commitment. The right tool for prototypes and throwaway experiments.

Willison's observation holds: not all AI-assisted programming is vibe coding. The two modes are different by intent, not by quality.

The arc from vibe coding to structured spec-driven development is real. Tsinghua's GLM-5 paper formalised it under the same terms in early 2026. But the arc is not an obligation. Some teams stay at `spec.md` permanently and that is the right call. Some skip directly to OpenSpec. The question is not where on the spectrum a team should aspire to reach. The question is what level the team will actually maintain under deadline pressure.

The lifecycle that turns a spec into shipped code is the practical machinery behind that question.

*Sources: Andrej Karpathy, "Vibe coding" (Feb 2025), vibe coding as a deliberate exploration-mode posture, not a failure mode. Simon Willison, "Not all AI-assisted programming is vibe coding" (Mar 2025), the two modes as different by intent, not quality. Tsinghua University et al., "GLM-5: From Vibe Coding to Agentic Engineering" (Feb 2026), the arc from vibe coding toward structured spec-driven work.*
