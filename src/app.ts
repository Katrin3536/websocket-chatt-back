const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const socket = new Server(server);

app.get('/', (req, res) => {
    res.send("Hello! It is WS server");
});

socket.on('connection', (connection) => {
    console.log('a user connected');
});

const PORT = process.env.PORT || 3009

server.listen(PORT, () => {
    console.log('listening on *:3009');
});