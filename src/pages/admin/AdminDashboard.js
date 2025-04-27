import React, { useState, useEffect } from 'react';
import { Bus, UserPlus, Users, Bell, ClipboardList, Send, Edit, Trash2, Plus, MapPin } from 'lucide-react';
import { 
  fetchTotalBuses, 
  fetchActiveDrivers, 
  fetchRegisteredStudents, 
  fetchNotifications, 
  fetchRoutes,
  fetchRegisteredDrivers,
  assignBusToRoute
} from '../../services/api'; 

const AdminDashboard = ({ activeTab }) => {
  switch (activeTab) {
    case 'dashboard':
      return <AdminHome />; 
    case 'routes':
      return <SetRoutes />;
    case 'sendNotification':
      return <SendNotification />;
    case 'assignBus':
      return <AssignBus />;
    case 'students':
      return <ViewStudents />;
    case 'drivers':
      return <ManageDrivers />;
    default:
      return <AdminHome />;
  }
};

// Admin Dashboard Home
const AdminHome = () => {
  const [buses, setBuses] = useState(0);
  const [drivers, setDrivers] = useState(0);
  const [students, setStudents] = useState(0);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchTotalBuses().then(res => setBuses(res.data.length)).catch(err => console.error(err));
    fetchActiveDrivers().then(res => setDrivers(res.data.length)).catch(err => console.error(err));
    fetchRegisteredStudents().then(res => setStudents(res.data.length)).catch(err => console.error(err));
    fetchNotifications().then(res => setNotifications(res.data)).catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h3 className="text-2xl font-medium mb-6">Admin Dashboard</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatCard title="Total Buses" icon={<Bus size={24} className="text-teal-500 mr-2" />} value={buses} />
        <StatCard title="Active Drivers" icon={<UserPlus size={24} className="text-teal-500 mr-2" />} value={drivers} />
        <StatCard title="Registered Students" icon={<Users size={24} className="text-teal-500 mr-2" />} value={students} />
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
            {notifications.slice(0, 3).map((note, idx) => (
              <div key={idx} className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                <p className="text-sm text-yellow-800">{note.message}</p>
                <p className="text-xs text-gray-500 mt-1">{new Date(note.createdAt).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, icon, value }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <h4 className="text-gray-600 mb-2">{title}</h4>
    <div className="flex items-center">
      {icon}
      <span className="text-2xl font-medium">{value}</span>
    </div>
  </div>
);

// Set Routes
const SetRoutes = () => {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    fetchRoutes()
      .then(res => setRoutes(res.data))
      .catch(err => console.error('Failed to fetch routes', err));
  }, []);

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

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Origin → Destination</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stops</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {routes.length > 0 ? (
                routes.map((route) => (
                  <tr key={route.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{route.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{route.origin} → {route.destination}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{route.stops?.length || 0}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-teal-500 cursor-pointer">Edit</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-gray-400">No routes found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Send Notification - Placeholder (no API connected yet)
const SendNotification = () => (
  <div>
    <h3 className="text-2xl font-medium mb-6 flex items-center"><Send className="mr-2" /> Send Notification</h3>
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <textarea
        placeholder="Type your notification here..."
        className="w-full h-32 p-4 border rounded-md"
      />
      <button className="mt-4 px-6 py-2 bg-teal-400 text-white rounded-md hover:bg-teal-500 transition">
        Send Notification
      </button>
    </div>
  </div>
);

// Assign Bus component - New implementation
const AssignBus = () => {
  const [routes, setRoutes] = useState([]);
  const [buses, setBuses] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState('');
  const [selectedBus, setSelectedBus] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    // Fetch available routes and buses on component mount
    Promise.all([
      fetchRoutes(),
      fetchTotalBuses()
    ])
      .then(([routesRes, busesRes]) => {
        setRoutes(routesRes.data);
        setBuses(busesRes.data);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        setMessage({ type: 'error', text: 'Failed to load data. Please try again.' });
      });
  }, []);

  const handleAssign = async () => {
    if (!selectedBus || !selectedRoute) {
      setMessage({ type: 'error', text: 'Please select both a bus and a route' });
      return;
    }

    setLoading(true);
    try {
      // Based on Postman collection, the endpoint looks like this
      const response = await assignBusToRoute(selectedBus, selectedRoute);
      setMessage({ type: 'success', text: 'Bus successfully assigned to route!' });
      
      // Clear selections after successful assignment
      setSelectedBus('');
      setSelectedRoute('');
    } catch (error) {
      console.error('Error assigning bus:', error);
      setMessage({ type: 'error', text: 'Failed to assign bus. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 className="text-2xl font-medium mb-6 flex items-center">
        <Bus className="mr-2" /> Assign Bus to Route
      </h3>

      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        {message && (
          <div className={`p-4 mb-4 rounded-md ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Route</label>
            <select 
              className="w-full p-2 border border-gray-300 rounded-md" 
              value={selectedRoute}
              onChange={(e) => setSelectedRoute(e.target.value)}
            >
              <option value="">Select a route</option>
              {routes.map(route => (
                <option key={route.id} value={route.id}>
                  {route.name || `${route.origin} → ${route.destination}`}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Bus</label>
            <select 
              className="w-full p-2 border border-gray-300 rounded-md"
              value={selectedBus}
              onChange={(e) => setSelectedBus(e.target.value)}
            >
              <option value="">Select a bus</option>
              {buses.map(bus => (
                <option key={bus.id} value={bus.id}>
                  {bus.model} ({bus.licNum})
                </option>
              ))}
            </select>
          </div>
        </div>

        <button 
          className="px-6 py-2 bg-teal-400 text-white rounded-md hover:bg-teal-500 transition disabled:opacity-50"
          onClick={handleAssign}
          disabled={loading || !selectedBus || !selectedRoute}
        >
          {loading ? 'Assigning...' : 'Assign Bus'}
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h4 className="text-lg font-medium mb-4">Current Bus Assignments</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bus</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Driver</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {buses.filter(bus => bus.routeId).map((bus) => (
                <tr key={bus.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {routes.find(r => r.id === bus.routeId)?.name || 'Unknown Route'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{bus.model} ({bus.licNum})</td>
                  <td className="px-6 py-4 whitespace-nowrap">{bus.driverName || 'Not Assigned'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-red-500 hover:text-red-700">Remove</button>
                  </td>
                </tr>
              ))}
              {!buses.some(bus => bus.routeId) && (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-gray-400">No buses assigned to routes</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// View Students component - New implementation
const ViewStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    studentId: '',
    institute: '',
    contactNumber: ''
  });
  const [message, setMessage] = useState(null);

  useEffect(() => {
    // Fetch students data
    fetchRegisteredStudents()
      .then(res => {
        setStudents(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch students:', err);
        setLoading(false);
        setMessage({ type: 'error', text: 'Failed to load students. Please try again.' });
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Call API to add student
      const response = await axios.post('/api/student/add', formData);
      
      // Update local state with new student
      setStudents(prev => [...prev, response.data]);
      setMessage({ type: 'success', text: 'Student added successfully!' });
      
      // Reset form and hide it
      setFormData({
        name: '',
        email: '',
        password: '',
        studentId: '',
        institute: '',
        contactNumber: ''
      });
      setShowAddForm(false);
    } catch (error) {
      console.error('Error adding student:', error);
      setMessage({ type: 'error', text: 'Failed to add student. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (student) => {
    setEditingStudent(student.id);
    setFormData({
      name: student.name,
      email: student.email,
      studentId: student.studentId,
      institute: student.institute,
      contactNumber: student.contactNumber,
      // Don't set password for security reasons
      password: ''
    });
    setShowAddForm(true);
  };

  const handleUpdateStudent = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Call API to update student
      const response = await axios.put(`/api/student/${editingStudent}`, formData);
      
      // Update local state
      setStudents(prev => prev.map(student => 
        student.id === editingStudent ? response.data : student
      ));
      
      setMessage({ type: 'success', text: 'Student updated successfully!' });
      
      // Reset form and state
      setFormData({
        name: '',
        email: '',
        password: '',
        studentId: '',
        institute: '',
        contactNumber: ''
      });
      setShowAddForm(false);
      setEditingStudent(null);
    } catch (error) {
      console.error('Error updating student:', error);
      setMessage({ type: 'error', text: 'Failed to update student. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteStudent = async (id) => {
    if (window.confirm('Are you sure you want to remove this student?')) {
      setLoading(true);
      try {
        // Call API to delete student
        await axios.delete(`/api/student/${id}`);
        
        // Update local state
        setStudents(prev => prev.filter(student => student.id !== id));
        setMessage({ type: 'success', text: 'Student removed successfully!' });
      } catch (error) {
        console.error('Error deleting student:', error);
        setMessage({ type: 'error', text: 'Failed to remove student. Please try again.' });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <h3 className="text-2xl font-medium mb-6 flex items-center">
        <Users className="mr-2" /> Student Management
      </h3>

      {message && (
        <div className={`p-4 mb-4 rounded-md ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {message.text}
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-medium">Student List</h4>
          <button 
            className="px-4 py-2 bg-teal-400 text-white rounded-md hover:bg-teal-500 transition flex items-center"
            onClick={() => {
              setShowAddForm(!showAddForm);
              if (editingStudent) {
                setEditingStudent(null);
                setFormData({
                  name: '',
                  email: '',
                  password: '',
                  studentId: '',
                  institute: '',
                  contactNumber: ''
                });
              }
            }}
          >
            <Plus size={16} className="mr-1" />
            {showAddForm ? 'Cancel' : 'Add Student'}
          </button>
        </div>

        {showAddForm && (
          <div className="bg-gray-50 p-4 rounded-md mb-6">
            <h5 className="text-md font-medium mb-4">
              {editingStudent ? 'Update Student' : 'Add New Student'}
            </h5>
            <form onSubmit={editingStudent ? handleUpdateStudent : handleAddStudent}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {editingStudent ? 'New Password (leave blank to keep current)' : 'Password'}
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required={!editingStudent}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Student ID</label>
                  <input
                    type="text"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Institute</label>
                  <input
                    type="text"
                    name="institute"
                    value={formData.institute}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                  <input
                    type="text"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-teal-400 text-white rounded-md hover:bg-teal-500 transition disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Processing...' : editingStudent ? 'Update Student' : 'Add Student'}
              </button>
            </form>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Institute</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center">Loading...</td>
                </tr>
              ) : students.length > 0 ? (
                students.map((student) => (
                  <tr key={student.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{student.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{student.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{student.studentId}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{student.institute}</td>
                    <td className="px-6 py-4 whitespace-nowrap flex space-x-2">
                      <button 
                        className="text-blue-500 hover:text-blue-700 flex items-center"
                        onClick={() => handleEditClick(student)}
                      >
                        <Edit size={16} className="mr-1" /> Edit
                      </button>
                      <button 
                        className="text-red-500 hover:text-red-700 flex items-center"
                        onClick={() => handleDeleteStudent(student.id)}
                      >
                        <Trash2 size={16} className="mr-1" /> Remove
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-400">No students found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Manage Drivers - Placeholder (no API connected yet)
const ManageDrivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingDriver, setEditingDriver] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    driverId: '',
    vehicle: '',
    contactNumber: ''
  });
  const [message, setMessage] = useState(null);

  useEffect(() => {
    // Fetch drivers data
    fetchRegisteredDrivers()
      .then(res => {
        setDrivers(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch drivers:', err);
        setLoading(false);
        setMessage({ type: 'error', text: 'Failed to load drivers. Please try again.' });
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddDriver = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Call API to add driver
      const response = await axios.post('/api/driver/add', formData);
      
      // Update local state with new driver
      setDrivers(prev => [...prev, response.data]);
      setMessage({ type: 'success', text: 'Driver added successfully!' });
      
      // Reset form and hide it
      setFormData({
        name: '',
        email: '',
        password: '',
        driverId: '',
        vehicle: '',
        contactNumber: ''
      });
      setShowAddForm(false);
    } catch (error) {
      console.error('Error adding driver:', error);
      setMessage({ type: 'error', text: 'Failed to add driver. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (driver) => {
    setEditingDriver(driver.id);
    setFormData({
      name: driver.name,
      email: driver.email,
      driverId: driver.driverId,
      vehicle: driver.vehicle,
      contactNumber: driver.contactNumber,
      // Don't set password for security reasons
      password: ''
    });
    setShowAddForm(true);
  };

  const handleUpdateDriver = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Call API to update driver
      const response = await axios.put(`/api/driver/${editingDriver}`, formData);
      
      // Update local state
      setDrivers(prev => prev.map(driver => 
        driver.id === editingDriver ? response.data : driver
      ));
      
      setMessage({ type: 'success', text: 'Driver updated successfully!' });
      
      // Reset form and state
      setFormData({
        name: '',
        email: '',
        password: '',
        driverId: '',
        vehicle: '',
        contactNumber: ''
      });
      setShowAddForm(false);
      setEditingDriver(null);
    } catch (error) {
      console.error('Error updating driver:', error);
      setMessage({ type: 'error', text: 'Failed to update driver. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDriver = async (id) => {
    if (window.confirm('Are you sure you want to remove this driver?')) {
      setLoading(true);
      try {
        // Call API to delete driver
        await axios.delete(`/api/driver/${id}`);
        
        // Update local state
        setDrivers(prev => prev.filter(driver => driver.id !== id));
        setMessage({ type: 'success', text: 'Driver removed successfully!' });
      } catch (error) {
        console.error('Error deleting driver:', error);
        setMessage({ type: 'error', text: 'Failed to remove driver. Please try again.' });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <h3 className="text-2xl font-medium mb-6 flex items-center">
        <Users className="mr-2" /> Driver Management
      </h3>

      {message && (
        <div className={`p-4 mb-4 rounded-md ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {message.text}
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-medium">Driver List</h4>
          <button 
            className="px-4 py-2 bg-teal-400 text-white rounded-md hover:bg-teal-500 transition flex items-center"
            onClick={() => {
              setShowAddForm(!showAddForm);
              if (editingDriver) {
                setEditingDriver(null);
                setFormData({
                  name: '',
                  email: '',
                  password: '',
                  driverId: '',
                  vehicle: '',
                  contactNumber: ''
                });
              }
            }}
          >
            <Plus size={16} className="mr-1" />
            {showAddForm ? 'Cancel' : 'Add Driver'}
          </button>
        </div>

        {showAddForm && (
          <div className="bg-gray-50 p-4 rounded-md mb-6">
            <h5 className="text-md font-medium mb-4">
              {editingDriver ? 'Update Driver' : 'Add New Driver'}
            </h5>
            <form onSubmit={editingDriver ? handleUpdateDriver : handleAddDriver}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {editingDriver ? 'New Password (leave blank to keep current)' : 'Password'}
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required={!editingDriver}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Driver ID</label>
                  <input
                    type="text"
                    name="driverId"
                    value={formData.driverId}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle</label>
                  <input
                    type="text"
                    name="vehicle"
                    value={formData.vehicle}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                  <input
                    type="text"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-teal-400 text-white rounded-md hover:bg-teal-500 transition disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Processing...' : editingDriver ? 'Update Driver' : 'Add Driver'}
              </button>
            </form>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Driver ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center">Loading...</td>
                </tr>
              ) : drivers.length > 0 ? (
                drivers.map((driver) => (
                  <tr key={driver.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{driver.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{driver.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{driver.driverId}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{driver.vehicle}</td>
                    <td className="px-6 py-4 whitespace-nowrap flex space-x-2">
                      <button 
                        className="text-blue-500 hover:text-blue-700 flex items-center"
                        onClick={() => handleEditClick(driver)}
                      >
                        <Edit size={16} className="mr-1" /> Edit
                      </button>
                      <button 
                        className="text-red-500 hover:text-red-700 flex items-center"
                        onClick={() => handleDeleteDriver(driver.id)}
                      >
                        <Trash2 size={16} className="mr-1" /> Remove
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-400">No drivers found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


export default AdminDashboard;
