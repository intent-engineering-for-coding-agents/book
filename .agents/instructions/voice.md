# Voice and Craft

This file defines how the prose should sound. `writing.md` covers mechanics — audience, length, sources, structure. This file covers the part that makes a chapter feel alive instead of dutiful.

## Core philosophy

The book is not documentation. It is technical storytelling — the register of someone who has lived inside a problem and is finally explaining what actually mattered. Every chapter should read that way.

The prose must never feel:

- corporate
- generic
- academic
- sanitized
- AI-generated
- excessively polished

A reader who skims any paragraph at random should think: this came from experience, not from summarizing documentation.

## Voice and tone

Pragmatic. Technically ambitious. Occasionally skeptical. Calm but opinionated. Curious. Precise. Slightly conversational.

Confidence without arrogance. Realism without cynicism. Excitement without hype.

## Writing characteristics

### Open with tension, not framing

A section that opens "Without X, Y is impossible" is opening with framing. A section that opens with a contradiction, a surprise, a failed deploy, or a scaling cliff is opening with tension. Tension goes first; framing comes after.

Bad: *"Agentic systems are increasingly important."*

Good: *"The first autonomous coding agent looked impressive right until it deleted the migration directory."*

The opening sentence should make the reader want the next one.

### Engineer language, not marketer language

Forbidden: *leverage, robust, cutting-edge, transformative, unlock potential, seamless, holistic, comprehensive solution.*

Preferred: *retries, deadlocks, queues, corrupted state, token limits, runaway execution, latency spikes, broken deployments, stale cache, incoherent merge.*

Concrete operational nouns. Verbs that describe what the code does, not what the code aspires to. The reader is an engineer; speak like one.

### Include real failure modes

Cite the published failures: cognitive debt, agent-accelerated drift, dead specs, scaling cliffs in coordination. The book has a References section for a reason. Use it as texture, not as a footnote afterthought.

The voice draws on the published evidence base. It does not invent personal experience. *"ThoughtWorks Radar Vol 34 calls this cognitive debt — the AI-era version of the undocumented decision that quietly breaks a deploy at 3am"* is both true and textured. *"I once debugged this for 14 hours"* is texture the agent cannot honestly claim.

### Vary rhythm aggressively

Mix short sentences with long explanations. Mix abrupt observations with reflective paragraphs. Mix compact technical detail with broader implication.

Avoid identical paragraph lengths. Avoid balanced cadence throughout a section. Symmetrical prose is what AI drift looks like at the paragraph level.

> The architecture looked elegant.
>
> Production disagreed.

### Respect reader intelligence

Do not define obvious engineering concepts. Do not repeat the same idea three times in different words. Do not summarize excessively. Do not explain what a PR is, what CI does, what a feature flag is.

Cut every sentence that re-explains. Cut every transition that announces what the next paragraph will say. The reader is paying attention.

## Technical explanation style

### Explain through situations

Show runtime behaviour. Describe execution paths. Demonstrate what fails when it fails.

Bad: *"Coordination between components is important."*

Good: *"The planner generated valid subtasks. The executor completed them. Then the reconciliation layer quietly merged incompatible state."*

### Every design has a cost

When presenting an architecture or practice, name the tradeoff in the same paragraph. The book is suspicious of recommendations presented as universally correct. State what scales, what breaks, what requires ongoing investment.

### Emphasize reality

Context windows fail. Memory becomes inconsistent. Orchestration complexity explodes. Tool reliability matters. Evaluation is hard. Autonomous behaviour becomes unpredictable at scale. Ground abstract claims in operational consequences.

## Structural style

### Chapter openings

Open with a strong observation, a surprising truth, or operational tension. The first paragraph creates curiosity. By the end of paragraph one, the reader should already be committed to paragraph two.

### Section endings

Avoid generic summaries. Avoid repetitive recaps. Prefer an implication that points forward, an unresolved tension, or a sharp observation the reader carries into the next section.

## Forbidden AI patterns

Never write:

- "In today's rapidly evolving landscape"
- "It is important to note"
- "Furthermore" (use a stronger transition or none)
- "Moreover" (same)
- "Delve into"
- "Unlock the power"
- "Game-changing"
- "Revolutionary"
- "Seamless integration"
- "At the end of the day"
- "When it comes to"

Avoid the structural tells:

- Three-bullet symmetric lists where every bullet is the same shape
- "First… Second… Third… Finally…" sequencing for non-sequential ideas
- Sections of identical length
- Generic optimism about AI capability
- Emotionally flat prose where every sentence is a declarative statement of equal weight

### Em dashes for asides

Strings of em dashes (`—`) sprinkling asides across a paragraph are an AI-writing tell. Engineers writing engineers do not punctuate this way.

Rewrite rules:

- **Aside** → period + new sentence. *"The chapters compound — Foundation makes AI Instructions effective"* becomes *"The chapters compound. Foundation makes AI Instructions effective."*
- **Definition or expansion of a term** → colon. *"Cognitive debt — the AI-era undocumented decision"* becomes *"Cognitive debt: the AI-era undocumented decision."*
- **Bold label + description in a list** → colon. *"**Foundation** — repo structure as the agent's briefing"* becomes *"**Foundation**: repo structure as the agent's briefing."*
- **Tight parenthetical clause** → comma, or just delete the dashes. *"a CLI agent — one that combines a thinking model"* becomes *"a CLI agent, one that combines a thinking model."*

An em dash is acceptable at most once per page, and only when the alternative genuinely loses meaning. If the rewrite reads fine, the em dash was AI texture.

## Preferred techniques

Use occasionally — never on every page:

- A rhetorical question, where the question is genuinely open
- Dry humour, understated
- A compact analogy
- A strong opinion, owned and defended
- A surprising comparison

> Most agent frameworks resemble distributed systems designed by people who hoped observability would somehow become optional.

## Quality bar

A section should:

- read in a register a senior engineer would recognise as their own
- contain enough specificity that a reader assumes it came from experience
- be difficult to skim — every paragraph earns its presence
- include at least one observation a reader might highlight

Sections that read smoothly but contain nothing memorable are the failure mode. Polish is the enemy.
