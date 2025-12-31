import React, { useEffect, useState } from 'react'
import Product from '../shop/product.jsx'
import { getAllProducts } from '/src/services/api.js'

const Section = ({ title, category }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts(category);
        setProducts(data.slice(0, 10)); // Show only first 10
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  if (loading) {
    return (
      <div className="mt-6 bg-neutral-200 py-3">
        <div className="max-w-[1440px] mx-auto px-4">
          <p className="text-center py-8">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 bg-neutral-200 py-3 ">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6">

      <h3 className="font-bold text-lg sm:text-xl md:text-2xl px-4 sm:px-6 pt-2">{title}</h3>

      <div className="flex gap-3 sm:gap-4 overflow-x-auto px-2 sm:px-4 py-4 snap-x snap-mandatory scrollbar-hide">
        {products.map(product => (
          <Product key={product.id} product={product} />
        ))}
      </div>
      </div>
    </div>
  )


}

export default Section
