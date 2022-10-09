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
var messages = [
    { message: 'Hello', id: '123456', user: { id: '555', name: 'Kate' } },
    { message: 'Hi', id: '789101', user: { id: '333', name: 'Alice' } },
    { message: 'Yo', id: '785681', user: { id: '111', name: 'Lana' } }
];
socket.on('connection', function (socketClient) {
    console.log('a user connected');
    socketClient.on('client-message-sent', function (message) {
        if (typeof message !== 'string') {
            return;
        }
        var messageItem = { message: message, id: (0, uuid_1.v1)(), user: { id: '111', name: 'Kit' } };
        messages.push(messageItem);
        socket.emit('new-message-sent', messageItem);
    });
    socketClient.emit('init-messages-published', messages);
});
var PORT = process.env.PORT || 3009;
server.listen(PORT, function () {
    console.log('listening on *:3009');
});
//# sourceMappingURL=app.js.map