import React from 'react';
import { Bell, Bus, Calendar, Home, Map, MapPin, Users, UserPlus, LogOut, User, Settings, CreditCard, AlertTriangle } from 'lucide-react';
import SidebarItem from '../components/SidebarItem.js';

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
  
  // Student Menu Items
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
        label="Bus Routes" 
        active={activeTab === 'routes'} 
        onClick={() => setActiveTab('routes')} 
      />
      <SidebarItem 
        icon={<Map size={20} />} 
        label="Track Bus" 
        active={activeTab === 'track'} 
        onClick={() => setActiveTab('track')} 
      />
      <SidebarItem 
        icon={<Calendar size={20} />} 
        label="Schedule" 
        active={activeTab === 'schedule'} 
        onClick={() => setActiveTab('schedule')} 
      />
      <SidebarItem 
        icon={<Bell size={20} />} 
        label="Notifications" 
        active={activeTab === 'notifications'} 
        onClick={() => setActiveTab('notifications')} 
      />
      <SidebarItem 
        icon={<Users size={20} />} 
        label="Seat Occupancy" 
        active={activeTab === 'seats'} 
        onClick={() => setActiveTab('seats')} 
      />
      <SidebarItem 
        icon={<CreditCard size={20} />} 
        label="Card Check-in" 
        active={activeTab === 'checkin'} 
        onClick={() => setActiveTab('checkin')} 
      />
      <SidebarItem 
        icon={<User size={20} />} 
        label="Profile" 
        active={activeTab === 'profile'} 
        onClick={() => setActiveTab('profile')} 
      />
    </nav>
  );
};

export default DashboardLayout;