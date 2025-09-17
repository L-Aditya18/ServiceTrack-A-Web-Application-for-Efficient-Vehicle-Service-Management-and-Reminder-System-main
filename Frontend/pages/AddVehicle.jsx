import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddVehicle.css';

const AddVehicle = () => {
    const [vehicleData, setVehicleData] = useState({
        vehicleName: '',
        registrationNumber: '',
        modelYear: '',
        lastServiceDate: '',
        nextServiceDate: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setVehicleData({ ...vehicleData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5001/api/vehicles', vehicleData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Vehicle added successfully!');
            navigate('/vehicles');
        } catch (error) {
            alert('Failed to add vehicle. Please try again.');
        }
    };

    return (
        <div className="add-vehicle-container">
            <h2>Add Vehicle</h2>
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
                        value={vehicleData.lastServiceDate}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Next Service Date:</label>
                    <input
                        type="date"
                        name="nextServiceDate"
                        value={vehicleData.nextServiceDate}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Add Vehicle</button>
            </form>
        </div>
    );
};

export default AddVehicle;
