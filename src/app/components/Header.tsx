"use client";
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Info, LogOut, Plus, Router, Video, X } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Loader from './Loader';
import { useRouter } from 'next/navigation';

const Header = () => {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false); 
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const formatTimeDate = ()=>{
    const currDate = new Date();
    return currDate.toLocaleString("en-us", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      weekday:"short",
      month: "short",
      day: "2-digit"
    })
  }

  const userPlaceHolder = session?.user?.name?.charAt(0).toUpperCase() || "Sign-in";
  // console.log("Name: ", session?.user)
  const handleLogout:any = async () => {
    await signOut({ callbackUrl: '/user-auth' });
    toast.success("Logged out successfully")
  }

  const handleSignin = async()=>{
    setIsLoading(true);
    setTimeout(()=>{
      router.push('/user-auth')
    })
  }
  return (
    <div className="flex items-center justify-between shadow-[0_10px_20px_-10px_rgba(255,200,150,0.6)] z-50
     bg-black p-6 ">
      {/* Talkdesk logo */}
      <div className="flex items-center space-x-4">
        <Link href="/" className='flex items-center space-x-2'>
            <Video className="w-8 h-8 text-[#DFD0B8]" />
            <div className='flex flex-col ml-2'>
              <span className="hidden md:block font-semibold text-3xl text-[#DFD0B8]">
                MeetHub
              </span>
              <span className='text-sm font-semibold text-[#DFD0B8]'>
                Connect.
                Collaborate.
                Communicate.
              </span>
            </div>
        </Link>
      </div>

      <div className='flex items-center space-x-4'>
        {/* Date and time */}
        <span className='text-[#DFD0B8] font-semibold'>
          {formatTimeDate()}
        </span> 

        {/* Info button */}
        <Button variant="ghost" size='icon' 
        className='hidden md:block hover:!bg-transparent focus:!bg-transparent active:!bg-transparent data-[state=open]:!bg-transparent hover:cursor-pointer'>
          <Info className='w-5 h-5 ml-2 text-[#DFD0B8]'/>
        </Button>

        {/* If user is not logged in */}
        {session?.user?(
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            {/* user image */}
            <Avatar className='cursor-pointer text-[#DFD0B8] h-8 w-8 rounded-full shadow-[0_0_10px_rgba(255,200,150,0.6),0_0_20px_rgba(255,200,150,0.5),0_0_40px_rgba(255,200,150,0.4)]'>
                {session?.user?.image ? (
                  <AvatarImage
                    className='rounded-full'
                    src={session?.user?.image}
                    alt={session?.user?.name ?? "user"}
                  />
                ) : (
                  <AvatarFallback className='flex items-center justify-center w-full h-full text-lg text-[#DFD0B8]'>
                    {userPlaceHolder}
                  </AvatarFallback>
                )}
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className='w-80 p-4 backdrop-blur-lg bg-black/20 rounded-xl z-[999]'>
            {/* user email */}
            <div className='flex justify-between items-center mb-4'>
              <span className='text-sm font-bold text-[#DFD0B8]'>
                {session?.user?.email}
              </span>
              
              {/* cancle button */}
              <Button variant="ghost" size='icon' onClick={()=>setOpen(false)} className='rounded-full p-4 focus:!bg-transparent active:!bg-transparent data-[state=open]:!bg-transparent hover:cursor-pointer'>
                <X className='h-4 w-5 text-[#DFD0B8]' />
              </Button>
            </div>
            
            {/* user profile inside drop-down menu */}
            <div className='flex flex-col items-center mb-4'>
              <Avatar className='cursor-pointer w-20 h-20 text-[#DFD0B8]'>
                {session?.user?.image ? (
                  <AvatarImage
                    src={session.user.image}
                    alt={session.user.name ?? "user"}
                    className='object-cover rounded-full text-[#DFD0B8]'
                  />) : (
                  <AvatarFallback className='text-lg  text-[#DFD0B8] flex items-center justify-center w-full h-full'>
                    {userPlaceHolder}
                  </AvatarFallback>
                )}
              </Avatar>
              <h1 className='text-xl font-semibold text-center text-[#DFD0B8] mt-4'>
                Hi, {session?.user?.name || "User !"}
              </h1>
            </div>
            <div className='flex mb-4'>
              {/* Add account */}
              <Button className='w-1/2 h-14 rounded-l-full cursor-pointer font-semibold text-[#DFD0B8]' variant="outline">
                <Plus className='h-4 w-4 mr-2'/>
                Add Account
              </Button>
              
              {/* Logout */}
              <Button className='w-1/2 h-14 rounded-r-full cursor-pointer font-semibold text-[#DFD0B8]' variant="outline" onClick={handleLogout}>
                <LogOut className='h-4 w-4 mr-2'/>
                  SignOut
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>):(
          <Button
          onClick={handleSignin}
          className="text-[#DFD0B8] border border-[#DFD0B8] hover:cursor-pointer shadow-lg" variant="outline">
           {isLoading ? <Loader/> : "Sign-In"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;