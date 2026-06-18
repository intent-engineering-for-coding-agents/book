# Agent Evaluation and Regression

Your agent instructions, skills, and hooks are code. Nobody tests them. They regress anyway. Someone adds one line to the agent instructions: prefer functions over classes for utility code. It reads as a harmless style note. Over the next week the agent starts rewriting service classes into standalone functions, even where the class carried real invariants, and it drops the validation that used to live in the service layer. Each PR looks plausible on its own, so each passes review. The shape of the codebase shifts in a direction nobody asked for. The line comes out eventually, but no one ever pins down which day the drift began.

Tests prove the code is right. They say nothing about whether the agent setup is right. That second loop is the one most teams are missing.

## Two different feedback loops

The tests in the previous chapter close the loop between spec and implementation. A failing test says the code does not match the intent. Both sides of that comparison are concrete: the spec is a document, the test is executable, the implementation is the artifact under scrutiny.

The agent setup has no equivalent. `AGENTS.md`, the instruction files, the skill library, the hook configuration: these are inputs to the agent, not outputs of it. Their effect shows up only in the code the agent produces, one PR at a time, and only when someone is paying attention. A change to any of them that makes the agent measurably worse sits in the repo for weeks before anyone notices. A change that makes it slightly better is invisible by definition.

This is the open loop. The rest of the chapter is about how to close it.

*Sources: Anthropic, "Building effective agents" (Dec 2024), evaluation as part of an effective agent setup. ThoughtWorks, Technology Radar Vol 34 (April 2026), feedback control as the discipline the agentic era needs. Applying the loop to instruction files specifically is this book's synthesis.*

## Golden tests for the agent

A golden test for the agent is a fixed task with a known good output. The task is small enough to run in one session: a specific repo state, a specific spec, a specific change to make. The expected output is not the exact code. The agent rarely produces the same file twice, and a test that demands byte-for-byte equality breaks on the first rewording. What the golden test pins down is a set of structural properties a check verifies.

Take one task from the suite the companion repo ships. The instruction is plain:

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

A handful of these tasks is the eval set, each covering a workflow the team relies on. Start with a set small enough to re-run by hand. Every task has the same shape: a starting repo state, a spec to implement, the properties the output must satisfy.

The score is the count of properties satisfied. A score that drops on a configuration change is a regression with nothing to do with the code under test. The eval-set shape and the structural-check format here are this book's convention, not a settled standard. Hightower's survey of spec-driven tooling names evaluation as the piece every framework is missing, and none of them prescribe a format.

*Sources: Anthropic, "Building effective agents" (Dec 2024), evaluation as part of agent setup. Rick Hightower, "Agentic Coding: GSD vs Spec Kit vs OpenSpec vs Taskmaster AI" (Feb 27, 2026), evaluation as a gap in SDD tooling. The fixed-task shape and the structural-check format are this book's convention, shown in the `iec` companion repo.*

## A/B comparison of two instruction-file versions

The simplest evaluation is comparative. Run the suite against the current agent instructions, record the score, apply the proposed change, run it again. The delta is the evidence.

In the companion repo's example, the baseline configuration scores nine of nine. Add the one line about preferring functions to classes, regenerate the same three tasks, and the score drops to five of nine. The service task loses its class and its `_validate` method. The test task loses the `@pytest.mark.ac` markers that tied tests back to acceptance criteria. None of that read as broken in review. The code ran. The tests passed. The structural properties the team cared about quietly went missing.

This is the change that sounds reasonable and is not. A style note about utility functions read as global guidance, and the agent applied it to service classes and test markers it was never meant to touch. Without the comparison, the tradeoff stays invisible. With it the choice is concrete: which version of the agent instructions produced the score the team wants?

*Sources: Anthropic, "Building effective agents" (Dec 2024), evaluation as a feedback loop for agent behavior. The repo-sized A/B workflow and the scores cited are this book's `iec` example, not a statistical-testing claim.*

