import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

// Axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Important for session cookies!
  headers: {
    'Content-Type': 'application/json',
  },
});

// ========== PRODUCT APIs ==========
export const getAllProducts = async (category = null) => {
  try {
    const url = category && category !== 'all' 
      ? `/products/?category=${category}` 
      : '/products/';
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

// ========== CART APIs ==========
export const getCart = async () => {
  try {
    const response = await api.get('/cart/');
    return response.data;
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw error;
  }
};

export const addToCart = async (productId, quantity = 1) => {
  try {
    const response = await api.post('/cart/add/', {
      product_id: productId,
      quantity: quantity,
    });
    return response.data;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

export const updateCartItem = async (cartItemId, quantity) => {
  try {
    const response = await api.put('/cart/update/', {
      cart_item_id: cartItemId,
      quantity: quantity,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating cart:', error);
    throw error;
  }
};

export const removeFromCart = async (cartItemId) => {
  try {
    const response = await api.delete(`/cart/remove/${cartItemId}/`);
    return response.data;
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
};

// ========== CHECKOUT API ==========
export const checkout = async (customerData) => {
  try {
    const response = await api.post('/checkout/', customerData);
    return response.data;
  } catch (error) {
    console.error('Error during checkout:', error);
    throw error;
  }
};
