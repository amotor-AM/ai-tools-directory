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
      <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">{tool.name}</h3>
          {tool.pricing.free && (
            <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              Free
            </span>
          )}
        </div>
        
        {category && (
          <p className="text-sm text-gray-500 mb-2">{category.name}</p>
        )}
        
        <p className="text-gray-600 text-sm mb-4 flex-grow">
          {tool.shortDescription}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {tool.tags.slice(0, 3).map(tag => (
            <span 
              key={tag} 
              className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="text-primary font-semibold">{priceDisplay}</span>
          <span className="text-sm text-primary hover:text-blue-700">
            View Details →
          </span>
        </div>
      </div>
    </Link>
  )
}
