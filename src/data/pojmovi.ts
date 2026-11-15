/**
 * REBT pojmovi na srpskom: definicija u jednoj rečenici i primer iz života.
 * Jasna definicija na srpskom je ono što pretraživači i AI asistenti rado citiraju.
 * Sidro (id) se ne menja posle objave, jer se na njega linkuje iz tekstova.
 */
export interface Term { id: string; term: string; aka?: string; def: string; example: string }

export const pojmovi: Term[] = [
  {
    id: 'abc-model',
    term: 'ABC model',
    def: 'ABC model kaže da emocije i ponašanje (C) ne izaziva sam događaj (A), nego uverenja koja imamo o tom događaju (B).',
    example: 'Prijatelj ne odgovori na poruku (A). Ako misliš „sigurno sam ga nečim uvredio“, osetiš anksioznost (C). Ako misliš „verovatno je zauzet“, ostaneš miran. Isti A, drugačiji B, drugačiji C.',
  },
  {
    id: 'zahtevi-i-preferencije',
    term: 'Zahtevi i preferencije',
    aka: 'rigidna i fleksibilna uverenja',
    def: 'Zahtev je kruto uverenje sa „moram“, „ne smem“ i „treba“, a preferencija je ista želja bez apsolutnog uslova: „voleo bih, ali ne mora“.',
    example: '„Moram da dobijem ovaj posao“ je zahtev. „Jako želim ovaj posao, ali ako ga ne dobijem, biće mi žao, a ne kraj sveta“ je preferencija.',
  },
  {
    id: 'katastrofiziranje',
    term: 'Katastrofiziranje',
    aka: 'užasavanje',
    def: 'Katastrofiziranje je procena da je nešto loše ujedno i najgore moguće, „užasno“ i „strašno“, iako je zapravo neprijatno i podnošljivo.',
    example: '„Ako se zbunim na prezentaciji, to će biti katastrofa.“ Realnija verzija: „Bilo bi neprijatno, ali preživela bih i to.“',
  },
  {
    id: 'niska-tolerancija-frustracije',
    term: 'Niska tolerancija frustracije',
    def: 'Niska tolerancija frustracije je uverenje da ne možeš da podneseš neprijatnost, dosadu ili napor, pa ih izbegavaš čak i kad ti to šteti.',
    example: '„Ne mogu da podnesem da sedim nad ovim zadatkom.“ U stvari možeš, samo ti se ne sviđa. Ta razlika je često ključ za odlaganje.',
  },
  {
    id: 'bezuslovno-samoprihvatanje',
    term: 'Bezuslovno samoprihvatanje',
    def: 'Bezuslovno samoprihvatanje znači da prihvataš sebe kao vrednu osobu bez obzira na uspehe, greške i tuđe mišljenje, a postupke ocenjuješ odvojeno od sebe.',
    example: 'Umesto „pogrešila sam, znači ne valjam“, misao je „ovo nisam dobro uradila, i dalje vredim isto i mogu da popravim“.',
  },
  {
    id: 'zdrave-i-nezdrave-negativne-emocije',
    term: 'Zdrave i nezdrave negativne emocije',
    def: 'REBT razlikuje zdrave negativne emocije, koje odgovaraju situaciji i pomažu da reaguješ, od nezdravih, koje su preterane i blokiraju te, kao što su zabrinutost naspram anksioznosti ili tuga naspram depresivnosti.',
    example: 'Pred ispit je zdravo osećati zabrinutost, pa učiti. Anksioznost koja te tera da ne otvoriš knjigu je nezdrava verzija iste situacije.',
  },
  {
    id: 'uznemirenost-zbog-uznemirenosti',
    term: 'Uznemirenost zbog uznemirenosti',
    aka: 'sekundarni problem',
    def: 'Uznemirenost zbog uznemirenosti je drugi talas emocije koji nastaje kad se osudiš zbog prve emocije, na primer kad se anksiozno pitaš zašto si anksiozan.',
    example: 'Odložiš zadatak, pa se ljutiš na sebe što odlažeš, pa ti je od toga još teže da počneš. Na terapiji se često prvo radi na ovom drugom talasu.',
  },
  {
    id: 'disputiranje',
    term: 'Disputiranje',
    def: 'Disputiranje je proveravanje uverenja kroz tri pitanja: da li je tačno, da li je logično i da li mi pomaže.',
    example: '„Moram da budem savršen.“ Gde piše da moraš? Da li iz toga što želiš sledi da moraš? Da li ti ova misao pomaže da radiš bolje ili te koči?',
  },
  {
    id: 'globalno-ocenjivanje-sebe',
    term: 'Globalno ocenjivanje sebe',
    def: 'Globalno ocenjivanje sebe je kad na osnovu jednog postupka ili osobine daš ocenu celoj osobi, sebi ili drugome.',
    example: 'Zaboraviš rođendan prijatelja i zaključiš „ja sam loš prijatelj“. Tačnije je: „Zaboravio sam rođendan, i to mi je žao.“',
  },
  {
    id: 'dugorocni-hedonizam',
    term: 'Dugoročni hedonizam',
    aka: 'long-range hedonism',
    def: 'Dugoročni hedonizam je ideja Alberta Elisa, osnivača REBT-a, da je zdravo tražiti zadovoljstvo, ali tako da današnje uživanje ne krade od sutrašnjeg.',
    example: 'Izlazak sa prijateljima je u redu. Izlazak svake večeri pred ispit koji ti je važan nije. Odatle i ime ove prakse: responsible hedonist.',
  },
];
