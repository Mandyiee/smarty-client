import React from 'react';
import { useContext } from 'react';
import { FiCloud, FiThermometer } from 'react-icons/fi';
import { GlobalContext } from '../context/GlobalState';
import image from "../assets/man.jpg";

const Welcome = () => {
    const outsideDetails = useContext(GlobalContext).outside;

    return (
        <div className="p-6 mb-8">
            {/* Main container with responsive flex */}
            <div className="flex flex-col md:flex-row">
                {/* Text content - full width on mobile, 2/3 on desktop */}
                <div className="w-full md:w-2/3 bg-[#FCDFA3] 
      rounded-t-2xl md:rounded-none md:rounded-l-2xl p-6">
                    <div className="mb-4">
                        <h1 className="text-2xl font-bold mb-2">Hello, Mandy!</h1>
                        <p className="text-gray-600 mb-6">
                            Welcome Home! The air quality is good & fresh, you can go out today.
                        </p>
                    </div>

                    {/* Weather information in a grid */}
                    <div className="grid grid-cols-2 gap-4 justify-items-center ">
                        <div className="flex items-center space-x-2">
                            <FiThermometer className="text-xl text-purple-600" />
                            <div>
                                <p className="text-lg font-semibold">+{outsideDetails.temperature}°C</p>
                                <p className="text-sm text-gray-600">Outdoor temperature</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <FiCloud className="text-xl text-purple-600" />
                            <div>
                                <p className="text-lg font-semibold">{outsideDetails.weather}</p>
                                <p className="text-sm text-gray-600">Weather</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Image container - second row on mobile */}
                <div className="w-full md:w-1/3">
                    <img
                        src={image}
                        alt="Profile"
                        className="w-full h-48 md:h-full object-cover 
        rounded-b-2xl md:rounded-none md:rounded-r-2xl"
                    />
                </div>
            </div>

        </div>
    );
};

export default Welcome;