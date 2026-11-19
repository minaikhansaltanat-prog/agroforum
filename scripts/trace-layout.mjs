// Lists the long Layout events during page load (to see what triggers them). Server on :3000.
import puppeteer from "puppeteer-core";
import { existsSync, readFileSync } from "node:fs";
const candidates = [process.env.CHROME_PATH, "C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe", "/usr/bin/google-chrome"].filter(Boolean);
const browser = await puppeteer.launch({ executablePath: candidates.find((p) => existsSync(p)), headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
const cdp = await page.createCDPSession();
await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
if (process.env.EXTRA_CSS) await page.evaluateOnNewDocument((css) => { document.addEventListener("DOMContentLoaded", () => { const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st); }); }, process.env.EXTRA_CSS);
await page.tracing.start({ path: "trace.json", categories: ["devtools.timeline", "disabled-by-default-devtools.timeline", "blink.user_timing", "loading"] });
await page.goto("http://localhost:3000/", { waitUntil: "load" });
await new Promise((r) => setTimeout(r, 3500));
await page.tracing.stop();
const ev = JSON.parse(readFileSync("trace.json", "utf8")).traceEvents;
const t0 = Math.min(...ev.filter((e) => e.ts && e.name === "navigationStart").map((e) => e.ts), Infinity);
const rows = ev.filter((e) => ["Layout", "UpdateLayoutTree", "FontLoad", "ParseHTML", "EvaluateScript", "FunctionCall", "TimerFire", "FireAnimationFrame", "Paint", "ImageDecodeTask", "Decode Image"].includes(e.name) && e.dur > 20000)
  .sort((a, b) => a.ts - b.ts).slice(0, 40);
for (const e of rows) console.log(String(Math.round((e.ts - t0) / 1000)).padStart(6), "ms", e.name.padEnd(18), Math.round(e.dur / 1000) + "ms", e.args?.beginData ? `dirty=${e.args.beginData.dirtyObjects}/${e.args.beginData.totalObjects}` : "", (e.args?.data?.url || e.args?.data?.functionName || "").toString().slice(0, 60));
const sum = {};
for (const e of ev) if (e.dur && ["Layout", "UpdateLayoutTree", "Paint", "ImageDecodeTask", "Decode Image"].includes(e.name)) sum[e.name] = (sum[e.name] || 0) + e.dur / 1000;
console.log(Object.fromEntries(Object.entries(sum).map(([k, v]) => [k, Math.round(v) + "ms"])));
await browser.close();
