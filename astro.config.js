// noinspection JSUnusedGlobalSymbols

import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import { remarkHeadingId } from 'remark-custom-heading-id'
import remarkGitInfo from './src/plugins/remark-git-info'
import remarkReadingTime from './src/plugins/remark-reading-time'
import rehypeExternalLinks from 'rehype-external-links'
import sitemap from '@astrojs/sitemap'
import svelte from '@astrojs/svelte'
import icon from 'astro-icon'

// https://astro.build/config
export default defineConfig({
  site: 'https://infolektuell.de',
  integrations: [
    mdx(),
    sitemap(),
    svelte(),
    icon({
      iconDir: 'src/assets/icons',
      include: {
        'fa6-regular': ['address-card'],
        'fa6-solid': ['angle-down', 'envelope', 'phone', 'mobile'],
        'fa6-brands': ['github', 'linkedin', 'mastodon'],
        tabler: ['brand-matrix'],
        openmoji: [
          'abacus',
          'chart-increasing',
          'graduation-cap',
          'light-bulb',
          'handshake',
          'memo',
          'mobile-phone-with-arrow',
          'postbox',
          'sparkle',
          'woman-pilot-medium-light-skin-tone',
          'zipper-mouth-face',
        ],
      },
    }),
  ],
  markdown: {
    remarkPlugins: [remarkHeadingId, remarkGitInfo, remarkReadingTime],
    rehypePlugins: [[rehypeExternalLinks, { target: '_blank' }]],
  },
  server: {
    port: 8080,
  },
})
