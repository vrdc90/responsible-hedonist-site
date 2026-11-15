import type { APIRoute } from 'astro';

/**
 * Sve je otvoreno, uključujući AI pretraživače (OAI-SearchBot, ChatGPT-User,
 * Claude-SearchBot, PerplexityBot) i botove za trening (GPTBot, ClaudeBot,
 * Google-Extended): maloj praksi treba vidljivost.
 */
export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL('sitemap-index.xml', site).href;
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
