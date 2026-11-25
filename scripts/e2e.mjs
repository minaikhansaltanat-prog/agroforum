// Smoke test of the interactive parts. Start the server first: node serve.mjs 3000
// Run: node scripts/e2e.mjs [http://localhost:3000]
import puppeteer from "puppeteer-core";
import { existsSync } from "node:fs";

const base = process.argv[2] || "http://localhost:3000";
const candidates = [process.env.CHROME_PATH, "C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe", "/usr/bin/google-chrome"].filter(Boolean);
const executablePath = candidates.find((p) => existsSync(p));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let fails = 0;
const ok = (c, m) => { console.log((c ? "PASS " : "FAIL ") + m); if (!c) fails++; };

const browser = await puppeteer.launch({ executablePath, headless: true, args: ["--no-sandbox", "--autoplay-policy=no-user-gesture-required"] });

/* ---------- desktop ---------- */
{
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => { if (m.type() === "error" && !/insights|404/.test(m.text())) errors.push(m.text()); });
  await page.goto(base + "/?lang=kk", { waitUntil: "networkidle2" });
  await page.addStyleTag({ content: "html{scroll-behavior:auto!important}" });

  ok((await page.$eval("html", (e) => e.lang)) === "kk", "default language is Kazakh");
  ok((await page.$eval(".passes", (e) => getComputedStyle(e).display)) === "grid", "the whole stylesheet applies at desktop width (no unclosed CSS block)");
  ok((await page.$eval("#mosaic", (m) => getComputedStyle(m).animationName)) === "none", "desktop: the sector photos stay a still grid");

  await page.click("#langBtn"); await sleep(250);
  ok(await page.$eval("#langList", (e) => !e.hidden), "language dropdown opens");
  await page.click('#langList [data-lang="zh"]');
  await page.waitForFunction(() => document.documentElement.lang === "zh-Hans", { timeout: 5000 }).catch(() => {}); await sleep(300);
  ok((await page.$eval("html", (e) => e.lang)) === "zh-Hans", "switching to Chinese sets lang=zh-Hans");
  ok((await page.$eval(".hero__t2", (e) => e.textContent)).includes("科学"), "Chinese hero tagline rendered");
  await page.click("#langBtn"); await sleep(200); await page.click('#langList [data-lang="kk"]'); await sleep(300);
  ok((await page.$eval(".hero__t2", (e) => e.textContent)).includes("диалог"), "back to Kazakh");

  await page.evaluate(() => document.querySelector("#hostCar").scrollIntoView({ block: "center" }));
  await sleep(500);
  await page.click('#hostCar [data-car="1"]'); await sleep(900);
  ok((await page.$eval("#hostCar .car__dot:nth-child(2)", (e) => e.getAttribute("aria-current"))) === "true" && (await page.$eval("#hostCar .car__track", (e) => e.scrollLeft)) > 100, "host carousel: the next arrow shows photo 2");

  await page.evaluate(() => document.querySelector("#get").scrollIntoView());
  await sleep(500);
  await page.click("#dt3"); await sleep(800);
  ok((await page.$eval("#dt3", (e) => e.getAttribute("aria-expanded"))) === "true", "dialogue: item 3 opens");
  ok((await page.$eval("#dt1", (e) => e.getAttribute("aria-expanded"))) === "false", "dialogue: item 1 closes");
  ok(await page.$eval("#dp3 .bubble--a", (e) => !e.classList.contains("is-typing")), "dialogue: answer shown after typing");

  await page.evaluate(() => document.querySelector("#tickets").scrollIntoView());
  await sleep(400);
  await page.click('#tickets [data-payb="participant"]');
  await page.waitForFunction(() => document.querySelector("#pay-participant .paybox__qr").naturalWidth > 0, { timeout: 4000 });
  ok(await page.$eval("#pay-participant", (e) => !e.hidden && e.querySelector("[data-pay-link]").href === "https://pay.kaspi.kz/pay/k1vgbfns" && !!(e.querySelector(".paybox__qr").compareDocumentPosition(e.querySelector("[data-pay-link]")) & 4)), "card button 'Төлем' opens the Kaspi QR with the pay link under it");
  await page.click('#tickets [data-payb="participant"]');
  ok(await page.$eval("#pay-participant", (e) => e.hidden), "the card button closes the payment panel again");
  await page.click('#tickets a[data-pkg="dinner"]'); await sleep(600);
  ok(await page.$eval('input[name="pkg"][value="dinner"]', (e) => e.checked), "buy button preselects the Dinner package");

  const crm = []; // from here on form submissions are caught, so a test run never writes a lead into the live CRM
  await page.setRequestInterception(true);
  page.on("request", (r) => {
    if (r.url().includes("script.google.com")) { crm.push(r.postData() || ""); r.respond({ status: 200, contentType: "application/json", body: "{}" }); } else r.continue();
  });
  await page.evaluate(() => document.querySelector("#form").scrollIntoView());
  await sleep(500);
  await page.click("#submit"); await sleep(300);
  ok((await page.$$eval(".field.bad", (e) => e.length)) === 3, "empty form shows 3 field errors");
  await page.type("#f-name", "Ерлан Сапаров");
  await page.type("#f-phone", "87771234567");
  ok((await page.$eval("#f-phone", (e) => e.value)) === "+7 777 123 45 67", "phone mask formats the number");
  await page.select("#f-region", "zhetysu");
  await page.click("#submit"); await sleep(800);
  ok(await page.$eval("#ok", (e) => !e.hidden), "valid form shows the success screen");
  const lead = JSON.parse(crm[0] || "{}");
  ok(crm.length === 1 && lead.name === "Ерлан Сапаров" && lead.package === "Кешкі ас" && lead.region === "Жетісу облысы" && lead.translation === "Қазақша" && lead.phone === "+7 777 123 45 67", "the form sends one CRM lead with Kazakh labels: " + JSON.stringify(lead));
  ok((await page.$eval("#okPay", (e) => e.href)) === "https://pay.kaspi.kz/pay/k1vgbfns" && (await page.$eval("#okPayBox .paybox__sum b", (e) => e.textContent)).includes("30"), "success screen shows the amount, the QR and the Kaspi link");
  ok((await page.$eval("#okWa", (e) => e.href)).startsWith("https://wa.me/"), "WhatsApp message link is prepared");

  // videos: only one at a time
  await page.evaluate(() => document.querySelector("#about").scrollIntoView());
  await sleep(500);
  await page.click("#promoWrap .vid__play"); await sleep(1200);
  const promoPlaying = await page.$eval("#promo", (v) => !v.paused);
  ok(promoPlaying, "promo video plays on click");
  await page.evaluate(() => document.querySelector("#voices").scrollIntoView());
  await sleep(500);
  await page.click("#vrail .vcard:nth-child(1) .vid__play"); await sleep(1200);
  const states = await page.$$eval("video", (vs) => vs.map((v) => !v.paused));
  ok(states.filter(Boolean).length === 1, "only one video plays at a time");

  ok(errors.length === 0, "no JS errors on desktop" + (errors.length ? ": " + errors.join(" | ") : ""));
  await page.close();
}

