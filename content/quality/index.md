---
type: index
title: Quality and Verification
---

# Quality and Verification

> A spec without evidence is a document. A test without intent is decoration. Quality is what closes the gap between them.

This topic is about evidence. The spec states the target. The tests, checks, and review structure show whether the implementation actually hit it.

Prompt engineering works on the input. Quality and Verification examines the output against the recorded target. Intent Engineering needs both sides of that boundary.

Tests catch behavior regressions. Acceptance Criterion IDs (AC IDs) hold traceability together when a spec gets edited. Checkpoints catch the stale document, the missing archive, and the PR that arrived without evidence.

None of these practices are new. What changes with coding agents is the rate of change and how quickly informal review starts missing things.

## Chapters

1. [Tests as Evidence, Not Ritual](./tests-as-evidence): a test is evidence only if it fails when the implementation diverges from intent
2. [Test Strategy and Convention](./test-strategy): the test taxonomy, the convention document the agent reads, scenario complexity tiers, and the AC registry
3. [AC IDs and Coverage](./ac-ids-coverage): bracket-format IDs, `Test-type:` field, dual `@Tag` tagging, the AC registry, positive and negative pairs
4. [Keeping Documentation Up to Date](./keeping-docs-up-to-date): stable links from prose to code, drift signals, and checks for important documents during implementation and in CI
5. [Before, During, After: The Three Checkpoints](./checkpoints): the foundation gate, the implementation gate, and the verification gate, and what each catches that the others cannot
6. [What the Scanners Miss](./what-the-scanners-miss): the failure modes standard tools do not see: pattern replication, deference to the user, and cleanup PRs that remove controls
7. [PR Taxonomy](./pr-taxonomy): docs, structural, behavioral. Three review styles, one class per PR
