import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddService.css';

const AddService = () => {
    const { id: vehicleId } = useParams(); // Vehicle ID from URL
    const navigate = useNavigate();

    const [serviceDate, setServiceDate] = useState('');
    const [description, setDescription] = useState('');
    const [cost, setCost] = useState('');
    const [serviceType, setServiceType] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post(`http://localhost:5001/api/services/${vehicleId}`, {
                vehicleId,
                serviceDate,
                description,
                cost,
                serviceType
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setSuccess('Service added successfully!');
            setTimeout(() => navigate(`/services/${vehicleId}`), 1500);
        } catch (error) {
            console.error('Error adding service:', error);
            setError('Failed to add service. Please try again.');
        }
    };

    return (
        <div className="add-service-page">
            <h2>Add Service</h2>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
            
            <form onSubmit={handleSubmit}>
                <label>Service Date:</label>
                <input 
                    type="date" 
                    value={serviceDate}
                    onChange={(e) => setServiceDate(e.target.value)}
                    required
                />

                <label>Description:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <label>Cost (₹):</label>
                <input
                    type="number"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                    required
                />

                <label>Service Type:</label>
                <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    required
                >
                    <option value="">Select Service Type</option>
                    <option value="Oil Change">Oil Change</option>
                    <option value="Tire Rotation">Tire Rotation</option>
                    <option value="General Maintenance">General Maintenance</option>
                    <option value="Repair">Repair</option>
                    <option value="Other">Other</option>
                </select>

                <button type="submit" className="submit-btn">Add Service</button>
            </form>
        </div>
    );
};

export default AddService;
