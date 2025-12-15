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
    <div className='cart justify-center items-center m-20 p-10 border-2 border-gray-200 rounded-2xl'>
      <Table items={cartItems} />
      <Checkout />
    </div>
  )
}

export default Cart
