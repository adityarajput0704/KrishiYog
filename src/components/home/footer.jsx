import React from 'react'

const Footer = () => {
  return (
    <div>
      <footer className='w-full bg-gray-300 mt-10 pt-5 pb-3 items-center text-center'>
        <div className="flex gap-70 p-5 font-semibold">
           
            <div className=' ml-45 w-60 flex flex-col'>
                <h1 className='text-4xl font-bold ml-7 text-green-700'>Krishiyog</h1>
                <p className='text-sm mb-3 mt-1'>Your trusted partner in agriculture</p>
                <span className='mb-3'>Address:Terna Engineering college, Nerul, Navi-Mumbai - 400705</span>
               
                <span className='mb-3'>Contact: +91 9876543210   Email: adityarajput7782@gmail.com</span>
            </div>

            <div className='flex flex-col'>
                <h2 className='text-xl font-bold mb-2'>Our Policies</h2>
                <a href='#' className='mb-2 font-normal text-sm'>Privacy policy</a>
                <a href='#' className='mb-2 font-normal text-sm'>Shipping & Delivery</a>
                <a href='#' className='mb-2 font-normal text-sm'>Cancellation policy</a>
                <a href='#' className='mb-2 font-normal text-sm'>Terms of use</a>
                <a href='#' className='mb-2 font-normal text-sm'>Seller terms and conditions</a>
            </div>

            <div className='flex flex-col'>
                <h2 className='text-xl font-bold mb-2'>Get help</h2>
                <a href='#' className='mb-2 font-normal text-sm'>Contact Us</a>
                <a href='#' className='mb-2 font-normal text-sm'>FAQs</a>
            </div>
        </div>
        <p className='mt-1 mb-3'>© 2024 Krishiyog. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Footer
