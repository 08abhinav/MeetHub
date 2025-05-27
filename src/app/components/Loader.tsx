import React from 'react'
import { Loader2 } from 'lucide-react'

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
      <Loader2 className="w-12 h-12 text-white animate-spin duration-700" />
    </div>
  )
}

export default Loader
