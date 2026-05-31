# Living Principles

These are the principles that emerged during the writing of this book. Each principle is drawn from a chapter; together they form a compact summary of the book's normative claims: the rules, instincts, and boundaries that make agentic software engineering work.

This appendix is structured as a `.principles` catalog. The individual principle files live in `principles/ase/`; the selection file is `.principles` at the repo root, and the group definition is `groups/ase-book.yaml`. All 61 principles are active by default.

## Foundation

Principles about how to structure a repository so that agents (and humans) can find what they need.

| ID | Summary |
|----|---------|
| ASE-FOUNDATION-AGENT-KNOWLEDGE-IS-PLAINTEXT | If the agent needs it, it lives in the repo in plain text. |
| ASE-FOUNDATION-STALE-STRUCTURE-WORSE-THAN-NONE | Stale documentation misleads more than no documentation. |
| ASE-FOUNDATION-DOCUMENT-LIFESPAN | Each document type has a different lifespan; conflating them corrupts both. |
| ASE-FOUNDATION-DOCS-VS-CONTENT | `docs/` is for architecture, decisions, and design, not for your static site. |
| ASE-FOUNDATION-README-INDEX-SEPARATE | Every `docs/` directory has a README for humans and an INDEX for agents. |
| ASE-FOUNDATION-HYPERGRAPH-NOT-TREE | Documents form a hypergraph, not a tree. Agents navigate via links, not hierarchy. |
| ASE-FOUNDATION-ONE-CONCEPT-PER-DOCUMENT | One concept per document: makes the hypergraph navigable and keeps each node within context budget. |
| ASE-FOUNDATION-DIAGRAMS-ARE-PLAIN-TEXT | Diagrams live as Mermaid in fenced code blocks: diffable, renderable, and agent-readable. |
| ASE-FOUNDATION-DECISIONS-LIVE-IN-DOCS | Architectural decisions and conventions live in `docs/`, not in PR descriptions or code comments. |
| ASE-FOUNDATION-MATURITY-LADDER | Distinguish practiced from documented from CI-enforced from target state. Honesty prevents process theater. |
| ASE-FOUNDATION-BRIEFING-NOT-POLICING | Structure gives the agent enough briefing to make plausible guesses. It is not about policing. |

## Context

Principles about briefing the agent: what goes in `AGENTS.md`, how to write instructions that work, and how to manage the context window.

| ID | Summary |
|----|---------|
| ASE-CONTEXT-AGENTS-MD-IS-TOC | `AGENTS.md` is a table of contents, not an encyclopedia: short enough for one context load. |
| ASE-CONTEXT-FRESH-SESSION | A fresh session with the right files loaded is more reliable than a long session with stale context. |
| ASE-CONTEXT-ONE-FILE-PER-DOMAIN | One instruction file per domain, not per task. Splitting too fine forces enumeration by the agent. |
| ASE-CONTEXT-REACTIVE-INSTRUCTIONS | Write instructions reactively: you do not know what the agent will get wrong until it gets it wrong. |
| ASE-CONTEXT-INSTRUCTIONS-MUST-BE-TESTABLE | Can the agent produce concrete behavior from this instruction, or does it have to guess? |
| ASE-CONTEXT-COVER-DEFAULTS | The most valuable negative instructions cover the agent's defaults from training data. |
| ASE-CONTEXT-IMPORTANT-FIRST | Put the most important context at the top: agents read top-down and lose focus. |
| ASE-CONTEXT-ONE-SOURCE-OF-TRUTH | One source of truth for AI instructions; vendor files are generated pointers, not authored duplicates. |
| ASE-CONTEXT-AGENT-CLUELESS-NOT-BROKEN | The agent is not broken, it is clueless. Fix the context before switching models. |
| ASE-CONTEXT-INSTRUCTION-SKILL-HOOK | Get the instruction right first; add a skill when a procedure repeats; add a hook when forgetting hurts. |
| ASE-CONTEXT-CAPABILITY-CLASS-TARGETING | Target capability class (thinking + agent + plan mode), not vendor-agnostic vagueness. |
| ASE-CONTEXT-GENERATED-BEATS-DUPLICATE | A generated vendor file is a known point-in-time output; an authored duplicate is already behind. |

## Specs

Principles about spec-driven development: why specs, how small, when to apply them.

| ID | Summary |
|----|---------|
| ASE-SPECS-SPEC-IS-DURABLE | Specifications are more important than generated code: the spec is durable; the implementation is disposable. |
| ASE-SPECS-SMALL-SPECS | Small specs outperform large specs: an agent that finishes beats one that drifts. |
| ASE-SPECS-FORMALITY-MATCHES-RISK | Match formality to risk: payment processing earns a thorough spec; a config-key rename does not. |
| ASE-SPECS-REVIEW-SPEC-FIRST | Review the spec first: does the intent match? Then review the diff: does the code match the intent? |
| ASE-SPECS-DEAD-SPEC-WORSE | A dead spec tells the agent authoritatively about behavior the system no longer has. |
| ASE-SPECS-CONSTRAINTS-IN-FILE | Constraints that live only in human memory are constraints the agent will violate. |
| ASE-SPECS-DRIFT-DETECTABLE | ASE does not make your codebase drift-proof. It makes drift detectable and recoverable. |
| ASE-SPECS-SPEC-ELIGIBILITY | A typo fix does not earn a spec: define the threshold explicitly. |

