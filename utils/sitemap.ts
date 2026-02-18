import { features } from 'data/features';
import { comparisons } from 'data/comparisons';
import { problems } from 'data/problems';
import { industries } from 'data/industries';
import { regions } from 'data/regions';
import { EnvVars } from 'env';

export interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export function generateSitemapUrls(): SitemapUrl[] {
  const baseUrl = EnvVars.URL;
  const urls: SitemapUrl[] = [
    // Main pages
    { loc: `${baseUrl}/`, changefreq: 'daily', priority: 1.0 },
    { loc: `${baseUrl}/pricing`, changefreq: 'weekly', priority: 0.9 },
    { loc: `${baseUrl}/contact`, changefreq: 'monthly', priority: 0.8 },
    { loc: `${baseUrl}/privacy-policy`, changefreq: 'yearly', priority: 0.3 },
    { loc: `${baseUrl}/cookies-policy`, changefreq: 'yearly', priority: 0.3 },

    // Index pages
    { loc: `${baseUrl}/features`, changefreq: 'weekly', priority: 0.9 },
    { loc: `${baseUrl}/compare`, changefreq: 'weekly', priority: 0.8 },
    { loc: `${baseUrl}/problems`, changefreq: 'weekly', priority: 0.8 },
    { loc: `${baseUrl}/industries`, changefreq: 'weekly', priority: 0.8 },
    { loc: `${baseUrl}/regions`, changefreq: 'weekly', priority: 0.8 },

    // Feature pages
    ...features.map((feature) => ({
      loc: `${baseUrl}/features/${feature.slug}`,
      changefreq: 'monthly' as const,
      priority: 0.7,
    })),

    // Comparison pages
    ...comparisons.map((comparison) => ({
      loc: `${baseUrl}/compare/${comparison.slug}`,
      changefreq: 'monthly' as const,
      priority: 0.7,
    })),

    // Problem pages
    ...problems.map((problem) => ({
      loc: `${baseUrl}/problems/${problem.slug}`,
      changefreq: 'monthly' as const,
      priority: 0.7,
    })),

    // Industry pages
    ...industries.map((industry) => ({
      loc: `${baseUrl}/industries/${industry.slug}`,
      changefreq: 'monthly' as const,
      priority: 0.7,
    })),

    // Region pages
    ...regions.map((region) => ({
      loc: `${baseUrl}/regions/${region.slug}`,
      changefreq: 'monthly' as const,
      priority: 0.7,
    })),
  ];

  return urls;
}

export function generateSitemapXml(): string {
  const urls = generateSitemapUrls();
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>${url.lastmod ? `\n    <lastmod>${url.lastmod}</lastmod>` : ''}${url.changefreq ? `\n    <changefreq>${url.changefreq}</changefreq>` : ''}${url.priority ? `\n    <priority>${url.priority}</priority>` : ''}
  </url>`
  )
  .join('\n')}
</urlset>`;

  return xml;
}
