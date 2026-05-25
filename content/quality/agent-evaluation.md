# Agent Evaluation and Regression

The team added one bullet to `AGENTS.md`: "prefer composition over inheritance". It seemed harmless. The next week the agent started rewriting service classes into helper functions even where the inheritance hierarchy carried meaningful invariants. The PRs passed review because each one looked plausible in isolation. The shape of the codebase shifted in a direction nobody had asked for. The line was eventually removed. Nobody could say exactly when the drift started.

Tests prove the code is right. They say nothing about whether the agent setup is right. That second loop is the missing one in most teams.

## Two different feedback loops

The tests in the previous chapter close the loop between spec and implementation. A failing test says "the code does not match the intent". That works because both sides of the comparison are concrete: the spec is a document, the test is executable, the implementation is the artefact under scrutiny.

The agent setup has no equivalent. `AGENTS.md`, the instruction files, the skill library, the hook configuration: these are inputs to the agent, not outputs of it. Their effect is visible only in the code the agent produces, one PR at a time, and only when someone is paying attention. A change to `AGENTS.md` that makes the agent measurably worse can sit in the repo for weeks before anyone notices. A change that makes it slightly better is invisible by definition.

This is the open loop. The next sections describe how to close it.

*Sources: ThoughtWorks, Technology Radar Vol 34 (April 2026). Anthropic, "Building effective agents" (Dec 2024). Rick Hightower, "Agentic Coding: GSD vs Spec Kit vs OpenSpec vs Taskmaster AI" (Feb 27, 2026).*

## Golden tests for the agent

A golden test for the agent is a fixed task with a known good output. The task is small enough to run in one session: a specific spec, a specific change folder, a specific repo state. The expected output is the code the agent should produce, or a structural property of that code that a check can verify. Run the task twice, against two configurations of `AGENTS.md` or the skill library, and compare.

The output rarely matches byte for byte. A useful golden test does not demand it. It checks structural properties: did the agent put the validation in the service layer? Did it write tests against the acceptance criterion IDs the spec named? Did it update the index after creating a new file under `docs/`? Each of those is a yes-or-no question with an unambiguous answer.

A small suite of these tasks is the eval set. Five tasks covering the workflows the team relies on is enough to start. Each task has the same shape: starting repo state, spec to implement, properties the output must satisfy. Re-run the suite when the agent configuration changes. The score is the count of properties satisfied. The score moving down on a configuration change is a regression that has nothing to do with the code under test.

## A/B comparison of two AGENTS.md versions

The simplest evaluation is comparative. Take the current `AGENTS.md`, run the eval suite, record the score. Apply the proposed change. Run the suite again. The delta is the evidence.

What this catches is the change that sounds reasonable and is not. "Add a section explaining our convention for naming" looks like an improvement. If the eval suite shows the agent now produces less reliable code on three of five tasks, the change is regressing the agent's attention budget. The context file got longer; the parts that mattered got crowded out. Without the comparison, that tradeoff is invisible. With it, the choice is concrete: which file produced better outcomes?

This is the same discipline that A/B testing applies to product changes, scaled down to the size that fits a single repo. The point is not statistical rigour. The point is that the change has consequences you cannot otherwise observe, and a five-task suite catches more of them than intuition does.

## Regression when a skill or hook changes

Skills and hooks have the same problem. A skill that used to update the index reliably starts skipping the README files because a step was rewritten. A hook that used to catch missing tests starts passing because the pattern was tightened too far. Neither change shows up in the diff as obviously broken. The skill still runs. The hook still fires. The outcomes drift.

The defence is the same: a fixed task that exercises the skill or hook, run before and after the change. The skill that regenerates the index runs against a known directory state and is checked against the expected index output. The hook that catches missing tests runs against a known PR diff that is supposed to fail and against another that is supposed to pass. The same kind of golden test, scoped to a single component.

Most teams will not maintain this for every skill. The economics work out only for the ones that fail expensively. The skill that touches the documentation index is worth a golden test because its failure mode is silent drift. The skill that scaffolds a new ADR file is not, because its failure mode is the agent immediately seeing the wrong output and asking the user.

## When to invest

Not every team needs this. A solo developer working with an agent on one project has the option of paying attention. The eval suite for them is in their head: they remember what the agent used to do and they notice the day it stops doing it. The investment in formalising the eval is wasted on this scale.

The investment becomes worthwhile when more than one developer shares the same `AGENTS.md`, when more than one agent runs against the same codebase, when the rate of change in the instruction files exceeds the rate at which any one person reviews the resulting code. At that point the eval suite is the only thing that catches a quiet regression before it has shaped a week of PRs.

The book's central claim, repeated through Foundation and AI Instructions and Spec-Driven, is that at agentic speeds manual verification is not enough. The evidence base for that claim is the closed loop. The tests close it for the code. The eval suite closes it for the agent setup. Without both, every speed-up is also a way to ship more of the wrong thing faster.

