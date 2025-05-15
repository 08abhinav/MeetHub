"use client"  
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { v4 as uuidv4 } from 'uuid';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Copy, Link2, LinkIcon, Loader2, Plus, Video } from 'lucide-react';
import { useSession } from 'next-auth/react'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

export const MeetingAction = () => {
  const {data: session} = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [baseUrl, setBaseUrl] = useState('');
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [meetingLink, setMeetingLink] = useState('');
  const router = useRouter();

  useEffect(()=>{
    setBaseUrl(window.location.origin);
  }, [])

  const handleMeeting = ()=>{
    const roomId = uuidv4();
    const url = `${baseUrl}/video-meeting/${roomId}`;
    setGeneratedUrl(url);
    setOpen(true);
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedUrl);
    toast.info("Copied to clipboard")
  }

  const handleJoinMeeting = async () => {
    if(meetingLink){
      setIsLoading(true);
      const formatLink =  meetingLink.includes('http') ? meetingLink : `${baseUrl}/${meetingLink}`;
      router.push(formatLink)
      toast.info('joining meeting')
    }else{
      toast.error("please enter a valid link")
    }
  };

  const handleInstantMeeting = async () => {
    setIsLoading(true);
    const roomId = uuidv4();
    const url = `${baseUrl}/video-meeting/${roomId}`;
    setTimeout(() => {
      router.push(url);
    }, 100);
    // toast.info("creating meeting")
  }

  return (
    <>
      <div className='flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className='w-full sm:w-auto text-[#DFD0B8] bg-[#3C3D37] border border-[#5c6067] font-semibold 
              shadow-lg cursor-pointer hover:shadow-xl focus:!bg-transparent active:!bg-transparent'
              size="lg">
              <Video className='w-5 h-5 mr-2' />
              New Meeting
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className='bg-[#3C3D37] border border-[#5c6067] text-[#DFD0B8] w-[250px] ml-6 rounded-lg'>
            {/* Meeting for later */}
            <DropdownMenuItem onClick={handleMeeting} 
            className='text-[#DFD0B8] hover:bg-[#696a62] cursor-pointer flex items-center p-4 rounded-lg'>
              <Link2 className='w-4 h-4 mr-2' />
              Create a meeting for later
            </DropdownMenuItem>

            {/* Instant meeting */}
            <DropdownMenuItem onClick={handleInstantMeeting}
            className='text-[#DFD0B8] hover:bg-[#696a62] cursor-pointer flex items-center p-4 rounded-lg'>
              <Plus className='w-4 h-4 mr-2'/>
              Start an instant meeting
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* meeting code */}
        <div className='flex w-full sm:w-auto relative'>
          <span className='absolute left-2 top-1/2 transform -translate-y-1/2'>
            <LinkIcon className='w-4 h-4 text-[#DFD0B8]'/>
          </span>
          <Input 
          className='pl-8 shadow-lg text-[#DFD0B8] rounded-r-none pr-10 bg-[#3C3D37] border border-[#5c6067] font-semibold border-none'
          placeholder='Enter a code or link'
          value={meetingLink}
          onChange={(e)=>{setMeetingLink(e.target.value)}}/>
        <Button
          variant="secondary"
          className="rounded-l-none text-[#DFD0B8] ml-1 bg-[#3C3D37] border border-[#5c6067] cursor-pointer hover:bg-[#696a62] focus:bg-[#696a62] active:bg-[#696a62]"
          onClick={handleJoinMeeting}>
          Join
        </Button>
        </div>

      </div>
      {/* dialog box */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="rounded-3xl bg-black border border-[#6b6c6f] text-[#DFD0B8] w-[400px]">
          <DialogTitle className="text-3xl font-normal text-[#DFD0B8] text-center mb-4 font-mono">
              Here's your joining information
          </DialogTitle>
          <div className="flex flex-col items-center justify-center">
            <span className="text-[#DFD0B8] font-semibold text-lg mb-2">
              {generatedUrl.slice(0, 35)}...
            </span>
            <Button
              variant="ghost"
              className="bg-[#000] text-[#DFD0B8] hover:cursor-pointer"
              onClick={copyToClipboard}
            >
              <Copy className="w-5 h-5 bg-[#000] hover:text-lg" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>

    </>
  )
}