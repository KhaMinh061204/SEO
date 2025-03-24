import { io } from 'socket.io-client';

const socket = io("http://localhost:8081"); // URL backend có socket.io

export default socket;