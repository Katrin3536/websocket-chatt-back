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
app.get('/', function (req, res) {
    res.send('Hello! It is WS server');
});
var messages = [
    { message: 'Hello', id: '123456', user: { id: '555', name: 'Kate' } },
    { message: 'Hi', id: '789101', user: { id: '333', name: 'Alice' } }
];
socket.on('connection', function (socketClient) {
    console.log('a user connected');
    socketClient.on('client-message-sent', function (message) {
        console.log(message);
    });
});
var PORT = process.env.PORT || 3009;
server.listen(PORT, function () {
    console.log('listening on *:3009');
});
//# sourceMappingURL=app.js.map