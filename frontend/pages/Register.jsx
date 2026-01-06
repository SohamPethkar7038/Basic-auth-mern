import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = ({setUser}) => {
    const [error,setError]=useState('')
    const [formData,setFormData]=useState({
       userName:"",
        email:"",
        password:""
    })

    const navigate=useNavigate()
   
    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }
     const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            const res=await axios.post('/api/v1/user/register',formData)
            localStorage.setItem("token",res.data.accessToken)
            console.log(res.data)
            setUser(res.data)
            navigate('/')
        } catch (error) {
            setError(error.respone?.data?.message || 'Registration failed')
        }
    }
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
        <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-200'>
            <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>Register</h2>
            {error && <p className='text-red-500 mb-4 text-sm'>{error}</p>}
            <form onSubmit={handleSubmit}>
              <div>
              <label className='block text-gray-600 text-sm font-medium mb-1'>User Name</label>
                    <input className='w-full p- border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300 outline-none focus:border-blue-400 mb-2 ' type="text" placeholder="Enter your Username :"
                    name='userName'
                    value={formData.userName}
                    onChange={handleChange}
                    autoComplete='off'
                    required
                    />
                </div>
                <div>
                    <label className='block text-gray-600 text-sm font-medium mb-1'>Email</label>
                    <input className='w-full p- border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300 outline-none focus:border-blue-400 mb-2' type="email" placeholder='"Enter your email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete='off'
                    required
                    />
                </div>
                 <div className='mb-6'>
                    <label className='block text-gray-600 text-sm font-medium mb-1'>Password</label>
                    <input className='w-full p- border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300 outline-none focus:border-blue-400 mb-2' type="password" placeholder="Enter your password"
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete='off'
                    required
                    />
                </div>
                <button className='w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 font-medium cursor-pointer'>Login</button>
            </form>
        </div>
    </div>
  )
}

export default Register