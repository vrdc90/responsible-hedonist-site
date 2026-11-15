import { getCollection } from 'astro:content';

/** Nacrti (draft: true) se ne objavljuju; u dev režimu se vide radi pregleda. */
const visible = (draft: boolean) => import.meta.env.DEV || !draft;

export async function getTopics() {
  const all = await getCollection('teme', ({ data }) => visible(data.draft));
  return all.sort((a, b) => a.data.order - b.data.order);
}

/** Sve teme, i nacrti, za rečenice „Zvuči poznato?“; nacrti nemaju link. */
export async function getAllTopics() {
  const all = await getCollection('teme');
  return all.sort((a, b) => a.data.order - b.data.order);
}

export async function getQuestions() {
  const all = await getCollection('pitanja', ({ data }) => visible(data.draft));
  return all.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export const isLive = (draft: boolean) => visible(draft);
