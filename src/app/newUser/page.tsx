"use client"

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react'
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

const page = () => {
    const route = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profilePicture, setProfilePicture] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmition = async (e:FormEvent)=>{
        e.preventDefault();
        setIsLoading(true);

        try{
            const res = await fetch('/api/signup', {
                method: "POST",
                headers:{
                    'Content-Type': "application/json"
                },
                body:JSON.stringify({
                    fname: name,
                    email,
                    password,
                    profilePicture: '',
                })
            })

           const data = await res.json();
           if(!res.ok){
                toast.error("something went wrong");
                console.error("signup error: ", data.message)
           }else{
            toast.success("signup successful")
           }
           route.push('/user-auth')

        }catch(error){
            console.error("signup error: ", error);
            toast.error("something went wrong")
        }
        setName('');
        setEmail('');
        setPassword('');
        setProfilePicture(null);
    }

  return (
    <div className='flex justify-center bg-[#000] h-screen w-full'>
        <div className='flex flex-col justify-center items-center bg-[#28282B] 
        h-auto w-[90%] md:w-1/2 m-4 border-2 border-[#404143] rounded-2xl p-8'>
            <div className='text-[#DFD0B8] font-bold text-3xl mb-6 font-sans'>
                Create your MeetHub account
            </div>
            {isLoading && <Loader/>}
            <form className='w-full space-y-4' onSubmit={handleSubmition}>
            {/* Name Field */}
            <div className='flex flex-col'>
                <label htmlFor='name' className='text-[#DFD0B8] mb-1'>Name</label>
                <input
                type='text'
                value={name}
                onChange={(e)=> {setName(e.target.value)}}
                id='name'
                name='fname'
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
                className='rounded-md file:px-4 file:py-2 bg-[#2E3238] border-2 border-[#5c6067] hover:cursor-pointer file:border-0 file:font-semibold
                text-white mt-2'
                />
            </div>

            {/* home redirect */}
            <div className='flex flex-col'>
                <p className='text-[#DFD0B8]'>Already have an account? <Link href="/user-auth" className='text-blue-400 hover:underline hover:text-blue-500 cursor-pointer'>Login</Link></p>
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