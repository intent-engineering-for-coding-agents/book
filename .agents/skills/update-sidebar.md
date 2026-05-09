# Skill: update-sidebar

Regenerate the VitePress sidebar in `.vitepress/config.mts` from the current `content/` file tree.

## When to use

After adding, removing, or renaming any `.md` file under `content/`.

## Process

1. List all `.md` files under `content/` recursively, excluding `index.md` files that serve as topic landing pages
2. Group by top-level topic directory:
   - `foundation/`
   - `ai-instructions/`
   - `spec-driven/`
   - `quality/`
   - `team-workflows/`
   - `cross-team/`
   - `appendices/`
3. For each file, derive the display text from the H1 heading of the file (not the filename)
4. Generate the sidebar config in this format:

```ts
sidebar: [
  {
    text: 'Foundation',
    items: [
      { text: 'Why Structure Matters', link: '/foundation/why-structure' },
    ]
  },
  // ...
]
```

5. Replace the existing `sidebar: [...]` block in `.vitepress/config.mts`
6. Run `npm run docs:build` to verify no broken links

## Notes

- Topic directories that have no content files yet get no sidebar entry
- The `content/index.md` home page is not included in the sidebar
- Preserve the topic ordering: Foundation → AI Instructions → Spec-Driven → Quality → Team Workflows → Cross-Team → Appendices
