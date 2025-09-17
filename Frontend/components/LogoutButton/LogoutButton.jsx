import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './LogoutButton.css';

const LogoutButton = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();  // Clear auth state
        alert('Logged out successfully!');
        navigate('/login');  // Redirect to login page
    };

    return (
        <button onClick={handleLogout} className="logout-btn">
            Logout
        </button>
    );
};

export default LogoutButton;
