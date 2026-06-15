# Spec-Driven Development

> A spec that nobody reads is documentation. A spec the agent loads before it writes code is something else entirely.

Agent Instructions equipped the agent to arrive briefed. The hub is built, the skills are ready, and the hooks fire automatically. What is still missing is the one thing that changes every session: intent.

The agent is the labor. You write the spec, and the agent generates the code from it. Reviewing a diff without having reviewed the spec first is reviewing output without knowing what the output was supposed to be.

Intent is what you want this specific change to do, in this specific codebase, right now. It is not in agent instructions because it is not permanent. It is not in `docs/` because it is not architectural. It lives in a spec. The spec guides the implementation, then moves to the archive. Six months later, when someone asks why the code looks the way it does, the answer is still there.

This topic covers why specs exist, what makes them work, and what makes them fail. The chapters build in order: why bother, how big, what structure, which tool, what lifecycle, and finally the thesis the whole book leads to.

A note on tooling before the chapters. This book is OpenSpec-first. OpenSpec is the framework `iec`, the companion CLI ([cli](https://github.com/intent-engineering-for-coding-agents/cli)), was built with, and the chapters use its change-folder lifecycle because concrete examples need a concrete tool. `iec` is there to show the concepts working in a real repo, not a tool you have to adopt.

The portable practice is per-change intent with testable acceptance criteria. If your team uses a plain `spec.md`, Spec-Kit, LeanSpec, or an internal workflow, map `openspec/changes/<name>/` to your per-change spec artifact and map archiving to whatever record becomes historical after merge.

## Chapters

1. [Why Specs?](./why-specs): drift, intent, and traceability, the practical motivation for writing down what you want before you ask an agent to build it
2. [Why Small?](./why-small): context window economics, lean scope, and why the agent that finishes one small spec beats the one that drifts through a large one
3. [Why Important Stuff First?](./why-important-first): agents read top-down and lose focus; constraints and non-goals go at the top, not the appendix
4. [The Spectrum](./the-spectrum): from a raw prompt to OpenSpec, matching formality to risk and team size
5. [Spec Lifecycle](./spec-lifecycle): write, critique, review, implement, archive, and why multi-LLM critique catches what solo review misses
6. [Spec > Code](./spec-gt-code): the book's load-bearing thesis, that specifications are more important than the code they produce
