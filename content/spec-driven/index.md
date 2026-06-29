# Spec-Driven Development

> A spec that nobody reads is documentation. A spec the agent loads before it writes code is something else entirely.

Agent Instructions equipped the agent to arrive loaded. The hub is built, the skills are ready, and the hooks fire automatically. What changes every session is intent.

The agent is the labor. You write the spec, and the agent generates the code from it. Reviewing a diff without having reviewed the spec first is reviewing output without knowing what the output was supposed to be.

Intent is what you want this specific change to do, in this specific codebase, right now. It is not in agent instructions because it is not permanent. It is not the architecture or the decision behind it: that lives in `docs/`, the durable source of truth. It is the testable behavior for one change, and it lives in a spec. The spec guides the implementation, then moves to the archive. Ask later what the change was required to do and the archived spec answers. Ask why the system is built this way and the answer is in `docs/`.

This topic covers why specs exist, what makes them work, and what makes them fail. The chapters build in order: why bother, how big, which tool, what lifecycle, and finally the thesis the whole book leads to.

OpenSpec is the workflow this book uses to make Spec-Driven Development visible: one change folder, one lifecycle, one archive rule. The companion CLI (`iec`, [cli](https://github.com/intent-engineering-for-coding-agents/cli)) was built with it, so the chapters have a real repo to inspect instead of a workflow diagram floating above the code.

The portable practice is per-change intent with testable acceptance criteria. The closest alternative is a plain `spec.md` in the repo. Teams with domain, review, or compliance pressure often grow a local format from there because their specs need to match the SDLC already in place. If your team uses `spec.md`, LeanSpec, Spec-Kit, or an internal workflow, map `openspec/changes/<name>/` to your per-change spec artifact and map archiving to whatever record becomes historical after merge.

*Sources: Fission AI, OpenSpec, the change-folder lifecycle and archive rule used as the book's concrete workflow. GitHub Blog, "Spec-driven development with AI: Get started with a new open source toolkit" (September 2, 2025), the plain `spec.md` file as the common starting point for teams new to spec-driven development. The local-format portability framing is this book's synthesis.*

## Chapters

1. [Why Specs?](./why-specs): drift, intent, and traceability, the practical motivation for writing down what you want before you ask an agent to build it
2. [Why Small?](./why-small): context window economics, lean scope, and why the agent that finishes one small spec beats the one that drifts through a large one
3. [The Spectrum](./the-spectrum): from a raw prompt to OpenSpec, matching formality to risk and team size
4. [Spec Lifecycle](./spec-lifecycle): write, critique, review, implement, archive, and why multi-LLM critique catches what solo review misses
5. [Docs > Specs > Code](./docs-gt-specs-gt-code): the book's load-bearing thesis, that documentation is the durable source of truth, the spec proves the behavior of one change, and the code is downstream of both
