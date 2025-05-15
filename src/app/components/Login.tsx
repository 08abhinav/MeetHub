"use client"
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react'
import { toast } from 'react-toastify';
import Loader from './Loader';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter();

    const handleSubmit = async(e: FormEvent)=>{
        e.preventDefault();
        setIsLoading(true);
        const res = await signIn("credentials", {
            redirect: false,
            email, 
            password
        })
        if(res?.error){
            toast.error("User not found");
            // console.error("Login error",res.error);
        }else{
            router.push('/dashboard')
        }
        setIsLoading(false);
        setEmail('')
        setPassword('')
    }

    const handleSigUp = async()=>{
        setIsLoading(true)
        setTimeout(()=>{
            router.push('/newUser')
        })
    }
  return (
    <>
        <div className="mt-6 space-y-6 flex flex-col justify-center items-center ">
        
        {/* Login form */}
        <form className="w-full max-w-md space-y-5" onSubmit={handleSubmit}>

            {/* Email */}
            <div className="flex flex-col">
            <label htmlFor="email" className="text-[#DFD0B8] font-medium mb-1">Email Address</label>
            <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="px-4 py-2 rounded-lg bg-[#3C3D37] text-white border border-[#5c6067] focus:outline-none focus:ring-2 focus:ring-[#DFD0B8]"
                required
            />
            </div>

            {/* Password */}
            <div className="flex flex-col">
            <label htmlFor="password" className="text-[#DFD0B8] font-medium mb-1">Password</label>
            <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="px-4 py-2 rounded-lg bg-[#3C3D37] text-white border border-[#5c6067] focus:outline-none focus:ring-2 focus:ring-[#DFD0B8]"
                required
            />
            </div>

            {/* Submit Button */}
            <button
            type="submit"
            className="w-full py-1 bg-[#3C3D37] text-[#DFD0B8] rounded-md hover:bg-[#3e3f41] 
            transition duration-500 cursor-pointer hover:text-[#DFD0B8] text-lg font-semibold">
                {isLoading ? (<Loader/>): ("Login")}
            </button>
        </form>

        {/* not have an account */}
        <p className='font-semibold text-center text-[#DFD0B8] mt-4'>
            Don't have an account ?
            <button
                onClick={handleSigUp}
                disabled={isLoading}
                className="ml-2 text-blue-400 font-semibold hover:text-blue-500 hover:underline hover:cursor-pointer transition duration-500 disabled:opacity-50"
            >
                {isLoading ? (<Loader/>) : (
                    "Create now"
                )}
            </button>
        </p>
        </div>
    </>
  )
}

export default Login