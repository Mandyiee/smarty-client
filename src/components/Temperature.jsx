import React, { useContext, useState, useEffect } from "react";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { GlobalContext } from "../context/GlobalState";
import useWebSocket from "../custom/socket";

const Temperature = () => {
  const [temperature, setTemperature] = useState(25);
  const currentRoom = useContext(GlobalContext).currentRoom;
  const { sendMessage } = useWebSocket();

  // Calculate the fill percentage for the circular progress
  const fillPercentage = ((temperature - 5) / (30 - 5)) * 100;

  // Send message when temperature changes
  useEffect(() => {
    if (currentRoom) {
      const msg = JSON.stringify({
        command: {
          [currentRoom]: temperature,
        },
      });
      sendMessage(msg);
    }
  }, [temperature, currentRoom, sendMessage]); // Depend on temperature changes

  function handleNegativeClick() {
    setTemperature((t) => Math.max(5, t - 1));
  }

  function handlePositiveClick() {
    setTemperature((t) => Math.min(30, t + 1));
  }

  return (
    <div className="bg-white rounded-xl px-6 py-4 mb-2">
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center">
          <AiOutlineThunderbolt className="text-purple-600 mr-2 text-2xl" />
          <h2 className="text-4xl font-light">{currentRoom} Temperature</h2>
        </div>
      </div>
      <div className="relative py-4">
        {/* Circular Temperature Display */}
        <div
          className="temperature-circle mx-auto w-48 h-48 rounded-full flex items-center justify-center relative"
          style={{
            background: `conic-gradient(from 215deg, #8b5cf6 0%, #8b5cf6 ${fillPercentage}%, #e5e7eb ${fillPercentage}%, #e5e7eb 100%)`
          }}
        >
          <div className="absolute w-[80%] h-[80%] bg-white rounded-full flex flex-col items-center justify-center">
            <div className="text-4xl font-bold">{temperature}°C</div>
            <div className="text-gray-500">Celsius</div>
          </div>
        </div>
        {/* Buttons */}
        <button
          className="absolute left-1/4 md:left-0 top-1/2 -translate-y-1/2 text-3xl bg-gray-200 h-[55px] w-[55px] rounded-full p-2 hover:bg-gray-300"
          onClick={handleNegativeClick}
        >
          -
        </button>
        <button
          className="absolute right-1/4 md:right-0 top-1/2 -translate-y-1/2 text-3xl bg-purple-600 h-[55px] w-[55px] text-white rounded-full p-2 hover:bg-purple-700"
          onClick={handlePositiveClick}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Temperature;
