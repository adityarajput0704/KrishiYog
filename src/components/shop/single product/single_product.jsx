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
    <div className='sinpro flex items-center h-screen '>
      <img src={product.img} alt="productimage" className='w-96 h-96 object-cover mt-4 ml-4 rounded-t-lg' />
        <div className='details ml-10'>
            <h2 className='text-3xl font-bold mb-4'>{product.name}</h2>
            <p className='text-green-700 font-semibold text-2xl mb-4'>₹ {product.price}</p>    
            <TAndC/>
            <p className='mb-4'>{product.description}</p>
            <button className='bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-700'>Add to Cart</button>
        </div>

    </div>
  )
}

export default SingleProduct
