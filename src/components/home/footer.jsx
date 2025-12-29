import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="w-full bg-gray-300 mt-10 pt-8 pb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Desktop: 3 columns, Tablet: 2 columns, Mobile: 1 column */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center sm:text-left">

          {/* Company Info */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-green-700">Krishiyog</h1>
            <p className="text-sm mt-2 mb-3">Your trusted partner in agriculture</p>
            <p className="text-sm">Terna Engineering College</p>
            <p className="text-sm">Nerul, Navi Mumbai</p>
            <p className="text-sm mt-2 font-semibold">+91 9876543210</p>
          </div>

          {/* Policies */}
          <div>
            <h2 className="text-lg font-bold mb-3">Our Policies</h2>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy" className="hover:text-green-700 transition">Privacy Policy</Link></li>
              <li><Link to="/shipping" className="hover:text-green-700 transition">Shipping & Delivery</Link></li>
              <li><Link to="/cancellation" className="hover:text-green-700 transition">Cancellation Policy</Link></li>
              <li><Link to="/terms" className="hover:text-green-700 transition">Terms of Use</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h2 className="text-lg font-bold mb-3">Get Help</h2>
            <ul className="space-y-2 text-sm">
              <li><Link to="/contact" className="hover:text-green-700 transition">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-green-700 transition">FAQs</Link></li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-400">
          <p className="text-center text-sm text-gray-600">
            © 2025 Krishiyog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer