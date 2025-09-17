import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './EditVehicle.css';

const EditVehicle = () => {
    const { id } = useParams(); // Get vehicle ID from URL
    const navigate = useNavigate();
    const [vehicleData, setVehicleData] = useState({
        vehicleName: '',
        registrationNumber: '',
        modelYear: '',
        lastServiceDate: '',
        nextServiceDate: ''
    });

    useEffect(() => {
        const fetchVehicleDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:5001/api/vehicles/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setVehicleData(response.data);
            } catch (error) {
                alert('Failed to load vehicle details.');
            }
        };
        fetchVehicleDetails();
    }, [id]);

    const handleChange = (e) => {
        setVehicleData({ ...vehicleData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:5001/api/vehicles/${id}`, vehicleData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Vehicle updated successfully!');
            navigate('/vehicles');
        } catch (error) {
            alert('Failed to update vehicle. Please try again.');
        }
    };

    return (
        <div className="edit-vehicle-container">
            <h2>Edit Vehicle</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Vehicle Name:</label>
                    <input
                        type="text"
                        name="vehicleName"
                        value={vehicleData.vehicleName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Registration Number:</label>
                    <input
                        type="text"
                        name="registrationNumber"
                        value={vehicleData.registrationNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Model Year:</label>
                    <input
                        type="number"
                        name="modelYear"
                        value={vehicleData.modelYear}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Last Service Date:</label>
                    <input
                        type="date"
                        name="lastServiceDate"
                        value={vehicleData.lastServiceDate?.split('T')[0]} 
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Next Service Date:</label>
                    <input
                        type="date"
                        name="nextServiceDate"
                        value={vehicleData.nextServiceDate?.split('T')[0]}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Update Vehicle</button>
            </form>
        </div>
    );
};

export default EditVehicle;
