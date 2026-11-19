/* Agroforum 2026: editable settings. Change values here, no other file needs touching. */
window.AGRO = {
  /* Forum opening (Almaty time, UTC+5). Used by the countdown. */
  eventStart: "2026-12-03T09:30:00+05:00",

  /* WhatsApp number in international format, digits only. It is used only inside links, never printed on the page. */
  whatsapp: "77471673817",

  /* Google Apps Script web app URL that stores form submissions in Google Sheets.
     Paste the "Web app" deployment URL here (see docs/google-apps-script.gs). */
  sheetsUrl: "",

  /* Kaspi payment links (or QR pages), one per package. After the form is sent, the matching link opens. */
  pay: { participant: "", dinner: "", exhibition: "", speaker: "" },

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

  /* Names of the people in the four "speaker address" videos. Fill in when the client provides them.
     Example: { name: "Аты-жөні", role: "Лауазымы" } (same text for every language). */
  videoPeople: [null, null, null, null],

  /* Partner logos for the grid in "Organisers and partners". Example: [{ src: "img/partners/acme.webp", alt: "Acme" }] */
  partnerLogos: []
};
