import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LogoutButton from '../LogoutButton/LogoutButton';
import './Navbar.css';
const Navbar = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <h1>ServiceTrack</h1>
            <div className="nav-links">
                <Link to="/">Home</Link> {/* Always visible */}
                {isAuthenticated ? (
                    <>
                        <Link to="/vehicles">Vehicles</Link>
                        <LogoutButton />
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
