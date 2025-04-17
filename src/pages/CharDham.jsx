import React from 'react'
import { useNavigate } from 'react-router-dom'

const CharDham = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <button 
        onClick={() => navigate('/')}
        className="mb-4 px-4 py-2 bg-[#ff7f00] text-white rounded-lg"
      >
        Back to Home
      </button>
      <h1 className="text-2xl font-bold">Char Dham Package Details</h1>
    </div>
  )
}

export default CharDham