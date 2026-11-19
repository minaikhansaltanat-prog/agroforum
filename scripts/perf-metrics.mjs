// Quick main-thread cost report (Chrome DevTools metrics, CPU throttled 4x). Start the server first.
// Run: node scripts/perf-metrics.mjs [url] [js=off] [css=off]
import puppeteer from "puppeteer-core";
import { existsSync } from "node:fs";
const url = process.argv.find((a) => a.startsWith("http")) || "http://localhost:3000/";
const jsOff = process.argv.includes("js=off");
const candidates = [process.env.CHROME_PATH, "C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe", "/usr/bin/google-chrome"].filter(Boolean);
const browser = await puppeteer.launch({ executablePath: candidates.find((p) => existsSync(p)), headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
if (jsOff) await page.setJavaScriptEnabled(false);
const cdp = await page.createCDPSession();
await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
await cdp.send("Performance.enable");
await page.goto(url, { waitUntil: "load" });
await new Promise((r) => setTimeout(r, 3500));
const m = Object.fromEntries((await cdp.send("Performance.getMetrics")).metrics.map((x) => [x.name, x.value]));
const pick = ["LayoutCount", "RecalcStyleCount", "LayoutDuration", "RecalcStyleDuration", "ScriptDuration", "TaskDuration", "Nodes", "LayoutObjects"];
console.log((jsOff ? "JS OFF " : "JS ON ") + JSON.stringify(Object.fromEntries(pick.map((k) => [k, k.endsWith("Duration") ? Math.round(m[k] * 1000) + "ms" : Math.round(m[k])]))));
await browser.close();
