/**
 * Stručni izvori na koje se tekstovi pozivaju. Svaki DOI je proveren u Crossref-u.
 * U temi se navode ključevi (frontmatter `sources`), a stranica ih ispisuje u odeljku „Izvori“.
 * Ne dodaj izvor koji nisi otvorio i proverio; Jelena potvrđuje listu pre objave.
 */
export interface Source { cite: string; url?: string; note: string }

export const izvori = {
  'david-2018': {
    cite: 'David, D., Cotet, C., Matu, S., Mogoase, C., & Stefan, S. (2018). 50 years of rational-emotive and cognitive-behavioral therapy: A systematic review and meta-analysis. Journal of Clinical Psychology, 74(3), 304–318.',
    url: 'https://doi.org/10.1002/jclp.22514',
    note: 'Meta-analiza 50 godina istraživanja o efikasnosti REBT-a.',
  },
  'fernandez-2021': {
    cite: 'Fernandez, E., Woldgabreal, Y., Day, A., Pham, T., Gleich, B., & Aboujaoude, E. (2021). Live psychotherapy by video versus in-person: A meta-analysis of efficacy and its relationship to types and targets of treatment. Clinical Psychology & Psychotherapy, 28(6), 1535–1549.',
    url: 'https://doi.org/10.1002/cpp.2594',
    note: 'Meta-analiza koja poredi psihoterapiju preko video poziva sa radom uživo.',
  },
  'carpenter-2018': {
    cite: 'Carpenter, J. K., Andrews, L. A., Witcraft, S. M., Powers, M. B., Smits, J. A. J., & Hofmann, S. G. (2018). Cognitive behavioral therapy for anxiety and related disorders: A meta-analysis of randomized placebo-controlled trials. Depression and Anxiety, 35(6), 502–514.',
    url: 'https://doi.org/10.1002/da.22728',
    note: 'Meta-analiza efikasnosti kognitivno-bihejvioralne terapije kod anksioznosti.',
  },
  'egan-2011': {
    cite: 'Egan, S. J., Wade, T. D., & Shafran, R. (2011). Perfectionism as a transdiagnostic process: A clinical review. Clinical Psychology Review, 31(2), 203–212.',
    url: 'https://doi.org/10.1016/j.cpr.2010.04.009',
    note: 'Pregled istraživanja o perfekcionizmu kao procesu koji se javlja u različitim teškoćama.',
  },
  'steel-2007': {
    cite: 'Steel, P. (2007). The nature of procrastination: A meta-analytic and theoretical review of quintessential self-regulatory failure. Psychological Bulletin, 133(1), 65–94.',
    url: 'https://doi.org/10.1037/0033-2909.133.1.65',
    note: 'Meta-analiza o tome šta stoji iza odlaganja.',
  },
  'ellis-1962': {
    cite: 'Ellis, A. (1962). Reason and emotion in psychotherapy. Lyle Stuart.',
    note: 'Knjiga u kojoj je Albert Elis izložio osnove pristupa iz kog je nastao REBT.',
  },
  'ellis-dryden-1997': {
    cite: 'Ellis, A., & Dryden, W. (1997). The practice of rational emotive behavior therapy (2nd ed.). Springer Publishing Company.',
    note: 'Pregled teorije i prakse REBT-a, uključujući ideju dugoročnog hedonizma.',
  },
} satisfies Record<string, Source>;

export type SourceId = keyof typeof izvori;

/**
 * Prazna lista kad tema nema izvore. `undefined` se prihvata zato što Astro
 * u kešu (.astro/data-store.json) zna da zadrži unose parsirane pre nego što
 * je polje `sources` dodato u šemu, pa dev server ne bi smeo da padne na tome.
 */
export function getSources(ids: readonly string[] | undefined = []): Source[] {
  return (ids ?? []).map((id) => {
    const s = (izvori as Record<string, Source>)[id];
    if (!s) throw new Error(`Nepoznat izvor „${id}“. Dodaj ga u src/data/izvori.ts.`);
    return s;
  });
}
