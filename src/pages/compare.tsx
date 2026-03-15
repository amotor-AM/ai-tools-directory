import React from 'react'
import Layout from '@/components/Layout'

export default function ComparePage() {
  return (
    <Layout
      title="Compare AI Tools - AI Tools Directory"
      description="Compare AI tools side-by-side to find the best solution for your needs. Compare features, pricing, and performance."
    >
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Compare AI Tools
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl">
            Side-by-side comparison of AI tools to help you make the best choice.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Coming Soon</h2>
          <p className="text-gray-600 mb-6">
            We're building a powerful comparison tool. Check back soon!
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
