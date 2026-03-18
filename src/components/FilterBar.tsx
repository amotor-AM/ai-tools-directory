import React from 'react'

export interface FilterOptions {
  category: string
  pricing: string
  sortBy: string
}

interface FilterBarProps {
  filters: FilterOptions
  onFilterChange: (filters: FilterOptions) => void
  categories: Array<{ id: string; name: string }>
}

const pricingOptions = [
  { value: 'all', label: 'All Pricing' },
  { value: 'free', label: 'Free' },
  { value: 'freemium', label: 'Freemium' },
  { value: 'paid', label: 'Paid' }
]

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'name', label: 'Name (A-Z)' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest' }
]

export default function FilterBar({ filters, onFilterChange, categories }: FilterBarProps) {
  const handleCategoryChange = (category: string) => {
    onFilterChange({ ...filters, category })
  }

  const handlePricingChange = (pricing: string) => {
    onFilterChange({ ...filters, pricing })
  }

  const handleSortChange = (sortBy: string) => {
    onFilterChange({ ...filters, sortBy })
  }

  const clearFilters = () => {
    onFilterChange({ category: 'all', pricing: 'all', sortBy: 'featured' })
  }

  const hasActiveFilters = filters.category !== 'all' || filters.pricing !== 'all' || filters.sortBy !== 'featured'

  return (
    <div className="bg-white border-b border-gray-200 py-4 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-3 flex-1 w-full md:w-auto">
            {/* Category Filter */}
            <div className="relative flex-1 min-w-[200px]">
              <label className="block text-xs font-medium text-gray-700 mb-1">Category</label>
              <select
                value={filters.category}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer hover:border-gray-400 transition"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Pricing Filter */}
            <div className="relative flex-1 min-w-[150px]">
              <label className="block text-xs font-medium text-gray-700 mb-1">Pricing</label>
              <select
                value={filters.pricing}
                onChange={(e) => handlePricingChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer hover:border-gray-400 transition"
              >
                {pricingOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div className="relative flex-1 min-w-[150px]">
              <label className="block text-xs font-medium text-gray-700 mb-1">Sort By</label>
              <select
                value={filters.sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer hover:border-gray-400 transition"
              >
                {sortOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 hover:underline transition"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear Filters
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
