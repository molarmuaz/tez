import React from 'react';
import { Bus } from 'lucide-react';

const DriverDashboard = ({ activeTab }) => {
  switch (activeTab) {
    case 'dashboard':
      return <DriverHome />;
    case 'seats':
      return <MarkSeats />;
    case 'route':
      return <ViewRoute />;
    case 'notifications':
      return <SendNotification />;
    case 'schedule':
      return <ViewSchedule />;
    default:
      return <DriverHome />;
  }
};

// Driver Dashboard Home
const DriverHome = () => (
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

// Mark Seats
const MarkSeats = () => (
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

// View Route
const ViewRoute = () => (
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

// Send Notification
const SendNotification = () => (
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

// View Schedule
const ViewSchedule = () => (
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

export default DriverDashboard;