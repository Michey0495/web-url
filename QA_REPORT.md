# QA Report - Schema AI (web-url)

Date: 2026-03-06

## Build & Lint

| Check | Status |
|-------|--------|
| `npm run build` | PASS |
| `npm run lint` | PASS |
| TypeScript strict | PASS |

## Issues Found & Fixed

### 1. Missing 404 page
- **Severity:** Medium
- **Status:** Fixed
- Created `src/app/not-found.tsx` with proper layout, messaging, and navigation back to top

### 2. Missing loading state
- **Severity:** Medium
- **Status:** Fixed
- Created `src/app/generate/[type]/loading.tsx` with skeleton UI matching the form layout

### 3. Missing error boundary
- **Severity:** Medium
- **Status:** Fixed
- Created `src/app/generate/[type]/error.tsx` with retry button and navigation

### 4. Missing favicon
- **Severity:** Low
- **Status:** Fixed
- Created `src/app/icon.tsx` generating a "S" icon with emerald color on black background

### 5. Missing OGP image
- **Severity:** Medium
- **Status:** Fixed
- Created `src/app/opengraph-image.tsx` generating a branded OGP image (1200x630)

### 6. Accessibility: missing aria-label on close button
- **Severity:** Low
- **Status:** Fixed
- Added `aria-label="閉じる"` to feedback widget close button

## Checklist

- [x] `npm run build` success
- [x] `npm run lint` no errors
- [x] Responsive design (mobile/desktop) - Tailwind responsive classes used correctly
- [x] favicon - generated via `icon.tsx`
- [x] OGP image - generated via `opengraph-image.tsx`
- [x] 404 page - `not-found.tsx`
- [x] Loading state - `loading.tsx`
- [x] Error state - `error.tsx`

## SEO Verification

- [x] Metadata: title, description set on all pages
- [x] Canonical URLs set on all pages
- [x] OpenGraph metadata in layout
- [x] Twitter card metadata in layout
- [x] JSON-LD structured data on home page (WebSite + FAQPage)
- [x] JSON-LD structured data on generate pages (BreadcrumbList)
- [x] JSON-LD structured data on guide pages (Article)
- [x] sitemap.xml generated with all pages
- [x] robots.txt with AI crawler permissions
- [x] llms.txt present
- [x] .well-known/agent.json present

## Edge Cases

- [x] Form validation: required fields checked before generation
- [x] Empty input: error messages displayed with red highlights
- [x] FAQ parser: handles Q:/A: format, ignores malformed lines
- [x] API validation: type and data required, missing fields reported

## Performance

- [x] Server Components used by default (only form and feedback widget are client)
- [x] Static generation for all schema type pages via `generateStaticParams`
- [x] No unnecessary re-renders detected in client components
- [x] Google Analytics loaded with `afterInteractive` strategy
- [x] lucide-react only used by shadcn/ui select component (tree-shaken)

## Notes

- All pages follow the design system (black background, emerald accent, no icons/emojis)
- All AI-First requirements met (MCP endpoint, agent.json, llms.txt, robots.txt)
- Form generation is client-side only (no API calls needed for basic generation)
