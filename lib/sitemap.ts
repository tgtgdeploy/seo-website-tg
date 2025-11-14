/**
 * SEO Sitemap Generator
 */

interface SitemapConfig {
  hostname: string
}

interface SitemapUrl {
  url: string
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority?: number
  lastmod?: string
}

export async function generateSitemap(
  config: SitemapConfig,
  urls: SitemapUrl[]
): Promise<string> {
  const { hostname } = config

  const urlEntries = urls.map(({ url, changefreq, priority, lastmod }) => {
    const fullUrl = `${hostname}${url}`

    return `  <url>
    <loc>${fullUrl}</loc>${lastmod ? `
    <lastmod>${lastmod}</lastmod>` : ''}${changefreq ? `
    <changefreq>${changefreq}</changefreq>` : ''}${priority !== undefined ? `
    <priority>${priority}</priority>` : ''}
  </url>`
  }).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`
}
