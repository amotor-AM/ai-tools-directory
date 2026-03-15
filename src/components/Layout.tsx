import React from 'react'
import Link from 'next/link'
import Head from 'next/head'

interface LayoutProps {
  children: React.ReactNode
  title?: string
  description?: string
  keywords?: string
}

export default function Layout({ 
  children, 
  title = 'AI Tools Directory - Find the Best AI Tools for 2026',
  description = 'Discover and compare the best AI tools for 2026. Reviews, pricing, features, and alternatives for AI assistants, writing tools, image generators, video creators, and more.',
  keywords = 'AI tools, artificial intelligence, AI software, AI review, ChatGPT, Claude, Midjourney, best AI tools 2026'
}: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />

        {/* Structured Data (LD+JSON) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://amotor-am.github.io/ai-tools-directory/#organization",
                  "name": "AI Tools Directory",
                  "url": "https://amotor-am.github.io/ai-tools-directory/",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://amotor-am.github.io/ai-tools-directory/logo.png",
                    "width": 512,
                    "height": 512
                  },
                  "description": "Comprehensive directory of AI tools with reviews, comparisons, and alternatives.",
                  "sameAs": []
                },
                {
                  "@type": "WebSite",
                  "@id": "https://amotor-am.github.io/ai-tools-directory/#website",
                  "url": "https://amotor-am.github.io/ai-tools-directory/",
                  "name": "AI Tools Directory",
                  "description": "Discover and compare the best AI tools for 2026",
                  "publisher": {
                    "@id": "https://amotor-am.github.io/ai-tools-directory/#organization"
                  },
                  "inLanguage": "en-US"
                },
                {
                  "@type": "CollectionPage",
                  "@id": "https://amotor-am.github.io/ai-tools-directory/#webpage",
                  "url": "https://amotor-am.github.io/ai-tools-directory/",
                  "name": title,
                  "description": description,
                  "isPartOf": {
                    "@id": "https://amotor-am.github.io/ai-tools-directory/#website"
                  },
                  "about": {
                    "@id": "https://amotor-am.github.io/ai-tools-directory/#organization"
                  },
                  "primaryImageOfPage": {
                    "@type": "ImageObject",
                    "url": "https://amotor-am.github.io/ai-tools-directory/og-image.png",
                    "width": 1200,
                    "height": 630
                  },
                  "datePublished": "2026-03-15T00:00:00+00:00",
                  "dateModified": "2026-03-15T00:00:00+00:00",
                  "breadcrumb": {
                    "@type": "BreadcrumbList",
                    "itemListElement": [
                      {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": "https://amotor-am.github.io/ai-tools-directory/"
                      }
                    ]
                  },
                  "potentialAction": [
                    {
                      "@type": "ReadAction",
                      "target": [
                        "https://amotor-am.github.io/ai-tools-directory/"
                      ]
                    }
                  ]
                }
              ]
            })
          }}
        />
      </Head>

      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link href="/" className="flex items-center">
                  <span className="text-2xl font-bold text-primary">AI Tools Directory</span>
                </Link>
              </div>
              <div className="flex items-center space-x-8">
                <Link href="/tools" className="text-gray-700 hover:text-primary transition">
                  All Tools
                </Link>
                <Link href="/categories" className="text-gray-700 hover:text-primary transition">
                  Categories
                </Link>
                <Link href="/compare" className="text-gray-700 hover:text-primary transition">
                  Compare
                </Link>
                <Link href="/blog" className="text-gray-700 hover:text-primary transition">
                  Blog
                </Link>
              </div>
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-bold text-lg mb-4">AI Tools Directory</h3>
                <p className="text-gray-600 text-sm">
                  Discover and compare the best AI tools for 2026.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Categories</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/tools/category/ai-assistants" className="text-gray-600 hover:text-primary">AI Assistants</Link></li>
                  <li><Link href="/tools/category/ai-writing" className="text-gray-600 hover:text-primary">AI Writing</Link></li>
                  <li><Link href="/tools/category/ai-image" className="text-gray-600 hover:text-primary">AI Image</Link></li>
                  <li><Link href="/tools/category/ai-video" className="text-gray-600 hover:text-primary">AI Video</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Resources</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/blog" className="text-gray-600 hover:text-primary">Blog</Link></li>
                  <li><Link href="/guides" className="text-gray-600 hover:text-primary">Guides</Link></li>
                  <li><Link href="/compare" className="text-gray-600 hover:text-primary">Comparisons</Link></li>
                  <li><Link href="/best" className="text-gray-600 hover:text-primary">Best Of Lists</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Legal</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/privacy" className="text-gray-600 hover:text-primary">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="text-gray-600 hover:text-primary">Terms of Service</Link></li>
                  <li><Link href="/contact" className="text-gray-600 hover:text-primary">Contact</Link></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
              <p>© 2026 AI Tools Directory. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
