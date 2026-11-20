# Product

<!-- impeccable:product-schema 1 -->

> Source: `TZ.md` (client spec, version 2), `assets/docs/packages-kk.docx`, the previous site in `current/`, and the user's brief. No interview was held (the spec is complete); facts below are taken from those files, and inferences are marked **(inferred)**.

## Platform

web

## Stack

Fixed by TZ.md section 8, not chosen: static HTML, CSS and JS in `site/`, no framework, no CDN and no Google services (the site must open from China). Fonts self-hosted. i18n through `data-i` keys and `l/{kk,ru,zh,uz,ky}.js`; Kazakh is the default language. Hosting target: Vercel project `agroforum-2026`; source repository: github.com/minaikhansaltanat-prog/agroforum.

## Users

- **Participants (250 seats):** working farmers, heads of peasant farms and agrofirm managers from Almaty, Zhetysu, Zhambyl and Turkistan regions and Almaty city. They decide on a phone (WhatsApp, Kaspi), mostly read Kazakh or Russian, and weigh 5 000 ₸ or 30 000 ₸ against a working day lost. **(inferred: phone-first, price-sensitive)**
- **Partner companies (20 slots):** suppliers of agricultural products, machinery, feed, veterinary products and technology who want ready buyers in one room.
- **Also reading:** scientists and students, akimat agriculture officials, entrepreneurs and investors from China, Uzbekistan, Kyrgyzstan, Korea and Turkey (they read the site in zh, uz, ky or ru).

## Product Purpose

A one-page site that sells the Agroforum on 3 December 2026 in Almaty (KazNARU, Abai Ave 8): "Topical problems of developing Kazakhstan's agriculture: a dialogue between science and practice". Success, in order: (1) sell 250 participant seats (Participant 5 000 ₸, Dinner 30 000 ₸); (2) sell 20 partner places (Exhibition 100 000 ₸, Speaker 150 000 ₸); (3) show the forum's level: foreign scientists, akimats, four regions. Measured by registrations, paid packages and partner applications.

## Positioning

The only room where a farmer can put a real problem to a scientist and see the supplier, the akimat specialist and the investor in the same day, with simultaneous translation in the user's language. After the forum, selected investment projects are accompanied up to negotiations with investors.

## Operating Context

One day, 3 December 2026 (guests arrive 2 December). Registration 08:30-09:30, opening 09:30, plenary 10:00-13:00, break and networking 13:00-14:30, three panel sessions 14:30-16:30, closing and awards 16:30-17:00, gala dinner at 18:30 (Dinner package only). Venue: Kazakh National Agrarian Research University, Almaty, Abai Ave 8. Organisers: the KASIPKER alliance and the Central Asia Entrepreneurs Association (CAEA); the venue and scientific partner is KazNARU.

## Capabilities and Constraints

- Packages: Participant 5 000 ₸; Dinner 30 000 ₸ (recommended); Exhibition 100 000 ₸; Speaker 150 000 ₸. Full contents in `assets/docs/packages-kk.docx`.
- Seats: 250 participants; 20 partner places (remaining count edited by hand).
- Registration form goes to Google Sheets (Apps Script webhook), then a Kaspi payment link or QR opens per package. **Links are not yet provided by the client.**
- No phone number is shown on the site, only a WhatsApp button (the number lives inside the link).
- Never write the word "free" (kk тегін / ru бесплатно / zh 免费 / uz bepul / ky акысыз) about participation; never "400 seats"; never "opening 09:00".
- Never use the long dash in Kazakh or translated text.
- Foreign guests' names are published only with their consent.
- Open facts the client still owes: domain, Kaspi links, the full name and position of the organiser in the first video (Rasul), a decision on the end card of videos 2 and 3 (it says free participation, 09:00 and a phone number, which contradicts the paid packages and the 09:30 opening), speaker photos, partner logos, dinner restaurant, refund terms.

## Brand Commitments

Three logos, all provided: KASIPKER (navy and gold with a Kazakh ornament), CAEA (gold star, navy lettering), KazNARU (green shield). Palette fixed by TZ section 3: cream #FBF8F1, white cards, #F3EEE2 bands, ink #0B1F3A, gold #C9A24A, green #2E7D4F, grey #4A5568. Fonts: Montserrat (headings 700-800) and Inter (text 400-600). Light, airy, editorial; rounded 16-20 px cards, soft shadows, SVG icons; no emoji, no multicolour gradient, nothing that looks machine-made. Dark navy only in the footer and at most one accent block.

## Evidence on Hand

- Photographs: `assets/photos/` (wheat field with mountains, herd, scientist in a greenhouse) and `Photo/` (12 pictures: horses, cattle, sheep, drip irrigation, solar irrigation, greenhouse robots, a tractor). No photograph of fish farming, of KazNARU, or of any speaker.
- Video: three organiser videos from `V/` (vertical 9:16, Kazakh subtitles: Rasul Saduuly, then Mukashev Aitugan Adamkululy twice), web versions in `site/videos/organizer-1..3.mp4` with posters; `assets/promo-kz.mp4` and `assets/promo-ru.mp4` (38-40 s, vertical).
- Documents: `assets/docs/programme-kk.pdf`, `assets/docs/packages-kk.docx`.
- Speakers on record: five KazNARU scientists with talk titles; special speakers and honoured guests were **invited, not confirmed**.
- **Absent, must not be invented:** testimonials, past-event statistics, partner logos, reviews, press, prices beyond the four above.

## Product Principles

1. Every block answers a buyer's question and ends in an action: reserve a seat, take a package, become a partner.
2. The dialogue between science and practice is the product; show both voices, never only the stage.
3. Price and what it includes are always visible together; scarcity is stated only as the true numbers (250 seats, 20 places).
4. The page works in five languages at the same quality; no language is a leftover.
5. It must be fast and complete on a mid-range phone on a weak network, including from China.

## Accessibility & Inclusion

Contrast 4.5:1, touch targets at least 44 px, visible focus, labelled form fields, `prefers-reduced-motion` honoured, no horizontal scroll from 360 px. Five scripts and languages (Kazakh Cyrillic, Russian, Simplified Chinese, Uzbek Latin, Kyrgyz Cyrillic) must fit every component without clipping.
