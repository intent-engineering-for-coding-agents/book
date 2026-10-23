---
type: index
title: Spec-Driven Development
---

# Spec-Driven Development

> A spec that nobody reads is documentation. A spec the agent loads before it writes code is the source the implementation is generated from.

What changes every session is intent. The hub is durable. The spec is not.

This topic is about per-change intent: the spec that tells the agent what this change must do, what it must leave alone, and what evidence will count. Review the spec first or you are reviewing output without knowing the target.

Prompt engineering improves how a request is phrased. Spec-Driven Development gives the request a versioned target, an owner, a lifecycle, and acceptance criteria reviewers inspect before the generated code.

OpenSpec is the concrete workflow used throughout because it gives the book one change folder, one lifecycle, and one archive rule. The portable practice is simpler than the tooling: per-change intent with testable acceptance criteria.

*Sources: Fission AI, OpenSpec, the change-folder lifecycle and archive rule used as the book's concrete workflow. The local-format portability framing is this book's synthesis.*

## Chapters

1. [Why Specs?](./why-specs): drift, intent, and traceability, the practical motivation for writing down what you want before you ask an agent to build it
2. [Why Small?](./why-small): bounded tickets, changing assumptions during parallel work, and proposals based on the current repository
3. [The Spectrum](./the-spectrum): from a raw prompt to OpenSpec, matching formality to risk and team size
4. [Spec Lifecycle](./spec-lifecycle): start a ticket, review its proposal, implement and verify, integrate and archive before completing the ticket
5. [Docs > Specs > Code](./docs-gt-specs-gt-code): the book's load-bearing thesis, that documentation is the durable source of truth, the spec verifies the behavior of one change, and the code is downstream of both
