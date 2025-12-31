import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { checkout } from '/src/services/api.js'

const Address = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    email: "",
    line1: "",
    area: "",
    landmark: "",
    pincode: "",
    city: ""
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  function validate() {
    let newErrors = {};

    if (!address.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!/^[6-9]\d{9}$/.test(address.phone)) {
      newErrors.phone = "Enter valid 10-digit phone number";
    }

    if (!/^\S+@\S+\.\S+$/.test(address.email)) {
      newErrors.email = "Enter valid email address";
    }

    if (!address.line1.trim()) {
      newErrors.line1 = "Address is required";
    }

    if (!address.area.trim()) {
      newErrors.area = "Area is required";
    }
    if (!address.landmark.trim()) {
      newErrors.landmark = "landmark is required";
    }

    if (!/^\d{6}$/.test(address.pincode)) {
      newErrors.pincode = "Enter valid 6-digit pincode";
    }

    if (!address.city.trim()) {
      newErrors.city = "City is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }


  function handleChange(e) {
    setAddress({
      ...address,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    setSubmitting(true);
  

  try {
    const fullAddress = `${address.line1}, ${address.area}, ${address.landmark}, ${address.city}, ${address.pincode}, Maharashtra, India`;

    const customerData = {
      customer_name: address.name,
      customer_email: address.email,
      customer_phone: address.phone,
      customer_address: fullAddress,
    };

    const response = await checkout(customerData);

    if (response.success) {
      alert(`Order placed successfully! Order ID: ${response.order.id}`);
      navigate('/');
    }
  } catch (error) {
    if (error.response?.data?.error) {
      alert(`Error: ${error.response.data.error}`);
    } else {
      alert('Failed to place order. Please try again.');
    }
    console.error('Checkout error:', error);
  } finally {
    setSubmitting(false);
  }
}

return (
  <form onSubmit={handleSubmit} className='flex-1 w-full'>
    <div className='border-2 border-gray-200  rounded-lg p-4 sm:p-6 bg-white'>
      <h2 className='text-xl sm:text-2xl font-bold mb-6'>Billing Details</h2>

      <div className="mb-4">
        <label htmlFor="name" className='block font-semibold text-sm sm:text-base mb-2'>Full Name</label>
        <input
          name="name"
          type="text"
          className='w-full border border-gray-300 p-2 sm:p-3 rounded-lg bg-gray-50 focus:outline-none focus:border-green-500'
          value={address.name}
          onChange={handleChange} />
        {errors.name && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.name}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="name" className='block font-semibold text-sm sm:text-base mb-2'>Contact Number</label>
          <input name="phone" type="number" className='w-full border border-gray-300 p-2 sm:p-3 rounded-lg bg-gray-50 focus:outline-none focus:border-green-500'
            value={address.phone}
            onChange={handleChange} />
          {errors.phone && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="email" className='block font-semibold text-sm sm:text-base mb-2'>Email</label>
          <input name="email" type="email" className='w-full border border-gray-300 p-2 sm:p-3 rounded-lg bg-gray-50 focus:outline-none focus:border-green-500'
            value={address.email}
            onChange={handleChange} />
          {errors.email && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.email}</p>}
        </div>

      </div>



      <div className="mb-6">
        <label htmlFor="country" className='block font-semibold text-sm sm:text-base mb-2'>Country/Region</label>
        <input type="text" value="India" disabled className='w-full border border-gray-300 p-2 sm:p-3 rounded-lg bg-gray-100 text-gray-600' />
      </div>


      <hr className='my-6 border-gray-300' />

      <div className='mb-4'>
        <label htmlFor="Adress line 1" className='block font-semibold text-sm sm:text-base mb-2'>Flat, House no., Building, Company, Apartment</label>
        <input name="line1" type="text" className='w-full border border-gray-300 p-2 sm:p-3 rounded-lg bg-gray-50 focus:outline-none focus:border-green-500'
          value={address.line1}
          onChange={handleChange} />
        {errors.line1 && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.line1}</p>}

      </div>

      <div className='mb-4'>
        <label htmlFor="area" className='block font-semibold text-sm sm:text-base mb-2'>Area, Street, Sector, Village</label>
        <input name="area" type="text" className='w-full border border-gray-300 p-2 sm:p-3 rounded-lg bg-gray-50 focus:outline-none focus:border-green-500'
          value={address.area}
          onChange={handleChange} />
        {errors.area && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.area}</p>}

      </div>

      <div className='mb-4'>
        <label htmlFor="landmark" className='block font-semibold text-sm sm:text-base mb-2'>Landmark</label>
        <input name="landmark" type="text" className='w-full border border-gray-300 p-2 sm:p-3 rounded-lg bg-gray-50 focus:outline-none focus:border-green-500'
          value={address.landmark}
          onChange={handleChange} />
        {errors.landmark && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.landmark}</p>}

      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4'>
        <div >
          <label htmlFor="pincode" className='block font-semibold text-sm sm:text-base mb-2'>Pincode</label>
          <input name="pincode" type="number" className='w-full border border-gray-300 p-2 sm:p-3 rounded-lg bg-gray-50 focus:outline-none focus:border-green-500'
            value={address.pincode}
            onChange={handleChange} />
          {errors.pincode && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.pincode}</p>}

        </div>

        <div >
          <label htmlFor="city" className='block font-semibold text-sm sm:text-base mb-2'>City</label>
          <input name="city" type="text" className='w-full border border-gray-300 p-2 sm:p-3 rounded-lg bg-gray-50 focus:outline-none focus:border-green-500'
            value={address.city}
            onChange={handleChange} />
          {errors.city && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.city}</p>}

        </div>
      </div>

      <div className='mb-6'>
        <label htmlFor="State" className='block font-semibold text-sm sm:text-base mb-2'>State</label>
        <input type="text" value='Maharashtra' disabled className='w-full border border-gray-300 p-2 sm:p-3 rounded-lg bg-gray-100 text-gray-600' />
      </div>


      <button type="submit" className='w-full bg-green-500 text-white font-bold p-3 rounded-lg hover:bg-green-700 transition text-sm sm:text-base'>Save and Deliver Here</button>
    </div>
  </form>
)
}

export default Address
