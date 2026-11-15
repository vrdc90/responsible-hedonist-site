import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getQuestions } from '../../lib/content';
import { person } from '../../data/practice';

export async function GET(context: APIContext) {
  const qs = (await getQuestions()).filter((q) => !q.data.draft);
  return rss({
    title: `Pitanja · ${person.name}`,
    description: 'Kratki tekstovi o REBT-u i svakodnevici, na srpskom.',
    site: context.site!,
    trailingSlash: true,
    items: qs.map((q) => ({
      title: q.data.title,
      description: q.data.description,
      pubDate: q.data.pubDate,
      link: `/pitanja/${q.id}/`,
    })),
    customData: '<language>sr</language>',
  });
}
