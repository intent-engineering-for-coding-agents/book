# Voice and Craft

This file defines how the prose should sound. `writing.md` covers mechanics: audience, length, sources, structure. This file covers the part that makes a chapter feel lived-in instead of generic.

## Core philosophy

The book is not documentation. It is also not performance writing. The story lives in the technical tension: failure mode, constraint, control, tradeoff. A chapter should read like a developer explaining what broke, what fixed it, and what the fix cost.

The prose must never feel:

- corporate
- generic
- academic
- sanitized
- agent-generated
- excessively polished

A reader who skims any paragraph at random should think: this came from experience, not from summarizing documentation. The same reader should never wonder why the paragraph exists.

## Register anchor

The author is an experienced developer who teaches with their sleeves rolled up. Pedagogical, genuinely enthusiastic without selling anything, with a taste for dark humor that lands on something technically true. The person who is always in good spirits but is not shy about calling something a mess, and finds it slightly funny. Not academic. Not corporate. More: "Let me show you something interesting, and let me tell you what goes wrong."

This is analogous to "science teacher with a smile" but calibrated for a senior engineering audience. The pedagogical instinct: intuition comes before mechanics. Show what breaks first, so the reader understands why the solution looks the way it does. Build understanding; don't dump.

## Voice and tone

Pragmatic. Technically ambitious. Occasionally skeptical. Calm but opinionated. Curious. Precise. Slightly conversational.

Confidence without arrogance. Realism without cynicism. Enthusiasm without hype.

## Writing characteristics

### Paragraph discipline

Max 4 sentences per paragraph. Vary length aggressively. A 1-sentence paragraph after a 4-sentence paragraph is a rhythm, not a mistake. Three paragraphs of the same visual length in a row is an agent-writing tell. Break one of them.

### Open with tension, not framing

A section that opens "Without X, Y is impossible" is opening with framing. A section that opens with a contradiction, a surprise, a constraint that bites, or a claim worth arguing is opening with tension. Tension goes first; framing comes after.

Bad: "Agentic systems are increasingly important."

Good: "Delete the code. Keep the spec. Regenerate."

The opening sentence should make the reader want the next one.

### Stay on the book's thesis

This is a book about Intent Engineering for Coding Agents. It is not a general software-engineering book with agent nouns pasted on top.

Each chapter needs an agent-specific delta. Name what changes because code is generated, context is partial, intent is externalized, or review has to work from artifacts instead of memory. Generic advice about refactoring, CI, code review, naming, or testing is off-topic until the paragraph states why coding agents change the stakes or the workflow.

The focus test: if a paragraph would survive unchanged in a normal software-engineering book, the paragraph is missing the agent delta or does not belong. Add the missing delta or cut the paragraph.

The section test: if the heading promises PR taxonomy, every subsection should help the reader classify, split, brief, or review PRs in agent-driven work. Background material stays short. The chapter's promise is the filter.

### Never fake a memory

Do not narrate a fabricated specific event in the past tense as if it happened. "The spec had five scenarios. The PR had eight tests. The reviewer approved it" reads as a recalled war story, but nobody lived it. An intelligent reader clocks the invented precision, and it quietly contradicts the book's provenance discipline: rigorous `Sources:` lines under prose that opens with an unsourced invented event. The book draws on the published evidence base; it does not invent personal experience or anonymous anecdotes dressed as observed fact.

Invented round-but-precise numbers are the loudest tell. "Forty-seven acceptance criteria across twelve scenarios", "by scenario eighteen", "three days writing it": drop them. A real memory carries fewer specifics, not more.

When you need a concrete scenario, mark it as the hypothetical it is. Permitted, honest opening devices:

- A claim or thesis stated and then defended: "Code is increasingly generated. Specs are authored."
- A second-person present situation addressed to the reader: "The architecture diagram for your most important service is in a Keynote file on a laptop that left the company two months ago."
- An explicitly-marked hypothetical: "Consider a spec with forty acceptance criteria. Hand it to the agent and the first twenty land; the rest get improvised."
- A sourced fact or published failure from the References base, attributed inline.
- A genuinely open rhetorical question, or an imperative the chapter then unpacks.

State what the chapter is about early, then reach for one of these. Vary the device across chapters. If three chapters in a row open "Consider that...", that is the same monotony the past-tense anecdote created. Mix claim, question, second-person situation, sourced fact, and hypothetical.

