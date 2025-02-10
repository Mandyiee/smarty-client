import { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

const useWebSocket = () => {
    const { socket, socketId } = useContext(GlobalContext);

    const sendMessage = (message, recv = false, room = "") => {
        if (!socket || socket.readyState !== WebSocket.OPEN) {
            console.error("No WebSocket connection available");
            return;
        }

        try {
            const messagePayload = recv
                ? JSON.stringify({ request: room })
                : JSON.stringify({ ...JSON.parse(message), senderId: socketId });
            socket.send(messagePayload);
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return { sendMessage };
};
export default useWebSocket;