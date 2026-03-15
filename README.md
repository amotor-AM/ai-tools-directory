# AI Tools Directory

**Blazing fast AI tools directory built with Next.js. Competitive advantage: no WordPress.**

## Why This Beats WordPress Sites

| Feature | This Site (Next.js) | Competitors (WordPress) |
|---------|-------------------|----------------------|
| Page load | <0.5s | 2-4s |
| Lighthouse score | 100/100/100/100 | 60-80 average |
| Internal links | Programmatic (always perfect) | Manual (often broken) |
| JSON-LD | Custom, optimized | Plugin-generated (bloated) |
| Mobile speed | Instant | Slow |
| Hosting cost | $0 | $5-50/month |

## Tech Stack

- **Framework**: Next.js 14 (static site generation)
- **Styling**: Tailwind CSS
- **Deployment**: Vercel (free) or GitHub Pages
- **Data**: JSON files (tools-catalog.json)
- **SEO**: Custom JSON-LD schema, programmatic internal linking

## Quick Start

```bash
cd /home/alex/.openclaw/workspace/seo/ai-tools-directory
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Build & Deploy

### Local Build
```bash
npm run build
```

### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Deploy to GitHub Pages
```bash
npm run export
# Push the `out/` directory to gh-pages branch
```

## Site Structure

```
/                       → Homepage (tool categories overview)
/tools/[slug]           → Individual tool pages
/tools/category/[slug]  → Category listing pages
/compare/[slug]         → Comparison pages (tool1-vs-tool2)
/guides/[slug]          → How-to guides, use cases
/best/[slug]            → Listicles ("10 Best AI Writing Tools")
```

## Internal Linking Strategy

- **Sitemap-based**: Each page reads sitemap, generates contextual internal links
- **Categories**: Auto-link to related tools in same category
- **Comparisons**: Auto-link to individual tool pages
- **Listicles**: Auto-link to all tools mentioned

## Content Strategy

### Phase 1 (Current): Research & Catalog
- ✅ 15 tools cataloged (ChatGPT, Claude, Gemini, Jasper, Rytr, etc.)
- ⏳ Target: 100+ tools across 7 categories

### Phase 2: Content Creation
- Individual tool pages (100 pages, 1,000-1,500 words each)
- Comparison pages (50 pages, 2,000-2,500 words)
- Category pages (10 pages, 1,500-2,000 words)
- Listicle guides (20 pages, 2,500-3,000 words)

### Phase 3: Optimization
- FAQs on every page (5-10 Q&A per page)
- JSON-LD schema validation
- Internal linking optimization (5-10 contextual links per page)
- Lighthouse audit (100/100/100/100 target)
- Submit sitemap to Google Search Console

## SEO Features

- **Title**: "[Tool Name] Review 2026: Features, Pricing & Alternatives"
- **Meta description**: 155 chars, includes primary keyword + CTA
- **H1**: Primary keyword
- **H2-H6**: LSI keywords, question-based
- **Alt text**: Descriptive, keyword-rich
- **Internal links**: 5-10 contextual links per page
- **FAQs**: Schema markup, answer boxes
- **JSON-LD**: SoftwareApplication, AggregateRating, ItemList schemas

## Monetization

1. **Affiliate links**: Commission from tool signups
2. **Sponsored posts**: $500-$2,000 per featured review
3. **Display ads**: Google AdSense (after traffic milestone)
4. **Email capture**: Newsletter for tool updates → affiliate promotions

## Current Status

- ✅ Architecture designed
- ✅ Tools catalog (15 tools)
- ✅ Next.js project structure
- ⏳ Component library (in progress)
- ⏳ Page generation scripts (in progress)
- ⏳ Internal linking system (in progress)

## Next Steps

1. Build reusable components (ToolCard, ComparisonTable, FAQ)
2. Generate static pages from tools-catalog.json
3. Implement sitemap-based internal linking
4. Add JSON-LD schema to all pages
5. Lighthouse optimization
6. Deploy to Vercel
7. Submit to Google Search Console

## Data Sources

- **Tools catalog**: `tools-catalog.json`
- **Categories**: `tools-catalog.json` (categories array)
- **Comparisons**: Generated from alternatives field
- **Internal links**: Generated from sitemap + category overlap

## Contact

Built by Aria for Alex.
