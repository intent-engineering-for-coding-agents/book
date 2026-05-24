# .principles: Raising the Bar

The tests passed. The spec was matched. The PR taxonomy was clean. The reviewer had nothing to flag. The merged code was correct. It was also clumsy: nested conditionals where a guard clause would read better, a function named `processData` that processed three different things, a class with seven public methods of which two were used. Nothing was wrong. Nothing was good. The reviewer who would have caught the clumsiness was the senior developer the team was trying to free up by adopting agentic tooling.

Specs verify behaviour. Tests verify proof. PR taxonomy verifies hygiene. None of them verify quality in the sense that a senior reviewer means quality: the code's readability, its adherence to the principles the team values, the small choices that compound into a codebase the next developer can work in.

The `.principles` experiment is one answer to that gap.

## What `.principles` is

The dot-principles project (github.com/dot-principles) is a principle-as-code framework. The shape: principles are written as version-controlled Markdown files, organised into catalogues, and applied through three agent commands: `dot-scout`, `dot-prime`, and `dot-audit`. The framework is open, experimental, and complementary to specs and tests, not a replacement.

A principle file states one belief about how code should be shaped. "Functions should have one reason to change." "Error handling lives at the boundary, not in the core." "Tests should fail for one reason." Each principle is short, named, and reusable. The catalogue is a collection of these files, scoped to a team or a project.

The three commands close the loop on the principles.

`dot-scout` reads the codebase and identifies which principles the existing code already follows, which it violates, and which are unused. The output is a baseline: here is where you are relative to your principles.

`dot-prime` runs before a coding session. It loads the relevant principles into the agent's context, scoped to the files the session will touch. Not the entire catalogue; the subset the agent will need. The agent codes against the principles, not against a generic style guide.

`dot-audit` runs after a coding session, or as a CI step. It checks the produced code against the same principles, flagging violations. The check is AI-native: a deterministic linter cannot tell whether a function has one reason to change, but a model with the principle in context can make a defensible call.

*Sources: [.principles / dot-principles](https://github.com/dot-principles) and [example-catalog](https://github.com/dot-principles/example-catalog) (ongoing).*

## Where it fits

Specs are about behaviour. Tests are about proof. Principles are about shape.

The three answer different questions and the answers do not overlap. A spec describes what the code should do, not what shape it should have. A test verifies the spec is met, not whether the implementation that meets it is well-shaped. A principle audit catches the cases where the spec is met and the test passes and the code is still clumsy.

This is a different gap from style. A linter handles indentation, naming conventions, line length. A style guide is the deterministic version of taste. Principles are the cases where deterministic rules do not fit: when nesting is excessive, when a function has grown beyond one purpose, when an abstraction is leaking, when a refactor was started and not finished. The judgement of "this is too nested" is something a senior reviewer makes; the principle file makes the judgement reusable across reviewers, including agent ones.

The framework is optional. A team using ASE without `.principles` has specs, tests, hooks, and PR taxonomy, which is most of the value of the book. Adding `.principles` is the next step for teams who notice that their reviews keep flagging the same shape issues and want to encode those issues somewhere the agent can read them.

## A worked example

A team writing a Python service decides one of their principles is "no business logic in route handlers." The handler validates input, delegates to a service, and returns the response. Business decisions happen in the service layer.

The principle file lives at `.principles/no-logic-in-handlers.md`:

```markdown
# No business logic in route handlers

Route handlers validate input, delegate to a service, and shape the
response. Decisions about what the system should do live in the service
layer.

## Why

Handlers are tested with HTTP-shaped tests. Services are tested with
domain-shaped tests. Mixing the two makes both tests harder to write
and harder to read. The handler becomes a place where ad hoc behaviour
accumulates and the service becomes anaemic.

## Smells

- A handler that branches on business state (user.is_admin, order.status)
- A handler that calls more than one service method
- A handler whose tests assert business outcomes rather than HTTP outcomes
```

The principle is a Markdown file. It is reviewable. It is version-controlled. It can be argued about in a PR. When the agent writes a new endpoint, `dot-prime` loads this file into context, and the agent writes the handler in the expected shape because it has the principle in front of it. When `dot-audit` runs on the PR, it checks the new code against the principle and flags violations with reference to the file.

The principle does not need to be perfectly stated. It needs to be stated well enough that the agent can apply it consistently. The first version is rarely the last; principles get refined in PRs over time, like any other documentation.

## When it makes sense and when it does not

Small teams do not need `.principles`. The senior developer is in the PRs. The principles live in their head and get applied by their attention. The framework adds overhead with no marginal value.

The framework starts to pay off when the team is large enough that not every PR is reviewed by the developer who holds the principles. Or when multiple agents are running against the same codebase and the team wants the principles enforced consistently. Or when a senior developer is leaving and the team wants to keep the principles they cared about. In each case the gap is the same: the principles exist somewhere a single human can hold them, and the codebase is moving faster than that single human can scale.

The framework also pays off when the principles are non-obvious. "Use 4-space indentation" does not belong here; the linter handles it. "Error handling lives at the boundary" does belong here; no linter will catch the violation, but a model with the principle in context will. The dividing line is whether a deterministic rule can be written. If yes, write the rule. If no, write the principle.

## Honest caveats

`.principles` is an experiment, not a settled practice. As of 2026 the framework is small, the catalogue is sparse, and the tooling is early. A team that adopts it is committing to maintaining their own catalogue and adapting the framework as it changes. This is fine for teams who want to be on the front edge of the practice; it is a reason to wait for teams who want to adopt only mature tooling.

The audit step depends on the model. A model that does not have the principle in context will miss the violation. A model that has it but is unreliable in this kind of judgement will flag the wrong things. The signal-to-noise of the audit improves with practice: which principles are easy to check, which catch real issues, which produce too many false positives to be useful.

Principles can also become bureaucracy. A catalogue of 50 principles that nobody applies is just a long document. The discipline is to keep the catalogue small, the principles concrete, and the audit pass advisory rather than blocking until the catalogue has earned trust. Start with three principles the team agrees on. Audit against those. Add more when the first three have proven their worth.

The Quality and Verification section closes here. Specs say what the code should do. Tests prove the code does it. AC IDs link the two. The before-during-after gates catch the lapses in the lifecycle. Security in depth defends against the failure modes the agent introduces. PR taxonomy keeps reviews readable. Principles raise the bar past correctness to shape. Each layer is small. Together they are the difference between an agent that ships work quickly and an agent that ships work well.

What survives a single developer applying all of this is a personal practice. What survives a team applying it is something else, and the next section is where the discipline meets the calendar, the sprint, and the coworker who has their own opinion about how this should work.
