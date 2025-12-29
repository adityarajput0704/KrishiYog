import React, { useEffect, useState } from 'react'
import TAndC from './t&c'
import { useParams } from 'react-router-dom';

const SingleProduct = () => {

  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    // fake frontend data (later API)
    const allProducts = [
      { id: "1", name: "Apple", price: 100, description: "Fresh farm apple", img: "/apple.png" },
      { id: "2", name: "Tomato", price: 40, description: "Organic tomato", img: "/tomato.png" },
      { id: "3", name: "Rice", price: 60, description: "Premium rice", img: "/rice.png" },
    ];

    const foundProduct = allProducts.find(p => p.id === id);
    setProduct(foundProduct);
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className='sinpro min-h-screen p-4 sm:p-6 lg:p-8'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex flex-col lg:flex-row gap-6 lg:gap-10 items-start'>
          <div className='w-full lg:w-1/2 flex-shrink-0'>
            <img
              src={product.img}
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

            <p className='text-gray-700 text-sm sm:text-base lg:text-lg mb-6 leading-relaxed'>
              {product.description}
            </p>

            <button className='bg-green-500 text-white px-6 py-3 text-base lg:text-lg rounded-lg hover:bg-green-700 transition font-semibold w-full sm:w-auto'>
              Add to Cart
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