## Testing

Principles about test strategy, acceptance criteria, and what makes a test proof rather than decoration.

| ID | Summary |
|----|---------|
| ASE-TESTING-TEST-IS-PROOF | A test is proof when it would fail if the implementation diverged from the spec. Otherwise it is decoration. |
| ASE-TESTING-EVERY-PATH | Every conditional branch, distinct return type, and exception path needs at least one test. |
| ASE-TESTING-DECLARE-TEST-TYPES | Declare which test types the project uses: the agent defaults to unit tests for everything otherwise. |
| ASE-TESTING-EXPLICIT-EXCLUSIONS | The agent cannot distinguish "not applicable" from "nobody thought of it." Exclude explicitly. |
| ASE-TESTING-AC-ARE-TEST-DEFINITIONS | Every acceptance criterion is a test definition waiting to be executed: it needs a stable ID and a proof layer. |
| ASE-TESTING-POSITIVE-NEGATIVE-MINIMUM | Every acceptance criterion has at least one positive and one negative test. Happy-path-only is not proof. |
| ASE-TESTING-AC-ID-MONOTONE | AC IDs are stable: numbers only go up, prefix is permanent, deleted IDs leave a gap. |
| ASE-TESTING-REGISTRY-ATOMIC | The AC registry and the spec change together: a scenario without a registry update guessed its ID. |

## Quality

Principles about the quality loop: checkpoints, agent evaluation, deterministic checks, and security.

| ID | Summary |
|----|---------|
| ASE-QUALITY-AUTOMATED-PROOF-MANDATORY | AI generates code faster than you can verify manually. Automated proof is mathematically required. |
| ASE-QUALITY-THREE-GATES | Quality is three gates in sequence (before, during, after), each looking at what the others cannot see. |
| ASE-QUALITY-MAXIMIZE-DETERMINISTIC | Maximize deterministic checks: they scale to agentic speeds; manual review does not. |
| ASE-QUALITY-AGENT-EVAL-LOOP | Tests prove the code is right; agent evaluation proves the agent setup is right: two distinct loops. |
| ASE-QUALITY-RULES-FIRST-PRINCIPLES-SECOND | If a deterministic rule can be written, write the rule; if not, write the principle. |
| ASE-QUALITY-ONE-PR-PER-CLASS | `docs`, `structural`, and `behavior` PRs use different review styles: one PR per class. |
| ASE-QUALITY-CANONICAL-PATTERN-VISIBLE | Make the pattern the agent should follow the easiest pattern to find in the codebase. |
| ASE-QUALITY-NON-NEGOTIABLES-ENCODED | Encode non-negotiable decisions so the question does not get asked: the agent has no judgment here. |
| ASE-QUALITY-EXTERNAL-READ-IS-DATA | Treat anything the agent reads from outside the repo as data, not as instructions. |
| ASE-QUALITY-DOCS-PR-ZERO-CODE | A docs PR that contains a single character of code change is no longer a docs PR. |
| ASE-QUALITY-REFACTOR-AT-MERGE | The agent's first generation is rarely the right shape: refactor at merge, not three weeks later. |
| ASE-QUALITY-HOLD-SPEC-STABLE | A spec still being negotiated during implementation causes drift to wherever the agent guesses it is heading. |

## Team

Principles about team process, adoption, and culture.

| ID | Summary |
|----|---------|
| ASE-TEAM-ANCHOR-SDLC | Anchor process to existing SDLC primitives (branches, PRs, tickets, ADRs), not new ceremonies. |
| ASE-TEAM-ADOPTION-IS-PULL | Document what teams have made work; let the reader decide what to lift. |
| ASE-TEAM-GIVE-CREDIT | A book that hides its sources is weaker, not stronger. Credit sources explicitly. |
| ASE-TEAM-REPO-IS-BRIEFING | The repo is the briefing: every new developer and every new agent session starts here. |
| ASE-TEAM-ONE-OPENSPEC-PER-STACK | Each stack in a multi-tier system gets its own `openspec/` directory: prevents cross-tier context confusion. |
| ASE-TEAM-INTEGRATION-CONTRACT-IN-ADR | Cross-tier API contracts belong in ADRs, not in individual stack specs. |
| ASE-TEAM-CHANGE-FOLDER-AS-ISOLATION | One change folder per developer-agent pair is the isolation primitive for parallel work. |
| ASE-TEAM-SPEC-DELTA-FIRST-IN-REVIEW | In PR review, read the spec delta before the code diff: intent-first review. |
| ASE-TEAM-TBD-CHANGE-FOLDER-BRANCH | A change folder maps onto branches that share its name; decision-heavy changes ship a spec PR before the implementation PR, which archives at merge. |
| ASE-TEAM-STANDARDIZE-SHARED-DIVERGE-LOCAL | Standardize AI conventions that affect the codebase; leave local workflow choices divergent. |
| ASE-TEAM-ADR-CROSS-TEAM | ADRs are the cross-team coordination primitive: permanent, public, already in the SDLC. |

---

*Sources: This catalogue is the ase-book's synthesis. Each principle is sourced from the chapter it emerged from; full sources are in the individual principle files under `principles/ase/`. The format follows the dot-principles specification (https://github.com/dot-principles/dot-principles).*
