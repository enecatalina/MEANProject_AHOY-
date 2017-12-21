var UserController = require('../controllers/UserController'); 
var TeamController = require('../controllers/TeamController');
var ChatController = require('../controllers/ChatController');
var ChannelController = require('../controllers/ChannelController');
var mongoose = require('mongoose');
var path = require("path");
var express = require('express');
var router = express.Router();
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var Chat = mongoose.model('Chat');


// module.exports = router;

 

module.exports = function (app) {

// all get routes

    // chat routes // \\ do not touch

    /* GET ALL CHATS */
    app.get('/:room', function (req, res, next) {
        Chat.find({ room: req.params.room }, function (err, chats) {
            if (err) return next(err);
            res.json(chats);
        });
    });

    /* GET SINGLE CHAT BY ID */
    app.get('/:id', function (req, res, next) {
        Chat.findById(req.params.id, function (err, post) {
            if (err) return next(err);
            res.json(post);
        });
    });

    /* SAVE CHAT */
    app.post('/savechat', function (req, res, next) {
        console.log("IN THE SAVE CHAT ROUTE JS!!!!!")
        Chat.create(req.body, function (err, post) {
            if (err) return next(err);
            res.json(post);
        });
    });


    /* UPDATE CHAT */
    app.put('/:id', function (req, res, next) {
        Chat.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
            if (err) return next(err);
            res.json(post);
        });
    });

    /* DELETE CHAT */
    app.delete('/:id', function (req, res, next) {
        Chat.findByIdAndRemove(req.params.id, req.body, function (err, post) {
            if (err) return next(err);
            res.json(post);
        });
    });


    // \\ end of chat routes \\//\\//

    app.get('/API/getUser', function (req, res) {
        UserController.getAll(req, res); })

    app.get('/API/getTeam', function (req, res) {
        TeamController.getAll(req, res);
    })

    app.get('/API/getChannel', function (req, res) {
        ChannelController.find(req, res);
    })
    

// all post routes

    app.post('/API/createUser', function (req, res) {
        UserController.createUser(req, res);
    })

    app.post('/API/createTeam', function (req, res) {
        TeamController.createTeam(req, res);
    })
    // app.post('/API/createChannel', function (req, res) {
    //     ChannelController.createChannel(req, res);
    // })

    app.post('/API/loggingIN', function (req, res) {
        UserController.logging(req, res);
    })

    app.all("*", (request, response) => { response.sendFile(path.resolve("./angular-app/dist/index.html")) });


};    

