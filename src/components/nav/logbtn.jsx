import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/auth.jsx'

const LogBtn = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (isAuthenticated && user) {
    return (
      <div className='flex gap-3 items-center flex-shrink-0'>
        <span className='text-white text-sm'>Welcome, {user.username}</span>
        <button
          className='cursor-pointer border-none bg-[#a3952d] hover:bg-[#8a7d26] text-[#524601] font-semibold px-4 py-1.5 text-sm rounded-full transition'
          onClick={handleLogout}>
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className='flex gap-3 flex-shrink-0'>
      <button
        className='cursor-pointer border-none bg-[#a3952d] hover:bg-[#8a7d26] text-[#524601] font-semibold px-4 py-1.5 text-sm rounded-full transition'
        onClick={() => navigate('/login')}>
        Login
      </button>

      <button 
        className='cursor-pointer border-none bg-[#a3952d] hover:bg-[#8a7d26] text-[#524601] font-semibold px-4 py-1.5 text-sm rounded-full transition'
        onClick={() => navigate('/register')}>
        Signup
      </button>
    </div>
  )
}

export default LogBtn