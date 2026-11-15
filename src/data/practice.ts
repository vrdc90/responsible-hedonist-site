/**
 * Jedini izvor činjenica o praksi.
 *
 * Svaka vrednost koju Jelena još nije potvrdila stoji u `pending` listi na dnu.
 * U `npm run dev` se ta lista vidi kao traka na dnu svake stranice, a u produkciji ne.
 * Pravilo za sve koji menjaju sajt (ljude i Claude Code): činjenice se ne izmišljaju,
 * ne prepisuju u tekst stranica i ne „pogađaju“. Menjaju se samo ovde.
 */

export const site = {
  /** TODO: pravi domen. Koristi se za canonical, sitemap, OG i JSON-LD. */
  url: 'https://jelenamarjanovic.rs',
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
  /** Zvanje tačno kako piše u diplomi. Trenutno: kako stoji u Instagram biografiji. */
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
      degree: 'Studije psihologije',
      year: null as number | null,
    },
  ],
  rebtTraining: {
    program: 'Edukacija iz racionalno-emotivne i kognitivno-bihejvioralne terapije (RE&CBT)',
    association: null as string | null,
    associationUrl: null as string | null,
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
  /** TODO: adresa na domenu. */
  email: 'jelena@jelenamarjanovic.rs',
  /** Putanja do portreta u src/assets/ kad stigne (4:5, dnevno svetlo). */
  hasPortrait: false,
} as const;

export const practice = {
  format: 'online, video poziv',
  language: 'srpski',
  audience: 'odrasli koji govore srpski, u Srbiji i inostranstvu',
  modality: 'REBT',
  modalityLong: 'racionalno-emotivna bihejvioralna terapija (REBT)',
  sessionMinutes: 50,
  rhythm: 'najčešće jednom nedeljno, a kasnije ređe',
  /** null znači da cena nije potvrđena; sajt tada piše „cena na upit“. */
  price: { rsd: null as number | null, eur: null as number | null },
  introCall: { offered: true, minutes: 15, free: true },
  cancellation: 'Termin možeš da otkažeš ili pomeriš bez troška do 24 sata pre početka.',
  payment: [
    'uplata na račun, uz IPS QR kod (Srbija)',
    'PayPal ili Wise (inostranstvo)',
  ],
  paymentWhen: 'Seansa se plaća unapred, najkasnije 24 sata pre termina.',
  /**
   * TODO: link ka kalendaru (Cal.com ili Calendly), npr. 'https://cal.com/jelena/prvi-razgovor'.
   * Kad se upiše, kalendar se ugrađuje na /zakazivanje/.
   */
  bookingUrl: null as string | null,
  /**
   * Kontakt forma na /zakazivanje/. Sajt je statički, pa forma šalje podatke servisu
   * koji ih prosleđuje na email (Web3Forms, Formspree, Netlify Forms…).
   * `endpoint` je adresa servisa, `hidden` su skrivena polja koja servis traži
   * (ključ, adresa za povratak na /hvala/), `honeypot` je ime polja-zamke za botove.
   * Dok je endpoint null, forma se vidi samo u dev režimu, a na sajtu stoji email.
   */
  form: {
    endpoint: null as string | null,
    hidden: {} as Record<string, string>,
    honeypot: 'botcheck',
  },
  /**
   * Uživo u ordinaciji: Instagram biografija kaže „uživo & online“, plan sajta kaže samo online.
   * Dok je false, sajt svuda piše samo online. Ako postane true, vredi otvoriti i Google Business Profile.
   */
  inPerson: false,
  video: 'link za video poziv stiže emailom, ništa ne moraš da instaliraš',
  responseTime: 'Odgovaram u roku od 48 sati, radnim danima.',
  worksWith: 'odrasli (18+)',
  doesNotWorkWith: [
    'akutna kriza i hitne situacije',
    'zavisnosti kao glavna tema rada',
    'stanja kojima je prvo potrebna psihijatrijska procena',
  ],
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

export const topicsLive = ['anksioznost', 'perfekcionizam', 'odlaganje'] as const;

/** Formatira cenu ili vraća „na upit“. */
export function priceLabel(): string {
  const { rsd, eur } = practice.price;
  if (rsd && eur) return `${rsd.toLocaleString('sr-RS')} RSD (${eur} € iz inostranstva)`;
  if (rsd) return `${rsd.toLocaleString('sr-RS')} RSD`;
  if (eur) return `${eur} €`;
  return 'na upit';
}

/** Link za zakazivanje: kalendar kad postoji, inače email sa popunjenim naslovom. */
export function bookingHref(): string {
  if (practice.bookingUrl) return practice.bookingUrl;
  const subject = encodeURIComponent('Prvi razgovor');
  return `mailto:${person.email}?subject=${subject}`;
}

/**
 * Šta Jelena još treba da potvrdi pre objave.
 * Kad nešto potvrdi: upiši vrednost gore i obriši stavku odavde.
 */
export const pending: string[] = [
  'Domen sajta (site.url) i email na domenu (person.email)',
  'Tačno zvanje iz diplome (person.title) i godina diplomiranja',
  'Formulacija statusa u edukaciji (person.status), dogovorena sa edukacijom',
  'Naziv REBT edukacije, udruženja i godina početka (person.rebtTraining)',
  'Cena seanse u RSD i EUR (practice.price)',
  'Trajanje seanse: 45, 50 ili 60 minuta (practice.sessionMinutes)',
  'Besplatan uvodni razgovor od 15 minuta: da ili ne (practice.introCall)',
  'Pravilo otkazivanja i plaćanja (practice.cancellation, practice.payment)',
  'Link ka kalendaru za zakazivanje (practice.bookingUrl)',
  'Servis za kontakt formu (practice.form.endpoint); dok ga nema, forma se vidi samo u dev režimu',
  'Uživo ili samo online (practice.inPerson): Instagram kaže „uživo & online“, plan sajta samo online',
  'Javni profili za sameAs: LinkedIn, direktorijumi, udruženje (person.profiles)',
  'Stručni izvori (src/data/izvori.ts): Jelena potvrđuje da su to izvori na koje se oslanja',
  'Uslovi saradnje (/uslovi/) i privatnost: proverava pravnik ili knjigovođa',
  'Sa kim ne radi, dogovoreno sa supervizorom (practice.doesNotWorkWith)',
  'Portret 4:5 u src/assets/portrait.jpg (person.hasPortrait)',
  'Naslov u heroju na početnoj: jedan od predloga ili njen',
  'Svi tekstovi su nacrti: Jelena ih prepravlja u svom glasu i potpisuje',
];
