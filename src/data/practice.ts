/**
 * Jedini izvor činjenica o praksi.
 *
 * Svaka vrednost koju Jelena još nije potvrdila stoji u `pending` listi na dnu.
 * U `npm run dev` se ta lista vidi kao traka na dnu svake stranice, a u produkciji ne.
 * Pravilo za sve koji menjaju sajt (ljude i Claude Code): činjenice se ne izmišljaju,
 * ne prepisuju u tekst stranica i ne „pogađaju“. Menjaju se samo ovde.
 */

export const site = {
  /** Glavni domen. Koristi se za canonical, sitemap, OG i JSON-LD. responsible-hedonist.com se preusmerava ovde. */
  url: 'https://jelenamarjanovic.net',
  brand: 'Responsible Hedonist',
  lang: 'sr-Latn',
  locale: 'sr_RS',
  /** Godina pokretanja, za © u podnožju. */
  since: 2026,
} as const;

export const person = {
  name: 'Jelena Marjanović',
  givenName: 'Jelena',
  familyName: 'Marjanović',
  /** Zvanje tačno kako piše u diplomi (potvrđeno). */
  title: 'master psiholog',
  /**
   * Status u edukaciji, u formulaciji dogovorenoj sa edukacijom i supervizorom.
   * Trenutno: kako stoji u Instagram biografiji („RE&CBT psihoterapeut na edukaciji“).
   */
  status: 'RE&CBT psihoterapeut na edukaciji, pod supervizijom',
  /** Kratka verzija za potpis i podnožje. */
  credentialsShort: 'Master psiholog · RE&CBT psihoterapeut na edukaciji, pod supervizijom',
  education: [
    {
      institution: 'Filozofski fakultet, Univerzitet u Novom Sadu',
      degree: 'Master studije psihologije',
      year: 2021 as number | null,
    },
  ],
  rebtTraining: {
    program: 'Edukacija iz racionalno-emotivne i kognitivno-bihejvioralne terapije (RE&CBT)',
    association: 'Udruženje za kognitivne i bihejvioralne terapije Srbije' as string | null,
    associationUrl: 'https://ukbt.org.rs/' as string | null,
    since: null as number | null,
  },
  memberships: [] as { name: string; url?: string }[],
  instagram: 'https://www.instagram.com/responsible_hedonist/',
  instagramHandle: '@responsible_hedonist',
  /** Direktna poruka na Instagramu: publika odatle dolazi, pa je to najniži prag za javljanje. */
  instagramDm: 'https://ig.me/m/responsible_hedonist',
  /**
   * Ostali javni profili (LinkedIn, direktorijumi terapeuta, sajt udruženja).
   * Sve što se ovde upiše ide u podnožje i u sameAs (JSON-LD), pa Google i AI
   * lakše povezuju da je reč o istoj osobi. Isti opis i isti link svuda.
   */
  profiles: [] as { name: string; url: string }[],
  email: 'responsiblehedonistpsychology@gmail.com',
  /** Delovi adrese između kojih sme da se prelomi red na uskim ekranima (spojeni moraju dati `email`). */
  emailBreaks: ['responsible', 'hedonist', 'psychology', '@gmail.com'] as string[],
  /**
   * Broj za poziv, SMS, Viber i WhatsApp. `e164` je broj bez razmaka, sa pozivnim brojem,
   * `display` je kako se ispisuje. Ako se postavi na null, kartica za telefon nestaje.
   */
  phone: { e164: '+381616801011', display: '+381 61 680 1011' } as { e164: string; display: string } | null,
  /** Portret je u src/assets/portrait.jpg (4:5) i portrait-face.jpg (lice), a javna kopija u public/jelena.jpg. */
  hasPortrait: true,
} as const;

