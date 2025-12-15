import React, { useState } from 'react'

const Payment = () => {
    const [paymentMethod, setPaymentMethod] = useState("cod");

    return (
        <div>
            <h2 className='text-2xl font-bold mb-4 p-3 text-center'>Payment Method</h2>
            <div className="flex items-center gap-2">

                <input
                    type="radio"
                    name="payment"
                    value="cod"
                    className="w-4 h-4" 
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}/>
                <label>Cash on Delivery</label>
            </div>

            <div className="flex items-center gap-2">
                <input 
                type="radio" 
                name="payment" 
                value="online" 
                className="w-4 h-4" 
                checked={paymentMethod === "online"}
  onChange={() => setPaymentMethod("online")} />
                <label>UPI/Net Banking/Card Payment</label>
            </div>
            <hr className='my-5 bg-gray-300' />
            <p className='text-sm m-4'>Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.</p>
            <button className='bg-green-600 text-white font-bold p-3 rounded-lg w-full hover:bg-green-800'>Place Order</button>

        </div>
    )
}

export default Payment
