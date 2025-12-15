import React from 'react'
import Tbody from './tbody.jsx'

const Table = ({items}) => {
  return (
    <div className='table flex-1 p-4'>
      <table className='table-fixed w-full border-collapse border border-gray-300'>
        <thead className='bg-gray-200 h-10'>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {items.map(item => (
            <Tbody key={item.id} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
