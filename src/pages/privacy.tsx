import React from 'react'
import Layout from '@/components/Layout'

export default function PrivacyPage() {
  return (
    <Layout
      title="Privacy Policy - AI Tools Directory"
      description="Privacy policy for AI Tools Directory. Learn how we protect your data."
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
            <p>
              AI Tools Directory is committed to protecting your privacy. We collect minimal information 
              necessary to provide our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
            <p>
              Any information we collect is used solely to improve our service and provide you with 
              relevant AI tool recommendations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
            <p>
              We implement appropriate security measures to protect your information from unauthorized 
              access or disclosure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p>
              If you have any questions about our privacy policy, please <a href="/contact/" className="text-blue-600 hover:text-blue-800">contact us</a>.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  )
}
