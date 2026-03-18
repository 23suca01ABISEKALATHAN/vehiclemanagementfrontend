import axios from 'axios';

// 🔥 CHANGE THIS LINE (PUT YOUR AZURE BACKEND URL)
const API_BASE_URL = 'https://vehiclemanagementbackend-b0fgf3d9dafdc6gs.southeastasia-01.azurewebsites.net/';

const vehicleService = {
  getAllVehicles: async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getVehicleById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createVehicle: async (vehicleData) => {
    try {
      const response = await axios.post(API_BASE_URL, vehicleData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateVehicleName: async (id, name) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, { name });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteVehicle: async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
    } catch (error) {
      throw error;
    }
  }
};

export default vehicleService;
