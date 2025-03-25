import { io } from 'socket.io-client';

const socket = io("https://ceecine.onrender.com/"); // URL backend có socket.io

export default socket;