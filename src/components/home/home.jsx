import React, { useEffect, useState } from 'react'
import Nav from '../nav/nav.jsx'
import Banner from '../home/img_banner.jsx'
// import Product from '../shop/product.jsx'
import Section from '../home/section.jsx'

const Home = () => {
  
  return (
    <div className='w-full'>

        <Banner />
      <div className='w-full'>
    
      {/* Trending */}
      {/* <Section title="Most Trending Products" items={trending} /> */}

      {/* Vegetables */}
      <Section title="Vegetables" category="vegetable" />

      {/* Fruits */}
      <Section title="Fruits" category="fruit" />

      {/* Grains */}
      <Section title="Grains" category="grain" />
      </div>
    </div>
  )
}

export default Home
