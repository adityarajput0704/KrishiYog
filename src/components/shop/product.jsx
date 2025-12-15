import React from 'react'
import '/src/index.css'
import { useNavigate } from 'react-router-dom'


const Product = ({ id, name, price, image }) => {
  let navigate = useNavigate();

  function viewDetails() {
    navigate(`/shop/${id}`);
  }

  return (
    <div className='product border-2 border-gray-900 m-6 rounded-lg h-72 w-60'>

      <img src={image} alt="productimage" className='w-full h-40 rounded-t-lg'/>

      <h2 className='text-center font-bold text-lg mt-2'>{name}</h2>

      <p className='text-center text-green-700 font-semibold'>₹ {price}</p>

      <div className='flex justify-center gap-3 text-sm mt-2'>

        <button 
        className='bg-green-500 text-white px-4 py-1 rounded-lg hover:bg-green-700'>
          Add to Cart
          </button>

        <button 
        className='bg-gray-900 text-white px-4 py-1 rounded-lg hover:bg-green-700' 
        onClick={()=>{
          viewDetails()
        }}>
          View Details
          </button>

      </div>

    </div>
  )
}

export default Product
