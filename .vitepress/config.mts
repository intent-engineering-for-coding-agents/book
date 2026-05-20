import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(
  defineConfig({
    title: 'ASE Book',
    description: 'From Vibe to Pro — Agentic Software Engineering',
    srcDir: 'content',
    themeConfig: {
      nav: [
        { text: 'Home', link: '/' },
        { text: 'Introduction', link: '/introduction' },
        { text: 'Foundation', link: '/foundation/' },
        { text: 'Appendices', link: '/appendices/glossary' },
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
            { text: 'The Map: ASE and the SDLC', link: '/foundation/ase-and-the-sdlc' },
            { text: 'Honest Maturity', link: '/foundation/honest-maturity' },
            { text: 'Brownfield vs Greenfield', link: '/foundation/brownfield-vs-greenfield' },
            { text: 'When ASE Fails', link: '/foundation/when-ase-fails' },
          ]
        },
        {
          text: 'AI Instructions',
          items: [
            { text: 'Overview', link: '/ai-instructions/' },
            { text: 'AGENTS.md: One File Changes Everything', link: '/ai-instructions/agents-md' },
            { text: 'From AGENTS.md to AI Instruction Hub', link: '/ai-instructions/instruction-hub' },
            { text: 'Writing Instructions That Work', link: '/ai-instructions/writing-instructions' },
            { text: 'Skills, Commands, and Hooks', link: '/ai-instructions/skills-commands-hooks' },
            { text: 'Context Window Management', link: '/ai-instructions/context-window' },
            { text: 'Failure Modes and Recovery', link: '/ai-instructions/failure-modes' },
            { text: 'Vendor Files That Point, Not Duplicate', link: '/ai-instructions/vendor-files' },
          ]
        },
        {
          text: 'Spec-Driven Development',
          items: [
            { text: 'Overview', link: '/spec-driven/' },
            { text: 'Why Specs?', link: '/spec-driven/why-specs' },
            { text: 'Why Small?', link: '/spec-driven/why-small' },
            { text: 'Why Important Stuff First?', link: '/spec-driven/why-important-first' },
            { text: 'The Spectrum', link: '/spec-driven/the-spectrum' },
            { text: 'Spec Lifecycle', link: '/spec-driven/spec-lifecycle' },
            { text: 'Spec > Code', link: '/spec-driven/spec-gt-code' },
          ]
        },
        {
          text: 'Appendices',
          items: [
            { text: 'Glossary', link: '/appendices/glossary' },
          ]
        }
      ],
      socialLinks: [
        { icon: 'github', link: 'https://github.com/ase-book/ase-book' }
      ]
    }
  })
)
