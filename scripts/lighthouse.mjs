// Runs Lighthouse (mobile) against the local server and prints the scores. Server on :3000.
// Run: node scripts/lighthouse.mjs [url]   (downloads lighthouse on first use through npx)
import { execFileSync } from "node:child_process";
import { readFileSync, mkdtempSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const url = process.argv[2] || "http://localhost:3000/";
const chrome = [process.env.CHROME_PATH, "C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe", "/usr/bin/google-chrome"].filter(Boolean).find((p) => existsSync(p));
const out = join(mkdtempSync(join(tmpdir(), "lh-")), "r.json");
execFileSync(process.platform === "win32" ? "npx.cmd" : "npx", ["--yes", "lighthouse", url, "--only-categories=performance,accessibility,best-practices,seo", "--form-factor=mobile", "--chrome-flags=--headless=new --no-sandbox --lang=" + (process.env.LH_LANG || "en-US"), "--output=json", `--output-path=${out}`, "--quiet"], { stdio: "inherit", env: { ...process.env, CHROME_PATH: chrome }, shell: process.platform === "win32" });
const j = JSON.parse(readFileSync(out, "utf8"));
console.log(Object.fromEntries(Object.entries(j.categories).map(([k, v]) => [k, Math.round(v.score * 100)])));
for (const k of ["first-contentful-paint", "largest-contentful-paint", "total-blocking-time", "cumulative-layout-shift", "speed-index"]) console.log(k.padEnd(28), j.audits[k].displayValue.replace(/\u00a0/g, " "));
for (const k of ["mainthread-work-breakdown", "long-tasks"]) {
  const a = j.audits[k]; console.log("==", k, (a.displayValue || "").replace(/\u00a0/g, " "));
  for (const it of (a.details?.items || []).slice(0, 8)) console.log("  ", it.groupLabel || it.url, Math.round(it.duration), it.startTime ? "@" + Math.round(it.startTime) : "");
}
const el = j.audits["largest-contentful-paint-element"]?.details?.items?.[0]?.items?.[0]?.node;
if (el) console.log("LCP element:", el.selector, "|", (el.nodeLabel || "").slice(0, 60));
const bd = j.audits["lcp-breakdown-insight"]?.details?.items?.[0]?.items;
if (bd) console.log("LCP breakdown:", bd.map((x) => x.label + " " + Math.round(x.duration) + "ms").join(", "));
