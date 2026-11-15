/**
 * Pakuje ceo sajt iz build foldera u jedan HTML fajl za pregled.
 *
 *   npm run review
 *
 * - Svaka stranica postaje <section id="p-…">; linkovi između stranica postaju #p-…
 *   i rade bez JavaScripta (CSS :target), pa fajl radi i bez interneta.
 * - Slike i fontovi su ugrađeni (base64), stilovi su spojeni.
 * - Na početku je stranica sa uputstvom za pregled i spiskom svih stranica,
 *   a ispod svake stranice okvir „Ovako izgleda u Google pretrazi“.
 * - Fajl ima noindex i nije namenjen objavi.
 */
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.argv[2] ?? '.review-build');
const outFile = path.resolve(process.argv[3] ?? 'pregled/responsible-hedonist-pregled.html');

// ---------- 1. Stranice ----------
function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = path.join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}
const pageFiles = walk(root).filter((f) => f.endsWith('index.html'));
const urlOf = (file) => '/' + path.relative(root, file).replace(/index\.html$/, '').split(path.sep).join('/');
const slugOf = (url) => (url === '/' ? 'pocetna' : url.replace(/^\/|\/$/g, '').replace(/\//g, '-'));

const order = [
  '/', '/teme/', '/teme/anksioznost/', '/teme/perfekcionizam/', '/teme/odlaganje/', '/teme/svakodnevica/',
  '/teme/ljutnja/', '/teme/samoprihvatanje/', '/kako-radim/', '/o-meni/', '/zakazivanje/',
  '/terapija-na-srpskom-u-inostranstvu/', '/pitanja/',
];
const rank = (u) => {
  const i = order.indexOf(u);
  if (i >= 0) return i;
  if (u.startsWith('/pitanja/')) return order.length; // tekstovi odmah posle liste
  return order.length + 1;
};
const pages = pageFiles
  .map((file) => {
    const html = readFileSync(file, 'utf8');
    const url = urlOf(file);
    const pick = (re) => (html.match(re) ?? [])[1] ?? '';
    return {
      url,
      slug: slugOf(url),
      html,
      title: pick(/<title>([^<]*)<\/title>/),
      description: pick(/<meta name="description" content="([^"]*)"/),
      h1: pick(/<h1[^>]*>([\s\S]*?)<\/h1>/).replace(/<[^>]+>/g, '').trim(),
      main: pick(/<main id="sadrzaj">([\s\S]*?)<\/main>/),
      draft: html.includes('Nacrt: ova tema još nije objavljena'),
    };
  })
  .filter((p) => p.main)
  .sort((a, b) => rank(a.url) - rank(b.url) || a.url.localeCompare(b.url));
const bySlugUrl = new Map(pages.map((p) => [p.url, p.slug]));

// ---------- 2. Ugrađivanje fajlova ----------
const mime = { '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.avif': 'image/avif' };
const cache = new Map();
function dataUri(urlPath) {
  const clean = urlPath.split(/[?#]/)[0];
  if (cache.has(clean)) return cache.get(clean);
  const file = path.join(root, clean);
  if (!existsSync(file)) throw new Error(`Nema fajla za ugrađivanje: ${clean}`);
  const uri = `data:${mime[path.extname(file).toLowerCase()] ?? 'application/octet-stream'};base64,${readFileSync(file).toString('base64')}`;
  cache.set(clean, uri);
  return uri;
}

// ---------- 3. Prepravke HTML-a ----------
const keepIds = new Set(['rh-copy-status']);
function rewrite(html, slug) {
  let out = html;
  // id-jevi i reference na njih dobijaju prefiks stranice, da se ne sudaraju
  if (slug) {
    out = out.replace(/\s(id|for|aria-labelledby|aria-describedby|aria-controls)="([^"]+)"/g, (m, attr, val) =>
      ` ${attr}="${val.split(/\s+/).map((v) => (keepIds.has(v) ? v : `${slug}--${v}`)).join(' ')}"`);
  }
  // linkovi
  out = out.replace(/href="([^"]*)"/g, (m, href) => {
    if (/^(https?:|mailto:|tel:|sms:|viber:)/.test(href)) return m;
    if (href.startsWith('#')) return slug ? `href="#${slug}--${href.slice(1)}"` : m;
    if (href.startsWith('/')) {
      const [p, frag] = href.split('#');
      const target = bySlugUrl.get(p);
      if (target) return `href="#${frag ? `${target}--${frag}` : `p-${target}`}"`;
      return `href="#p-${slug ?? 'pocetna'}"`; // npr. RSS: u fajlu nema smisla
    }
    return m;
  });
  // slike: jedna veličina iz srcset-a (oko 660 px), ugrađena
  out = out.replace(/<img([^>]*)>/g, (tag, attrs) => {
    let src = (attrs.match(/\ssrc="([^"]+)"/) ?? [])[1];
    const srcset = (attrs.match(/\ssrcset="([^"]+)"/) ?? [])[1];
    if (srcset) {
      const cands = srcset.split(',').map((c) => c.trim().split(/\s+/)).map(([u, w]) => ({ u, w: parseInt(w, 10) || 0 }));
      const pick = cands.filter((c) => c.w >= 600).sort((a, b) => a.w - b.w)[0] ?? cands.at(-1);
      src = pick.u;
    }
    const cleaned = attrs.replace(/\s(srcset|sizes|src)="[^"]*"/g, '').replace(/\sloading="lazy"/, '');
    return src && src.startsWith('/') ? `<img src="${dataUri(src)}"${cleaned}>` : tag;
  });
  out = out.replace(/\saria-current="page"/g, '');
  return out;
}

