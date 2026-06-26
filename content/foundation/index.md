# Foundation

> Repo structure. The prerequisite for everything else.

Foundation looks like the least interesting topic in this book. Skip it, and the rest stops making sense.

It does not sit beside intent as an equal. It is the ground that makes intent executable. Strip it away, and agent instructions have nowhere to live, specs have nothing to enforce against, and quality checks have no conventions to validate.

These chapters take one problem, agents that are productive but contextless, and turn it into conventions you put in the repo: which documents hold which knowledge, why that knowledge lives in plain text, where it slots into your SDLC, and how to bootstrap it on a codebase that has none.

## Chapters

1. [Why Structure Matters](./why-structure): what compounding drift costs, and why structure is a context problem
2. [Document Types](./document-types): README files, INDEX files, ADRs, design docs, and specs each have a different lifespan
3. [Plain-Text-as-Code](./plain-text-as-code): why everything the agent needs must live in the repo as plain text
4. [Intent Engineering and the SDLC](./intent-engineering-and-the-sdlc): where Intent Engineering practices slot into an existing SDLC
5. [Brownfield vs Greenfield](./brownfield-vs-greenfield): how to bootstrap Intent Engineering on an existing codebase using `skeleton.md`
6. [When Intent Engineering Fails](./when-intent-engineering-fails): the failure modes that remain after good initial setup
