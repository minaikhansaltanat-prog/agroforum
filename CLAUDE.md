# Agroforum 2026 site: instructions for Claude Code

Read `TZ.md` first: it is the full spec (written in Kazakh). Build the new site in `site/` using `current/` as the content and i18n base.

- Keep the i18n system from `current/` (`data-i` keys, `l/{kk,ru,zh,uz,ky}.js`). Kazakh is the default language. Every new text key must exist in all five language files.
- Light design per TZ.md section 3. Use the ui-ux-pro-max and frontend-design skills if available.
- No Google Fonts, Google Maps or other Google services: the site must open from China. Self-host fonts in `site/fonts/`.
- Videos: the final organiser videos are in `V/` (not committed, too large); the web versions are `site/videos/organizer-1..3.mp4` (commands in README). The old `videos/` folder is obsolete. `preload="none"`, poster set, only one plays at a time.
- Kazakh text: check grammar and spelling; never use the long dash (—) in Kazakh or translated text.
- Remove every "free participation" claim; seats are 250; opening is 09:30.
- Deploy: `vercel --prod` from `site/` (Vercel project `agroforum-2026`), then add the custom domain in Vercel → Project → Domains.
