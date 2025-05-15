"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import Header from "../components/Header";
import { MeetingAction } from "../components/MeetingAction";
import MeetingFeature from "../components/MeetingFeature";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const {data:session, status} = useSession();

  useEffect(() => {
    if(status=== 'authenticated'){
      setIsLoading(false)
      const welcome = localStorage.getItem('welcome')
      if(!welcome){
        toast.success(`Welcome back ${session?.user?.name}!`)
        localStorage.setItem('welcome', 'true');
      }
    }else if(status ===  'unauthenticated'){
      setIsLoading(false)
    }
  },[session, status])

  if(isLoading){
    return <Loader/>
  }
  return (
    <div className="flex flex-col min-h-screen bg-[#393E46]">
      <Header/>
      <main className="flex-grow p-8 pt-32">
        <div className="max-width-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-5xl font-bold mb-6 text-[#DFD0B8]">
                Welcome to MeetHub
              </h1>
              <p className="text-2xl text-[#948979] mb-6">
                Next-gen support platform for agile teams.
              </p>
              <MeetingAction/>
            </div>

            <div className="md:w-1/2">
              <MeetingFeature/>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}