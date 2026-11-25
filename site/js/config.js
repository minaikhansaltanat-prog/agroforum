/* Agroforum 2026: editable settings. Change values here, no other file needs touching. */
var KASPI = "https://pay.kaspi.kz/pay/k1vgbfns"; /* Kaspi merchant link of ИП "МАРХАБА": one link for every package, the payer types the amount */
window.AGRO = {
  /* Forum opening (Almaty time, UTC+5). Used by the countdown. */
  eventStart: "2026-12-03T09:30:00+05:00",

  /* WhatsApp number in international format, digits only. It is used only inside links, never printed on the page. */
  whatsapp: "77471673817",

  /* Google Apps Script web app of the CRM (agroforum2026.github.io/crm): every form submission becomes a lead there.
     The same URL is hard-coded in the CRM page. Leave it empty and the form still works, but nothing is stored. */
  sheetsUrl: "https://script.google.com/macros/s/AKfycbxh7JRw3gl9IMfSFOssaOZzRiCeKHKliwMcpMZJZENQi_r-jXo9TwjmVstYq-vr9D2s/exec",

  /* Kaspi payment link per package (QR image: img/kaspi-qr.png). It shows under the QR on the package cards and after the form.
     An empty value hides the "Төлем" button of that package. */
  pay: { participant: KASPI, dinner: KASPI, exhibition: KASPI, speaker: KASPI },

  /* Partner places: total and how many are still free. Edit "partnerLeft" by hand as places are sold. */
  partnerTotal: 20,
  partnerLeft: 20,

  /* Map links (2GIS and Yandex Maps, so they open from China as well). Replace with exact point links if needed. */
  maps: {
    gis: "https://2gis.kz/almaty/search/%D0%9A%D0%B0%D0%B7%D0%B0%D1%85%D1%81%D0%BA%D0%B8%D0%B9%20%D0%BD%D0%B0%D1%86%D0%B8%D0%BE%D0%BD%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9%20%D0%B0%D0%B3%D1%80%D0%B0%D1%80%D0%BD%D1%8B%D0%B9%20%D0%B8%D1%81%D1%81%D0%BB%D0%B5%D0%B4%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D1%81%D0%BA%D0%B8%D0%B9%20%D1%83%D0%BD%D0%B8%D0%B2%D0%B5%D1%80%D1%81%D0%B8%D1%82%D0%B5%D1%82",
    yandex: "https://yandex.kz/maps/162/almaty/search/%D0%9A%D0%B0%D0%B7%D0%B0%D1%85%D1%81%D0%BA%D0%B8%D0%B9%20%D0%BD%D0%B0%D1%86%D0%B8%D0%BE%D0%BD%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9%20%D0%B0%D0%B3%D1%80%D0%B0%D1%80%D0%BD%D1%8B%D0%B9%20%D0%B8%D1%81%D1%81%D0%BB%D0%B5%D0%B4%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D1%81%D0%BA%D0%B8%D0%B9%20%D1%83%D0%BD%D0%B8%D0%B2%D0%B5%D1%80%D1%81%D0%B8%D1%82%D0%B5%D1%82/"
  },

  /* Public site address (footer, links). */
  site: "https://agroforum-2026.vercel.app",

  /* Promo video by site language. Languages not listed use "ru". */
  promo: {
    kk: { src: "videos/promo-kk.mp4", poster: "img/poster-promo-kk-540.webp" },
    ru: { src: "videos/promo-ru.mp4", poster: "img/poster-promo-ru-540.webp" }
  },

  /* Speaker photos. When a photo arrives, put the file into site/img/speakers/ and add its path here.
     Keys: sp1..sp5 (KazNARU scientists), ss1 (special speaker), gs1, gs2 (guests). Without a photo, initials are shown. */
  speakerPhotos: {
    /* sp1: "img/speakers/sp1.webp", */
  },

  /* People in the three "organisers' address" videos, in the order of the cards. null = not known: the card keeps a general caption.
     Example: { name: "Аты-жөні", role: "Лауазымы" } (role is optional). A text can also be one text per language: { kk: "...", ru: "...", zh: "...", uz: "...", ky: "..." }. */
  videoPeople: [
    {
      name: "Расул Сәдуұлы",
      role: {
        kk: "Орталық Азия кәсіпкерлер қауымдастығының негізін қалаушы",
        ru: "Основатель Ассоциации предпринимателей Центральной Азии",
        zh: "中亚企业家协会创始人",
        uz: "Markaziy Osiyo Tadbirkorlari Assotsiatsiyasining asoschisi",
        ky: "Борбордук Азия Ишкерлер Ассоциациясынын негиздөөчүсү"
      }
    },
    {
      name: "Мұқашев Айтуған Адамқұлұлы",
      role: {
        kk: "Орталық Азия Кәсіпкерлері Қауымдастығы мен «KASIPKER» альянсының негізін қалаушылардың бірі",
        ru: "Один из основателей Ассоциации предпринимателей Центральной Азии и альянса «KASIPKER»",
        zh: "中亚企业家协会和“KASIPKER”联盟创始人之一",
        uz: "Markaziy Osiyo Tadbirkorlari Assotsiatsiyasi va “KASIPKER” alyansining asoschilaridan biri",
        ky: "Борбордук Азия Ишкерлер Ассоциациясынын жана «KASIPKER» альянсынын негиз салуучуларынын бири"
      }
    },
    {
      name: "Мұқашев Айтуған Адамқұлұлы",
      role: {
        kk: "Орталық Азия Кәсіпкерлері Қауымдастығы мен «KASIPKER» альянсының негізін қалаушылардың бірі",
        ru: "Один из основателей Ассоциации предпринимателей Центральной Азии и альянса «KASIPKER»",
        zh: "中亚企业家协会和“KASIPKER”联盟创始人之一",
        uz: "Markaziy Osiyo Tadbirkorlari Assotsiatsiyasi va “KASIPKER” alyansining asoschilaridan biri",
        ky: "Борбордук Азия Ишкерлер Ассоциациясынын жана «KASIPKER» альянсынын негиз салуучуларынын бири"
      }
    }
  ],

  /* Partner logos for the grid in "Organisers and partners". Example: [{ src: "img/partners/acme.webp", alt: "Acme" }] */
  partnerLogos: []
};
