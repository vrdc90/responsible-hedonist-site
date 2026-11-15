# Responsible Hedonist · Jelena Marjanović

Sajt za online REBT terapiju na srpskom. Astro 7, statički HTML. Jedini JavaScript je prekidač za svetlu i tamnu temu (oko 1 KB, inline).

```bash
npm install
npm run dev       # http://localhost:4321, sa trakom nepotvrđenih podataka
npm run build     # astro check + build u dist/
npm run preview   # pregled build-a
```

## Gde je šta

| Šta | Gde |
| --- | --- |
| Činjenice o praksi (cena, titula, email, kalendar) | `src/data/practice.ts` |
| Teme (anksioznost, perfekcionizam…) | `src/content/teme/*.md` |
| Kratki tekstovi „Pitanja“ | `src/content/pitanja/*.md` |
| REBT pojmovi | `src/data/pojmovi.ts` |
| Boje, razmaci, fontovi | `src/styles/tokens.css`, `astro.config.ts` |
| Komponente | `src/components/` |
| Bezbednosna zaglavlja i keš | `public/_headers` (heševe skripti upisuje build) |
| Svetla i tamna tema | `src/styles/tokens.css`, dugme u `src/components/Header.astro` |
| Portret (4:5) | dodaj `src/assets/portrait.jpg`, sajt ga sam uzima |
| Stručni izvori | `src/data/izvori.ts`; tema ih navodi u polju `sources` |
| Kalendar i kontakt forma | `practice.bookingUrl` i `practice.form` u `src/data/practice.ts` |
| Preusmerenja (301) | `public/_redirects` |
| Šta je gotovo, a šta čeka | [LANSIRANJE.md](LANSIRANJE.md) |

## Stranice

`/` · `/teme/` · `/teme/anksioznost/` · `/teme/perfekcionizam/` · `/teme/odlaganje/` · `/kako-radim/` · `/o-meni/` · `/zakazivanje/` · `/terapija-na-srpskom-u-inostranstvu/` · `/pitanja/` · `/rebt-pojmovi/` · `/uslovi/` · `/privatnost/` · `/hvala/` · `/404`
Plus `sitemap-index.xml`, `robots.txt` i `pitanja/rss.xml`.
Teme `ljutnja` i `samoprihvatanje` su nacrti (`draft: true`) i objavljuju se kad ih Jelena odobri.

## SEO i AI vidljivost (šta je urađeno)

- Svaka tema je posebna stranica sa frazom koju ljudi kucaju u title-u i odgovorom u prvom pasusu, jer AI pretraga bira uske stranice koje odgovaraju na pod-pitanje.
- Ključne činjenice (online, srpski, trajanje, cena, kredencijali) su vidljiv tekst, ne samo JSON-LD.
- JSON-LD: `Person`, `Organization` (brend), `WebSite`, `Service`, `FAQPage`, `BreadcrumbList`, `BlogPosting`, `ProfilePage`, `DefinedTermSet` za REBT pojmove.
- Stručne tvrdnje imaju odeljak „Izvori“ sa DOI linkovima.
- `robots.txt` pušta sve, uključujući AI pretraživače i botove za trening.
- Datum izmene je vidljiv na temama i tekstovima; menja se samo uz stvarnu izmenu (`updatedDate`).
- Nema kolačića, piksela ni banera. Analitika: Cloudflare Web Analytics (bez kolačića), uključuje se u Cloudflare-u.
- Lighthouse mobile na lokalnom build-u: 94–100 performanse, 100 pristupačnost, 100 best practices, 100 SEO; LCP oko 1,2–1,7 s, CLS 0.

## Kontakt forma i kalendar

Oba se uključuju samo upisom u `src/data/practice.ts`:

- **Kalendar:** `bookingUrl: 'https://cal.com/ime/prvi-razgovor'`. Ugrađuje se na `/zakazivanje/`. Ako je servis drugi, dodaj njegov domen u `frame-src` u `public/_headers`.
- **Forma:** `form.endpoint` je adresa servisa koji poruku prosleđuje na email (Web3Forms, Formspree, Netlify Forms). U `form.hidden` idu skrivena polja koja servis traži, na primer ključ i adresa za povratak na `https://domen/hvala/`. `form.honeypot` je ime polja-zamke koje taj servis prepoznaje. Build sam dodaje adresu servisa u CSP.
- Dok `form.endpoint` nije upisan, forma se vidi samo u `npm run dev`, a na sajtu stoje email i poruka na Instagramu.

## Pre objave

Puna lista sa statusima je u [LANSIRANJE.md](LANSIRANJE.md). Ukratko:

1. Popuni sve iz `pending` liste u `src/data/practice.ts` (vidi se i u `npm run dev`).
2. Jelena prepravlja sve tekstove u svom glasu (teme, O meni, privatnost) i potpisuje ih.
3. Originalni logo (SVG) zameni `public/logo.svg`; trenutni je privremena rekonstrukcija.
4. Portret u `src/assets/portrait.jpg`, pa `hasPortrait: true`.
5. Politiku privatnosti proverava pravnik ili knjigovođa.
6. Deploy: Cloudflare Pages iz GitHub-a (build `npm run build`, izlaz `dist`). Jedna kanonska verzija domena (bez www), HTTPS, preusmerenje www → bez www kroz Cloudflare Redirect Rules.
7. Search Console i Bing Webmaster Tools: dodaj sajt i prijavi `sitemap-index.xml`. Na Cloudflare-u uključi Crawler Hints (IndexNow) i proveri da AI botovi nisu blokirani.
8. Provera: `curl -A "GPTBot" https://domen/teme/anksioznost/ | grep anksioznost` vraća tekst.
