// var express = require('express');
// var router = express.Router();
// var mongoose = require('mongoose');
// var app = express();
// var server = require('http').createServer(app);
// var io = require('socket.io')(server);
// // var Chat = require('../models/Chat.js');
// var Chat = mongoose.model('Chat');

// console.log("IN SOCKET CONTROLLER.JS");
// server.listen(4000);

// // socket io
// io.on('connection', function (socket) {
//     console.log('User connected JS');
//     socket.on('disconnect', function () {
//         console.log('User disconnected JS');
//     });
//     socket.on('save-message', function (data) {
//         console.log(data);
//         io.emit('new-message', { message: data });
//     });
// });


// /* SAVE CHAT */
// router.post('/', function (req, res, next) {
//     Chat.create(req.body, function (err, post) {
//         if (err) return next(err);
//         res.json(post);
//     });
// });

// // /* GET ALL CHATS */
// router.get('/:room', function (req, res, next) {
//     Chat.find({ room: req.params.room }, function (err, chats) {
//         if (err) return next(err);
//         res.json(chats);
//     });
// });


// module.exports = router;

// module.exports = (function () {


//     return {
//         index: function (req, res) {
//             User.find({}, function (err, User) {
//                 res.render('index', {
//                     User: User
//                 });
//             });
//         },


//         createChat: function (req, res) {
//             console.log('HEY, YOURE CREATING....')
//             var chat = new Chat();
//             chat.room = req.params.room;
//             chat.message = req.body.message;
//             chat.nickanme = req.body.nickname;
//             chat.save(function (error, person) {
//                 console.log('THIS USER IS', users)
//                 if (error) {
//                     console.log('===-- ERRRORRR --====')
//                     console.log(err)
//                     return res.json({ 'error': error });
//                 }
//                 else {
//                     console.log('MAMA, I MADE IT!')
//                     console.log('THIS USER IS', person)
//                     return res.json({ 'newNote': person })
//                 }

//             });

//         },

//         getAll: function (req, res) {
//             console.log('SOMETHING IS HERE')
//             Chat.find({ room: req.params.room }, function (error, response) {
//                 console.log('ERRORS,', error);
//                 if (error || response == null) {
//                     console.log('ERRRORRRR')
//                     return res.json({ 'error': error, 'response': response })
//                 } else {
//                     console.log('YASS')
//                     // return res.json({ 'response': response })
//                     return res.json(response);
//                 }
//             })
//         }

//     };
// })();