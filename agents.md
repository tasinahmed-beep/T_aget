# QuickTools - Development Instructions

## Project Overview
A free online tools website built with TypeScript + Vite. No backend - everything runs client-side.

## Tech Stack
- **Vite** - Build tool & dev server
- **TypeScript** - Type-safe code
- **Vanilla CSS** - Custom styling with light gradients & modern animations
- **No Backend** - 100% client-side processing

## Design Guidelines
- Light theme with soft gradients
- Modern animations & micro-interactions
- Mobile responsive
- AdSense-ready structure

---

## Development Rules

### To Do
1. **File Size**: Keep file size to 300-400 lines. Create sub-files if needed.
2. **Organization**: If sub-files exceed 3, move them to a relevant folder.
3. **Naming**: File names should be relevant and descriptive.
4. **Breadcrumbs**: All tool pages must include the `Breadcrumbs` component.
5. **SEO**: Each route should have a unique title and description.

### Don't
1. **Dead Code**: If a feature is removed, remove *all* associated code.
2. **UI Consistency**: Ensure the whole app has a consistent UI (no different UI styles).
3. **Duplicate Logic**: Avoid duplicating event listeners or utility functions.

---

## Project Structure
```
src/
├── components/
│   ├── Layout.ts      # Header & Footer
│   └── Breadcrumbs.ts # Reusable Breadcrumbs
├── pages/
│   ├── Home.ts        # Hero section + Tool grid + Search
│   ├── About.ts
│   ├── Contact.ts
│   └── Privacy.ts
├── tools/             # All tool implementations
│   ├── qr-generator.ts
│   ├── color-picker.ts
│   ├── password-generator.ts
│   ├── json-formatter.ts
│   ├── word-counter.ts
│   ├── case-converter.ts
│   ├── lorem-ipsum.ts
│   ├── encoders.ts    # Base64 & URL
│   ├── uuid-generator.ts
│   ├── markdown-preview.ts
│   ├── unit-converter.ts
│   ├── image-tools.ts
│   ├── diff-checker.ts
│   └── hash-generator.ts
├── utils/
│   └── seo.ts         # Dynamic meta tag management
├── router.ts          # SPA Router with SEO integration
├── main.ts            # App entry point
└── style.css          # Global styles
```

---

## Completed Features:
- [x] Project setup with Vite + TypeScript
- [x] SEO-optimized index.html
- [x] Main CSS styles (Hero, Search, Cards, Breadcrumbs)
- [x] SPA Router with popstate handling
- [x] Dynamic SEO meta tags
- [x] Sitemap.xml & robots.txt
- [x] Privacy Policy, About, Contact pages

## Tools Implemented:
- [x] Word & Character Counter (with reading time, keywords)
- [x] Case Converter (upper, lower, title, sentence, alternating, inverse)
- [x] JSON Formatter & Validator (with CSV conversion)
- [x] Base64 Encoder/Decoder
- [x] URL Encoder/Decoder
- [x] Color Picker & Converter (HEX, RGB, HSL, CMYK, Palette)
- [x] Password Generator (with memorable mode, strength meter)
- [x] QR Code Generator (WiFi, VCard, custom colors)
- [x] Lorem Ipsum Generator
- [x] UUID Generator
- [x] Markdown Previewer (live preview, copy HTML)
- [x] Unit Converter (length, weight, data, temperature)
- [x] Image Converter & Compressor
- [x] Text Diff Checker
- [x] Hash Generator (MD5, SHA-1, SHA-256, SHA-512)

## UI/UX & SEO Features:
- [x] Hero section with search bar
- [x] Live tool search/filter
- [x] Breadcrumbs on all tool pages
- [x] Dynamic page titles and meta descriptions
- [x] Canonical URLs
- [x] Open Graph tags

---

## Scripts
```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Deployment
- Firebase Hosting configured (`firebase.json`)
- Use `firebase deploy` after building
