import React from 'react'
import { useNavigate } from 'react-router-dom'

const LogBtn = (isLoggedIn, setIsLoggedIn) => {

const navigate=useNavigate();

function handleLogin(){
  navigate('/login');
}

function handleSignup(){
  navigate('/register');
}

  return (
    <div>
      <ul className="button flex gap-6 ml-15">
        <li>
          <button
           className='cursor-pointer rounded-3xl border-none pt-1 pb-1 pr-4 pl-4 items-center bg-[#a3952d] text-[#524601]'
            onClick={()=>{
              handleLogin();
        }}>
          Login
          </button>
          </li>

        <li>
          <button 
          className='cursor-pointer rounded-full border-none pt-1 pb-1 pr-4 pl-4 items-center bg-[#a3952d] text-[#524601]' onClick={()=>{
            handleSignup()
          }}>
            Signup
            </button>
            </li>
      </ul>
    </div>
  )
}

export default LogBtn
