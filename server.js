var express = require('express');
var path = require('path');
var bp = require('body-parser');
var app = express();
var session = require('express-session');
var router = express.Router();
var app = express();
var mongoose = require("mongoose");
var server = require('http').createServer(app);
var io = require('socket.io')(server);
server.listen(4000);
var port = 8000;


// io.on('connection', function (socket) {
//     socket.on('chat message', function (msg) {
//         io.emit('chat message', msg);
//     });
// });

// io.on('connection', function (socket) {
//     console.log('a user connected');
// });

io.on('connection', function (socket) {
    console.log('User connected with JS');
    socket.on('disconnect', function () {
        console.log('User disconnected');
    });
    socket.on('save-message', function (data) {
        console.log(data);
        io.emit('new-message', { message: data });
    });
});

// io.on('connection', function (socket) {
//     socket.on('chat message', function (msg) {
//         io.emit('chat message', msg);
//     });
// });

app.use(bp.json());
app.use(session({
    secret: 'frenchbulldogs',
    resave: true,
    saveUninitialized: true
}));

app.use(express.static(__dirname + '/angular-app/dist'));


require('./server/config/mongoose');
var routes = require('./server/config/routes');
routes(app);

app.listen(port, function () {
    console.log("Yo, you're listening on " + port);
});
