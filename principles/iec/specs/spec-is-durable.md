# IEC-SPECS-SPEC-IS-DURABLE: The Spec is the Durable Artifact

**Layer**: 1
**Categories**: specs, sdd, change-management
**Applies-to**: all
**Summary**: Specifications are more important than generated code — the spec is durable; the implementation is disposable.

## Principle

The specification is the durable artifact. The implementation is disposable. With agentic regeneration, code is downstream of spec. Review intent before diff. Specs outlive the codebase; agents regenerate code from spec, not the reverse. This inverts the historical default where code was the canonical artifact and specs were a temporary alignment tool.

## Why it matters

If the code is the canonical artifact, every regeneration is a rewrite from scratch with no anchor. If the spec is canonical, regeneration is repeatable. The team's investment shifts from preserving code to preserving intent. The code can be thrown away and rebuilt because the spec tells the agent what to build.

## Violations to detect

- Specs that reference implementation details (line numbers, class names) instead of intent
- Code that has drifted from its spec with the spec unchanged
- PRs where the code diff is reviewed without consulting the spec
- Specs that describe current behavior without indicating what was intended

## Good practice

A spec earns its status as canonical by being: testable, AC-tagged, sized to be readable, and scoped to one change. If the spec cannot generate a test suite that proves the implementation, it is not canonical.

## Sources

- intent-book, *"Spec > Code" chapter*, specs section.
- OpenSpec; LeanSpec; Dave Farley, *Modern Software Engineering*.
