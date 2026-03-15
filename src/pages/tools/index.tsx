import React, { useState } from 'react'
import Layout from '@/components/Layout'
import ToolCard from '@/components/ToolCard'
import { getAllTools, getAllCategories } from '@/lib/tools'
import type { Tool, Category } from '@/lib/tools'

interface ToolsPageProps {
  tools: Tool[]
  categories: Category[]
}

export default function ToolsPage({ tools, categories }: ToolsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredTools = tools.filter(tool => {
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tool.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <Layout
      title="All AI Tools - AI Tools Directory"
      description="Browse our complete collection of AI tools. Filter by category, search by name, and find the perfect AI tool for your needs."
      keywords="AI tools, AI software, artificial intelligence tools, best AI tools 2026"
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            All AI Tools
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl">
            Explore our complete collection of {tools.length} AI tools. Filter by category or search to find exactly what you need.
          </p>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            {/* Category Filter */}
            <div className="w-full md:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Results Count */}
          <p className="text-sm text-gray-600 mt-4">
            Showing {filteredTools.length} of {tools.length} tools
          </p>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No tools found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('all')
              }}
              className="mt-4 text-blue-600 hover:text-blue-800 font-semibold"
              type="button"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const tools = getAllTools()
  const categories = getAllCategories()

  return {
    props: {
      tools,
      categories,
    },
  }
}
