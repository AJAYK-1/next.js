import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useMemo, useState } from 'react'
import Footer from '../Common/Footer'
import UserNavbar from './UserNavbar'
import { FaStar } from 'react-icons/fa'
import { toast } from 'react-toastify'

function Feedback() {
  const [editFB, setEditFB] = useState(false)
  const [feedback, setFeedback] = useState({
    rating: 0,
    comment: ''
  })
  const [hover, setHover] = useState(0)

  const token = useMemo(() => localStorage.getItem('token'), [])
  const decodedToken = useMemo(() => jwtDecode(localStorage.getItem('token')), [])

  const currentFB = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_HOST_URL}/api/user/existing-feedback/${decodedToken.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (response.status === 200) {
        const currentData = response.data.data
        setFeedback({ rating: currentData.rating, comment: currentData.comment })
        setEditFB(true)
      }
    } catch (error) {
      if (error.response)
        if (error.response.status === 404) setFeedback({ rating: 0, comment: '' })
        else toast.error(error.response.data.message)
    }
  }

  useEffect(() => {
    currentFB()
  }, [])

  const valueChange = async (e) => setFeedback({ ...feedback, [e.target.name]: e.target.value })

  const Submission = async (e) => {
    try {
      e.preventDefault()
      if (editFB === true) {
        const response = await axios.put(`${import.meta.env.VITE_HOST_URL}/api/user/edit-feedback/${decodedToken.id}`,
          feedback,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        if (response.status === 201) toast.success(response.data.message)
      } else {
        const response = await axios.post(`${import.meta.env.VITE_HOST_URL}/api/user/add-feedback/${decodedToken.id}`,
          feedback,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        if (response.status === 201) toast.success(response.data.message)
      }
      setTimeout(() => {
        window.location.reload()
      }, 2000);
    } catch (error) {
      if (error.response)
        toast.error(error.response.data.message)
    }
  }

  const DeleteFeedback = async (e) => {
    try {
      e.preventDefault()
      const response = await axios.delete(`${import.meta.env.VITE_HOST_URL}/api/user/delete-feedback/${decodedToken.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (response.status === 201) {
        setEditFB(false)
        toast.success(response.data.message)
      }
      setTimeout(() => {
        window.location.reload()
      }, 2000);
    } catch (error) {
      if (error.response)
        toast.error(error.response.data.message)
    }
  }

  return (
    <>
      <UserNavbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            {editFB ? "Edit Your Feedback" : "Add Your Feedback"}
          </h2>

          <form onSubmit={Submission} className="space-y-4">

            <div>
              <label className="block text-gray-700 font-medium mb-1">Rating</label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => {
                  const isFilled = hover >= star || (!hover && feedback.rating >= star)
                  return (
                    <FaStar
                      key={star}
                      size={28}
                      className="cursor-pointer transition-colors duration-200"
                      color={isFilled ? "#FACC15" : "#E5E7EB"}
                      onClick={() => setFeedback({ ...feedback, rating: star })}
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(0)}
                    />
                  )
                })}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Comment</label>
              <textarea
                name="comment"
                value={feedback.comment}
                onChange={valueChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                required
              />
            </div>

            <div className="flex justify-between gap-4">
              <button type="button" onClick={DeleteFeedback}
                className="flex-1 bg-red-600 text-white font-semibold py-2 rounded-lg hover:bg-red-500 transition-colors duration-200"              >
                Delete Feedback
              </button>

              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-500 transition-colors duration-200"              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Feedback