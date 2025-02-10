import React, { useState } from 'react';
import { FiSun } from 'react-icons/fi';
import useWebSocket from '../custom/socket';
import { TbAirConditioning } from "react-icons/tb";
import { PiFanLight } from "react-icons/pi";
import { LuRefrigerator } from "react-icons/lu";

const Device = ({ currentRoom }) => {  // Accept currentRoom prop
  const { sendMessage } = useWebSocket();

  const [deviceControls, setDeviceControls] = useState({
    refrigerator: true,
    temperature: false,
    airConditioner: false,
    lights: false
  });

  const devices = [
    {
      name: 'refrigerator',
      label: 'Refrigerator',
      icon: LuRefrigerator,
      theme: 'white'
    },
    {
      name: 'fan',
      label: 'Fan',
      icon: PiFanLight,
      theme: 'white'
    },
    {
      name: 'airConditioner',
      label: 'Air Conditioner',
      icon: TbAirConditioning,
      theme: 'white'
    },
    {
      name: 'lights',
      label: 'Lights',
      icon: FiSun,
      theme: 'white'
    }
  ];

  const handleDeviceControlToggle = (controlName) => {
    setDeviceControls(prev => ({
      ...prev,
      [controlName]: !prev[controlName]
    }));

    const newStatus = !deviceControls[controlName] ? "ON" : "OFF";
    
    // Include currentRoom in the message
    const msg = JSON.stringify({
      command: {
        [controlName]: newStatus,
        room: currentRoom  // Add the current room to the message
      }
    });

    sendMessage(msg);
  };

  return (
    <div className="grid grid-cols-2 gap-4 mb-8">
      {devices.map(({ name, label, icon: Icon, theme }) => (
        <div
          key={name}
          className={`${
            deviceControls[name] === true
              ? 'bg-purple-600'
              : 'bg-white hover:border-[1px] hover:border-purple-600'
          } p-4 rounded-xl`}
        >
         <div className="flex flex-col w-full justify-between gap-2 min-h-[90px]">
  <div className={`flex items-center  ${deviceControls[name] === true ? 'text-white' : 'text-purple-600'}`}>
    <Icon className="mr-2" />
    <span>{label}</span>
  </div>
  <div className="w-full flex justify-end">
    <input
      type="checkbox"
      className="toggle"
      checked={deviceControls[name]}
      onChange={() => handleDeviceControlToggle(name)}
    />
  </div>
</div>

        </div>
      ))}
    </div>
  );
};

export default Device;