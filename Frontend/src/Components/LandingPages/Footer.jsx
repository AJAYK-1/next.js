import React from 'react'

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200 py-6 mt-auto">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">

        <p className="text-sm">&copy; {new Date().getFullYear()} Feedback App. All rights reserved.</p>

        <div className="flex space-x-4 mt-2 md:mt-0">
          <a
            href="/about"
            className="hover:text-white transition-colors duration-200 text-sm"
          >
            About
          </a>
          <a
            href="/contact"
            className="hover:text-white transition-colors duration-200 text-sm"
          >
            Contact
          </a>
          <a
            href="/privacy"
            className="hover:text-white transition-colors duration-200 text-sm"
          >
            Privacy
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer