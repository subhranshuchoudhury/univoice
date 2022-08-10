import { io } from 'socket.io-client';

const socketInit = () => {
    const options = {
        'force new connection': true,
        reconnectionAttempts: 'Infinity',
        timeout: 10000,
        transports: ['websocket'],
    };
    return io("https://univoicedb.herokuapp.com", options);
};

export default socketInit;
