import React from 'react'
import Navabar from './Navabar'
import Footer from './Footer'

function Home() {
  return (
    <>
      <Navabar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
          Welcome
        </h1>

        <div className="flex flex-col md:flex-row gap-4">
          <a
            href="/signIn"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-500 transition-colors duration-200 text-center"
          >
            Sign In
          </a>

          <a
            href="/signUp"
            className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-500 transition-colors duration-200 text-center"
          >
            Sign Up
          </a>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Home