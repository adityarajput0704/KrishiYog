import React, { useState } from 'react'
import Product from './product'
import Filter from './filter.jsx'
const Shop = () => {

  const [products] = useState([
    { id: 1, name: "Apple", price: 100, category: "fruit", image: "/apple.png" },
    { id: 2, name: "Tomato", price: 40, category: "vegetable", image: "/tomato.png" },
    { id: 3, name: "Rice", price: 60, category: "grain", image: "/rice.png" },
  ]);

  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter(p => p.category === selectedCategory);

  return (
    <div className='shop min-h-screen'>

      <Filter
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <div className="flex-grow p-4 sm:p-6 lg:p-8">

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 lg:gap-6">

          {filteredProducts.map(product => (
            <Product key={product.id} {...product} />
          ))}
        </div>
      </div>


    </div>
  )
}

export default Shop
