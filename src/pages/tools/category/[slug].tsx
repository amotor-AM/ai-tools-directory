import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import Layout from '@/components/Layout'
import ToolCard from '@/components/ToolCard'
import { getAllCategories, getCategoryBySlug, getToolsByCategory } from '@/lib/tools'
import type { Tool, Category } from '@/lib/tools'

interface CategoryPageProps {
  category: Category
  tools: Tool[]
}

export default function CategoryPage({ category, tools }: CategoryPageProps) {
  return (
    <Layout
      title={`${category.name} - Best AI Tools for ${category.name} in 2026`}
      description={`${category.description} Explore the best ${category.name.toLowerCase()} tools with reviews, pricing, and comparisons.`}
      keywords={`${category.name}, AI ${category.name.toLowerCase()}, best ${category.name.toLowerCase()} tools`}
    >
      {/* Breadcrumbs */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex text-sm text-gray-600">
            <a href="/" className="hover:text-blue-600">Home</a>
            <span className="mx-2">/</span>
            <a href="/categories/" className="hover:text-blue-600">Categories</a>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{category.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {category.name}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mb-6">
            {category.description}
          </p>
          <p className="text-gray-600">
            Found {tools.length} tool{tools.length !== 1 ? 's' : ''} in this category
          </p>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {tools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No tools found in this category yet.</p>
            <a href="/tools/" className="mt-4 text-blue-600 hover:text-blue-800 font-semibold inline-block">
              Browse all tools →
            </a>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Looking for More {category.name} Tools?
          </h2>
          <p className="text-blue-100 text-lg mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter to get updates on new {category.name.toLowerCase()} tools and features.
          </p>
          <a
            href="/"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Subscribe Now
          </a>
        </div>
      </section>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = getAllCategories()
  const paths = categories.map(category => ({
    params: { slug: category.slug }
  }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const category = getCategoryBySlug(params?.slug as string)
  
  if (!category) {
    return {
      notFound: true
    }
  }

  const tools = getToolsByCategory(category.id)

  return {
    props: {
      category,
      tools
    }
  }
}
