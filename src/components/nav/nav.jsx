import React from 'react'
import LogBtn from '../nav/logbtn.jsx'
import { Link } from 'react-router-dom'
const navbar = (isLoggedIn, setIsLoggedIn) => {
  return (
    <div className="nav bg-[#287c2b] flex p-4 items-center text-white">
      <a href=""><h2 className='text-xl font-bold ml-25'>KrishiYog</h2></a>

      <div className='list flex gap-15 ml-195 text-lg cursor-pointer font-bold text-[#d9c422] '>
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/cart">Cart</Link>
      </div>
       <LogBtn isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </div>   
  )
}

export default navbar
