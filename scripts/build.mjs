// Build: bundles src/css/*.css into site/css/style.css, then pre-renders the Kazakh text into site/index.html.
// Run: npm run build
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { execFileSync } from "node:child_process";

const parts = ["base", "sections"].map((n) => readFileSync(`src/css/${n}.css`, "utf8"));

// Touch screens apply :hover on tap and keep it until the next tap, so every :hover rule is wrapped in place
// (cascade order unchanged) for hover-capable, precise pointers only. :active/:focus selectors in the same list stay ungated.
const splitList = (s) => {
  const out = []; let depth = 0, cur = "";
  for (const ch of s) {
    if (ch === "(") depth++; else if (ch === ")") depth--;
    if (ch === "," && depth === 0) { out.push(cur); cur = ""; } else cur += ch;
  }
  return [...out, cur].map((x) => x.trim()).filter(Boolean);
};
const gateHover = (src) => src.replace(/([^{}]*:hover[^{}]*)\{([^{}]*)\}/g, (m, sel, body) => {
  if (sel.trim().startsWith("@")) return m;
  const list = splitList(sel), hov = list.filter((x) => x.includes(":hover")), rest = list.filter((x) => !x.includes(":hover"));
  return (rest.length ? `${rest.join(",")}{${body}}` : "") + `@media (hover:hover) and (pointer:fine){${hov.join(",")}{${body}}}`;
});

const css = gateHover(parts.join("\n").replace(/\/\*[\s\S]*?\*\//g, "").replace(/[ \t]+\n/g, "\n").replace(/\n{2,}/g, "\n")).trim() + "\n";
mkdirSync("site/css", { recursive: true });
writeFileSync("site/css/style.css", css);
console.log(`site/css/style.css written (${Math.round(css.length / 1024)} KB)`);
execFileSync(process.execPath, ["scripts/prerender.mjs"], { stdio: "inherit" });
