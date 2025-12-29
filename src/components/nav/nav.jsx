import React from 'react'
import LogBtn from './logbtn.jsx'
import { Link } from 'react-router-dom'
import SearchField from './search.jsx'


const Navbar = ({isLoggedIn, setIsLoggedIn}) => {

  return (
    <div>
      <nav className='bg-[#287c2b] text-white sticky top-0 z-[9999] shadow-md'>

        <div className=" max-w-[1440px] mx-auto px-4 py-4">
          <div className="hidden lg:flex items-center justify-between gap-6">

            <Link to="/" className="flex-shrink-0">
              <h2 className='text-lg sm:text-xl font-bold'>KrishiYog</h2>
            </Link>

            <div className="flex-grow max-w-xl ml-auto mr-12">
              <SearchField />
            </div>

            <div className='flex gap-6 font-bold text-[#d9c422] flex-shrink-0 mr-6 '>
              <Link to="/" className="hover:text-white transition whitespace-nowrap">Home</Link>
              <Link to="/shop" className="hover:text-white transition whitespace-nowrap">Shop</Link>
              <Link to="/cart" className="hover:text-white transition whitespace-nowrap">Cart</Link>
            </div>
            <LogBtn isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          </div>
        </div>
 
      </nav>
    </div>
  )
}

export default Navbar
