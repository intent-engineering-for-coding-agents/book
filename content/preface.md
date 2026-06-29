> *To my coworkers at Elsevier in Aalborg and my dearest friends, who are always happy to talk about AI.*

# Preface

I wrote this book simply out of exasperation. Not at the coding agents, but at the advice concerning them.

2026: If you were to click open my developer feeds any peaceful afternoon, you'd be greeted with another carousel of an angry title:

- "Start an AI coding side hustle".
- "How I built a SaaS in a few weeks".
- "How to make money with vibe coding".
- "One prompt refactored my entire codebase".

Fine. Good for them. But I just keep scrolling and waiting for the part that will never come: How? How did you do it? What did the codebase look like at week 2 when it all failed? What did you tell the agent? What did you burn? What broke in production?

That is most often absent. Though pages are too obvious to be taken seriously, the real answer is missed intentionally. I think because honesty is too much to fit on a one-pager.

This book is my answer to this question: how can one use coding agents in a professional way to develop actual software. Not the kind of demonstrations that we show successfully on a Tuesday… and that break down on Friday. Allow me to preface this by saying just a couple of words.

Vibe coding is fine. On the other hand. It is great for quick prototyping and mocks.

Useful when you need to get something on a screen for the customer, get a sense of a feature, extract requirements from someone who can't quite say them out loud, or try out three competing frameworks in parallel to see which one fights you least. Which is its use for me.

Yet a vibe-coded prototype is doomed to become a production system. Usually, the best thing to do is to discard the prototype and begin anew, this time with the true requirements.

This shouldn't be new advice. Fred Brooks wrote it down in 1975: plan to throw one away. You will anyway. In 1975, throwing work away hurt, since rebuilding from scratch took weeks.

*Sources: Frederick P. Brooks Jr. "The Mythical Man-Month: Essays on Software Engineering" (1975), plan to throw one away.*

For the build today in 2026, where the major part of the construction is done by a coding agent, the rebuild price is, however, often lower. Ditching the prototype is more often an option rather than it was when a zero from scratch build might have taken weeks.

The second build makes each lesson every iteration better than it was the one before. For every "chunk" the prototype used to teach, the second build makes it more focused; every dead end is already gone; every framework is already selected. The prototype was the conversation, but not the artifact.

For the purposes of this book, I write "coding agent" in places where many would write "AI". A coding agent is an LLM that one deploys as a developer tool. To call this "intelligence" is a marketing decision, not a technical one, and I am not trying to write marketing!

A coding agent is not some magic box that is reading your mind. As of 2026 it won't reliably spit out the code you intended in production work from some vague prompt. If you have something in mind, you need to spell out what you need to the agent. Spell the reqs out; state the rules, the intention, the tech stack. Use the agent as a sparring partner to keep your architecture sharp and your design tight, but all the thinking is still on your side.

That's the purpose of the book. The machine takes care of writing more of the code. Meanwhile, you do more of the high-level thinking: what should be built, what is the appropriate scope, which costs are justified, what testing is necessary to get it merged? You become a writer, not a typist.

Finally: this book does not review the agents nor rank any agents. The agent is the worker and the enemy. How you select and employ it is irrelevant, but what you say to it is.

Context is most of the game. Instead of every session trying to cram everything into another one-shot prompt, the ones you end up retyping the next day carry your context on documents plain text and diagram real semantics, the shared memory that you and the agent re-retrieve a month from now. Without that, it re-creates the very same conventions at every session, re-litigates decisions you've already made, and ships code that compiles and breaks the constraints you never documented.

## From Vibe to Pro
This is the portion carousels omit. Provide your agent with enough current details about the system you want built and sustained, and you go from rough prototypes toward production standards. That eventual information does not vanish when the agent codes. It is the more challenging half: the choices, the limitations, the verification that the outcome reflects them. The carousels leap over this because it doesn't market.

Finally, software development remains a human activity requiring skill and judgment. Humans must remain in the loop. I expect better models and increased automation. I will update this preface as that boundary shifts. In 2026 the job is ours: to be deliberate, to be professional, and to do the part of the job humans continue to do best.

The rest of the book begins with a change of thought: the source-controlled workspace is not just for humans anymore. It is the touchpoint of humans and coding agents, the only place the durably held intent can reside if the code is to last in the long term.

---
All of the writing in this book was done in and around the city of Aalborg on the north coast of Denmark. To me, Aalborg symbolizes serious software development.

*Flemming Nørnberg Larsen, 2026*
