# Skill: review-chapter

Consistency, focus, tone, and DRY review of a draft chapter.

## When to use

After drafting a chapter and before committing. Run this before any PR.

## Input

- The draft chapter file path
- The chapter's scope source and its place in the book arc:
  - for topic chapters, the section `index.md` entry
  - for appendices/front matter, the sidebar entry and the chapter's role in the book

## Process

Load [writing.md](.agents/instructions/writing.md), [voice.md](.agents/instructions/voice.md), [review.md](.agents/instructions/review.md), and [credibility-pass.md](.agents/skills/credibility-pass.md). Work through the review checklist first, then run the credibility pass before deciding the draft passes:

1. **Section alignment** — the chapter delivers what its scope source promises, fits the book arc, and pulls in nothing that belongs in an adjacent chapter
2. **Focus** — every section advances the chapter's promised subject, and the agent-specific delta is explicit. Generic software-engineering advice with no coding-agent consequence is `Focus drift`
3. **Relevance** — all content must be relevant to this book and deserve its place. A paragraph that is true but adds no chapter-specific argument, mechanism, failure mode, tradeoff, or forward tension is `Does not earn its place`
4. **Padding** — cut throat-clearing, scene-setting, ornamental lines, repeated claims, and paragraphs that do not introduce a problem, control, tradeoff, or question. If two paragraphs do the same job, keep the better one and flag the other as `Padding`
5. **Tone** — practitioner voice, no hype, no buzzwords, skeptic-credible
6. **Sources** — every factual claim has a local `*Sources:*` line; attribution accurate; provenance class understood; weak sources force weaker wording
7. **DRY** — no repeated explanation from other chapters; no contradictions
8. **Structure** — chapter complete but not padded, no H4+, code blocks have language tags, section endings point forward, chapter ending plants the next tension. Do not use word count as a pass/fail rule
9. **iec cross-references** — claimed tags and file paths verified against the actual repo
10. **Voice** — does the prose match `voice.md`? No forbidden patterns, varied rhythm, varied sentence construction (not just paragraph length: count copula maxims, contrast pairs, triple parallels), narrative tension at openings, no generic summary endings, sections difficult to skim, no performance-writing drift. Apply the paraphrase test ("Technical term over literary paraphrase"): flag everyday metaphor or personification where a standard software term names the same concept. Apply the focus test: if a paragraph would remain unchanged in a general software-engineering book, flag it. Apply the deletion test: if removing the paragraph weakens nothing, cut it. Apply the role test ("Name the role, not the species"): flag generic "humans," "people," or "someone" where a named role (developers, reviewers, the platform team) fits, except where the human-versus-agent contrast is the literal subject. Apply the certainty test ("Vary the certainty, not only the rhythm"): flag a run of flat absolute-verdict sentences with no provisional texture where the claim is genuinely provisional, and flag overuse of `we` or of any single qualifier
11. **Concreteness** — apply voice.md's substitution and referent tests ("Concrete over abstract"). Flag any paragraph that floats on abstract nouns or asserts a failure without showing the symptom. Concrete details must be real, not invented (cross-check "Never fake a memory")
12. **Credibility honesty** — book synthesis explicitly labeled; unstable conventions framed as emerging; perishable claims time-bounded
13. **Credibility pass** — run the dedicated credibility-pass skill and treat any blocking finding as a review failure until fixed or explicitly returned to the author

## Output

Findings first, ordered by severity. Do not lead with praise or summary. For each finding: label, where it is (heading or line reference), why it fails the review bar, and the fix.

Use these labels where they fit:

- `Focus drift`
- `Does not earn its place`
- `Padding`
- `Literary paraphrase`
- `Abstract claim`
- `Generic placeholder` (generic "humans"/"people"/"someone" where a named role fits)
- `Absolute-verdict cadence` (flat, uniform certainty where the claim is provisional)
- every unresolved credibility-pass label

Call out missing local sources, unsupported certainty, unlabeled synthesis, perishable claims, `Abstract claim` findings (a claim with no concrete referent, or a failure asserted without its symptom), and any unresolved credibility-pass failure labels explicitly. If the draft passes all checks, say explicitly that the review found no blocking issues.

## Optional: multi-LLM pass

For high-stakes chapters (Docs > Specs > Code, When Intent Engineering Fails, Honest Maturity), submit the draft to a second model with the prompt: "What is the weakest claim in this chapter, and what evidence would strengthen it?"
