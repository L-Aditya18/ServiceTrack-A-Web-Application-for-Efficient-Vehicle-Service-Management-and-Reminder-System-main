import { Link, Outlet } from 'react-router-dom';
import LogoutButton from '../LogoutButton/LogoutButton.jsx';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../Navbar/Navbar.jsx';
import './Layout.css';

const Layout = () => {
    const { isAuthenticated } = useAuth();

    return (
        <div>
            <Navbar />
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
