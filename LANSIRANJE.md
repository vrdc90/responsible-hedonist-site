# Lista za lansiranje

Pregled urađen 15. novembra 2026. Svaka stavka ima jedan od četiri statusa:

- **Gotovo**: urađeno na sajtu i provereno.
- **Čeka podatke**: sajt je spreman, fali podatak ili odluka (vidi `pending` u `src/data/practice.ts`).
- **Posle objave**: radi se van koda, kad sajt bude na domenu.
- **Ne radimo**: namerno izostavljeno, sa razlogom.

## Šta je ostalo pre objave

1. **Preusmerenje** `responsible-hedonist.com` → `jelenamarjanovic.net` (301, kod registra ili u Cloudflare-u).
2. **Potvrda:** formulacija statusa u edukaciji (`pending` u `practice.ts`).
3. **Tekstovi** su nacrti; Jelena ih prepravlja u svom glasu.

## 1. Tehnički SEO

| Stavka | Status | Napomena |
| --- | --- | --- |
| SSG | Gotovo | Astro, statički HTML; ceo tekst je u HTML-u i bez JavaScripta |
| Sitemap.xml | Gotovo | `sitemap-index.xml`; `lastmod` samo za teme i tekstove, iz stvarnog datuma izmene |
| Robots.txt | Gotovo | Pušta sve i pokazuje na sitemap |
| Canonical | Gotovo | Na svakoj stranici, sa kosom crtom na kraju |
| Title i description | Gotovo | 16 stranica, svi jedinstveni; build puca ako opis teme pređe 160 znakova |
| Open Graph | Gotovo | Naslov, opis, slika 1200×630 sa portretom i logom (`og.jpg`), `og:locale`; jedna slika za ceo sajt |
| HTTPS | Posle objave | Cloudflare ga daje sam; HSTS je već u `public/_headers` |
| Mobile-first | Gotovo | Provereno na 360 i 375 px; dugme „Zakaži“ ostaje na vrhu dok se skroluje |
| Core Web Vitals | Gotovo | Lokalno: LCP 1,2–1,7 s, CLS 0; ponovi merenje na pravom domenu (PageSpeed Insights) |
| Slike WebP/AVIF | Gotovo | Portret ide kroz `astro:assets` čim se doda |
| 301 i 404 | Gotovo | `public/_redirects` (npr. `/kontakt` → `/zakazivanje/`), stranica 404 u tonu sajta |
| www → bez www | Posle objave | Cloudflare Redirect Rules; jedna kanonska verzija domena |
| Hreflang | Ne radimo | Sajt je na jednom jeziku; ima smisla tek uz englesku verziju |

## 2. SEO

| Stavka | Status | Napomena |
| --- | --- | --- |
| Keyword research | Posle objave | Ciljne grupe upita su u planu sajta; obim pretrage treba proveriti u Google Keyword Planneru, a posle 4–6 nedelja u Search Console |
| Search intent | Gotovo | Svaka tema počinje odgovorom; opšta tema „Svakodnevica“ za upite tipa stres, odnosi, odluke; posebna stranica za ljude iz inostranstva; „Kako radim“ pokriva i upite za KBT |
| Lokalne ključne reči | Gotovo | „Psiholog u Beogradu i online“ u naslovu početne; Beograd i Palilula u tekstu, podnožju i JSON-LD-u |
| Title, H1, H2 | Gotovo | Jedan H1 po stranici, bez preskakanja nivoa |
| Interno povezivanje | Gotovo | 237 internih linkova, nijedan pokidan; teme ↔ pojmovi ↔ tekstovi ↔ zakazivanje |
| Alt tekstovi | Gotovo | Dekorativne slike imaju prazan alt, portret ima opisni |
| URL-ovi | Gotovo | Kratki, malim slovima, bez dijakritika |
| Search Console i Bing Webmaster Tools | Posle objave | Dodaj domen i prijavi `sitemap-index.xml` |
| Redovno objavljivanje | Posle objave | Dva teksta mesečno u „Pitanja“; šablon i prvi tekst postoje |
| Osvežavanje sadržaja | Gotovo | Polje `updatedDate`; datum se menja samo uz stvarnu izmenu |

## 3. GEO / AEO

