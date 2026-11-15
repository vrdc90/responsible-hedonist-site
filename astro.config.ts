import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync } from 'node:fs';
import cspHashes from './src/integrations/csp-hashes';
import { site } from './src/data/practice';

/**
 * lastmod u sitemap-u dolazi iz frontmattera (updatedDate, pa pubDate) i postoji samo
 * za teme i tekstove. Datum se menja samo uz stvarnu izmenu sadržaja; za stranice
 * bez datuma ga ne navodimo, jer netačan lastmod Google prestaje da uzima u obzir.
 */
function contentDates(): Map<string, string> {
  const dates = new Map<string, string>();
  for (const [dir, base] of [['src/content/teme', '/teme/'], ['src/content/pitanja', '/pitanja/']] as const) {
    for (const file of readdirSync(dir).filter((f) => f.endsWith('.md'))) {
      const fm = readFileSync(`${dir}/${file}`, 'utf8').split('---')[1] ?? '';
      const date = /^updatedDate:\s*(\S+)/m.exec(fm)?.[1] ?? /^pubDate:\s*(\S+)/m.exec(fm)?.[1];
      if (date) dates.set(new URL(`${base}${file.replace(/\.md$/, '')}/`, site.url).href, new Date(date).toISOString());
    }
  }
  return dates;
}
const lastmod = contentDates();

/** `npm run review` pravi poseban build za pregled (sa nacrtima tema) u .review-build/, a dist/ ostaje netaknut. */
const review = process.env.PUBLIC_REVIEW === '1';

/**
 * Objavljene adrese uvek imaju kosu crtu na kraju (/kako-radim/), a Cloudflare Pages
 * adresu bez nje sam preusmerava. Lokalni `astro dev` i `astro preview` to ne rade, nego
 * za /kako-radim pokažu svoju 404, pa lokalno prihvatamo obe verzije.
 */
const localServer = ['dev', 'preview'].includes(process.argv[2] ?? '');

export default defineConfig({
  site: site.url,
  output: 'static',
  outDir: review ? './.review-build' : './dist',
  trailingSlash: localServer ? 'ignore' : 'always',
  build: {
    format: 'directory',
    // Ceo CSS ide inline: jedna stranica = jedan zahtev, brži LCP na telefonu.
    inlineStylesheets: 'always',
  },
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith('/404/'),
      serialize(item) {
        const date = lastmod.get(item.url);
        return date ? { ...item, lastmod: date } : item;
      },
    }),
    cspHashes(),
  ],
  fonts: [
    {
      name: 'Plus Jakarta Sans',
      cssVariable: '--font-sans',
      provider: fontProviders.fontsource(),
      weights: ['200 800'],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
    {
      name: 'Instrument Serif',
      cssVariable: '--font-serif',
      provider: fontProviders.fontsource(),
      weights: [400],
      styles: ['normal', 'italic'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['Georgia', 'serif'],
    },
  ],
});
