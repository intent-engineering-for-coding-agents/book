# ASE-FOUNDATION-DOCS-VS-CONTENT: docs/ is for Architecture

**Layer**: 1
**Categories**: foundation, repo-structure
**Applies-to**: all
**Summary**: `docs/` is for architecture, decisions, and design — not for your static site.

## Principle

The `docs/` directory carries structural weight. It houses ADRs, design documents, architecture overviews, and conventions. Content documents — blog posts, tutorial pages, static-site prose — live outside `docs/`. The enforcement mechanism is directory placement: structured documents that agents consult live under `docs/`; content that humans read lives outside it.

## Why it matters

When `docs/` is polluted with content pages, every agent session that scans it pays the context cost of loading prose it does not need. The directory boundary also signals to the team: what lives in `docs/` requires the same maintenance discipline as the codebase.

## Violations to detect

- Static-site content pages under `docs/`
- Architecture documents scattered outside `docs/`
- Empty `docs/` directories with no README or INDEX

## Good practice

```
project/
├── docs/                  ◄ architecture, ADRs, conventions (agent reads these)
│   ├── README.md
│   ├── INDEX.md
│   ├── architecture/
│   └── decisions/
├── content/               ◄ static-site prose (agent skips these)
└── AGENTS.md
```

## Sources

- ase-book, *"Document Types" chapter*, foundation section.
- ase-book, plan.md, Living Principles appendix.
