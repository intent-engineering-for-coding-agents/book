# docs/ Index

Agent-facing map. Load this file to understand what's in `docs/` before reading anything else.

| File | Description |
|---|---|
| [README.md](README.md) | Architecture overview — VitePress setup, CI, directory structure |
| [INDEX.md](INDEX.md) | This file |
| [decisions/INDEX.md](decisions/INDEX.md) | Agent-facing map of `docs/decisions/` |
| [decisions/README.md](decisions/README.md) | ADR listing — human-facing, status + date |
| [decisions/0001-vitepress.md](decisions/0001-vitepress.md) | ADR-0001: VitePress chosen over Hugo, Docusaurus, mdBook |
| [decisions/0002-content-dir.md](decisions/0002-content-dir.md) | ADR-0002: `content/` for prose, freeing `docs/` for ASE documentation |
| design/ | Feature design docs — empty until needed |

## AI instruction hub

The `.agents/` directory is not under `docs/` but is part of the repo's AI instruction structure:

| File | Description |
|---|---|
| [AGENTS.md](../AGENTS.md) | AI entry point — TOC for all instructions and skills |
| [.agents/instructions/writing.md](../.agents/instructions/writing.md) | Audience, structure, sources, formatting mechanics |
| [.agents/instructions/voice.md](../.agents/instructions/voice.md) | How the prose should sound — voice, rhythm, forbidden AI patterns |
| [.agents/instructions/vitepress.md](../.agents/instructions/vitepress.md) | VitePress config, sidebar, Mermaid, build commands |
| [.agents/instructions/review.md](../.agents/instructions/review.md) | How to review and critique draft chapters |
| [.agents/instructions/index-maintenance.md](../.agents/instructions/index-maintenance.md) | When and how to update INDEX.md |
| [.agents/instructions/glossary-maintenance.md](../.agents/instructions/glossary-maintenance.md) | First-use abbreviation expansion; keep `content/appendices/glossary.md` current |
| [.agents/skills/draft-section.md](../.agents/skills/draft-section.md) | Draft a content section from a chapter outline |
| [.agents/skills/review-chapter.md](../.agents/skills/review-chapter.md) | Consistency, tone, DRY review of a draft |
| [.agents/skills/update-sidebar.md](../.agents/skills/update-sidebar.md) | Regenerate VitePress sidebar from content/ file tree |
| [.agents/skills/update-index.md](../.agents/skills/update-index.md) | Scan docs/, regenerate INDEX.md and listing files |
