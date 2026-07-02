# Agent Evaluation and Regression

Your agent instructions, skills, and hooks are code. Nobody tests them. They drift anyway.

In the companion repo's `examples/eval-demo`, one line added to `AGENTS.md` ("Prefer functions over classes for utility code") pushed the agent away from the project's conventions. The baseline output scores 9/9. The drifted output scores 5/9.

Tests prove the code is right. They say nothing about whether the agent setup is right. That second check is the one most teams miss.

*Sources: intent-engineering-for-coding-agents/cli `examples/eval-demo/README.md` (ongoing), the one-line `AGENTS.md` change and the drift symptoms described. intent-engineering-for-coding-agents/cli `examples/eval-demo/score-baseline.txt` and `examples/eval-demo/score-after-drift.txt` (ongoing), the 9/9 and 5/9 demo scores.*

## Two different feedback loops

The tests in the previous chapter close the gap between spec and implementation. A failing test says the code does not match the intent. Both sides of that comparison are concrete: the spec is a document, the test is executable, the implementation is the artifact under scrutiny.

The agent setup has no built-in equivalent. `AGENTS.md`, the instruction files, the skill library, and the hook configuration are inputs to the agent, not outputs. Their effect shows up only in the code the agent produces, one PR at a time. A change that makes the agent worse can sit in the codebase for weeks before anyone notices. A change that makes it slightly better is hard to prove without a fixed task.

This is the open gap. Nothing in the toolchain closes it for you.

*Sources: Anthropic, "Building effective agents" (December 2024), evaluation as part of an effective agent setup. Applying the same check to instruction files specifically is this book's synthesis.*

## Golden tests for the agent

A golden test for the agent is a fixed task with a known good output. The task is small enough for one session: a specific repo state, a specific spec, a specific change to make. It does not check the exact code the agent writes. The agent rarely produces the same file twice, and a test demanding byte-for-byte equality breaks on the first rewording. A golden test pins down a set of structural properties instead, and a check verifies them.

The companion repo's eval demo includes a task file with a plain instruction:

```text
Ask the agent to implement the create_user endpoint for the user
service, following the instructions in AGENTS.md. Verify that the
agent used a class-based design and placed validation in the
service layer.
```

The check that grades it does not read the code for style. It asks yes-or-no questions against the files the agent wrote:

```yaml
task: "Service uses class-based design with validation in the service layer"
checks:
  - id: service-file-exists
    type: file_exists
    path: src/user_service.py
  - id: service-uses-class
    type: file_contains
    file: src/user_service.py
    pattern: "^class "
  - id: validation-in-service
    type: file_contains
    file: src/user_service.py
    pattern: "_validate"
```

Three properties, three unambiguous answers: did the file exist, did the agent define a class, did it put validation behind a `_validate` method. Run the same task against two versions of the agent instructions, and the answers move. That movement is the signal.

A handful of these tasks is the eval set, each covering a workflow the team relies on. Start with a set small enough to re-run by hand. Every task follows the pattern above: start from a fixed repo state, implement the spec, then grade the output against the properties it must satisfy.

The score is the count of properties satisfied. If that score drops after a configuration change, you have a regression even if the generated code still runs. The eval-set design and the structural-check format here are this book's convention, not a settled standard. Hightower's survey of spec-driven tooling names evaluation as a gap across the tools he compares, and it does not prescribe a format.

*Sources: Anthropic, "Building effective agents" (December 2024), evaluation as part of agent setup. Rick Hightower, "Agentic Coding: GSD vs Spec Kit vs OpenSpec vs Taskmaster AI" (February 27, 2026), evaluation as a gap in SDD tooling. intent-engineering-for-coding-agents/cli `examples/eval-demo/` (ongoing), one concrete eval set and structural-check format.*

## A/B comparison of two instruction-file versions

The simplest evaluation is comparative. Run the suite against the current agent instructions, record the score, apply the proposed change, run it again. The delta is the evidence.

In the companion repo's example, the baseline configuration scores nine of nine. Add the one line about preferring functions to classes, regenerate the same three tasks, and the score drops to five of nine. The service task loses its class and its `_validate` method. The test task loses the `@pytest.mark.ac` markers that tied tests back to acceptance criteria. None of that reads as broken in review. The code runs. The tests pass. The structural properties the team cared about quietly go missing.

