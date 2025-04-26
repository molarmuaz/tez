import React from 'react';

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

export default SidebarItem;