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

Software engineering has been moving there for years. Developers raise authored intent and have tools produce lower-level artifacts from it. Coding agents push the step further. The maintained artifact is no longer just code the compiler accepts. It is also the intent the developer is prepared to defend in review.

## The shared workspace

The team also needs a source-controlled workspace where production work lives.

Solo prototyping is usually just a chat window, some pasted code, and a quick throwaway result. No ceremony, no shame.

For maintained software, the workspace becomes shared memory. Developers read the files. Reviewers inspect the diff. The next agent session loads the project context from the repo. The work becomes the input for the next change.

If a decision creates a code-writing convention, it belongs where future work will read it. If one rule keeps showing up in review comments, it belongs where it is permanently accessible, not buried in the thread. If a diagram describes a boundary, store it in a format the team and agent can read.

Readable is not enough when the artifact does not enforce itself. The stronger rule is the one tooling can enforce for you: a linted ADR, a spec the change must satisfy. Intent a machine executes lasts longer than intent someone has to remember.

## Documentation before code

The most uncomfortable part of this mindset is to write the documentation that the current state of the product needs, prior to the implementation.

Not a huge design document. Not waterfall cosplay. Prototypes need less documentation than a fully populated module. But do not hide behind "the code speaks for itself". It will not tell the next developer which choice mattered, which restriction was non-negotiable, or why the obvious shortcut was rejected.

The inversion still feels odd: developers used to protect the code because writing it was expensive. Now the expensive part is the decision, the checks, and the shared understanding of where the change fits.

Code without documented intent looks generated, and a knowledgeable agent would produce a different version. Remove the intent, and the next agent just copies the current shape.

## One stack at a time

If your system has a front end, a BFF, and a back end, those are different working contexts. A front-end change should not drag in every back-end detail. A back-end change should not pull a component library into the session. These are pragmatic scope rules, not a field standard. Combine every stack into one task, and the agent starts defining limits you should have scoped out.

This is where agent work becomes archaeology. The agent searches, finds a plausible candidate, and proceeds down that path. The reviewer then has to say which half of the system the agent should have ignored.

## What this book is about

The developer still owns the decisions. The agent pushes on the design, implements the change, and writes tests. Responsibility does not move. The keyboard load does.

The term this book uses, Intent Engineering, covers a narrower practice: making decisions, docs, specs, checks, and reviews available to the agent as input.

Spec-driven development is one of the motors for this work, but not the whole discipline. OpenSpec is the engine this book uses. It gives the agent documentation, structure, and proof it can work from. Give the agent something concrete.
