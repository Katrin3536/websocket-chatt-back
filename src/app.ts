const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require('socket.io');
const socket = new Server(server, {
    cors: {
        origin: '*',
    }
});

app.get('/', (req, res) => {
    res.send('Hello! It is WS server');
});

const messages = [
    {message: 'Hello', id: '123456', user: {id: '555', name: 'Kate'}},
    {message: 'Hi', id: '789101', user: {id: '333', name: 'Alice'}}
];

socket.on('connection', (socketClient) => {
    console.log('a user connected');
    socketClient.on('client-message-sent', (message: string) => {
        console.log(message);
    });

});

const PORT = process.env.PORT || 3009;

server.listen(PORT, () => {
    console.log('listening on *:3009');
});