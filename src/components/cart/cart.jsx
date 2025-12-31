import React, { useEffect, useState } from 'react'
import Table from '../cart/table.jsx'
import Checkout from './checkoutbtn.jsx'
import { getCart } from '/src/services/api.js'
import { Link } from 'react-router-dom'

const Cart = () => {

   const [cartData, setCartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const data = await getCart();
      setCartData(data);
    } catch (err) {
      setError('Failed to load cart');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 text-lg">{error}</p>
      </div>
    );
  }

  return (
      <div className='min-h-screen p-4 sm:p-6 lg:p-8'>
      <div className='max-w-6xl mx-auto'>
        <h1 className='text-2xl sm:text-3xl font-bold mb-6'>Shopping Cart</h1>
         
         {cartData && cartData.cart_items.length === 0 ? (
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-10 text-center">
            <p className="text-gray-600 text-lg mb-4">Your cart is empty</p>
            <Link to="/shop" className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
              Continue Shopping
            </Link>
          </div>
        ):(
    <div className='bg-white border-2 border-gray-200 rounded-2xl p-4 sm:p-6 lg:p-10 mb-6'>
      <Table items={cartData.cart_items} onUpdate={fetchCart} />
      <Checkout total={cartData.total} />
    </div>
          )}
    </div>
    </div>
  )
}

export default Cart
