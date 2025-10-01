import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios'

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
        if (error.response.status === 404) alert(error.response.data.message)
        else alert(error.response.data.message)
      else alert(error.response?.data?.message)
      console.error(error);
    }
  }

  useEffect(() => {
    FetchFeedbacks()
  }, [])

  return (
    <>
      <div>
        <table>
          <thead>
            <tr>
              <th> User </th>
              <th> Rating </th>
              <th> Comment </th>
              <th> Sentiment </th>
            </tr>
          </thead>
          <tbody>
            {feedback.map((fb, index) =>
              <tr key={index}>
                <td> {fb.userId.name} </td>
                <td> {fb.rating} </td>
                <td> {fb.comment} </td>
                <td> {fb.sentiment} </td>
              </tr>
            )}
          </tbody>
        </table>

      </div>
    </>
  )
}

export default Dashboard