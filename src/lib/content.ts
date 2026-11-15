import { getCollection } from 'astro:content';

/** Nacrti (draft: true) se ne objavljuju; vide se u dev režimu i u fajlu za pregled (PUBLIC_REVIEW=1). */
const showDrafts = import.meta.env.DEV || import.meta.env.PUBLIC_REVIEW === '1';
const visible = (draft: boolean) => showDrafts || !draft;

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
