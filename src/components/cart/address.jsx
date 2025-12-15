import React, { useState } from 'react'

const Address = () => {
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

function handleSubmit(e) {
  e.preventDefault();
   if (!validate()) {
    return;
  }
  console.log(address); // later → send to backend
}

    return (
        <form onSubmit={handleSubmit}>
        <div className='border-2 border-gray-200 w-125 m-3 p-4'>
            <h2 className='text-2xl font-bold mb-4'>Billing Details</h2>

            <div className="flex flex-1 items-center gap-4">
            <label htmlFor="name"  className='font-semibold w-35 text-base ml-4'>Full Name</label>
            <input name="name" type="text" className='border-1 m-4 p-1 bg-gray-100 w-60 text-center' 
            value={address.name}
  onChange={handleChange}/>
  {errors.name && <p className="text-red-500 text-sm ml-4">{errors.name}</p>}
            </div>

            <div className="flex flex-1 items-center gap-4">
             <label htmlFor="name"  className='font-semibold w-35 text-base ml-4'>Contact Number</label>
            <input name="phone" type="number" className='border-1 m-4 p-1 bg-gray-100 w-60 text-center'
            value={address.phone}
  onChange={handleChange} />
  {errors.phone && <p className="text-red-500 text-sm ml-4">{errors.phone}</p>}

            </div>

            <div className="flex flex-1 items-center gap-4 my-3">
             <label htmlFor="email"  className='font-semibold w-35 text-base ml-4'>Email</label>
            <input name="email" type="email" className='border-1 m-4 p-1 bg-gray-100 w-60 text-center'
            value={address.email}
  onChange={handleChange} />
  {errors.email && <p className="text-red-500 text-sm ml-4">{errors.email}</p>}

            </div>
        

            <div className="flex flex-1 items-center gap-4 my-3">
             <label htmlFor="country"  className='font-semibold w-35 text-base ml-4'>Country/Region</label>
            <input type="text" value="India" disabled className='border-1 m-4 p-1 bg-gray-100 w-60 text-center' />
            </div>


            <hr className='my-5 bg-gray-300' />

            <div className='flex flex-col items-start mt-6 m-1'>
                <label htmlFor="Adress line 1" className='font-semibold text-base ml-4'>Flat, House no., Building, Company, Apartment</label>
                <input name="line1" type="text" className='border-1 m-4 p-2 bg-gray-100 w-100 text-center'
                value={address.line1}
  onChange={handleChange} />
  {errors.line1 && <p className="text-red-500 text-sm ml-4">{errors.line1}</p>}

            </div>

            <div className='flex flex-col items-start m-1'>
                <label htmlFor="area" className='font-semibold text-base ml-4'>Area, Street, Sector, Village</label>
                <input name="area" type="text" className='border-1 m-4 p-2 bg-gray-100 w-100 text-center' 
                value={address.area}
  onChange={handleChange}/>
  {errors.area && <p className="text-red-500 text-sm ml-4">{errors.area}</p>}

            </div>

            <div className='flex flex-col items-start m-1'>
                <label htmlFor="landmark" className='font-semibold text-base ml-4'>Landmark</label>
                <input name="landmark" type="text" className='border-1 m-4 p-2 bg-gray-100 w-100 text-center'
                value={address.landmark}
  onChange={handleChange} />
  {errors.landmark && <p className="text-red-500 text-sm ml-4">{errors.landmark}</p>}

            </div>

            <div className="flex">
                <div className='flex flex-col items-start m-1'>
                    <label htmlFor="pincode" className='font-semibold text-base full-3'>Pincode</label>
                    <input name="pincode" type="number" className='border-1 m-4 p-2 bg-gray-100 w-50 text-center'
                    value={address.pincode}
  onChange={handleChange} />
  {errors.pincode && <p className="text-red-500 text-sm ml-4">{errors.pincode}</p>}

                </div>

                <div className='flex flex-col items-start m-1'>
                    <label htmlFor="city" className='font-semibold itemsbaseenter text-lg ml-3'>City</label>
                    <input name="city" type="text" className='border-1 m-4 p-2 bg-gray-100 w-50 text-center' 
                    value={address.city}
  onChange={handleChange}/>
  {errors.city && <p className="text-red-500 text-sm ml-4">{errors.city}</p>}

                </div>
            </div>

            <div className='flex flex-col items-start m-1'>
                <label htmlFor="State" className='font-semibold text-base ml-4'>State</label>
                <input type="text" value='Maharashtra' disabled className='border-1 m-4 p-2 bg-gray-100 w-80 text-center' />
            </div>

            <div className='ml-35 m-3'>
                <button type="submit" className='bg-green-500 text-white font-bold p-2 rounded-lg w-50 hover:bg-green-800'>Save and Deliver Here</button>
            </div>
        </div>
        </form>
    )
}

export default Address
