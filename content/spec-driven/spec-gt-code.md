# Spec > Code

Delete the code. Keep the spec. Regenerate.

This is no longer only a thought experiment. Tool vendors and practitioners have reported teams doing exactly this: deleting an implementation that was tangled, unmaintainable, accreted over years of hotfixes, and replacing it in a session from the canonical spec. Treat that as a bounded practice, not a general industry baseline. It is safe only when the spec and tests are strong enough to catch regressions. When it works, the new implementation passes the same tests and preserves the feature set. The code is often cleaner.

Now try the reverse. Delete the spec. Keep the code. Regenerate the spec.

The agent will infer. It will read the code and produce a document describing what the code appears to do. That document will miss the intent behind every non-obvious decision. It will describe the hotfix paths as if they were designed. It will not tell you which of the three slightly different validation methods in the codebase is canonical. What it produces is an archaeology report, not a spec.

## The argument

Code is increasingly generated. Specs are authored. Code is output. Specs are input.

Generated artifacts have always been treated as downstream of their sources. The compiled binary is downstream of the source code. The minified bundle is downstream of the modules. The Docker image is downstream of the Dockerfile. We do not edit the binary directly and we do not treat it as the source of truth.

In the agentic era, code can occupy the same position that the compiled binary used to. It is the output of a process. The spec, the acceptance criteria, the intent: that is the source. Agents can regenerate the output from the source. They do not reliably regenerate the source from the output.

The practical consequence is a workflow rule this book adopts, not a law of nature: when there is a conflict between the spec and the code, treat the spec as canonical until the mismatch is resolved explicitly. When the spec needs to change, change the spec and update the code to match. When the code is tangled beyond easy modification, regeneration from the spec becomes a viable option.

*Sources: Fission AI, OpenSpec; LeanSpec, the spec-as-canonical-artifact workflow rule (spec wins on conflict, regenerate code from spec). These are tool-vendor sources, so the regeneration claim is kept bounded above rather than treated as industry baseline. Rick Hightower, "Agentic Coding: GSD vs Spec Kit vs OpenSpec vs Taskmaster AI" (Feb 27, 2026), SDD tools treating the spec as the primary artifact. Dave Farley, "Modern Software Engineering" (Addison-Wesley, 2021), intent as the durable source and code as its downstream expression.*

## Why this inverts the default

Before agentic tools, modifying code was expensive. Writing a spec and then implementing from it often doubled the work. Code became the source of truth because it was the hard part. Documentation was aspiration.

The mantra: code is self-documenting. It is not. Code tells you what it does. It cannot tell you what was decided against, what assumptions it carries, or why the validation ended up in the controller rather than the service layer. A spec can.

Code modification is often less expensive now. A session that regenerates a service can take an afternoon. A session that regenerates a service without a spec can also take an afternoon and still produce something the next developer cannot extend without reverse-engineering the intent. Code that is cheap to regenerate should not be treated as more valuable than the spec that makes it reproducible.

Farley's "Modern Software Engineering" argues for feedback loops and reliable delivery of intent into production. The spec is where intent is fixed. Without it, every deployment carries implicit assumptions that were never verified. With it, the path from intent to production is auditable.

This is not a new insight. What is new is that agentic speed makes the cost of ignoring it more visible. A team working at agentic velocity without spec discipline produces more broken things faster. The spec is not overhead. It is the mechanism that makes speed sustainable.

*Sources: Dave Farley, "Modern Software Engineering" (Addison-Wesley, 2021), feedback loops and reliable delivery of intent into production as the basis for treating the spec as source.*

## The rollback loop

The generated code looked wrong in ways that would compound. Rolling back took thirty seconds. Improving the spec took twenty minutes. The second generation was correct.

This is the practical demonstration of the thesis. When the result is wrong, the code is what you discard first. Improve the spec based on what you learned, and regenerate. The spec accumulates understanding with each iteration. The code is a snapshot.

Frederick P. Brooks called it in 1975: plan to throw one away. The first system will be discarded. The only question is whether you planned to. He was describing waterfall-era projects where the throwaway cost months. The agentic era collapses that cost to minutes.

Vibe coding is a special case. A vibe session usually produces no durable spec: the specification is chat history, ephemeral and uncommitted. That makes it useful for exploration and mockups. The transition to production is: extract what you learned into a spec, discard the prototype code, and regenerate from the spec.

*Sources: Frederick P. Brooks Jr., "The Mythical Man-Month" (Addison-Wesley, 1975; 20th anniversary ed. 1995), ch. 11 "Plan to Throw One Away", the throwaway-first cost that agentic speed collapses from months to minutes. "From Vibe Coding to Spec-Driven Development," Towards Data Science (2025), extracting a spec from a vibe prototype before production.*

## The bar a spec must clear

Not every document labeled "spec" earns the treatment described above. A spec that deserves to be treated as the durable artifact has to meet a minimum standard.

Testable: each acceptance criterion maps to an observable, verifiable outcome. Not "the API should handle errors gracefully". "When the upstream service returns a 503, the API should retry once after 1 second, then return a 503 with `{ error: 'upstream unavailable' }`". The criterion is correct or it is not.

AC-tagged: each scenario has a stable identifier. `[FEAT-001]`. Not a description. An ID. The ID survives the scenario being reworded, the file being moved, the section being reordered. Tests reference the ID, not the prose. This is what makes traceability work: the link between the spec and the tests that prove it does not break when someone edits the heading.

Sized to be readable: the spec fits in a context window with room for the code. If it does not, it describes a change too large to implement in one PR without risk of incoherence.

Scoped to one change: one spec, one coherent change. Not a domain model. Not a system design. Not a requirements document for the next quarter. One proposed change, one set of criteria, one archive on merge.

## The hardest shift

Most developers reading this chapter are not yet convinced. The intuition is that the code is what matters. The spec is scaffolding. The code runs in production. The spec sits in a file.

The code runs. The spec does not. This is true. It is also true that the spec describes what the code should do and the code reflects what the agent decided to implement. When the code and the spec disagree, one of them is wrong. Only one of them was authored by a person with intent.

Stop treating code review as the only primary quality gate. In a spec-driven workflow, spec review should happen before or alongside code review. If the spec is correct, the code is more likely to be correct. If the spec is wrong, code review will still miss the implementation of the wrong thing. Review the intent first. Then the diff.

This claim holds up only if the spec is connected to something harder than intent. Not a document that describes the expected behavior. Executable proof that the implementation delivers it. Not a human scanning the diff. Tests that run in CI and fail when the implementation diverges from the spec. Intent without proof is still a document.
