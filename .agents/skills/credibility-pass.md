# Skill: credibility-pass

Run a dedicated credibility and provenance pass on drafted or reviewed book content.

## When to use

- After drafting a chapter or section, before calling the draft complete
- During chapter review, before deciding the draft passes
- Any time a chapter makes strong, current, historical, or field-level claims that could outrun the evidence

## Input

- The chapter or section file path under `content/`
- The matching outline entry from `plan.md`
- The local `*Sources:*` lines used in the draft

## Process

1. Classify each substantive claim as one of:
   - `field fact`
   - `current practice`
   - `book synthesis`
   - `project convention`
   - `opinion / argument`
2. Check whether the source strength matches the wording:
   - prefer `primary/original`
   - then `primary documentation`
   - then `secondary commentary`
   - then `vendor-authored`
3. For each section, verify that factual, historical, operational, or comparative claims have a local `*Sources:*` line.
   - Verify each source on that line carries a claim-tag naming what it backs, and that the claim actually appears in the section.
   - Flag any source that backs no claim in its section (decorative attribution) for removal, even if the source is strong.
   - Verify load-bearing claims that lean on a named source are attributed inline in the prose, not only in the trailing line.
4. Mark any taxonomy, split, workflow, or naming scheme that reads like field standard but is really book synthesis or repo convention.
5. Mark any unstable or perishable claim that needs time-bounded wording, such as tool support, model behavior, workflow maturity, or current naming conventions.
6. Downgrade or flag any claim whose wording is stronger than the available evidence.
7. Flag any passage that narrates a fabricated specific event in the past tense as if it happened (an invented anecdote dressed as observed fact), especially chapter openings carrying invented precise numbers. Honest scenarios must be marked as hypothetical, framed in the second person, or sourced. See `voice.md`, "Never fake a memory".

## Failure labels

Use these exact labels when the pass finds problems:

- `Missing local source`
- `Weak provenance`
- `Overstated claim`
- `Unlabeled synthesis`
- `Perishable claim`
- `Field-consensus overreach`
- `Unmapped source` (a source on a `*Sources:*` line with no claim-tag, or whose claim does not appear in the section)
- `Decorative source` (a source that backs no claim in its section and should be removed)
- `Fabricated anecdote` (a specific event narrated in the past tense as if it happened, with no source and no hypothetical framing)

## Output

A short issue list grouped by the failure labels above. For each issue, state:

1. the claim or section
2. why it fails the credibility bar
3. whether the fix is to add a source, soften the wording, label synthesis, or time-bound the statement

If the draft passes, say explicitly that the credibility pass found no blocking provenance or overconfidence issues.

## Non-goals

- Do not use this pass for generic copy-editing.
- Do not replace outline alignment, voice, or DRY review; this pass is about honesty, provenance, and certainty.