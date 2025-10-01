import React from 'react'
import Navabar from './Navabar'
import Footer from './Footer'

function Home() {
  return (
    <>
      <Navabar />
      <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
        <div className="absolute inset-0">
          <img
            src="/fbbg1.jpg"
            alt="background"
            className="w-full h-full object-cover filter blur-sm"
          />
        </div>

        <div className="relative z-10 flex flex-col items-center">

          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8 text-shadow-md text-shadow-gray-500">
            Welcome to Feedback App
          </h1>

          <div className="flex flex-col md:flex-row gap-4">
            <a href="/signIn"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-500 transition-colors duration-200 text-center"          >
              Sign In
            </a>

            <a href="/signUp"
              className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-500 transition-colors duration-200 text-center"          >
              Sign Up
            </a>
          </div>
        </div>

      </div>
      <Footer />
    </>
  )
}

export default Home