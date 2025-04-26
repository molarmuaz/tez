import React from 'react';

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

export default RegistrationPage;