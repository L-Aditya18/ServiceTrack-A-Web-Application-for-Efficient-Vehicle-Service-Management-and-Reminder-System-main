import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Vehicles from '../pages/Vehicles';
import Layout from '../components/Layout/Layout.jsx';
import Login from '../components/Login/Login.jsx';
import Register from '../components/Register/Register.jsx';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute.jsx';
import AddVehicle from '../pages/AddVehicle.jsx';
import EditVehicle from '../pages/EditVehicle.jsx';
import ServiceHistory from '../components/ServiceHistory.js/ServiceHistory.jsx';
import AddService from '../pages/AddService.jsx';

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route
                      path="/vehicles"
                      element={
                          <ProtectedRoute>
                              <Vehicles />
                          </ProtectedRoute>
                      }
                  />
                  <Route
                      path="/add-vehicle"
                      element={
                          <ProtectedRoute>
                              <AddVehicle />
                          </ProtectedRoute>
                      }
                  />
                  <Route
                      path="/edit-vehicle/:id"
                      element={
                          <ProtectedRoute>
                              <EditVehicle />
                          </ProtectedRoute>
                      }
                  />
                  <Route 
                    path="/services/:id"
                    element={
                      <ProtectedRoute>
                        <ServiceHistory />
                      </ProtectedRoute>
                    }
                  />
                  <Route 
                    path="/add-service/:id"
                    element={
                      <ProtectedRoute>
                        <AddService />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
              </Route>
          </Routes>
      </Router>
  );
}

export default App;
