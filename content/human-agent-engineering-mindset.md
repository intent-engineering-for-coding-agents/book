# The Human-Agent Engineering Mindset

The real problem is not whether developers should use AI. The real problem begins once the prototype works, and the team keeps calling the coding agent the magic chat box.

What I do want is for a coding agent not to have to try to figure out everything from a single prompt. What I want is an agent that works within the same engineering environment I do: the code, the decisions I make, the documentation, the tests, the review, and any constraints on how the change can be made.

Coding agents are good coders. That is the trap. They do not come with knowledge of your rules, your constraints or your taste.

Provide the agent with the information you would give a teammate before asking them to change the code. Then, the next time you provide that information, do it more smoothly. If the software were better, that is where it would come from, not acting as if the agent has guessed everything on its own.

## Not magic AI

Show me not MagIcal Ai in action.

I say "coding agent" because I selectively prefer not saying "AI", which is corrupted. If the tool really uses AI under the covers does not matter here. "Coding agent" says what matters here: the tool modifies a project and gives you back a patch to review.

I do not mention product names. I want to maintain vendor independence. Not for me. Not for us. This book takes the same stand, but I did not come up with this idea for lack of vendors.

Honestly, I do not care about how the coders' individual strengths, weaknesses or unique qualities, because those always change. The agent needs only to be strong enough to inspect the project, propose a change, run checks, and create the patch. If one agent is no longer the best match, then I will replace it just as I would replace a framework. If two agents happen to be helpful for the same change, then I will run both against a project and compare the resulting patches.

You treat the agent as magic, and the developer gets careless. You treat the agent as a buddy doing implementation work, and the developer is responsible for the input.

Give the agent a vague instruction, and the agent will try to fill the gap. I expect that to fail. Show the agent an old pattern in the codebase and the agent copies the pattern. Leave last month's architecture rule in a meeting, and the agent does not know the rule exists.

## The mindset shift

The old habit is to think in tasks: build this endpoint, fix this bug, refactor this module.

In coding agents, the safest habit is to think in terms of intent: what one decision limits the work, what behavior should change, which should be left alone and what would turn the agreement ready to merge.

Most AI coding advice loses me here. The advice references better prompts, better models, better autocomplete, better demos, and the next killer feature you are told you cannot do without. It compares agent products instead of saying, "What does the team need to document before an agent even has the potential to alter code?" Then it brushes past the part of professional software which makes it decisions, boundaries, trade-offs, security restrictions, existing structures, tests, and review.

A work on security, the agent will have to begin with a current security practice and then apply the governance rules, models and security pattern selected by the company and team. There is no room for improvisation here.

The decisions, checks, and constraints are inherent in the product. Certainly code still matters, but with coding agents, code becomes more like generated output. I read the shift as a compiler shift: a compiler translates a source into machine code, a coding agent translates intent into application.

Software engineering has been heading there for quite some time now. Developers continue to raise authored intent and have tools produce lower-level artifacts from it. Coding agents take this action another step further. The maintained artifact is no longer just the code that the compiler will accept; it is also the intent that the developer is prepared to defend in review.

## The shared workspace

The team also has its own place where the production work turns into a concrete source-controlled workspace.

Solo prototyping, indeed, is only a handful: it always comes to a chat window. Script-generation, pasting-in, trash and carry on. No ceremony, no shame, no embarrassment.

For the software to be maintained, the workspace is turned into shared-memory. The developers read the files. The reviewers examine the diff. The coding-agents load the current project's context at the beginning of the following session. The work is no more than a continuous discussion. It is the input for the following change.

If a decision causes a code-writing convention to be established, then it is a decision that belongs where the future work will read it. If one rule consistently emerges in review comments, then that rule belongs where it is permanently accessible rather than in the review thread. If a diagram describes a boundary, then the diagram is best stored in a format digestible to the team and agent.

Proceed beyond readable when the artifact will not. The best rule of all is what the tooling can impose on itself: a linted ADR, a spec you are expected to meet before the change matters. An intent a machine executes is longer-lived than an intent a developer has to memorize.

## Documentation before code

The most uncomfortable of this mindset is to write the documentation the current state of the product needed, prior to the implementation.

Certainly not a huge design document. Certainly not due to waterfall cosplay. Prototypes require less documentation than a fully populated module for a customer to meet standards, be online, or be supported by a team. But do not hide by saying "the code speaks for itself". It will still not tell the next developer which choice was crucial, which restrictions could not be compromised, or why the clear-by-default shortcut was not taken.

The inversion still seems odd: developers protected their code because coding was costly now the costly aspects have moved up the decision, the checks, the shared understanding of where the change fits…

Delete code appears to be generated, and a knowledgeable agent would produce a different version. Remove the intent, and the next agent simply copies whatever form the current code occurs to be in.

## One stack at a time

If you have got the system with a front end, BFF and a back end, they are different working contexts. A front-end change should not ask the agent to think through all back-end details. A back-end change should not drag a component library into your session. These are just my pragmatic scope rules, not some field standard. Combine every stack into one task, and your agent begins to define limits that you should have scoped out.

This is where agent work becomes archaeology. The agent searches, discovers a reasonable candidate, and proceeds down the path. In this case, the reviewer has to clarify what half of the system the agent should not have taken into account.

## What this book is about

There are still the developer's decisions. It is the way the agent helps the reasoning, and implements, the tests, tell the reach gaps. The responsibility remains within the new developer. The new developer is typing less.

The term for this discipline the book refers to as Intent Engineering, however, encompasses a more complete philosophy. The actual practice is very limited, involving making decisions, docs, specs, checks, and reviews available to the agent as input.

Spec-driven development is one of the motors for this work, but it is not the entire discipline. OpenSpec is the motor for this book. OpenSpec is good for the documentation, structure, and proof that the coding agent did what you wanted. Give the agent something concrete to work with.
