# .principles: Raising the Bar

There is a kind of bad code that passes every check you automate. The tests are green, the spec is matched, the PR taxonomy is clean, and the reviewer has nothing concrete to flag. The code is correct and also clumsy: nested conditionals where a guard clause would read better, a `processData` that does three unrelated things, a class with seven public methods and two callers. Nothing is wrong, and nothing is good. The person who would have caught it is the senior reviewer the team adopted agentic tooling to free up.

Specs verify behavior. Tests verify proof. PR taxonomy verifies hygiene. None of them verify quality in the sense a senior reviewer means quality: the code's readability, its adherence to the principles the team values, the small choices that compound into a codebase the next developer has to maintain.

## The gap

The [.principles project](https://dot-principles.github.io/) is one experimental answer. Principles are written as version-controlled Markdown files, organized into catalogs, and applied through agent commands. Each principle states one established belief about how code should be shaped, backed by a citable published source: a book with an ISBN, a paper with a DOI, or an authoritative specification.

The framework includes setup, load, and audit steps. The check is agent-native. A deterministic linter cannot tell whether a function has one reason to change. A model with the principle in context often makes a defensible call.

This book uses three distinct questions to separate the layers: what should the code do, does it do it, and is it well-shaped. Specs answer the first, tests answer the second, and principles answer the third.

*Sources: [.principles](https://dot-principles.github.io/) (ongoing), the principle-as-code framework and its citable-published-source requirement. The three-question split across specs, tests, and principles is this book's framing.*

The third question carries more weight the moment no reviewer is in the room. An agent running unattended cannot ask a senior developer whether the code is well-shaped, so the judgment has to already live somewhere the agent reads. Tests answer whether the code meets the spec. Principles answer whether it follows the practice the field already treats as good, each one backed by a citable source rather than local taste.

This is why a team encodes quality as principles at all. Proof is the exit signal an unattended run cannot do without. Principles are the second signal a team adds beside it, advisory until the catalog earns enough trust to block. A solo developer or team might extend the catalog with their own principles, but the weight comes from the established ones.

This is a different gap from style. A linter handles indentation, naming conventions, line length. A style guide is the deterministic version of taste. Principles are the cases where deterministic rules do not fit: when nesting is excessive, when a function has grown beyond one purpose, when an abstraction is leaking, when a refactor was started and not finished. The judgment of "this is too nested" is something a senior reviewer makes. The principle file makes the judgment reusable across reviewers, including agent ones.

## Optional, experimental, and easy to overdo

The framework is optional. A team using Intent Engineering without `.principles` has specs, tests, hooks, and PR taxonomy, which is most of the value of the book. Adding `.principles` is the next step for teams who notice that their reviews keep flagging the same shape issues and want to encode those issues somewhere the agent reads them.

`.principles` is an experiment, not a settled practice. As of mid-2026 the framework is small, the catalog is sparse, and the tooling is early. A team that adopts it is committing to maintaining their own catalog and adapting the framework as it changes. This is fine for teams who want to be on the front edge of the practice. It is a reason to wait for teams who want to adopt only mature tooling.

*Sources: [.principles](https://dot-principles.github.io/) (ongoing), project maturity and catalog size as a perishable mid-2026 snapshot.*

The audit step depends on the model. A model that does not have the principle in context will miss the violation. A model that has it but is unreliable in this kind of judgment will flag the wrong things. The signal-to-noise of the audit improves with practice: which principles are easy to check, which catch real issues, which produce too many false positives to be useful.

Principles also become bureaucracy. A catalog of 50 principles that nobody applies is a long document. The discipline is to keep the catalog small, the principles concrete, and the audit pass advisory rather than blocking until the catalog has earned trust. Start with three principles the team agrees on, audit against those, and add more when the first three have proven their worth.

## Tooling note

If you want to inspect the workflow, `.principles` provides three commands: `dot-scout` (setup), `dot-prime` (load principles before coding), and `dot-audit` (audit after). The hard part is not running an audit. The hard part is making the judgment survive a team calendar.
