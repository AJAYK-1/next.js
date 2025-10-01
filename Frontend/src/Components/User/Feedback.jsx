import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useMemo, useState } from 'react'

function Feedback() {
  const [editFB, setEditFB] = useState(false)
  const [feedback, setFeedback] = useState({
    rating: 0,
    comment: ''
  })

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
        else alert(error.response.data.message)
      else alert(error.response?.data?.message)
      console.error(error);
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
        if (response.status === 201) alert(response.data.message)
      } else {
        const response = await axios.post(`${import.meta.env.VITE_HOST_URL}/api/user/add-feedback/${decodedToken.id}`,
          feedback,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        if (response.status === 201) alert(response.data.message)
      }
    } catch (error) {
      if (error.response)
        if (error.response.status === 404) alert(error.response.data.message)
        else alert(error.response.data.message)
      else alert(error.response?.data?.message)
      console.error(error);
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
        alert(response.data.message)
      }
    } catch (error) {
      if (error.response)
        if (error.response.status === 404) alert(error.response.data.message)
        else alert(error.response.data.message)
      else alert(error.response?.data?.message)
      console.error(error);
    }
  }

  return (
    <>
      <div>
        <form onSubmit={Submission}>
          <h3> Rating: </h3>
          <input type="number" name='rating' value={feedback.rating} onChange={valueChange} required />
          <h3> Comment: </h3>
          <textarea type="text" name='comment' value={feedback.comment} onChange={valueChange} required />
          <br />
          <button onClick={(e) => DeleteFeedback(e)}> Delete Feedback </button>
          <button> Submit </button>
        </form>
      </div>
    </>
  )
}

export default Feedback