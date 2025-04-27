import axios from 'axios';

const BASE_URL = 'http://localhost:5227'; 

// Create api instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token interceptor
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Auth endpoints
export const registerUser = (userData) => api.post('/auth/register/user', userData);
export const registerOrg = (orgData) => api.post('/auth/register/org', orgData);
export const loginUser = (credentials) => api.post('/auth/login/user', credentials);
export const loginOrg = (credentials) => api.post('/auth/login/org', credentials);

// Bus endpoints
export const fetchBus = (busId) => api.get(`${BASE_URL}/admin/bus/${busId}`);
export const fetchTotalBuses = (orgId) => api.get(`${BASE_URL}/admin/bus/all/${orgId}`);
export const updateSeatStatus = (seatId, status, seatNum) => 
  api.patch(`${BASE_URL}/driver/seat/status/${seatId}/${status}/${seatNum}`);
export const getBusSeats = (busId) => api.get(`${BASE_URL}/public/bus/seat/${busId}`);
export const addBus = (busData) => api.post(`${BASE_URL}/admin/bus/add`, busData);
export const assignDriverToBus = (busId, driverId) => 
  api.patch(`${BASE_URL}/admin/bus/assign/${busId}/${driverId}`);
export const addBusRoute = (busId, routeId) => 
  api.put(`${BASE_URL}/admin/bus/route/${busId}/${routeId}`);
export const addBusSchedule = (busId, scheduleId) => 
  api.put(`${BASE_URL}/admin/bus/schedule/${busId}/${scheduleId}`);
export const deleteBusSchedule = (busId, scheduleId) => 
  api.delete(`${BASE_URL}/admin/bus/schedule/${busId}/${scheduleId}`);
export const getBusesForRoute = (routeId) => 
  api.get(`${BASE_URL}/public/bus/route/${routeId}`);

// Driver endpoints
export const fetchActiveDrivers = (orgId) => api.get(`${BASE_URL}/admin/driver/all/${orgId}`);

// Student/User endpoints
export const fetchRegisteredStudents = () => api.get(`${BASE_URL}/api/student/all`);
export const reserveSeat = (reservationData) => api.post(`${BASE_URL}/user/seat/reserve`, reservationData);
export const cancelBooking = (bookingId) => api.patch(`${BASE_URL}/user/seat/cancel/${bookingId}`);
export const submitFeedback = (feedbackData) => api.post(`${BASE_URL}/user/feedback/submit`, feedbackData);
export const makePayment = (bookingId, paymentData) => api.post(`${BASE_URL}/user/seat/pay/${bookingId}`, paymentData);
export const getUserBookings = (userId) => api.get(`${BASE_URL}/user/bookings/${userId}`);

// Route endpoints
export const fetchRoutes = () => api.get(`${BASE_URL}/public/route/get`);
export const createRoute = (routeData) => api.post(`${BASE_URL}/admin/route/add`, routeData);
export const getOrgRoutes = (orgName) => api.get(`${BASE_URL}/public/route/get/${orgName}`);

// Schedule endpoints
export const addSchedule = (scheduleData) => api.post(`${BASE_URL}/admin/schedule/add`, scheduleData);
export const getSchedules = (orgId) => api.get(`${BASE_URL}/public/schedule/get/${orgId}`);

// Notification endpoints
export const fetchNotifications = () => api.get(`${BASE_URL}/api/notification/all`);

// Pass endpoints
export const makePassPayment = (paymentData) => api.post(`${BASE_URL}/user/pass/pay`, paymentData);
export const generatePass = (passData) => api.post(`${BASE_URL}/user/user/pass/add`, passData);

// Organization endpoints
export const getOrgFeedback = (orgId) => api.get(`${BASE_URL}/user/feedback/get/${orgId}`);
export const getFinanceReport = (orgId) => api.get(`${BASE_URL}/admin/finance/${orgId}`);
export const getEduOrgs = () => api.get(`${BASE_URL}/org/edu/all`);
export const getAdmins = () => api.get(`${BASE_URL}/org/admins`);

// These are convenience methods that might not directly match the API but are used in the application
export const fetchDrivers = (orgId) => fetchActiveDrivers(orgId);
export const fetchAvailableBuses = (orgId) => fetchTotalBuses(orgId);
export const assignBusToRoute = (busId, routeId) => addBusRoute(busId, routeId);