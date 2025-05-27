"use client"
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface ZegoInstance {
  destroy: () => void;
  joinRoom: (config: any) => void;
}

const Page = () => {
  const params = useParams();
  const roomID = Array.isArray(params.roomId) ? params.roomId[0] : params.roomId as string;
  const {data:session, status} = useSession();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [zp, setZp] = useState<ZegoInstance | null>(null);
  const [isInMeeting, setIsInMeeting] = useState(false);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.name && containerRef.current) {
      joinMeeting(containerRef.current!);
    // } else if (status === "authenticated" && !session?.user?.name?.trim()) {
    //   toast.error("Username is required");
    //   router.push('/dashboard');
    } else if (status === "unauthenticated") {
      toast.error("Please sign in to join the meeting");
      router.push('/dashboard');
    }
  }, [session, status, router]);

  useEffect(()=>{
    return()=>{
      if(zp){
        zp.destroy()
      }
    }
  },[zp])

  // Join meeting
  const joinMeeting = async(ele: HTMLDivElement)=>{
    try {
      const appID = Number(process.env.NEXT_PUBLIC_ZEGOAPP_ID);
      const serverSecret = process.env.NEXT_PUBLIC_ZEGOSERVER_SECRET as string;

      if(!appID || !serverSecret){
        throw new Error("Please provide appId and secret key")
      }

      if (!session?.user?.name?.trim()) {
        throw new Error("Username is required");
      }

      const userID = session?.user?.email || Date.now().toString();
      const userName = session.user.name.trim();

      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomID,
        userID,
        userName
      );

      const zegoInstance = ZegoUIKitPrebuilt.create(kitToken);
      if (!zegoInstance) {
        throw new Error("Failed to create Zego instance");
      }
      setZp(zegoInstance);

      await new Promise(resolve => setTimeout(resolve, 100));

      // start the call
      zegoInstance.joinRoom({
        container: ele,
        sharedLinks: [
          {
            name: 'join via this link',
            url:`${window.location.origin}/video-meeting/${appID}`
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall, 
        },
        showAudioVideoSettingsButton:true,
        showScreenSharingButton:true,
        showTurnOffRemoteCameraButton:true,
        showTurnOffRemoteMicrophoneButton:true,
        showRemoveUserButton:true,
        onJoinRoom:() =>{
          toast.success('Meeting joined successfully')
          setIsInMeeting(true);
        },
        onLeaveRoom:() =>{
          endMeeting();
        },
      });
    } catch (error) {
      console.error("joinMeeting error:", error);
      toast.error(error instanceof Error ? error.message : "Error joining the meeting");
      router.push('/dashboard');
    }
  };

 // End meeting
 const endMeeting =() =>{
  if(zp){
    zp.destroy();
  }
  toast.success('Meeting end succesfully')
  setZp(null);
  setIsInMeeting(false)
  router.push('/dashboard')
 }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <div
        className={`flex-grow flex flex-col md:flex-row relative ${
          isInMeeting ? "h-screen" : ""
        }`}
      >
        <div
          ref={containerRef}
          className="video-container flex-grow"
          style={{ height: isInMeeting ? "100%" : "calc(100vh - 4rem)" }}
        ></div>
      </div>
      {!isInMeeting && (
        <div className="flex flex-col">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
              Meeting Info
            </h2>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              Participant - {session?.user?.name || "You"}
            </p>
            {/* <Button
              onClick={endMeeting}
              className="w-full bg-red-500 hover:bg-red-300 cursor-pointer text-white hover:text-black"
            >
              End Meeting
            </Button> */}
          </div>
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-gray-200 dark:bg-gray-700">
            <div className="text-center">
              <Image
                src="/images/videoQuality.jpg"
                alt="Feature 1"
                width={150}
                height={150}
                className="mx-auto mb-2 rounded-full"
              />
              <h3 className="text-lg font-semibold mb-1 text-gray-800 dark:text-white">
                HD Video Quality
              </h3>
               <p className='text-sm text-gray-600 dark:text-gray-300'>
                Experience crystal clear video calls
               </p>
            </div>
            <div className="text-center">
              <Image
                src="/images/screenShare.jpg"
                alt="Feature 1"
                width={150}
                height={150}
                className="mx-auto mb-2 rounded-full"
              />
              <h3 className="text-lg font-semibold mb-1 text-gray-800 dark:text-white">
                 Screen Sharing
              </h3>
               <p className='text-sm text-gray-600 dark:text-gray-300'>
                  Easily  share your screen with participant
               </p>
            </div>
            <div className="text-center">
              <Image
                src="/images/videoSecure.jpg"
                alt="Feature 1"
                width={150}
                height={150}
                className="mx-auto mb-2 rounded-full"
              />
              <h3 className="text-lg font-semibold mb-1 text-gray-800 dark:text-white">
                 Secure Meetings
              </h3>
               <p className='text-sm text-gray-600 dark:text-gray-300'>
                   Your meetings are protected and private
               </p>
            </div>
           </div> */}
        </div>
      )}
    </div>
  )
}

export default Page