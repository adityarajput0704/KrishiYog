import React, { useState } from 'react'
import { updateCartItem, removeFromCart } from '/src/services/api.js'

const Tbody = ({ item, onUpdate }) => {
    const [quantity, setQuantity] = useState(item.quantity);
    const [updating, setUpdating] = useState(false);
    const [removing, setRemoving] = useState(false);

    const handleQuantityChange = async (newQuantity) => {
        if (newQuantity < 1) return;
        if (newQuantity > item.product.stock) {
            alert(`Only ${item.product.stock} items available in stock`);
            return;
        }

        setUpdating(true);
        try {
            await updateCartItem(item.id, newQuantity);
            setQuantity(newQuantity);
            onUpdate(); // Refresh cart
        } catch (error) {
            alert('Failed to update quantity');
            console.error(error);
        } finally {
            setUpdating(false);
        }
    };

    const handleRemove = async () => {
        if (!window.confirm('Remove this item from cart?')) return;

        setRemoving(true);
        try {
            await removeFromCart(item.id);
            onUpdate(); // Refresh cart
        } catch (error) {
            alert('Failed to remove item');
            console.error(error);
        } finally {
            setRemoving(false);
        }
    };


    return (
        <tr className='border-b hover:bg-gray-50'>
            <td className='p-3'>

                <div className='flex items-center gap-3'>
                    <img
                        src={item.product.image_url}
                        alt={item.product.name}
                        className='w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 object-cover rounded' />
                    <span className='font-medium text-sm sm:text-base'>{item.product.name}</span>
                </div>
            </td>
            <td className='p-3 text-center text-sm sm:text-base'>{item.product.price}</td>

            <td className='p-3 text-center text-sm sm:text-base'>
                <div className="flex items-center justify-center gap-2">
                    <button
                        onClick={() => handleQuantityChange(quantity - 1)}
                        disabled={updating || quantity <= 1}
                        className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
                    >
                        −
                    </button>
                    <span className="text-sm sm:text-base font-medium w-8 text-center">
                        {quantity}
                    </span>
                    <button
                        onClick={() => handleQuantityChange(quantity + 1)}
                        disabled={updating || quantity >= item.product.stock}
                        className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
                    >
                        +
                    </button>
                </div>
            </td>
            <td className='p-3 text-center text-sm sm:text-base'>{item.subtotal}</td>

            <td className='p-3 text-center'>
                <button
                    onClick={handleRemove}
                    disabled={removing}
                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm disabled:opacity-50"
                >
                    {removing ? 'Removing...' : 'Remove'}
                </button>
            </td>

        </tr >
    )
}

export default Tbody
