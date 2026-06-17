# Skill: review-chapter

Consistency, tone, and DRY review of a draft chapter.

## When to use

After drafting a chapter and before committing. Run this before any PR.

## Input

- The draft chapter file path
- The matching chapter outline from `plan.md`

## Process

Load [review.md](.agents/instructions/review.md) and [credibility-pass.md](.agents/skills/credibility-pass.md). Work through the review checklist first, then run the credibility pass before deciding the draft passes:

1. **Outline alignment** — every bullet covered, nothing invented beyond the outline
2. **Tone** — practitioner voice, no hype, no buzzwords, skeptic-credible
3. **Sources** — every factual claim has a local `*Sources:*` line; attribution accurate; provenance class understood; weak sources force weaker wording
4. **DRY** — no repeated explanation from other chapters; no contradictions
5. **Structure** — length 600–1200 words, no H4+, code blocks have language tags
6. **iec cross-references** — claimed tags and file paths verified against the actual repo
7. **Voice** — does the prose match `voice.md`? No forbidden patterns, varied rhythm, varied sentence construction (not just paragraph length: count copula maxims, contrast pairs, triple parallels), narrative tension at openings, no generic summary endings, sections difficult to skim. Apply the paraphrase test ("Technical term over literary paraphrase"): flag everyday metaphor or personification where a standard software term names the same concept
8. **Concreteness** — apply voice.md's substitution and referent tests ("Concrete over abstract"). Flag any paragraph that floats on abstract nouns or asserts a failure without showing the symptom. Concrete details must be real, not invented (cross-check "Never fake a memory")
9. **Credibility honesty** — book synthesis explicitly labeled; unstable conventions framed as emerging; perishable claims time-bounded
10. **Credibility pass** — run the dedicated credibility-pass skill and treat any blocking finding as a review failure until fixed or explicitly returned to the author

## Output

A list of issues by category. For each issue: what it is, where it is (heading or line reference), why it fails the review bar, and the fix. Call out missing local sources, unsupported certainty, unlabeled synthesis, perishable claims, `Abstract claim` findings (a claim with no concrete referent, or a failure asserted without its symptom), and any unresolved credibility-pass failure labels explicitly. If the draft passes all checks, say so explicitly.

## Optional: multi-LLM pass

For high-stakes chapters (Docs > Code, When Intent Engineering Fails, Honest Maturity), submit the draft to a second model with the prompt: "What is the weakest claim in this chapter, and what evidence would strengthen it?"
