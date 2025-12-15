import React from 'react'

const Filter = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <div className='filter w-80 h-screen p-4 border-2 border-gray-200'>
      <h3 className="font-bold mb-4">Category</h3>

      {["all", "fruit", "vegetable", "grain"].map(cat => (
        <button
          key={cat}
          className={`block mb-2 ${
            selectedCategory === cat ? "font-bold text-green-700" : ""
          }`}
          onClick={() => setSelectedCategory(cat)}
        >
          {cat.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default Filter;

