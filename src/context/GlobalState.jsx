import React, { useReducer, createContext, useEffect } from "react";
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
        weather: "Sunny",
    },
    currentRoom : "Living Room",
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    useEffect(() => {
        let ws = null;
        let reconnectTimeout = null;

        const setupWebSocket = () => {
            ws = new WebSocket("wss://smarty-server-h1fo.onrender.com");

            ws.onopen = () => {
                console.log("Connected to WebSocket");
                dispatch({ type: 'ADD_SOCKET', payload: ws });
            };

            ws.onmessage = async (event) => {
                let data = event.data;
                if (data instanceof Blob) {
                    data = await data.text();
                }
                try {
                    const parsedData = JSON.parse(data);
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

            ws.onclose = () => {
                console.log("WebSocket disconnected");
                dispatch({ type: 'ADD_SOCKET', payload: null });
                reconnectTimeout = setTimeout(setupWebSocket, 3000);
            };

            ws.onerror = (error) => {
                console.error("WebSocket error:", error);
            };
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