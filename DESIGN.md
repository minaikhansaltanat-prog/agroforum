---
name: Agroforum 2026
description: A warm cream landing page where a farmer's question and a scientist's answer carry the whole conversation.
colors:
  cream: "#FBF8F1"
  white: "#FFFFFF"
  sand: "#F3EEE2"
  sand-deep: "#E8E0CC"
  ink: "#0B1F3A"
  ink-soft: "#2B3D57"
  grey: "#4A5568"
  gold: "#C9A24A"
  gold-hi: "#D6B25F"
  gold-lo: "#B38B33"
  gold-deep: "#7C5C14"
  gold-soft: "#F3E6C2"
  gold-wash: "#FBF3DD"
  green: "#2E7D4F"
  green-deep: "#1F5C39"
  green-soft: "#E1F0E6"
  navy-soft: "#E9EEF6"
  error: "#B3402F"
typography:
  hero-title:
    fontFamily: "Montserrat, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif"
    fontSize: "clamp(1.7rem, 1.02rem + 2.1vw, 2.85rem)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  section-title:
    fontFamily: "Montserrat, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif"
    fontSize: "clamp(1.75rem, 1.15rem + 2.35vw, 3rem)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.026em"
  stat-number:
    fontFamily: "Montserrat, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 1.6rem + 3.6vw, 4.4rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.035em"
  price:
    fontFamily: "Montserrat, system-ui, sans-serif"
    fontSize: "clamp(2.7rem, 2rem + 2.6vw, 3.8rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Montserrat, system-ui, sans-serif"
    fontSize: "1.15rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  lead:
    fontFamily: "Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif"
    fontSize: "clamp(1.06rem, 1rem + 0.38vw, 1.26rem)"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
  bubble:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.35
  button:
    fontFamily: "Montserrat, system-ui, sans-serif"
    fontSize: "0.98rem"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "0.005em"
  chip:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.76rem"
    fontWeight: 600
    lineHeight: 1.1
rounded:
  sm: "12px"
  md: "20px"
  lg: "28px"
  photo: "26px"
  bubble: "18px"
  field: "14px"
  pill: "999px"
spacing:
  gutter: "clamp(16px, 4.4vw, 36px)"
  section-y: "clamp(72px, 9.5vw, 136px)"
  wrap-max: "1240px"
  nav-h-phone: "68px"
  nav-h-wide: "76px"
  card-pad: "18px 22px"
  card-gap: "12px 16px"
components:
  button-gold:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0 26px"
    height: "52px"
  button-gold-hover:
    backgroundColor: "{colors.gold-hi}"
  button-ghost:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    height: "52px"
  button-outline:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    height: "52px"
  button-outline-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
  button-navy:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    height: "52px"
  button-whatsapp:
    backgroundColor: "{colors.green}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    height: "52px"
  chip-green:
    backgroundColor: "{colors.green-soft}"
    textColor: "{colors.green-deep}"
    typography: "{typography.chip}"
    rounded: "{rounded.pill}"
    padding: "6px 12px"
  chip-sand:
    backgroundColor: "{colors.sand}"
    textColor: "{colors.grey}"
    rounded: "{rounded.pill}"
    padding: "6px 12px"
  chip-gold:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "6px 12px"
  card:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "18px"
  pass:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
  pass-recommended-top:
    backgroundColor: "{colors.gold-wash}"
  bubble-question:
    backgroundColor: "{colors.sand}"
    textColor: "{colors.ink-soft}"
    rounded: "20px 20px 20px 6px"
    padding: "12px 16px"
  bubble-answer:
    backgroundColor: "{colors.green-soft}"
    textColor: "{colors.ink}"
    rounded: "20px 20px 6px 20px"
    padding: "14px 18px"
  bubble-answer-hero:
    backgroundColor: "{colors.green}"
    textColor: "{colors.white}"
    rounded: "18px 18px 6px 18px"
  field:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    height: "54px"
    padding: "0 16px"
  nav-bar:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.ink}"
  footer:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    rounded: "clamp(28px, 4vw, 56px)"
---

# Design System: Agroforum 2026

## Overview

**Creative North Star: "The Field Conversation"**

The page is one dialogue between a farmer and a scientist. Questions arrive in white or sand bubbles, answers in green-washed bubbles, and the packages are seat passes with perforated notches. The ground is cream with a fine paper grain, cards are white and softly lifted, ink is a deep navy, and gold is reserved for the action and a flat sun disc. The world was pinned by the client's brief (light editorial, fixed palette, Montserrat plus Inter, rounded cards, soft shadows); the build adds the dialogue grammar and the pass.

