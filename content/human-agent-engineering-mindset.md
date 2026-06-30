# The Human-Agent Engineering Mindset

The real problem is not whether developers should use AI. The real problem begins once the prototype works and the team keeps calling the coding agent the magic chat box.

I do not want a coding agent trying to figure out everything from a single prompt. I want it working in the same engineering environment I do: code, decisions, documentation, tests, review, and constraints on the change.

Coding agents are good coders. That is the trap. They do not know your rules, constraints, or taste.

Give the agent the information you would give a teammate before asking them to change the code. Then tighten that handoff next time. If the software gets better, that is where it comes from, not from pretending the agent guessed everything.

## Not magic AI

Show me coding agents, not magical AI.

I say "coding agent" because I avoid "AI" here. Whether the tool uses AI under the hood does not matter. "Coding agent" says the useful part: the tool changes a project and gives you back a patch to review.

I do not mention product names. I want vendor independence. This book takes the same stand.

I do not care about a vendor's claimed strengths or unique qualities. Those change. The agent only needs to inspect the project, propose a change, run checks, and create the patch. If one agent stops fitting, I replace it. If two are useful on the same change, I run both and compare the patches.

Treat the agent as magic and the developer gets careless. Treat it as implementation labor and the developer stays responsible for the input.

Give the agent a vague instruction, and it fills the gap. That usually fails. Show it an old pattern in the codebase and it copies the pattern. Leave last month's architecture rule in a meeting, and the agent never sees it.

## The mindset shift

The old habit is to think in tasks: build this endpoint, fix this bug, refactor this module.

With coding agents, the safer habit is to think in terms of intent: which decision limits the work, what behavior should change, what should stay alone, and what makes the change ready to merge.

Most AI coding advice loses me here. It talks about prompts, models, autocomplete, demos, and the next feature you are told you need. It compares products instead of asking what the team needs to document before an agent touches code. Then it skips the part that makes software professional: decisions, boundaries, trade-offs, security restrictions, existing structures, tests, and review.

When working on security, the agent starts from the current security practice and the governance rules the company and team selected. There is no room for improvisation here.

The decisions, checks, and constraints belong to the product whether the code was typed or generated. Code still matters, but with coding agents it starts to look more like output than authorship. I read the shift as a compiler shift: a compiler translates source into machine code, and a coding agent translates intent into application code.

Software engineering has been moving in this direction for years. Developers already write one artifact and let tools emit another. Coding agents push the same move one layer up. The maintained artifact is no longer only code the compiler accepts. It is also the written intent the developer uses in review to justify the patch.

## The shared workspace

The team also needs a source-controlled workspace where production work lives.

Solo prototyping is often a chat window, a pasted stack trace, and a throwaway patch. No ceremony, no shame.

For maintained software, the workspace becomes the shared input surface. Developers read the files. Reviewers inspect the diff. The next agent session loads the repo state, not the previous chat history. The work in the repo becomes the input to the next patch.

If a decision creates a coding convention, put it in a file the next session loads. If one rule keeps showing up in review comments, move it out of the thread and into instructions. If a diagram defines a boundary, store it in Mermaid or another text format the team can diff and the agent can read.

Readable is not enough when the artifact does not enforce itself. The stronger rule is the one a check can fail on: an ADR with a required status field, a spec with AC IDs, a hook that runs after file edits. Intent a machine checks survives longer than intent a teammate has to remember.

## Documentation before code

The most uncomfortable part of this mindset is to write the documentation that the current state of the product needs, prior to the implementation.

Not a huge design document. Not waterfall cosplay. Prototypes need less documentation than a fully populated module. But do not hide behind "the code speaks for itself". It will not tell the next developer which choice mattered, which restriction was non-negotiable, or why the obvious shortcut was rejected.

The inversion still feels odd: developers used to protect the code because writing it was expensive. Now the expensive part is the decision, the checks, and the shared understanding of where the change fits.

Code without documented intent preserves old decisions without their rationale. The next agent sees the current shape, copies it, and turns an old compromise into the default for the next patch.

## One stack at a time

If your system has a front end, a BFF, and a back end, those are different working contexts. A front-end change should not drag in every back-end detail. A back-end change should not pull a component library into the session. These are pragmatic scope rules, not a field standard. Combine every stack into one task, and the agent starts defining limits you should have scoped out.

This is where stack sprawl turns into a retrieval failure. The agent searches across the front end, BFF, and back end, picks a plausible file in the wrong tier, and extends it. The reviewer then has to explain which repo boundary or API contract should have constrained the search space before implementation started.

## What this book is about

The developer still owns the decisions. The agent pushes on the design, implements the change, and writes tests. Responsibility does not move. The keyboard load does.

The term this book uses, Intent Engineering, covers a narrower practice: making decisions, docs, specs, checks, and reviews available to the agent as input.

Spec-driven development is one engine for this work, but not the whole discipline. OpenSpec is the workflow this book uses because it gives the agent named files, a lifecycle, and proof hooks it can work from. Give the agent explicit inputs or it will infer from whatever happens to be in the codebase.
