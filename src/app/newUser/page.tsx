"use client"
import React, { useState } from 'react'

const page = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmition = (e:any)=>{
        e.preventDefault();

        setName('')
        setEmail('')
        setPassword('')
    }
  return (
    <div className='flex justify-center bg-[#393E46] h-screen w-full'>
        <div className='flex flex-col justify-center items-center bg-gradient-to-r from-[#383c41] to-[#464a50] 
        h-auto w-[90%] md:w-1/2 m-4 border-2 border-[#464a50] rounded-2xl shadow-lg p-8'>
            <div className='text-[#DFD0B8] font-bold text-3xl mb-6'>
                Welcome to MeetHub
            </div>

            <form className='w-full space-y-4' onSubmit={handleSubmition}>
            {/* Name Field */}
            <div className='flex flex-col'>
                <label htmlFor='name' className='text-[#DFD0B8] mb-1'>Name</label>
                <input
                type='text'
                value={name}
                onChange={(e)=> {setName(e.target.value)}}
                id='name'
                name='name'
                placeholder='Enter your name'
                className='rounded-md px-4 py-2 bg-[#2E3238] text-white border border-[#5c6067] 
                focus:outline-none focus:ring-2'
                required
                />
            </div>

            {/* Email Field */}
            <div className='flex flex-col'>
                <label htmlFor='email' className='text-[#DFD0B8] mb-1'>Email</label>
                <input
                type='email'
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
                id='email'
                name='email'
                placeholder='Enter your email'
                className='rounded-md px-4 py-2 bg-[#2E3238] text-white 
                border border-[#5c6067] focus:outline-none'
                required
                />
            </div>

            {/* Password Field */}
            <div className='flex flex-col'>
                <label htmlFor='password' className='text-[#DFD0B8] mb-1'>Password</label>
                <input
                type='password'
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
                id='password'
                name='password'
                placeholder='********'
                className='rounded-md px-4 py-2 bg-[#2E3238] text-white 
                border border-[#5c6067] focus:outline-none'
                required
                />
            </div>

            {/* Profile Picture Upload */}
            <div className='flex flex-col'>
                <label htmlFor='profilePicture' className='text-[#DFD0B8] mb-1'>Profile Picture</label>
                <input
                type='file'
                id='profilePicture'
                name='profilePicture'
                accept='image/*'
                className='file:rounded-md file:px-4 file:py-2 file:hover:border-2 border-white hover:cursor-pointer file:border-0 file:font-semibold
                text-white mt-2'
                required
                />
            </div>

            {/* Submit Button */}
            <button
                type='submit'
                className='w-full bg-[#36383b] text-[#DFD0B8] font-bold py-2 px-4 
                rounded-md hover:bg-[#3b3d3f] cursor-pointer '>
                Sign Up
            </button>
            </form>
        </div>
    </div>

  )
}

export default page