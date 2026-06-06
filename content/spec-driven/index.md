# Spec-Driven Development

> A spec that nobody reads is documentation. A spec the agent loads before it writes code is something else entirely.

Agent Instructions equipped the agent to arrive briefed. The hub is built. The skills are ready. The hooks fire automatically. What is still missing is the one thing that changes every session: intent.

The agent is the labor. You write the spec; the agent generates the code from it. Reviewing a diff without having reviewed the spec first is reviewing output without knowing what the output was supposed to be.

Intent is what you want this specific change to do, in this specific codebase, right now. It is not in `AGENTS.md` because it is not permanent. It is not in `docs/` because it is not architectural. It lives in a spec, gets used to guide an implementation, then gets archived where it can be found when someone asks, six months from now, why the code looks the way it does.

This topic covers why specs exist, what makes them work, and what makes them fail. The chapters build in order: why bother, how big, what structure, which tool, what lifecycle, and finally the thesis the whole book leads to.

A note on tooling before the chapters. This book uses OpenSpec as the demonstration substrate. It is the framework `iec` was built with, and the examples reach for it because concrete examples need a concrete tool. The practice does not require OpenSpec. Per-change intent with testable acceptance criteria works with a plain `spec.md`, with Spec-Kit, or with whatever your team already runs. Where a chapter shows an `openspec/` layout, read it as one implementation of the practice, not the practice itself.

## Chapters

1. [Why Specs?](./why-specs): drift, intent, and traceability, the practical motivation for writing down what you want before you ask an agent to build it
2. [Why Small?](./why-small): context window economics, lean scope, and why the agent that finishes one small spec beats the one that drifts through a large one
3. [Why Important Stuff First?](./why-important-first): agents read top-down and lose focus; constraints and non-goals go at the top, not the appendix
4. [The Spectrum](./the-spectrum): from a raw prompt to OpenSpec, matching formality to risk and team size
5. [Spec Lifecycle](./spec-lifecycle): write, critique, review, implement, archive, and why multi-LLM critique catches what solo review misses
6. [Spec > Code](./spec-gt-code): the book's load-bearing thesis, that specifications are more important than the code they produce
