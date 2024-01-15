import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
import { micromark } from 'micromark'
import sanitizeHtml from 'sanitize-html'
import siteConfig from '@config/site'

export const GET: APIRoute = async function ({ site, url }) {
  const posts = await getCollection('posts')
  posts.sort((a, b) => b.data.publishedTime.valueOf() - a.data.publishedTime.valueOf())
  const items = await Promise.all(
    posts.map(({ slug, data, body }) => {
      const postUrl = `${url.origin}/blog/${slug}`
      const { title, headline: description } = data
      const content = micromark(body)
      return {
        id: postUrl,
        url: postUrl,
        title,
        summary: description,
        date_published: data.publishedTime.toISOString(),
        content_html: sanitizeHtml(content),
      }
    }),
  )
  const feed = {
    version: 'https://www.jsonfeed.org/version/1.1',
    title: siteConfig.title,
    home_page_url: site ?? 'https://infolektuell.de',
    feed_url: url,
    description: siteConfig.description,
    icon: `${url.origin}/favicon.svg`,
    favicon: `${url.origin}/favicon.svg`,
    authors: [
      {
        name: 'Tamara Cook',
      },
    ],
    language: siteConfig.defaultLanguage,
    items,
  }
  return new Response(JSON.stringify(feed), {
    headers: {
      'Content-Type': 'application/feed+json',
    },
  })
}
