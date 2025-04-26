import React from 'react';
import { Bus, UserPlus, Users } from 'lucide-react';

const AdminDashboard = ({ activeTab }) => {
  switch (activeTab) {
    case 'dashboard':
      return <AdminHome />;
    case 'routes':
      return <SetRoutes />;
    default:
      return <AdminHome />;
  }
};

// Admin Dashboard Home
const AdminHome = () => (
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

// Set Routes
const SetRoutes = () => (
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

export default AdminDashboard;