/* ---------- promo video: nothing downloads before the click, and the page language's file plays ---------- */
{
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  const mp4 = [];
  page.on("request", (r) => { if (/\.mp4/.test(r.url())) mp4.push(r.url().split("/").pop()); });
  await page.goto(base + "/?lang=ru", { waitUntil: "networkidle2" });
  await sleep(800);
  ok(mp4.length === 0, "Russian page downloads no video before the click" + (mp4.length ? ": " + mp4.join(", ") : ""));
  await page.evaluate(() => document.querySelector("#promoWrap").scrollIntoView({ block: "center" }));
  await sleep(500);
  await page.click("#promoWrap .vid__play"); await sleep(1500);
  ok((await page.$eval("#promo", (v) => v.currentSrc)).endsWith("promo-ru.mp4"), "Russian page plays the Russian promo file");
  await page.close();
}

/* ---------- sector photo belt on phones: it runs to the left and the button pauses it ---------- */
{
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto(base + "/?lang=kk", { waitUntil: "networkidle2" });
  await page.evaluate(() => document.querySelector(".mosaic").scrollIntoView({ block: "center" }));
  await sleep(600);
  const belt = () => page.$eval("#mosaic", (m) => getComputedStyle(m).animationName + "/" + getComputedStyle(m).animationPlayState);
  const left = () => page.$eval("#mosaic .mz", (f) => f.getBoundingClientRect().left);
  ok((await belt()) === "belt/running", "phone: the sector photos run as a belt");
  const a = await left(); await sleep(700);
  ok((await left()) < a - 10, "phone: the belt moves to the left");
  await page.tap("#mzCtl"); await sleep(250);
  ok((await belt()) === "belt/paused", "phone: the pause button stops the belt");
  const b = await left(); await sleep(500);
  ok((await left()) === b, "phone: a paused belt stays still");
  await page.close();
}

/* ---------- phone ---------- */
{
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(base + "/?lang=kk", { waitUntil: "networkidle2" });
  await page.addStyleTag({ content: "html{scroll-behavior:auto!important}" });

  ok(await page.$eval("#menu", (e) => e.hidden), "menu is closed at load");
  await page.tap("#burger"); await sleep(500);
  ok(await page.$eval("#menu", (e) => !e.hidden), "burger opens the menu");
  ok((await page.$eval("#burger", (e) => e.getAttribute("aria-expanded"))) === "true", "burger becomes the X (aria-expanded)");
  ok((await page.$$eval("#menuLangs button", (b) => b.length)) === 5, "five language buttons inside the menu");
  const order = await page.evaluate(() => { const n = document.querySelector(".menu__nav").getBoundingClientRect().bottom, l = document.querySelector(".menu__lang").getBoundingClientRect().top; return l > n; });
  ok(order, "language switcher sits below the section links");
  await page.tap('#menuLangs [data-lang="ru"]'); await sleep(300);
  ok((await page.$eval("html", (e) => e.lang)) === "ru", "language switch inside the menu works");
  await page.tap("#burger"); await sleep(500);
  ok(await page.$eval("#menu", (e) => e.hidden), "X closes the menu");
  await page.tap("#burger"); await sleep(400);
  await page.tap('.menu__nav a[href="#register"]');
  let top = 9999;
  for (let i = 0; i < 20 && !(top < 140 && top > -60); i++) { await sleep(300); top = await page.$eval("#register", (e) => Math.round(e.getBoundingClientRect().top)); }
  ok(await page.$eval("#menu", (e) => e.hidden), "choosing a link closes the menu");
  ok(top < 140 && top > -60, "menu link scrolls to the section (top=" + top + ")");
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
  ok(!overflow, "no horizontal overflow on a phone");
  ok(errors.length === 0, "no JS errors on phone" + (errors.length ? ": " + errors.join(" | ") : ""));
  await page.close();
}

await browser.close();
console.log(fails ? `\n${fails} check(s) failed` : "\nAll checks passed");
process.exit(fails ? 1 : 0);
