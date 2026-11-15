/**
 * JSON-LD graf. Sve činjenice dolaze iz practice.ts.
 * Schema ne podiže AI citate sama po sebi, ali pomaže Google-u da Jelenu i brend
 * veže kao entitete (Person, Organization) i da razume šta je usluga. Ključne
 * činjenice uvek postoje i kao vidljiv tekst na stranici.
 */
import { person, practice, site, formatPhrase } from '../data/practice';
import type { Source } from '../data/izvori';

const abs = (path: string) => new URL(path, site.url).href;
export const ids = {
  person: abs('/#jelena'),
  org: abs('/#praksa'),
  website: abs('/#website'),
  service: abs('/#usluga'),
};

/** Svi javni profili: isti spisak ide u Person i u Organization. */
const sameAs = [person.instagram, ...person.profiles.map((p) => p.url)];

export function personNode() {
  const node: Record<string, unknown> = {
    '@type': 'Person',
    '@id': ids.person,
    name: person.name,
    givenName: person.givenName,
    familyName: person.familyName,
    url: abs('/o-meni/'),
    jobTitle: `${person.title}, ${person.status}`,
    description: `${person.name}, ${person.credentialsShort}. REBT terapija ${formatPhrase}, na srpskom.`,
    knowsLanguage: ['sr'],
    knowsAbout: [
      'Racionalno-emotivna bihejvioralna terapija (REBT)',
      'Kognitivno-bihejvioralna terapija (KBT)',
      'Anksioznost',
      'Perfekcionizam',
      'Odlaganje obaveza',
      'Ljutnja',
      'Samoprihvatanje',
      'Stres i svakodnevni problemi',
    ],
    alumniOf: person.education.map((e) => ({ '@type': 'CollegeOrUniversity', name: e.institution })),
    hasOccupation: { '@type': 'Occupation', name: 'Psiholog', occupationalCategory: 'Psihoterapija' },
    worksFor: { '@id': ids.org },
    sameAs,
    image: abs(person.hasPortrait ? '/jelena.jpg' : '/og.jpg'),
  };
  if (person.rebtTraining.association) {
    // Edukacija se pohađa kod udruženja; to je pripadnost, ne nužno članstvo.
    node.affiliation = { '@type': 'Organization', name: person.rebtTraining.association, url: person.rebtTraining.associationUrl ?? undefined };
  }
  return node;
}

/** Praksa kao brend: da se „Responsible Hedonist“ i Jelena vežu kao isti entitet. */
export function organizationNode() {
  return {
    '@type': 'Organization',
    '@id': ids.org,
    name: site.brand,
    alternateName: `${site.brand} · ${person.name}`,
    description: `Praksa REBT terapije ${formatPhrase}, na srpskom. ${person.name}, ${person.title}.`,
    url: abs('/'),
    logo: abs('/logo.png'),
    image: abs('/og.jpg'),
    founder: { '@id': ids.person },
    sameAs,
    ...(practice.location.city
      ? { address: { '@type': 'PostalAddress', streetAddress: practice.location.address ?? undefined, addressLocality: practice.location.city, postalCode: practice.location.postalCode ?? undefined, addressCountry: 'RS' } }
      : {}),
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'zakazivanje',
      email: person.email,
      ...(person.phone ? { telephone: person.phone.e164 } : {}),
      url: abs('/zakazivanje/'),
      availableLanguage: ['sr'],
    },
  };
}

export function websiteNode() {
  return {
    '@type': 'WebSite',
    '@id': ids.website,
    url: abs('/'),
    name: `${person.name} · ${site.brand}`,
    alternateName: [site.brand, 'responsible hedonist'],
    inLanguage: site.lang,
    publisher: { '@id': ids.org },
  };
}

export function serviceNode() {
  const node: Record<string, unknown> = {
    '@type': 'Service',
    '@id': ids.service,
    name: `REBT terapija ${formatPhrase}, na srpskom`,
    serviceType: 'Psihoterapija (REBT, kognitivno-bihejvioralni pravac)',
    description: `Individualne seanse od ${practice.sessionMinutes} minuta, uživo u ordinaciji ili online (video poziv), na srpskom jeziku, za ${practice.audience}.`,
    provider: { '@id': ids.person },
    brand: { '@id': ids.org },
    areaServed: [
      ...(practice.location.city ? [{ '@type': 'City', name: practice.location.city }] : []),
      { '@type': 'Country', name: 'Srbija' },
      { '@type': 'Place', name: 'Ceo svet (online, na srpskom)' },
    ],
    availableChannel: { '@type': 'ServiceChannel', serviceUrl: abs('/zakazivanje/'), availableLanguage: { '@type': 'Language', name: 'Serbian', alternateName: 'sr' } },
    audience: { '@type': 'PeopleAudience', suggestedMinAge: 18 },
  };
  const offers: Record<string, unknown>[] = [];
  if (practice.firstSessionFree) {
    offers.push({ '@type': 'Offer', name: 'Prva seansa', description: 'Cela prva seansa je besplatna, bez obaveze da se nastavi.', price: 0, priceCurrency: 'RSD', url: abs('/zakazivanje/') });
  }
  if (practice.price.rsd) {
    offers.push({ '@type': 'Offer', name: 'Seansa', price: practice.price.rsd, priceCurrency: 'RSD', url: abs('/zakazivanje/') });
  }
  if (offers.length) node.offers = offers;
  return node;
}

export interface Crumb { name: string; href: string }

export function breadcrumbNode(url: string, crumbs: Crumb[]) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: abs(c.href) })),
  };
}

export interface FaqItem { q: string; a: string }

/** Pitanja i odgovori koji su vidljivi na stranici, kao FAQPage. Odgovor ide bez HTML-a. */
export function faqNode(url: string, items: FaqItem[]) {
  const plain = (html: string) => html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  return {
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    inLanguage: site.lang,
    isPartOf: { '@id': `${url}#webpage` },
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: plain(i.a) },
    })),
  };
}

export function webPageNode(opts: {
  url: string;
  title: string;
  description: string;
  type?: string;
  crumbs?: Crumb[];
  datePublished?: Date;
  dateModified?: Date;
  about?: string[];
  mainEntity?: string;
  sources?: Source[];
}) {
  const node: Record<string, unknown> = {
    '@type': opts.type ?? 'WebPage',
    '@id': `${opts.url}#webpage`,
    url: opts.url,
    name: opts.title,
    description: opts.description,
    inLanguage: site.lang,
    isPartOf: { '@id': ids.website },
  };
  if (opts.crumbs?.length) node.breadcrumb = { '@id': `${opts.url}#breadcrumb` };
  if (opts.datePublished) {
    node.datePublished = opts.datePublished.toISOString().slice(0, 10);
    node.author = { '@id': ids.person };
  }
  if (opts.dateModified) node.dateModified = opts.dateModified.toISOString().slice(0, 10);
  if (opts.mainEntity) node.mainEntity = { '@id': opts.mainEntity };
  if (opts.about) node.about = opts.about.map((name) => ({ '@type': 'Thing', name }));
  if (opts.sources?.length) {
    node.citation = opts.sources.map((s) => ({ '@type': 'CreativeWork', name: s.cite, ...(s.url ? { url: s.url } : {}) }));
  }
  return node;
}

export function graph(nodes: unknown[]) {
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes }).replace(/</g, '\\u003c');
}
