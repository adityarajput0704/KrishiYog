import React from 'react'
import Payment from './payment.jsx'


const Order = ({cartItems= [], paymentMethod= "cod"}) => {
    const subtotal = cartItems.reduce(
  (sum, item) => sum + item.price * item.quantity,
  0
);

const codCharge = paymentMethod === "cod" ? 300 : 0;
const total = subtotal + codCharge;

    return (
        <div className='border-2 border-gray-300 bg-gray-200 w-130 h-190 m-3 p-4 '>

            <div className=" width-100 bg-white">

                <h2 className='text-3xl font-bold mb-4 p-3 text-center'>Your Order</h2>

                <div className='flex justify-between p-3 border-b-2'>
                    <span className='font-semibold text-lg'>Product</span>
                    <span className='font-semibold text-lg'>Subtotal</span>
                </div>

                {cartItems.map(item => (
          <div key={item.id} className="flex justify-between py-4 border-b">
            <p className="ml-3 font-medium">
              {item.product} X {item.quantity}
            </p>
            <p className="mr-3 font-medium">
              ₹{item.price * item.quantity}
            </p>
          </div>
        ))}

                {/* Subtotal */}
                <div className="flex justify-between py-4 border-b">
                    <p className="font-semibold  ml-3">Subtotal</p>
                    <p className="font-bold text-green-600 mr-3">₹{subtotal}.00</p>
                </div>

                {/* Shipping */}
                <div className="flex justify-between py-4 border-b">
                    <p className="font-semibold ml-3">Shipping</p>
                    <p className="text-gray-500 mr-3">Shipping charge</p>
                </div>

                {/* COD Charges */}
                <div className="flex justify-between py-4 border-b">
                    <p className="font-semibold ml-3">COD Charges</p>
                    <p className="font-bold text-green-600 mr-3">₹{codCharge}.00</p>
                </div>

                {/* Total */}
                <div className="flex justify-between py-4 text-xl font-bold text-green-600 ">
                    <p className='ml-3'>Total</p>
                    <p className='mr-3'>₹{total}.00</p>
                </div>
            </div>

            <Payment />

        </div>
    )
}

export default Order
