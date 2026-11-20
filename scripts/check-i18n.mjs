// Checks the five language files: key parity, forbidden words and characters, mixed scripts.
// Run: node scripts/check-i18n.mjs
import { readFileSync } from "node:fs";
import vm from "node:vm";

const LANGS = ["kk", "ru", "zh", "uz", "ky"];
const win = { I18N: {} };
for (const l of LANGS) vm.runInNewContext(readFileSync(`site/l/${l}.js`, "utf8"), { window: win });

const ref = win.I18N.kk;
const refKeys = Object.keys(ref);
let problems = 0;
const bad = (msg) => { problems++; console.log("  ✗ " + msg); };

// keys used in HTML and JS must exist in kk
const html = readFileSync("site/index.html", "utf8") + readFileSync("site/js/app.js", "utf8");
const used = new Set();
for (const m of html.matchAll(/data-(?:i|ip|ia|alt|ul)="([^"]+)"/g)) used.add(m[1]);
for (const m of html.matchAll(/tr\("([a-z0-9_]+)"\)/g)) used.add(m[1]);
for (const k of used) if (!(k in ref)) bad(`key used in HTML/JS but missing in kk: ${k}`);
for (const k of refKeys) if (!used.has(k) && !["title", "desc", "og_desc", "h_full", "wa_hello", "f_sending", "f_fail", "c_all", "c_left", "ok_p", "ok_p2", "n_menu_close", "mz_play"].includes(k)) console.log(`  · unused key in kk: ${k}`);

const FORBID = [/—/, /–/, /тегін/i, /бесплатн/i, /免费/, /bepul/i, /акысыз/i, /\b400\b/, /09:00/];
const CYR = /[А-Яа-яЁёӘәІіҒғҚқҢңӨөҰұҮүҺһ]/;
const LAT = /[A-Za-z]/;

for (const l of LANGS) {
  const D = win.I18N[l];
  console.log(`\n[${l}] ${Object.keys(D).length} keys`);
  for (const k of refKeys) if (!(k in D)) bad(`${l}: missing key ${k}`);
  for (const k of Object.keys(D)) if (!(k in ref)) bad(`${l}: extra key ${k}`);
  for (const [k, v] of Object.entries(D)) {
    const arr = Array.isArray(v) ? v : [v];
    if (Array.isArray(ref[k]) && (!Array.isArray(v) || v.length !== ref[k].length)) bad(`${l}.${k}: list length differs (${Array.isArray(v) ? v.length : "n/a"} vs ${ref[k].length})`);
    arr.forEach((s, i) => {
      if (typeof s !== "string" || !s.trim()) { bad(`${l}.${k}[${i}]: empty or not a string`); return; }
      for (const re of FORBID) if (re.test(s)) bad(`${l}.${k}: forbidden ${re} in "${s.slice(0, 60)}"`);
      if (/  /.test(s)) bad(`${l}.${k}: double space`);
      if ((s.match(/<span/g) || []).length !== (s.match(/<\/span>/g) || []).length) bad(`${l}.${k}: unbalanced span`);
      if (["kk", "ru", "ky"].includes(l)) {
        for (const w of s.replace(/<[^>]+>/g, " ").split(/[\s,.:;!?()«»"“”/\-·]+/)) {
          if (CYR.test(w) && LAT.test(w)) bad(`${l}.${k}: mixed-script word "${w}"`);
        }
      }
    });
  }
  if (!/\{t\}/.test(D.c_all) || !/\{t\}/.test(D.c_left) || !/\{n\}/.test(D.c_left)) bad(`${l}: c_all/c_left placeholders`);
}
console.log(problems ? `\n${problems} problem(s)` : "\nAll language files are consistent.");
process.exit(problems ? 1 : 0);
