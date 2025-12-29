import React from 'react'
import Product from '../shop/product.jsx'

const Section = ({ title, items }) => {

  return (
    <div className="mt-6 bg-neutral-200 py-3 ">
     <div className="max-w-[1440px] mx-auto px-4 sm:px-6"></div>
      <h3 className="font-bold text-lg sm:text-xl md:text-2xl px-4 sm:px-6 pt-2">{title}</h3>

      <div className="flex gap-3 sm:gap-4 overflow-x-auto px-2 sm:px-4 py-4 snap-x snap-mandatory scrollbar-hide">
        {items.map(product => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  )


}

export default Section
