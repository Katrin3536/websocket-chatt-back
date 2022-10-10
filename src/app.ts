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

const users = new Map();

const messages = [
    {message: 'Hello', id: '123456', user: {id: '555', name: 'Kate'}},
    {message: 'Hi', id: '789101', user: {id: '333', name: 'Alice'}},
    {message: 'Yo', id: '785681', user: {id: '111', name: 'Lana'}}

];

socket.on('connection', (socketChannel) => {
    users.set(socketChannel, {id: v1(), name: 'anonym'});

    socket.on('disconnect', ()=>{
        users.delete(socketChannel)
    } )
    socketChannel.on('client-name-sent', (name: string) => {
        const user = users.get(socketChannel);
        user.name = name;
    });

    socketChannel.on('client-typing', (name: string) => {
        socketChannel.emit('user-typing', users.get(socketChannel));
    });

    socketChannel.on('client-message-sent', (message: string) => {
        if (typeof message !== 'string') {
            return;
        }
        const user = users.get(socketChannel);

        let messageItem = {message: message, id: v1(), user: {id: user.id, name: user.name}};
        messages.push(messageItem);
        socket.emit('new-message-sent', messageItem);
    });

    socketChannel.emit('init-messages-published', messages);

});

const PORT = process.env.PORT || 3009;

server.listen(PORT, () => {
    console.log('listening on *:3009');
});