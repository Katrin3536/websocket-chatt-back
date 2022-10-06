var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var Server = require("socket.io").Server;
var socket = new Server(server);
app.get('/', function (req, res) {
    res.send("Hello! It is WS server");
});
socket.on('connection', function (connection) {
    console.log('a user connected');
});
var PORT = process.env.PORT || 3009;
server.listen(PORT, function () {
    console.log('listening on *:3009');
});
//# sourceMappingURL=app.js.map