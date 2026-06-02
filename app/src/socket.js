// src/socket.js
import { io } from "socket.io-client";

const socket = io("http://localhost:9000", {
  // auth: {
  //   serverOffset: 0,
  // },
  // ackTimeout: 5000,
  // retries: 3,
  // autoConnect: false, // connect manually after login
});

export default socket;
