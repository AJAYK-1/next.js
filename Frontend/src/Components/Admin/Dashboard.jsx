import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import Footer from '../Common/Footer'
import AdminNavbar from './AdminNavbar'
import { toast } from 'react-toastify'

function Dashboard() {
  const [feedback, setFeedback] = useState([])

  const token = useMemo(() => localStorage.getItem('token'), [])

  const FetchFeedbacks = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_HOST_URL}/api/admin/view-all-feedbacks`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (response.status === 200) {
        setFeedback(response.data.data)
      }
    } catch (error) {
      if (error.response)
        toast.error(error.response.data.message)
    }
  }

  useEffect(() => {
    FetchFeedbacks()
  }, [])

  return (
    <>
      <AdminNavbar />
      <div className="min-h-screen bg-gray-300 p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Feedback Dashboard
        </h1>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-6 text-left">User</th>
                <th className="py-3 px-6 text-left">Rating</th>
                <th className="py-3 px-6 text-left">Comment</th>
                <th className="py-3 px-6 text-left">Sentiment</th>
              </tr>
            </thead>
            <tbody>
              {feedback.map((fb, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="py-3 px-6">{fb.userId.name}</td>
                  <td className="py-3 px-6">{fb.rating}</td>
                  <td className="py-3 px-6">{fb.comment}</td>
                  <td className="py-3 px-6">{fb.sentiment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Dashboard