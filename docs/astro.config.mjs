// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  site: 'https://agentic-engineering.pages.dev',
  integrations: [
    starlight({
      title: 'Agentic Engineering',
      description:
        'A comprehensive reference to autonomous coding agents, agentic organizations, and the emerging patterns of AI-native software engineering.',
      logo: {
        light: './src/assets/light.svg',
        dark: './src/assets/dark.svg',
        replacesTitle: true,
      },
      favicon: '/favicon.svg',
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/opencolin/agentic-engineering',
        },
      ],
      customCss: ['./src/styles/theme.css'],
      sidebar: [
        {
          label: 'Get Started',
          items: [{ label: 'Overview', slug: 'index' }],
        },
        {
          label: 'Landscape',
          items: [
            { label: 'Approaches', slug: 'approaches' },
            { label: 'Patterns', slug: 'patterns' },
            { label: 'Benchmarks', slug: 'benchmarks' },
            { label: 'Comparison', slug: 'comparison' },
            { label: 'Organizations', slug: 'organizations' },
          ],
        },
        {
          label: 'Infrastructure',
          items: [
            { label: 'Inference', slug: 'inference' },
            { label: 'Sandboxes', slug: 'sandboxes' },
            { label: 'Hosting & Execution', slug: 'infrastructure' },
          ],
        },
      ],
      editLink: {
        baseUrl:
          'https://github.com/opencolin/agentic-engineering/edit/main/docs/',
      },
      lastUpdated: true,
    }),
  ],
});
