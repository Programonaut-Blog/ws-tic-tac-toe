// CommonJS
const io = require("socket.io-client");


const socket = io("ws://localhost:3000")
socket.on("win", (win) => console.log("Winner is: " + win))