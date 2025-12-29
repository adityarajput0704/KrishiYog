import React from 'react'

const Tbody = ({ item }) => {
    return (
        <tr className='border-b hover:bg-gray-50'>
            <td className='p-3'>

                <div className='flex items-center gap-3'>
                    <img src={item.img} alt={item.product} className='w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 object-cover rounded' />
                    <span className='font-medium text-sm sm:text-base'>{item.product}</span>
                </div>
            </td>
            <td className='p-3 text-center text-sm sm:text-base'>{item.price}</td>
            <td className='p-3 text-center text-sm sm:text-base'>{item.quantity}</td>
            <td className='p-3 text-center text-sm sm:text-base'>{item.price * item.quantity}</td>
        </tr >
    )
}

export default Tbody
