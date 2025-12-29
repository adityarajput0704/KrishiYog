import React, { useState } from 'react'

const Payment = () => {
    const [paymentMethod, setPaymentMethod] = useState("cod");

    return (
        <div className='bg-white rounded-lg p-4 sm:p-6'>
            <h2 className='text-lg sm:text-xl font-bold mb-4 text-center'>Payment Method</h2>

            <div className="space-y-3 mb-4">
                 <label className="flex items-center gap-3 cursor-pointer p-3 border-2 border-gray-200 rounded-lg hover:border-green-500 transition">
                    <input
                    type="radio"
                    name="payment"
                    value="cod"
                    className="w-4 h-4" 
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}/>
             <span className=''>Cash on Delivery</span></label>
           

            <label className="flex items-center gap-3 cursor-pointer p-3 border-2 border-gray-200 rounded-lg hover:border-green-500 transition">
                <input 
                type="radio" 
                name="payment" 
                value="online" 
                className="w-4 h-4" 
                checked={paymentMethod === "online"}
  onChange={() => setPaymentMethod("online")} />
               <span className=''>UPI/Net Banking/Card Payment</span> 
               </label>
            </div>

            <hr className='my-4 border-gray-300' />
            <p className='text-xs sm:text-sm text-gray-600 mb-4 leading-relaxed'>Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.</p>
            <button className='w-full bg-green-600 text-white font-bold p-3 rounded-lg hover:bg-green-800 transition text-sm sm:text-base'>Place Order</button>

        </div>
    )
}

export default Payment
