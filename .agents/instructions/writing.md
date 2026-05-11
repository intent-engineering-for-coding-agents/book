# Writing Conventions

## Audience

Senior or experienced developers who already use AI coding assistants and want to work more deliberately. They know what a PR is, what CI does, what a linter enforces. They do not need those explained. They are skeptical of hype and will notice if the book oversells.

Write for a practitioner, not a student. The book adds structure and accountability to something they are already doing.

## Tone and voice

Direct, opinionated, practitioner voice. Credit sources explicitly. No hype about AI replacing developers; no doomerism about AI either.

See [voice.md](voice.md) for the full voice and craft guide — narrative tension, forbidden AI patterns, rhythm, and the bar a chapter must clear to feel lived-in. `writing.md` covers mechanics; `voice.md` covers how the prose should sound.

## Structure

Each chapter follows this pattern:

1. **Problem** — what breaks without this practice (concrete, not abstract)
2. **Practice** — what to do, with examples from `ase-cli` or the book repo itself
3. **Evidence** — why it works (references, `ase-cli` tags the reader can check out)
4. **Honest caveats** — where the practice has limits or is still evolving

Constraints first: put the key constraint, non-goal, or risk at the top of the chapter — agents and skimmers read top-down and lose focus. Do not bury the point in the conclusion.

## Formatting

- Prose paragraphs for explanation; code blocks for anything the reader will type or copy
- Markdown tables for comparisons
- **Diagrams: Mermaid by default.** Author every diagram as Mermaid in a fenced ` ```mermaid ` block — flow, sequence, state, ER, class, etc. Mermaid renders in the VitePress build *and* on GitHub, and stays diffable as plain text. Use ASCII / box-art only as a fallback when Mermaid genuinely can't express the shape (rare; one common case is a directory tree, which reads better as indented text)
- Fenced code blocks with language tag: ` ```bash `, ` ```yaml `, ` ```python `, ` ```ts `
- No heading levels deeper than H3 inside a chapter
- `*Sources:*` line at the end of any section that draws on a specific reference — format: `*Sources: Author "Title" (Year).*`
- Do not use em-dash for decoration; use it only to set off a clause
- Inline code for file names, paths, command names, and flag names

## Length

Chapters are long-form but not padded. A complete chapter is typically 600–1200 words of prose. Longer is not better. If a section is filler, cut it.

## Chapter outlines

Each chapter has an outline in `plan.md`. Expand the bullet points into prose — do not invent structure not in the outline, and do not omit bullet points that are. The outline is the spec.

## References

Every reference used must appear in the `plan.md` References section. Do not cite sources not in that list without adding them there first. Verify attributions before writing them — see `feedback_book_references.md` in memory.
