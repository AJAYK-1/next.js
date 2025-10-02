import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid,
    PieChart, Pie, Cell
} from 'recharts'
import AdminNavbar from './AdminNavbar'
import { FaCommentDots, FaUser } from 'react-icons/fa'

function AdminHome() {
    const [feedback, setFeedback] = useState([])
    const [users, setUsers] = useState([])

    const token = useMemo(() => localStorage.getItem('token'), [])

    const FetchFeedbacks = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_HOST_URL}/api/admin/view-all-feedbacks`,
                { headers: { Authorization: `Bearer ${token}` } }
            )
            if (response.status === 200) {
                setFeedback(response.data.data)
            }
        } catch (error) {
            if (error.response) toast.error(error.response.data.message)
        }
    }

    const FetchUsers = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_HOST_URL}/api/admin/view-all-users`,
                { headers: { Authorization: `Bearer ${token}` } }
            )
            if (response.status === 200) {
                setUsers(response.data.data)
            }
        } catch (error) {
            if (error.response) toast.error(error.response.data.message)
        }
    }

    useEffect(() => {
        FetchFeedbacks()
        FetchUsers()
    }, [])

    const ratingData = [1, 2, 3, 4, 5].map(r => ({
        rating: r,
        count: feedback.filter(fb => fb.rating === r).length
    }))

    const uniqueSentiments = [...new Set(feedback.map(fb => fb.sentiment))]

    const sentimentData = uniqueSentiments.map(s => ({
        name: s,
        value: feedback.filter(fb => fb.sentiment === s).length
    }))

    const COLORS = ['#4CAF50', '#F44336', '#9C27B0', '#FFC107', '#2196F3', '#FF9800', '#00BCD4', '#8BC34A', '#E91E63']

    return (
        <>
            <AdminNavbar />
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 bg-cyan-50">
                <div className="bg-white p-4 shadow rounded-lg">
                    <h2 className="text-xl font-bold mb-4">Ratings Distribution</h2>
                    <BarChart width={400} height={300} data={ratingData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="rating" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#4F46E5" />
                    </BarChart>
                </div>

                <div className="bg-white p-4 shadow rounded-lg">
                    <h2 className="text-xl font-bold mb-4">Sentiment Analysis</h2>
                    <PieChart width={400} height={300}>
                        <Pie
                            data={sentimentData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            label
                        >
                            {sentimentData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-cyan-50">
                <div className="bg-white shadow-md rounded-lg p-6 text-center">
                    <div className='flex justify-center'>
                        <FaUser color='blue' size={50} />
                    </div>
                    <h3 className="text-lg font-medium text-gray-700">Total Users</h3>
                    <p className="text-3xl font-bold text-blue-600 mt-2">{users.length}</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-6 text-center">
                    <div className='flex justify-center'>
                        <FaCommentDots color='green' size={50} />
                    </div>
                    <h3 className="text-lg font-medium text-gray-700">Total Feedbacks</h3>
                    <p className="text-3xl font-bold text-green-600 mt-2">{feedback.length}</p>
                </div>
            </div>
        </>
    )
}

export default AdminHome
