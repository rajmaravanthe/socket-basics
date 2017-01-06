var PORT = process.env.PORT || 3000;
var moment = require('moment');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

io.on('connect', function (socket) {
    console.log('User connected via socket.io');

    socket.on('message', function (message) {
        console.log('Message ' + message.text );
        message.timestamp = moment().valueOf();
        io.emit('message', message);
    });

    socket.emit('message', {
        text: 'Welcome to the chat application',
        timestamp: moment.valueOf()
    });
});

http.listen(PORT, function () {
    console.log('Server started!');
})