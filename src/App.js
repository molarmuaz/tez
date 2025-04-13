import { useState } from 'react';
import { Bell, Bus, Calendar, Home, Map, MapPin, Users, UserPlus, LogOut, User, Settings } from 'lucide-react';

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
      <DashboardLayout navigateTo={navigateTo} userRole={userRole} activeTab={activeTab} setActiveTab={setActiveTab}>
        {userRole === 'driver' ? (
          <DriverDashboardContent activeTab={activeTab} />
        ) : userRole === 'admin' ? (
          <AdminDashboardContent activeTab={activeTab} />
        ) : (
          <StudentDashboardContent />
        )}
      </DashboardLayout>
    );
  }
  
  return <div>Page not found</div>;
}

// Landing/Login Page
const LandingPage = ({ navigateTo, handleLogin }) => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">TEZ</h1>
        <p className="text-gray-600">Student Transportation System</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-medium mb-6 text-center">Login</h2>
        
        <div className="space-y-4">
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          
          <div className="space-y-3 pt-2">
            <button 
              onClick={() => handleLogin('student')}
              className="w-full py-2 bg-teal-400 text-white rounded-md hover:bg-teal-500 transition"
            >
              Login as Student
            </button>
            <button 
              onClick={() => handleLogin('driver')}
              className="w-full py-2 bg-teal-400 text-white rounded-md hover:bg-teal-500 transition"
            >
              Login as Driver
            </button>
            <button 
              onClick={() => handleLogin('admin')}
              className="w-full py-2 bg-teal-400 text-white rounded-md hover:bg-teal-500 transition"
            >
              Login as Admin
            </button>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <button 
              onClick={() => navigateTo('register')}
              className="text-teal-500 hover:underline"
            >
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>
);

// Registration Page
const RegistrationPage = ({ navigateTo }) => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">TEZ</h1>
        <p className="text-gray-600">Register for an Account</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-medium mb-6 text-center">Create Account</h2>
        
        <div className="space-y-4">
          <input 
            type="text" 
            placeholder="Full Name" 
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input 
            type="password" 
            placeholder="Confirm Password" 
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          
          <div className="w-full">
            <label className="block text-gray-700 mb-2">Select Role</label>
            <select className="w-full p-2 border border-gray-300 rounded-md bg-white">
              <option value="student">Student</option>
              <option value="driver">Driver</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          
          <button 
            className="w-full py-2 bg-teal-400 text-white rounded-md hover:bg-teal-500 transition mt-4"
          >
            Register
          </button>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <button 
              onClick={() => navigateTo('landing')}
              className="text-teal-500 hover:underline"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>
);

// Dashboard Layout
const DashboardLayout = ({ children, navigateTo, userRole, activeTab, setActiveTab }) => (
  <div className="flex h-screen bg-gray-50">
    {/* Sidebar */}
    <div className="w-16 md:w-64 bg-white shadow-md">
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-teal-500 hidden md:block">TEZ</h1>
          <h1 className="text-2xl font-bold text-teal-500 md:hidden">T</h1>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          <SidebarContent userRole={userRole} activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        
        <div className="p-4 border-t border-gray-200">
          <button 
            onClick={() => navigateTo('landing')}
            className="flex items-center text-gray-600 hover:text-teal-500 w-full"
          >
            <LogOut size={20} className="mr-2" />
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>
      </div>
    </div>
    
    {/* Main Content */}
    <div className="flex-1 overflow-y-auto">
      <header className="bg-white shadow-sm p-4 flex justify-between items-center">
        <h2 className="text-xl font-medium text-gray-800">
          {userRole === 'driver' ? 'Driver Dashboard' : 
           userRole === 'admin' ? 'Admin Dashboard' : 'Student Dashboard'}
        </h2>
        <div className="flex items-center space-x-4">
          <button className="text-gray-600 hover:text-teal-500">
            <Bell size={20} />
          </button>
          <div className="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-500">
            <User size={18} />
          </div>
        </div>
      </header>
      
      <main className="p-6">
        {children}
      </main>
    </div>
  </div>
);

