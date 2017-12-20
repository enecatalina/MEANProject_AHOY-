var express = require('express');
var path = require('path');
var bp = require('body-parser');
var app = express();
var session = require('express-session');
var mongoose = require("mongoose");
var server = require('http').createServer(app);
var io = require('socket.io')(server);
// let db;
// let dbconnection = 'mongodb://reptilehaus_u:reptilehaus_p@ds035026.mlab.com:35026/die-reptil';
var port = 8000;



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

// app.get('/', (req, res) => {
//     // res.sendFile(__dirname + '/index.html')
//     res.send('REPTILEHAUS Chat Server')
// })

// server.listen(4000);

// io.on('connection', (socket) => {

//     console.log('user connected');

//     socket.on('disconnect', function () {
//         console.log('user disconnected');
//     });

//     socket.on('add-message', (message) => {
//         io.emit('message', { type: 'new-message', text: message });
//         // Function above that stores the message in the database
//         databaseStore(message)
//     });

// });

// createChat: function databaseStore(message) {
//     let storeData = { 
//         chatMessage: message, 
//         timestamp: new Date().getTime() 
//     }
//     db.collection('chatroom-chats').save(storeData, (err, result) => {
//         if (err) return console.log(err)
//         console.log('saved to database')
//     })

    // var storeData = new Chat();
    // storeData.chatMessage = req.body.message;
    // storeData.chatMessage = new Date().getTime();
    // storeData.save(function (error, person) {
    //     console.log('THIS data IS', users)
    //     if (error) {
    //         console.log('===-- ERRRORRR --====')
    //         console.log(err)
    //         return res.json({ 'error': error });
    //     }
    //     else {
    //         console.log('MAMA, I MADE IT!')
    //         console.log('THIS data IS', person)
    //         return res.json({ 'newNote': person })
    //     }

    // });
