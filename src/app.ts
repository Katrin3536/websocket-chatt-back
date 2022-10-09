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
import {v1} from 'uuid';

app.get('/', (req, res) => {
    res.send('Hello! It is WS server');
});

const messages = [
    {message: 'Hello', id: '123456', user: {id: '555', name: 'Kate'}},
    {message: 'Hi', id: '789101', user: {id: '333', name: 'Alice'}},
    {message: 'Yo', id: '785681', user: {id: '111', name: 'Lana'}}

];

socket.on('connection', (socketClient) => {
    console.log('a user connected');
    socketClient.on('client-message-sent', (message: string) => {
        if (typeof message !== 'string') {
            return;
        }
        let messageItem = {message: message, id: v1(), user: {id: '111', name: 'Kit'}};
        messages.push(messageItem);
        socket.emit('new-message-sent', messageItem);
    });

    socketClient.emit('init-messages-published', messages);

});

const PORT = process.env.PORT || 3009;

server.listen(PORT, () => {
    console.log('listening on *:3009');
});