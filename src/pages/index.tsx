import React from 'react'
import Layout from '@/components/Layout'
import ToolCard from '@/components/ToolCard'
import { getAllTools, getAllCategories, getToolsByCategory } from '@/lib/tools'
import type { Tool, Category } from '@/lib/tools'

interface HomeProps {
  tools: Tool[]
  categories: Category[]
}

export default function Home({ tools, categories }: HomeProps) {
  // Get top 6 tools to feature on homepage
  const featuredTools = tools.slice(0, 6)

  return (
    <Layout>
      {/* Structured Data for Featured Tools */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": featuredTools.map((tool, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "Product",
                "name": tool.name,
                "description": tool.shortDescription,
                "url": `https://amotor-am.github.io/ai-tools-directory/tools/${tool.slug}/`,
                "category": tool.category
              }
            }))
          })
        }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Discover the Best AI Tools for 2026
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Compare features, pricing, and alternatives for the top AI assistants, 
            writing tools, image generators, video creators, and more.
          </p>
          <div className="flex justify-center gap-4">
            <a 
              href="/tools" 
              className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Browse All Tools
            </a>
            <a 
              href="/categories" 
              className="bg-white text-primary border-2 border-primary px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              View Categories
            </a>
          </div>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured AI Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTools.map(tool => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map(category => {
              const toolCount = getToolsByCategory(category.id).length
              return (
                <a
                  key={category.id}
                  href={`/tools/category/${category.slug}`}
                  className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {category.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {toolCount} tool{toolCount !== 1 ? 's' : ''}
                    </span>
                    <span className="text-primary text-sm hover:text-blue-700">
                      Browse →
                    </span>
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Stay Updated on the Latest AI Tools
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Get weekly updates on new AI tools, reviews, and industry trends.
          </p>
          <form className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
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
