# Quality and Verification

> A spec without proof is a document. A test without intent is decoration. Quality is what closes the gap between them.

This topic is about proof. The spec states the target. The tests, checks, and review structure show whether the implementation actually hit it.

Tests catch behavior regressions. Evals catch regressions in the agent setup. AC IDs hold traceability together when a spec gets edited. Checkpoints catch the stale document, the missing archive, and the PR that arrived without proof. For teams that want it, `.principles` adds machine-readable structure checks on top.

None of these practices are new. What changes with coding agents is the rate of change and how quickly informal review starts missing things.

## Chapters

1. [Tests as Proof, Not Ritual](./tests-as-proof): a test is proof only if it fails when the implementation diverges from intent
2. [Test Strategy and Convention](./test-strategy): the test taxonomy, the convention document the agent reads, scenario complexity tiers, and the AC registry
3. [Agent Evaluation and Regression](./agent-evaluation): golden tests for the agent setup itself, A/B comparison of instruction-file changes
4. [AC IDs and Coverage](./ac-ids-coverage): bracket-format IDs, `Test-type:` field, dual `@Tag` tagging, the AC registry, positive and negative pairs
5. [Keeping Documentation Up to Date](./keeping-docs-up-to-date): stable links from prose to code, drift signals, and a three-layer check structure for important documents
6. [Before, During, After: The Three Checkpoints](./checkpoints): the foundation gate, the implementation gate, and the verification gate, and what each catches that the others cannot
7. [What the Scanners Miss](./what-the-scanners-miss): the failure modes standard tools do not see: pattern replication, deference to the user, and cleanup PRs that remove controls
8. [PR Taxonomy](./pr-taxonomy): docs, structural, behavioral. Three review styles, one class per PR
9. [.principles: Raising the Bar](./dot-principles): principle-as-code as an optional complement to specs and tests