### Engineer language, not marketer language

Forbidden words and phrases (full list below). Preferred language: retries, deadlocks, queues, corrupted state, token limits, runaway execution, latency spikes, broken deployments, stale cache, incoherent merge.

Concrete operational nouns. Verbs that describe what the code does, not what the code aspires to. The reader is an engineer; speak like one.

### No throat-clearing or scenic setup

Do not spend sentences announcing that the topic matters, setting mood, or warming up. Cut lines like "Software teams have always wrestled with complexity", "This matters more than ever", or "Modern systems are intricate". These lines carry no technical load.

The usual hiding place is the first two paragraphs of a section. If a paragraph does not introduce a concrete problem, control, tradeoff, or question, cut it.

#### Technical term over literary paraphrase

Reach for the precise software term before any everyday metaphor. The book documents machine behavior. It is not a poem. When a standard term names the thing, an event, a trigger, an exit code, a retry, a race, a queue, cache invalidation, that term is clearer than a phrase that gestures at it.

The paraphrase test. If a sentence describes a runtime concept with an everyday image, and a standard term names that same concept, the image is a rewrite. The substitution test catches abstraction; this one catches dressed-up prose with a real referent underneath.

- "the moment has come" describes an event firing. Write "the triggering event fires."
- "anything that chooses can choose wrong" hides the actual failure. Name it: the command is never typed, or the event is never registered.
- "two doorbells" stands in for two trigger paths. Name them.

Personifying the agent past what it does is the same failure in miniature. "The agent gets no vote" is borderline; "the agent does not decide" says it straight. Reserve the figure of speech for the rare beat that earns it, and default to the term.

### Forbidden words

Never use these words or phrases. Replace or rephrase:

> can, may, just, that, very, really, literally, actually, certainly, probably, basically, could, maybe, delve, embark, enlightening, esteemed, shed light, craft, crafting, imagine, realm, game-changer, unlock, discover, skyrocket, abyss, not alone, in a world where, revolutionize, disruptive, utilize, utilizing, dive deep, tapestry, illuminate, unveil, pivotal, intricate, elucidate, hence, furthermore, however, harness, exciting, groundbreaking, cutting-edge, remarkable, it, remains to be seen, glimpse into, navigating, landscape, stark, testament, in summary, in conclusion, moreover, boost, skyrocketing, opened up, powerful, inquiries, ever-evolving, leverage, robust, transformative, unlock potential, seamless, holistic, comprehensive solution, recipe

Notes:
- "cannot" is acceptable as a negation; "can" as a positive modal is not
- "it" with a clear, named antecedent is usually fine; "it" as a vague subject ("it is important", "it turns out") is not
- "that" as a relative pronoun is sometimes unavoidable; avoid it where restructuring is easy
- Avoid constructions like "not just X, but also Y." Rewrite as two direct sentences.

### Include real failure modes

Cite the published failures: cognitive debt, agent-accelerated drift, dead specs, scaling cliffs in coordination. The book has a References section for a reason. Use it as texture, not as a footnote afterthought.

The voice draws on the published evidence base. It does not invent personal experience. "ThoughtWorks Radar Vol 34 calls this cognitive debt: the agentic-era version of the undocumented decision that quietly breaks a deploy at 3am" is both true and textured. "I once debugged this for 14 hours" is texture the agent cannot honestly claim.

### Vary rhythm aggressively

Mix short sentences with long explanations. Mix abrupt observations with reflective paragraphs. Mix compact technical detail with broader implication.

Avoid identical paragraph lengths. Avoid balanced cadence throughout a section. Symmetrical prose is what agent drift looks like at the paragraph level.

> The architecture looked elegant.
>
> Production disagreed.

Avoid serial staccato openings that repeat the same subject shape: "The agent commits. The PR opens. The reviewer..." This is grammatical English, but repeated use sounds staged and agent-written. Use it only as a rare deliberate beat. Most of the time, combine the action into a natural sentence or put the tension first.

### Vary construction, not just length

Rhythm is sentence shape, not only paragraph height. A section can vary its paragraph lengths perfectly and still read like a wall of aphorisms, because every sentence is built the same way. Three constructions are the usual agent tells. Each is a sharp tool once. Stacked, they read as staged.

