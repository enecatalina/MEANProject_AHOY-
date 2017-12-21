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

// socket.io
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

// app.use('/chat/', chat);
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

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