The density is generous and phone first: wide section padding (72px to 136px), single-column stacking below 960px, large tap targets (44px minimum, 52px for buttons). Real photography (steppe, wheat, herd, laboratory) sits in rounded white-bordered frames. Navy appears as a surface only in the footer; elsewhere it is ink and the filled state of small controls.

The page rejects the conference-brochure arrangement (hero, logo row, speaker grid, price table) and invented proof: no made-up testimonials, statistics or logos.

**Key Characteristics:**
- Cream ground with grain; white cards; sand bands as rounded panels inset from the viewport edge.
- Gold for actions and one decorative sun disc; green for answers, ticks and confirmation.
- Pill buttons and chips, 20 to 28px cards, speech-bubble corner (the small 6px corner marks the speaker's side).
- Stroke SVG icons only (1.75 stroke, round caps), on a shared 24px grid.
- Motion is transform and opacity, short, and fully suppressed under reduced motion.

## Colors

A warm paper palette with one gold voice and one green voice; navy is ink, not a surface.

### Primary
- **Harvest Gold** (gold): the action color. Filled primary button, gold chip, hero bar under the green title line, timeline progress, selected package ring, video progress fill, text selection, scrollbar thumb. Hover shifts to Sunlit Gold (gold-hi), icons and the tenge sign use Aged Gold (gold-lo).
- **Field Green** (green): the answer color. Answer bubbles in the hero, the third title line, tick marks, WhatsApp button, check icons, availability bars. Deeper Leaf Green (green-deep) is the text and icon color on Mint Wash (green-soft) chips and icon tiles.

### Secondary
- **Barley Ink Gold** (gold-deep, #7C5C14 family): the only gold allowed for small text (labels, "when" lines, icon glyphs on gold-soft tiles), because plain gold fails contrast on white and cream.
- **Wheat Wash** (gold-soft, gold-wash): tinted tiles, the recommended pass top, the after-forum callout, the dinner timeline block, the checked package.

### Neutral
- **Steppe Cream** (cream): page ground (with grain), nav bar at rest, field backgrounds, inactive language chips.
- **Paper White** (white): cards, bubbles, pills, sticky bar, nav when stuck or when the menu is open.
- **Sand** and **Dry Sand** (sand, sand-deep): banded sections (rounded panels), question bubbles, photo placeholders, empty slot bars, timeline track, dashed note borders.
- **Deep Navy Ink** (ink): all headings and text, focus rings, filled step numbers, navy button, selected language, the footer surface. Soft Ink (ink-soft) for secondary paragraphs.
- **Slate Grey** (grey): supporting copy, sublines, labels.
- **Mist Navy** (navy-soft): the "difference" tag on passes and the foreign-guest avatar.
- **Brick Error** (error): form errors only (text and field ring).
- Hairlines use navy at 12% (`--line`).

### Named Rules
**The One Action Rule.** Gold marks what to do (register, partner, progress). Green marks what is answered or confirmed. Never use green for a primary action other than WhatsApp, never gold for a confirmation.
**The Navy-Floor Rule.** Navy is a surface only in the footer (and tiny filled controls: step numbers, selected chips, burger when open). No navy hero, band or card.
**The Gold-Text Rule.** Gold text under about 1.2rem uses gold-deep; gold-lo is for large figures (price sign) and icons; plain gold is a fill, with ink on top.

## Typography

**Display Font:** Montserrat 700 and 800 (self-hosted woff2, fallback system-ui stack)
**Body Font:** Inter 400, 600, 700 (self-hosted woff2, fallback system-ui stack)

**Character:** Montserrat 800 with tight negative tracking makes headings and numbers heavy and confident; Inter keeps the dialogue and copy quiet and readable. For Chinese the stack switches to PingFang, Hiragino, Microsoft YaHei, Noto Sans SC with tracking reset to 0 and line-height raised (1.25 for headings, 1.8 for leads). Fonts include Latin, Cyrillic with Kazakh and Kyrgyz letters, and the tenge sign.

### Hierarchy
- **Hero title** (800, clamp 1.7rem to 2.85rem, 1.1, -0.03em): the full forum title; the last line is green with a 6px gold bar.
- **Section title** (800, clamp 1.75rem to 3rem, 1.1, -0.026em, balanced wrap): every section heading.
- **Stat number / Price** (800, up to 4.4rem and 3.8rem, line 1, tabular numerals): the numbers band and pass prices.
- **Title** (700, 1.05 to 1.15rem, 1.3): group headings, card titles, speaker names, timeline items.
- **Lead** (400, clamp 1.06 to 1.26rem, 1.6, grey, max 64ch): section intros; hero lead is ink-soft and larger.
- **Body** (400, 1.0625rem, 1.65): base text; card copy runs 0.86 to 1rem, paragraphs capped at about 60ch.
- **Bubble text** (Inter 600 at 0.92rem in hero bubbles; 1rem and weight 500 for answers in the dialogue).
- **Button** (Montserrat 700, 0.98rem; 1.02rem large, 0.9rem small).
- **Chip / caption** (Inter 600 0.76rem for chips; Montserrat 700 0.74rem for photo captions, 0.6875rem on phones so the longest label still fits its frame; countdown labels 0.7rem on phones; photo credit 0.72rem).

### Named Rules
**The Two-Face Rule.** Montserrat for headings, numbers, buttons, nav and captions; Inter for reading text, bubbles, chips and form fields. Never a third family.
**The Tabular Rule.** Countdown, stats, prices, times and package amounts use tabular numerals.
**The 11px Floor Rule.** Text people read or tap never goes below 11px (0.6875rem). Photo captions, countdown labels and the photo credit sit at the floor; make a container bigger or let a label wrap before making the text smaller.

## Layout

Single-column, phone first (designed from 360 and 390 widths), centred wrapper capped at 1240px with a fluid gutter (16px to 36px). Section vertical padding is fluid (72px to 136px); section headers keep a 14px internal gap and 32 to 60px below. Two-column compositions begin at 960px and stay asymmetrical: hero 1.1 / 0.9, about 1.2 / 0.8, programme and FAQ 0.7 / 1.3 with a sticky header column, registration 0.9 / 1.1 with a sticky info column, dialogue 0.92 / 1.08 with a sticky answer panel. Sticky offset is the nav height plus 24 to 28px.

Breakpoints actually used (min-width unless noted): 520 (max, small-phone compaction), 560 (two-column form rows), 640 (timeline time column), 760 (stats four-up, partner slots), 768 (desktop nav CTA, language dropdown, 76px nav, logos grow, sticky mobile CTA hidden), 860 (two passes side by side, recommended pass lifts 16px), 900 (sector mosaic becomes a 12-column grid), 960 (two-column sections), 1100 (speaker videos become a four-up grid, offset on even cards), 1120 (inline nav links replace the burger and full-screen menu; 1120 to 1260 tightens link padding). 360 and 390 are design targets reached by fluid clamps and the 520 rule, not separate queries; 1440 is not a query (the 1240px wrapper simply centres).

Rails: the organiser videos scroll horizontally with scroll-snap on phones, then become a three-column grid from 960px. The sector mosaic is a 12-column grid from 900px; on phones it runs as an endless belt (see Motion), and under reduced motion it falls back to a swipe rail with scroll-snap. Sections use content-visibility with intrinsic size for performance. Sand sections and the footer are rounded panels inset 8 to 24px from the viewport with 28 to 56px radius.

### Named Rules
**The Rounded Panel Rule.** Bands are inset rounded panels, never full-bleed rectangles.
**The Sticky Companion Rule.** On wide screens the explaining column stays pinned beside the scrolling content.

## Elevation & Depth

Depth is soft, navy-tinted and layered; flat tonal contrast (white on cream, sand on cream) does most of the work and shadows are quiet. Hard offset shadows are absent.

### Shadow Vocabulary
- **Card rest** (`0 1px 2px rgba(11,31,58,.05), 0 10px 28px -12px rgba(11,31,58,.16)`): cards, pills, countdown, slots, step help.
- **Card lifted** (`0 2px 4px rgba(11,31,58,.06), 0 26px 52px -22px rgba(11,31,58,.28)`): form, hero photos and bubbles, dropdown, sticky answer panel, hover state of speaker cards.
- **Pass** (`drop-shadow(0 2px 3px rgba(11,31,58,.06)) drop-shadow(0 24px 28px rgba(11,31,58,.10))`): applied as a filter so the notches cast correctly; the recommended pass adds a 2px gold outline through four gold drop-shadows.
- **Gold button** (inset 1px white highlight plus `0 10px 20px -10px rgba(0,0,0,.38)`), the **WhatsApp button** carries a tinted `0 10px 22px -12px` shadow, the **navy button** a neutral `0 10px 22px -12px rgba(0,0,0,.4)` and the **ink badge** on the recommended pass `0 10px 20px -8px rgba(0,0,0,.35)`.
- **Nav stuck** (`0 1px 0 rgba(11,31,58,.06), 0 12px 30px -20px rgba(0,0,0,.3)`).
- **Inset rings** (`inset 0 0 0 1.5px` at 12 to 18% navy) stand in for borders on ghost buttons, fields, packages.

### Named Rules
**The Soft Navy Rule.** Shadows under light surfaces are tinted with the ink color, long and low-opacity. Shadows under dark fills (navy button, ink badge, video frame) and the stuck header's drop are neutral black, because a navy shadow on a navy surface is invisible and reads as a glow. Never a hard offset.

## Shapes

Round everywhere, with one speech-bubble signature. Cards 20px, large cards, forms, passes, video and organiser cards 28px, small tiles 12 to 15px, fields 14px, photos 26px with a 6px white border (4px and 20px under 520px), buttons chips and pills fully round, icon tiles 15px (or circle). Bubbles round at 18 to 24px with one 6px corner at the speaker's base: questions bottom-left, answers bottom-right. FAQ summaries use 24 24 24 6; their answers mirror it. Passes are two stacked white halves whose joining corners are cut by 13px radial notches and a dashed 2px divider. Hero sun is a flat circle in gold at 15% opacity. Placeholders for missing assets use dashed 2px borders.

## Components

### Buttons
- **Shape:** full pill, minimum 52px tall (58 large, 44 small), 26px side padding, Montserrat 700.
- **Gold:** primary action; ink text on gold; hover rises 2px and brightens to gold-hi.
- **Ghost:** white with a 1.5px navy-18% ring; hover darkens ring to ink. Secondary action (partner).
- **Outline:** white with a 2px ink ring; hover fills with ink and flips text to white.
- **Navy:** ink fill, white text, hover #16315A; for actions inside gold-washed or light contexts needing weight.
- **WhatsApp:** green fill, white text, hover #2A7149; only for the chat contact.
- **States:** trailing arrow icon shifts 3px right on hover; press translates 1px and scales .985; disabled 60% opacity, no pointer events; focus is the global 3px ink ring.
- **Hover is for mouse only:** `scripts/build.mjs` wraps every `:hover` rule in `@media (hover:hover) and (pointer:fine)`, so a tap on a phone never leaves a button stuck in its hover look. Write plain `:hover` rules in `src/css`; `:active` and `:focus-visible` stay ungated and carry touch feedback.

### Pills and chips
- Hero meta pills: white, shadow-1, 40px tall, Montserrat 700 .86rem with an aged-gold icon (date, place).
- Chips: green-soft with green-deep text (default), sand with grey (soft), gold with ink (strong). Tags on speaker cards carry a 16px icon.
- Language chips in the menu: cream with a ring; selected is ink with white text.

### Cards
White, 20px (28px for large), shadow-1, 18 to 26px padding. Speaker cards lift 4px and move to shadow-2 on hover. Info rows pair a 46 to 48px icon tile (green-soft or gold-soft, 15px radius) with a Montserrat title and grey copy. Gold-wash callouts use a 1.5px gold ring at 45%. Foreign-guest cards go translucent white without shadow. Note cards are transparent with a 2px sand-deep ring.

### Passes (with notches)
Two halves: top (title, subline, price, difference tag) and bottom (dashed divider, check list, button, micro note). Corner notches via radial masks, shadow via drop-shadow filter. The recommended pass has a gold-wash top, gold outline and an ink badge with a gold star straddling the top edge, and lifts 16px on wide screens. Prices are Montserrat 800 with an aged-gold tenge sign.

### Dialogue bubbles and accordion-as-dialogue
- Hero bubbles: white question (ink) and green answer (white text, icon), overlapping the photos, 230px max, pop in with spring scale.
- "What you get" list: each row is a white card button with an icon tile, the farmer's question in Inter 600 and the answer headline in green-deep Montserrat; chevron in aged gold. One open at a time. Open shows a sand question bubble (left) and a green-soft answer bubble (right), with a three-dot typing indicator before the answer; a photo sits above. From 960px the rows form a left column and the answer panel sticks on the right (open row gets a 2px gold ring and the icon tile turns gold).
- FAQ: details/summary where the question is a white bubble and the answer a green-soft bubble with a check mark; the plus icon rotates 135 degrees into a navy cross.

### Timeline
A 4px sand-deep track with a gold fill scaled by scroll progress; 18px node circles ringed sand-deep that turn gold-ringed when reached; time in Montserrat 800 tabular, with a 150px time column from 640px. The dinner item has a gold-wash body and a filled gold node.

### Video player
Portrait 9:16, 28px radius, dark navy-grey frame. Centred 76px white play disc with a ring that pulses twice (4.8s, under the WCAG 2.2.2 five-second limit) when the card is revealed, then stays still; once playing it hides and a pill control bar (translucent navy) appears with 44px buttons and a 5px gold progress. Pauses when scrolled out of view. Speaker video cards sit in a snap rail with name and role under.

### Form fields
Cream fill, 54px tall, 14px radius, inset 1.5px navy ring; hover ring darkens; focus turns white with a 2px ink ring plus a 4px gold glow at 45%. Labels are Inter 600 .88rem above; errors appear below in brick red with a red ring. Package choice is a two-up radio card (cream, custom radio dot; checked is gold-wash with 2px gold ring and an ink-filled dot). Selects use a custom chevron. A honeypot field is hidden off-screen. Success state is a green-soft circle with a check.

### Navigation and language dropdown
Fixed bar (68px, 76px from 768), cream at rest and white with a soft shadow when stuck. Three logos separated by hairlines. From 1120px inline links (Montserrat 700 .88rem, 44px pills; hover sand, current gold-soft), a gold CTA from 768. Language dropdown: white pill trigger with chevron that rotates, popover with 18px radius and shadow-2, 44px rows, current row gold-soft with a green check; Escape closes and returns focus.

### Full-screen phone menu
Below 1120px the burger (46px white circle, three 2px bars) morphs into an X on a navy circle. The menu fills the area under the bar in cream, scrolls, locks page scroll, traps focus and closes on Escape. Links are large Montserrat 700 (1.12 to 1.45rem) with a hairline and a gold chevron, staggered in at 35ms; then a white language card and a CTA button.

### Sticky mobile CTA
Below 768px a white pill bar with price line and a small gold button slides up after the hero; hidden on desktop.

## Do's and Don'ts

### Do:
- **Do** frame content as question then answer; put farmer language first and the scientist's answer second.
- **Do** use gold only for the action and green only for answers, ticks and confirmation.
- **Do** keep cards white on cream or sand, 20 to 28px radius, with the soft navy shadows listed above.
- **Do** use pill shapes for every button, chip and tag, and 52px minimum height for buttons (44px for any other control).
- **Do** use inline stroke SVG icons at 1.75 stroke on the shared 24px grid.
- **Do** put gold text on white only as gold-deep; use ink text on gold fills.
- **Do** animate with transform and opacity, 0.25 to 0.8s with the ease (0.22, 1, 0.36, 1), and gate every motion behind the reduced-motion rule.
- **Do** keep copy honest: real programme, real speakers, real photographs; label unconfirmed items instead of inventing.

### Don't:
- **Don't** use navy as a hero, band or card background; navy is the footer surface only.
- **Don't** reintroduce the brochure layout: logo row, speaker grid as hero, tabular price table.
- **Don't** use hard offset shadows, pure black shadows (except the dark video frame) or colour gradients on surfaces.
- **Don't** add a third typeface or system display faces for headings.
- **Don't** use emoji or glyph icons; icons are the SVG sprite.
- **Don't** invent testimonials, statistics, logos, or speaker photos.
- **Don't** make bubbles symmetrical: the 6px corner always points to the speaker.

## Motion and Accessibility

**Motion.** Reveal on scroll: fade plus 26px rise over .8s (stagger 90ms steps). Hero entrance: copy children rise 20px with 60ms steps, gold bar scales in, photo images settle from scale 1.1, bubbles pop at .7s and 1.2s, sun disc scales from .85. Counters count up once; timeline fill follows scroll; hero photos have light parallax (desktop 960px and above, only while the hero is visible). Dialogue panels fade up 8px; typing dots bob 5px. Phone sector belt: the six photo tiles drift left at about 36px/s (50s per loop, linear, translate3d 0 to -50% over two identical sets, so the loop is seamless); touching and holding the strip or the 44px pause button below it stops it, so the moving content can be paused. Under `prefers-reduced-motion: reduce` the belt is not applied (the strip stays a swipe rail), all animation and transition durations become .001ms, reveal elements are shown immediately, smooth scroll and parallax and counting are disabled in script, and the dialogue skips the typing delay.

**Accessibility.** Body contrast ink on cream and white is well above AA; grey copy is used at 0.84rem and above on white or cream. Skip link appears on focus. Global focus ring is 3px ink with 3px offset (white in the footer). Tap targets are 44px or more. Accordions use buttons with aria-expanded and arrow-key navigation; menu and dropdown handle Escape and return focus; the burger label flips between open and close; the language is set on the document (including lang on language chips) and the page has a no-script fallback in which every reveal and dialogue panel is visible. Page text is five languages (Kazakh default, Russian, Chinese, Uzbek, Kyrgyz), so containers must tolerate long Cyrillic strings: use balanced wrapping, no fixed-width labels.