// ---------- 4. Stilovi (spojeni, fontovi ugrađeni) ----------
const styles = [];
for (const p of pages) {
  for (const m of p.html.matchAll(/<style>([\s\S]*?)<\/style>/g)) if (!styles.includes(m[1])) styles.push(m[1]);
}
const css = styles.join('\n').replace(/url\("?(\/[^")]+)"?\)/g, (m, u) => `url("${dataUri(u)}")`);

// ---------- 5. Zaglavlje, meni, podnožje (sa početne) ----------
const home = pages.find((p) => p.url === '/');
const header = rewrite((home.html.match(/<header class="rh-header">[\s\S]*?<\/header>/) ?? [''])[0], null);
const subnav = rewrite((home.html.match(/<nav class="rh-subnav"[\s\S]*?<\/nav>/) ?? [''])[0], null);
const footer = rewrite((home.html.match(/<footer class="rh-footer">[\s\S]*?<\/footer>/) ?? [''])[0], null);

// ---------- 6. Podaci za uputstvo ----------
const practiceSrc = readFileSync('src/data/practice.ts', 'utf8');
const pendingBlock = (practiceSrc.match(/export const pending: string\[\] = \[([\s\S]*?)\];/) ?? [])[1] ?? '';
// Stavke iz practice.ts, prepisane tako da se obraćaju Jeleni („ti“), bez imena polja iz koda.
const status = (practiceSrc.match(/status: '([^']+)'/) ?? [])[1] ?? '';
const forJelena = (item) => {
  if (item.startsWith('Formulacija statusa')) return `Kako da piše tvoj status u edukaciji. Sada piše „${status}“, kao na Instagramu.`;
  if (item.startsWith('Cena')) return 'Cena: na sajtu piše „na upit“. Kad odlučiš, upisuje se na jedno mesto i pojavljuje se u uslovima.';
  if (item.startsWith('Svi tekstovi su nacrti')) return 'Svi tekstovi su nacrti: prepravi sve što ne zvuči kao ti.';
  return item.replace(/\s*\([a-zA-Z.]+\)/g, '');
};
const pending = [...pendingBlock.matchAll(/'((?:[^'\\]|\\.)*)'/g)].map((m) => forJelena(m[1]));
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const today = new Date().toLocaleDateString('sr-Latn-RS', { day: 'numeric', month: 'long', year: 'numeric' });
const host = new URL((home.html.match(/rel="canonical" href="([^"]+)"/) ?? [])[1] ?? 'https://example.com/').host;

const names = {
  '/': 'Početna', '/teme/': 'Teme', '/kako-radim/': 'Kako radim', '/o-meni/': 'O meni', '/zakazivanje/': 'Zakazivanje',
  '/terapija-na-srpskom-u-inostranstvu/': 'Iz inostranstva', '/pitanja/': 'Pitanja (tekstovi)', '/rebt-pojmovi/': 'REBT pojmovi',
  '/uslovi/': 'Uslovi saradnje', '/privatnost/': 'Poverljivost i privatnost',
};
const group = (label, list) => list.length ? `<h3 class="rv-h3">${label}</h3><ol class="rv-list">${list
  .map((p) => {
    const name = names[p.url];
    const link = name ? `<a href="#p-${p.slug}">${esc(name)}</a><span class="rv-h1">${esc(p.h1)}</span>` : `<a href="#p-${p.slug}">${esc(p.h1 || p.title)}</a>`;
    return `<li>${link}${p.draft ? ' <span class="rv-tag">nacrt teme</span>' : ''}<span class="rv-url">${host}${p.url}</span></li>`;
  })
  .join('')}</ol>` : '';
const main = pages.filter((p) => ['/', '/teme/', '/kako-radim/', '/o-meni/', '/zakazivanje/'].includes(p.url));
const topics = pages.filter((p) => p.url.startsWith('/teme/') && p.url !== '/teme/');
const rest = pages.filter((p) => !main.includes(p) && !topics.includes(p));

const panel = `<div class="container rv-panel">
  <p class="rh-eyebrow eyebrow">Pregled sajta</p>
  <h1 class="h1">Ceo sajt u jednom fajlu, samo za tebe</h1>
  <p class="lead muted">Sajt nije objavljen. Ovo je nacrt za pregled: ${pages.length} stranica, sa svim tekstovima, slikama i linkovima. Radi i bez interneta, a linkovi za email, telefon, Viber i WhatsApp otvaraju prave aplikacije.</p>
  <div class="rv-grid">
    <div>
      <h2 class="h3">Kako da pregledaš</h2>
      <ol class="rv-steps">
        <li><strong>Idi redom kroz stranice</strong> sa spiska. Dugme „Sve stranice“ dole desno te uvek vraća ovde.</li>
        <li><strong>Proveri činjenice:</strong> zvanje, edukaciju, mesto, broj, email, trajanje seanse i pravila otkazivanja i plaćanja.</li>
        <li><strong>Proveri ton.</strong> Tekstovi su nacrti napisani tvojim tonom sa Instagrama. Sve što ne zvuči kao ti, slobodno prepravi.</li>
        <li><strong>Pogledaj i okvir na dnu svake stranice</strong> („Ovako izgleda u Google pretrazi“). I taj naslov i opis mogu da se menjaju.</li>
        <li><strong>Pošalji ispravke</strong> kako ti je lakše: prepravljen tekst, snimak ekrana sa napomenom ili poruku tipa „Kako radim, treći pasus: …“.</li>
      </ol>
    </div>
    <div>
      <h2 class="h3">Šta još čeka tvoju potvrdu</h2>
      <ul class="rv-pending">${pending.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
    </div>
  </div>
  <h2 class="h2 rv-h2">Sve stranice</h2>
  ${group('Glavne stranice', main)}
  ${group('Teme', topics)}
  ${group('Ostalo', rest)}
  <p class="small muted rv-foot">Napravljeno ${today}. Fajl je samo za pregled i ne treba ga objavljivati.</p>
</div>`;

// ---------- 7. Sklapanje ----------
const serp = (p) => `<div class="container"><aside class="rv-serp" aria-label="Ovako izgleda u Google pretrazi">
  <p class="rv-serp__label">Ovako izgleda u Google pretrazi</p>
  <p class="rv-serp__url">${host}${p.url === '/' ? '' : ' › ' + p.url.replace(/^\/|\/$/g, '').split('/').join(' › ')}</p>
  <p class="rv-serp__title">${esc(p.title)}</p>
  <p class="rv-serp__desc">${esc(p.description)}</p>
</aside></div>`;

const sections = pages.map((p) => `<section class="rv-page" id="p-${p.slug}" aria-label="${esc(p.h1 || p.title)}">${rewrite(p.main, p.slug)}${serp(p)}</section>`).join('\n');

const reviewCss = `
.rv-page{display:none;scroll-margin-top:100vh}
.rv-page:target,.rv-page:has(:target){display:block}
main:not(:has(.rv-page:target,.rv-page :target))>#p-pregled{display:block}
.rv-bar{background:#1d1d1f;color:#f8f7f4;font:500 13px/19px var(--font-sans);padding:8px 16px;text-align:center}
.rv-bar a{color:#cfe33a}
.rv-fab{position:fixed;right:16px;bottom:16px;z-index:40;display:inline-flex;align-items:center;gap:8px;min-height:44px;padding:0 20px;border-radius:999px;background:#232321;color:#f8f7f4;font:600 14px/20px var(--font-sans);text-decoration:none;box-shadow:0 10px 30px -10px #0006}
.rv-fab:hover{background:#3a3a37}
.rv-panel{padding-top:64px;padding-bottom:96px}
.rv-panel .lead{max-width:62ch;margin-top:24px}
.rv-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:48px;margin-top:48px}
@media (max-width:860px){.rv-grid{grid-template-columns:1fr;gap:32px}}
.rv-steps,.rv-pending{margin:16px 0 0;padding-left:1.2em;color:var(--ink-muted)}
.rv-steps li+li,.rv-pending li+li{margin-top:10px}
.rv-steps strong{color:var(--ink)}
.rv-h2{margin-top:72px}
.rv-h3{margin:32px 0 8px;font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-muted)}
.rv-list{margin:0;padding:0;list-style:none;border-top:1px solid var(--line)}
.rv-list li{display:flex;flex-wrap:wrap;align-items:baseline;gap:4px 12px;padding:14px 0;border-bottom:1px solid var(--line)}
.rv-list a{color:var(--ink);font-weight:600;text-decoration:underline;text-decoration-color:var(--blue);text-underline-offset:4px}
.rv-h1{color:var(--ink-muted)}
.rv-url{margin-left:auto;color:var(--ink-muted);font-size:13px}
.rv-tag{padding:2px 8px;border-radius:999px;background:var(--lime-tint);font-size:12px;font-weight:600}
.rv-foot{margin-top:40px}
.rv-serp{max-width:640px;margin:0 0 72px;padding:20px 24px;border:1px dashed var(--line-strong);border-radius:6px;background:#fff;font-family:Arial,sans-serif}
.rv-serp__label{margin:0 0 10px;font:700 11px/16px var(--font-sans);letter-spacing:.14em;text-transform:uppercase;color:var(--ink-muted)}
.rv-serp__url{margin:0;color:#4d5156;font-size:13px}
.rv-serp__title{margin:4px 0 2px;color:#1a0dab;font-size:19px;line-height:1.3}
.rv-serp__desc{margin:0;color:#4d5156;font-size:14px;line-height:1.55}
`;

const favicon = existsSync(path.join(root, 'favicon-96.png')) ? `<link rel="icon" href="${dataUri('/favicon-96.png')}">` : '';
const doc = `<!doctype html>
<html lang="sr-Latn">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<meta name="color-scheme" content="light">
<title>Pregled sajta · ${esc(home.title.split('|').pop().trim())}</title>
${favicon}
<style>${css}</style>
<style>${reviewCss}</style>
</head>
<body>
<div class="rv-bar">Nacrt sajta za pregled · ${host} · ${today} · <a href="#p-pregled">Uputstvo i sve stranice</a></div>
${header}
${subnav}
<main id="sadrzaj">
<section class="rv-page" id="p-pregled" aria-label="Pregled sajta">${panel}</section>
${sections}
</main>
${footer}
<a class="rv-fab" href="#p-pregled">Sve stranice</a>
</body>
</html>
`;

mkdirSync(path.dirname(outFile), { recursive: true });
writeFileSync(outFile, doc);
const kb = (Buffer.byteLength(doc) / 1024).toFixed(0);
console.log(`Fajl za pregled: ${path.relative(process.cwd(), outFile)} (${kb} KB, ${pages.length} stranica)`);