- **Copula maxims.** Short "X is Y" or "X is not Y" equations: "Instructions are passive." "Vague instructions are not neutral." "That is the point." More than two carrying the argument of a section is a tell. Rewrite some to show the thing happening instead of defining it.
- **Balanced contrast pairs.** "X does A. Y does B.": "Positive instructions tell the agent what to do. Negative instructions tell it what not to do." One per section is a tool. Two or more turns the section into a metronome. Dissolve the extra pairs into ordinary prose.
- **Triple parallels.** Three items in matched cadence: "the library you chose, the module boundary you drew, the naming convention your team settled." One or two across a chapter is fine, especially when each lists genuinely distinct things. Three or more is the agent reaching for the same rhythm. Cut some to two items, or break the parallelism.

Those thresholds are per section. There is a chapter-level version that hides from them: a contrast pair in one section, a copula stack in the next, a triple parallel in the one after. No single section trips a count, yet the whole chapter runs on the same three-tool kit. That is the same monotony spread thin, and it is the more common form. Read the chapter end to end and ask which shapes carry it. If the answer is these three, vary them even where no section is over its count.

The test: read a section aloud. If you predict the shape of the next sentence before you reach it, the construction is too regular. Break the pattern that repeats. These are thresholds that trigger a rewrite, not absolute bans. The point is variety, not a quota.

### Respect reader intelligence

Do not define obvious engineering concepts. Do not repeat the same idea three times in different words. Do not summarize excessively. Do not explain what a PR is, what CI does, what a feature flag is.

Cut every sentence that re-explains. Cut every transition that announces what the next paragraph will say. The reader is paying attention.

### Compression over coverage

One sharp example beats three loose restatements. Do not stack equivalent paragraphs to make a section feel substantial. If two paragraphs do the same job, keep the better one.

Do not widen a chapter into a survey. A chapter is allowed to leave adjacent topics alone. Depth on the promised point is better than a tour of nearby ideas.

### Every paragraph earns its place

Relevance is not enough. The paragraph has to earn the page.

Keep a paragraph only if it advances the chapter's argument, names a concrete failure mode, explains a control, sharpens a tradeoff, or sets up the next question. Background with no chapter-specific payoff is filler, even when the background is true.

The deletion test: remove the paragraph and read the section again. If no argument weakens, no mechanism disappears, no tension drops, and no example is lost, the paragraph did not earn its place. Delete it.

## Technical explanation style

### Explain through situations

Show runtime behavior. Describe execution paths. Demonstrate what fails when it fails.

Bad: "Coordination between components is important."

Good: "The planner generated valid subtasks. The executor completed them. Then the reconciliation layer quietly merged incompatible state."

### Concrete over abstract

Abstraction with no referent is the book's most common failure mode, and the easiest for an agent to produce. Every claim has to point at something a reader could observe: a named file, a command, a flag, an error message, a number, a runtime behavior. This subsection turns "Explain through situations" into a test you can fail.

The substitution test. If a sentence stays true after you swap its subject for an unrelated system, it is abstract. "This practice reduces friction in the development workflow" survives the swap, so it says nothing. "Rename a field in `api-spec.yaml`, skip the regeneration, and the stale types still compile while the client breaks at runtime" does not survive it. Rewrite until the sentence only makes sense for the specific thing you are describing.

The referent test. Read each paragraph and find the concrete noun: a named file, command, flag, error, metric, or observable behavior. A paragraph built only from abstract nouns (workflow, process, mechanism, approach, solution, capability) is a rewrite, not a polish.

Show the break. When you claim something fails, show the symptom. Not "the types drift" but "the client reads a field the server no longer sends." Not "context degrades" but "the agent re-derives in hour two the same import path it knew in hour one."

The honest boundary. Concrete comes from real referents, never invented ones. Naming a real file is concrete. Inventing "forty-seven acceptance criteria" is fabrication. Reach for a named artifact, a real command, a sourced fact, or an explicitly marked hypothetical, and never a precise number you made up. See "Never fake a memory."

### Every design has a cost

When presenting an architecture or practice, name the tradeoff in the same paragraph. The book is suspicious of recommendations presented as universally correct. State what scales, what breaks, what requires ongoing investment.

