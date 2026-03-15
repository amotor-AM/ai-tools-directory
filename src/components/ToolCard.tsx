import React from 'react'
import Link from 'next/link'
import { Tool, getCategoryForTool } from '@/lib/tools'

interface ToolCardProps {
  tool: Tool
}

export default function ToolCard({ tool }: ToolCardProps) {
  const category = getCategoryForTool(tool)
  const lowestPrice = tool.pricing.plans.reduce((min, plan) => {
    if (plan.price === null) return min
    return plan.price < min ? plan.price : min
  }, Infinity)
  
  const priceDisplay = tool.pricing.free 
    ? 'Free' 
    : lowestPrice === Infinity 
      ? 'Contact for pricing'
      : `From $${lowestPrice}/mo`

  return (
    <Link href={`/tools/${tool.slug}`}>
      <div className="group bg-white rounded-xl border border-gray-200 p-6 hover:shadow-2xl hover:border-blue-300 hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
              {tool.name}
            </h3>
            {category && (
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                {category.name}
              </p>
            )}
          </div>
          {tool.pricing.free && (
            <span className="bg-gradient-to-r from-green-400 to-green-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
              FREE
            </span>
          )}
        </div>
        
        <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">
          {tool.shortDescription}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {tool.tags.slice(0, 3).map(tag => (
            <span 
              key={tag} 
              className="bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 text-xs px-3 py-1 rounded-full font-medium border border-blue-100"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="text-blue-600 font-bold text-sm">{priceDisplay}</span>
          <span className="flex items-center text-sm font-semibold text-blue-600 group-hover:translate-x-1 transition-transform">
            View Details
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  )
}
