/* Agroforum 2026 */
(function () {
  "use strict";
  var C = window.AGRO || {};
  var root = document.documentElement;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var LANGS = [["kk", "ҚАЗ", "Қазақша"], ["ru", "РУС", "Русский"], ["zh", "中文", "中文"], ["uz", "OʻZ", "Oʻzbekcha"], ["ky", "КЫР", "Кыргызча"]];
  var PKG = { participant: ["pk1_name", "5 000 ₸"], dinner: ["pk2_name", "30 000 ₸"], exhibition: ["pc1_name", "100 000 ₸"], speaker: ["pc2_name", "150 000 ₸"] };
  var L = "kk";

  /* ---------- analytics (Vercel Analytics custom events) ---------- */
  window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
  function track(name, data) { try { window.va("event", data ? { name: name, data: data } : { name: name }); } catch (e) {} }

  /* ---------- i18n ---------- */
  function tr(k) {
    var D = (window.I18N || {})[L] || {}, K = (window.I18N || {}).kk || {};
    return D[k] != null ? D[k] : (K[k] != null ? K[k] : k);
  }
  function meta(sel, attr, val) { var m = $(sel); if (m) m.setAttribute(attr, val); }
  var OGL = { kk: "kk_KZ", ru: "ru_RU", zh: "zh_CN", uz: "uz_UZ", ky: "ky_KG" };

  function initials(name) {
    var w = String(name).replace(/[«»"“”]/g, "").trim().split(/\s+/);
    return ((w[0] || "")[0] || "") + ((w[1] || "")[0] || "");
  }

  /* Kazakh text of a key: the CRM stores Kazakh labels whatever language the visitor reads */
  function kk(key) { return ((window.I18N || {}).kk || {})[key] || ""; }
  function kkOpt(sel) { var o = sel.options[sel.selectedIndex]; return sel.value && o ? kk(o.getAttribute("data-i")) || o.text : ""; }

  function renderAvatars() {
    $$(".sp__av[data-ini]").forEach(function (av) {
      var card = av.closest("article");
      var h = card && $("h4[data-i]", card);
      if (!h) return;
      var key = h.getAttribute("data-i").replace(/n$/, "");
      var photo = (C.speakerPhotos || {})[key];
      if (photo) { av.innerHTML = '<img src="' + photo + '" alt="' + h.textContent.replace(/"/g, "") + '" loading="lazy" width="128" height="128">'; }
      else { av.textContent = initials(h.textContent).toUpperCase(); }
    });
  }

  function renderSlots() {
    var total = +C.partnerTotal || 20, left = Math.max(0, Math.min(total, +C.partnerLeft));
    if (isNaN(left)) left = total;
    var txt = left === total ? tr("c_all") : tr("c_left");
    $("#slotsTxt").textContent = txt.replace("{n}", left).replace("{t}", total);
    var bar = $("#slotsBar"), h = "";
    for (var i = 0; i < total; i++) h += '<i class="' + (i < left ? "" : "x") + '"></i>';
    bar.style.gridTemplateColumns = "repeat(" + total + ",1fr)";
    bar.innerHTML = h;
  }

  function renderCar() {
    $$(".car__dot").forEach(function (d, i) { d.setAttribute("aria-label", tr("car_dot").replace("{n}", i + 1)); });
  }

  function waLink(text) { return "https://wa.me/" + C.whatsapp + "?text=" + encodeURIComponent(text); }

  function setPromo() {
    var v = $("#promo"); if (!v) return;
    var p = (C.promo || {})[L] || (C.promo || {}).ru || (C.promo || {}).kk;
    if (!p) return;
    var src = $("source", v);
    if (src.getAttribute("src") === p.src) return;
    var was = !v.paused; if (was) v.pause();
    src.setAttribute("src", p.src); v.setAttribute("poster", p.poster);
    if (!v.readyState && !was) { v.dataset.stale = "1"; return; } /* never played: load() here would download the file despite preload="none"; start() reloads on the first play */
    delete v.dataset.stale; v.load(); var fig = v.closest(".vid"); if (fig) fig.classList.remove("is-playing", "is-paused");
  }

  function apply(lang, initial) {
    L = (window.I18N && window.I18N[lang]) ? lang : "kk";
    root.lang = L === "zh" ? "zh-Hans" : L;
    document.title = tr("title");
    meta('meta[name="description"]', "content", tr("desc"));
    meta('meta[property="og:title"]', "content", tr("h_full"));
    meta('meta[property="og:description"]', "content", tr("og_desc"));
    meta('meta[property="og:locale"]', "content", OGL[L]);
    if (!(initial && L === "kk")) {            // the Kazakh text is already written into the HTML (scripts/prerender.mjs)
      $$("[data-i]").forEach(function (e) { var v = tr(e.getAttribute("data-i")); if (e.innerHTML !== v) e.innerHTML = v; });
      $$("[data-ip]").forEach(function (e) { e.placeholder = tr(e.getAttribute("data-ip")); });
      $$("[data-ia]").forEach(function (e) { e.setAttribute("aria-label", tr(e.getAttribute("data-ia"))); });
      $$("[data-alt]").forEach(function (e) { e.alt = tr(e.getAttribute("data-alt")); });
      $$("[data-iw]").forEach(function (e) { e.setAttribute("data-w", tr(e.getAttribute("data-iw"))); });
      $$("[data-ul]").forEach(function (ul) { var a = tr(ul.getAttribute("data-ul")); ul.innerHTML = (Array.isArray(a) ? a : []).map(function (x) { return "<li>" + x + "</li>"; }).join(""); });
    }
    // language controls
    $("#langCur").textContent = LANGS.filter(function (x) { return x[0] === L; })[0][1];
    $("#langList").innerHTML = LANGS.map(function (x) { return '<li><button type="button" data-lang="' + x[0] + '" aria-current="' + (x[0] === L) + '">' + x[2] + '<svg class="i i--s"><use href="#i-check"/></svg></button></li>'; }).join("");
    $("#menuLangs").innerHTML = LANGS.map(function (x) { return '<button type="button" data-lang="' + x[0] + '" aria-pressed="' + (x[0] === L) + '" lang="' + x[0] + '">' + x[2] + "</button>"; }).join("");
    // interpretation language default follows site language
    var sel = $("#f-lang"); if (sel && !sel.dataset.touched) sel.value = L;
    if (!(initial && L === "kk")) renderAvatars();
    renderSlots(); setPromo(); renderPeople(); renderCar();
    var burger = $("#burger");
    burger.setAttribute("aria-label", tr(root.classList.contains("menu-open") ? "n_menu_close" : "n_menu_open"));
    ["#waHelp", "#waFaq", "#waFoot"].forEach(function (s) { var e = $(s); if (e) e.href = waLink(tr("wa_hello")); });
    updateOkLinks();
  }

  function detect() {
    var ok = { kk: 1, ru: 1, zh: 1, uz: 1, ky: 1 };
    var q = new URLSearchParams(location.search).get("lang");
    if (q && ok[q]) return q;
    try { var s = localStorage.getItem("lang"); if (s && ok[s]) return s; } catch (e) {}
    return "kk"; /* Kazakh is the main language; other languages only by the visitor's own choice */
  }

  function loadLang(l, cb) {
    if (window.I18N[l]) return cb();
    var s = document.createElement("script");
    s.src = "l/" + l + ".js"; s.onload = cb; s.onerror = cb;
    document.head.appendChild(s);
  }

  function setLang(l) {
    loadLang(l, function () { setLangNow(l); });
  }

  function setLangNow(l) {
    apply(l);
    try { localStorage.setItem("lang", L); } catch (e) {}
    try { var u = new URL(location.href); u.searchParams.set("lang", L); history.replaceState(null, "", u); } catch (e) {}
    track("lang_change", { lang: L });
  }

  /* ---------- header ---------- */
  var nav = $("#nav");
  var ticking = false;
  function onScroll() {
    if (ticking) return; ticking = true;
    requestAnimationFrame(function () {
      ticking = false;
      var y = window.scrollY || 0;
      nav.classList.toggle("is-stuck", y > 8);
      parallax(y); timeline(); sticky(y);
    });
  }

  /* language dropdown */
  var langBtn = $("#langBtn"), langList = $("#langList");
  function langToggle(open) {
    langList.hidden = !open; langBtn.setAttribute("aria-expanded", open ? "true" : "false");
    if (open) { var cur = $('[aria-current="true"]', langList); if (cur) cur.focus(); }
  }
  langBtn.addEventListener("click", function () { langToggle(langList.hidden); });
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-lang]");
    if (b) { setLang(b.getAttribute("data-lang")); if (!langList.hidden) { langToggle(false); langBtn.focus(); } return; }
    if (!langList.hidden && !e.target.closest("#lang")) langToggle(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (!langList.hidden) { langToggle(false); langBtn.focus(); }
      if (root.classList.contains("menu-open")) { setMenu(false); $("#burger").focus(); }
    }
  });

  /* ---------- full-screen menu with X button ---------- */
  var burger = $("#burger"), menu = $("#menu");
  var inertEls = [$("#main"), $(".foot"), $("#sticky")];
  function setMenu(open) {
    if (open === root.classList.contains("menu-open")) return;
    if (open) {
      menu.hidden = false; menu.classList.remove("is-closing");
      $$(".menu__nav a", menu).forEach(function (a, i) { a.style.setProperty("--i", i); });
      root.classList.add("menu-open");
      burger.setAttribute("aria-expanded", "true"); burger.setAttribute("aria-label", tr("n_menu_close"));
      inertEls.forEach(function (el) { if (el) el.inert = true; });
      menu.scrollTop = 0;
      track("menu_open");
    } else {
      root.classList.remove("menu-open");
      burger.setAttribute("aria-expanded", "false"); burger.setAttribute("aria-label", tr("n_menu_open"));
      inertEls.forEach(function (el) { if (el) el.inert = false; });
      menu.classList.add("is-closing");
      setTimeout(function () { if (!root.classList.contains("menu-open")) { menu.hidden = true; menu.classList.remove("is-closing"); } }, reduce ? 0 : 220);
    }
  }
  burger.addEventListener("click", function () { setMenu(!root.classList.contains("menu-open")); });
  function goTo(el) {
    // scroll to a section and re-check after layout settles (sections below the fold render lazily)
    var n = 0;
    (function step() {
      var off = parseFloat(getComputedStyle(root).scrollPaddingTop) || 0;
      var y = el.getBoundingClientRect().top + (window.scrollY || 0) - off;
      window.scrollTo({ top: Math.max(0, y), behavior: n === 0 && !reduce ? "smooth" : "auto" });
      if (++n < 5) setTimeout(function () { if (Math.abs(el.getBoundingClientRect().top - off) > 4) step(); }, n === 1 ? 800 : 300);
    })();
  }
  document.addEventListener("click", function (e) {
    var a = e.target.closest("a[href^='#']");
    if (!a || a.getAttribute("href") === "#" || e.defaultPrevented || e.metaKey || e.ctrlKey) return;
    var t = $(a.getAttribute("href"));
    if (!t) return;
    e.preventDefault();
    if (root.classList.contains("menu-open")) setMenu(false);
    if (a.hasAttribute("data-pkg")) selectPkg(a.getAttribute("data-pkg"));
    setTimeout(function () { goTo(t); try { history.pushState(null, "", a.getAttribute("href")); } catch (x) {} }, root.classList.contains("menu-open") ? 60 : 0);
  });
  // focus trap: burger + menu content
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Tab" || !root.classList.contains("menu-open")) return;
    var f = [burger].concat($$("a[href], button", menu).filter(function (x) { return x.offsetParent !== null; }));
    var first = f[0], last = f[f.length - 1], act = document.activeElement;
    if (e.shiftKey && act === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && act === last) { e.preventDefault(); first.focus(); }
  });
  window.addEventListener("resize", function () { if (window.innerWidth >= 1120 && root.classList.contains("menu-open")) setMenu(false); });

  /* ---------- countdown ---------- */
  var T = new Date(C.eventStart || "2026-12-03T09:30:00+05:00").getTime();
  function pad(n) { return String(n).padStart(2, "0"); }
  var cdEls = { d: $("#cd-d"), h: $("#cd-h"), m: $("#cd-m"), s: $("#cd-s") };
  function tick() {
    var d = Math.max(0, T - Date.now()) / 1000;
    cdEls.d.textContent = pad(Math.floor(d / 86400));
    cdEls.h.textContent = pad(Math.floor(d % 86400 / 3600));
    cdEls.m.textContent = pad(Math.floor(d % 3600 / 60));
    cdEls.s.textContent = pad(Math.floor(d % 60));
  }
  tick(); setInterval(tick, 1000);

  /* ---------- reveal, counters, scrollspy ---------- */
  var hero = $(".hero");
  var io = "IntersectionObserver" in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      var n = e.target.getAttribute("data-n");
      if (n) countUp(e.target, +n);
      io.unobserve(e.target);
    });
  }, { threshold: 0.14, rootMargin: "0px 0px -6% 0px" }) : null;
  function countUp(el, n) {
    if (reduce) { el.textContent = n; return; }
    var t0 = performance.now(), dur = 1500;
    (function step(t) {
      var k = Math.min(1, (t - t0) / dur);
      el.textContent = Math.round(n * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(step);
    })(t0);
  }
  $$("[data-n]").forEach(function (el) { if (io && !reduce) el.textContent = "0"; });
  if (io) { $$(".rv,[data-n],.tl__item").forEach(function (el) { io.observe(el); }); } else { $$(".rv").forEach(function (el) { el.classList.add("in"); }); }

  var secs = $$("main section[id]");
  var links = {}; $$(".nav__links a").forEach(function (a) { links[a.getAttribute("href").slice(1)] = a; });
  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        Object.keys(links).forEach(function (k) { links[k].classList.toggle("is-on", k === e.target.id); });
      });
    }, { rootMargin: "-42% 0px -52% 0px" });
    secs.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- hero: entrance + parallax ---------- */
  var par = $$("[data-par]"), parOn = false;
  if ("IntersectionObserver" in window && hero) {
    new IntersectionObserver(function (es) { parOn = es[0].isIntersecting; }, { threshold: 0 }).observe(hero);
  }
  function parallax(y) {
    if (reduce || !parOn || window.innerWidth < 960) return;
    par.forEach(function (f) { f.style.setProperty("--py", (-y * parseFloat(f.getAttribute("data-par"))).toFixed(1) + "px"); });
  }

  /* ---------- programme timeline progress ---------- */
  var tl = $("#tl");
  function timeline() {
    if (!tl) return;
    var r = tl.getBoundingClientRect(), vh = window.innerHeight;
    var p = (vh * 0.62 - r.top) / r.height;
    tl.style.setProperty("--p", Math.max(0, Math.min(1, p)).toFixed(3));
  }

  /* ---------- sticky mobile CTA ---------- */
  var stickyEl = $("#sticky"), regSec = $("#register"), foot = $(".foot"), hideSticky = false;
  if ("IntersectionObserver" in window) {
    var hs = new IntersectionObserver(function (es) {
      es.forEach(function (e) { e.target._in = e.isIntersecting; });
      hideSticky = (regSec && regSec._in) || (foot && foot._in);
      sticky(window.scrollY || 0);
    }, { threshold: 0.12 });
    [regSec, foot].forEach(function (el) { if (el) hs.observe(el); });
  }
  function sticky(y) {
    var show = y > (hero ? hero.offsetHeight * 0.7 : 600) && !hideSticky && !root.classList.contains("menu-open");
    stickyEl.classList.toggle("show", show);
    stickyEl.setAttribute("aria-hidden", show ? "false" : "true");
    var b = $(".btn", stickyEl); if (b) b.tabIndex = show ? 0 : -1;
  }

  /* ---------- "what you get": dialogue ---------- */
  var dlg = $("#dlg"), items = $$(".dlg__item", dlg), wide = window.matchMedia("(min-width: 960px)");
  function openItem(it, user) {
    var willOpen = it.getAttribute("data-open") !== "true";
    items.forEach(function (x) {
      var on = x === it ? (wide.matches ? true : willOpen) : false;
      x.setAttribute("data-open", on ? "true" : "false");
      $(".dlg__btn", x).setAttribute("aria-expanded", on ? "true" : "false");
    });
    var open = it.getAttribute("data-open") === "true";
    if (open && user && !reduce) {
      var b = $(".bubble--a", it); b.classList.add("is-typing");
      setTimeout(function () { b.classList.remove("is-typing"); }, 520);
    }
    if (user && open) track("dialogue_open", { n: items.indexOf(it) + 1 });
  }
  items.forEach(function (it) {
    $(".dlg__btn", it).addEventListener("click", function () { openItem(it, true); });
    $(".dlg__btn", it).addEventListener("keydown", function (e) {
      var i = items.indexOf(it), k = e.key, n = null;
      if (k === "ArrowDown") n = items[(i + 1) % items.length]; else if (k === "ArrowUp") n = items[(i - 1 + items.length) % items.length];
      else if (k === "Home") n = items[0]; else if (k === "End") n = items[items.length - 1];
      if (n) { e.preventDefault(); $(".dlg__btn", n).focus(); }
    });
  });
  wide.addEventListener && wide.addEventListener("change", function () {
    if (wide.matches && !items.some(function (x) { return x.getAttribute("data-open") === "true"; })) openItem(items[0], false);
  });

  /* ---------- videos: one at a time ---------- */
  function pauseOthers(cur) { $$("video").forEach(function (v) { if (v !== cur && !v.paused) v.pause(); }); }
  $$(".vid").forEach(function (fig) {
    var v = $("video", fig), playBtn = $(".vid__play", fig), pp = $('[data-act="pp"]', fig), mu = $('[data-act="mute"]', fig), bar = $(".vid__bar i", fig), barBox = $(".vid__bar", fig);
    function start() { pauseOthers(v); v.preload = "auto"; if (v.dataset.stale) { delete v.dataset.stale; v.load(); } var p = v.play(); if (p && p.catch) p.catch(function () {}); }
    playBtn.addEventListener("click", function () { v.muted = false; setMuteIcon(); start(); track("video_play", { src: ($("source", v).getAttribute("src") || "").split("/").pop() }); });
    pp.addEventListener("click", function () { if (v.paused) start(); else v.pause(); });
    v.addEventListener("click", function () { if (fig.classList.contains("is-playing")) v.pause(); });
    function setMuteIcon() { var u = $("use", mu); u.setAttribute("href", v.muted ? "#i-mute" : "#i-vol"); }
    mu.addEventListener("click", function () { v.muted = !v.muted; setMuteIcon(); });
    v.addEventListener("play", function () { fig.classList.add("is-playing"); fig.classList.remove("is-paused"); $("use", pp).setAttribute("href", "#i-pause"); });
    v.addEventListener("pause", function () { if (v.ended) return; fig.classList.remove("is-playing"); fig.classList.add("is-paused"); });
    v.addEventListener("ended", function () { fig.classList.remove("is-playing", "is-paused"); bar.style.transform = "scaleX(0)"; v.load(); });
    v.addEventListener("timeupdate", function () { if (v.duration) bar.style.transform = "scaleX(" + (v.currentTime / v.duration).toFixed(4) + ")"; });
    barBox.addEventListener("click", function (e) { var r = barBox.getBoundingClientRect(); if (v.duration) v.currentTime = v.duration * Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)); });
    if ("IntersectionObserver" in window) new IntersectionObserver(function (es) { if (!es[0].isIntersecting && !v.paused) v.pause(); }, { threshold: 0.2 }).observe(fig);
  });

  /* ---------- packages and form ---------- */
  var form = $("#form");
  function selectPkg(k) {
    var r = $('input[name="pkg"][value="' + k + '"]', form);
    if (r) { r.checked = true; }
  }
  document.addEventListener("click", function (e) {
    var a = e.target.closest("[data-pkg]");
    if (a) { selectPkg(a.getAttribute("data-pkg")); track("package_select", { pkg: a.getAttribute("data-pkg") }); }
    var t = e.target.closest("[data-track]");
    if (t) track(t.getAttribute("data-track"));
  });

  /* "Төлем" on a package card opens the Kaspi QR with the payment link under it */
  $$("[data-payb]").forEach(function (b) {
    var box = document.getElementById(b.getAttribute("aria-controls")), link = (C.pay || {})[b.getAttribute("data-payb")];
    if (!link) { b.hidden = true; return; }
    $("[data-pay-link]", box).href = link;
    b.addEventListener("click", function () {
      var open = box.hidden;
      box.hidden = !open;
      b.setAttribute("aria-expanded", open ? "true" : "false");
      if (open) { track("pay_open", { pkg: b.getAttribute("data-payb") }); box.scrollIntoView({ block: "nearest", behavior: reduce ? "auto" : "smooth" }); }
    });
  });

  var phone = $("#f-phone");
  phone.addEventListener("input", function () {
    var v = phone.value, d = v.replace(/\D/g, "");
    if (/^\+(?!7)/.test(v.trim())) return;                       // foreign number: leave as typed
    if (!d) { phone.value = ""; return; }
    if (d[0] === "8") d = "7" + d.slice(1);
    if (d[0] !== "7") d = "7" + d;
    d = d.slice(0, 11);
    var out = "+7";
    if (d.length > 1) out += " " + d.slice(1, 4);
    if (d.length > 4) out += " " + d.slice(4, 7);
    if (d.length > 7) out += " " + d.slice(7, 9);
    if (d.length > 9) out += " " + d.slice(9, 11);
    phone.value = out;
  });
  $("#f-lang").addEventListener("change", function () { this.dataset.touched = "1"; });
  function mark(id, ok) { var f = $("#" + id).closest(".field"); f.classList.toggle("bad", !ok); return ok; }
  ["f-name", "f-phone", "f-region"].forEach(function (id) { $("#" + id).addEventListener("input", function () { this.closest(".field").classList.remove("bad"); }); });
  $("#f-region").addEventListener("change", function () { this.closest(".field").classList.remove("bad"); });

  function updateOkLinks() {
    if (!form) return;
    var pkg = ($('input[name="pkg"]:checked', form) || {}).value || "participant";
    var nm = ($("#f-name") || {}).value || "";
    var msg = tr("wa_hello") + "\n" + tr("f_pk") + ": " + tr(PKG[pkg][0]) + " (" + PKG[pkg][1] + ")" + (nm ? "\n" + nm : "");
    var w = $("#okWa"); if (w) w.href = waLink(msg);
    var link = (C.pay || {})[pkg], box = $("#okPayBox");
    if (box) { box.hidden = !link; if (link) { $("#okPay").href = link; $("#okSum").textContent = PKG[pkg][1]; } }
    var okP = $("#okP"); if (okP) { var k = link ? "ok_p" : "ok_p2"; okP.setAttribute("data-i", k); okP.innerHTML = tr(k); }
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if ($('input[name="website"]', form).value) return;           // honeypot
    var name = $("#f-name").value.trim(), ph = $("#f-phone").value, digits = ph.replace(/\D/g, "");
    var ok1 = mark("f-name", name.length > 1), ok2 = mark("f-phone", digits.length >= 10), ok3 = mark("f-region", !!$("#f-region").value);
    if (!(ok1 && ok2 && ok3)) { var bad = $(".field.bad input, .field.bad select", form); if (bad) bad.focus(); return; }
    var pkg = $('input[name="pkg"]:checked', form).value;
    var fl = $("#f-lang");   /* keys and Kazakh labels exactly as the CRM's Apps Script reads them (agroforum2026.github.io/crm) */
    var payload = {
      time: new Date().toISOString(), name: name, phone: ph.trim(), region: kkOpt($("#f-region")), industry: kkOpt($("#f-sector")),
      package: kk(PKG[pkg][0]), translation: fl.options[fl.selectedIndex].text, question: $("#f-q").value.trim(), site_lang: L
    };
    var btn = $("#submit"); btn.disabled = true; var lab = $("span", btn); var old = lab.textContent; lab.textContent = tr("f_sending");
    function done() {
      updateOkLinks();
      $("#fbody").hidden = true; var ok = $("#ok"); ok.hidden = false; ok.focus();
      ok.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
      track("form_submit", { pkg: pkg, lang: L });
    }
    if (!C.sheetsUrl) { console.warn("AGRO.sheetsUrl is empty: the submission was not stored.", payload); done(); return; }
    fetch(C.sheetsUrl, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(payload) })
      .then(done)
      .catch(function () { btn.disabled = false; lab.textContent = old; var f = $(".form__note span", form); f.textContent = tr("f_fail"); f.parentNode.style.color = "var(--err)"; });
  });

  /* ---------- links from config ---------- */
  var g = $("#mapGis"), y = $("#mapYa");
  if (g && C.maps) g.href = C.maps.gis; if (y && C.maps) y.href = C.maps.yandex;

  /* ---------- partner logo slots ---------- */
  (function () {
    var box = $(".pslots"), logos = C.partnerLogos || [];
    if (!box || !logos.length) return;
    var slot = '<a class="pslot" href="#partners" data-track="slot_partner"><svg class="i"><use href="#i-plus"/></svg><span data-i="o_p_slot"></span></a>';
    var cells = logos.map(function (l) { return '<div class="pslot pslot--logo"><img src="' + l.src + '" alt="' + (l.alt || "") + '" loading="lazy"></div>'; });
    var total = Math.max(4, Math.ceil((logos.length + 1) / 4) * 4);
    while (cells.length < total) cells.push(slot);
    box.innerHTML = cells.join("");
  })();

  /* names under the organiser videos (config.js): one text for every language, or one text per language */
  function renderPeople() {
    var ppl = C.videoPeople || [];
    function pick(v) { return v && typeof v === "object" ? (v[L] || v.kk || "") : v || ""; }
    $$(".vcard").forEach(function (c, i) {
      var p = ppl[i];
      if (!p) return;
      $(".vcard__name", c).textContent = pick(p.name);
      var r = $(".vcard__role", c), role = pick(p.role); r.textContent = role; r.hidden = !role;
    });
  }

  /* sector photos: on phones they run as an endless belt (CSS animation over a doubled set of tiles); touching and holding the
     strip or the button pauses it. With reduced motion the strip stays a swipe rail, which then needs keyboard access. */
  (function () {
    var sec = $(".mosaic"), m = $("#mosaic"), btn = $("#mzCtl");
    if (!sec || !m) return;
    $$(".mz", m).forEach(function (f) {
      var c = f.cloneNode(true);
      c.classList.remove("rv"); c.classList.add("mz--clone"); c.removeAttribute("style"); c.setAttribute("aria-hidden", "true");
      m.appendChild(c);
    });
    var phone = window.matchMedia("(max-width: 899px)"), still = window.matchMedia("(prefers-reduced-motion: reduce)");
    function rail() { if (phone.matches && still.matches) m.setAttribute("tabindex", "0"); else m.removeAttribute("tabindex"); }
    rail();
    [phone, still].forEach(function (q) { if (q.addEventListener) q.addEventListener("change", rail); else q.addListener(rail); });
    function hold(on) { sec.classList.toggle("is-held", on); }
    m.addEventListener("pointerdown", function () { hold(true); });
    ["pointerup", "pointercancel", "pointerleave"].forEach(function (e) { m.addEventListener(e, function () { hold(false); }); });
    if (btn) btn.addEventListener("click", function () {
      var k = sec.classList.toggle("is-paused") ? "mz_play" : "mz_pause";
      btn.setAttribute("data-ia", k); btn.setAttribute("aria-label", tr(k));
    });
  })();

  /* host photos: a scroll-snap track (swipe, wheel, keys) with arrows and dots; no autoplay */
  (function () {
    var car = $("#hostCar"); if (!car) return;
    var track = $(".car__track", car), dots = $$(".car__dot", car), n = dots.length, cur = 0;
    function mark() { dots.forEach(function (d, i) { if (i === cur) d.setAttribute("aria-current", "true"); else d.removeAttribute("aria-current"); }); }
    function go(i) { cur = (i + n) % n; mark(); track.scrollTo({ left: cur * track.clientWidth, behavior: reduce ? "auto" : "smooth" }); }
    track.addEventListener("scroll", function () { var i = Math.round(track.scrollLeft / track.clientWidth); if (i !== cur && i >= 0 && i < n) { cur = i; mark(); } }, { passive: true });
    $$("[data-car]", car).forEach(function (b) { b.addEventListener("click", function () { go(cur + (+b.getAttribute("data-car"))); }); });
    dots.forEach(function (d, i) { d.addEventListener("click", function () { go(i); }); });
    track.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.preventDefault(); go(cur + 1); } else if (e.key === "ArrowLeft") { e.preventDefault(); go(cur - 1); }
    });
  })();

  /* ---------- go ---------- */
  var first = detect();
  loadLang(first, function () {
    apply(first, true);
    root.classList.remove("lang-wait");
    if (hero) requestAnimationFrame(function () { hero.classList.add("is-in"); });
  });
  if (location.hash.length > 1) window.addEventListener("load", function () { var t = $(location.hash); if (t) setTimeout(function () { goTo(t); }, 300); });
  setTimeout(function () { root.classList.remove("lang-wait"); if (hero) hero.classList.add("is-in"); }, 2500);

  /* speaker video posters load when the rail comes near the screen */
  (function () {
    var vs = $$("video[data-poster]");
    function set(v) { if (v.dataset.poster) { v.poster = v.dataset.poster; v.removeAttribute("data-poster"); } }
    if (!("IntersectionObserver" in window)) { vs.forEach(set); return; }
    var po = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { set(e.target); po.unobserve(e.target); } }); }, { rootMargin: "800px 0px" });
    vs.forEach(function (v) { po.observe(v); });
  })();
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
