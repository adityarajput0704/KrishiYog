import React, { useState } from 'react'
import '/src/index.css'
import { useNavigate } from 'react-router-dom'
import { addToCart } from '/src/services/api.js'

const Product = ({ product }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleAddToCart = async () => {
    setLoading(true);
    setMessage('');

    try {
      const response = await addToCart(product.id, 1);

      if (response.success) {
        setMessage('✓ Added!');
        setTimeout(() => setMessage(''), 2000);
      }
    } catch (error) {
      if (error.response?.data?.error) {
        setMessage(error.response.data.error);
      } else {
        setMessage('Failed to add to cart');
      }
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  function viewDetails() {
    navigate(`/shop/${product.id}`);
  }

  return (
    <div className='border-2 border-gray-900 rounded-lg
                    w-40 sm:w-44 md:w-48 lg:w-52 xl:w-56
                    flex-shrink-0
                    flex flex-col
                    shadow-md hover:shadow-lg transition'>

      {product.stock === 0 && (
        <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full z-10">
          Out of Stock
        </div>
      )}

      <img
        src={product.image_url}
        alt={product.name}
        className='w-full h-28 sm:h-32 md:h-36 lg:h-40 object-cover rounded-t-lg' />

      <h2 className='text-center font-bold text-sm sm:text-base lg:text-lg line-clamp-2'>{product.name} </h2>

      <p className='text-center text-green-700 font-semibold text-sm sm:text-base lg:text-lg mt-1'>₹{product.price} </p>

      {message && (
        <p className={`text-center text-xs mt-1 px-2 ${message.includes('✓') ? 'text-green-600' : 'text-red-600'
          }`}>
          {message}
        </p>
      )}

      <div className='flex flex-col gap-1.5 sm:flex-col justify-center text-xs sm:text-sm mt-auto m-1 pt-2'>
        <button
          className={`text-white px-2 py-1.5 rounded-lg transition whitespace-nowrap text-xs sm:text-sm w-full ${product.stock === 0
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-700'
            }`}
          onClick={handleAddToCart}
          disabled={loading || product.stock === 0}
        >
          {loading ? 'Adding...' : product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>

        <button
          className='bg-gray-900 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 transition whitespace-nowrap'
          onClick={() => {
            viewDetails()
          }}>
          View Details
        </button>

      </div>

    </div>
  )
}

export default Product
