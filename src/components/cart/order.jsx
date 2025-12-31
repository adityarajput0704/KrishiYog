import React from 'react'
import Payment from './payment.jsx'


const Order = ({cartItems= [] }) => {
    const subtotal = cartItems.reduce(
  (sum, item) => sum + parseFloat(item.subtotal),
    0
);

 const codCharge = 50;
  const total = subtotal + codCharge;

    return (
        <div className='w-full lg:w-96 xl:w-[480px] flex-shrink-0'>
        <div className='border-2 border-gray-300 bg-gray-50 rounded-lg p-4 sm:p-6 sticky top-24'>

            <div className="bg-white rounded-lg p-4 sm:p-6 mb-6">

                <h2 className='text-xl sm:text-2xl lg:text-3xl font-bold mb-4 text-center'>Your Order</h2>

                <div className='flex justify-between p-3 border-b-2 font-semibold text-sm sm:text-base'>
                    <span >Product</span>
                    <span >Subtotal</span>
                </div>

                {cartItems.map(item => (
          <div key={item.id} className="flex justify-between py-3 sm:py-4 border-b text-sm sm:text-base">
            <p className="font-medium">
              {item.product.name} X {item.quantity}
            </p>
            <p className="font-medium">
              ₹{item.subtotal}
            </p>
          </div>
        ))}

                <div className="flex justify-between py-3 sm:py-4 border-b text-sm sm:text-base">
                    <p className="font-semibold  ">Subtotal</p>
                    <p className="font-bold text-green-600">₹{subtotal.toFixed(2)}</p>
                </div>
{/* 
                <div className="flex justify-between py-3 sm:py-4 border-b text-sm sm:text-base">
                    <p className="font-semibold">Shipping</p>
                    <p className="text-gray-500">Shipping charge</p>
                </div> */}

                <div className="flex justify-between py-3 sm:py-4 border-b text-sm sm:text-base">
                    <p className="font-semibold">COD Charges</p>
                    <p className="font-bold text-green-600">₹{codCharge}.00</p>
                </div>

                {/* Total */}
                <div className="flex justify-between py-3 sm:py-4 text-lg sm:text-xl font-bold text-green-600">
                    <p >Total</p>
                    <p >₹{total.toFixed(2)}</p>
                </div>
            </div>

            <Payment />

        </div>
        </div>
    )
}

export default Order
