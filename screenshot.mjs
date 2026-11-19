// Screenshots with Puppeteer. Always run against http://localhost:3000 (see CLAUDE скрин.md).
//   node screenshot.mjs http://localhost:3000 [label] [--w 1440] [--h 900] [--lang ru] [--full] [--sections] [--tiles]
//        [--scroll 1200] [--click "#burger"] [--wait 600] [--dpr 1] [--check] [--sel "#faq"]
// Files go to ./temporary screenshots/screenshot-N[-label][-part].png (auto-incremented, never overwritten).
import puppeteer from "puppeteer-core";
import { existsSync, mkdirSync, readdirSync } from "node:fs";
import { join } from "node:path";

const args = process.argv.slice(2);
const url = args.find((a) => /^https?:/.test(a)) || "http://localhost:3000";
const flag = (n) => args.includes(`--${n}`);
const opt = (n, d) => { const i = args.indexOf(`--${n}`); return i > -1 ? args[i + 1] : d; };
const valueFlags = new Set(["w", "h", "dpr", "lang", "wait", "scroll", "click", "sel"]);
const positional = args.filter((a, i) => {
  if (a.startsWith("--") || /^https?:/.test(a)) return false;
  const prev = args[i - 1] || "";
  return !(prev.startsWith("--") && valueFlags.has(prev.slice(2)));
});
const name = positional[0] || "";
const W = +opt("w", 1440), H = +opt("h", 900), DPR = +opt("dpr", 1);
const lang = opt("lang", "");
const wait = +opt("wait", 700);

const candidates = [process.env.CHROME_PATH, "C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe", "C:/Program Files/Microsoft/Edge/Application/msedge.exe", "/usr/bin/google-chrome", "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"].filter(Boolean);
const executablePath = candidates.find((p) => existsSync(p));
if (!executablePath) { console.error("No Chrome/Edge found. Set CHROME_PATH."); process.exit(1); }

const dir = "temporary screenshots";
if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
const nums = readdirSync(dir).map((f) => +(f.match(/^screenshot-(\d+)/) || [])[1]).filter(Boolean);
const N = (nums.length ? Math.max(...nums) : 0) + 1;
const out = (part) => join(dir, `screenshot-${N}${name ? "-" + name : ""}${part ? "-" + part : ""}.png`);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({ executablePath, headless: true, args: ["--no-sandbox", "--autoplay-policy=no-user-gesture-required"] });
const page = await browser.newPage();
await page.setViewport({ width: W, height: H, deviceScaleFactor: DPR, isMobile: W < 700, hasTouch: W < 700 });
const logs = [];
page.on("console", (m) => { if (["error", "warning"].includes(m.type())) logs.push(`[${m.type()}] ${m.text()}`); });
page.on("pageerror", (e) => logs.push(`[pageerror] ${e.message}`));
page.on("requestfailed", (r) => logs.push(`[requestfailed] ${r.url()}`));
page.on("response", (r) => { if (r.status() >= 400) logs.push(`[http ${r.status()}] ${r.url()}`); });
if (lang) await page.evaluateOnNewDocument((l) => { try { localStorage.setItem("lang", l); } catch (e) {} }, lang);
await page.goto(url + (lang ? (url.includes("?") ? "&" : "?") + "lang=" + lang : ""), { waitUntil: "networkidle2", timeout: 60000 });
await page.addStyleTag({ content: "html{scroll-behavior:auto!important}" });
await page.evaluate(() => document.fonts && document.fonts.ready);
await sleep(wait);

// scroll through the page so reveal animations fire, then return to the top
const total = await page.evaluate(() => document.documentElement.scrollHeight);
for (let y = 0; y < total; y += Math.round(H * 0.6)) { await page.evaluate((v) => window.scrollTo(0, v), y); await sleep(120); }
await page.evaluate(() => window.scrollTo(0, 0));
await sleep(500);

const click = opt("click", "");
if (click) { for (const sel of click.split("|")) { await page.click(sel); await sleep(700); } }
const scroll = opt("scroll", "");
if (scroll) { await page.evaluate((v) => window.scrollTo(0, v), +scroll); await sleep(900); }

const files = [];
if (flag("sections")) {
  const ids = await page.evaluate(() => [...document.querySelectorAll("main > section, footer")].map((s, i) => s.id || s.className.split(" ")[0] || "s" + i));
  const els = await page.$$("main > section, footer");
  for (let i = 0; i < els.length; i++) {
    await els[i].scrollIntoView(); await sleep(450);
    const f = out(String(i + 1).padStart(2, "0") + "-" + ids[i]);
    await els[i].screenshot({ path: f }); files.push(f);
  }
} else if (flag("tiles")) {
  const th = await page.evaluate(() => document.documentElement.scrollHeight);
  let i = 1;
  for (let y = 0; y < th; y += H) {
    await page.evaluate((v) => window.scrollTo(0, v), y); await sleep(450);
    const f = out("t" + String(i++).padStart(2, "0")); await page.screenshot({ path: f }); files.push(f);
  }
} else if (opt("sel", "")) {
  const el = await page.$(opt("sel", "")); await el.scrollIntoView(); await sleep(700);
  const f = out("sel"); await el.screenshot({ path: f }); files.push(f);
} else if (flag("full")) {
  const f = out("full"); await page.screenshot({ path: f, fullPage: true }); files.push(f);
} else { const f = out(); await page.screenshot({ path: f }); files.push(f); }

if (flag("check")) {
  const r = await page.evaluate(() => {
    const vw = document.documentElement.clientWidth, off = [];
    document.querySelectorAll("body *").forEach((el) => {
      const b = el.getBoundingClientRect();
      if (b.width && (b.right > vw + 1 || b.left < -1)) {
        const cs = getComputedStyle(el);
        if (cs.position !== "fixed" && !el.closest(".vrail,.hero__sun,.menu,.collage .bubble")) off.push(el.tagName.toLowerCase() + (el.className && typeof el.className === "string" ? "." + el.className.split(" ")[0] : "") + " " + Math.round(b.left) + ".." + Math.round(b.right));
      }
    });
    return {
      vw, innerW: innerWidth, scrollW: document.documentElement.scrollWidth, docH: document.documentElement.scrollHeight,
      overflowX: document.documentElement.scrollWidth > vw + 1,
      offenders: [...new Set(off)].slice(0, 12),
      fonts: [...document.fonts].filter((f) => f.status === "loaded").map((f) => f.family + " " + f.unicodeRange.slice(0, 18)).slice(0, 10),
      lang: document.documentElement.lang
    };
  });
  console.log("CHECK", JSON.stringify(r));
}
console.log(files.join("\n"));
if (logs.length) console.log("LOGS\n" + [...new Set(logs)].slice(0, 12).join("\n"));
await browser.close();
