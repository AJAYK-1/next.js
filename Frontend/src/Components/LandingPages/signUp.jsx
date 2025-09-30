import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

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
                alert(response.data.message)
                setFormData({ name: '', email: '', password: '' })
                return navigate('/signIn')
            }
        } catch (error) {
            if (error.response)
                if (error.response.status === 409) alert(error.response.data.message)
                else alert(error.response.data.message)
            else console.log(error.message);
        }
    }

    return (
        <>
            <section className='bg-slate-400'>
                <h1> SignUp </h1>
                <form onSubmit={FormSubmission} >
                    <h3> Name: </h3>
                    <input type="text" name='name' onChange={handleChange} required />
                    <br />
                    <h3 > Email: </h3>
                    <input type="email" name='email' onChange={handleChange} required />
                    <br />
                    <h3 > Password: </h3>
                    <input type="password" name='password' onChange={handleChange} required />
                    <br />
                    <button type='submit'> SignUp </button>
                </form>
            </section>
        </>
    )
}

export default signUp