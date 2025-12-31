import React, { useEffect, useState } from 'react'
import TAndC from './t&c'
import { useParams } from 'react-router-dom';
import { getProductById, addToCart } from '/src/services/api.js'

const SingleProduct = () => {

  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addingToCart, setAddingToCart] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        setError('Product not found');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    setAddingToCart(true);
    setMessage('');

    try {
      const response = await addToCart(product.id, 1);

      if (response.success) {
        setMessage('✓ Added to cart successfully!');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      if (error.response?.data?.error) {
        setMessage(error.response.data.error);
      } else {
        setMessage('Failed to add to cart');
      }
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 text-lg">{error || 'Product not found'}</p>
      </div>
    );
  }

  return (
    <div className='sinpro min-h-screen p-4 sm:p-6 lg:p-8'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex flex-col lg:flex-row gap-6 lg:gap-10 items-start'>
          <div className='w-full lg:w-1/2 flex-shrink-0'>
            <img
              src={product.image_url}
              alt="productimage"
              className='w-full h-64 sm:h-80 md:h-96 lg:h-[500px] object-cover rounded-lg shadow-lg'
            />
          </div>
          <div className='details w-full lg:w-1/2 flex flex-col'>
            <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold mb-4'>
              {product.name}
            </h2>

            <p className='text-green-700 font-semibold text-xl sm:text-2xl lg:text-3xl mb-6'>
              ₹ {product.price}
            </p>

            <div className="mb-4">
              {product.stock > 0 ? (
                <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  In Stock ({product.stock} available)
                </span>
              ) : (
                <span className="inline-block px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                  Out of Stock
                </span>
              )}
            </div>

            <p className='text-gray-700 text-sm sm:text-base lg:text-lg mb-6 leading-relaxed'>
              {product.description}
            </p>
            {message && (
              <div className={`mb-4 p-3 rounded-lg ${message.includes('✓')
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
                }`}>
                {message}
              </div>
            )}

            <button
              className={`px-6 py-3 text-base lg:text-lg rounded-lg transition font-semibold w-full sm:w-auto ${product.stock === 0
                  ? 'bg-gray-400 cursor-not-allowed text-white'
                  : 'bg-green-500 text-white hover:bg-green-700'
                }`}
              onClick={handleAddToCart}
              disabled={addingToCart || product.stock === 0}
            >
              {addingToCart ? 'Adding...' : product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </div>
        </div>

        <div className='mt-8 lg:mt-12'>
          <TAndC />
        </div>
      </div>
    </div>


  )
}

export default SingleProduct
