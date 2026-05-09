# ADR-0001: Use VitePress for the Book Site

* Status: accepted
* Deciders: ASE Book Contributors
* Date: 2026-05-09

## Context and Problem Statement

The ASE Book needs a static site generator (SSG) to publish Markdown chapters as a readable website. The tool must support Mermaid diagrams, be easy to deploy via GitHub Actions, produce a clean readable theme without heavy customisation, and stay aligned with the plain-text-as-code principle.

## Considered Options

* VitePress
* Hugo
* Docusaurus
* mdBook

## Decision Outcome

Chosen option: "VitePress", because it delivers Mermaid support out of the box via a first-party plugin, produces a clean default theme requiring zero customisation, builds quickly on Vite, and targets exactly the audience this book is written for — developers already in the Vue/Vite ecosystem or adjacent to it.

### Consequences

* Good, because Mermaid diagrams work with a single plugin — no custom shortcodes or preprocessing
* Good, because the default theme is clean and readable with no CSS overrides needed at this stage
* Good, because VitePress builds are fast (Vite-based), keeping the authoring feedback loop short
* Good, because GitHub Actions deploy is straightforward — standard `npm ci && npm run docs:build` + `upload-pages-artifact`
* Bad, because VitePress is Vue-specific — contributors unfamiliar with Vue/npm will need to install Node.js; mitigated by the fact that authoring only requires a text editor, not Vue knowledge

## Pros and Cons of the Options

### VitePress

* Good, because Mermaid plugin is first-party and actively maintained
* Good, because default theme is production-quality with no customisation
* Good, because Vite hot-reload makes authoring fast
* Good, because `srcDir` config cleanly separates source from project root
* Neutral, because Vue ecosystem dependency — not a problem for this audience

### Hugo

* Good, because extremely fast builds, single binary, no Node.js required
* Bad, because Mermaid requires custom configuration or external JavaScript includes — not first-class
* Bad, because Hugo templates (Go templating) are harder to reason about than Markdown config
* Bad, because theme ecosystem is large but fragmented — choosing and maintaining a clean theme adds friction

### Docusaurus

* Good, because React-based and widely adopted, large plugin ecosystem
* Bad, because React dependency brings heavier tooling than needed for a book site
* Bad, because default theme requires more configuration to achieve the clean look VitePress provides out of the box
* Bad, because Docusaurus targets documentation sites with versioning — overhead not needed here

### mdBook

* Good, because lightweight, single binary (Rust), minimal setup
* Good, because the Rust Book uses it — proven for long-form technical writing
* Bad, because Mermaid support is via third-party preprocessor — less integrated than VitePress plugin
* Bad, because plugin ecosystem is limited; adding features (search, theming) requires more custom work
* Bad, because smaller community relative to the JavaScript SSG ecosystem this audience lives in

## Validation

Verified by: VitePress installed and `npm run docs:build` passes in CI. Mermaid plugin loads without error. GitHub Actions deploy workflow produces a working Pages site.
