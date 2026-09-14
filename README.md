# TETA+PI Landing

[![Secret scan](https://github.com/teta-pi/landing/actions/workflows/secret-scan.yml/badge.svg)](https://github.com/teta-pi/landing/actions/workflows/secret-scan.yml) [![Deploy](https://github.com/teta-pi/landing/actions/workflows/deploy.yml/badge.svg)](https://github.com/teta-pi/landing/actions/workflows/deploy.yml)

Static marketing site for **TETA+PI** — Trust Infrastructure for Digital
Entities. Live at [`tetapi.dev`](https://tetapi.dev).

Plain HTML + inline CSS/JS, no framework, no build step. Served by nginx.
Includes SEO/AEO artifacts (`sitemap.xml`, `robots.txt`, `llms.txt`,
`.well-known/agent.json`) so both search engines and AI agents can discover
the site and the API.

## Pages
`index.html` (home), `about.html`, `for-businesses.html`, `for-agents.html`,
`registries.html`, `how-it-works.html`, `developers.html`, `onboarding.html`,
`privacy.html`, `terms.html`.

## Docs
Canonical docs live in [`teta-pi/infra`](https://github.com/teta-pi/infra).

## License
MIT © 2026 TETA+PI · tetapi.dev
