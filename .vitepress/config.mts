import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(
  defineConfig({
    title: 'ASE Book',
    description: 'From Vibe to Pro — Agentic Software Engineering',
    srcDir: 'content',
    themeConfig: {
      nav: [{ text: 'Home', link: '/' }],
      sidebar: [],
      socialLinks: [
        { icon: 'github', link: 'https://github.com/ase-book/ase-book' }
      ]
    }
  })
)
