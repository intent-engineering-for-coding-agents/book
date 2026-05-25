# AGENTS.md: ASE Book

You are working on the **ASE Book**, a VitePress site teaching Agentic Software Engineering practices.

## Project

- **Site generator**: VitePress 1.x (`srcDir: 'content'`)
- **Diagrams**: Mermaid (via vitepress-plugin-mermaid)
- **Package manager**: npm
- **License**: Apache 2.0

## Instructions

**Always load before writing or reviewing any content:**

- [Writing](.agents/instructions/writing.md): audience, structure, sources, formatting mechanics
- [Voice](.agents/instructions/voice.md): narrative tension, forbidden AI patterns, engineer-flavoured prose — contains hard rules that apply to every sentence written in this repo
- [Credibility pass](.agents/skills/credibility-pass.md): mandatory provenance and overconfidence pass before any draft or review is considered complete

Before treating a claim as settled, check whether the source is primary, secondary, or vendor-authored; label book synthesis honestly and time-bound perishable tool claims.

Load when relevant:

- [VitePress](.agents/instructions/vitepress.md): config, sidebar, Mermaid, build commands
- [Review](.agents/instructions/review.md): how to review and critique draft content
- [Index maintenance](.agents/instructions/index-maintenance.md): keep `docs/INDEX.md` current. Mirrored in ase-cli: update both.
- [Glossary maintenance](.agents/instructions/glossary-maintenance.md): first-use expansion of abbreviations; keep `content/appendices/glossary.md` current
- [docs/INDEX.md](docs/INDEX.md): full map of all documentation

## Commands

```
npm run docs:dev     # local dev server with hot reload
npm run docs:build   # build to .vitepress/dist/
npm run docs:preview # preview the built site locally
```

## Skills

**When a task matches a skill below, load and follow that skill file before doing any work. Skills are not optional.**

- [**draft-section**](.agents/skills/draft-section.md): draft a content section from a chapter outline entry
- [**credibility-pass**](.agents/skills/credibility-pass.md): run the mandatory provenance and certainty pass on any drafted or reviewed content before sign-off
- [**review-chapter**](.agents/skills/review-chapter.md): consistency, tone, and DRY review of a draft chapter; load `plan.md` for outline alignment
- [**update-sidebar**](.agents/skills/update-sidebar.md): regenerate VitePress sidebar from `content/` file tree
- [**update-index**](.agents/skills/update-index.md): scan `docs/`, regenerate `docs/INDEX.md` and all listing files
