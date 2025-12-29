import React, { useState, useEffect } from "react";


export default function HomeBanner() {
 const images = [
  "../src/assets/banner1.jpg",
  "../src/assets/banner2.jpg",
  "../src/assets/banner3.jpg",
];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000); // changes every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-[250px] sm:h-[350px] md:h-[500px] overflow-hidden">
      <img
        src={images[index]}
        alt="slider"
        className="w-full h-full object-cover duration-700 transition-all ease-in-out"
      />
    </div>
  );
}