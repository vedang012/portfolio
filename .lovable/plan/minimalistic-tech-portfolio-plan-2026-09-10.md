# Minimalistic Tech Portfolio Plan

## Goal
Build a single-page, minimalistic tech portfolio that showcases the user's work and skills with a clean, modern aesthetic.

## What we'll build
- A single-page scrolling portfolio at `/`.
- Sections:
  1. **Hero** — name, short tagline, and primary call-to-action (e.g. "View projects" / "Contact me").
  2. **About** — brief bio / what the user does.
  3. **Skills** — compact list or grid of technologies/tools.
  4. **Projects** — 3–6 project cards with title, short description, tech tags, and links.
  5. **Contact** — email link or simple contact call-to-action, plus social links.
- Sticky, minimal navigation that scrolls to each section.
- Subtle scroll-triggered fade/slide animations to keep the feel premium without being flashy.

## Design decisions
- Apply a subtle "developer / terminal-inspired" aesthetic: clean monospace accents for code-like labels (without going full retro CRT), crisp borders, and a restrained color palette.
- Keep the existing light/dark color tokens in `src/styles.css`; extend them with a small set of tech-oriented semantic tokens if needed (e.g. `--accent-tech`) rather than replacing the whole palette.
- Use a single-column, generous-whitespace layout typical of engineering portfolios.
- No custom fonts beyond the system sans stack already in place; use Tailwind's `font-mono` selectively for tags, labels, or section numbers.
- Use semantic Tailwind utilities and the project's existing CSS variables so dark mode works automatically.
- Add subtle code-style details: terminal cursors, section numbering like "01 — About", and project cards that feel like neat "build artifacts".

## Content strategy
- Start with clearly labeled placeholder content (e.g. "Your Name", "Short tagline here", "Project One") so the user can easily replace it with their own details.
- The final page will not ship the placeholder blank-app image.

## Technical approach
- Replace `src/routes/index.tsx` with the new portfolio home route.
- Add a head() to the route with an SEO-friendly title/description.
- Add reusable presentational components under `src/components/portfolio/` for Hero, About, Skills, Projects, Contact, and Navigation.
- Use a small scroll-into-view helper; no new animation libraries unless needed.

## Open questions (user can answer now or after first draft)
1. Should we add a **dark mode toggle** or rely on system preference?
2. Do you want a **downloadable resume button** or just an email contact?
3. Should project cards link to live demos, GitHub repos, or case-study pages?

## Next step
Build the first version of the portfolio with placeholder content so the user can see the structure and replace text/links with their own.
