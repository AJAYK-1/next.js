import axios from 'axios'
import React, { useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

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
        const token = response.data.token
        localStorage.setItem('token', token)
        const decodedToken = jwtDecode(token)
        localStorage.setItem('role', decodedToken.role)
        if (decodedToken.role === 'user') navigate('/user-feedback')
        else if (decodedToken.role === 'admin') navigate('/admin-dashboard')
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
        <form onSubmit={handleSubmission}>
          <h3> Email: </h3>
          <input type="text" name='email' onChange={handleChange} required />
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