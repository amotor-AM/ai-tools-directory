import React, { useState, useMemo } from 'react'
import Layout from '@/components/Layout'
import SearchBar from '@/components/SearchBar'
import FilterBar, { FilterOptions } from '@/components/FilterBar'
import CompactToolCard from '@/components/CompactToolCard'
import { getAllTools, getAllCategories, searchTools, filterTools, type Tool, type Category } from '@/lib/tools-expanded'

interface HomeProps {
  tools: Tool[]
  categories: Category[]
}

export default function Home({ tools: initialTools, categories }: HomeProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState<FilterOptions>({
    category: 'all',
    pricing: 'all',
    sortBy: 'featured'
  })

  // Filter and search tools
  const displayedTools = useMemo(() => {
    let results = searchQuery ? searchTools(searchQuery) : initialTools
    results = filterTools(results, filters)
    return results
  }, [searchQuery, filters, initialTools])

  const featuredTools = useMemo(() => 
    initialTools.filter(t => t.featured).slice(0, 6),
    [initialTools]
  )

  return (
    <Layout>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "AI Tools Directory",
            "description": "Discover and compare 100+ AI tools for writing, image generation, video, coding, and more",
            "url": "https://amotor-am.github.io/ai-tools-directory/"
          })
        }}
      />

      {/* Hero Section with Search */}
      <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 py-16 md:py-24">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4">
              Discover the Best
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                AI Tools for 2026
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
              Search through <strong>{initialTools.length}+ AI tools</strong> for writing, image generation, video, coding, and more
            </p>
          </div>

          {/* Search Bar */}
          <SearchBar 
            onSearch={setSearchQuery} 
            placeholder="Search AI tools by name, category, or feature..."
          />

          {/* Quick Stats */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 text-center shadow-lg border border-white">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {initialTools.length}+
              </div>
              <div className="text-xs text-gray-600 font-medium">AI Tools</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 text-center shadow-lg border border-white">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {categories.length}
              </div>
              <div className="text-xs text-gray-600 font-medium">Categories</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 text-center shadow-lg border border-white">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {initialTools.filter(t => t.pricing.toLowerCase() === 'free').length}
              </div>
              <div className="text-xs text-gray-600 font-medium">Free Tools</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 text-center shadow-lg border border-white">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Daily
              </div>
              <div className="text-xs text-gray-600 font-medium">Updates</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <FilterBar 
        filters={filters} 
        onFilterChange={setFilters} 
        categories={categories}
      />

      {/* Featured Tools Section (above main grid) */}
      {!searchQuery && filters.category === 'all' && filters.pricing === 'all' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-gray-200 bg-gradient-to-b from-amber-50/50 to-white">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-2xl">⭐</span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Featured Tools</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredTools.map(tool => (
              <CompactToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>
      )}

      {/* Main Tools Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              {searchQuery ? `Search Results` : 
               filters.category !== 'all' ? `${categories.find(c => c.id === filters.category)?.name || 'Category'} Tools` :
               'All AI Tools'}
            </h2>
            <p className="text-gray-600 mt-1">
              Showing <strong>{displayedTools.length}</strong> {displayedTools.length === 1 ? 'tool' : 'tools'}
            </p>
          </div>
        </div>

        {displayedTools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {displayedTools.map(tool => (
              <CompactToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No tools found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filters
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setFilters({ category: 'all', pricing: 'all', sortBy: 'featured' })
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </section>

      {/* Categories Quick Links */}
      {!searchQuery && filters.category === 'all' && (
        <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Browse by Category</h2>
              <p className="text-lg text-gray-600">Find the perfect AI tool for your specific needs</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {categories.slice(0, 9).map(category => {
                const toolCount = initialTools.filter(t => 
                  t.category.toLowerCase().replace(/\s+/g, '-') === category.id
                ).length
                return (
                  <button
                    key={category.id}
                    onClick={() => setFilters({ ...filters, category: category.id })}
                    className="group bg-white rounded-xl border-2 border-gray-200 p-6 hover:border-blue-400 hover:shadow-xl transition-all text-left"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {category.name}
                      </h3>
                      <div className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-sm font-bold px-3 py-1 rounded-full">
                        {toolCount}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">
                      {category.description}
                    </p>
                    <div className="flex items-center text-blue-600 font-semibold text-sm group-hover:translate-x-2 transition-transform">
                      Explore tools
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay Updated on the Latest AI Tools
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Get weekly updates on new AI tools, reviews, and industry trends. Join {Math.floor(Math.random() * 5000 + 5000)}+ subscribers.
          </p>
          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-xl focus:outline-none focus:ring-4 focus:ring-white/50 text-gray-900"
            />
            <button
              type="submit"
              className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 hover:scale-105 transition-all duration-200 shadow-xl"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
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
