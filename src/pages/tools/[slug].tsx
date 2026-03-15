import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import Layout from '@/components/Layout'
import ToolCard from '@/components/ToolCard'
import { getAllTools, getToolBySlug, getRelatedTools, generateToolPageMetadata } from '@/lib/tools'
import type { Tool } from '@/lib/tools'

interface ToolPageProps {
  tool: Tool
  relatedTools: Tool[]
}

export default function ToolPage({ tool, relatedTools }: ToolPageProps) {
  const metadata = generateToolPageMetadata(tool)

  return (
    <Layout
      title={metadata.title}
      description={metadata.description}
      keywords={metadata.keywords}
    >
      {/* Breadcrumbs */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex text-sm text-gray-600">
            <a href="/" className="hover:text-blue-600">Home</a>
            <span className="mx-2">/</span>
            <a href="/tools/" className="hover:text-blue-600">Tools</a>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{tool.name}</span>
          </nav>
        </div>
      </div>

      {/* Tool Header */}
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {tool.name}
              </h1>
              <p className="text-xl text-gray-700 mb-6">
                {tool.shortDescription}
              </p>
              <div className="flex flex-wrap gap-2">
                {tool.tags.map(tag => (
                  <span key={tag} className="bg-white text-gray-700 text-sm px-3 py-1 rounded-full border border-gray-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <a
                href={tool.affiliateLink || tool.website}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition text-center"
              >
                Visit Website →
              </a>
              {tool.pricing.free && (
                <span className="bg-green-100 text-green-800 text-sm font-semibold px-4 py-2 rounded-lg text-center">
                  Free Plan Available
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <section className="bg-white rounded-xl border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About {tool.name}</h2>
              <p className="text-gray-700 leading-relaxed">{tool.description}</p>
            </section>

            {/* Features */}
            <section className="bg-white rounded-xl border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h2>
              <ul className="space-y-3">
                {tool.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Pros & Cons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <section className="bg-white rounded-xl border border-gray-200 p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                  Pros
                </h2>
                <ul className="space-y-2">
                  {tool.pros.map((pro, index) => (
                    <li key={index} className="text-gray-700 text-sm">• {pro}</li>
                  ))}
                </ul>
              </section>

              <section className="bg-white rounded-xl border border-gray-200 p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <svg className="w-6 h-6 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                  </svg>
                  Cons
                </h2>
                <ul className="space-y-2">
                  {tool.cons.map((con, index) => (
                    <li key={index} className="text-gray-700 text-sm">• {con}</li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Best For */}
            <section className="bg-blue-50 rounded-xl border border-blue-200 p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Best For</h2>
              <p className="text-gray-700">{tool.bestFor}</p>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing */}
            <section className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Pricing</h3>
              <div className="space-y-4">
                {tool.pricing.plans.map((plan, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">{plan.name}</h4>
                    <p className="text-2xl font-bold text-blue-600 mb-3">
                      {plan.price === null ? 'Custom' : plan.price === 0 ? 'Free' : `$${plan.price}/mo`}
                    </p>
                    <ul className="space-y-1">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="text-sm text-gray-600">✓ {feature}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <a
                href={tool.affiliateLink || tool.website}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-blue-600 text-white text-center px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition mt-6"
              >
                Get Started
              </a>
            </section>
          </div>
        </div>

        {/* Related Tools */}
        {relatedTools.length > 0 && (
          <section className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedTools.map(relatedTool => (
                <ToolCard key={relatedTool.id} tool={relatedTool} />
              ))}
            </div>
          </section>
        )}
      </div>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const tools = getAllTools()
  const paths = tools.map(tool => ({
    params: { slug: tool.slug }
  }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const tool = getToolBySlug(params?.slug as string)
  
  if (!tool) {
    return {
      notFound: true
    }
  }

  const relatedTools = getRelatedTools(tool, 3)

  return {
    props: {
      tool,
      relatedTools
    }
  }
}
