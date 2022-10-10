"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var Server = require('socket.io').Server;
var socket = new Server(server, {
    cors: {
        origin: '*',
    }
});
var uuid_1 = require("uuid");
app.get('/', function (req, res) {
    res.send('Hello! It is WS server');
});
var users = new Map();
var messages = [
    { message: 'Hello', id: '123456', user: { id: '555', name: 'Kate' } },
    { message: 'Hi', id: '789101', user: { id: '333', name: 'Alice' } },
    { message: 'Yo', id: '785681', user: { id: '111', name: 'Lana' } }
];
socket.on('connection', function (socketChannel) {
    users.set(socketChannel, { id: (0, uuid_1.v1)(), name: 'anonym' });
    socket.on('disconnect', function () {
        users.delete(socketChannel);
    });
    socketChannel.on('client-name-sent', function (name) {
        var user = users.get(socketChannel);
        user.name = name;
    });
    socketChannel.on('client-message-sent', function (message) {
        if (typeof message !== 'string') {
            return;
        }
        var user = users.get(socketChannel);
        var messageItem = { message: message, id: (0, uuid_1.v1)(), user: { id: user.id, name: user.name } };
        messages.push(messageItem);
        socket.emit('new-message-sent', messageItem);
    });
    socketChannel.emit('init-messages-published', messages);
});
var PORT = process.env.PORT || 3009;
server.listen(PORT, function () {
    console.log('listening on *:3009');
});
//# sourceMappingURL=app.js.map