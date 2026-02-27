/**
 * Post-build: inlines all local /assets/*.css <link> tags directly into each
 * HTML file as <style> blocks, eliminating render-blocking CSS requests.
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = join(__dirname, "..", ".output", "public");

async function collectHtml(dir, out = []) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) await collectHtml(full, out);
    else if (e.name.endsWith(".html")) out.push(full);
  }
  return out;
}

async function inlineCss(htmlPath) {
  let html = await readFile(htmlPath, "utf8");

  // Match any <link> tag, then check attributes regardless of order
  const LINK_RE = /<link\b([^>]*)\/?>/g;
  const HREF_RE = /\bhref="([^"]+\.css)"/;
  const REL_RE = /\brel="stylesheet"/;

  let changed = false;
  const tags = [];
  let m;
  while ((m = LINK_RE.exec(html)) !== null) {
    const attrs = m[1];
    const hrefMatch = HREF_RE.exec(attrs);
    if (hrefMatch && REL_RE.test(attrs)) {
      tags.push({ tag: m[0], href: hrefMatch[1] });
    }
  }

  for (const { tag, href } of tags) {
    const cssFile = join(OUTPUT_DIR, href);
    try {
      const css = await readFile(cssFile, "utf8");
      html = html.replace(tag, `<style>${css}</style>`);
      changed = true;
    } catch {
      // file not found — leave the <link> as-is
    }
  }

  if (changed) await writeFile(htmlPath, html, "utf8");
}

const files = await collectHtml(OUTPUT_DIR);
await Promise.all(files.map(inlineCss));
console.log(`[inline-css] Done — processed ${files.length} HTML files.`);
