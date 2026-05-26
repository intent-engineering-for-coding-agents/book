# .principles: Raising the Bar

The tests passed. The spec was matched. The PR taxonomy was clean. The reviewer had nothing to flag. The merged code was correct. It was also clumsy: nested conditionals where a guard clause would read better, a function named `processData` that processed three different things, a class with seven public methods of which two were used. Nothing was wrong. Nothing was good. The reviewer who would have caught the clumsiness was the senior developer the team was trying to free up by adopting agentic tooling.

Specs verify behaviour. Tests verify proof. PR taxonomy verifies hygiene. None of them verify quality in the sense that a senior reviewer means quality: the code's readability, its adherence to the principles the team values, the small choices that compound into a codebase the next developer can work in.

The `.principles` experiment is one answer to that gap.

## What `.principles` is

The dot-principles project (github.com/dot-principles) is a principle-as-code framework. The shape: principles are written as version-controlled Markdown files, organised into catalogues, and applied through three agent commands: `dot-scout`, `dot-prime`, and `dot-audit`. The framework is open, experimental, and complementary to specs and tests, not a replacement.

A principle file states one established belief about how code should be shaped. "Functions should have one reason to change". "Error handling lives at the boundary, not in the core". "Tests should fail for one reason". Each principle is short, named, and reusable, and each has a citable published source behind it: the public catalogue accepts only principles grounded in the software engineering literature, backed by a book with an ISBN, a paper with a DOI, or an authoritative specification. Team conventions without a published source go in a team-namespaced fork rather than the shared catalogue.

Structural design patterns get Mermaid class diagrams alongside the prose. The Gang of Four Bridge principle in the public catalogue includes the two-hierarchy decomposition as a diagram: readable by the developer as reference material, and readable by the agent as a structural specification to match code against. Violations that no lint rule can catch, like a class hierarchy multiplying along two orthogonal axes, become straightforward audit findings when the agent has the canonical diagram in context.

The three commands close the loop on the principles.

`dot-scout` is the setup step. It scans the project tree, detects the languages and frameworks in use, and places `.principles` files at the appropriate directory levels throughout the project, exactly as `.gitignore` files propagate git exclusions. Each generated file activates the principle groups relevant to that subtree: `@kotlin`, `@typescript`, `@schema`. Subdirectories inherit from parents and can layer on more specific groups or suppress individual principles with `!ID`.

`dot-prime` runs before a coding session. It resolves the active `.principles` hierarchy for the files the session will touch and distils it into a compact set of rules the agent keeps in context while coding. Not the entire catalogue; the five to ten principles that apply here. The agent codes against the principles, not against a generic style guide.

`dot-audit` runs after a coding session, or as a CI step. It checks the produced code against the active principles, reports findings grouped by severity, and, when asked, fixes them, commits, pushes, and opens a PR. The check is AI-native: a deterministic linter cannot tell whether a function has one reason to change, but a model with the principle in context can make a defensible call.

The framework does not teach the agent software engineering. The agent already knows SOLID, OWASP, DDD, and the rest. What `.principles` gives it is intent: which principles matter here, in this part of your codebase.

*Sources: [.principles / dot-principles](https://github.com/dot-principles) and [example-catalog](https://github.com/dot-principles/example-catalog) (ongoing).*

## Where it fits

Specs are about behaviour. Tests are about proof. Principles are about shape.

The three answer different questions and the answers do not overlap. A spec describes what the code should do, not what shape it should have. A test verifies the spec is met, not whether the implementation that meets it is well-shaped. A principle audit catches the cases where the spec is met and the test passes and the code is still clumsy.

This is a different gap from style. A linter handles indentation, naming conventions, line length. A style guide is the deterministic version of taste. Principles are the cases where deterministic rules do not fit: when nesting is excessive, when a function has grown beyond one purpose, when an abstraction is leaking, when a refactor was started and not finished. The judgement of "this is too nested" is something a senior reviewer makes; the principle file makes the judgement reusable across reviewers, including agent ones.

The framework is optional. A team using ASE without `.principles` has specs, tests, hooks, and PR taxonomy, which is most of the value of the book. Adding `.principles` is the next step for teams who notice that their reviews keep flagging the same shape issues and want to encode those issues somewhere the agent can read them.

## A worked example

A team writing a Python service decides one of their principles is "no business logic in route handlers". The handler validates input, delegates to a service, and returns the response. Business decisions happen in the service layer.

The team creates a principle file in their catalogue at `principles/team/no-logic-in-handlers.md`:

```markdown
# TEAM-NO-LOGIC-IN-HANDLERS: No business logic in route handlers

**Layer**: 1
**Categories**: code-design, http, separation-of-concerns
**Applies-to**: python, flask, fastapi
**Summary**: Route handlers validate input, delegate to a service, and shape the response.

## Principle

Route handlers validate input, delegate to a service, and shape the
response. Decisions about what the system should do live in the service
layer. A handler that branches on business state is doing work that
belongs elsewhere.

## Why it matters

Handlers are tested with HTTP-shaped tests. Services are tested with
domain-shaped tests. Mixing the two makes both tests harder to write
and harder to read. The handler becomes a place where ad hoc behaviour
accumulates and the service becomes anaemic.

## Violations to detect

- A handler that branches on business state (user.is_admin, order.status)
- A handler that calls more than one service method
- A handler whose tests assert business outcomes rather than HTTP outcomes

## Good practice

```python
@app.route("/orders/<id>/cancel")
def cancel_order(id):
    order = OrderValidator(id).validate_exists()
    CancelOrderService().cancel(order)
    return jsonify({"status": "cancelled"}), 200
```

## Sources

- Team convention, adopted 2024.
```

`TEAM-NO-LOGIC-IN-HANDLERS` is a team-local principle, so `Team convention` is a valid source. A principle submitted to the public catalogue would need a published reference: a book, a paper with a DOI, or an authoritative specification.

The `.principles` file at the repo root declares it active:

```
@team
```

A single line. The agent reads `.principles`, resolves `@team` to the group definition in `groups/team.yaml`, finds `TEAM-NO-LOGIC-IN-HANDLERS`, loads the full content from the catalogue. When the agent writes a new endpoint, `dot-prime` loads this file into context, and the agent writes the handler in the expected shape because it has the principle in front of it. When `dot-audit` runs on the PR, it checks the new code against the principle and flags violations with reference to the file.

The principle is a Markdown file, reviewable, version-controlled, debatable in a PR. The `.principles` selection file is three lines of text. The catalogue directory mirrors the team's structure. The ase-book itself ships a 54-principle catalogue under `principles/ase/` with a group at `groups/ase-book.yaml`, activated by the single line `@ase-book` in `.principles`.

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