### Emphasize reality

Context windows fail. Memory becomes inconsistent. Orchestration complexity explodes. Tool reliability matters. Evaluation is hard. Autonomous behavior becomes unpredictable at scale. Ground abstract claims in operational consequences.

## Structural style

### Chapter openings

Open with a strong observation, a surprising truth, a claim worth arguing, or operational tension. The first paragraph creates curiosity. By the end of paragraph one, the reader should already be committed to paragraph two. Use one of the honest devices in "Never fake a memory" above, and pick a different device from the chapters around it. Never open by narrating an invented event as though it occurred.

Compliant exemplars already in the book: `appendices/honest-maturity.md` (second-person imperative), `foundation/plain-text-as-code.md` (second-person present situation), `spec-driven/docs-gt-specs-gt-code.md` (imperative thought experiment), `team/trunk-based-development.md` (sourced fact).

### Section endings

The last paragraph of a section must do one of three things: (a) raise an unresolved tension, (b) name the implication that points forward, (c) pose a question the next section answers. Never a summary. A section that ends by restating what it just covered is a section that trails off.

### Chapter endings: the Asimov technique

The final paragraph of a chapter plants a seed for the next. Name the question or problem that remains open and that the next chapter takes on. Not as an announcement ("In the next chapter we will...") as an open tension the reader carries into the turn of the page. The reader should feel pulled, not redirected.

## Forbidden punctuation and formatting

### Em dashes

No em dashes anywhere in book content. Zero. The rule has no exceptions.

Em dashes are an agent-writing tell. Engineers writing for engineers do not punctuate this way.

Rewrite rules:

- Aside: use a period and a new sentence. "The chapters compound. Foundation makes Agent Instructions effective."
- Definition or expansion of a term: use a colon. "Cognitive debt: the agentic-era undocumented decision."
- Tight parenthetical clause: use a comma or delete the dashes. "a CLI agent, one that combines a thinking model."

### Semicolons

No semicolons in prose. Replace with a period or a comma. The one acceptable exception is structured lists inside `Sources:` lines where semicolons separate citation entries.

### Bold and italic for emphasis

Bold (`**word**`) and italic (`*word*`) are a deliberate authorial choice, not a reflex. Used on every other page they read as agent-formatting. Used rarely and on purpose, they read as someone shaping a sentence by hand. The author decides when a word needs that weight.

When a coding or AI agent drafts a section, hold a higher bar: default to sentence structure for emphasis, and reach for bold or italic only on the rare occasion nothing else will do, not as a default habit.

Keep backtick inline code formatting. Keep fenced code blocks. Keep Mermaid diagram blocks. Keep tables. Book titles in Sources lines use quotes, not italics.

Italics and bold are encouraged when they do real work, but use them sparingly. Overuse reads like agent formatting.

By convention, the `Sources:` citation line is wrapped whole in italics (`*Sources: ...*`) so it reads as a citation strip, not body prose.

Bullets are encouraged when you need scanability (constraints, checklists, comparisons). Keep them short. Avoid nested bullets and avoid list-only chapters.

## Preferred techniques

Use occasionally, not on every page:

- A rhetorical question, where the question is genuinely open
- Dry or dark humour: the precise observation that is slightly too true to be comfortable
- A compact analogy, the rare exception to "Technical term over literary paraphrase": use it when it maps precisely onto the mechanism (the database trigger that fires on every event), never as a substitute for a term that already exists
- A strong opinion, owned and defended
- A surprising comparison

The right humor register: understated, technically grounded, slightly rueful. The best form is the observation that makes an experienced reader recognize something they have seen before and did not expect to see named.

Examples in register:
> "The spec was accurate. For the codebase as it existed three months ago."
> "Nobody updated AGENTS.md. Everybody assumed someone else would."
> "Most agent frameworks resemble distributed systems designed by people who hoped observability would somehow become optional."

Never: jokes that reach, pop-culture references, self-congratulation, forced optimism. Dark is fine; try-hard is not.

## Quality bar

A section should:

- read in a register a senior engineer would recognize as their own
- contain enough specificity that a reader assumes it came from experience
- be difficult to skim: every paragraph earns its presence
- include at least one observation a reader might highlight

Sections that read smoothly but contain nothing memorable are the failure mode. Polish is the enemy.
