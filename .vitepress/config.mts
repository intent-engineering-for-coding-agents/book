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
            { text: 'The Rule of Ten', link: '/spec-driven/the-rule-of-ten' },
            { text: 'Why Important Stuff First?', link: '/spec-driven/why-important-first' },
            { text: 'The Spectrum', link: '/spec-driven/the-spectrum' },
            { text: 'Spec Lifecycle', link: '/spec-driven/spec-lifecycle' },
            { text: 'Spec > Code', link: '/spec-driven/spec-gt-code' },
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
            { text: 'Security in Depth', link: '/quality/security-in-depth' },
            { text: 'PR Taxonomy', link: '/quality/pr-taxonomy' },
            { text: '.principles: Raising the Bar', link: '/quality/dot-principles' },
          ]
        },
        {
          text: 'Team Workflows',
          items: [
            { text: 'Overview', link: '/team/' },
            { text: 'OpenSpec Across Stacks', link: '/team/openspec-across-stacks' },
            { text: 'Why Teams Break Agentic Workflows', link: '/team/why-teams-break' },
            { text: 'OpenSpec in an Existing SDLC', link: '/team/openspec-in-existing-sdlc' },
            { text: 'Trunk-Based Development with Agents', link: '/team/trunk-based-development' },
            { text: 'Code Review for Agent-Generated Code', link: '/team/code-review-agent-code' },
            { text: 'Parallel Agents on the Same Codebase', link: '/team/parallel-agents' },
            { text: 'Shared AI Instruction Conventions', link: '/team/shared-conventions' },
            { text: 'Cross-Team Coordination', link: '/team/cross-team-coordination' },
            { text: 'What Is Still Evolving', link: '/team/what-is-still-evolving' },
          ]
        },
        {
          text: 'Appendices',
          items: [
            { text: 'Glossary', link: '/appendices/glossary' },
            { text: 'Living Principles', link: '/appendices/living-principles' },
          ]
        }
      ],
      socialLinks: [
        { icon: 'github', link: 'https://github.com/ase-book/ase-book' }
      ]
    }
  })
)
