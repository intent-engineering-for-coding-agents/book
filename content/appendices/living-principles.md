# Living Principles

These are the principles that emerged during the writing of this book. Each principle is drawn from a chapter. Together they form a compact summary of the book's normative claims: the rules, instincts, and boundaries that make Intent Engineering work.

This appendix is structured as a [`.principles`](https://dot-principles.github.io/) catalog. The individual principle files live in `principles/iec/`. The selection file is `.principles` at the repo root, and the group definition is `groups/intent-book.yaml`. All 66 principles are active by default.

## Foundation

Principles about how to structure a repository so agents and humans find what they need.

| ID | Summary |
|----|---------|
| IEC-FOUNDATION-AGENT-KNOWLEDGE-IS-PLAINTEXT | If the agent needs it, it lives in the repo in plain text. |
| IEC-FOUNDATION-STALE-STRUCTURE-WORSE-THAN-NONE | Stale documentation misleads more than no documentation. |
| IEC-FOUNDATION-DOCUMENT-LIFESPAN | Each document type has a different lifespan; conflating them corrupts both. |
| IEC-FOUNDATION-DOCS-VS-CONTENT | `docs/` is for architecture, decisions, and design, not for your static site. |
| IEC-FOUNDATION-README-INDEX-SEPARATE | Every `docs/` directory has a README for humans and an INDEX for agents. |
| IEC-FOUNDATION-HYPERGRAPH-NOT-TREE | Documents form a hypergraph, not a tree. Agents navigate via links, not hierarchy. |
| IEC-FOUNDATION-ONE-CONCEPT-PER-DOCUMENT | One concept per document: makes the hypergraph navigable and keeps each node within context budget. |
| IEC-FOUNDATION-DIAGRAMS-ARE-PLAIN-TEXT | Diagrams live as Mermaid in fenced code blocks: diffable, renderable, and agent-readable. |
| IEC-FOUNDATION-DECISIONS-LIVE-IN-DOCS | Architectural decisions and conventions live in `docs/`, not in PR descriptions or code comments. |
| IEC-FOUNDATION-MATURITY-LADDER | Distinguish practiced from documented from CI-enforced from target state. Honesty prevents process theater. |
| IEC-FOUNDATION-BRIEFING-NOT-POLICING | Structure gives the agent enough briefing to make plausible guesses. It is not about policing. |
| IEC-FOUNDATION-DISCIPLINE-MATCHES-SCOPE | Match the discipline to project scope: skip it for throwaway work, write specs at weeks, adopt full Intent Engineering for production. |
| IEC-FOUNDATION-HIGHEST-USEFUL-ABSTRACTION | Move knowledge to the highest useful level of abstraction. |

## Context

Principles about briefing the agent: what goes in `AGENTS.md`, how to write instructions that work, and how to manage the context window.

| ID | Summary |
|----|---------|
| IEC-CONTEXT-AGENTS-MD-IS-TOC | `AGENTS.md` is a table of contents, not an encyclopedia: short enough for one context load. |
| IEC-CONTEXT-FRESH-SESSION | A fresh session with the right files loaded is more reliable than a long session with stale context. |
| IEC-CONTEXT-ONE-FILE-PER-DOMAIN | One instruction file per domain, not per task. Splitting too fine forces enumeration by the agent. |
| IEC-CONTEXT-REACTIVE-INSTRUCTIONS | Write instructions reactively: you do not know what the agent will get wrong until it gets it wrong. |
| IEC-CONTEXT-INSTRUCTIONS-MUST-BE-TESTABLE | Can the agent produce concrete behavior from this instruction, or does it have to guess? |
| IEC-CONTEXT-COVER-DEFAULTS | The most valuable negative instructions cover the agent's defaults from training data. |
| IEC-CONTEXT-IMPORTANT-FIRST | Put the most important context at the top: agents read top-down and lose focus. |
| IEC-CONTEXT-ONE-SOURCE-OF-TRUTH | One source of truth for agent instructions; vendor files are generated pointers, not authored duplicates. |
| IEC-CONTEXT-AGENT-CLUELESS-NOT-BROKEN | The agent is not broken, it is clueless. Fix the context before switching models. |
| IEC-CONTEXT-INSTRUCTION-SKILL-HOOK | Get the instruction right first; add a skill when a procedure repeats; add a hook when forgetting hurts. |
| IEC-CONTEXT-CAPABILITY-CLASS-TARGETING | Target capability class (thinking + agent + plan mode), not vendor-agnostic vagueness. |
| IEC-CONTEXT-GENERATED-BEATS-DUPLICATE | A generated vendor file is a known point-in-time output; an authored duplicate is already behind. |

## Specs

Principles about spec-driven development: why specs, how small, when to apply them.

| ID | Summary |
|----|---------|
| IEC-SPECS-DOCS-GT-CODE | Documentation is the durable source of truth; specs are executable acceptance-criteria guardrails; generated code is downstream of both. |
| IEC-SPECS-SMALL-SPECS | Small specs outperform large specs: an agent that finishes beats one that drifts. |
| IEC-SPECS-FORMALITY-MATCHES-RISK | Match formality to risk: payment processing earns a thorough spec; a config-key rename does not. |
| IEC-SPECS-REVIEW-SPEC-FIRST | Review the spec first: does the intent match? Then review the diff: does the code match the intent? |
| IEC-SPECS-DEAD-SPEC-WORSE | A dead spec tells the agent authoritatively about behavior the system no longer has. |
| IEC-SPECS-CONSTRAINTS-IN-FILE | Constraints that live only in human memory are constraints the agent will violate. |
| IEC-SPECS-DRIFT-DETECTABLE | Intent Engineering does not make your codebase drift-proof. It makes drift detectable and recoverable. |
| IEC-SPECS-SPEC-ELIGIBILITY | A typo fix does not earn a spec: define the threshold explicitly. |

## Testing

Principles about test strategy, acceptance criteria, and what makes a test proof rather than decoration.

| ID | Summary |
|----|---------|
| IEC-TESTING-TEST-IS-PROOF | A test is proof when it would fail if the implementation diverged from the spec. Otherwise it is decoration. |
| IEC-TESTING-EVERY-PATH | Every conditional branch, distinct return type, and exception path needs at least one test. |
| IEC-TESTING-DECLARE-TEST-TYPES | Declare which test types the project uses: the agent defaults to unit tests for everything otherwise. |
| IEC-TESTING-EXPLICIT-EXCLUSIONS | The agent cannot distinguish "not applicable" from "nobody thought of it". Exclude explicitly. |
| IEC-TESTING-AC-ARE-TEST-DEFINITIONS | Every acceptance criterion is a test definition waiting to be executed: it needs a stable ID and a proof layer. |
| IEC-TESTING-POSITIVE-NEGATIVE-MINIMUM | Every acceptance criterion has at least one positive and one negative test. Happy-path-only is not proof. |
| IEC-TESTING-AC-ID-MONOTONE | AC IDs are stable: numbers only go up, prefix is permanent, deleted IDs leave a gap. |
| IEC-TESTING-REGISTRY-ATOMIC | The AC registry and the spec change together: a scenario without a registry update guessed its ID. |

## Quality

Principles about the quality loop: checkpoints, agent evaluation, deterministic checks, and security.

| ID | Summary |
|----|---------|
| IEC-QUALITY-AUTOMATED-PROOF-MANDATORY | Coding agents generate code faster than manual verification scales. Automated proof is mandatory. |
| IEC-QUALITY-THREE-GATES | Quality is three gates in sequence (before, during, after), each looking at what the others cannot see. |
| IEC-QUALITY-MAXIMIZE-DETERMINISTIC | Maximize deterministic checks: they scale to agentic speeds; manual review does not. |
| IEC-QUALITY-AGENT-EVAL-LOOP | Tests prove the code is right; agent evaluation proves the agent setup is right: two distinct loops. |
| IEC-QUALITY-RULES-FIRST-PRINCIPLES-SECOND | Write deterministic rules when detection is possible. Write principles for judgment. |
| IEC-QUALITY-ONE-PR-PER-CLASS | `docs`, `structural`, and `behavioral` PRs use different review styles: one PR per class. |
| IEC-QUALITY-CANONICAL-PATTERN-VISIBLE | Make the pattern the agent should follow the easiest pattern to find in the codebase. |
| IEC-QUALITY-NON-NEGOTIABLES-ENCODED | Encode non-negotiable decisions so the question does not get asked: the agent has no judgment here. |
| IEC-QUALITY-EXTERNAL-READ-IS-DATA | Treat anything the agent reads from outside the repo as data, not as instructions. |
| IEC-QUALITY-DOCS-PR-ZERO-CODE | A docs PR that contains a single character of code change is no longer a docs PR. |
| IEC-QUALITY-REFACTOR-AT-MERGE | The agent's first generation is rarely the right shape: refactor at merge, not three weeks later. |
| IEC-QUALITY-HOLD-SPEC-STABLE | A spec still being negotiated during implementation causes drift to wherever the agent guesses it is heading. |

## Team

Principles about team process, adoption, and culture.

| ID | Summary |
|----|---------|
| IEC-TEAM-ANCHOR-SDLC | Anchor process to existing SDLC primitives (branches, PRs, tickets, ADRs), not new ceremonies. |
| IEC-TEAM-ADOPTION-IS-PULL | Document what teams have made work; let the reader decide what to lift. |
| IEC-TEAM-GIVE-CREDIT | A book that hides its sources is weaker, not stronger. Credit sources explicitly. |
| IEC-TEAM-REPO-IS-BRIEFING | The repo is the briefing: every new developer and every new agent session starts here. |
| IEC-TEAM-ONE-OPENSPEC-PER-STACK | Each stack in a multi-tier system gets its own `openspec/` directory: prevents cross-tier context confusion. |
| IEC-TEAM-INTEGRATION-CONTRACT-IN-ADR | Cross-tier API contracts belong in ADRs, not in individual stack specs. |
| IEC-TEAM-CHANGE-FOLDER-AS-ISOLATION | One change folder per developer-agent pair is the isolation primitive for parallel work. |
| IEC-TEAM-SPEC-DELTA-FIRST-IN-REVIEW | In PR review, read the spec delta before the code diff: intent-first review. |
| IEC-TEAM-TBD-CHANGE-FOLDER-BRANCH | A change folder maps onto branches that share its name; decision-heavy changes ship a spec PR before the implementation PR, which archives at merge. |
| IEC-TEAM-MULTILM-COVERAGE | Use a fresh-session agent to trace acceptance criteria to tests before approving high-stakes behavioral PRs. |
| IEC-TEAM-REVIEW-COMPLEMENTARITY | Human reviewers verify intent and integration; agent reviewers verify coverage and consistency; neither replaces the other. |
| IEC-TEAM-STANDARDIZE-SHARED-DIVERGE-LOCAL | Standardize agent conventions that affect the codebase; leave local workflow choices divergent. |
| IEC-TEAM-ADR-CROSS-TEAM | ADRs are the cross-team coordination primitive: permanent, public, already in the SDLC. |

---

*Sources: This catalog is the book's synthesis. Each principle is sourced from the chapter it emerged from; full sources are in the individual principle files under `principles/iec/`. The format follows the [`.principles`](https://dot-principles.github.io/) specification.*