| Stavka | Status | Napomena |
| --- | --- | --- |
| OAI-SearchBot i ostali AI crawleri | Gotovo | `robots.txt` pušta sve. **Na Cloudflare-u proveri „Block AI bots“ i „AI Crawl Control“: novi domeni ih često blokiraju podrazumevano** |
| Google i Bing crawleri | Gotovo | |
| Direktni odgovori | Gotovo | Odgovor u prvom pasusu svake teme i teksta; rečnik REBT pojmova sa definicijom u jednoj rečenici |
| JSON-LD | Gotovo | Validan na svim stranicama, bez duplih `@id` |
| Person | Gotovo | Sa `sameAs`, `alumniOf`, `hasOccupation`; dopunjava se iz `person.profiles` |
| Article | Gotovo | `BlogPosting` za tekstove; teme imaju autora, datume i `citation` |
| Organization | Gotovo | Brend „Responsible Hedonist“ vezan za Jelenu (`founder`) |
| FAQ | Gotovo | Vidljiva pitanja i `FAQPage` na 7 stranica |
| Kvalifikacije | Gotovo | Master psiholog (2021), RE&CBT edukacija kod UKBTS, na O meni i u JSON-LD-u |
| Stručni izvori | Gotovo | Odeljak „Izvori“ na temama, Kako radim i O meni; DOI brojevi provereni u Crossref-u. Jelena potvrđuje listu |
| Konzistentni podaci na internetu | Posle objave | Isto ime, titula, opis i link na Instagramu, u direktorijumima i na sajtu udruženja |
| llms.txt | Ne radimo | Nema dokaza da pomaže; može se dodati za pet minuta ako se to promeni |

## 4. E-E-A-T i poverenje

| Stavka | Status | Napomena |
| --- | --- | --- |
| Kvalifikacije, obrazovanje, sertifikati | Gotovo | Na početnoj, O meni i u potpisu svakog teksta; status u edukaciji čeka potvrdu formulacije |
| Članstva | Gotovo | Edukacija kod Udruženja za kognitivne i bihejvioralne terapije Srbije, sa linkom na ukbt.org.rs |
| Terapijski pravac | Gotovo | REBT objašnjen na početnoj, Kako radim i u rečniku |
| Biografija | Čeka podatke | O meni postoji, sa portretom; fale 3–4 rečenice u Jeleninom glasu |
| Reference | Gotovo | Vidi odeljak 3 |
| Privacy Policy | Gotovo | `/privatnost/` „Poverljivost i privatnost“: kratko, samo ono što zanima osobu koja se javlja; nacrt za pravnika |
| Cookie Policy | Ne radimo | Sajt nema kolačiće, pa ni baner |
| Terms of Service | Gotovo | `/uslovi/`, nacrt: zakazivanje, plaćanje, otkazivanje, tehnički uslovi, šta terapija nije |
| HTTPS i bezbedan kontakt | Posle objave | Strog CSP je spreman; sajt nema formu i ne prikuplja podatke, kontakt ide direktno emailom ili telefonom |
| Poverljivost | Gotovo | Na početnoj (FAQ) i na `/privatnost/` (sa granicama); uslovi i zakazivanje linkuju tamo |

## 5. Lokalni SEO

Jelena radi i uživo, pa lokalni SEO sada ima smisla. **Google Business Profile je najjača lokalna poluga** i otvara se čim postoji adresa ordinacije: daje mapu, telefon i pojavljivanje u pretrazi „psiholog u blizini“. Adresa na sajtu, u profilu i u direktorijumima mora biti napisana isto.

| Stavka | Status | Napomena |
| --- | --- | --- |
| Google Business Profile, Bing Places, Maps | Posle objave | Na sajtu stoji samo „Beograd, Palilula“. Za verifikaciju profila Google traži ulicu i broj, ali adresa posle može da se sakrije |
| NAP podaci | Gotovo | Ime, telefon (+381 61 680 1011), email (responsiblehedonistpsychology@gmail.com) i „Beograd, Palilula“ isto svuda na sajtu; isto upisati u profil i direktorijume |
| Direktorijumi terapeuta | Posle objave | TherapyRoute, It's Complicated, Selfnest; u pretrazi za „REBT online na srpskom“ baš oni drže vrh |
| Lokalni backlinkovi | Posle objave | Sajt edukacije i udruženja, fakultet, studentske organizacije |
| Recenzije | Ne radimo | Etika psihologa ne dozvoljava traženje utisaka od klijenata |

