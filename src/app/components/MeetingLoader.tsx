import { Loader2 } from 'lucide-react'
import React from 'react'

const MeetingLoader = () => {
  return (
    <div className='flex fixed inset-0 items-center justify-center bg-[#393E46]/70 backdrop-blur-md z-50 flex-col space-y-4'>
      <div className="text-[#DFD0B8] text-xl font-semibold flex items-center space-x-1">
        <span>Joining</span>
        <span className="dot animate-wave">.</span>
        <span className="dot animate-wave animation-delay-200">.</span>
        <span className="dot animate-wave animation-delay-400">.</span>
      </div>
    </div>
  )
}

export default MeetingLoader