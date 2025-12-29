import React from 'react'
import { useNavigate } from 'react-router-dom'

const LogBtn = (isLoggedIn, setIsLoggedIn) => {

  const navigate = useNavigate();

  function handleLogin() {
    navigate('/login');
  }

  function handleSignup() {
    navigate('/register');
  }

  return (
    <div className='flex gap-3 flex-shrink-0'>

      <button
        className=' cursor-pointer  border-none
                    bg-[#a3952d] hover:bg-[#8a7d26] text-[#524601] font-semibold px-4 py-1.5 text-sm rounded-full transition'
        onClick={() => {
          handleLogin();
        }}>
        Login
      </button>


      <button 
        className=' cursor-pointer border-none
                  bg-[#a3952d] hover:bg-[#8a7d26] text-[#524601] font-semibold px-4 py-1.5 text-sm rounded-full transition'
        onClick={() => {
          handleSignup()
        }}>
        Signup
      </button>

    </div>
  )
}

export default LogBtn
