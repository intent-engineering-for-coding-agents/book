# Foundation

> Repo structure. The prerequisite for everything else.

The Foundation is properly the most important part to get right.

Open a PR where the agent adds a REST endpoint to a codebase that moved to gRPC months ago. Nobody wrote down the migration. Nothing in `docs/` says REST is gone. The code compiles anyway, and now the system speaks two protocols.

That is the Foundation problem. README and INDEX files drift, Architectural Decision Records (ADRs) never get written, and old specs sit around as if they still matter. Review becomes a grep session backed by whoever still remembers the original decision. The agent reads the same stale files and follows them faithfully.

These chapters are about stopping that kind of quiet damage. They define which documents belong in the repo, why the agent needs them in plain text, where the structure fits in the Software Development Life Cycle (SDLC), how to bootstrap a brownfield system, and what still breaks after the setup looks solid.

## Chapters

1. [Why Structure Matters](./why-structure): what compounding drift costs, and why structure is a context problem
2. [Document Types](./document-types): README files, INDEX files, ADRs, design docs, and specs each have a different lifespan
3. [Plain-Text-as-Code](./plain-text-as-code): why everything the agent needs must live in the repo as plain text
4. [Intent Engineering and the SDLC](./intent-engineering-and-the-sdlc): where Intent Engineering practices slot into an existing SDLC
5. [Brownfield vs Greenfield](./brownfield-vs-greenfield): how to bootstrap Intent Engineering on an existing codebase using `skeleton.md`
6. [When Intent Engineering Fails](./when-intent-engineering-fails): the failure modes that remain after good initial setup
