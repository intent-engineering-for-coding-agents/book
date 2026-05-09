# Skill: draft-section

Draft a new content section from a chapter outline entry in `plan.md`.

## When to use

When you are ready to write a section of a chapter and have the outline bullet points from `plan.md` as your spec.

## Input

- The chapter outline entry from `plan.md` (bullet points, `*Sources:*` line)
- The target file path under `content/`

## Process

1. Read the chapter outline from `plan.md` — treat the bullet points as the spec, not suggestions
2. Load [writing.md](.agents/instructions/writing.md) for tone and formatting rules
3. Draft in this order:
   - Opening paragraph: state the problem this chapter addresses (concrete, not abstract)
   - Body: expand each bullet point into prose or a supporting example; keep `ase-cli` cross-references accurate
   - Closing: honest caveats or where this practice has limits
4. Add a `*Sources:*` line wherever a specific reference is drawn on
5. Verify all referenced `ase-cli` tags and file paths exist before writing them

## Output

A complete `.md` file ready for a review pass. Do not commit without running `review-chapter` first.

## Quality bar

- Every outline bullet point is covered
- No content invented beyond the outline
- Key constraint or problem appears in the first paragraph
- Sources cited are in `plan.md` References section
- `npm run docs:build` passes after the file is added to `content/` and the sidebar
