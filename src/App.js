import { useState } from 'react';
import LandingPage from './pages/LandingPage';
import RegistrationPage from './pages/RegistrationPage';
import DashboardLayout from './layouts/DashboardLayout';
import StudentDashboard from './pages/student/StudentDashboard';
import DriverDashboard from './pages/driver/DriverDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';

export default function TEZTransportApp() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [userRole, setUserRole] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Handle login based on role
  const handleLogin = (role) => {
    setUserRole(role);
    setCurrentPage('dashboard');
    setActiveTab('dashboard');
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
    return <LandingPage navigateTo={navigateTo} handleLogin={handleLogin} />;
  }
  
  if (currentPage === 'register') {
    return <RegistrationPage navigateTo={navigateTo} />;
  }
  
  if (currentPage === 'dashboard') {
    return (
      <DashboardLayout 
        navigateTo={navigateTo} 
        userRole={userRole} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
      >
        {userRole === 'driver' ? (
          <DriverDashboard activeTab={activeTab} />
        ) : userRole === 'admin' ? (
          <AdminDashboard activeTab={activeTab} />
        ) : (
          <StudentDashboard activeTab={activeTab} />
        )}
      </DashboardLayout>
    );
  }
  
  return <div>Page not found</div>;
}