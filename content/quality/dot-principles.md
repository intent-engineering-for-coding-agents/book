# .principles: Raising the Bar

There is a kind of bad code that passes every check you automate. The tests are green, the spec is matched, the PR taxonomy is clean, and the reviewer has nothing concrete to flag. The code is correct and also clumsy: nested conditionals where a guard clause would read better, a `processData` that does three unrelated things, a class with seven public methods and two callers. Nothing is wrong. Nothing is good. The person who would have caught it is the senior reviewer the team adopted agentic tooling to free up.

Specs verify behavior. Tests verify proof. PR taxonomy verifies hygiene. None of them verify quality in the sense a senior reviewer means quality: the code's readability, its adherence to the principles the team values, the small choices that compound into a codebase the next developer can work in.

## The gap

The dot-principles project (github.com/dot-principles) is one experimental answer. Principles are written as version-controlled Markdown files, organized into catalogs, and applied through agent commands. Each principle states one established belief about how code should be shaped, backed by a citable published source: a book with an ISBN, a paper with a DOI, or an authoritative specification.

The framework uses three commands: `dot-scout` (setup), `dot-prime` (load principles before coding), and `dot-audit` (check code against principles after). The check is agent-native: a deterministic linter cannot tell whether a function has one reason to change, but a model with the principle in context can make a defensible call.

This book uses three distinct questions to separate the layers: what should the code do, does it do it, and is it well-shaped. Specs answer the first. Tests answer the second. Principles answer the third.

*Sources: dot-principles project (github.com/dot-principles) (ongoing), the principle-as-code framework, its `dot-scout`/`dot-prime`/`dot-audit` commands, and the citable-published-source requirement. The three-question split across specs, tests, and principles is this book's framing.*

This is a different gap from style. A linter handles indentation, naming conventions, line length. A style guide is the deterministic version of taste. Principles are the cases where deterministic rules do not fit: when nesting is excessive, when a function has grown beyond one purpose, when an abstraction is leaking, when a refactor was started and not finished. The judgment of "this is too nested" is something a senior reviewer makes; the principle file makes the judgment reusable across reviewers, including agent ones.

## Optional, experimental, and easy to overdo

The framework is optional. A team using Intent Engineering without `.principles` has specs, tests, hooks, and PR taxonomy, which is most of the value of the book. Adding `.principles` is the next step for teams who notice that their reviews keep flagging the same shape issues and want to encode those issues somewhere the agent reads them.

`.principles` is an experiment, not a settled practice. As of 2026 the framework is small, the catalog is sparse, and the tooling is early. A team that adopts it is committing to maintaining their own catalog and adapting the framework as it changes. This is fine for teams who want to be on the front edge of the practice; it is a reason to wait for teams who want to adopt only mature tooling.

The audit step depends on the model. A model that does not have the principle in context will miss the violation. A model that has it but is unreliable in this kind of judgment will flag the wrong things. The signal-to-noise of the audit improves with practice: which principles are easy to check, which catch real issues, which produce too many false positives to be useful.

Principles also become bureaucracy. A catalog of 50 principles that nobody applies is a long document. The discipline is to keep the catalog small, the principles concrete, and the audit pass advisory rather than blocking until the catalog has earned trust. Start with three principles the team agrees on. Audit against those. Add more when the first three have proven their worth.

The Quality and Verification section closes here. Specs say what the code should do. Tests prove the code does it. AC IDs link the two. The before-during-after gates catch the lapses in the lifecycle. Security in depth defends against the failure modes the agent introduces. PR taxonomy keeps reviews readable. Principles raise the bar past correctness to shape. Each layer is small. Together they are the difference between an agent that ships work quickly and an agent that ships work well.

What survives a single developer applying all of this is a personal practice. What survives a team applying it is something else, and the next section is where the discipline meets the calendar, the sprint, and the coworker who has their own opinion about how this should work.
