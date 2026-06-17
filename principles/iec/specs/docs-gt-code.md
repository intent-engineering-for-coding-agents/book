# IEC-SPECS-DOCS-GT-CODE: Docs > Code

**Layer**: 1
**Categories**: specs, sdd, change-management
**Applies-to**: all
**Summary**: Documentation is the durable source of truth; specs are executable acceptance-criteria guardrails; generated code is downstream of both.

## Principle

Documentation is the durable source of truth. Architecture, decisions (ADRs), and design live in `docs/` and outlive any single change. A spec is not design: it is the testable acceptance criteria that guard a change and prove its behavior, archived as the canonical criteria per capability. Code is the output, downstream of both, and regenerable from them. The chain runs docs, then spec, then code. During a change, when the spec and the code disagree, the spec is canonical for behavior; when the design is wrong, the fix is upstream in the docs. Agents regenerate code from intent. They do not reliably regenerate intent from code.

## Why it matters

If code is the canonical artifact, every regeneration is a rewrite with no anchor, and the reasoning behind each non-obvious decision is lost the moment the author leaves. The why is unrecoverable from code: an agent reading the implementation produces an archaeology report, not a design record. Keeping the design in `docs/` and the behavior in specs makes regeneration repeatable and the path from intent to production auditable. The team's investment shifts from preserving code to preserving intent.

## Violations to detect

- Design rationale (why an option won, what was rejected) recorded only in specs or code, not in `docs/`
- Specs treated as the source of truth for architecture or cross-cutting decisions
- `openspec/specs/` described as holding design rather than acceptance criteria
- Code that has drifted from its spec with the spec unchanged
- PRs where the code diff is reviewed without consulting the spec or the docs it implements

## Good practice

Decisions and design go in ADRs and design docs under `docs/`. A spec earns its role by being testable, AC-tagged, sized to be readable, and scoped to one change. If the spec cannot generate a test suite that proves the implementation, it is not doing its job. Review intent before diff: the docs and the spec first, then the code.

## Sources

- intent-book, *"Docs > Code" chapter*, specs section.
- OpenSpec; LeanSpec; Dave Farley, *Modern Software Engineering*.
