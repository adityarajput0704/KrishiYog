import React from 'react'
import '/src/index.css'
import { useNavigate } from 'react-router-dom'


const Product = ({ id, name, price, image }) => {
  let navigate = useNavigate();

  function viewDetails() {
    navigate(`/shop/${id}`);
  }

  return (
    <div className='border-2 border-gray-900 rounded-lg
                    w-40 sm:w-44 md:w-48 lg:w-52 xl:w-56
                    flex-shrink-0
                    flex flex-col
                    shadow-md hover:shadow-lg transition'>

      <img src={image} alt="productimage" className='w-full h-28 sm:h-32 md:h-36 lg:h-40 object-cover rounded-t-lg'/>

      <h2 className='text-center font-bold text-sm sm:text-base lg:text-lg line-clamp-2'>{name}</h2>

      <p className='text-center text-green-700 font-semibold text-sm sm:text-base lg:text-lg mt-1'>₹ {price}</p>

      <div className='flex flex-col gap-1.5 sm:flex-col justify-center text-xs sm:text-sm mt-auto m-1 pt-2'>

        <button 
        className='bg-green-500 text-white px-2 py-1.5 rounded-lg hover:bg-green-700 transition whitespace-nowrap text-xs sm:text-sm w-full'>
          Add to Cart
          </button>

        <button 
        className='bg-gray-900 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 transition whitespace-nowrap' 
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
