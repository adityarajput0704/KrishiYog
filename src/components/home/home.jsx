import React, { useEffect, useState } from 'react'
import Nav from '../nav/nav.jsx'
import Banner from '../home/img_banner.jsx'
// import Product from '../shop/product.jsx'
import Section from '../home/section.jsx'

const Home = () => {

   // 1️⃣ State to store products
  const [products, setProducts] = useState([]);


  // 2️⃣ Simulate DB fetch
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

  // 3️⃣ Filter helpers
  const trending = products.filter(p => p.category === "trending");
  const vegetables = products.filter(p => p.category === "vegetable");
  const fruits = products.filter(p => p.category === "fruit");
  const grains = products.filter(p => p.category === "grain");

  return (
    <div className='home'>

      <div className='ml-10 mr-10'>
        <Banner />
      </div>

      {/* Trending */}
      <Section title="Most Trending Products" items={trending} />

      {/* Vegetables */}
      <Section title="Vegetables" items={vegetables} />

      {/* Fruits */}
      <Section title="Fruits" items={fruits} />

      {/* Grains */}
      <Section title="Grains" items={grains} />

    </div>
  )
}

export default Home