// Sidebar content based on user role
const SidebarContent = ({ userRole, activeTab, setActiveTab }) => {
  // Driver Menu Items
  if (userRole === 'driver') {
    return (
      <nav className="space-y-1">
        <SidebarItem 
          icon={<Home size={20} />} 
          label="Dashboard" 
          active={activeTab === 'dashboard'} 
          onClick={() => setActiveTab('dashboard')} 
        />
        <SidebarItem 
          icon={<Bus size={20} />} 
          label="Mark Seats" 
          active={activeTab === 'seats'} 
          onClick={() => setActiveTab('seats')} 
        />
        <SidebarItem 
          icon={<Map size={20} />} 
          label="View Route" 
          active={activeTab === 'route'} 
          onClick={() => setActiveTab('route')} 
        />
        <SidebarItem 
          icon={<Bell size={20} />} 
          label="Send Notification" 
          active={activeTab === 'notifications'} 
          onClick={() => setActiveTab('notifications')} 
        />
        <SidebarItem 
          icon={<Calendar size={20} />} 
          label="View Schedule" 
          active={activeTab === 'schedule'} 
          onClick={() => setActiveTab('schedule')} 
        />
      </nav>
    );
  }
  
  // Admin Menu Items
  if (userRole === 'admin') {
    return (
      <nav className="space-y-1">
        <SidebarItem 
          icon={<Home size={20} />} 
          label="Dashboard" 
          active={activeTab === 'dashboard'} 
          onClick={() => setActiveTab('dashboard')} 
        />
        <SidebarItem 
          icon={<MapPin size={20} />} 
          label="Set Routes" 
          active={activeTab === 'routes'} 
          onClick={() => setActiveTab('routes')} 
        />
        <SidebarItem 
          icon={<Bell size={20} />} 
          label="Send Notifications" 
          active={activeTab === 'notifications'} 
          onClick={() => setActiveTab('notifications')} 
        />
        <SidebarItem 
          icon={<Bus size={20} />} 
          label="Assign Buses" 
          active={activeTab === 'buses'} 
          onClick={() => setActiveTab('buses')} 
        />
        <SidebarItem 
          icon={<Users size={20} />} 
          label="View Students" 
          active={activeTab === 'students'} 
          onClick={() => setActiveTab('students')} 
        />
        <SidebarItem 
          icon={<UserPlus size={20} />} 
          label="Manage Drivers" 
          active={activeTab === 'drivers'} 
          onClick={() => setActiveTab('drivers')} 
        />
        <SidebarItem 
          icon={<Settings size={20} />} 
          label="Settings" 
          active={activeTab === 'settings'} 
          onClick={() => setActiveTab('settings')} 
        />
      </nav>
    );
  }
  
  // Student Menu Items (Placeholder)
  return (
    <nav className="space-y-1">
      <SidebarItem 
        icon={<Home size={20} />} 
        label="Dashboard" 
        active={true} 
        onClick={() => {}} 
      />
      <SidebarItem 
        icon={<Bus size={20} />} 
        label="Coming Soon" 
        active={false} 
        onClick={() => {}} 
      />
    </nav>
  );
};

// Sidebar Item Component
const SidebarItem = ({ icon, label, active, onClick }) => (
  <button
    className={`flex items-center w-full p-2 rounded-md ${
      active ? 'bg-teal-100 text-teal-500' : 'text-gray-600 hover:bg-gray-100'
    }`}
    onClick={onClick}
  >
    <div className="mr-2">{icon}</div>
    <span className="hidden md:inline">{label}</span>
  </button>
);

