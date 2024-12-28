import axios from 'axios';

const BASE_URL = 'http://localhost:3004';

export const getAllCars = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/Car`);
    return response.data;
  } catch (error) {
    console.error('Error fetching cars:', error);
    throw error;
  }
};

export const getCarById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/Car/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching car with ID ${id}:`, error);
    throw error;
  }
};
