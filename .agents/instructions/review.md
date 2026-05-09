# Review Conventions

## When to review

Run a review pass after drafting a chapter and before committing. Use the `review-chapter` skill to structure the pass.

## What to check

### Alignment with the outline

- Does the chapter cover every bullet point in its `plan.md` outline?
- Does it introduce anything not in the outline? If so, is it load-bearing or padding?
- Is the key constraint or problem stated in the first paragraph, not buried at the end?

### Tone and audience fit

- Would a skeptical senior developer find this credible, or does it read as hype?
- Are any enterprise buzzwords present? Remove them.
- Does the chapter over-claim? (e.g. "AI will transform your workflow" — cut; "this practice reduces drift" — keep if supported)
- Is the practitioner voice consistent with other chapters?

### Sources and attribution

- Does every factual claim or named practice have a `*Sources:*` line pointing to a reference in `plan.md`?
- Are attributions accurate? (Author, title, year — verify against the References section in `plan.md`)
- Does the chapter credit the right origin for practices it describes? (e.g. ADRs → Nygard 2011, not "common practice")

### Cross-chapter consistency — DRY check

- Does this chapter repeat explanation that belongs in another chapter?
- Does it reference concepts explained elsewhere without re-explaining them? (good)
- Does it contradict anything in another chapter?

### Structure and length

- Is the chapter 600–1200 words of prose? If shorter, is it complete? If longer, what can be cut?
- No heading depth beyond H3
- Code blocks have language tags
- Tables used for comparisons, not for lists that belong in prose

### ase-cli cross-references

- Where the chapter claims a practice is demonstrated in `ase-cli`, verify the claim is accurate
- Reference the correct git tag or file path; do not invent them

## Multi-LLM critique (optional)

For chapters that carry significant claims (Spec > Code, When ASE Fails, Honest Maturity), submit the draft to a second model for an independent critique pass. Ask: "What is the weakest claim in this chapter, and what evidence would strengthen it?"