export const practice = {
  format: 'uživo i online (video poziv)',
  language: 'srpski',
  audience: 'odrasli koji govore srpski, u Srbiji i inostranstvu',
  modality: 'REBT',
  modalityLong: 'racionalno-emotivna bihejvioralna terapija (REBT)',
  sessionMinutes: 50,
  rhythm: 'najčešće jednom nedeljno, a kasnije ređe',
  /**
   * Dok je null, jedino tabela uslova na /kako-radim/ piše „Cena seanse: na upit“, a ostatak sajta cenu ne pominje.
   * Kad se upiše, prikazuje se u toj tabeli i na /uslovi/ (i ide u JSON-LD).
   */
  price: { rsd: null as number | null, eur: null as number | null },
  /** Cela prva seansa je besplatna (potvrđeno). */
  firstSessionFree: true,
  cancellation: 'Seansu možeš da otkažeš najkasnije 24 sata pre termina.',
  paymentWhen: 'Online seanse se plaćaju unapred, najkasnije 24 sata pre termina.',
  /** Radi i uživo u ordinaciji i online (potvrđeno). */
  inPerson: true,
  /**
   * Ordinacija za seanse uživo. `cityIn` i `districtIn` su u lokativu, kako se pišu u rečenici
   * („u Beogradu“, „na Paliluli“). Ulica i broj se namerno ne prikazuju (dogovaraju se u poruci);
   * za Google Business Profile ulica ipak treba pri verifikaciji, a može da se sakrije.
   */
  location: {
    city: 'Beograd' as string | null,
    cityIn: 'u Beogradu' as string | null,
    district: 'Palilula' as string | null,
    districtIn: 'na Paliluli' as string | null,
    address: null as string | null,
    postalCode: null as string | null,
  },
  video: 'link za video poziv stiže emailom, ništa ne moraš da instaliraš',
  responseTime: 'Odgovaram u roku od 48 sati, radnim danima.',
  worksWith: 'odrasli (18+)',
} as const;

export const crisis = {
  note: 'Ovaj sajt i email nisu za hitne situacije. Ako si u neposrednoj opasnosti, pozovi 194.',
  lines: [
    { name: 'Hitna pomoć', number: '194', tel: '194', hours: '0–24' },
    {
      name: 'Centar Srce, emotivna podrška',
      number: '0800 300 303',
      tel: '0800300303',
      hours: 'svaki dan od 14 do 23 h, besplatno',
    },
    { name: 'Van Srbije', number: '112 u EU', tel: '112', hours: 'ili lokalni broj za hitne slučajeve' },
  ],
} as const;

export const topicsLive = ['anksioznost', 'perfekcionizam', 'odlaganje', 'svakodnevica'] as const;

/** „uživo u Beogradu i online“, ili „uživo i online“ dok grad nije upisan. */
export const formatPhrase = practice.location.cityIn ? `uživo ${practice.location.cityIn} i online` : 'uživo i online';
/** „uživo u Beogradu ili online“, za rečenice o jednoj seansi. */
export const formatChoice = practice.location.cityIn ? `uživo ${practice.location.cityIn} ili online` : 'uživo ili online';
/** „Beograd, Palilula“: mesto ordinacije za kratke oznake. */
export const placeLabel = [practice.location.city, practice.location.district].filter(Boolean).join(', ');

/** Formatirana cena, ili null dok je cena na upit (tada je sajt ne pominje). */
export function priceLabel(): string | null {
  const { rsd, eur } = practice.price;
  if (rsd && eur) return `${rsd.toLocaleString('sr-RS')} RSD (${eur} € iz inostranstva)`;
  if (rsd) return `${rsd.toLocaleString('sr-RS')} RSD`;
  if (eur) return `${eur} €`;
  return null;
}

/** Email sa popunjenim naslovom poruke. */
export const mailHref = `mailto:${person.email}?subject=${encodeURIComponent('Prvi razgovor')}`;

/** Svi načini da se stupi u kontakt preko broja telefona. */
export function phoneLinks(phone: { e164: string }) {
  const digits = phone.e164.replace(/[^\d]/g, '');
  return {
    call: `tel:${phone.e164}`,
    sms: `sms:${phone.e164}`,
    viber: `viber://chat?number=%2B${digits}`,
    whatsapp: `https://wa.me/${digits}`,
  };
}

/**
 * Šta Jelena još treba da potvrdi pre objave.
 * Kad nešto potvrdi: upiši vrednost gore i obriši stavku odavde.
 */
export const pending: string[] = [
  'Formulacija statusa u edukaciji (person.status): sada piše kao u Instagram biografiji',
  'Cena (opciono): za sada na upit; kad se upiše, vidi se na /kako-radim/ i /uslovi/',
  'Svi tekstovi su nacrti: Jelena ih prepravlja u svom glasu i potpisuje',
];
