# AI Tools Directory — Next.js Architecture

## Core Strategy Shift
**WordPress → Next.js/Gatsby** for competitive advantage:
- ⚡ Blazing fast (static generation)
- 🎯 Perfect Lighthouse scores (100/100/100/100)
- 🔍 Optimized for Google scraping (custom JSON-LD structure)
- 🔗 Programmatic internal linking (sitemap-based)
- 💰 Free hosting forever (GitHub Pages or Vercel)

## Tech Stack
- **Framework**: Next.js (chosen over Gatsby for better docs, Vercel integration, ISR support)
- **Deployment**: Vercel (free tier, instant deploys, edge network)
- **Fallback**: GitHub Pages (if Vercel limits hit)
- **Styling**: Tailwind CSS (fast, SEO-friendly)
- **Data**: JSON files (tools catalog, categories, comparisons)
- **Search**: Custom Search JSON API (when Alex provides access)

## Site Structure

```
/
├── index.html (homepage - tool categories overview)
├── tools/
│   ├── [tool-slug].html (individual tool pages)
│   └── category/
│       └── [category-slug].html (category listing pages)
├── compare/
│   └── [tool1-vs-tool2].html (comparison pages)
├── guides/
│   └── [guide-slug].html (how-to guides, use cases)
├── best/
│   └── [category-best].html (listicles - "10 Best AI Writing Tools")
└── sitemap.xml (programmatic internal linking source)
```

## Internal Linking System

**Option 1: Sitemap-based (RECOMMENDED)**
- Maintain `sitemap.json` as single source of truth
- Each page reads sitemap, generates contextual internal links
- Categories: Auto-link to related tools in same category
- Comparisons: Auto-link to individual tool pages
- Listicles: Auto-link to all tools mentioned

**Option 2: Custom link graph file**
- `link-graph.json` with explicit relationships
- More control, more maintenance

**Decision**: Sitemap-based for automation. Generate links based on:
- Category overlap
- Tag similarity
- Tool feature overlap
- User intent (comparison → individual tool → category → listicle)

## JSON-LD Schema Structure

