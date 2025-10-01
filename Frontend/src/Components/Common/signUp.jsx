import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Footer from './Footer'
import Navabar from './Navabar'
import { toast } from 'react-toastify'

function signUp() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })
    const navigate = useNavigate()

    const FormSubmission = async (e) => {
        try {
            e.preventDefault()
            const response = await axios.post(`${import.meta.env.VITE_HOST_URL}/api/user/user-signup`, formData)
            if (response.status === 201) {
                toast.success(response.data.message)
                setFormData({ name: '', email: '', password: '' })
                return navigate('/signIn')
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
                        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                            Sign Up
                        </h1>

                        <form onSubmit={FormSubmission} className="space-y-4">
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Email</label>
                                <input
                                    type="email"
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
                                className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-500 transition-colors duration-200"
                            >
                                Sign Up
                            </button>
                        </form>

                        <p className="text-sm text-gray-500 mt-4 text-center">
                            Already have an account?{" "}
                            <a href="/signIn" className="text-blue-600 hover:underline">
                                Sign In
                            </a>
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default signUp