import React from 'react';

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

export default LandingPage;