Every page includes optimized schema:

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Tool Name",
  "applicationCategory": "AI Writing Tool",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.5",
    "ratingCount": "127"
  },
  "review": [...]
}
```

Comparison pages use `ItemList` schema.
Category pages use `CollectionPage` schema.

## Content Generation Strategy

### Phase 1: Research & Catalog (NOW)
1. Research 100+ AI tools across categories:
   - AI Writing (Copy.ai, Jasper, Rytr, etc.)
   - AI Image (Midjourney, DALL-E, Stable Diffusion)
   - AI Video (Runway, Pika, FramePack)
   - AI Voice (ElevenLabs, Murf, Fish Audio)
   - AI Code (GitHub Copilot, Cursor, Codeium)
   - AI Research (Perplexity, Elicit, Consensus)
   - AI Productivity (Notion AI, ChatGPT, Claude)
2. Scrape data: pricing, features, use cases, screenshots
3. Build `tools-catalog.json`

### Phase 2: Content Creation (Week 1)
1. Individual tool pages (100 pages, 1,000-1,500 words each)
2. Comparison pages (50 pages, 2,000-2,500 words)
3. Category pages (10 pages, 1,500-2,000 words)
4. Listicle guides (20 pages, 2,500-3,000 words)

**Target**: 180 pages, ~300,000 words in 2 weeks.

### Phase 3: Optimization (Week 2-3)
1. FAQs on every page (5-10 Q&A per page)
2. JSON-LD schema validation
3. Internal linking optimization (5-10 contextual links per page)
4. Lighthouse audit (100/100/100/100 target)
5. Submit sitemap to Google Search Console

## Competitive Advantages vs WordPress Sites

| Feature | Our Site (Next.js) | Competitor (WordPress) |
|---------|-------------------|----------------------|
| Page load | <0.5s | 2-4s |
| Lighthouse score | 100/100/100/100 | 60-80 average |
| Internal links | Programmatic (always perfect) | Manual (often broken) |
| JSON-LD | Custom, optimized | Plugin-generated (bloated) |
| Mobile speed | Instant | Slow |
| Hosting cost | $0 | $5-50/month |
| Update speed | Git push → instant deploy | WordPress admin (slow) |

## SEO Optimization

### On-Page
- Title: "[Tool Name] Review 2026: Features, Pricing & Alternatives"
- Meta description: 155 chars, includes primary keyword + CTA
- H1: Primary keyword
- H2-H6: LSI keywords, question-based
- Alt text: Descriptive, keyword-rich
- Internal links: 5-10 contextual links per page
- FAQs: Schema markup, answer boxes

### Technical
- Sitemap: Auto-generated, submitted to GSC
- Robots.txt: Allow all
- Canonical tags: Self-referencing
- Open Graph: Social sharing optimized
- Structured data: Validated via Google Rich Results Test

### Content
- Word count: 1,000-3,000 per page (varies by type)
- Keyword density: Natural (no stuffing)
- Readability: 8th grade level
- Freshness: Update dates visible, content updated quarterly

## Monetization Strategy

1. **Affiliate links**: Commission from tool signups
2. **Sponsored posts**: $500-$2,000 per featured review
3. **Display ads**: Google AdSense (after traffic milestone)
4. **Email capture**: Newsletter for tool updates → affiliate promotions

## Development Roadmap

### Week 1
- [ ] Research 100+ AI tools
- [ ] Build `tools-catalog.json`
- [ ] Design Next.js site structure
- [ ] Create reusable components (ToolCard, ComparisonTable, FAQ)
- [ ] Set up Vercel deployment

### Week 2
- [ ] Generate 50 individual tool pages
- [ ] Generate 20 comparison pages
- [ ] Generate 10 category pages
- [ ] Generate 10 listicle guides
- [ ] Implement sitemap-based internal linking

### Week 3
- [ ] Add FAQs to all pages
- [ ] Implement JSON-LD schema
- [ ] Lighthouse optimization (100/100/100/100)
- [ ] Submit to Google Search Console
- [ ] Launch publicly

### Week 4+
- [ ] Monitor rankings (Google Search Console)
- [ ] Expand catalog (add 50 more tools)
- [ ] A/B test CTAs for affiliate conversions
- [ ] Outreach to tools for sponsored posts

## Tools Catalog Schema

```json
{
  "tools": [
    {
      "id": "tool-001",
      "name": "Copy.ai",
      "slug": "copy-ai",
      "category": "AI Writing",
      "tags": ["copywriting", "marketing", "email"],
      "description": "AI-powered copywriting tool...",
      "pricing": {
        "free": true,
        "plans": [
          {"name": "Free", "price": 0},
          {"name": "Pro", "price": 49}
        ]
      },
      "features": [...],
      "pros": [...],
      "cons": [...],
      "alternatives": ["jasper", "rytr", "writesonic"],
      "useCase": "Best for marketing teams...",
      "affiliateLink": "https://...",
      "lastUpdated": "2026-03-15"
    }
  ]
}
```

## Next Steps (IMMEDIATE)

1. **Research**: Web search for top 100 AI tools (by category)
2. **Catalog**: Build `tools-catalog.json` with 20-30 tools to start
3. **Design**: Create Next.js component library
4. **Content**: Generate first 10 tool pages
5. **Deploy**: Push to Vercel, verify live site

## Success Metrics

- **Week 1**: 50 pages live, 30,000 words published
- **Week 4**: 180 pages live, 300,000 words published
- **Month 2**: 1,000 organic visitors/month
- **Month 3**: 5,000 organic visitors/month, first affiliate sale
- **Month 6**: 25,000 organic visitors/month, $500/month revenue
