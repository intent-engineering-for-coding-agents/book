# Docs > Specs > Code

Delete the code. Keep the docs. Regenerate.

This is no longer only a thought experiment. Tool vendors and practitioners have reported teams doing exactly this: deleting an implementation that was tangled, unmaintainable, accreted over years of hotfixes, and rebuilding it in a session from the design docs and the acceptance criteria that pin its behavior. Treat that as a bounded practice, not a general industry baseline. It is safe only when the docs and tests are strong enough to catch regressions. When it works, the new implementation passes the same tests and preserves the feature set. The code is often cleaner.

Now try the reverse: delete the docs, keep the code, regenerate the docs.

The agent will infer. It reads the code and produces a document describing what the code appears to do. That document misses the intent behind every non-obvious decision, describes the hotfix paths as if they were designed, and cannot tell you which of the three slightly different validation methods the team settled on, or why. What it produces is an archaeology report, not a design record.

## The argument

Code is increasingly generated. Intent is authored. Code is output. Intent is input.

Generated artifacts have always been treated as downstream of their sources. The compiled binary is downstream of the source code, the minified bundle is downstream of the modules, and the Docker image is downstream of the Dockerfile. Nobody edits the binary directly, and nobody treats it as the source of truth.

In the agentic era, code occupies the position the compiled binary used to. It is the output of a process, and the authored intent above it lives in two places. The design, the decisions, the reasons one option won over another: that is the docs. The testable behavior, the acceptance criteria, the proof: that is the spec. Agents regenerate the code from both. They do not reliably regenerate either one from the code.

So the chain runs one direction. Docs outrank specs, specs outrank code: the design shapes the spec, the spec drives the code, and the code is the artifact you are most willing to throw away. The spec sits in the middle on purpose. It is neither the durable record above it nor the disposable output below it, but the one-off that turns a settled design into testable behavior for a single change, then archives. A workflow rule follows, one this book adopts rather than a law of nature: during a change, when the spec and the code disagree, treat the spec as canonical for behavior until the mismatch is resolved. When the design itself is wrong, the fix is upstream of the spec, in the docs. When the code is tangled beyond easy modification, regeneration from the docs and the spec becomes a viable option.

*Sources: Fission AI, OpenSpec; LeanSpec, the spec-as-canonical-artifact workflow rule (spec wins on conflict, regenerate code from spec). These are tool-vendor sources, so the regeneration claim is kept bounded above rather than treated as industry baseline. Rick Hightower, "Agentic Coding: GSD vs Spec Kit vs OpenSpec vs Taskmaster AI" (Feb 27, 2026), SDD tools treating the spec as the primary artifact. Dave Farley, "Modern Software Engineering" (Addison-Wesley, 2021), intent as the durable source and code as its downstream expression.*

## Why this inverts the default

Before agentic tools, modifying code was expensive. Writing the design down and then implementing from it often doubled the work. Code became the source of truth because it was the hard part. Documentation was aspiration.

The mantra: code is self-documenting. It is not. Code tells you what it does, but not what was decided against, what assumptions it carries, or why the validation ended up in the controller rather than the service layer. The acceptance criteria do not tell you either. They pin the behavior, not the reasoning behind it. The docs do: the ADR that recorded the decision, the design doc that weighed the options and named the one that won.

Code modification is often less expensive now. A session that regenerates a service takes an afternoon. A session that regenerates a service without the docs and the spec takes the same afternoon and produces something the next developer cannot extend without reverse-engineering the intent. Code that is cheap to regenerate should not be treated as more valuable than the documents that make it reproducible.

Farley's "Modern Software Engineering" argues for feedback loops and reliable delivery of intent into production. Intent is fixed in the docs and proven by the spec. Without them, every deployment carries implicit assumptions that were never verified. With them, the path from intent to production is auditable.

*Sources: Dave Farley, "Modern Software Engineering" (Addison-Wesley, 2021), feedback loops and reliable delivery of intent into production as the basis for treating documented intent as the source.*

## The rollback loop

The generated code looked wrong in ways that would compound. Rolling back took thirty seconds. Improving the spec took twenty minutes. The second generation was correct.

This is the practical demonstration of the thesis. When the result is wrong, the code is what you discard first. Improve what produced it, the spec when the behavior was underspecified, the docs when the design itself was wrong, and regenerate. The intent accumulates understanding with each iteration. The code is a snapshot.

Frederick P. Brooks called it in 1975: plan to throw one away. The first system will be discarded. The only question is whether you planned to. He was describing waterfall-era projects where the throwaway cost months. The agentic era collapses that cost to minutes.

Vibe coding is a special case. A vibe session usually produces no durable record: the specification is chat history, ephemeral and uncommitted. That makes it useful for exploration and mockups. The transition to production is the same loop in reverse: write the decisions into the docs and the behavior into a spec, discard the prototype code, and regenerate from them.

*Sources: Frederick P. Brooks Jr., "The Mythical Man-Month" (Addison-Wesley, 1975; 20th anniversary ed. 1995), ch. 11 "Plan to Throw One Away", the throwaway-first cost that agentic speed collapses from months to minutes. "From Vibe Coding to Spec-Driven Development," Towards Data Science (2025), extracting a spec from a vibe prototype before production. Simon Willison, "Not all AI-assisted programming is vibe coding" (simonwillison.net, Mar 19, 2025), vibe coding as a narrow mode distinct from disciplined AI-assisted work.*

## The bar a spec must clear

Not every document labeled "spec" earns the treatment described above. A spec that deserves to drive the code, and to be trusted as proof that the code is correct, has to meet a minimum standard.

Testable: each acceptance criterion maps to an observable, verifiable outcome. Not "the API should handle errors gracefully", but "When the upstream service returns a 503, the API should retry once after 1 second, then return a 503 with `{ error: 'upstream unavailable' }`". The criterion is correct or it is not.

AC-tagged: each scenario has a stable identifier, such as `[FEAT-001]`. Not a description, but an ID. The ID survives the scenario being reworded, the file being moved, the section being reordered. Tests reference the ID, not the prose. This is what makes traceability work: the link between the spec and the tests that prove it does not break when someone edits the heading.

Sized to be readable: the spec fits in a context window with room for the code. If it does not, it describes a change too large to implement in one PR without risk of incoherence.

Scoped to one change: one spec, one coherent change. Not a domain model. Not a system design. Not a requirements document for the next quarter. One proposed change, one set of criteria, one archive on merge.

Those four bars are about behavior. The design behind the change, the why and the alternatives weighed, clears a different bar in a different place: the ADRs and design docs under `docs/`. The spec proves the change does what was decided. It does not record the deciding.

## The hardest shift

Most developers reading this chapter are not yet convinced. The intuition is that the code is what matters: the docs are overhead, the code runs in production, and the documents sit in a folder nobody opens.

The code runs. The docs do not. This is true. It is also true that the code reflects what the agent decided to implement, and the docs and the spec reflect what a person decided to ask for. When the code and the intent disagree, one of them is wrong. Only one of them was authored by someone who understood why.

Stop treating code review as the only primary quality gate. In a spec-driven workflow, spec review should happen before or alongside code review. If the spec is correct, the code is more likely to be correct. If the spec is wrong, code review will still miss the implementation of the wrong thing. Review the intent first, then the diff.

This claim holds up only if the spec is connected to something harder than intent: not a document that describes expected behavior, but executable proof that the implementation delivers it. Not a human scanning the diff, but tests that run in CI and fail when the implementation diverges from the spec. Intent without proof is still a document.
