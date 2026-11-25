# AGENTS.md — ait-web

Ait official website (`https://ait-app.com`), built with Astro static generation and a single handcrafted `@layer` stylesheet (`src/styles/global.css`). Brand and content conventions are documented in `README.md` and `docs/internal/brand/zh.md`.

## Aesthetic & CSS Constitution
- **Warm Editorial Minimalism**: warm off-white canvas (`--brand-canvas: #fafaf8`), white surfaces (`--brand-surface`), crisp 1px hairline borders (`--line: #e5e5e0`), restrained ink hierarchy (`--brand-ink`, `--text-muted`, `--text-soft`), and coral-orange accent (`--brand-primary: #ef4b2c`, `--brand-text: #be3a22`).
- **Single stylesheet discipline**: do not introduce Tailwind, UI frameworks, external icon libraries, web fonts, inline `style="..."`, or ad-hoc `<style>` blocks that bypass the design system. Put layout and visual styles into the appropriate `@layer` (`reset`, `base`, `components`, `responsive`) in `src/styles/global.css`.
- **Anti-Slop negative constraints**:
  - No gradients, glowing or blurred decorative blobs, neon/high-saturation status colors, or heavy drop shadows.
  - No gratuitous rounded white cards or colored pill badges where the site uses open 1px hairline grids or quiet monochrome tags.
  - No emojis in UI chrome; never invent or redraw third-party brand logos, and never modify `public/brand/` assets (they are exported from the main Ait repo).
- **Semantic colors**: reuse the existing muted palette (`#299f51` / `#347747` for positive/running, `#268ae0` for active/info, `#977035` for modified/pending, `#ac4f42` / `--brand-text` for destructive/attention).
- **Iconography**: icons in `src/components/Icon.astro` must remain minimal `24x24`, `stroke-width="1.6"`, single-stroke Lucide-style line icons matching existing paths.
- **Interactive demo craft**: `src/components/ProductDemo.astro` is explicitly labeled as an interactive demo (not a live client). Keep its quiet desktop-app micro-typography (`9px–11px`), `#f8f8f5` / `#fcfcfa` surfaces, and `1px solid var(--line)` dividers. Switching tabs must not cause noticeable vertical layout jumps.
- **Responsive breakpoints**: maintain clean layouts across desktop (`>1100px`), medium (`<=1100px`), tablet (`<=900px`), and mobile (`<=680px`) with zero horizontal overflow or squeezed toolbars.

## Content & Trilingual Parity (`zh`, `en`, `ja`)
- Keep UI copy concise and comparable in line count across `zh`, `en`, and `ja` in `src/lib/i18n.ts` (`ja` follows `zh`'s exact TypeScript shape).
- Blog posts (`content/blog/{zh,en,ja}/`), docs (`content/docs/{zh,en,ja}/`), and legal pages (`content/legal/{zh,en,ja}/`) must have matching filenames/slugs across all three languages.
- Verify product claims against the main Ait source repository and record verification commits/scope in `docs/content-sources.md`. Do not document unreleased or unimplemented features as generally available without stating version/channel conditions.

## Verification & Visual QA Gate
Before reporting any change as complete:
1. Run `npm run check && npm run build && npm run verify` and fix every error.
2. For any UI, layout, or CSS change, start `npm run preview` and capture headless browser screenshots across desktop (`1440x900`), tablet (`900x900`), and mobile (`390x844`) for all affected sections and interactive states (including every demo tab) across `/zh/`, `/en/`, and `/ja/`.
3. Inspect the rendered screenshots yourself to check for broken or doubled hairline borders, orphan line wrapping, text overflow, baseline misalignment, or tab-switch height jumps. Fix visual defects before finishing, and include screenshot paths in your final summary.
