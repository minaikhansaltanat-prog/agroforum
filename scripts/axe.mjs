// Accessibility audit with axe-core (WCAG 2 A/AA). Start the server first: node serve.mjs 3000
// Run: node scripts/axe.mjs [url] [lang...]
import puppeteer from "puppeteer-core";
import { readFileSync, existsSync } from "node:fs";

const base = process.argv[2] && process.argv[2].startsWith("http") ? process.argv[2] : "http://localhost:3000";
const langs = process.argv.slice(2).filter((a) => !a.startsWith("http"));
const L = langs.length ? langs : ["kk"];
const axeSrc = readFileSync("node_modules/axe-core/axe.min.js", "utf8");
const candidates = [process.env.CHROME_PATH, "C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe", "/usr/bin/google-chrome"].filter(Boolean);
const executablePath = candidates.find((p) => existsSync(p));
const browser = await puppeteer.launch({ executablePath, headless: true });
let total = 0;
for (const lang of L) for (const [w, h, mobile] of [[1440, 900, false], [390, 844, true]]) {
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: h, isMobile: mobile, hasTouch: mobile });
  await page.goto(`${base}/?lang=${lang}`, { waitUntil: "networkidle2" });
  await page.addStyleTag({ content: "html{scroll-behavior:auto!important} .js .rv{opacity:1!important;transform:none!important;transition:none!important} .js .hero .ph,.js .hero .bubble,.js .hero .hero__copy>*{opacity:1!important;transform:none!important}" });
  await new Promise((r) => setTimeout(r, 600));
  await page.addScriptTag({ content: axeSrc });
  const res = await page.evaluate(async () => await axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa", "best-practice"] } }));
  console.log(`\n[${lang} ${w}px] violations: ${res.violations.length}`);
  for (const v of res.violations) {
    total += v.nodes.length;
    console.log(`  ${v.impact || "-"} ${v.id}: ${v.help} (${v.nodes.length})`);
    for (const n of v.nodes.slice(0, 3)) console.log("     " + n.target.join(" ") + " :: " + (n.failureSummary || "").split("\n").slice(1, 2).join(" ").slice(0, 150));
  }
  await page.close();
}
await browser.close();
process.exit(total ? 1 : 0);
