import React from 'react'
import Layout from '@/components/Layout'

export default function GuidesPage() {
  return (
    <Layout
      title="AI Tools Guides & Tutorials"
      description="Learn how to use AI tools effectively with our comprehensive guides and tutorials."
    >
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Guides & Tutorials
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl">
            Master AI tools with our step-by-step guides and expert tutorials.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Coming Soon</h2>
          <p className="text-gray-600 mb-6">
            Comprehensive guides are on the way!
          </p>
          <a
            href="/tools/"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Explore Tools
          </a>
        </div>
      </section>
    </Layout>
  )
}
