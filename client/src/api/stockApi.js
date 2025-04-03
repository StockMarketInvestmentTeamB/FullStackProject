import axios from 'axios';

const API_URL = 'http://localhost:8080/api/stocks';

export const fetchStocks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching stocks:', error);
    throw new Error('Failed to fetch stocks. Please try again later.');
  }
};

export const addStock = async (stockData) => {
  try {
    const response = await axios.post(API_URL, stockData);
    return response.data;
  } catch (error) {
    console.error('Error adding stock:', error);
    throw new Error('Failed to add stock. Please check your input and try again.');
  }
};

export const deleteStock = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data; 
  } catch (error) {
    console.error('Error deleting stock:', error);
    throw new Error(error.response?.data?.message || 'Failed to delete stock. Please try again.');
  }
};

export const refreshStockPrices = async () => {
  try {
    const response = await axios.get(`${API_URL}/refresh`);
    return response.data;
  } catch (error) {
    console.error('Error refreshing prices:', error);
    throw new Error('Failed to refresh prices. Please try again later.');
  }
};