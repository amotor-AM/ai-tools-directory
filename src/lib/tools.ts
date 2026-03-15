import toolsCatalog from '../../tools-catalog.json'

export interface Category {
  id: string
  name: string
  slug: string
  description: string
}

export interface PricingPlan {
  name: string
  price: number | null
  features: string[]
}

export interface Pricing {
  free: boolean
  plans: PricingPlan[]
}

export interface Tool {
  id: string
  name: string
  slug: string
  category: string
  tags: string[]
  shortDescription: string
  description: string
  pricing: Pricing
  features: string[]
  pros: string[]
  cons: string[]
  bestFor: string
  alternatives: string[]
  website: string
  affiliateLink: string | null
  lastUpdated: string
}

export interface ToolsCatalog {
  version: string
  lastUpdated: string
  categories: Category[]
  tools: Tool[]
}

export function getCatalog(): ToolsCatalog {
  return toolsCatalog as ToolsCatalog
}

export function getAllTools(): Tool[] {
  return getCatalog().tools
}

export function getAllCategories(): Category[] {
  return getCatalog().categories
}

export function getToolBySlug(slug: string): Tool | undefined {
  return getAllTools().find(tool => tool.slug === slug)
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return getAllCategories().find(cat => cat.slug === slug)
}

export function getToolsByCategory(categoryId: string): Tool[] {
  return getAllTools().filter(tool => tool.category === categoryId)
}

export function getCategoryForTool(tool: Tool): Category | undefined {
  return getAllCategories().find(cat => cat.id === tool.category)
}

export function getRelatedTools(tool: Tool, limit: number = 3): Tool[] {
  // Find tools in the same category
  const sameCategoryTools = getToolsByCategory(tool.category)
    .filter(t => t.id !== tool.id)
  
  // Find tools with overlapping tags
  const relatedByTags = getAllTools()
    .filter(t => t.id !== tool.id && t.tags.some(tag => tool.tags.includes(tag)))
    .sort((a, b) => {
      const aOverlap = a.tags.filter(tag => tool.tags.includes(tag)).length
      const bOverlap = b.tags.filter(tag => tool.tags.includes(tag)).length
      return bOverlap - aOverlap
    })
  
  // Combine and deduplicate
  const combined = [...sameCategoryTools, ...relatedByTags]
  const unique = Array.from(new Map(combined.map(t => [t.id, t])).values())
  
  return unique.slice(0, limit)
}

export function generateToolPageMetadata(tool: Tool) {
  const category = getCategoryForTool(tool)
  const categoryName = category?.name || 'AI Tool'
  
  return {
    title: `${tool.name} Review 2026: Features, Pricing & Alternatives | ${categoryName}`,
    description: `${tool.shortDescription}. Compare features, pricing, pros & cons. Find the best ${tool.name} alternatives for 2026.`,
    keywords: [
      tool.name,
      ...tool.tags,
      categoryName,
      'AI tool',
      'review',
      '2026',
      'pricing',
      'features',
      'alternatives'
    ].join(', ')
  }
}

export function generateComparisonSlug(tool1Slug: string, tool2Slug: string): string {
  return [tool1Slug, tool2Slug].sort().join('-vs-')
}
