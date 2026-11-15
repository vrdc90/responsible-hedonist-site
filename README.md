# Responsible Hedonist · Jelena Marjanović

Sajt za REBT terapiju na srpskom, uživo i online. Astro 7, statički HTML. Jedini JavaScript je dugme za kopiranje emaila i broja na `/zakazivanje/` (inline, manje od 1 KB). Sajt ima samo svetlu temu.

```bash
npm install
npm run dev       # http://localhost:4321, sa trakom nepotvrđenih podataka
npm run build     # astro check + build u dist/
npm run preview   # pregled build-a
```

## Gde je šta

| Šta | Gde |
| --- | --- |
| Činjenice o praksi (cena, titula, email, telefon) | `src/data/practice.ts` |
| Teme (anksioznost, perfekcionizam…) | `src/content/teme/*.md` |
| Kratki tekstovi „Pitanja“ | `src/content/pitanja/*.md` |
| REBT pojmovi | `src/data/pojmovi.ts` |
| Boje, razmaci, fontovi | `src/styles/tokens.css`, `astro.config.ts` |
| Komponente | `src/components/` |
| Bezbednosna zaglavlja i keš | `public/_headers` (heševe skripti upisuje build) |
| Portret | `src/assets/portrait.jpg` (4:5, luk), `portrait-face.jpg` (avatar), `public/jelena.jpg` (JSON-LD); originali u `originals/` |
| Stručni izvori | `src/data/izvori.ts`; tema ih navodi u polju `sources` |
| Kontakt (email, telefon) | `person.email` i `person.phone` u `src/data/practice.ts` |
| Preusmerenja (301) | `public/_redirects` |
| Šta je gotovo, a šta čeka | [LANSIRANJE.md](LANSIRANJE.md) |

## Stranice

`/` · `/teme/` · `/teme/anksioznost/` · `/teme/perfekcionizam/` · `/teme/odlaganje/` · `/teme/svakodnevica/` · `/kako-radim/` · `/o-meni/` · `/zakazivanje/` · `/terapija-na-srpskom-u-inostranstvu/` · `/pitanja/` · `/rebt-pojmovi/` · `/uslovi/` · `/privatnost/` · `/404`
Plus `sitemap-index.xml`, `robots.txt` i `pitanja/rss.xml`.
Teme `ljutnja` i `samoprihvatanje` su nacrti (`draft: true`) i objavljuju se kad ih Jelena odobri.

## SEO i AI vidljivost (šta je urađeno)

- Svaka tema je posebna stranica sa frazom koju ljudi kucaju u title-u i odgovorom u prvom pasusu, jer AI pretraga bira uske stranice koje odgovaraju na pod-pitanje.
- Ključne činjenice (uživo i online, srpski, trajanje, kredencijali) su vidljiv tekst, ne samo JSON-LD. Uslovi (format, trajanje, plaćanje, otkazivanje) su u tabeli na `/kako-radim/#uslovi`; cena tamo piše „na upit“ dok se ne upiše u `practice.price`.
- Grad i adresa ordinacije (`practice.location`) se, kad se upišu, sami dodaju u tekstove („uživo u Beogradu i online“) i u JSON-LD.
- JSON-LD: `Person`, `Organization` (brend), `WebSite`, `Service`, `FAQPage`, `BreadcrumbList`, `BlogPosting`, `ProfilePage`, `DefinedTermSet` za REBT pojmove.
- Stručne tvrdnje imaju odeljak „Izvori“ sa DOI linkovima.
- `robots.txt` pušta sve, uključujući AI pretraživače i botove za trening.
- Datum izmene je vidljiv na temama i tekstovima; menja se samo uz stvarnu izmenu (`updatedDate`).
- Nema kolačića, piksela ni banera. Analitika: Cloudflare Web Analytics (bez kolačića), uključuje se u Cloudflare-u.
- Lighthouse mobile na lokalnom build-u: 94–100 performanse, 100 pristupačnost, 100 best practices, 100 SEO; LCP oko 1,2–1,7 s, CLS 0.

## Fajl za pregled

```bash
npm run review
```

Pravi `pregled/responsible-hedonist-pregled.html`: ceo sajt u jednom fajlu (oko 0,5 MB), sa nacrtima tema, uputstvom za pregled i okvirom „Ovako izgleda u Google pretrazi“ ispod svake stranice. Slike i fontovi su ugrađeni, linkovi između stranica rade bez interneta i bez skripti. Fajl je samo za slanje na pregled (ima noindex) i nije u git-u. Pravi build u `dist/` ostaje netaknut.

## Kontakt

Na `/zakazivanje/` su odmah ispod naslova dve kartice: email i telefon, obe sa dugmetom za kopiranje. Ispod broja su linkovi za poziv, SMS, Viber, WhatsApp i Instagram. Nema forme ni kalendara.

- **Telefon:** upiši `phone: { e164: '+381641234567', display: '+381 64 123 4567' }` u `person` u `src/data/practice.ts`. Iz toga se prave svi linkovi (`tel:`, `sms:`, `viber://`, `wa.me`), a broj se pojavljuje i u podnožju, u tamnom baneru i u JSON-LD-u. Dok je `null`, u `npm run dev` stoji primer broja, a na objavljenom sajtu kartica za telefon se ne vidi.
- **Dugme za kopiranje** radi preko Clipboard API-ja, sa rezervom za browsere koji ga ne dozvoljavaju; ako ni to ne prođe, označi tekst za ručno kopiranje. Bez JavaScripta ostaju obični linkovi.

## Pre objave

Puna lista sa statusima je u [LANSIRANJE.md](LANSIRANJE.md). Ukratko:

1. Popuni sve iz `pending` liste u `src/data/practice.ts` (vidi se i u `npm run dev`).
2. Jelena prepravlja sve tekstove u svom glasu (teme, O meni, privatnost) i potpisuje ih.
3. Logo (`public/logo.png`) i portret (`src/assets/portrait.jpg`, `portrait-face.jpg`, `public/jelena.jpg`) su iz originala u `originals/`. Ako stigne logo u SVG-u, može da zameni PNG.
4. Portret u `src/assets/portrait.jpg`, pa `hasPortrait: true`.
5. Politiku privatnosti proverava pravnik ili knjigovođa.
6. Deploy: Cloudflare Pages iz GitHub-a (build `npm run build`, izlaz `dist`). Glavni domen je `jelenamarjanovic.net` (bez www), `responsible-hedonist.com` se 301 preusmerava na njega. HTTPS, preusmerenje www → bez www kroz Cloudflare Redirect Rules.
7. Search Console i Bing Webmaster Tools: dodaj sajt i prijavi `sitemap-index.xml`. Na Cloudflare-u uključi Crawler Hints (IndexNow) i proveri da AI botovi nisu blokirani.
8. Provera: `curl -A "GPTBot" https://jelenamarjanovic.net/teme/anksioznost/ | grep anksioznost` vraća tekst.
