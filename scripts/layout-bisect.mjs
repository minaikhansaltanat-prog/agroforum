// Measures the cost of one full re-layout under different CSS switches (to find slow features).
// Run: node scripts/layout-bisect.mjs   (server on :3000)
import puppeteer from "puppeteer-core";
import { existsSync } from "node:fs";
const candidates = [process.env.CHROME_PATH, "C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe", "/usr/bin/google-chrome"].filter(Boolean);
const browser = await puppeteer.launch({ executablePath: candidates.find((p) => existsSync(p)), headless: true });
const variants = {
  baseline: "",
  "no content-visibility": ".sec,.stats,.mosaic,.foot{content-visibility:visible!important}",
  "no text-wrap": "*{text-wrap:wrap!important}",
  "no svg use": "svg.i{display:none!important}",
  "system fonts": "*{font-family:Arial,sans-serif!important}",
  "no grid": ".sgrid,.who,.why,.passes,.ogrid,.pslots,.stats__grid,.dlg,.prog__grid,.reg__grid,.faq__grid{display:block!important}",
  "no filter/mask": ".pass,.pass__top,.pass__bot{filter:none!important;-webkit-mask:none!important;mask:none!important}",
  "no sticky": "*{position:static!important}"
};
for (const [name, css] of Object.entries(variants)) {
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
  const cdp = await page.createCDPSession();
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle2" });
  await new Promise((r) => setTimeout(r, 800));
  if (css) await page.addStyleTag({ content: css });
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
  const t = await page.evaluate(() => {
    const b = document.body; const times = [];
    for (let i = 0; i < 6; i++) { b.style.paddingRight = (i % 2 ? 0 : 3) + "px"; const t0 = performance.now(); void b.offsetHeight; times.push(performance.now() - t0); }
    return times.slice(2).reduce((a, c) => a + c, 0) / 4;
  });
  console.log(name.padEnd(24), Math.round(t) + " ms per full layout (4x CPU throttle)");
  await page.close();
}
await browser.close();
