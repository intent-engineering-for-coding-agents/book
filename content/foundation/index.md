# Foundation

> Repo structure. The prerequisite for everything else.

Foundation is where repo structure stops being housekeeping and starts doing engineering work. If the decisions, maps, and constraints are missing or stale, the agent reads the wrong picture of the system and acts on it.

These chapters cover the document set, the plain-text rule, where the structure fits in an existing SDLC, how to bootstrap a brownfield system, and what still breaks after setup.

## Chapters

1. [Why Structure Matters](./why-structure): what compounding drift costs, and why structure is a context problem
2. [Document Types](./document-types): README files, INDEX files, ADRs, design docs, and specs each have a different lifespan
3. [Plain-Text-as-Code](./plain-text-as-code): why everything the agent needs must live in the repo as plain text
4. [Intent Engineering and the SDLC](./intent-engineering-and-the-sdlc): where Intent Engineering practices slot into an existing SDLC
5. [Brownfield vs Greenfield](./brownfield-vs-greenfield): how to bootstrap Intent Engineering on an existing codebase using `skeleton.md`
6. [When Intent Engineering Fails](./when-intent-engineering-fails): the failure modes that remain after good initial setup
