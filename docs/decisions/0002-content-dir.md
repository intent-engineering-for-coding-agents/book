---
status: accepted
date: 2026-05-09
decision-makers: Intent Engineering Contributors
---

# ADR-0002: Use `content/` for VitePress Prose

## Context and Problem Statement

VitePress defaults to reading pages from the project root or `docs/`. The Intent Engineering for Coding Agents repo follows a canonical directory convention where `docs/` is reserved for project documentation (architecture overview, ADRs, design docs). If VitePress also claimed `docs/`, the two purposes would collide — the repo could not dogfood its own convention.

## Considered Options

* `docs/` (VitePress default)
* `src/`
* `content/`

## Decision Outcome

Chosen option: "`content/`", because it is semantically correct (the directory holds book content), it avoids collision with the canonical `docs/` convention, and it frees `docs/` so this repo can demonstrate the Intent Engineering documentation structure it teaches.

### Consequences

* Good, because `docs/` stays available for its canonical purpose: architecture docs, ADRs, and design docs
* Good, because `content/` is semantically clear — it holds the book's written content
* Good, because the repo dogfoods its own convention, making it a credible reference for readers
* Good, because GitHub Pages no longer fights with `docs/` (Pages can deploy from `docs/` by default; using `content/` + Actions deploy removes that ambiguity entirely)
* Bad, because VitePress documentation examples use `docs/` as srcDir — contributors must remember the project deviates from the default; mitigated by the explicit note in `docs/README.md` and `.vitepress/config.mts`

## Pros and Cons of the Options

### `docs/` (VitePress default)

* Good, because it matches VitePress documentation examples exactly
* Bad, because it collides with the `docs/` convention this book teaches — the repo would contradict its own lesson
* Bad, because GitHub Pages has a built-in option to deploy from `docs/`, which creates ambiguity about whether the directory holds source Markdown or built output

### `src/`

* Good, because it is a common convention in many JavaScript projects
* Bad, because `src/` implies source code — Markdown prose is content, not code
* Neutral, because no collision with Intent Engineering conventions, but adds no clarity

### `content/`

* Good, because semantically accurate — the directory holds book content
* Good, because no collision with any Intent Engineering convention or GitHub Pages default
* Good, because reinforces the repo's role as a live example of the practices it teaches
* Neutral, because slightly non-standard for VitePress — requires explicit `srcDir: 'content'` in config

## Validation

Verified by: `srcDir: 'content'` set in `.vitepress/config.mts`, `npm run docs:build` passes, `docs/` directory remains dedicated to project documentation.
