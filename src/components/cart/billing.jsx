import React from 'react'
import Address from './address.jsx'
import Order from './order.jsx'

const Billing = () => {
  const cartItems = [
  { id: 1, product: "Apple", price: 100, quantity: 2 }
];
  return (
    <div className='flex mx-auto justify-center'>
        <Address />
        <Order cartItems={cartItems}/>
    </div>
  )
}

export default Billing
