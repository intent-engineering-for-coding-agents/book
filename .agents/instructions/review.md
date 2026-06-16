# Review Conventions

## When to review

Run a review pass after drafting a chapter and before committing. Use the `review-chapter` skill to structure the pass. The review is not complete until `.agents/skills/credibility-pass.md` has also been run on the draft and any blocking findings are either fixed or explicitly called out.

## What to check

### Alignment with the outline

- Does the chapter cover every bullet point in its `plan.md` outline?
- Does it introduce anything not in the outline? If so, is it load-bearing or padding?
- Is the key constraint or problem stated in the first paragraph, not buried at the end?

### Tone and audience fit

- Would a skeptical senior developer find this credible, or does it read as hype?
- Are any enterprise buzzwords present? Remove them.
- Does the chapter over-claim? (e.g. "coding agents will transform your workflow" — cut; "this practice reduces drift" — keep if supported)
- Is the practitioner voice consistent with other chapters?

### Concreteness

Apply the tests in `voice.md` ("Concrete over abstract"); do not restate them, run them:

- Substitution test: per section, would the claim survive swapping its subject for an unrelated system? If yes, it is abstract. Send it back.
- Referent test: does every paragraph name a concrete referent (file, command, flag, error, number, behavior), or does it float on abstract nouns?
- Show the break: when a section claims a failure, does it show the symptom, or only assert that something breaks?
- Boundary: are the concrete details real (named files, real commands, sourced facts, marked hypotheticals), not invented specifics? Cross-ref "Never fake a memory" and credibility-pass `Fabricated anecdote`.

### Sources and attribution

- Does every factual claim or named practice have a `*Sources:*` line pointing to a reference in `plan.md`?
- Are attributions accurate? (Author, title, year — verify against the References section in `plan.md`)
- Does the chapter credit the right origin for practices it describes? (e.g. ADRs → Nygard 2011, not "common practice")
- For each substantive claim, is the source class clear in the reviewer's head: primary/original, primary documentation, secondary commentary, or vendor-authored?
- If the chapter relies on a secondary or vendor source, has the prose been downgraded accordingly instead of sounding like settled fact?
- Does the chapter present any book-created taxonomy, split, or workflow as if it were an industry standard? If so, require explicit synthesis labeling.
- Are any terms or conventions still unstable in the field (Intent Engineering, `AGENTS.md`, ADLC variants, test taxonomies, current agent workflow patterns)? If yes, require emerging-practice framing unless the source supports stronger language.
- Are any tool/model/workflow claims perishable? If yes, require time-bounded wording or review-date framing.

Source policy exception: purely navigational pages, front matter, and glossary entries do not need a local `*Sources:*` line for every cross-reference or internal definition. They still need local source support for dated claims, external tool claims, historical claims, named practices, or any definition borrowed from outside the book. If a glossary entry defines a book-created term, label it as the book's usage rather than field consensus.

### Cross-chapter consistency — DRY check

- Does this chapter repeat explanation that belongs in another chapter?
- Does it reference concepts explained elsewhere without re-explaining them? (good)
- Does it contradict anything in another chapter?

### Structure and length

- Is the chapter complete? If it feels short, something is missing. If it feels long, find the padding and cut it. Do not count words — read it.
- No heading depth beyond H3
- Code blocks have language tags
- Tables used for comparisons, not for lists that belong in prose
- Transition check: does each section end with tension, implication, or a forward-pointing question — or does it trail off into summary? Summary endings are a cut.
- Chapter ending: is there a planted seed for the next chapter? Or does the chapter simply stop?
- Paragraph rhythm: are there three or more paragraphs of the same visual length in sequence? Break one of them.
- Sentence construction (distinct from the length check above: length can vary while every sentence is built the same way): count the tells from `voice.md` — copula maxims ("X is Y"), balanced contrast pairs ("X does A. Y does B."), triple parallels. Per section: more than two copula maxims, two or more contrast pairs, or (counted across the whole chapter) three or more triple parallels is a metronome. There is also a spread-thin version: if these three shapes carry most sections, one tell here and another there, the chapter runs on one toolkit even when no section trips a count. That is the more common failure. Either pattern is symmetric prose. Send it back to be varied.

### iec cross-references

- Where the chapter claims a practice is demonstrated in `iec`, verify the claim is accurate
- Reference the correct git tag or file path; do not invent them
- Tool positioning: are all tool mentions either in the Tooling section (last) or as a single brief illustration in the body? If a tool appears more than once in the body, it is overselling — move the extras to Tooling or cut them.

## Review failure conditions

Send the chapter back for revision if any of the following is true:

- A factual or operational section lacks a local `*Sources:*` line.
- The chapter states a stronger conclusion than its sources justify.
- A book-specific synthesis reads like field consensus.
- A time-sensitive claim is written as if it were durable fact.
- The provenance is too weak for the wording and the chapter does not acknowledge that weakness.
- A section makes a claim with no concrete referent, or asserts a failure without showing the symptom.
- The credibility pass was not run, or it still reports blocking findings.

## Multi-LLM critique (optional)

For chapters that carry significant claims (Docs > Code, When Intent Engineering Fails, Honest Maturity), submit the draft to a second model for an independent critique pass. Ask: "What is the weakest claim in this chapter, and what evidence would strengthen it?"
