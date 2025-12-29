import React, { useEffect, useState } from 'react'
import Nav from '../nav/nav.jsx'
import Banner from '../home/img_banner.jsx'
// import Product from '../shop/product.jsx'
import Section from '../home/section.jsx'

const Home = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    // fake API delay
    setTimeout(() => {
      setProducts([
        { id: 1, name: "Tomato", category: "vegetable" },
        { id: 2, name: "Potato", category: "vegetable" },
        { id: 3, name: "Apple", category: "fruit" },
        { id: 4, name: "Rice", category: "grain" },
        { id: 5, name: "Onion", category: "trending" },
        { id: 6, name: "Banana", category: "trending" },
      ]);
    }, 500);
  }, []); // runs once on page load


  const trending = products.filter(p => p.category === "trending");
  const vegetables = products.filter(p => p.category === "vegetable");
  const fruits = products.filter(p => p.category === "fruit");
  const grains = products.filter(p => p.category === "grain");

  
  return (
    <div className='w-full'>

        <Banner />
      <div className='w-full'>
    
      {/* Trending */}
      <Section title="Most Trending Products" items={trending} />

      {/* Vegetables */}
      <Section title="Vegetables" items={vegetables} />

      {/* Fruits */}
      <Section title="Fruits" items={fruits} />

      {/* Grains */}
      <Section title="Grains" items={grains} />
      </div>
    </div>
  )
}

export default Home
