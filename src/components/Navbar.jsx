import React from 'react'
import { FiHome,  FiBell, FiUser, FiThermometer, FiSettings } from 'react-icons/fi';

const Navbar = () => {
  return (
    <div className="w-16 h-screen bg-purple-600 p-4 flex flex-col items-center justify-center space-y-8 fixed">
            <button onClick={() => console.log('Home clicked')} className="hover:opacity-80">
              <FiHome className="text-white text-2xl" />
            </button>
            <button onClick={() => console.log('Temperature clicked')} className="hover:opacity-80">
              <FiThermometer className="text-white text-2xl" />
            </button>
            <button onClick={() => console.log('Notifications clicked')} className="hover:opacity-80">
              <FiBell className="text-white text-2xl" />
            </button>
            <button onClick={() => console.log('Profile clicked')} className="hover:opacity-80">
              <FiUser className="text-white text-2xl" />
            </button>
            {/* <div className="flex-grow" />
            <button onClick={() => console.log('Settings clicked')} className="hover:opacity-80">
              <FiSettings className="text-white text-2xl" />
            </button> */}
          </div>
  )
}

export default Navbar