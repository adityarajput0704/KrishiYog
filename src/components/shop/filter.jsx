import React, { useState } from 'react'

const Filter = ({ selectedCategory, setSelectedCategory }) => {
  const [isOpen, setIsOpen] = useState(true) // Sidebar open by default

  const categories = [
    { id: "all", label: "All Products",  },
    { id: "fruit", label: "Fruits",  },
    { id: "vegetable", label: "Vegetables" },
    { id: "grain", label: "Grains", }
  ]

  return (
    <>
      <div className="w-full bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition font-semibold"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
          </button>
          
          {/* Active Filter Badge */}
          {selectedCategory !== "all" && (
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
              {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} selected
            </span>
          )}
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 backdrop-blur-md bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div 
        className={`
          fixed left-0 top-0 bottom-0 z-50
          w-80 bg-white shadow-2xl
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          overflow-y-auto
        `}
      >
        
        {/* Sidebar Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Filters</h2>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700 p-1 hover:bg-gray-100 rounded-lg transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="p-6">
          
          {/* Category Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              Categories
            </h3>

            <div className="flex flex-col gap-3">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  className={`
                    w-full text-left px-4 py-3 rounded-lg 
                    flex items-center gap-3
                    transition-all duration-200
                    ${selectedCategory === cat.id
                      ? "bg-green-600 text-white font-semibold shadow-md"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
                    }
                  `}
                  onClick={() => {
                    setSelectedCategory(cat.id)
                    setIsOpen(false)
                  }}
                >
                  <span className="text-2xl">{cat.icon}</span>
                  <span className="text-base">{cat.label}</span>
                  {selectedCategory === cat.id && (
                    <svg className="w-5 h-5 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Price Range
            </h3>
            
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 transition text-sm">
                Under ₹500
              </button>
              <button className="w-full text-left px-4 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 transition text-sm">
                ₹500 - ₹1000
              </button>
              <button className="w-full text-left px-4 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 transition text-sm">
                ₹1000 - ₹2000
              </button>
              <button className="w-full text-left px-4 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 transition text-sm">
                Above ₹2000
              </button>
            </div>
          </div>

          {/* Availability Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Availability
            </h3>
            
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 px-3 py-2 rounded-lg transition">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                <span className="text-sm text-gray-700">In Stock</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 px-3 py-2 rounded-lg transition">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                <span className="text-sm text-gray-700">On Sale</span>
              </label>
            </div>
          </div>

          {/* Clear Filters Button */}
          <button 
            onClick={() => setSelectedCategory("all")}
            className="w-full px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition"
          >
            Clear All Filters
          </button>
        </div>

      </div>
    </>
  )
}

export default Filter
