import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

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

export const searchProducts = async (searchTerm) => {
  try {
    const response = await api.get(`/products/?search=${searchTerm}`);
    return response.data;
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};

export const filterProducts = async (filters) => {
  try {
    const params = new URLSearchParams();
    if (filters.category && filters.category !== 'all') params.append('category', filters.category);
    if (filters.search) params.append('search', filters.search);
    if (filters.min_price) params.append('min_price', filters.min_price);
    if (filters.max_price) params.append('max_price', filters.max_price);
    if (filters.ordering) params.append('ordering', filters.ordering);
    
    const response = await api.get(`/products/?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Error filtering products:', error);
    throw error;
  }
};

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
    console.log('Adding to cart:', { product_id: productId, quantity });
    
    const response = await api.post('/cart/add/', {
      product_id: productId,
      quantity: quantity,
    });
    
    console.log('Cart response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error adding to cart:', error);
    console.error('Error response:', error.response?.data);
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

export const checkout = async (customerData) => {
  try {
    const response = await api.post('/checkout/', customerData);
    return response.data;
  } catch (error) {
    console.error('Error during checkout:', error);
    throw error;
  }
};

export const getOrderHistory = async () => {
  try {
    const response = await api.get('/orders/');
    return response.data;
  } catch (error) {
    console.error('Error fetching order history:', error);
    throw error;
  }
};

export const getOrderDetail = async (orderId) => {
  try {
    const response = await api.get(`/orders/${orderId}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching order detail:', error);
    throw error;
  }
};

export default api;