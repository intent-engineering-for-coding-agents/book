> *To my coworkers at Elsevier in Aalborg and my dearest friends, who are always happy to talk about AI.*

# Preface

I wrote this book out of irritation. Not at the coding agents, but at the advice around them.

2026: If you were to click open my developer feeds any peaceful afternoon, you would be greeted with another carousel of angry titles:

- "Start an AI coding side hustle".
- "How I built a SaaS in a few weeks".
- "How to make money with vibe coding".
- "One prompt refactored my entire codebase".

Fine. Good for them. But I just keep scrolling and waiting for the part that will never come: How? How did you do it? What did the codebase look like at week 2 when it all failed? What did you tell the agent? What did you burn? What broke in production?

That detail is usually absent. Though one-pagers are too thin to explain why the second week failed, which assumption broke, or which test exposed the flaw. The omission looks less like brevity than avoidance.

This book answers one question: how do you use coding agents in professional software work. Not the demo that looks clean on Tuesday and falls apart by Friday.

Vibe coding is fine for quick prototypes and mocks.

Use it when you need a screen mock, a rough feature sketch, or a quick way to tease requirements out of somebody who cannot state them cleanly yet.

The prototype is not the product. Throw it away and start again with the real requirements.

This should not be new advice. Fred Brooks wrote it down in 1975: plan to throw one away. You will anyway. In 1975, throwing work away hurt, since rebuilding from scratch took weeks.

*Sources: Frederick P. Brooks Jr. "The Mythical Man-Month: Essays on Software Engineering" (1975), plan to throw one away.*

In 2026, when most of the build is done by a coding agent, that second pass is cheaper. Rebuilding is less painful than it was when a fresh start took weeks.

The second build is sharper. The dead ends are gone. The framework is chosen. The prototype was the conversation, not the artifact.

For this book, I write "coding agent" where many would write "AI". A coding agent is an LLM used as a developer tool. "Intelligence" is a marketing choice, not the technical point here.

A coding agent is not reading your mind. In 2026, a vague prompt still produces the wrong code in production work. State the rules, the intent, and the stack. Use the agent as a sparring partner for architecture and design, but keep the thinking on your side.

That is the purpose of the book. The machine writes more of the code. You do more of the hard thinking: what gets built, which scope is justified, which tradeoff is worth paying, and which tests must pass before merge. You become a writer, not a typist.

This book does not review or rank agents. The agent is the worker. The load-bearing variable is the input: the instructions, docs, specs, and checks you give it.

Context is most of the game. Do not cram a project into one prompt. Keep the decisions in plain-text documents and diagrams the agent can load again next month. Without that, every session re-creates the same conventions, reopens settled decisions, and ships code that breaks the constraints nobody wrote down.

## From Vibe to Pro
This is the part the carousels leave out. Give the agent the current repo facts, the active constraints, and the acceptance criteria, and the work moves from rough prototype to production software. The hard part is not the code. The hard part is choosing the limits and proving the result stayed inside them.

Software development still needs judgment. I expect better models and more automation, and I will update this preface as that line moves. In 2026 the job still belongs to developers and reviewers: choose the scope, set the constraints, and reject code that misses both.

The rest of the book starts with one shift in thought: the source-controlled workspace is no longer only for developers reading code. It is where the next agent session finds the ADR, the spec, and the rule you do not want re-litigated.

---

*Flemming Nørnberg Larsen, 2026*
