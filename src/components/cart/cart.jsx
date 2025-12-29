import React, { useState } from 'react'
import Table from '../cart/table.jsx'
import Checkout from './checkoutbtn.jsx'

const Cart = () => {

   const [cartItems, setCartItems] = useState([
    {
      id: 1,
      img: "/apple.png",
      product: "Apple",
      price: 100,
      quantity: 2,
    }
  ])

  return (
      <div className='min-h-screen p-4 sm:p-6 lg:p-8'>
      <div className='max-w-6xl mx-auto'>
        <h1 className='text-2xl sm:text-3xl font-bold mb-6'>Shopping Cart</h1>
        
    <div className='bg-white border-2 border-gray-200 rounded-2xl p-4 sm:p-6 lg:p-10 mb-6'>
      <Table items={cartItems} />
      <Checkout />
    </div>
    </div>
    </div>
  )
}

export default Cart
