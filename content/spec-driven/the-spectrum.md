# The Spectrum

The team adopted OpenSpec on a Tuesday. By Thursday, they had written fourteen change folders for a feature that a post-it note would have captured. The overhead was legitimate: proposal, design, tasks, delta spec, archive. For a large API redesign, this is the right level of ceremony. For renaming a config variable, it is process theatre.

The team that writes no specs at all, operating on prompts and conversation history alone, ships features that work until the third session extends them. Then someone asks why the validation is in the controller and nobody can answer without reading git blame.

## The tools

The Spec-Driven Development (SDD) ecosystem in early 2026 had settled into a recognisable spectrum.

At the minimal end: a raw prompt to the agent. Describe the feature in the chat window, let it implement. No artifact. No audit trail. Acceptable for throwaway code, local experiments, prototypes that will not survive the week.

One step up: a `spec.md` file in the repo. Just a Markdown file, no framework. Purpose, acceptance criteria, a few scenarios. Written before implementation, committed with the code, left in place or deleted. Adopted by teams who want the intent artifact without ceremony. The GitHub blog post launching Spec-Kit describes this as the starting point for most teams coming to spec-driven development for the first time.

*Sources: GitHub Blog, "Spec-driven development with AI: Get started with a new open source toolkit" (Sep 2, 2025).*

OpenSpec is the next level. A structured change-folder workflow: proposal, delta specs, design document, task list, archive. Adds lifecycle management and the archive as a historical record. Designed for teams working on production systems with multiple developers. The overhead is real and intentional: the ceremony is proportional to the risk.

*Sources: Fission AI, OpenSpec.*

At the enterprise end, GitHub Spec-Kit targets large-scale, multi-team environments with compliance requirements. Tooling, integrations, governance hooks. The formality is designed for the scale.

*Sources: GitHub Blog, "Spec-driven development with AI" (Sep 2, 2025).*

LeanSpec (lean-spec.dev) deserves a mention, though not a slot in the table. It articulates the small-spec discipline clearly: stay focused, keep specs short, finish before extending. The sizing philosophy in the previous two chapters is inherited directly from it. As an operational framework, however, LeanSpec has limited adoption and tooling compared to OpenSpec. This book uses OpenSpec for lifecycle and structure, and absorbs LeanSpec's philosophy on scope. If you are choosing a framework, OpenSpec is the practical choice. If you want the argument for why small specs work, LeanSpec made it first.

*Sources: LeanSpec.*

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

*Sources: Rick Hightower, "Agentic Coding: GSD vs Spec Kit vs OpenSpec vs Taskmaster AI" (Feb 27, 2026).*

## What GSD is

GSD (Get Shit Done) is the lightest structured point on the spectrum: structured prompting without a framework. No change folder. No formal lifecycle. Write a concise intent document, run the agent, commit. Hightower describes it as "spec-driven development without the ceremony."

It is not sloppy. GSD produces a usable artifact. It just does not produce an archive, a task log, or a traceability trail. For teams where OpenSpec's overhead exceeds their risk profile, GSD is the practical alternative. For teams where traceability is required, it is not.

*Sources: Rick Hightower, "What Is GSD? Spec-Driven Development Without the Ceremony" (Feb 23, 2026).*

## The honest trade-off

More formality means more audit trail, better traceability, and less improvisation surface. It also means more upfront time, more overhead per change, and more places for the process to become theatre if nobody tends it.

Teams underestimate the theatre risk. A heavy spec framework adopted by a small team will produce specs written to satisfy the framework rather than guide the implementation. The structure will be right. The content will be shallow, written in twenty minutes by a developer who wants to get to the code. Shallow specs with correct structure are worse than short specs with precise content: they look complete and are not.

The right level of formality is the one your team will maintain under deadline pressure. Start lower than you think you need. Add ceremony when you feel the pain of not having it. The lifecycle that keeps specs alive and useful is the next subject.
