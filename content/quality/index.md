# Quality and Verification

> A spec without proof is a document. A test without intent is decoration. Quality is what closes the gap between them.

The spec-driven chapters argued that specifications are more important than code. That claim only holds if the spec is tied to executable proof that the implementation delivers what it promised. Without that proof, the spec is a polite hope and the code is whatever the agent decided to ship.

This topic is about how teams close that gap and keep it closed at agentic speed. Tests catch regressions in behavior. Evals catch regressions in the agent setup. Acceptance-criterion IDs stay stable through spec rewrites. Checkpoints catch the missing archive, the stale document, and the PR that arrived without proof. Security starts in the artifacts the agent reads. PRs stay small enough for one reviewer to inspect end to end. For teams that want it, `.principles` adds a machine-readable way to enforce code shape alongside behavior.

None of these are new by themselves. What is new is the speed they have to handle and the fact that the agent skips them by default unless the structure enforces them. Quality at agentic speed is structure, not discipline.

## Chapters

1. [Tests as Proof, Not Ritual](./tests-as-proof): a test is proof only if it fails when the implementation diverges from intent
2. [Test Strategy and Convention](./test-strategy): the test taxonomy, the convention document the agent reads, scenario complexity tiers, and the AC registry
3. [Agent Evaluation and Regression](./agent-evaluation): golden tests for the agent setup itself, A/B comparison of instruction-file changes
4. [AC IDs and Coverage](./ac-ids-coverage): bracket-format IDs, `Test-type:` field, dual `@Tag` tagging, the AC registry, positive and negative pairs
5. [Keeping Documentation Up to Date](./keeping-docs-up-to-date): stable links from prose to code, drift signals, and a three-layer check shape for important documents
6. [Before, During, After: The Three Checkpoints](./checkpoints): the foundation gate, the implementation gate, and the verification gate, and what each catches that the others cannot
7. [What the Scanners Miss](./what-the-scanners-miss): the failure modes standard tools do not see: pattern replication, deference to the user, and cleanup PRs that remove controls
8. [PR Taxonomy](./pr-taxonomy): docs, structural, behavioral. Three review styles, one class per PR
9. [.principles: Raising the Bar](./dot-principles): principle-as-code as an optional complement to specs and tests
