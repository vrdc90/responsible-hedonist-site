# responsible hedonist: sajt

Statički sajt za online REBT praksu (Jelena Marjanović, psiholog). Jedini cilj sajta: zakazan prvi razgovor.
Izvori odluka: dokument „responsible hedonist: plan sajta“ (struktura, SEO/GEO, sadržaj) i dizajn sistem „Responsible Hedonist“ v7 (izgled). Kad se razilaze, za izgled važi dizajn sistem.

## Tehnika
- Astro 7, `output: 'static'`, bez UI frameworka i bez Tailwinda. Jedini JavaScript su dve male inline skripte za temu (`Base.astro` u `<head>`, `Header.astro`); sadržaj nikad ne zavisi od JS-a.
- Tema: bez izbora prati uređaj; dugme postavlja `data-theme` na `<html>` i pamti izbor u `localStorage` (`rh-theme`). Tamne vrednosti tokena stoje dvaput u `tokens.css` i menjaju se na oba mesta. Razlike koje nisu boje idu kroz tokene (`--hl-fill`, `--dark-edge`, `--logo-tile`, `--theme-sun`, `--theme-moon`).
- CSP je u `public/_headers`; heševe inline skripti upisuje build (`src/integrations/csp-hashes.ts`), nikad ručno.
- CSS: `src/styles/tokens.css` (tokeni iz dizajn sistema) i `src/styles/global.css` (klase sa prefiksom `rh-`). Ceo CSS ide inline.
- Fontovi preko Astro Fonts API (Fontsource, self-hosted): Plus Jakarta Sans za skoro sve, Instrument Serif samo za hero naslov i Statement.
- Sadržaj: `src/content/teme/*.md` i `src/content/pitanja/*.md`, šeme u `src/content.config.ts`; build puca ako polje fali ili je opis duži od 160 znakova.
- `draft: true` se ne objavljuje (u `npm run dev` se vidi radi pregleda).
- REBT pojmovi su u `src/data/pojmovi.ts`; sidra (`id`) se ne menjaju posle objave.
- Stručni izvori su u `src/data/izvori.ts`. Ne dodaj izvor koji nije otvoren i proveren (DOI kroz Crossref); tema ih navodi u polju `sources`.
- Kalendar (`practice.bookingUrl`) i kontakt forma (`practice.form`) se uključuju samo kroz `practice.ts`. Forma je običan POST bez JavaScripta i vraća na `/hvala/`.
- Status svake stavke za objavu je u `LANSIRANJE.md`; ažuriraj ga kad se nešto završi.
- Nikad `client:only` ni sadržaj koji se crta u browseru: AI crawleri ne izvršavaju JavaScript.

## Činjenice
- Sve činjenice (ime, titula, edukacija, cena, trajanje, email, link za zakazivanje, krizni brojevi) žive samo u `src/data/practice.ts`. Nikad ih ne izmišljaj i ne upisuj direktno u stranice.
- Nepotvrđeno stoji u `pending` listi u istom fajlu; u dev režimu se vidi kao traka na dnu stranice.

## Tekst
- Ekavica, obraćanje sa „ti“, rodno neutralno gde god može.
- Rečenični padež u naslovima; VELIKA SLOVA samo u eyebrow natpisima (CSS). Srpski navodnici „ovako“. Bez em dash-a.
- Bez dijagnoza, obećanja ishoda i utisaka klijenata. Stručni pojam se objašnjava u istoj rečenici.
- Primarni termin je REBT; uz njega se pominje kognitivno-bihejvioralna terapija (KBT), jer to ljudi češće kucaju. Jelenina edukacija se zove RE&CBT.
- Svaki tekst je nacrt dok ga Jelena ne prepravi u svom glasu.

## Dizajn
- Okvir je neutralan (paper, stone, ink); boja dolazi kroz zvezdice (`Asterisk`, pet boja loga), limeta-marker (`.rh-hl`, najviše 2 reči po stranici) i znak ≠.
- Potpisni element: reframe u heroju (crveno precrtan „moram“, limeta „želim“). Isti par (`.rh-pair`) samo jednom po temi.
- Jedino tamno mesto je `BookingBanner`. Bez senki, hamburger menija, pop-upova, slajdera i animacija pri skrolovanju. Poštuj `prefers-reduced-motion`.
- Traka zaglavlja (logo, tema, „Zakaži“) je lepljiva i na telefonu; meni je red ispod nje i odlazi sa skrolom.
- Bez GA4, Clarity-ja i piksela: sajt o mentalnom zdravlju ne šalje podatke o posetama oglašivačima. Analitika je Cloudflare Web Analytics.

## Definicija gotovog
- `npm run build` (uključuje `astro check`) prolazi bez grešaka i upozorenja.
- Svaka stranica: jedinstven title i description, jedan H1, canonical, OG slika, JSON-LD.
- `curl` svake stranice vraća glavni tekst bez JavaScripta.
- Lighthouse mobile ≥ 95 u sve četiri kategorije; `npx html-validate` bez grešaka.
- Krizni brojevi u podnožju svake stranice.
- Provereno na širini 360 px i na desktopu, u svetloj i tamnoj temi.
