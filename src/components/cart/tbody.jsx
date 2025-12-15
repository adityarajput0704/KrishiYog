import React from 'react'

const Tbody = ({item}) => {
    return (
                 <tr className='text-center justify-center mx-auto'>
                        <td className='flex flex-col items-center gap-2 p-2'>
                        <img src={item.img} alt={item.product} className='w-20 h-20'/> 
                        <span>{item.product}</span> </td>
                        
                        <td>{item.price}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price * item.quantity}</td>
                    </tr>
    )
}

export default Tbody
 