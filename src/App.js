import { useState, useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import RegistrationPage from './pages/RegistrationPage';
import DashboardLayout from './layouts/DashboardLayout';
import StudentDashboard from './pages/student/StudentDashboard';
import DriverDashboard from './pages/driver/DriverDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import { loginUser, loginOrg } from './services/api';

export default function TEZTransportApp() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [userRole, setUserRole] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Check for existing auth on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('user');
    const storedRole = localStorage.getItem('userRole');
    
    if (storedToken && storedUser && storedRole) {
      setAuthToken(storedToken);
      setUser(JSON.parse(storedUser));
      setUserRole(storedRole);
      setCurrentPage('dashboard');
    }
  }, []);

  // Handle login based on role and credentials
  const handleLogin = async (role, credentials) => {
    try {
      setLoading(true);
      setError(null);
      
      let response;
      
      if (role === 'admin') {
        // Admin login is through organization login
        response = await loginOrg(credentials);
      } else {
        // Student and driver login through user login
        response = await loginUser(credentials);
      }
      
      // Handle successful login
      if (response.data && response.data.token) {
        // Store auth data
        const token = response.data.token;
        const userData = response.data.user || response.data;
        
        // Set state
        setAuthToken(token);
        setUser(userData);
        setUserRole(role);
        
        // Store in localStorage for persistence
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('userRole', role);
        
        // Set axios default headers for future requests
        setAxiosAuthHeader(token);
        
        // Navigate to dashboard
        setCurrentPage('dashboard');
        setActiveTab('dashboard');
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Set auth token for all future axios requests
  const setAxiosAuthHeader = (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  };

  // Handle logout
  const handleLogout = () => {
    // Clear auth data
    setAuthToken(null);
    setUser(null);
    setUserRole(null);
    
    // Remove from localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    
    // Clear axios header
    setAxiosAuthHeader(null);
    
    // Navigate to landing page
    setCurrentPage('landing');
  };

  // Handle navigation between pages
  const navigateTo = (page) => {
    setCurrentPage(page);
    if (page === 'dashboard') {
      setActiveTab('dashboard');
    }
  };

  // Main component rendering based on current page
  if (currentPage === 'landing') {
    return (
      <LandingPage 
        navigateTo={navigateTo} 
        handleLogin={handleLogin} 
        loading={loading}
        error={error}
      />
    );
  }
  
  if (currentPage === 'register') {
    return <RegistrationPage navigateTo={navigateTo} />;
  }
  
  if (currentPage === 'dashboard') {
    // Redirect to landing if not authenticated
    if (!authToken || !user) {
      return <LandingPage navigateTo={navigateTo} handleLogin={handleLogin} />;
    }
    
    return (
      <DashboardLayout 
        navigateTo={navigateTo} 
        userRole={userRole} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        user={user}
        handleLogout={handleLogout}
      >
        {userRole === 'driver' ? (
          <DriverDashboard activeTab={activeTab} user={user} />
        ) : userRole === 'admin' ? (
          <AdminDashboard activeTab={activeTab} user={user} />
        ) : (
          <StudentDashboard activeTab={activeTab} user={user} />
        )}
      </DashboardLayout>
    );
  }
  
  return <div>Page not found</div>;
}