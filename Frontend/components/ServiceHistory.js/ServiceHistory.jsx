import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ServiceHistory.css';

const ServiceHistory = () => {
    const { id } = useParams(); // Vehicle ID from URL
    const [serviceHistory, setServiceHistory] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchServiceHistory = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:5001/api/services/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setServiceHistory(response.data);
            } catch (error) {
                setError('Failed to load service history.');
            }
        };
        fetchServiceHistory();
    }, [id]);

    return (
        <div className="service-history-container">
            <h2>Service History</h2>
            {error && <p className="error">{error}</p>}
            {serviceHistory.length === 0 ? (
                <p>No service history found.</p>
            ) : (
                <ul>
                    {serviceHistory.map((service) => (
                        <li key={service._id}>
                            <strong>Date:</strong> {new Date(service.serviceDate).toLocaleDateString()}<br />
                            <strong>Service Type:</strong> {service.serviceType}<br />
                            <strong>Cost:</strong> ₹{service.cost}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ServiceHistory;
