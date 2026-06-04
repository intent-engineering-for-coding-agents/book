# IEC-SPECS-DEAD-SPEC-WORSE: A Dead Spec is Worse Than No Spec

**Layer**: 1
**Categories**: specs, maintenance, drift
**Applies-to**: all
**Summary**: A dead spec tells the agent authoritatively about behavior the system no longer has.

## Principle

A dead spec is worse than no spec. It tells the agent authoritatively about behavior the system no longer has. The agent trusts the spec. When the spec is wrong, the agent generates code that implements the wrong behavior with confidence. No spec at least means the agent knows it is improvising.

## Why it matters

The spec's authority is both its strength and its danger. When the code drifts and the spec stays, the spec becomes a liability. The agent loads it, trusts it, and produces PRs that reverse the drift — reintroducing bugs that were intentionally removed or removing features that were intentionally added.

## Violations to detect

- Specs that describe behavior that no longer exists in the codebase
- Spec files that have not been updated since the last implementation change
- Implementations that differ from their spec with no explanation

## Good practice

Archive specs when the PR merges. Do not leave them as permanent documentation. The archive is the record of what was intended; the code is the record of what is. If an archived spec needs to be consulted, open a new spec.

## Sources

- intent-book, *"When Intent Engineering Fails" chapter*, foundation section.
- intent-book, *"Spec Lifecycle" chapter*, specs section.
- OpenSpec archive flow.
