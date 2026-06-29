# PR Taxonomy

A pull request is a review contract. If the contract says `behavioral` and the diff also moves files, reformats modules, and edits docs, the reviewer no longer knows which proof applies.

Intent Engineering treats PR shape as part of the intent. The spec states what should change. The PR class states how to review the change. This chapter uses both to control one failure mode: feature work bundled with nearby cleanup and treated as one finished unit.

*Sources: Dave Farley, "Modern Software Engineering" (Addison-Wesley, 2021), small changes and feedback loops. Paul Hammant, [trunkbaseddevelopment.com](https://trunkbaseddevelopment.com/) (ongoing), short-lived integrated changes. The bundled-work failure mode and `docs`/`structural`/`behavioral` taxonomy are this book's synthesis.*

## The three classes

Use three PR classes. Put the class in the PR title, label, or template field before the review starts.

| Class | Allowed diff | Reviewer question | Agent instruction |
|---|---|---|---|
| `docs` | Specs, ADRs, READMEs, agent instructions, generated indexes | Does the written intent match the system and the decision? | Do not edit executable files. |
| `structural` | Renames, moves, formatting, dependency-free refactors | Did behavior stay the same, and did every reference move cleanly? | Do not add runtime behavior. |
| `behavioral` | Product code, tests, migrations, config changes tied to behavior | Does the implementation satisfy the accepted spec, with tests proving the acceptance criteria? | Do not include drive-by formatting, renames, or refactors. |

The class determines the review path. A `docs` PR gets read for accuracy and scope. A `structural` PR gets checked for completeness and behavior preservation. A `behavioral` PR gets checked against the spec, then the tests, then the diff.

Mix classes and the reviewer switches lenses mid-scroll. Free riders hide there.

*Sources: Dave Farley, "Modern Software Engineering" (Addison-Wesley, 2021), feedback as the basis for small reviewable changes. The three review questions are this book's synthesis.*

## Tell the agent before code exists

Applied after the diff exists, PR taxonomy turns into cleanup triage. The mixed diff already exists. The fix belongs in the task scope and agent instruction set.

Use direct rules:

```text
This PR class is behavioral.

Allowed:
- Changes required by the accepted spec
- Tests proving the acceptance criteria
- Documentation updates explicitly named in the spec

Not allowed:
- Formatting unrelated files
- Renames unrelated to the behavior
- Refactors noticed while implementing
- Dependency updates unless the spec names them

Put every useful non-goal under Follow-ups in the PR description.
```

Then make the first branch action a scope check:

```bash
git diff --stat main...HEAD
git diff --name-only main...HEAD
```

The file list is the shape of the PR. If the list includes files the spec does not name or imply, stop. Move the extra work into a follow-up PR or remove the change before implementation continues.

*Sources: Paul Hammant, [trunkbaseddevelopment.com](https://trunkbaseddevelopment.com/) (ongoing), short-lived branch discipline. The branch file-list check is this book's Intent Engineering practice.*

## Split by default, bundle only under dependency

The default split is simple:

| If the agent changes... | PR class |
|---|---|
| `docs/architecture/auth.md` to document the auth rule | `docs` |
| `AuthMiddleware` to rename `checkUser` to `requireUser` | `structural` |
| `/export` to enforce the auth rule | `behavioral` |

Do not bundle all three because they happened in one session. The session is not the unit of review. The unit of review is the risk the reviewer must evaluate.

One exception stays useful: bundle a structural change when the behavioral change cannot land without the structural piece. If `/export` requires one new method on `Router`, ship the interface method with `/export`. Revert the behavioral half on paper. If the remaining structural change is dead code or an incomplete migration, keep the changes together. If the remaining structural change stands alone, split the PR.

*Sources: Dave Farley, "Modern Software Engineering" (Addison-Wesley, 2021), small changes as feedback units. The dependency test for bundling is this book's synthesis.*

## What the reviewer checks

For a `docs` PR, verify the document against the codebase and the decision record. No executable file belongs in the diff.

For a `structural` PR, verify completeness. Grep the old name. Run the relevant tests. Check generated files. The expected behavior is no behavior change.

For a `behavioral` PR, read the accepted spec first. Trace each acceptance criterion to a test. Then read the diff for scope creep: changed files with no link to the spec, refactors with no behavioral dependency, config edits nobody asked for.

This is not bureaucracy. This is how a reviewer keeps one mental model loaded long enough to catch the bug.

*Sources: Dave Farley, "Modern Software Engineering" (Addison-Wesley, 2021), feedback-loop framing for review checks. The class-specific checklist is this book's synthesis.*

## The point

This chapter treats the coherent-looking bundle as the failure to prevent: feature, cleanup, and opportunistic refactor in one diff. Mixed intent weakens review because the reviewer must switch proof models mid-stream. PR taxonomy makes the intended review path explicit before the agent writes code.

The next control raises a different question. A clean PR proves the change stayed in its lane, but lane discipline does not prove the code is well-shaped.

*Sources: The mixed-intent failure mode and PR taxonomy defense are this book's synthesis.*
