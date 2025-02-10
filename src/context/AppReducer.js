export default (state, action) => {
    switch (action.type) {
        case 'ADD_SOCKET':
            return { ...state, socket: action.payload };
        case 'SET_SOCKET_ID':
            return { ...state, socketId: action.payload };
        case 'CHANGE_ROOM_DETAILS':
            return { ...state, room: action.payload };
        case 'CHANGE_OUTSIDE_DETAILS':
            return { ...state, outside: action.payload };
        case 'CHANGE_CURRENT_ROOM':
            return { ...state, currentRoom: action.payload };
        default:
            return state;
    }
};