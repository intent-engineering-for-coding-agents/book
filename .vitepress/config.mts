import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import { bundledLanguages } from 'shiki'

export default withMermaid(
  defineConfig({
    title: 'Intent Engineering',
    description: 'Intent Engineering for Coding Agents: Structure, specs, and proof for agentic software engineering',
    base: '/book/',
    srcDir: 'content',
    markdown: {
      languages: [bundledLanguages.mermaid],
    },
    appearance: true,
    sitemap: {
      hostname: 'https://intent-engineering-for-coding-agents.github.io/book/',
    },
    head: [
      ['meta', { property: 'og:type', content: 'website' }],
      ['meta', { property: 'og:site_name', content: 'Intent Engineering for Coding Agents' }],
      ['meta', { property: 'og:title', content: 'Intent Engineering for Coding Agents' }],
      ['meta', { property: 'og:description', content: 'Structure, specs, and proof for agentic software engineering.' }],
      ['meta', { property: 'og:url', content: 'https://intent-engineering-for-coding-agents.github.io/book/' }],
      ['meta', { property: 'og:image', content: 'https://intent-engineering-for-coding-agents.github.io/book/og-image.png?v=2' }],
      ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
      ['meta', { name: 'twitter:title', content: 'Intent Engineering for Coding Agents' }],
      ['meta', { name: 'twitter:description', content: 'Structure, specs, and proof for agentic software engineering.' }],
      ['meta', { name: 'twitter:image', content: 'https://intent-engineering-for-coding-agents.github.io/book/og-image.png?v=2' }],
    ],
    themeConfig: {
      logo: {
        light: '/logo-light.svg',
        dark: '/logo-dark.svg',
      },
      search: {
        provider: 'local',
      },
      nav: [
        { text: 'Home', link: '/' },
        { text: 'Introduction', link: '/introduction' },
        {
          text: 'Contents',
          items: [
            { text: 'Foundation', link: '/foundation/' },
            { text: 'Agent Instructions', link: '/agent-instructions/' },
            { text: 'Spec-Driven Development', link: '/spec-driven/' },
            { text: 'Quality and Verification', link: '/quality/' },
            { text: 'Team Workflows', link: '/team/' },
          ]
        },
        { text: 'Appendices', link: '/appendices/honest-maturity' },
        { text: 'Feedback', link: '/appendices/feedback' },
      ],
      sidebar: [
        { text: 'Foreword', link: '/foreword' },
        { text: 'Introduction', link: '/introduction' },
        {
          text: 'Foundation',
          items: [
            { text: 'Overview', link: '/foundation/' },
            { text: 'Why Structure Matters', link: '/foundation/why-structure' },
            { text: 'Document Types', link: '/foundation/document-types' },
            { text: 'Plain-Text-as-Code', link: '/foundation/plain-text-as-code' },
            { text: 'Intent Engineering and the SDLC', link: '/foundation/intent-engineering-and-the-sdlc' },
            { text: 'Brownfield vs Greenfield', link: '/foundation/brownfield-vs-greenfield' },
            { text: 'When Intent Engineering Fails', link: '/foundation/when-intent-engineering-fails' },
          ]
        },
        {
          text: 'Agent Instructions',
          items: [
            { text: 'Overview', link: '/agent-instructions/' },
            { text: 'AGENTS.md: The Entry Point', link: '/agent-instructions/agents-md' },
            { text: 'Agent Instruction Hub', link: '/agent-instructions/instruction-hub' },
            { text: 'Instructions That Work', link: '/agent-instructions/instructions-that-work' },
            { text: 'Skills, Commands, and Hooks', link: '/agent-instructions/skills-commands-hooks' },
            { text: 'Context Window Management', link: '/agent-instructions/context-window' },
          ]
        },
        {
          text: 'Spec-Driven Development',
          items: [
            { text: 'Overview', link: '/spec-driven/' },
            { text: 'Why Specs?', link: '/spec-driven/why-specs' },
            { text: 'Why Small?', link: '/spec-driven/why-small' },
            { text: 'The Spectrum', link: '/spec-driven/the-spectrum' },
            { text: 'Spec Lifecycle', link: '/spec-driven/spec-lifecycle' },
            { text: 'Docs > Specs > Code', link: '/spec-driven/docs-gt-specs-gt-code' },
          ]
        },
        {
          text: 'Quality and Verification',
          items: [
            { text: 'Overview', link: '/quality/' },
            { text: 'Tests as Proof, Not Ritual', link: '/quality/tests-as-proof' },
            { text: 'Test Strategy and Convention', link: '/quality/test-strategy' },
            { text: 'Agent Evaluation and Regression', link: '/quality/agent-evaluation' },
            { text: 'AC IDs and Coverage', link: '/quality/ac-ids-coverage' },
            { text: 'Before, During, After Checkpoints', link: '/quality/checkpoints' },
            { text: 'What the Scanners Miss', link: '/quality/what-the-scanners-miss' },
            { text: 'PR Taxonomy', link: '/quality/pr-taxonomy' },
            { text: '.principles: Raising the Bar', link: '/quality/dot-principles' },
          ]
        },
        {
          text: 'Team Workflows',
          items: [
            { text: 'Overview', link: '/team/' },
            { text: 'OpenSpec Across Stacks', link: '/team/openspec-across-stacks' },
            { text: 'OpenSpec in an Existing SDLC', link: '/team/openspec-in-existing-sdlc' },
            { text: 'Trunk-Based Development with Agents', link: '/team/trunk-based-development' },
            { text: 'Code Review for Agent-Generated Code', link: '/team/code-review-agent-code' },
            { text: 'Shared Agent Instruction Conventions', link: '/team/shared-conventions' },
            { text: 'Cross-Team Coordination', link: '/team/cross-team-coordination' },
            { text: 'What Is Still Evolving', link: '/team/what-is-still-evolving' },
          ]
        },
        {
          text: 'Appendices',
          items: [
            { text: 'Honest Maturity', link: '/appendices/honest-maturity' },
            { text: 'Adoption Checklist', link: '/appendices/adoption-checklist' },
            { text: 'Glossary', link: '/appendices/glossary' },
            { text: 'Living Principles', link: '/appendices/living-principles' },
            { text: 'Tooling Landscape', link: '/appendices/tooling-landscape' },
            { text: 'Companion Repo', link: '/appendices/companion-repo' },
            { text: 'Feedback & Contributing', link: '/appendices/feedback' },
            { text: 'Credits', link: '/appendices/credits' },
            { text: 'References', link: '/appendices/references' },
          ]
        }
      ],
      editLink: {
        pattern: 'https://github.com/intent-engineering-for-coding-agents/book/edit/main/content/:path',
        text: 'Suggest a change to this page'
      },
      socialLinks: [
        { icon: 'github', link: 'https://github.com/intent-engineering-for-coding-agents/book' }
      ]
    }
  })
)
