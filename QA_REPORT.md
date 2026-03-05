# QA Report - Schema AI (web-url)

**Date**: 2026-03-06 (Night 3 - Full QA Pass)
**Tester**: Claude Code (Automated QA)

## Summary

Overall quality: **Good**. Build clean, lint clean, all pages render correctly, SEO complete.

## Checklist

| Item | Status | Notes |
|------|--------|-------|
| `npm run build` | PASS | 23 pages, 0 errors |
| `npm run lint` | PASS | 0 errors, 0 warnings |
| Responsive (mobile/desktop) | PASS | Header nav gap adjusted for mobile |
| favicon | PASS | Dynamic icon.tsx (32x32) |
| OGP image | PASS | Dynamic opengraph-image.tsx (1200x630) |
| 404 page | PASS | Custom not-found.tsx |
| Loading state | PASS | Skeleton UI in generate/[type]/loading.tsx |
| Error state | PASS | Error boundary in generate/[type]/error.tsx |
| JSON-LD | PASS | WebSite, SoftwareApplication, FAQPage, BreadcrumbList, ItemList |
| sitemap.xml | PASS | All pages with priorities |
| robots.txt | PASS | AI crawlers allowed |
| llms.txt | PASS | Fixed version to Next.js 16 |
| agent.json | PASS | A2A Agent Card |
| Form validation | PASS | Required fields, error messages |
| Edge cases | PASS | Empty/special chars handled |

## Issues Found & Fixed (This Pass)

### 1. llms.txt version mismatch (Fixed)
- llms.txt said "Next.js 15", actual is 16.1.6 -> updated to "Next.js 16"

### 2. Header nav mobile spacing (Fixed)
- Fixed `gap-6` to `gap-3 sm:gap-6` for better mobile layout

## Previously Fixed (Night 2)

- 404 page, loading state, error boundary
- favicon, OGP image
- Accessibility: aria-label on feedback close button

## Verified OK

- **SEO**: All pages have title, description, canonical, OpenGraph
- **Design**: Black bg, emerald accent, no emojis/icons, card styles correct
- **A11y**: lang="ja", form labels with htmlFor, semantic HTML, focus styles
- **Performance**: SSG for all content pages, client components minimal
- **API**: REST + MCP endpoints validate input, return proper errors
- **Edge cases**: Empty input rejected, JSON.stringify escapes special chars