This is the kind of change a reviewer waves through. "Prefer functions over classes" looks harmless until the agent starts flattening service objects and dropping the test markers your workflow relies on. The comparison makes the damage visible. You are no longer arguing about taste. You are choosing between two instruction files with different failure rates.

*Sources: Anthropic, "Building effective agents" (December 2024), evaluation as a feedback loop for agent behavior. intent-engineering-for-coding-agents/cli `examples/eval-demo/score-baseline.txt` and `examples/eval-demo/score-after-drift.txt` (ongoing), the example A/B scores cited.*

## Regression when a skill or hook changes

Skills and hooks have the same failure mode. A skill that used to update the index starts skipping the README files because one step was rewritten. A hook that used to catch missing tests starts passing because its pattern was tightened too far. Neither change looks broken in the diff. The skill still runs, the hook still fires, the outcomes drift.

The defense is the same: a fixed task that exercises the skill or hook, run before and after the change. The index skill runs against a known directory state and is checked against the index it should produce. The missing-tests hook runs against one PR diff that should fail and another that should pass. Same golden test, scoped to a single component.

Most teams will not maintain this for every skill. The economics only work for the ones that fail expensively. The skill that touches the documentation index earns a golden test because its failure mode is silent drift. The skill that scaffolds a new ADR file does not, because its failure mode is the agent showing the wrong output immediately and the user catching it.

*Sources: The skill-and-hook golden-test examples are this book's workflow guidance.*

## When to invest

Not every team needs this. A solo developer on one project has the option of paying attention. Their eval suite lives in their head: they remember what the agent used to do, and they notice the day it stops. Formalizing the eval is wasted effort at that scale.

The investment starts to pay when two developers share one `AGENTS.md`, two agents run against the same codebase, and instruction files change faster than one reviewer can sample the outputs by hand. At that point the eval suite is the only thing catching a quiet regression before it shapes a week of changes.

The book's central claim, repeated through Foundation and Agent Instructions and Spec-Driven, is that manual verification does not keep up at agentic speed. The split matters here. Tests catch wrong code. The eval suite catches agent setup drift. Skip either side and the faster loop starts hiding mistakes instead of exposing them.

## Calibration is the hard part

Eval suites for agents are still early practice. As of 2026, there is no widely shared tooling for this. Anthropic's effective-agents guidance and Hightower's tool survey both point at evaluation as an unfilled gap, and neither prescribes a framework. This chapter gives the minimum viable setup: a fixed task, a structural check, a comparison.

Keeping the suite calibrated is harder than building it. A task the agent nails reliably today goes uninformative tomorrow when the model improves under it. A task the agent fails reliably tests a property no configuration will satisfy, so it reports noise on every run. The suite drifts in both directions and needs periodic curation. Treat it as a living artifact, not a one-time setup.

*Sources: Rick Hightower, "Agentic Coding: GSD vs Spec Kit vs OpenSpec vs Taskmaster AI" (February 27, 2026), evaluation gaps across current SDD tools. Anthropic, "Building effective agents" (December 2024), evaluation as guidance rather than a complete framework.*

## Tooling

The companion repo includes `examples/eval-demo`. The directory holds two snapshots of the same project: `baseline`, generated with the team's original `AGENTS.md`, and `after-drift`, generated after the one-line change. The `eval/` directory holds three tasks with their `checks.yaml` files. The same suite grades both snapshots without knowing which `AGENTS.md` produced them:

```bash
iec eval --path baseline --eval-dir eval      # Score: 9/9 (100%)
iec eval --path after-drift --eval-dir eval   # Score: 5/9 (55%)
```

Those two scores are committed snapshots from one run of this example, not a benchmark to reproduce. Read them as a worked example: one instruction change, same tasks, worse output. `iec` is one way to run the check, not the argument for doing it.

*Sources: intent-engineering-for-coding-agents/cli (ongoing), `examples/eval-demo` and its `iec eval` invocation.*

The eval suite tells you when the agent setup regresses. It says nothing about whether the link between the spec and the proof has held: whether the test that still passes is still the test that proves the acceptance criterion the spec named. That is a different kind of rot, and it needs its own check.
