import React from 'react'
import Address from './address.jsx'
import Order from './order.jsx'

const Billing = () => {
  const cartItems = [
  { id: 1, product: "Apple", price: 100, quantity: 2 }
];
  return (
      <div className='min-h-screen p-4 sm:p-6 lg:p-8'>
      <div className='max-w-7xl mx-auto'>
        <h1 className='text-2xl sm:text-3xl font-bold mb-6'>Checkout</h1>

    <div className='flex flex-col lg:flex-row gap-6 items-start'>
        <Address />
        <Order cartItems={cartItems}/>
    </div>
    </div>
    </div>
  )
}

export default Billing
