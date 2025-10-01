import React from 'react'

function Navabar() {
    return (
        <nav className="bg-blue-600 text-white px-6 py-4 flex items-center justify-between shadow-md">

            <div className="text-2xl font-bold">
                Feedback App
            </div>


            <div className="space-x-6">
                <a
                    href="/signIn"
                    className="hover:text-blue-200 transition-colors duration-200 font-medium"
                >
                    Sign In
                </a>
                <a
                    href="/signUp"
                    className="hover:text-blue-200 transition-colors duration-200 font-medium"
                >
                    Sign Up
                </a>
            </div>
        </nav>

    )
}

export default Navabar