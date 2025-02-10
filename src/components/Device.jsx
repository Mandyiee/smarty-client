import React, { useState } from 'react';
import {  FiWifi, FiMusic, FiSun } from 'react-icons/fi';
import useWebSocket from '../custom/socket';
import { TbBatteryVerticalCharging2 } from "react-icons/tb";

const Device = () => {
  const { sendMessage } = useWebSocket("ws://localhost:8080");
  const [devices, setDevices] = useState([
    { name: 'Charger', icon: <TbBatteryVerticalCharging2 />, status: true, color: 'bg-purple-500' },
    { name: 'Router', icon: <FiWifi />, status: true, color: 'bg-yellow-500' },
    { name: 'Music System', icon: <FiMusic />, status: true, color: 'bg-coral-500' },
    { name: 'Lamps', icon: <FiSun />, status: true, color: 'bg-cyan-500' }
  ]);

  const handleDeviceToggle = (deviceName) => {
    // First update the devices state
    setDevices(prevDevices => 
      prevDevices.map(device => 
        device.name === deviceName 
          ? { ...device, status: !device.status }
          : device
      )
    );

    // Find the device and get its new status
    const device = devices.find(d => d.name === deviceName);
    const newStatus = !device.status === true ? "ON" : "OFF";

    // Construct the message
    const msg = JSON.stringify({
      command: {
        [deviceName]: newStatus
      }
    });

    // Send the message
    sendMessage(msg);
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">My Devices</h2>
      
      </div>
      <div className="grid grid-cols-2 grid-rows-2 gap-4">
        {devices.slice(0, 4).map((device, index) => (
          <div
            key={index}
            className={`${device.color} p-4 rounded-xl text-white flex flex-col justify-between min-h-[140px]`}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="text-2xl mr-2">{device.icon}</div>
                <span>{device.name}</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="mr-2">{device.status ? 'ON' : 'OFF'}</span>
              <input
                type="checkbox"
                checked={device.status}
                className="toggle"
                onChange={() => handleDeviceToggle(device.name)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Device;