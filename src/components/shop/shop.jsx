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
    <div className='shop flex '>
      
      <Filter
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <div className="flex flex-wrap">
        {filteredProducts.map(product => (
          <Product key={product.id} {...product} />
        ))}
      </div>

      
    </div>
  )
}

export default Shop
