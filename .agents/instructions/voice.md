# Voice and Craft

This file defines how the prose should sound. `writing.md` covers mechanics: audience, length, sources, structure. This file covers the part that makes a chapter feel alive instead of dutiful.

## Core philosophy

The book is not documentation. It is technical storytelling: the register of someone who has lived inside a problem and is finally explaining what mattered. Every chapter should read that way.

The prose must never feel:

- corporate
- generic
- academic
- sanitized
- agent-generated
- excessively polished

A reader who skims any paragraph at random should think: this came from experience, not from summarizing documentation.

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

### Forbidden words

Never use these words or phrases. Replace or rephrase:

> can, may, just, that, very, really, literally, actually, certainly, probably, basically, could, maybe, delve, embark, enlightening, esteemed, shed light, craft, crafting, imagine, realm, game-changer, unlock, discover, skyrocket, abyss, not alone, in a world where, revolutionize, disruptive, utilize, utilizing, dive deep, tapestry, illuminate, unveil, pivotal, intricate, elucidate, hence, furthermore, however, harness, exciting, groundbreaking, cutting-edge, remarkable, it, remains to be seen, glimpse into, navigating, landscape, stark, testament, in summary, in conclusion, moreover, boost, skyrocketing, opened up, powerful, inquiries, ever-evolving, leverage, robust, transformative, unlock potential, seamless, holistic, comprehensive solution

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

### Respect reader intelligence

Do not define obvious engineering concepts. Do not repeat the same idea three times in different words. Do not summarize excessively. Do not explain what a PR is, what CI does, what a feature flag is.

Cut every sentence that re-explains. Cut every transition that announces what the next paragraph will say. The reader is paying attention.

## Technical explanation style

### Explain through situations

Show runtime behavior. Describe execution paths. Demonstrate what fails when it fails.

Bad: "Coordination between components is important."

Good: "The planner generated valid subtasks. The executor completed them. Then the reconciliation layer quietly merged incompatible state."

### Every design has a cost

When presenting an architecture or practice, name the tradeoff in the same paragraph. The book is suspicious of recommendations presented as universally correct. State what scales, what breaks, what requires ongoing investment.

### Emphasize reality

Context windows fail. Memory becomes inconsistent. Orchestration complexity explodes. Tool reliability matters. Evaluation is hard. Autonomous behavior becomes unpredictable at scale. Ground abstract claims in operational consequences.

## Structural style

### Chapter openings

Open with a strong observation, a surprising truth, a claim worth arguing, or operational tension. The first paragraph creates curiosity. By the end of paragraph one, the reader should already be committed to paragraph two. Use one of the honest devices in "Never fake a memory" above, and pick a different device from the chapters around it. Never open by narrating an invented event as though it occurred.

Compliant exemplars already in the book: `foundation/honest-maturity.md` (second-person imperative), `foundation/plain-text-as-code.md` (second-person present situation), `spec-driven/spec-gt-code.md` (imperative thought experiment), `team/trunk-based-development.md` (sourced fact).

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

One sanctioned italic exception remains: the `Sources:` citation line is wrapped whole in italics (`*Sources: ...*`) so it reads as a citation strip, not body prose. This applies to the entire line only, never to emphasizing words inside it.

## Preferred techniques

Use occasionally, not on every page:

- A rhetorical question, where the question is genuinely open
- Dry or dark humour: the precise observation that is slightly too true to be comfortable
- A compact analogy
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
