"use client"
import React,{useState} from 'react'
import Image from 'next/image'
import Link from 'next/link';
import Loader from '../components/Loader'
import { signIn } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import { toast } from 'react-toastify';


const page = () => {
    const [isLoading, setIsLoading] = useState(false);
    const url = process.env.NEXTAUTH_URL

    const handleLogin = async(provider:any)=>{
        setIsLoading(true)
        try {
            await signIn(provider,{callbackUrl: url})
            toast.info(`Logging with ${provider}`)
        } catch (error) {
            toast.error(`failed login with ${provider}`)
        }finally{
            setIsLoading(false)
        }
    }
  return (
    <div className='flex min-h-screen bg-gradient-to-r from-[#222831] to-[#464a50]'>
        {isLoading && <Loader/>}
        <div className='hidden w-1/2 bg-[#393E46] lg:block'>
            <Image src="/images/meeting.jpg"
            alt="login"
            width={1080}
            height={1080}
            className='object-cover w-full h-full'
            />
        </div>
        <div className='flex flex-col justify-center w-full p-8 lg:w-1/2'>
            <div className='max-w-md mx-auto'>  
                <h1 className='mb-3 text-4xl font-bold text-[#DFD0B8]'>Welcome to MeetHub</h1>
                <p className='mb-8 text-[#948979] font-semibold'>Next-gen support platform for agile teams.</p>
                {/* Google Login */}
                <div className='space-y-4'>
                    <Button className='w-full bg-gradient-to-r from-[#464a50] to-[#948979] text-black 
                    font-semibold border-none shadow-md hover:shadow-lg cursor-pointer hover:bg-[#a79e8f] hover:text-[#DFD0B8]
                    text-lg' 
                    variant="outline"
                    onClick={()=>handleLogin('google')}
                    >
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24"fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Login with Google
                    </Button>
                </div>

                {/* separator */}
                <div className="flex flex-col space-y-4 mt-6">
                    <div className="relative w-full">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-[#948979]"></span>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-[#948979] px-2 text-black text-md font-semibold">or</span>
                        </div>
                    </div>
                </div>

                {/* Github Login */}
                <div className='space-y-4 mt-6'>
                    <Button className='w-full bg-gradient-to-r from-[#464a50] to-[#948979] text-black 
                    border-none shadow-md font-semibold hover:shadow-lg cursor-pointer hover:text-[#DFD0B8] hover:bg-[#a79e8f] text-lg'
                    variant="outline" 
                    onClick={()=>handleLogin('github')}
                    >
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 0.297c-6.63 0-12 5.373-12 12 0 5.303 
                                3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 
                                0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.084-.729.084-.729 
                                1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.807 1.305 
                                3.492.998.108-.776.418-1.305.76-1.605-2.665-.3-5.466-1.335-5.466-5.931 
                                0-1.31.467-2.381 1.235-3.221-.135-.303-.54-1.523.105-3.176 
                                0 0 1.005-.322 3.3 1.23a11.52 11.52 0 0 1 3-.405c1.02.005 
                                2.045.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 
                                1.653.24 2.873.12 3.176.765.84 1.23 1.911 1.23 3.221 
                                0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.215 
                                0 1.6-.015 2.89-.015 3.285 0 .315.21.69.825.57C20.565 
                                22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                            />
                        </svg>
                        Login with Github
                    </Button>
                </div>

                <p className='text-sm font-semibold text-center text-[#948979] mt-6'>
                    Don't have an account ?
                    <Link href='#' className='mx-2 text-sm text-blue-300 font-semibold hover:text-blue-500 hover:underline'>
                        Create now
                    </Link>
                </p>
            </div>
        </div>
    </div>
  )
}

export default page