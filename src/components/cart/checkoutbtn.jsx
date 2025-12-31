import React from 'react'
import { useNavigate } from 'react-router-dom'

const Checkout = () => {
  const navigate = useNavigate();

  return (
    <div className='mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t pt-6'>
      <div className='text-lg sm:text-xl font-bold'>
        Cart Total: <span className='text-green-600'>₹{total}</span>
      </div>

      <button
        className='w-full sm:w-auto bg-[#287c2b] rounded-full text-white px-6 sm:px-8 py-3 font-bold text-base sm:text-lg hover:bg-green-800 transition'
        onClick={
          navigate('/billing')
          }>
        Proceed to Checkout
      </button>
    </div>

  )
}

export default Checkout
