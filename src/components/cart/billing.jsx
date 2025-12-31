import React, { useEffect, useState } from 'react'
import Address from './address.jsx'
import Order from './order.jsx'
import { getCart } from '/src/services/api.js'
import { Link } from 'react-router-dom'

const Billing = () => {
   const [cartData, setCartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCart();
        setCartData(data);
      } catch (error) {
        console.error('Failed to load cart:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!cartData || cartData.cart_items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg mb-4">Your cart is empty</p>
          <Link to="/shop" className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 inline-block">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
      <div className='min-h-screen p-4 sm:p-6 lg:p-8'>
      <div className='max-w-7xl mx-auto'>
        <h1 className='text-2xl sm:text-3xl font-bold mb-6'>Checkout</h1>

    <div className='flex flex-col lg:flex-row gap-6 items-start'>
        <Address />
        <Order cartItems={cartData.cart_items}/>
    </div>
    </div>
    </div>
  )
}

export default Billing
