import axios from 'axios';

const API_KEY = '72njgfa948d9aS7gs5'; // Replace with the actual API key

const apiClient = axios.create({
  baseURL: 'https://stageapi.monkcommerce.app/task/products',
  headers: {
    'x-api-key': API_KEY,
  },
});

export const fetchProducts = async () => {
  try {
    const response = await apiClient.get('/search', {
    });
    return response.data; // Adjust according to the actual API response structure
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
