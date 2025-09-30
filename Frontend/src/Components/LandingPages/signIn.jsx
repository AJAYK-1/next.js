import axios from 'axios'
import React, { useState } from 'react'

function signIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmission = async (e) => {
    try {
      e.preventDefault()
      const response = await axios.post(`${import.meta.env.VITE_HOST_URL}/api/user/signIn`, formData)
      if (response.status === 200) {
        const token = response.data.token
        localStorage.setItem('token', token)
      }
    } catch (error) {
      if (error.response)
        if (error.response.status === 404) alert(error.response.data.message)
        else alert(error.response.data.message)
      else alert(error.response.data.message)
      console.error(error.message);
    }
  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmission}>
          <h3> Email: </h3>
          <input type="email" name='email' onChange={handleChange} required />
          <h3> Password: </h3>
          <input type="password" name='password' onChange={handleChange} required />
          <br />
          <button type='submit'> SignIn </button>
        </form>
      </div>

    </>
  )
}

export default signIn