## Regression when a skill or hook changes

Skills and hooks have the same failure mode. A skill that used to update the index starts skipping the README files because one step was rewritten. A hook that used to catch missing tests starts passing because its pattern was tightened too far. Neither change looks broken in the diff. The skill still runs, the hook still fires, the outcomes drift.

The defense is the same: a fixed task that exercises the skill or hook, run before and after the change. The index skill runs against a known directory state and is checked against the index it should produce. The missing-tests hook runs against one PR diff that should fail and another that should pass. Same golden test, scoped to a single component.

Most teams will not maintain this for every skill. The economics only work for the ones that fail expensively. The skill that touches the documentation index earns a golden test because its failure mode is silent drift. The skill that scaffolds a new ADR file does not, because its failure mode is the agent showing the wrong output immediately and the user catching it.

*Sources: ThoughtWorks, Technology Radar Vol 34 (April 2026), feedback control as a discipline for agentic development. The skill-and-hook golden-test examples are this book's workflow guidance.*

## When to invest

Not every team needs this. A solo developer on one project has the option of paying attention. Their eval suite lives in their head: they remember what the agent used to do, and they notice the day it stops. Formalizing the eval is wasted effort at that scale.

The investment starts to pay when more than one developer shares the same agent instructions, when more than one agent runs against the same codebase, when the instruction files change faster than any one person reviews the resulting code. At that point the eval suite is the only thing that catches a quiet regression before it has shaped a week of PRs.

The book's central claim, repeated through Foundation and Agent Instructions and Spec-Driven, is that manual verification does not keep up at agentic speed. The closed loop answers it in both halves. Tests close it for the code. The eval suite closes it for the agent setup. Without both, every speed-up is also a way to ship more of the wrong thing faster.

## Calibration is the hard part

Eval suites for agents are early practice. There is no widely shared tooling for this in 2026. Anthropic's effective-agents guidance and Hightower's tool survey both point at evaluation as the missing piece, and neither prescribes a framework. What this chapter describes is the minimum viable shape: a fixed task, a structural check, a comparison.

Keeping the suite calibrated is harder than building it. A task the agent nails reliably today goes uninformative tomorrow when the model improves under it. A task the agent fails reliably tests a property no configuration will satisfy, so it reports noise on every run. The suite drifts in both directions and needs periodic curation. Treat it as a living artifact, not a one-time setup.

*Sources: Rick Hightower, "Agentic Coding: GSD vs Spec Kit vs OpenSpec vs Taskmaster AI" (Feb 27, 2026), evaluation gaps across current SDD tools. Anthropic, "Building effective agents" (Dec 2024), evaluation as guidance rather than a complete framework.*

## Tooling

If you want to see this run, the `iec` companion repo ships it under `examples/eval-demo`. The directory holds two snapshots of the same project: `baseline`, generated with the team's original `AGENTS.md`, and `after-drift`, generated after the one-line change. The `eval/` directory holds three tasks with their `checks.yaml` files. The same suite grades both snapshots without knowing which `AGENTS.md` produced them:

```bash
iec eval --path baseline --eval-dir eval      # Score: 9/9 (100%)
iec eval --path after-drift --eval-dir eval   # Score: 5/9 (55%)
```

Those two scores are committed snapshots from one run of this example, not a benchmark to reproduce. They show the shape of the result. The pattern is the point. The tool is one way to run it. (See the [companion repo](https://github.com/intent-engineering-for-coding-agents/cli) for the current command surface.)

*Sources: `iec` companion repo (github.com/intent-engineering-for-coding-agents/cli), `examples/eval-demo` and the `iec eval` command.*

The eval suite tells you when the agent setup regresses. It says nothing about whether the link between the spec and the proof has held: whether the test that still passes is still the test that proves the acceptance criterion the spec named. That is a different kind of rot, and it needs its own check.
