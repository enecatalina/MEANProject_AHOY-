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


// chat routes // \\ do not touch

/* GET ALL CHATS */
router.get('/:room', function (req, res, next) {
    Chat.find({ room: req.params.room }, function (err, chats) {
        if (err) return next(err);
        res.json(chats);
    });
});

/* GET SINGLE CHAT BY ID */
router.get('/:id', function (req, res, next) {
    Chat.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* SAVE CHAT */
router.post('/', function (req, res, next) {
    Chat.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* UPDATE CHAT */
router.put('/:id', function (req, res, next) {
    Chat.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE CHAT */
router.delete('/:id', function (req, res, next) {
    Chat.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;

// \\ end of chat routes \\//\\// 

module.exports = function (app) {

// all get routes

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
    app.post('/API/createChannel', function (req, res) {
        ChannelController.createChannel(req, res);
    })
 
    app.all("*", (request, response) => { response.sendFile(path.resolve("./angular-app/dist/index.html")) });


};    

