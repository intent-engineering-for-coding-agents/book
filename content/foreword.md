For my father, Bent N. Larsen (d. 2022), who gave me my first computers, a Lambda 8300 and a Commodore VIC 20, and kickstarted my career.

# Foreword

I'll be honest about why I wrote this book.

Open any developer feed on any given morning, and you'll find another carousel: "The 14 skills you need to master Claude Code." "How I built a SaaS in 3 weeks and made $40k." "Why every developer must learn AI agents NOW." "BUILD FASTER WITH SMART AI TOOLS (2026 EDITION)." Fine. Good for them. But I keep scrolling and waiting for the part that never comes: how. How did you do it? What did the codebase look like at week two when nothing worked? What did you tell the agent? What did you throw away? What broke in production?

That part is always missing. I think it's missing on purpose because the honest answer doesn't fit on a one-pager.

This book is my attempt at the honest answer. This book is about using coding agents responsibly and professionally to build real software. Not the kind that demos well on a Tuesday and falls apart on a Friday.

Let me say a few things up front.

Vibe coding is fine. In its place. Vibe coding excels at fast prototyping and mockups. It's useful when you need to put something on a screen for a customer, get a feel for the shape of a feature, pull requirements out of someone who cannot quite articulate them, or try three competing frameworks side by side to see which one fights you the least. I use it for exactly that.

But a vibe-coded prototype has no business growing into a production system. The right move, almost always, is to throw away the prototype and start over with the real requirements in mind. This isn't new advice. It has been a mantra for decades, and decades ago it came with a caveat: throwing away hurt. Rebuilding from scratch costs weeks. Today with a coding agent doing most of the construction, the rebuild cost collapses. Throwing away the prototype is no longer a painful decision. The second build is better for every lesson the prototype taught: requirements sharpened, dead ends already eliminated, framework already chosen. The prototype was the conversation, not the product.

The agent is not a magic box. The agent will not read your mind. The agent will not produce the code you intended on its own. Not today, and not by wishing harder at the prompt box. If you have something in mind, you have to tell the agent. Spell out the requirements. State the rules, the intention, the tech stack. Use the agent as a sparring partner to sharpen your architecture and tighten your design, but the thinking still starts with you.

One more thing: this book does not review agents or rank them. The agent is the labor and the sparring partner. Which labor you hire is not the point. What you tell it is.

Context is the whole game. Rather than cramming everything into one-shot prompts you'll retype the next day, persist your context in documents: plain text and diagrams with real semantics, the shared memory both you and the agent re-read a month from now. Do this and the quality of the work jumps in a way that feels almost unreasonable. Skip this, and you'll be vibe-coding forever, wondering why your agent keeps "forgetting".

## From Vibe to Pro

Here is the part the carousels leave out. Give the agent enough up-to-date information about the system you intend to build and maintain, and you move past prototypes into production-grade software. But there is no shortcut around the work software developers have always been expected to do: proper analysis, design, coding, testing, deployment. Exactly what we were taught in school and university, and exactly what the carousels skip because it doesn't sell.

Software development still demands skill and judgment. Humans must stay in the loop. The agent will catch up to more of this eventually, and when it does, I'll happily revise this foreword. But for now the responsibility is ours: to be deliberate, to be professional, and to do the part of the job humans still do best.

This is what the rest of this book is about. The how.

---

I wrote this near Aalborg, in northern Denmark. Aalborg has been building software seriously and ambitiously for a long time, without much noise about it. That is the spirit this book tries to follow.

*Flemming Nørnberg Larsen, 2026*
