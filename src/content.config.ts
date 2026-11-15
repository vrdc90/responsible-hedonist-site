import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const faq = z.array(z.object({ q: z.string(), a: z.string() }));

/** Stranice tema: glavni ulaz iz Google-a i AI odgovora. */
const teme = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/teme' }),
  schema: z.object({
    /** <title>: fraza koju ljudi kucaju. */
    title: z.string().max(65),
    /** Kratko ime teme za menije i liste. */
    name: z.string(),
    /** H1: reč koju ljudi kucaju + ljudski podnaslov. */
    h1: z.string(),
    description: z.string().min(70).max(160),
    /** Rečenica u kojoj se čitalac prepozna (početna, „Zvuči poznato?“). */
    hook: z.string(),
    /** Prvi pasus: odgovor u 2–3 rečenice. Ovaj deo AI najčešće citira. */
    answer: z.string(),
    order: z.number(),
    faq: faq.min(3).max(5),
    /** Ključevi iz src/data/izvori.ts; ispisuju se u odeljku „Izvori“. */
    sources: z.array(z.string()).default([]),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
  }),
});

/** Kratki članci iz Instagram serija, naslov u obliku pitanja. */
const pitanja = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pitanja' }),
  schema: z.object({
    title: z.string().max(80),
    description: z.string().min(70).max(160),
    /** Odgovor u 2–3 rečenice, prikazan odmah ispod naslova. */
    answer: z.string(),
    topic: reference('teme'),
    instagram: z.url().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { teme, pitanja };