## 6. Performanse i analitika

| Stavka | Status | Napomena |
| --- | --- | --- |
| Google Analytics 4 | Ne radimo | Traži kolačiće i baner, a podatke o posetama stranicama o mentalnom zdravlju šalje Google-u |
| Microsoft Clarity | Ne radimo | Snima sesije posetilaca; neprimereno za sajt terapeuta |
| Analitika bez kolačića | Posle objave | Cloudflare Web Analytics, jedan klik; CSP je već dozvoljava |
| Search Console | Posle objave | |
| PageSpeed Insights | Posle objave | Lokalni Lighthouse: 94–100 performanse, 100 pristupačnost, best practices i SEO |
| Praćenje konverzija | Posle objave | Sva dugmad vode na `/zakazivanje/`, pa analitika broji posete te stranice. Pošto nema forme, „Odakle znaš za mene?“ Jelena pita na prvom razgovoru i beleži |
| Organske ključne reči | Posle objave | Search Console, mesečno |
| AI referral saobraćaj | Posle objave | Cloudflare pokazuje izvore (chatgpt.com, perplexity.ai); u formi postoji opcija „AI asistent“ |
| GDPR/cookie consent | Ne radimo | Nema kolačića ni praćenja, pa pristanak nije potreban |

## 7. Autoritet i distribucija

| Stavka | Status | Napomena |
| --- | --- | --- |
| Backlinkovi, gostujući tekstovi | Posle objave | Plan sajta, odeljak „Van sajta“ |
| Platforme terapeuta | Posle objave | Vidi odeljak 5 |
| LinkedIn i drugi profili | Ne radimo | Odluka: za sada samo Instagram |
| Povezivanje profila sa sajtom | Posle objave | Link u Instagram biju na sajt, postovi na konkretan tekst |
| Redovan edukativni sadržaj | Posle objave | „Pitanja“ iz Instagram serija |
| Dosledno ime i kvalifikacije | Gotovo | Na sajtu sve dolazi iz jednog fajla (`practice.ts`) |

## 8. Konverzija

| Stavka | Status | Napomena |
| --- | --- | --- |
| Jasni CTA | Gotovo | Jedno glavno dugme po ekranu; „Zakaži“ je uvek u zaglavlju, i na telefonu |
| Kontakt forma | Ne radimo | Odluka: kontakt ide preko emaila i telefona, bez forme |
| Online zakazivanje | Ne radimo | Odluka: bez kalendara; termin se dogovara porukom ili pozivom |
| Kontakt | Gotovo | Email i telefon sa dugmetom za kopiranje; poziv, SMS, Viber, WhatsApp i Instagram jednim dodirom |
| Vidljivi kontakt | Gotovo | Email u podnožju i baneru; telefon se dodaje na ista mesta čim se upiše |
| Cena i trajanje | Gotovo | Trajanje piše svuda. Cena je na upit (odluka): tako piše samo u tabeli uslova na `/kako-radim/`; kad se upiše u `practice.price`, vidi se tamo i na `/uslovi/` |
| Proces prve seanse | Gotovo | Tri koraka na početnoj i odeljak „Šta te čeka kad se prvi put čujemo“ |
| Mobile-friendly kontakt | Gotovo | Broj se poziva dodirom, Viber i WhatsApp se otvaraju direktno, dugmad su visoka 44 px |
| Testiranje CTA formulacija | Posle objave | Tek kad bude dovoljno poseta; pre toga nema šta da se meri |

## Prvih sedam dana posle objave

1. Cloudflare: HTTPS, preusmerenje www, Web Analytics, Crawler Hints, provera da AI botovi nisu blokirani.
2. Provera sa terminala: `curl -A "OAI-SearchBot" https://domen/teme/anksioznost/ | grep -c anksioznost` vraća broj veći od nule.
3. Search Console i Bing Webmaster Tools, sitemap.
4. Instagram: link u biju, post o sajtu, highlight „zakazivanje“.
5. Link poslat edukaciji i udruženju; besplatni listinzi u direktorijumima sa istim opisom.
6. Prva ručna provera 20 pitanja u ChatGPT-u, Geminiju, Perplexityju i Google AI Modeu, kao polazna tačka.
