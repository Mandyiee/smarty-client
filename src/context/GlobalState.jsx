import React, { useReducer, createContext, useEffect, useState } from "react";
import AppReducer from "./AppReducer";

const initialState = {
    socket: null,
    socketId: null,
    isConnecting: false,
    room: {
        temperature: 0,
        humidity: 0,
    },
    outside: {
        temperature: 0,
        weather: "Cloudy",
    },
    currentRoom : "Living Room",
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    const [ws, setWs] = useState(null);

    useEffect(() => {
        let reconnectTimeout = null;
    
        const setupWebSocket = () => {
            const newWs = new WebSocket("wss://smarty-server-h1fo.onrender.com");
    
            newWs.onopen = () => {
                console.log("Connected to WebSocket");
                dispatch({ type: 'ADD_SOCKET', payload: newWs });
            };
    
            newWs.onmessage = async (event) => {
                let data = event.data;
                if (data instanceof Blob) {
                    data = await data.text();
                }
                try {
                    const parsedData = JSON.parse(data);
                    console.log(parsedData)
                    if (parsedData.status === "connected") {
                        dispatch({ type: 'SET_SOCKET_ID', payload: parsedData.senderId });
                        return;
                    }
                    if ("temperature" in parsedData && "humidity" in parsedData) {
                        dispatch({ type: 'CHANGE_ROOM_DETAILS', payload: parsedData });
                    }
                    if ("weather" in parsedData && "temperature" in parsedData) {
                        dispatch({ type: 'CHANGE_OUTSIDE_DETAILS', payload: parsedData });
                    }
                } catch (error) {
                    console.error("WebSocket JSON parsing error:", error);
                }
            };
    
            newWs.onclose = () => {
                console.log("WebSocket disconnected");
                dispatch({ type: 'ADD_SOCKET', payload: null });
                reconnectTimeout = setTimeout(setupWebSocket, 3000);
            };
    
            newWs.onerror = (error) => {
                console.error("WebSocket error:", error);
            };
    
            setWs(newWs); // Store the WebSocket in state
        };
    
        setupWebSocket();
    
        return () => {
            if (reconnectTimeout) clearTimeout(reconnectTimeout);
            if (ws) ws.close();
        };
    }, []);
    
    
    function changeCurrentRoom(room) {
        dispatch({
          type: 'CHANGE_CURRENT_ROOM',
          payload: room
        });  
      }
    return (
        <GlobalContext.Provider value={{ ...state, changeCurrentRoom }}>
            {children}
        </GlobalContext.Provider>
    );
};