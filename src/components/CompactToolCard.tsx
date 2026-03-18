import React from 'react'
import Link from 'next/link'

interface CompactToolCardProps {
  tool: {
    id: string
    name: string
    slug: string
    shortDescription: string
    category: string
    pricing: string
    rating?: number
    featured?: boolean
    tags?: string[]
    logoUrl?: string
  }
}

export default function CompactToolCard({ tool }: CompactToolCardProps) {
  const getPricingBadgeColor = (pricing: string) => {
    switch (pricing.toLowerCase()) {
      case 'free':
        return 'bg-green-100 text-green-700 border-green-200'
      case 'freemium':
        return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'paid':
        return 'bg-purple-100 text-purple-700 border-purple-200'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  return (
    <Link href={`/tools/${tool.slug}`}>
      <div className="group bg-white rounded-xl border-2 border-gray-200 p-4 hover:border-blue-400 hover:shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          {/* Logo */}
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center flex-shrink-0 border border-gray-200">
            {tool.logoUrl && tool.logoUrl !== '/placeholder-logo.svg' ? (
              <img src={tool.logoUrl} alt={`${tool.name} logo`} className="w-10 h-10 object-contain" />
            ) : (
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {tool.name.charAt(0)}
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            {/* Name and Featured Badge */}
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1 text-base">
                {tool.name}
              </h3>
              {tool.featured && (
                <span className="flex-shrink-0 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                  ⭐
                </span>
              )}
            </div>

            {/* Pricing Badge */}
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${getPricingBadgeColor(tool.pricing)}`}>
                {tool.pricing}
              </span>
              {tool.rating && (
                <div className="flex items-center gap-1">
                  <svg className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                  <span className="text-xs text-gray-600 font-medium">{tool.rating}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2 mb-3 flex-grow">
          {tool.shortDescription}
        </p>

        {/* Tags */}
        {tool.tags && tool.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {tool.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
          <span className="text-xs text-gray-500 font-medium">{tool.category}</span>
          <span className="text-blue-600 font-semibold text-sm group-hover:translate-x-1 transition-transform flex items-center gap-1">
            View
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  )
}
