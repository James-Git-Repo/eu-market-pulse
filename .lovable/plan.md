# Newsletter redesign — editorial magazine

Keep the current warm orange/cream palette and Bodoni typography. Change composition, hierarchy, spacing and typographic rhythm so the newsletter reads like a modern editorial publication (Sequoia Stories as reference).

## Index page (/newsletter)

- Editorial masthead: small eyebrow label ("European Market Movers"), large Bodoni H1, one-line standfirst, thin rule underneath.
- Category toggles instead of a dropdown: inline pill row (All + each tag), active pill in primary, with a compact search field aligned right. Horizontally scrollable on mobile.
- Featured story: newest article as a full-width lead — large 16:9 image on one side, tag / title / dek / author / date / "Read" on the other, stacked on mobile.
- Grid below: uniform cards, 1 / 2 / 3 columns. Square-cropped cover, tag eyebrow, title (max 2 lines), author + date, subtle "Read" affordance. Flat cards with a hairline border; hover = image zoom + title underline only, no scale bounce.
- Loading state becomes skeleton cards instead of a "Loading articles..." line.
- Empty state restyled to match (centered, muted, rule above).
- Editor controls (New Article, per-card edit/delete) keep working unchanged.

## Article page (/post/:slug)

- Narrow reading column (~680px) centered; images may extend to the full column.
- Header block: back link, tag eyebrow, large Bodoni title, italic standfirst, then a meta line (author · date · read time) framed by hairline rules.
- Cover image below the header, 16:9, rounded, generous spacing.
- Longform typography: larger body size (~19px), line-height ~1.75, justified with hyphenation, first-paragraph lead-in styling, clearer H2/H3 scale, styled blockquotes and links.
- Inline images keep the full column width already implemented, with caption styling.
- Related "Continue Reading" section restyled to the new card style; comments section aligned to the reading column.

## Technical notes

- Extend `src/index.css` with editorial utilities: reading measure, hairline rule, eyebrow label, lead-in and `.article-prose` typography (semantic tokens only, no hardcoded colors).
- Refactor `src/components/PostCard.tsx` to support `variant="featured" | "default"`; keep props and editor actions.
- Update `src/pages/Newsletter.tsx` (masthead, tag pills, featured + grid, skeletons) and `src/components/FilterBar.tsx` for the pill/search row.
- Update `src/pages/Post.tsx` layout plus content typography rules in `src/styles/editor.css` and the `SafeHTML` wrapper classes.
- No data model, SEO, or business-logic changes; existing SEO/JSON-LD blocks stay intact.