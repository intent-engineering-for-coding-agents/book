# Skill: draft-section

Draft a new content section from its place in the book: the relevant section `index.md` entry, the book arc, and the task brief.

## When to use

When you are ready to write a section of a chapter and know its scope from the relevant section `index.md` entry, the book arc, and the task brief.

## Input

- The chapter's scope source:
  - for topic chapters, the relevant section `index.md` entry
  - for appendices or front matter, the sidebar entry and the chapter's role in the book
- The task brief: the user's request or author-provided brief for what this draft must do
- The target file path under `content/`

## Process

1. Fix the chapter's scope from the relevant section `index.md` entry, the sidebar reading order, and the task brief, and treat that combined scope as the spec
2. Load [writing.md](.agents/instructions/writing.md), [voice.md](.agents/instructions/voice.md), and [credibility-pass.md](.agents/skills/credibility-pass.md) — `writing.md` covers mechanics, `voice.md` covers how the prose should sound, and `credibility-pass.md` defines the mandatory provenance check before handoff
3. Draft in this order:
   - Opening paragraph: state the problem this chapter addresses (concrete, not abstract)
   - Body: expand the chapter's scope into prose and supporting examples; keep `iec` cross-references accurate
   - Closing: honest caveats or where this practice has limits
4. Add a `*Sources:*` line wherever a specific reference is drawn on
5. Verify all referenced `iec` tags and file paths exist before writing them
6. Run the credibility pass on the draft and fix every blocking finding before handing the file to `review-chapter`

## Output

A complete `.md` file ready for a review pass. Do not commit without running `review-chapter` first, and do not call the draft complete until the credibility pass has been cleared.

## Quality bar

- Everything the chapter's scope source promises is covered
- The chapter stays within its scope and does not widen into adjacent topics
- Key constraint or problem appears in the first paragraph
- Sources cited are in `content/appendices/references.md`
- The credibility pass has been run and all blocking findings resolved
- `npm run docs:build` passes after the file is added to `content/` and the sidebar
