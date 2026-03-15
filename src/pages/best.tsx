import React from 'react'
import Layout from '@/components/Layout'

export default function BestPage() {
  return (
    <Layout
      title="Best AI Tools Lists - Top Picks for 2026"
      description="Curated lists of the best AI tools for specific use cases. Find the perfect tool for your needs."
    >
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Best AI Tools Lists
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl">
            Curated collections of the best AI tools for every use case.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Coming Soon</h2>
          <p className="text-gray-600 mb-6">
            We're curating the best lists for you. Check back soon!
          </p>
          <a
            href="/tools/"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Browse All Tools
          </a>
        </div>
      </section>
    </Layout>
  )
}
