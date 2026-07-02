# Agent Instruction Hub

Two developers, same repo, same language, same CI pipeline. Why do their pull requests look like they came from different codebases? Different naming, different directories off-limits, different test structures. Nobody changed the rules. The rules diverged: one developer drives Claude Code with `CLAUDE.md`, the other drives Cursor with `.cursorrules`, both files started as copies of the same thing, and a month later they no longer agree.

The fix is not better synchronization between two files. It is one file that both tools point to.

`AGENTS.md` is the entry point, and `.agents/instructions/` is what it points into. One directory, no vendor in the name, readable by every tool. Instructions, skills, and hooks live there. Whatever agent is doing the work, it loads from the same place.

## `.agents/instructions/`

An agent modifying the authentication module does not need the CI pipeline rules, and an agent writing a new checker does not need the deployment runbook. Instruction files exist so a session loading `auth.md` does not also spend context window on Kubernetes rollback steps. Each file covers one domain, so the agent reads the relevant one and skips the rest.

`instructions/` is this book's name for this layer. At the time of writing, no cross-tool standard specifies this subdirectory path yet.

A focused hub stays small. Here is what one looks like in practice:

```text
.agents/instructions/
├── build-and-ci.md       # build commands, lint, test, CI pipeline
├── coding-standards.md   # coding style, project structure, testing
├── index-maintenance.md  # when and how to update any INDEX.md
└── openspec.md           # OpenSpec extensions for specs, AC IDs, test traceability
```

`coding-standards.md` is short. Type hints, string quoting, linting rules, test naming conventions. An agent working on a new checker reads it once and writes code that matches the rest of the codebase. An agent updating a dependency skips it entirely.

`openspec.md` applies the same move to a tool. It holds the conventions that extend OpenSpec, a unique AC ID per criterion and a test bound to the task that proves it, without editing OpenSpec's own commands. [Spec Lifecycle](../spec-driven/spec-lifecycle) shows the rules it carries and why forking the tool is the worst trade.

One file per domain, not one file per task. `coding-standards.md` covers all style conventions instead of splitting into `naming-conventions.md` and `formatting.md`. Splitting by domain keeps each file coherent. Splitting too fine creates a directory the agent has to enumerate before deciding what to load.

## `.agents/skills/`

Skills are workflows, not context. An instruction file tells the agent how things work in this repo. A skill tells it how to do a repeatable task. `.agents/skills/` is the emerging standard path. In Codex's July 2026 docs, Codex scans that directory in each folder from your working directory up to the repo root. Codex also supports user-level and system-level skill folders, but the project-local path is the one this chapter cares about.

Take `update-changelog` as an example: scan commits since the last tag, extract the relevant entries, regenerate `CHANGELOG.md`. Five steps, one outcome, invocable any time a feature merges. Without the skill, each agent session has to remember to update the changelog or be told to. With the skill, the agent instructions state the rule once: after merging a feature, run `update-changelog`.

The concrete version: a coding-standards file is an instruction. Scaffolding a new module is a skill. [Skills, Commands, and Hooks](./skills-commands-hooks) covers when to reach for each and how to write a skill that runs.

Typed from the session, `/update-changelog` invokes the skill directly.

None of that touches the autonomous trigger. Agent instructions tell the agent which skill to load when the task description matches. The developer bypasses that layer by invoking the skill explicitly. Same file either way.

At the time of writing, running `openspec init` for a specific agent generates a full set of skills: `opsx:new`, `opsx:ff`, `opsx:apply`, `opsx:archive` and others. The output sometimes goes to a vendor-specific directory rather than `.agents/skills/`. If you want one shared hub, copy the generated files into `.agents/skills/` after initialization.

Some CLI agents scan `.agents/skills/` natively. Many IDE integrations reach skill files through `AGENTS.md` pointers instead of reading the directory directly. Vendor-neutral structure gets you as far as the file. Whether the agent invokes that skill in a given session still depends on its judgment. Hooks close that gap.

*Sources: OpenAI, "Agent Skills" (developers.openai.com/codex/skills, reviewed July 1, 2026), Codex scanning `.agents/skills/` from the working directory to the repo root, plus user-level and system-level skill folders; Fission AI, "OpenSpec" (openspec.dev, ongoing), `opsx:*` skill generation via `openspec init`.*

## `.agents/hooks/`

