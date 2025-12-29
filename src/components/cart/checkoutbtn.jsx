import React from 'react'
import { useNavigate } from 'react-router-dom'

const Checkout = () => {
  const navigate=useNavigate();

  function handleCheckout(){
    navigate('/billing');
  }
  return (
    <div className='flex justify-center sm:justify-end'>
        <button 
        className='w-full sm:w-auto bg-[#287c2b] rounded-full text-white px-6 sm:px-8 py-3 font-bold text-base sm:text-lg hover:bg-green-800 transition'
        onClick={
          handleCheckout
        }>
          Proceed to Checkout
        </button>
    </div>
    
  )
}

export default Checkout
