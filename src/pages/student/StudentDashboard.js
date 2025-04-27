
import React from 'react';
import { Bus, Clock, MapPin } from 'lucide-react';

const StudentDashboard = ({ activeTab }) => {
  switch (activeTab) {
    case 'dashboard':
      return <StudentHome />;
    case 'routes':
      return <BusRoutes />;
    case 'track':
      return <TrackBus />;
    case 'schedule':
      return <ViewSchedule />;
    case 'notifications':
      return <Notifications />;
    case 'seats':
      return <SeatOccupancy />;
    case 'checkin':
      return <CardCheckin />;
    case 'profile':
      return <StudentProfile />;
    default:
      return <StudentHome />;
  }
};

// Dashboard Home
const StudentHome = () => (
  <div>
    <h3 className="text-2xl font-medium mb-6">Welcome, Ali Kamran!</h3>
    
    <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
      <h4 className="text-lg font-medium mb-4">Today's Schedule</h4>
      <div className="flex items-center space-x-4">
        <div className="bg-teal-100 p-4 rounded-md">
          <Bus size={32} className="text-teal-500" />
        </div>
        <div>
          <p className="text-gray-600">Morning Pickup</p>
          <p className="text-xl font-medium text-gray-800">7:15 AM</p>
          <p className="text-gray-500 text-sm">Route: FAST NUCES through Express Way</p>
        </div>
      </div>
      <div className="flex items-center space-x-4 mt-4">
        <div className="bg-teal-100 p-4 rounded-md">
          <Bus size={32} className="text-teal-500" />
        </div>
        <div>
          <p className="text-gray-600">Evening Drop-off</p>
          <p className="text-xl font-medium text-gray-800">4:30 PM</p>
          <p className="text-gray-500 text-sm">Route: Bahria Town Phase 1-6 through Express Way</p>
        </div>
      </div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h4 className="text-lg font-medium mb-4">Quick Links</h4>
        <div className="space-y-3">
          <div className="p-3 bg-gray-50 rounded-md flex items-center text-teal-500 hover:bg-teal-50 cursor-pointer">
            <Bus size={20} className="mr-2" />
            <span onClick={BusRoutes}>View Today's Bus Route</span>
          </div>
          <div className="p-3 bg-gray-50 rounded-md flex items-center text-teal-500 hover:bg-teal-50 cursor-pointer">
            <Clock size={20} className="mr-2" />
            <span>Check Schedule</span>
          </div>
          <div className="p-3 bg-gray-50 rounded-md flex items-center text-teal-500 hover:bg-teal-50 cursor-pointer">
            <MapPin size={20} className="mr-2" />
            <span>Find Nearest Stop</span>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h4 className="text-lg font-medium mb-4">Recent Notifications</h4>
        <div className="space-y-3">
          <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
            <p className="text-sm text-yellow-800">Your bus is running 5 minutes late</p>
            <p className="text-xs text-gray-500 mt-1">12 minutes ago</p>
          </div>
          <div className="p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
            <p className="text-sm text-blue-800">Schedule change for tomorrow</p>
            <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Bus Routes
const BusRoutes = () => (
  <div>
    <h3 className="text-2xl font-medium mb-6">Bus Routes</h3>
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="mb-6">
        <h4 className="text-lg font-medium mb-2">Available Routes</h4>
        <p className="text-gray-600">Select a route to view details</p>
      </div>
      
      <div className="space-y-4">
        <div className="border border-gray-200 rounded-md p-4 hover:border-teal-400 cursor-pointer">
          <div className="flex justify-between items-center">
            <div>
              <h5 className="font-medium">North Campus Route</h5>
              <p className="text-gray-500 text-sm">Duration: ~25 minutes</p>
            </div>
            <div className="bg-teal-100 text-teal-500 px-3 py-1 rounded-full text-sm">
              Assigned
            </div>
          </div>
        </div>
        
        <div className="border border-gray-200 rounded-md p-4 hover:border-teal-400 cursor-pointer">
          <div className="flex justify-between items-center">
            <div>
              <h5 className="font-medium">Downtown Route</h5>
              <p className="text-gray-500 text-sm">Duration: ~40 minutes</p>
            </div>
            <div className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-sm">
              Available
            </div>
          </div>
        </div>
        
        <div className="border border-gray-200 rounded-md p-4 hover:border-teal-400 cursor-pointer">
          <div className="flex justify-between items-center">
            <div>
              <h5 className="font-medium">East District Route</h5>
              <p className="text-gray-500 text-sm">Duration: ~35 minutes</p>
            </div>
            <div className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-sm">
              Available
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <h4 className="text-lg font-medium mb-4">North Campus Route Details</h4>
        <div className="bg-gray-100 h-48 rounded-md flex items-center justify-center text-gray-500 mb-4">
          Map View Placeholder
        </div>
        
        <h5 className="font-medium mb-2">Stops</h5>
        <div className="space-y-2">
          <div className="p-3 bg-gray-50 rounded-md">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
              <p>Campus Main - 7:00 AM</p>
            </div>
          </div>
          <div className="p-3 bg-gray-50 rounded-md">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
              <p>North Heights - 7:15 AM</p>
            </div>
          </div>
          <div className="p-3 bg-gray-50 rounded-md">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
              <p>Pine Street - 7:25 AM</p>
            </div>
          </div>
          <div className="p-3 bg-gray-50 rounded-md">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
              <p>University Center - 7:35 AM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Track Bus
const TrackBus = () => (
  <div>
    <h3 className="text-2xl font-medium mb-6">Track Bus</h3>
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-center p-12 border-2 border-dashed border-gray-200 rounded-lg">
        <div className="text-center">
          <div className="mb-4">
            <Bus size={64} className="mx-auto text-teal-300" />
          </div>
          <h4 className="text-xl font-medium mb-2">Bus Tracking Coming Soon! 🚀</h4>
          <p className="text-gray-500 max-w-md">
            We're working on a live tracking feature so you can see exactly where your bus is in real-time.
            Stay tuned for updates!
          </p>
        </div>
      </div>
    </div>
  </div>
);

// View Schedule
const ViewSchedule = () => (
  <div>
    <h3 className="text-2xl font-medium mb-6">Bus Schedule</h3>
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h4 className="text-lg font-medium mb-4">Weekly Schedule</h4>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Morning Pickup</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Evening Drop-off</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bus</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">Monday</td>
              <td className="px-6 py-4 whitespace-nowrap">7:15 AM</td>
              <td className="px-6 py-4 whitespace-nowrap">4:30 PM</td>
              <td className="px-6 py-4 whitespace-nowrap">TEZ-5872</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">Tuesday</td>
              <td className="px-6 py-4 whitespace-nowrap">7:15 AM</td>
              <td className="px-6 py-4 whitespace-nowrap">4:30 PM</td>
              <td className="px-6 py-4 whitespace-nowrap">TEZ-5872</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">Wednesday</td>
              <td className="px-6 py-4 whitespace-nowrap">7:15 AM</td>
              <td className="px-6 py-4 whitespace-nowrap">3:00 PM</td>
              <td className="px-6 py-4 whitespace-nowrap">TEZ-5872</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">Thursday</td>
              <td className="px-6 py-4 whitespace-nowrap">7:15 AM</td>
              <td className="px-6 py-4 whitespace-nowrap">4:30 PM</td>
              <td className="px-6 py-4 whitespace-nowrap">TEZ-5872</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">Friday</td>
              <td className="px-6 py-4 whitespace-nowrap">7:15 AM</td>
              <td className="px-6 py-4 whitespace-nowrap">5:00 PM</td>
              <td className="px-6 py-4 whitespace-nowrap">TEZ-5872</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const Notifications = () => (
    <div>
      <h3 className="text-2xl font-medium mb-6">Notifications</h3>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-lg font-medium">Recent Updates</h4>
          <div className="flex space-x-2">
            <button className="px-3 py-1 bg-teal-100 text-teal-500 rounded-md hover:bg-teal-200">
              Mark All as Read
            </button>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
            <div className="flex justify-between items-start">
              <div>
                <h5 className="font-medium text-yellow-800">Your bus is running 5 minutes late</h5>
                <p className="text-sm text-gray-600 mt-1">Due to traffic conditions on Main Street, your morning pickup will be slightly delayed.</p>
              </div>
              <span className="text-xs text-gray-500">12 minutes ago</span>
            </div>
          </div>
          
          <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
            <div className="flex justify-between items-start">
              <div>
                <h5 className="font-medium text-blue-800">Schedule change for tomorrow</h5>
                <p className="text-sm text-gray-600 mt-1">Due to the school event, afternoon pickup will be at 3:30 PM instead of the regular time.</p>
              </div>
              <span className="text-xs text-gray-500">2 hours ago</span>
            </div>
          </div>
          
          <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded">
            <div className="flex justify-between items-start">
              <div>
                <h5 className="font-medium text-green-800">New driver assigned</h5>
                <p className="text-sm text-gray-600 mt-1">Your bus route will have a new driver starting next week. Please welcome Mr. Johnson!</p>
              </div>
              <span className="text-xs text-gray-500">Yesterday</span>
            </div>
          </div>
          
          <div className="p-4 bg-teal-50 border-l-4 border-teal-400 rounded">
            <div className="flex justify-between items-start">
              <div>
                <h5 className="font-medium text-teal-800">Bus maintenance complete</h5>
                <p className="text-sm text-gray-600 mt-1">The regular maintenance for your bus has been completed. All systems are working properly.</p>
              </div>
              <span className="text-xs text-gray-500">2 days ago</span>
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 border-l-4 border-gray-400 rounded">
            <div className="flex justify-between items-start">
              <div>
                <h5 className="font-medium text-gray-800">Route optimization</h5>
                <p className="text-sm text-gray-600 mt-1">We've optimized your bus route to reduce travel time. Your pickup time remains unchanged.</p>
              </div>
              <span className="text-xs text-gray-500">1 week ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  // Seat Occupancy
  const SeatOccupancy = () => (
    <div>
      <h3 className="text-2xl font-medium mb-6">Seat Occupancy</h3>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-lg font-medium">Bus TEZ-5872 Seating</h4>
          <div className="text-sm text-gray-500">Morning Route • North Campus</div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <div className="flex flex-col items-center">
            <h5 className="font-medium mb-2">Driver Side</h5>
            <div className="grid grid-cols-2 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(seatNum => (
                <div 
                  key={`left-${seatNum}`}
                  className={`h-12 w-12 rounded-md flex items-center justify-center cursor-pointer ${
                    seatNum === 3 || seatNum === 6 ? 'bg-teal-200' : 'bg-gray-100'
                  }`}
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
                    seatNum === 10 || seatNum === 15 || seatNum === 12 ? 'bg-teal-200' : 
                    seatNum === 11 ? 'bg-teal-500 text-white' : 'bg-gray-100'
                  }`}
                >
                  {seatNum === 11 ? 'You' : seatNum}
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
            <span className="text-sm">Occupied</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-teal-500 mr-2"></div>
            <span className="text-sm">Your Seat</span>
          </div>
        </div>
        
        <div className="mt-6">
          <h5 className="font-medium mb-2">Seat Information</h5>
          <p className="text-gray-600">Your assigned seat is #11. Seat assignments can be changed through the administration office.</p>
        </div>
      </div>
    </div>
  );
  
  // Card Check-in (Future Feature)
  const CardCheckin = () => (
    <div>
      <h3 className="text-2xl font-medium mb-6">Card Check-in</h3>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-center p-12 border-2 border-dashed border-gray-200 rounded-lg">
          <div className="text-center">
            <div className="mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-teal-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h4 className="text-xl font-medium mb-2">ID Card Check-in Coming Soon! ✨</h4>
            <p className="text-gray-500 max-w-md">
              We're working on a contact-less ID card check-in system. 
              Simply tap your student ID when boarding the bus to automatically register your attendance!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
  
  // Student Profile
  const StudentProfile = () => (
    <div>
      <h3 className="text-2xl font-medium mb-6">My Profile</h3>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row items-start">
          <div className="w-full md:w-1/3 flex flex-col items-center mb-6 md:mb-0">
            <div className="h-32 w-32 rounded-full bg-teal-100 flex items-center justify-center text-teal-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h4 className="text-lg font-medium">Alex Johnson</h4>
            <p className="text-gray-500">Student ID: STU2023456</p>
          </div>
  
          <div className="w-full md:w-2/3">
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Full Name</label>
                <input 
                  type="text" 
                  value="Alex Johnson" 
                  className="w-full p-2 border border-gray-300 rounded-md" 
                  readOnly
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Email Address</label>
                <input 
                  type="email" 
                  value="alex.johnson@example.com" 
                  className="w-full p-2 border border-gray-300 rounded-md" 
                  readOnly
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Grade/Year</label>
                  <input 
                    type="text" 
                    value="Junior Year" 
                    className="w-full p-2 border border-gray-300 rounded-md" 
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Phone Number</label>
                  <input 
                    type="text" 
                    value="(555) 123-4567" 
                    className="w-full p-2 border border-gray-300 rounded-md" 
                    readOnly
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Address</label>
                <input 
                  type="text" 
                  value="123 Campus Drive, Collegetown" 
                  className="w-full p-2 border border-gray-300 rounded-md" 
                  readOnly
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Change Password</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <input 
                    type="password" 
                    placeholder="Current Password" 
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  <input 
                    type="password" 
                    placeholder="New Password" 
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  <input 
                    type="password" 
                    placeholder="Confirm Password" 
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              
              <div className="flex justify-end">
                <button className="px-4 py-2 bg-teal-400 text-white rounded-md hover:bg-teal-500 transition">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  export default StudentDashboard;