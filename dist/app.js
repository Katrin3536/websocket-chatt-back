var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var Server = require("socket.io").Server;
var io = new Server(server);
app.get('/', function (req, res) {
    res.send("Hello! It is WS server");
});
io.on('connection', function (socket) {
    console.log('a user connected');
});
server.listen(3009, function () {
    console.log('listening on *:3009');
});
//# sourceMappingURL=app.js.map