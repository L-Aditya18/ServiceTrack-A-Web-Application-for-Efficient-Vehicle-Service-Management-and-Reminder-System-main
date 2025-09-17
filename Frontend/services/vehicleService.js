import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api/vehicles';

export const getVehicles = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(API_BASE_URL, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching vehicles:', error);
        throw error;
    }
};
