# Skill: review-book

Cross-cutting review of the whole book, across every part under `content/`.

## When to use

When the unit of concern is the book, not a chapter: before a release tag, after a run of chapters lands, or when something feels inconsistent across the work as a whole. This is the broad pass. It does not replace per-chapter depth.

## Relationship to other skills

- [review-chapter](.agents/skills/review-chapter.md) owns single-chapter depth: section alignment, local sources, voice, structure. Whenever a finding lives inside one chapter, defer to it — do not re-derive its checklist here.
- [credibility-pass](.agents/skills/credibility-pass.md) owns provenance and certainty. This pass spots *book-wide* provenance patterns (the same weak claim repeated across chapters); the per-claim verdict still belongs there.

This skill only covers what no single-chapter pass can see.

## Input

- The full `content/` tree
- The section `index.md` files and the sidebar (`.vitepress/config.mts`) for the intended arc and reading order
- `content/appendices/glossary.md` for canonical terms

## Process

First confirm the chapters are individually clean: this pass assumes each chapter has a passing [review-chapter](.agents/skills/review-chapter.md) result. For any chapter under review that has not had one, run it (or flag the chapter as unreviewed) before continuing — book-level review does not catch a chapter's internal faults.

Then read the book in reading order, not file order, and check the seams between chapters, which is where book-level faults hide.

1. **Narrative arc** — does each part build on the last, in the reading order the sidebar defines? Is there a chapter that would be load-bearing earlier, or one that arrives before its prerequisites? Does the introduction promise things the body never pays off, or does the body rely on ideas the introduction never set up?
2. **Seed-and-payoff** — chapters are meant to end on a planted seed for the next. Walk the chain end to end: every seed should land somewhere, and no chapter should open on a concept the book never planted.
3. **Global duplication** — the per-chapter DRY check only sees one chapter at a time. Find explanations that recur across chapters. Pick the single canonical home for each concept; everywhere else should reference, not re-explain.
4. **Contradiction sweep** — does any chapter assert something another chapter denies (a definition, a recommendation, a maturity claim)? List both locations.
5. **Terminology drift** — is each defined term used consistently, and does it match `glossary.md`? Flag synonyms used for the same concept, and one term used for two concepts. Flag first-use expansions that happen in more than one place, or not at all.
6. **Substance vs. filler** — sweep for passages that are generic, hollow, or padding: sentences whose deletion would change nothing, restated truisms, throat-clearing openings, conclusions that only summarize. Quote the exact sentence and say what is missing: a concrete claim, an example, a consequence. Judge whether the passage earns its place; do not speculate about how it was written.
7. **Machine-voice sweep** — the tells that make a reader stop trusting the book are easiest to see book-wide, where they recur. Grep every chapter for generic "humans"/"people"/"someone" where a named role fits (the role test in `voice.md`), and read for the flat absolute-verdict cadence where every sentence lands at the same pitch with no provisional texture (the certainty test). Both are per-sentence faults `review-chapter` owns; record the book-wide *pattern* here and route specific lines to `review-chapter`.
8. **Cross-cutting provenance** — note claims that appear in several chapters leaning on the same weak or vendor source, or a book synthesis that reads as field consensus in one chapter and is correctly labeled in another. Hand specifics to `credibility-pass`; record the pattern here.
9. **Structural consistency** — are conventions uniform book-wide: heading depth, `*Sources:*` placement, code-block language tags, table-versus-prose choices, tooling kept to its proper section?

## Output

A prioritized issue list, most severe first. Group by the nine checks above. For each issue:

1. what it is, in one line
2. every location it touches — file plus heading, both ends of a contradiction or duplication
3. the fix, and which file should change versus which should reference

Lead with a one-paragraph verdict: the single most important book-level problem, and whether the book reads as a coherent whole or as chapters assembled side by side. If a finding is really single-chapter, name it and route it to `review-chapter` rather than resolving it here. If the book passes a check, say so for that check rather than staying silent.

## Non-goals

- Not a substitute for `review-chapter`; this pass assumes chapters have each passed their own review.
- Not copy-editing or prose-level line editing within a chapter.
- Not the place to settle a single claim's provenance — that is `credibility-pass`.
