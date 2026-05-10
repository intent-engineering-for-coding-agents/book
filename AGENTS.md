# AGENTS.md — ASE Book

You are working on the **ASE Book**, a VitePress site teaching Agentic Software Engineering practices.

## Project

- **Site generator**: VitePress 1.x (`srcDir: 'content'`)
- **Diagrams**: Mermaid (via vitepress-plugin-mermaid)
- **Package manager**: npm
- **License**: Apache 2.0

## Instructions

Load when relevant:

- [Writing](.agents/instructions/writing.md) — audience, structure, sources, formatting mechanics
- [Voice](.agents/instructions/voice.md) — narrative tension, forbidden AI patterns, engineer-flavoured prose
- [VitePress](.agents/instructions/vitepress.md) — config, sidebar, Mermaid, build commands
- [Review](.agents/instructions/review.md) — how to review and critique draft content
- [Index maintenance](.agents/instructions/index-maintenance.md) — keep `docs/INDEX.md` current
- [Glossary maintenance](.agents/instructions/glossary-maintenance.md) — first-use expansion of abbreviations; keep `content/appendices/glossary.md` current
- [docs/INDEX.md](docs/INDEX.md) — full map of all documentation

## Commands

```
npm run docs:dev     # local dev server with hot reload
npm run docs:build   # build to .vitepress/dist/
npm run docs:preview # preview the built site locally
```

## Skills

- [**draft-section**](.agents/skills/draft-section.md) — draft a content section from a chapter outline entry
- [**review-chapter**](.agents/skills/review-chapter.md) — consistency, tone, and DRY review of a draft chapter
- [**update-sidebar**](.agents/skills/update-sidebar.md) — regenerate VitePress sidebar from `content/` file tree
- [**update-index**](.agents/skills/update-index.md) — scan `docs/`, regenerate `docs/INDEX.md` and all listing files