## Honest caveats

Eval suites for agents are still early practice. There is no widely-shared tooling for this in 2026. Hightower's tool-comparison work and Anthropic's effective-agents guidance both point at evaluation as the missing piece; neither prescribes a complete framework. What is described above is the minimum viable shape: a fixed task, a structural check, a comparison.

The hardest part is keeping the suite calibrated. A task that the agent reliably nails today becomes uninformative tomorrow when the underlying model improves. A task that the agent reliably fails today may be testing a property the agent cannot satisfy with any configuration. The suite drifts in both directions and needs periodic curation. Treat it as a living artefact, not a one-time setup.

## Concrete tooling: ase eval

The `eval-demo` directory in `ase-cli` ships the A/B scenario from this chapter as a runnable example. Two target states, `baseline/` and `after-drift/`, represent what the same agent produced under two versions of `AGENTS.md`. The eval suite does not know which version ran; it only checks what the agent left behind.

```
examples/eval-demo/
├── eval/
│   ├── 01-service-architecture/
│   │   ├── task.md       # what to ask the agent
│   │   └── checks.yaml   # properties to verify after
│   ├── 02-test-traceability/
│   │   └── checks.yaml
│   └── 03-documentation/
│       └── checks.yaml
├── baseline/
├── after-drift/
└── after-fix/
```

The `checks.yaml` for task one:

```yaml
task: "Service uses class-based design with validation in the service layer"
checks:
  - id: service-uses-class
    description: "user_service.py defines a class"
    type: file_contains
    file: src/user_service.py
    pattern: "^class "
  - id: validation-in-service
    description: "Validation is a method on the service class"
    type: file_contains
    file: src/user_service.py
    pattern: "_validate"
```

Run `ase eval` against each state from `examples/eval-demo/`:

```bash
ase eval --path baseline --eval-dir eval
```

```
Task                            Pass  Warn  Fail
------------------------------------------------
01-service-architecture            3     0     0
02-test-traceability               4     0     0
03-documentation                   2     0     0
------------------------------------------------
Total                              9     0     0

Score: 9/9 (100%)
```

```bash
ase eval --path after-drift --eval-dir eval
```

```
Task                            Pass  Warn  Fail
------------------------------------------------
01-service-architecture            1     0     2
02-test-traceability               2     0     2
03-documentation                   2     0     0
------------------------------------------------
Total                              5     0     4

Score: 5/9 (55%)

Failures:
  01-service-architecture / service-uses-class: src/user_service.py does not match '^class '
  01-service-architecture / validation-in-service: src/user_service.py does not match '_validate'
  02-test-traceability / tests-have-ac-markers: tests/test_user_service.py does not match '@pytest.mark.ac'
  02-test-traceability / tests-reference-ac-ids: tests/test_user_service.py does not match 'USER-'
```

The score dropped from 100% to 55%. Four checks failed, both from the tasks that encode architectural intent. The documentation task passed in both states: the agent kept the index current even after the `AGENTS.md` change. The eval suite caught what code review missed, and it caught it before anyone had named the drift as a pattern.

The suite just told you what broke. The next question is whether your fix actually works.

Revert or refine the `AGENTS.md` change, run the agent against the same tasks, and capture the output to `after-fix/`. The eval does not care what changed or why; it checks the same properties against whatever the agent left behind.

```bash
ase eval --path after-fix --eval-dir eval
```

```
Task                            Pass  Warn  Fail
------------------------------------------------
01-service-architecture            3     0     0
02-test-traceability               4     0     0
03-documentation                   2     0     0
------------------------------------------------
Total                              9     0     0

Score: 9/9 (100%)
```

Full recovery. The revert worked.

Partial improvement is also signal. A score of 7/9 after a refined fix means the direction is right but the fix did not land cleanly. The suite names which checks still fail. That is more actionable than "it seems better" after reading a few PRs.

Measuring deliberate improvement works the same way, run in reverse. The score does not go above 100%. When you want the agent to start producing behavior it does not currently produce, write the check before making the change. The baseline fails it; the score drops. That drop is the spec: the agent does not yet satisfy this property. Update `AGENTS.md`, run the agent, run eval. Recovery to 100% is the evidence the improvement landed.

The suite is a spec, not a benchmark. Raising the bar means adding checks. Clearing the bar means satisfying them.

If you want to try it: `pip install ase-cli`, clone `ase-cli`, and run `ase eval` from `examples/eval-demo/`. The pre-committed output is in `score-baseline.txt`, `score-after-drift.txt`, and `score-after-fix.txt`. This book's own agent skills are tested the same way, in the `eval/` directory at the repo root.

The acceptance-criterion IDs the previous chapter assumed exist are the link between intent and proof. The next chapter is how to make those IDs durable enough to survive everything else in this section.
