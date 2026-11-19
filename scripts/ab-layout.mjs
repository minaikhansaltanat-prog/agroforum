// A/B: total Layout+UpdateLayoutTree time during load for CSS variants injected into <head>. Server on :3000.
import puppeteer from "puppeteer-core";
import { existsSync, readFileSync, rmSync } from "node:fs";
const candidates = [process.env.CHROME_PATH, "C:/Program Files/Google/Chrome/Application/chrome.exe", "/usr/bin/google-chrome"].filter(Boolean);
const browser = await puppeteer.launch({ executablePath: candidates.find((p) => existsSync(p)), headless: true });
const variants = {
  baseline: "",
  "no text-wrap": "*{text-wrap:wrap!important}",
  "no shadows/filters": "*{box-shadow:none!important;filter:none!important;text-shadow:none!important}",
  "no content-visibility": ".sec,.stats,.mosaic,.foot{content-visibility:visible!important}",
  "no animations": "*{animation:none!important;transition:none!important}",
  "hide below hero": "main>section:not(.hero),footer{display:none!important}",
  "hide svg icons": "svg{display:none!important}",
  "plain text only": "img,svg,video{display:none!important}"
};
async function run(css) {
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await page.setRequestInterception(true);
  page.on("request", async (req) => {
    if (req.isNavigationRequest() && css) { const r = await fetch(req.url()); let t = await r.text(); t = t.replace("<head>", "<head><style>" + css + "</style>"); req.respond({ status: 200, contentType: "text/html; charset=utf-8", body: t }); } else req.continue();
  });
  const cdp = await page.createCDPSession();
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
  await page.tracing.start({ path: "t.json", categories: ["devtools.timeline"] });
  await page.goto("http://localhost:3000/?lang=kk", { waitUntil: "load" });
  await new Promise((r) => setTimeout(r, 3000));
  await page.tracing.stop();
  const ev = JSON.parse(readFileSync("t.json", "utf8")).traceEvents; rmSync("t.json");
  const mains = ev.filter((e) => e.name === "thread_name" && e.args?.name === "CrRendererMain").map((e) => e.pid + ":" + e.tid);
  let L = 0, S = 0;
  for (const e of ev) if (e.ph === "X" && mains.includes(e.pid + ":" + e.tid)) { if (e.name === "Layout") L += e.dur / 1000; if (e.name === "UpdateLayoutTree") S += e.dur / 1000; }
  await page.close();
  return [L, S];
}
for (const [name, css] of Object.entries(variants)) {
  const rs = []; for (let i = 0; i < 3; i++) rs.push(await run(css));
  const L = rs.map((r) => r[0]).sort((a, b) => a - b)[1], S = rs.map((r) => r[1]).sort((a, b) => a - b)[1];
  console.log(name.padEnd(24), "Layout", Math.round(L) + "ms", " Style", Math.round(S) + "ms");
}
await browser.close();
