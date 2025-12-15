import React from 'react'
import { useNavigate } from 'react-router-dom'

const Checkout = () => {
  const navigate=useNavigate();

  function handleCheckout(){
    navigate('/billing');
  }
  return (
    <div>
        <button 
        className='bg-[#287c2b] rounded-full text-white p-3 font-bold text-lg ml-250'
        onClick={
          handleCheckout
        }>
          Proceed to Checkout
        </button>
    </div>
    
  )
}

export default Checkout
