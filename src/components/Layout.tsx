import React, { useState } from 'react'
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

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
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              {/* Logo */}
              <div className="flex items-center">
                <Link href="/" className="flex items-center group">
                  <svg className="w-8 h-8 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    AI Tools Directory
                  </span>
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                <Link href="/tools/" className="text-gray-700 hover:text-blue-600 transition font-medium">
                  All Tools
                </Link>
                <Link href="/categories/" className="text-gray-700 hover:text-blue-600 transition font-medium">
                  Categories
                </Link>
                <Link href="/compare/" className="text-gray-700 hover:text-blue-600 transition font-medium">
                  Compare
                </Link>
                <Link href="/blog/" className="text-gray-700 hover:text-blue-600 transition font-medium">
                  Blog
                </Link>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden flex items-center">
                <button
                  onClick={toggleMobileMenu}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition"
                  aria-expanded={mobileMenuOpen}
                >
                  <span className="sr-only">Open main menu</span>
                  {!mobileMenuOpen ? (
                    // Hamburger icon
                    <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  ) : (
                    // Close icon
                    <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </nav>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 bg-white">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link
                  href="/tools/"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  All Tools
                </Link>
                <Link
                  href="/categories/"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Categories
                </Link>
                <Link
                  href="/compare/"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Compare
                </Link>
                <Link
                  href="/blog/"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Blog
                </Link>
              </div>
            </div>
          )}
        </header>

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-gradient-to-br from-gray-50 to-gray-100 border-t border-gray-200 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center mb-4">
                  <svg className="w-6 h-6 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                  <h3 className="font-bold text-lg">AI Tools Directory</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Discover and compare the best AI tools for 2026.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4 text-gray-900">Categories</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/tools/category/ai-assistants" className="text-gray-600 hover:text-blue-600 transition">AI Assistants</Link></li>
                  <li><Link href="/tools/category/ai-writing" className="text-gray-600 hover:text-blue-600 transition">AI Writing</Link></li>
                  <li><Link href="/tools/category/ai-image" className="text-gray-600 hover:text-blue-600 transition">AI Image</Link></li>
                  <li><Link href="/tools/category/ai-video" className="text-gray-600 hover:text-blue-600 transition">AI Video</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4 text-gray-900">Resources</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/blog/" className="text-gray-600 hover:text-blue-600 transition">Blog</Link></li>
                  <li><Link href="/guides/" className="text-gray-600 hover:text-blue-600 transition">Guides</Link></li>
                  <li><Link href="/compare/" className="text-gray-600 hover:text-blue-600 transition">Comparisons</Link></li>
                  <li><Link href="/best/" className="text-gray-600 hover:text-blue-600 transition">Best Of Lists</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4 text-gray-900">Legal</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/privacy/" className="text-gray-600 hover:text-blue-600 transition">Privacy Policy</Link></li>
                  <li><Link href="/terms/" className="text-gray-600 hover:text-blue-600 transition">Terms of Service</Link></li>
                  <li><Link href="/contact/" className="text-gray-600 hover:text-blue-600 transition">Contact</Link></li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-300 text-center text-sm text-gray-600">
              <p>© 2026 AI Tools Directory. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
