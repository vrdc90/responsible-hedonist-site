import type { AstroIntegration } from 'astro';
import { createHash } from 'node:crypto';
import { readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const PLACEHOLDER = '__INLINE_SCRIPT_HASHES__';
// Inline <script> bez src atributa; JSON-LD su podaci i CSP ih ne blokira.
const SCRIPT = /<script(?![^>]*\bsrc=)(?![^>]*application\/ld\+json)[^>]*>([\s\S]*?)<\/script>/g;

/**
 * Posle build-a izračuna sha256 heš svake inline skripte (tema) i upiše ga
 * u Content-Security-Policy u dist/_headers. Tako CSP ostaje strog
 * (bez 'unsafe-inline' za skripte), a heševi se nikad ne ažuriraju ručno.
 */
export default function cspHashes(): AstroIntegration {
  return {
    name: 'rh-csp-hashes',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const root = fileURLToPath(dir);
        const files = (await readdir(root, { recursive: true })).filter((f) => f.endsWith('.html'));
        const hashes = new Set<string>();
        for (const f of files) {
          const html = await readFile(path.join(root, f), 'utf8');
          for (const m of html.matchAll(SCRIPT)) {
            hashes.add(`'sha256-${createHash('sha256').update(m[1], 'utf8').digest('base64')}'`);
          }
        }
        const headersPath = path.join(root, '_headers');
        const headers = await readFile(headersPath, 'utf8');
        if (!headers.includes(PLACEHOLDER)) throw new Error(`_headers nema ${PLACEHOLDER}`);
        await writeFile(headersPath, headers.replaceAll(PLACEHOLDER, [...hashes].join(' ')));
        logger.info(`CSP: ${hashes.size} heš(a) inline skripti upisano u _headers`);
      },
    },
  };
}
