import React from 'react'
import Product from '../shop/product.jsx'

const Section = ({ title, items }) => {

  return (
    <div className="mt-4 ml-10 mr-10 bg-neutral-200">
      <h3 className="font-bold text-xl px-8 pt-4">{title}</h3>

      <div className="flex ml-2 overflow-x-auto gap-4 p-4">
        {items.map(product => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  )


}

export default Section
