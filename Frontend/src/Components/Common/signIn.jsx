import axios from 'axios'
import React, { useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import Navabar from './Navabar'
import Footer from './Footer'
import { toast } from 'react-toastify'

function signIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const navigate = useNavigate()
  const handleSubmission = async (e) => {
    try {
      e.preventDefault()
      const response = await axios.post(`${import.meta.env.VITE_HOST_URL}/api/user/signIn`, formData)
      if (response.status === 200) {
        toast.success(response.data.message)
        const token = response.data.token
        localStorage.setItem('token', token)
        const decodedToken = jwtDecode(token)
        localStorage.setItem('role', decodedToken.role)
        localStorage.setItem('isLoggedin', 'true')
        if (decodedToken.role === 'user') {
          setTimeout(() => {
            navigate('/user-feedback')
          }, 2000)
        }
        else if (decodedToken.role === 'admin') {
          setTimeout(() => {
            navigate('/admin-dashboard')
          }, 2000);
        }
      }
    } catch (error) {
      if (error.response)
        toast.error(error.response.data.message)
    }
  }

  return (
    <>
      <Navabar />
      <div className="relative min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
        <div className="absolute inset-0">
          <img
            src="/fbbg1.jpg"
            alt="background"
            className="w-full h-full object-cover filter blur-sm"
          />
        </div>

        <div className="relative z-10 flex flex-col items-center w-full">
          <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Sign In
            </h2>

            <form onSubmit={handleSubmission} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Email</label>
                <input
                  type="text"
                  name="email"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-500 transition-colors duration-200"
              >
                Sign In
              </button>
            </form>

            <p className="text-sm text-gray-500 mt-4 text-center">
              Don't have an account?{" "}
              <a href="/signUp" className="text-blue-600 hover:underline">
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default signIn