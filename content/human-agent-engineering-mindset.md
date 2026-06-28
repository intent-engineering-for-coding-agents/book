# The Human-Agent Engineering Mindset

The problem is not whether developers should use artificial intelligence (AI). The problem starts after the prototype works, when the team keeps treating the coding agent like a magic chat box.

I do not want a coding agent to guess what I meant from one prompt. I want the agent working inside the same engineering system I use: the code, the decisions, the documentation, the tests, the review, and the constraints around the change.

Coding agents are good at coding. That is the trap. They do not come with knowledge of your rules, your constraints, or your taste.

Give the agent the information you would give a teammate before asking them to change the code. Then improve how you give that information the next time. Better software comes from that loop, not from pretending the agent guessed correctly on its own.

## Not magic AI

I say "coding agent" because I deliberately do not want to say "AI", which is a misused term. Whether the tool uses AI under the hood is not the point here. "Coding agent" says what matters here: the tool changes a project and hands you a patch you still have to review.

I avoid product names because I do not want vendor lock-in. Not for me. Not for the team. The book inherits that stance, but the book did not create it. I had this opinion before I knew I would write a book.

I do not care much about the individual strengths, weaknesses, or special features of each coding agent. Those details change. The agent only has to be strong enough to inspect the project, make a change, run checks, and produce a patch. If one agent stops being the best fit, I replace it the same way I would replace a framework. If two agents are useful for the same change, I run both and compare the patches.

Treat the agent as magic and the developer gets sloppy. Treat the agent like a teammate doing implementation work, and the developer becomes responsible for the input.

Give the agent a vague instruction, and the agent will try to fill the gap. I expect that to fail. Show the agent an old pattern in the codebase and the agent copies the pattern. Leave last month's architecture rule in a meeting, and the agent does not know the rule exists.

## The mindset shift

The old habit is to think in tasks: "build this endpoint", "fix this bug", "refactor this module".

With coding agents, the better habit is to think in intent: which decision constrains the work, which behavior should change, which behavior should stay untouched, and what would convince you the result is ready to merge.

This is where most AI coding advice loses me. The advice talks about better prompts, better models, better autocomplete, better demos, and the next killer feature you are told you cannot live without. It compares agent products instead of asking what the team must write down before an agent changes the code. Then it skips the part where professional software work lives: decisions, boundaries, tradeoffs, security constraints, existing patterns, tests, and review.

For security work, the agent should start with established security practice, then follow the governance rules, frameworks, and patterns the company and team have chosen. This is not a place for improvisation.

The decisions, checks, and constraints are part of the product. Code still matters, but with coding agents, code starts to look more like generated output. I read the shift as a compiler move: a compiler turns source code into machine code, while a coding agent turns intent into application code.

Software engineering has been moving in this direction for a long time. Developers keep pushing authored intent upward and letting tools produce lower-level artifacts from it. Coding agents push the same move further. The maintained artifact is no longer only the code the compiler accepts. It is also the intent the developer is willing to defend in review.

## The shared workspace

A team already has a place where production work becomes real: the source-controlled workspace.

For a solo prototype, a chat window is enough. Ask for a script, paste the result, throw the experiment away. No ceremony is required, and no guilt.

For software someone has to maintain, the workspace becomes a shared memory. Developers read the files. Reviewers inspect the diff. Coding agents load the available project context at the start of the next session. The work stops being one conversation and becomes input for the next change.

If a decision changes how code should be written, the decision belongs where future work will read it. If a rule keeps coming back in review comments, the rule belongs somewhere more durable than the review thread. If a diagram explains a boundary, the diagram should live in a form the team and the agent can easily read.

Push past readable where the artifact allows. The strongest rule is the one the tooling enforces on its own: a linted ADR, a spec the agent has to satisfy before the change counts. Intent a machine runs outlasts intent a developer has to remember.

## Documentation before code

The strongest version of this mindset is uncomfortable: write the documentation the current product stage needs before the implementation.

Not a giant design document. Not waterfall cosplay. A prototype needs less documentation than a product with customers, compliance, uptime, and a team on call. But do not hide behind "the code is self-explaining". The code will not tell the next agent which decision mattered, which constraint was non-negotiable, or why the obvious shortcut was rejected.

The inversion still feels strange. Developers learned to protect code because code was expensive to write. With coding agents, the expensive parts move up: the decisions, the checks, and the shared understanding of where the change fits.

Delete generated code and a well-informed agent writes another version. Delete the intent, and the next agent copies whatever shape the current code happens to have.

## One stack at a time

If the system has a front end, a Backend for Frontend (BFF), and a back end, those are different working contexts. A front-end change should not ask the agent to reason over every back-end implementation detail. A back-end change should not drag the component library into the session. This is my practical scoping rule, not a field standard. Mix every stack into one task, and the agent starts choosing boundaries the developer should have chosen.

This is where agent work turns into archaeology. The agent searches, finds something plausible, and follows the path. The reviewer then has to explain which part of the system the agent was supposed to ignore.

## What this book is about

The developer still decides. The agent helps reason, writes implementation, runs checks, and exposes gaps. Responsibility stays with the developer. The developer spends less time typing code and more time deciding what the change is allowed to do.

Intent Engineering is the name this book gives to that discipline, though not the whole philosophy behind it. The practice itself is narrow: turning decisions, documentation, specs, checks, and review into input the agent can use.

Spec-driven development is one motor for the work. OpenSpec is the motor used in this book. But the deeper point comes first: stop asking a magic box to guess. Give the agent something concrete to work from.
