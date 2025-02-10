import { useState } from 'react';

import Welcome from './components/Welcome';
import RoomControl from './components/RoomControl';
import Device from './components/Device';
import React from 'react';
import Room from './components/Room';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Temperature from './components/Temperature';
import Power from './components/Power';

import { GlobalProvider } from './context/GlobalState';

function App() {
  




 
 
  return (
    <GlobalProvider>
 <div className="flex min-h-screen bg-gray-100">
  {/* Sidebar */}
  <Navbar />

  {/* Main Content */}
  <div className="flex-1 p-8 ml-16">
    {/* Header */}
    <Header />

    <div className="flex flex-col md:flex-row gap-8">
      {/* Left Column */}
      <div className="flex-1 space-y-8 w-full">
        {/* Welcome Card */}
        <Welcome />

        {/* Home Stats */}
        <Room />

        {/* Temperature Control */}
        <Temperature />
      </div>

      {/* Right Column */}
      <div className="w-full md:w-80 space-y-8">
        {/* My Devices */}
        <Device />

        {/* Power Consumed */}
        <Power />
      </div>
    </div>
  </div>
</div>

    </GlobalProvider>
  );
}

export default App;


// const members = [
//   { name: 'Mandy', role: 'Admin', avatar: '/api/placeholder/150/150' },
//   { name: 'Nariya', role: 'Full Access', avatar: '/api/placeholder/150/150' },
//   { name: 'Riya', role: 'Full Access', avatar: '/api/placeholder/150/150' },
//   { name: 'Dad', role: 'Full Access', avatar: '/api/placeholder/150/150' },
//   { name: 'Mom', role: 'Full Access', avatar: '/api/placeholder/150/150' }
// ];

//   {/* Members */}
//   <div className="bg-white rounded-xl p-6 mb-8">
//   <div className="flex justify-between items-center mb-4">
//     <h2 className="text-xl font-semibold">Members</h2>
//     <button onClick={() => console.log('View members details')} className="hover:opacity-80">
//       <span>▶</span>
//     </button>
//   </div>
//   <div className="flex flex-wrap gap-4">
//     {members.map((member, index) => (
//       <button 
//         key={index} 
//         className="text-center hover:opacity-80"
//         onClick={() => console.log(`${member.name}'s profile clicked`)}
//       >
//         <img
//           src={member.avatar}
//           alt={member.name}
//           className="w-12 h-12 rounded-full mx-auto"
//         />
//         <div className="mt-2 text-sm font-medium">{member.name}</div>
//         <div className="text-xs text-gray-500">{member.role}</div>
//       </button>
//     ))}
//   </div>
// </div>