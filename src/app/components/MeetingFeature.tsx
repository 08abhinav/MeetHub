import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

const slides = [
  {
    image: "https://www.gstatic.com/meet/user_edu_get_a_link_light_90698cd7b4ca04d3005c962a3756c42d.svg",
    title: "Get a link you can share",
    description: "Click 'New Meeting' to schedule a session in TalkDest and send invites to participants",  },
  {
    image: "https://www.gstatic.com/meet/user_edu_scheduling_light_b352efa017e4f8f1ffda43e847820322.svg",
    title: "Plan ahead",
    description: "Click 'New Meeting' to get a shareable link for instant TalkDest sessions",  },
  {
    image: "https://www.gstatic.com/meet/user_edu_safety_light_e04a2bbb449524ef7e49ea36d5f25b65.svg",
    title: "Your meeting is safe",
    description: "Only invited participants or those admitted by the host can join a TalkDest meeting",  },
]

const MeetingFeature = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const handleNextSlide = () => {
    const nextSlide = (currentSlide + 1) % slides.length
    setCurrentSlide(nextSlide)
  }

  const handlePrevSlide = () => {
    const prevSlide = (currentSlide - 1 + slides.length) % slides.length
    setCurrentSlide(prevSlide)
  }


  return (
    <div className='flex flex-col items-center'>
      <div className='relative rounded-full shadow-[0_0_10px_rgba(255,200,150,0.5),0_0_20px_rgba(255,200,150,0.4),0_0_40px_rgba(255,200,150,0.3)]'>
        <Image
          src={slides[currentSlide].image}
          alt="meeting-image" 
          width={400}
          height={400}
          className='rounded-full w-40 h-40 md:w-64 md:h-64'
        />
    
        {/* Previous Button */}
        <Button
          variant="ghost"
          size="icon"
          className='text-[#DFD0B8] cursor-pointer absolute top-1/2 -left-10 transform -translate-y-1/2'
          onClick={handlePrevSlide}>
          <ChevronLeft className='h-6 w-6'/>
        </Button>
    
        {/* Next Button */}
        <Button
          variant="ghost"
          size="icon"
          className='text-[#DFD0B8] cursor-pointer absolute top-1/2 -right-10 transform -translate-y-1/2'
          onClick={handleNextSlide}>
          <ChevronRight className='h-6 w-6'/>
        </Button>
      </div>
      <h2 className='text-2xl text-[#DFD0B8] font-semibold text-center mt-6 mb-2'>
          {slides[currentSlide].title}
      </h2>
      <p className='text-[#948979] text-lg text-center text max-w-sm'>
          {slides[currentSlide].description}
      </p>
      <div className='flex justify-center space-x-2 mt-2'>
        {slides.map((_, index)=> (
          <div key={index}
          className={`w-3 h-3 rounded-full ${index === currentSlide ? "bg-[#948979]" : "bg-gray-700"}`}>
          </div>
        ))}
      </div>
    </div>
  
  )
}

export default MeetingFeature