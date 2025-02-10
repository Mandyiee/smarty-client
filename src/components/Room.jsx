import React, {useState, useEffect, useContext} from 'react'
import { FiThermometer } from 'react-icons/fi';
import { GlobalContext,  } from '../context/GlobalState';
import RoomControl from './RoomControl.jsx'
import { CiDroplet } from "react-icons/ci";
import useWebSocket from '../custom/socket.jsx';


const Room = () => {
  const {sendMessage} = useWebSocket()
  const [selectedRoom, setSelectedRoom] = useState('Living Room');
  const roomDetails = useContext(GlobalContext).room;
  const { changeCurrentRoom } = useContext(GlobalContext);

  const handleRoomChange = (event) => {
    const newRoom = event.target.value;
    setSelectedRoom(newRoom);
    changeCurrentRoom(newRoom);
    sendMessage("", true, newRoom);
  };

  return (
    <div>
      <div className="flex md:flex-row space-y-3 flex-col justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
        <span className="text-gray-500">Mandy's Home</span>
        <span className="flex items-center text-gray-500">
          <CiDroplet />
          {roomDetails.humidity}
        </span>
        <span className="flex items-center text-gray-500">
          <FiThermometer className="mr-1" />
          {roomDetails.temperature}°C
        </span>
        </div>
        <div className="">
        <select
          className="ml-auto bg-transparent px-8 py-1 border-[#00000032] border-[1px] rounded-md text-center"
          value={selectedRoom}
          onChange={handleRoomChange}
        >
          <option>Living Room</option>
          <option>Kitchen</option>
          <option>Bedroom</option>
          <option>Bathroom</option>
        </select>
        </div>
      </div>
      <RoomControl currentRoom={selectedRoom} />  {/* Pass selectedRoom as prop */}
    </div>
  )
}

export default Room