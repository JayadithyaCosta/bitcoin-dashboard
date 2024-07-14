import axios from "axios";

const API_URL = "http://localhost:3001";

export const fetchHistoricalData = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/historical`);
    return response.data;
  } catch (error) {
    console.error("Error fetching historical data:", error);
    throw error;
  }
};
