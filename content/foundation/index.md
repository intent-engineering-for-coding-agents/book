# Foundation

> Repo structure. The prerequisite for everything else.

Foundation is the first topic of Intent Engineering for a reason, and not the obvious one. It does not sit as a co-equal subject alongside intent. It grounds the agent so your intent becomes executable. Without it, agent instructions have nowhere to live. Specs have no structure to enforce against. Quality checks have no conventions to validate.

The chapters in this section address the underlying problem of agents that are productive but contextless, and give it a shape you can act on.

## Chapters

1. [Why Structure Matters](./why-structure): what compounding drift costs, and why structure is a context problem
2. [Document Types](./document-types): README files, INDEX files, ADRs, design docs, and specs each have a different lifespan
3. [Plain-Text-as-Code](./plain-text-as-code): why everything the agent needs must live in the repo as plain text
4. [The Map: Intent Engineering and the SDLC](./intent-engineering-and-the-sdlc): where Intent Engineering practices slot into an existing SDLC
5. [Honest Maturity](./honest-maturity): practiced / documented / CI-enforced
6. [Brownfield vs Greenfield](./brownfield-vs-greenfield): how to bootstrap Intent Engineering on an existing codebase using `skeleton.md`
7. [When Intent Engineering Fails](./when-intent-engineering-fails): the failure modes that survive even good initial setup
