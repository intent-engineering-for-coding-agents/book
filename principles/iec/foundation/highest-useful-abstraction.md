# IEC-FOUNDATION-HIGHEST-USEFUL-ABSTRACTION: Move Knowledge Up

**Layer**: 1
**Categories**: foundation, source-first, abstraction
**Applies-to**: all
**Summary**: Move knowledge to the highest useful level of abstraction.

## Principle

Knowledge belongs at the highest useful level of abstraction. A stack choice belongs in an ADR or enterprise decision, not repeated as local convention in five services. A behavior change belongs in a committed spec before code. A diagram belongs in Mermaid or Structurizr DSL, not only in a drawing canvas. The artifact should express the decision where humans review it and coding agents read it before implementation.

## Why it matters

Coding agents rewrite implementation detail quickly. Knowledge left only in generated code, rendered diagrams, or repeated local patterns gets flattened into output. Once flattened, the agent treats it as another implementation detail and replaces it during the next change. Keeping knowledge above code preserves the decision before the generated artifact moves.

## Violations to detect

- Cross-cutting stack choices repeated only in service-local code
- Behavior changes implemented before the spec exists
- Diagrams committed only as rendered images
- Architectural rules inferred from existing code instead of recorded in `docs/`

## Good practice

Record durable decisions in `docs/`, preferably as ADRs. Record per-change behavior in committed specs. Keep diagrams as source. Let generated code express the decision, not become the only place where the decision lives.

## Sources

- intent-book, *"The Human-Agent Engineering Mindset" chapter*, front matter.
- Plain Text as Code Manifest, https://github.com/Plain-Text-as-Code.
- OpenSpec, https://openspec.dev/.
- Structurizr documentation, https://docs.structurizr.com/.
