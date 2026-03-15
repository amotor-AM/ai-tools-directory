import React from 'react'
import Layout from '@/components/Layout'
import Link from 'next/link'
import { getAllCategories, getToolsByCategory } from '@/lib/tools'
import type { Category } from '@/lib/tools'

interface CategoriesPageProps {
  categories: Category[]
  toolCounts: Record<string, number>
}

export default function CategoriesPage({ categories, toolCounts }: CategoriesPageProps) {
  return (
    <Layout
      title="AI Tool Categories - AI Tools Directory"
      description="Browse AI tools by category: AI Assistants, AI Writing, Image Generation, Video Creation, and more. Find the perfect tool for your specific needs."
      keywords="AI categories, AI tool types, AI assistants, AI writing tools, AI image generators"
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Browse by Category
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl">
            Explore AI tools organized by category. Find the perfect solution for your specific use case.
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map(category => {
            const toolCount = toolCounts[category.id] || 0
            return (
              <Link
                key={category.id}
                href={`/tools/category/${category.slug}`}
                className="group bg-white rounded-xl border border-gray-200 p-8 hover:shadow-xl hover:border-blue-300 transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h2>
                  <div className="bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1 rounded-full">
                    {toolCount}
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6">
                  {category.description}
                </p>
                
                <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform">
                  Browse tools
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </Link>
            )
          })}
        </div>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const categories = getAllCategories()
  const toolCounts: Record<string, number> = {}
  
  categories.forEach(category => {
    toolCounts[category.id] = getToolsByCategory(category.id).length
  })

  return {
    props: {
      categories,
      toolCounts,
    },
  }
}
