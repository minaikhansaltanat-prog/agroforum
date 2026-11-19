// Writes the Kazakh (default language) text into site/index.html so the page has real content before any
// JavaScript runs (SEO, social previews, fast first paint). The language switcher still works as before.
// Run after editing site/l/kk.js or the markup: node scripts/prerender.mjs
import { readFileSync, writeFileSync } from "node:fs";
import vm from "node:vm";

const win = { I18N: {} };
vm.runInNewContext(readFileSync("site/l/kk.js", "utf8"), { window: win });
const D = win.I18N.kk;
const file = "site/index.html";
let html = readFileSync(file, "utf8");

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;");
const missing = new Set();
const val = (k) => { if (!(k in D)) { missing.add(k); return null; } return D[k]; };

/* 1. elements whose content is the translation: data-i and data-ul */
function fillContent(src, attrName, render) {
  const open = new RegExp(`<([a-zA-Z0-9]+)\\b[^>]*?\\s${attrName}="([^"]+)"[^>]*>`, "g");
  let out = "", cursor = 0, m;
  while ((m = open.exec(src))) {
    const [tag, name, key] = m;
    const start = m.index + tag.length;
    const v = val(key);
    if (v == null) continue;
    // find the matching closing tag (counts nested tags with the same name)
    const re = new RegExp(`<(/?)${name}\\b[^>]*>`, "gi");
    re.lastIndex = start;
    let depth = 1, end = -1, t;
    while ((t = re.exec(src))) {
      if (t[1]) { depth--; if (!depth) { end = t.index; break; } } else if (!/\/>$/.test(t[0])) depth++;
    }
    if (end < 0) continue;
    out += src.slice(cursor, start) + render(v);
    cursor = end;
    open.lastIndex = end;
  }
  return out + src.slice(cursor);
}
html = fillContent(html, "data-i", (v) => v);
html = fillContent(html, "data-ul", (v) => (Array.isArray(v) ? v.map((x) => `<li>${x}</li>`).join("") : ""));

/* 2. attributes: placeholder, aria-label, alt, data-w */
function setAttr(src, dataAttr, attr, transform = (v) => v) {
  const open = new RegExp(`<[a-zA-Z0-9]+\\b[^>]*?\\s${dataAttr}="([^"]+)"[^>]*>`, "g");
  return src.replace(open, (tag, key) => {
    const v = val(key); if (v == null) return tag;
    const value = esc(transform(v));
    const has = new RegExp(`\\s${attr}="[^"]*"`);
    return has.test(tag) ? tag.replace(has, ` ${attr}="${value}"`) : tag.replace(/>$/, ` ${attr}="${value}">`);
  });
}
html = setAttr(html, "data-ip", "placeholder");
html = setAttr(html, "data-ia", "aria-label");
html = setAttr(html, "data-alt", "alt");
html = setAttr(html, "data-iw", "data-w");

/* 3. avatar initials from the name that follows each avatar */
const initials = (n) => n.replace(/[«»"“”]/g, "").trim().split(/\s+/).slice(0, 2).map((w) => w[0] || "").join("").toUpperCase();
html = html.split("<article").map((chunk, i) => {
  if (!i) return chunk;
  const nm = chunk.match(/<h4 data-i="([^"]+)"/);
  if (!nm || !(nm[1] in D)) return chunk;
  return chunk.replace(/(data-ini="1">)([^<]*)(<\/span>)/, `$1${initials(D[nm[1]])}$3`);
}).join("<article");

writeFileSync(file, html);
if (missing.size) console.log("keys missing in kk.js:", [...missing].join(", "));
console.log("site/index.html pre-rendered with Kazakh text");
