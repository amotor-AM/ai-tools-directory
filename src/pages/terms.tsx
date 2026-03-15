import React from 'react'
import Layout from '@/components/Layout'

export default function TermsPage() {
  return (
    <Layout
      title="Terms of Service - AI Tools Directory"
      description="Terms of service for AI Tools Directory."
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        
        <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceptance of Terms</h2>
            <p>
              By accessing and using AI Tools Directory, you accept and agree to be bound by the 
              terms and provisions of this agreement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Use License</h2>
            <p>
              Permission is granted to temporarily access the materials on AI Tools Directory for 
              personal, non-commercial use only.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Disclaimer</h2>
            <p>
              The materials on AI Tools Directory are provided on an 'as is' basis. We make no 
              warranties, expressed or implied, and disclaim all other warranties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Affiliate Links</h2>
            <p>
              This site may contain affiliate links. We may earn a commission when you click on 
              certain links, at no additional cost to you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact</h2>
            <p>
              Questions about the Terms of Service? <a href="/contact/" className="text-blue-600 hover:text-blue-800">Contact us</a>.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  )
}