// Driver Dashboard Content
const DriverDashboardContent = ({ activeTab }) => {
  if (activeTab === 'dashboard') {
    return (
      <div>
        <h3 className="text-2xl font-medium mb-6">Welcome, Driver!</h3>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h4 className="text-lg font-medium mb-4">Today's Assignment</h4>
          <div className="flex items-center space-x-4">
            <div className="bg-teal-100 p-4 rounded-md">
              <Bus size={32} className="text-teal-500" />
            </div>
            <div>
              <p className="text-gray-600">Assigned Bus</p>
              <p className="text-xl font-medium text-gray-800">TEZ-5872</p>
            </div>
          </div>
          <div className="mt-6">
            <p className="text-gray-600 mb-2">Current Status</p>
            <div className="bg-green-100 text-green-700 py-1 px-3 rounded-full inline-block">
              On Schedule
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (activeTab === 'seats') {
    return (
      <div>
        <h3 className="text-2xl font-medium mb-6">Mark Seats Reserved</h3>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h4 className="text-lg font-medium mb-4">Bus TEZ-5872 Seating</h4>
          
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            <div className="flex flex-col items-center">
              <h5 className="font-medium mb-2">Driver Side</h5>
              <div className="grid grid-cols-2 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(seatNum => (
                  <div 
                    key={`left-${seatNum}`}
                    className="h-12 w-12 bg-gray-100 rounded-md flex items-center justify-center cursor-pointer hover:bg-teal-100"
                  >
                    {seatNum}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col items-center">
              <h5 className="font-medium mb-2">Window Side</h5>
              <div className="grid grid-cols-2 gap-2">
                {[9, 10, 11, 12, 13, 14, 15, 16].map(seatNum => (
                  <div 
                    key={`right-${seatNum}`}
                    className={`h-12 w-12 rounded-md flex items-center justify-center cursor-pointer ${
                      seatNum === 10 || seatNum === 15 ? 'bg-teal-200' : 'bg-gray-100 hover:bg-teal-100'
                    }`}
                  >
                    {seatNum}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex items-center justify-center space-x-4">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gray-100 mr-2"></div>
              <span className="text-sm">Available</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-teal-200 mr-2"></div>
              <span className="text-sm">Reserved</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (activeTab === 'route') {
    return (
      <div>
        <h3 className="text-2xl font-medium mb-6">View Route</h3>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="bg-gray-100 h-64 rounded-md flex items-center justify-center text-gray-500">
            Map View Placeholder
          </div>
          <div className="mt-6">
            <h4 className="font-medium mb-2">Today's Route</h4>
            <div className="space-y-2">
              <div className="p-3 bg-gray-50 rounded-md">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
                  <p>Campus - 7:00 AM</p>
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded-md">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
                  <p>Downtown Stop - 7:15 AM</p>
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded-md">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
                  <p>North District - 7:30 AM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (activeTab === 'notifications') {
    return (
      <div>
        <h3 className="text-2xl font-medium mb-6">Send Notification</h3>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Select Recipients</label>
              <select className="w-full p-2 border border-gray-300 rounded-md bg-white">
                <option>All Students on Route</option>
                <option>Selected Students</option>
                <option>Administration Only</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Notification Type</label>
              <select className="w-full p-2 border border-gray-300 rounded-md bg-white">
                <option>General Update</option>
                <option>Delay Notice</option>
                <option>Emergency</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Message</label>
              <textarea 
                className="w-full p-2 border border-gray-300 rounded-md h-32"
                placeholder="Enter your message here..."
              ></textarea>
            </div>
            <button className="px-4 py-2 bg-teal-400 text-white rounded-md hover:bg-teal-500 transition">
              Send Notification
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  if (activeTab === 'schedule') {
    return (
      <div>
        <h3 className="text-2xl font-medium mb-6">View Schedule</h3>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h4 className="text-lg font-medium mb-4">Weekly Schedule</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Morning Route</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Afternoon Route</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bus</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">Monday</td>
                  <td className="px-6 py-4 whitespace-nowrap">7:00 AM - 8:15 AM</td>
                  <td className="px-6 py-4 whitespace-nowrap">3:00 PM - 4:15 PM</td>
                  <td className="px-6 py-4 whitespace-nowrap">TEZ-5872</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">Tuesday</td>
                  <td className="px-6 py-4 whitespace-nowrap">7:00 AM - 8:15 AM</td>
                  <td className="px-6 py-4 whitespace-nowrap">3:00 PM - 4:15 PM</td>
                  <td className="px-6 py-4 whitespace-nowrap">TEZ-5872</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">Wednesday</td>
                  <td className="px-6 py-4 whitespace-nowrap">7:00 AM - 8:15 AM</td>
                  <td className="px-6 py-4 whitespace-nowrap">2:00 PM - 3:15 PM</td>
                  <td className="px-6 py-4 whitespace-nowrap">TEZ-5872</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
  
  return <div>Content for {activeTab}</div>;
};

// Admin Dashboard Content
const AdminDashboardContent = ({ activeTab }) => {
  if (activeTab === 'dashboard') {
    return (
      <div>
        <h3 className="text-2xl font-medium mb-6">Admin Dashboard</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h4 className="text-gray-600 mb-2">Total Buses</h4>
            <div className="flex items-center">
              <Bus size={24} className="text-teal-500 mr-2" />
              <span className="text-2xl font-medium">14</span>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h4 className="text-gray-600 mb-2">Active Drivers</h4>
            <div className="flex items-center">
              <UserPlus size={24} className="text-teal-500 mr-2" />
              <span className="text-2xl font-medium">12</span>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h4 className="text-gray-600 mb-2">Registered Students</h4>
            <div className="flex items-center">
              <Users size={24} className="text-teal-500 mr-2" />
              <span className="text-2xl font-medium">342</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h4 className="text-lg font-medium mb-4">Active Routes Today</h4>
            <div className="bg-gray-100 h-48 rounded-md flex items-center justify-center text-gray-500">
              Map View Placeholder
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h4 className="text-lg font-medium mb-4">Recent Notifications</h4>
            <div className="space-y-3">
              <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                <p className="text-sm text-yellow-800">Bus TEZ-4532 is running 10 minutes late</p>
                <p className="text-xs text-gray-500 mt-1">12 minutes ago</p>
              </div>
              <div className="p-3 bg-teal-50 border-l-4 border-teal-400 rounded">
                <p className="text-sm text-teal-800">All buses scheduled for regular routes today</p>
                <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (activeTab === 'routes') {
    return (
      <div>
        <h3 className="text-2xl font-medium mb-6">Set Routes</h3>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-medium">Route Management</h4>
            <button className="px-4 py-2 bg-teal-400 text-white rounded-md hover:bg-teal-500 transition">
              Add New Route
            </button>
          </div>
          
          <div className="bg-gray-100 h-64 rounded-md flex items-center justify-center text-gray-500 mb-6">
            Map View Placeholder
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stops</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Distance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">R001</td>
                  <td className="px-6 py-4 whitespace-nowrap">North Campus Route</td>
                  <td className="px-6 py-4 whitespace-nowrap">5</td>
                  <td className="px-6 py-4 whitespace-nowrap">12 km</td>
                  <td className="px-6 py-4 whitespace-nowrap text-teal-500">Edit</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">R002</td>
                  <td className="px-6 py-4 whitespace-nowrap">Downtown Route</td>
                  <td className="px-6 py-4 whitespace-nowrap">8</td>
                  <td className="px-6 py-4 whitespace-nowrap">15 km</td>
                  <td className="px-6 py-4 whitespace-nowrap text-teal-500">Edit</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
  
  return <div>Content for {activeTab}</div>;
};

// Student Dashboard Content (Placeholder)
const StudentDashboardContent = () => (
  <div>
    <h3 className="text-2xl font-medium mb-6">Student Dashboard</h3>
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-2">Student Features</p>
          <p className="text-gray-500">Coming Soon</p>
        </div>
      </div>
    </div>
  </div>
);