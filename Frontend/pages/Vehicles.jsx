import { useEffect, useState } from 'react';
import { getVehicles } from '../services/vehicleService.js';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Vehicles.css';

const Vehicles = () => {
    const [vehicles, setVehicles] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const data = await getVehicles();
                setVehicles(data);
            } catch (err) {
                console.error('Error fetching vehicles:', err);
                setError('Failed to fetch vehicle data. Please try again.');
            }
        };

        fetchVehicles();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this vehicle?')) return;

        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5001/api/vehicles/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setVehicles(vehicles.filter(vehicle => vehicle._id !== id));
            alert('Vehicle deleted successfully!');
        } catch (error) {
            alert('Failed to delete vehicle. Please try again.');
        }
    };

    return (
        <div className="vehicles-container">
            <div className="vehicles-header">
                <h2>My Vehicles</h2>
                <Link to="/add-vehicle">
                    <button className="add-btn">Add New Vehicle</button>
                </Link>
            </div>

            {error && <p className="error">{error}</p>}

            <div className="vehicle-cards">
                {vehicles.map((vehicle) => (
                    <div key={vehicle._id} className="vehicle-card">
                        <h3>{vehicle.vehicleName}</h3>
                        <p>Registration: {vehicle.registrationNumber}</p>
                        <p>Model Year: {vehicle.modelYear}</p>
                        <p>Last Service: {vehicle.lastServiceDate || 'N/A'}</p>
                        <p>Next Service: {vehicle.nextServiceDate || 'N/A'}</p>

                        <div className="card-actions">
                            <Link to={`/edit-vehicle/${vehicle._id}`}>
                                <button className="edit-btn">Edit</button>
                            </Link>
                            <Link to={`/services/${vehicle._id}`}>
                                <button className="history-btn">Service History</button>
                            </Link>
                            <Link to={`/add-service/${vehicle._id}`}>
                                <button className="add-service-btn">Add Service</button>
                            </Link>

                            <button
                                className="delete-btn"
                                onClick={() => handleDelete(vehicle._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Vehicles;
