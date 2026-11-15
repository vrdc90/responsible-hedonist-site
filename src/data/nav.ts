export const mainNav = [
  { href: '/teme/', label: 'Teme' },
  { href: '/kako-radim/', label: 'Kako radim' },
  { href: '/o-meni/', label: 'O meni' },
  { href: '/zakazivanje/', label: 'Cena i zakazivanje' },
  { href: '/pitanja/', label: 'Pitanja' },
] as const;

export const footerNav = [
  ...mainNav,
  { href: '/terapija-na-srpskom-u-inostranstvu/', label: 'Iz inostranstva' },
  { href: '/rebt-pojmovi/', label: 'REBT pojmovi' },
  { href: '/uslovi/', label: 'Uslovi saradnje' },
  { href: '/privatnost/', label: 'Privatnost' },
] as const;