Few teams use agent hooks yet. The case for them comes down to one word: enforcement. An instruction tells the agent to run the linter after editing a source file, and the agent usually does. A hook runs the linter after every source file edit, regardless of what the agent decided. [Skills, Commands, and Hooks](./skills-commands-hooks) makes the determinism argument in full. This section covers only where the files live.

Hooks scope to file types too. A hook configured to fire on `.java` file edits runs checkstyle every time the agent touches a Java file, not because the agent remembered to, but because the trigger matched. The Javadoc use case is a clean example: an agent adding a new public method often skips the Javadoc comment. A hook configured on `.java` edits checks every public and protected method and forces the agent to fill in what is missing.

If you wire them up, `.agents/hooks/` is the natural home: one location, no vendor in the name, readable by every tool. Same reasoning as the rest of the hub.

Common hook candidates: run the linter after any source file edit, keep a generated file in sync after its sources change, check that no secrets appear in staged files before a commit. These are things the agent instructions might tell the agent to do. A hook makes them non-optional. In `.agents/hooks/` the doc-comment example above becomes three files:

```text
.agents/hooks/
├── java.md   # checkstyle on modified .java files
├── cs.md     # dotnet-format on modified .cs files
└── py.md     # docformatter on modified .py files
```

Each file defines a trigger (a file edit matching that extension) and the command to run. The trigger fires whether the agent remembered the rule or not.

The current-practice caveat: hook authoring is still early practice. The tooling varies by agent, the syntax is not standardized across tools, and the failure modes when a hook blocks unexpectedly are not always easy to debug. Where each tool looks for hook definitions also varies. For many teams as of mid-2026, hooks are still experimental rather than routine.

*Sources: Anthropic, "Building effective agents" (December 2024), hooks as a deterministic guarantee that runs regardless of the agent's decision. The maturity caveat here is this book's current-practice observation across agent tooling as of mid-2026.*

The hub gives the agent context about the codebase. What it still needs for any particular task is a spec: not how the system works in general, but what this specific change is supposed to do. A well-built hub gives the agent the rules. The spec gives it the intent.

## When the hub becomes overhead

The `.agents/` hub solves a coordination problem. When two developers use different tools, or when one developer uses multiple tools across sessions, the hub gives those tools the same instruction files, skill definitions, and hook docs. When neither case exists, the extra directory and pointer structure buys nothing.

A solo developer working with a single tool and no plans to change does not have a coordination problem. A single instruction file, whether it is called `CLAUDE.md`, `AGENTS.md`, or anything else, is the source of truth because there is only one source.

Note that using `CLAUDE.md` does not prevent the hub: a `CLAUDE.md` that points into a shared instruction directory is using the hub with a different entry point. The overhead question is whether you maintain `.agents/` as a shared directory at all.

The hub adds that directory structure, a pointer file, and a maintenance ritual for a problem that does not exist yet. The coordination cost is real: every instruction file needs a load clause, every skill needs a trigger, every hook needs a definition. For that project, that cost buys nothing.

Two things change the calculation. First, portability: a developer who does not want to get locked into any single agent benefits from a shared hub even alone. Second, multi-agent workflows: running one agent to write code and another to review it is a coordination problem even for one person. Both agents need the same instructions, the same skill definitions, the same conventions. A tool-specific file serves only the tool it was written for.

The hub pays off when the coordination problem appears: a second developer joins with their own tool, a solo developer runs two agents across different tasks, or a team grows from two to five and needs every tool reading the same codebase rules.

Open source projects are a special case: the moment you accept contributions, you cannot expect every contributor to use your preferred agent. With many coding agents to choose from today, a tool-specific instruction file is a barrier a shared hub removes.

At that point, the hub prevents the fork that would otherwise happen. The investment pays off when the alternative is divergence.

Use a simple threshold here too. If you maintain one instruction file, and it works, keep it. If you start copying instructions between files, or if two tools produce different output from what should be the same instruction set, build the hub. The hub solves a specific coordination problem. Building it before that problem appears is a premature structure.

## Tooling

If you want to see this in practice, the [`iec` companion repo](https://github.com/intent-engineering-for-coding-agents/cli) has the four instruction files above, the `update-index` skill, and an `.agents/hooks/` directory waiting to be filled (as of mid-2026). See [Companion Repo](../appendices/companion-repo) for how to browse it. The hub gives the agent standing context. The next constraint is per-change intent: the spec that says what this session is supposed to build.
