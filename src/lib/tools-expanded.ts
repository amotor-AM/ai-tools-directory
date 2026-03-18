import toolsDatabase from '../../data/tools-database-expanded.json'

export interface Tool {
  id: string
  name: string
  slug: string
  description: string
  shortDescription: string
  category: string
  categories?: string[]
  pricing: string
  pricingTiers?: Array<{ name: string; price: string }>
  officialUrl: string
  logoUrl?: string
  rating?: number
  featured?: boolean
  tags?: string[]
  affiliate?: boolean
  affiliateLink?: string | null
  features?: string[]
  pros?: string[]
  cons?: string[]
  bestFor?: string
  lastUpdated?: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
}

// Extract unique categories from tools
export function getAllCategories(): Category[] {
  const categoryMap = new Map<string, Category>()
  
  const tools = toolsDatabase as Tool[]
  
  tools.forEach(tool => {
    if (!categoryMap.has(tool.category)) {
      categoryMap.set(tool.category, {
        id: tool.category.toLowerCase().replace(/\s+/g, '-'),
        name: tool.category,
        slug: tool.category.toLowerCase().replace(/\s+/g, '-'),
        description: `Discover the best ${tool.category} tools`
      })
    }
  })
  
  return Array.from(categoryMap.values()).sort((a, b) => a.name.localeCompare(b.name))
}

export function getAllTools(): Tool[] {
  return toolsDatabase as Tool[]
}

export function getToolBySlug(slug: string): Tool | undefined {
  const tools = getAllTools()
  return tools.find(tool => tool.slug === slug)
}

export function getToolsByCategory(categoryId: string): Tool[] {
  const tools = getAllTools()
  return tools.filter(tool => 
    tool.category.toLowerCase().replace(/\s+/g, '-') === categoryId ||
    tool.category === categoryId
  )
}

export function getCategoryBySlug(slug: string): Category | undefined {
  const categories = getAllCategories()
  return categories.find(cat => cat.slug === slug)
}

export function searchTools(query: string): Tool[] {
  if (!query || query.trim() === '') {
    return getAllTools()
  }

  const tools = getAllTools()
  const searchTerm = query.toLowerCase().trim()

  return tools.filter(tool => {
    // Search in name, description, category, and tags
    const searchableText = [
      tool.name,
      tool.shortDescription,
      tool.description,
      tool.category,
      ...(tool.tags || []),
      ...(tool.features || [])
    ].join(' ').toLowerCase()

    return searchableText.includes(searchTerm)
  })
}

export function filterTools(
  tools: Tool[],
  filters: {
    category?: string
    pricing?: string
    sortBy?: string
  }
): Tool[] {
  let filtered = [...tools]

  // Filter by category
  if (filters.category && filters.category !== 'all') {
    filtered = filtered.filter(tool => 
      tool.category.toLowerCase().replace(/\s+/g, '-') === filters.category ||
      tool.category === filters.category
    )
  }

  // Filter by pricing
  if (filters.pricing && filters.pricing !== 'all') {
    filtered = filtered.filter(tool => 
      tool.pricing.toLowerCase() === filters.pricing?.toLowerCase()
    )
  }

  // Sort
  const sortBy = filters.sortBy || 'featured'
  
  switch (sortBy) {
    case 'name':
      filtered.sort((a, b) => a.name.localeCompare(b.name))
      break
    case 'rating':
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0))
      break
    case 'newest':
      filtered.sort((a, b) => {
        const dateA = new Date(a.lastUpdated || '2026-01-01')
        const dateB = new Date(b.lastUpdated || '2026-01-01')
        return dateB.getTime() - dateA.getTime()
      })
      break
    case 'featured':
    default:
      // Featured first, then by rating
      filtered.sort((a, b) => {
        if (a.featured && !b.featured) return -1
        if (!a.featured && b.featured) return 1
        return (b.rating || 0) - (a.rating || 0)
      })
      break
  }

  return filtered
}

export function getRelatedTools(tool: Tool, limit: number = 4): Tool[] {
  const allTools = getAllTools()
  
  // Find tools in the same category
  const sameCategoryTools = allTools
    .filter(t => t.id !== tool.id && t.category === tool.category)
  
  // Find tools with overlapping tags
  const relatedByTags = allTools
    .filter(t => t.id !== tool.id && t.tags?.some(tag => tool.tags?.includes(tag)))
    .sort((a, b) => {
      const aOverlap = a.tags?.filter(tag => tool.tags?.includes(tag)).length || 0
      const bOverlap = b.tags?.filter(tag => tool.tags?.includes(tag)).length || 0
      return bOverlap - aOverlap
    })
  
  // Combine and deduplicate
  const combined = [...sameCategoryTools, ...relatedByTags]
  const unique = Array.from(new Map(combined.map(t => [t.id, t])).values())
  
  return unique.slice(0, limit)
}
