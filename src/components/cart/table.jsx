import React from 'react'
import Tbody from './tbody.jsx'

const Table = ({ items, onUpdate }) => {
  return (
    <div className='overflow-x-auto'>
      <table className='w-full border-collapse'>
        <thead className='bg-gray-200'>
          <tr>
            <th  className='p-3 text-left text-sm sm:text-base'>Product</th>
            <th  className='p-3 text-left text-sm sm:text-base'>Price</th>
            <th  className='p-3 text-left text-sm sm:text-base'>Quantity</th>
            <th  className='p-3 text-left text-sm sm:text-base'>Total</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {items.map(item => (
            <Tbody key={item.id} item={item} onUpdate={onUpdate}  />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
