var express = require('express');
var socket = require('socket.io');
var port = process.env.PORT || 4000

var app = express();
var server = app.listen(port, function(){
    console.log('escuchando las peticiones');
});

app.use(express.static('public'));

var io = socket(server);

io.on('connection', function(socket){
    console.log('conexión socket', socket.id);

    socket.on('chat', function(data){
        io.sockets.emit('chat', data);
    });

    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });

});