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
5. **Tooling** (optional, always last) — if `ase-cli` demonstrates this practice, mention it here in one paragraph: what command, what it does, how to try it. Frame as "If you want to see this in practice..". — never as a recommendation. The practice is the point; the tool is an example.

Outside the Tooling section, tool names appear at most once per chapter, as a brief illustration only. If a tool is mentioned more than once in the body, move the extra mentions to Tooling or cut them.

Constraints first: put the key constraint, non-goal, or risk at the top of the chapter — agents and skimmers read top-down and lose focus. Do not bury the point in the conclusion.

Cross-chapter transitions: the last paragraph of a chapter plants a seed for the next (see voice.md — Asimov technique). When the next chapter is written, its opening paragraph should reference (implicitly or explicitly) the tension planted at the end of the previous one. This is bridging: something at the end of chapter N is mirrored or resolved at the start of chapter N+1.

## Formatting

- Prose paragraphs for explanation; code blocks for anything the reader will type or copy
- Markdown tables for comparisons
- **Diagrams: Mermaid by default.** Author every diagram as Mermaid in a fenced ` ```mermaid ` block — flow, sequence, state, ER, class, etc. Mermaid renders in the VitePress build *and* on GitHub, and stays diffable as plain text. Use ASCII / box-art only as a fallback when Mermaid genuinely can't express the shape (rare; one common case is a directory tree, which reads better as indented text)
- Fenced code blocks with language tag: ` ```bash `, ` ```yaml `, ` ```python `, ` ```ts `
- No heading levels deeper than H3 inside a chapter
- `*Sources:*` line at the end of any section that draws on a specific reference — format: `*Sources: Author "Title" (Year).*`
- Use American English punctuation conventions: periods and commas go inside closing quotation marks (`"like this".` not `"like this".`)
- Use straight quotes and apostrophes throughout (`"`, `'`) — never curly/smart quotes (`"`, `"`, `'`, `'`), in prose or code
- Do not use em-dash for decoration; use it only to set off a clause
- Inline code for file names, paths, command names, and flag names

## Length

Chapters are long-form but not padded. A complete chapter is typically 600–1200 words of prose. Longer is not better. If a section is filler, cut it.

## Chapter outlines

Each chapter has an outline in `plan.md`. Expand the bullet points into prose — do not invent structure not in the outline, and do not omit bullet points that are. The outline is the spec.

## References

Every reference used must appear in the `plan.md` References section. Do not cite sources not in that list without adding them there first. Verify attributions before writing them — see `feedback_book_references.md` in memory.

## Mandatory credibility pass

Every writing task must load and run `.agents/skills/credibility-pass.md` before the draft is considered complete. Draft first, then run the credibility pass, then fix what it finds. Do not hand off a chapter or section for review until the credibility pass has no blocking issues.

### Source hygiene rules

- Treat provenance as part of the writing, not as an end-of-draft cleanup step.
- Every section that makes a factual, historical, operational, or comparative claim needs a local `*Sources:*` line, even if the source also appears elsewhere in the chapter.
- For each claim, decide what kind of source you are using: **primary/original**, **primary documentation**, **secondary commentary**, or **vendor-authored**. Prefer the strongest available source. If you only have a weaker source, keep it and lower the certainty of the prose.
- Do not present book synthesis as field consensus. If a taxonomy, split, workflow, or naming scheme is this book's framing, say so explicitly with language like `This book uses...`, `The working taxonomy here is...`, or `This is a practical synthesis...`.
- Do not present emerging conventions as standards unless the source actually supports that claim. Terms like `AGENTS.md`, ASE, ADLC variants, test taxonomies, and current agent workflows often need `de-facto`, `emerging`, `current practice`, or equivalent framing.
- Time-sensitive claims about tools, model families, supported features, and current workflow patterns must be dated or bounded in time. Avoid pretending that a 2025-2026 snapshot is a permanent truth.
- If the evidence does not justify certainty, downgrade the wording. Prefer `can`, `often`, `in some teams`, `in current practice`, or `this book argues` over universal claims.
- When a section is mostly opinion or synthesis but includes one concrete factual claim, keep the local `*Sources:*` line for that factual part.
- Before sign-off, run the credibility pass and resolve every `Missing local source`, `Weak provenance`, `Overstated claim`, `Unlabeled synthesis`, `Perishable claim`, and `Field-consensus overreach` finding.
