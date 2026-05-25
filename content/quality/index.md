# Quality and Verification

> A spec without proof is a document. A test without intent is decoration. Quality is what closes the loop between them.

The spec-driven chapters argued that specifications are more important than code. That claim only holds if the spec is connected to something harder than intent: executable proof that the implementation actually delivers what the spec promised. Without that proof, the spec is a polite hope and the code is whatever the agent decided to ship.

This section is about how teams close that loop and keep it closed at agentic speed. Tests that catch real regressions, not coverage decoration. Evaluation that catches the agent setup regressing, not just the code. Acceptance-criterion IDs that survive the spec being rewritten. Checkpoints that catch the lapses humans skip. Security that lives in the artefacts the agent reads, not in a stage at the end. PRs that one reviewer can actually review. And, for teams that want it, a way to encode the shape the code should take alongside the behaviour it should exhibit.

None of these are new individually. What is new is the speed at which they have to operate, and the fact that the agent will skip every one of them by default if the structure does not enforce them. Quality at agentic speed is the structure, not the discipline.

## Chapters

1. [Tests as Proof, Not Ritual](./tests-as-proof): a test is proof only if it would fail when the implementation diverges from intent
2. [Test Strategy and Convention](./test-strategy): the test taxonomy, the convention document the agent reads, scenario complexity tiers, and the AC registry
3. [Agent Evaluation and Regression](./agent-evaluation): golden tests for the agent setup itself, A/B comparison of instruction-file changes
4. [AC IDs and Positive/Negative Coverage](./ac-ids-coverage): bracket-format IDs, `Test-type:` field, dual `@Tag` tagging, the AC registry, positive and negative pairs
5. [Before, During, After: The Three Checkpoints](./checkpoints): the foundation gate, the implementation gate, and the verification gate, and what each catches that the others cannot
6. [Security in Depth](./security-in-depth): the failure modes standard tools don't see: pattern replication, deference to the user, and cleanup PRs that remove controls
7. [PR Taxonomy](./pr-taxonomy): docs, structural, behavioural; three review styles, one class per PR
8. [.principles: Raising the Bar](./dot-principles): principle-as-code as an optional complement to specs and tests
