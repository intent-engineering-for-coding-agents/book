> For my colleagues at Elsevier in Aalborg, and for my closest friends, who are always ready to talk about artificial intelligence (AI).

# Foreword

I wrote this book out of irritation. Not at coding agents, but at the advice about them.

In 2026, if you open my developer feeds on any given afternoon, you will find another carousel with a headline like:

- "Start an AI coding side hustle".
- "How I built a SaaS in a few weeks".
- "How to make money with vibe coding".
- "One prompt refactored my entire codebase".

Fine. Good for them. But I keep scrolling and waiting for the part that never comes: how? How did you do it? What did the codebase look like at week two when nothing worked? What did you tell the agent? What did you throw away? What broke in production?

That part is usually missing. What does make the page is too obvious to take seriously. The real answer is left out on purpose, I think, because honesty does not fit on a one-pager.

This book is my attempt at that answer: how to use coding agents responsibly and professionally to build real software. Not the kind that demos well on a Tuesday and falls apart on a Friday.

Let me say a few things up front.

Vibe coding is fine. In its place. It excels at fast prototyping and mockups.

It is useful when you need to put something on a screen for a customer, get a feel for the shape of a feature, pull requirements out of someone who cannot quite articulate them, or try three competing frameworks side by side to see which one fights you the least. I use it for exactly that.

But a vibe-coded prototype has no business growing into a production system. The right move, in most cases, is to throw away the prototype and start over with the real requirements in mind.

This is not new advice. Fred Brooks wrote it down in 1975: plan to throw one away. You will anyhow. In 1975, throwing work away hurt because rebuilding from scratch cost weeks.

*Sources: Frederick P. Brooks Jr. "The Mythical Man-Month: Essays on Software Engineering" (1975), plan to throw one away.*

Today, in 2026, when a coding agent does most of the construction, the rebuild cost often drops sharply. Throwing away the prototype often stops being a multi-week decision.

The second build is better for every lesson the prototype taught. The requirements are sharper, the dead ends are already gone, and the framework is already chosen. The prototype was the conversation, but not the product.

In this book, I write "coding agent" where many people say "AI". A coding agent is a large language model (LLM) used as a development tool. Calling it "intelligence" is a marketing choice, not a technical one, and this book is not in the marketing business.

A coding agent is not a magic box and cannot read your mind. As of 2026, it does not reliably produce the code you intended from a vague prompt. If you have something in mind, you need to tell the agent. Spell out the requirements. State the rules, the intention, the tech stack. Use the agent as a sparring partner to sharpen your architecture and tighten your design, but the thinking stays with you.

One more thing: this book does not review agents or rank them. The agent is the labor and the sparring partner. Which labor you choose to hire is not the point, but what you tell it is.

Context drives most of the outcome. Rather than cramming everything into one-shot prompts, the kind you retype the next day, persist your context in documents: plain text and diagrams with real semantics, the shared memory both you and the agent re-read a month from now. Without that, the agent re-derives the same conventions every session, re-litigates decisions you already made, and ships code that compiles while violating the constraints you never wrote down.

## From Vibe to Pro

Here is the part the carousels leave out. Give the agent enough up-to-date information about the system you intend to build and maintain, and you move past prototypes into production-grade software. You still do the work: analysis, design, coding, testing, and deployment. The carousels skip that because it does not sell.

Software development still demands skill and judgment. Humans must stay in the loop. I expect models to improve and automation to expand, and I will revise this foreword as the boundary moves. In 2026 the responsibility is ours: to be deliberate, to be professional, and to do the part of the job humans still do best.

The rest of this book is about the deliberate part: how to hand a coding agent enough durable intent that what it builds survives past Friday.

---

I wrote this near Aalborg, in northern Denmark. I associate Aalborg with quiet, serious software work, and I try to keep this book in that spirit.

Flemming Nørnberg Larsen, 2026
