var UserController = require('../controllers/UserController'); 
var TeamController = require('../controllers/TeamController');
var ChatController = require('../controllers/ChatController');
var ChannelController = require('../controllers/ChannelController');
var mongoose = require('mongoose');
var path = require("path");
var express = require('express');
var router = express.Router();

console.log("MADE IT TO ROUTES.JS");

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

// chat routes // \\ do not touch 

    // app.get('/', (req, res) => {
    //     // res.sendFile(__dirname + '/index.html')
    //     res.send('REPTILEHAUS Chat Server')
    // })

    router.get('/', function (req, res, next) {
        ChatController.getAll(req, res, next);
        res.send('Express REST API');
    });

    router.post('/', function (req, res, next) {
        ChatController.createChat(req, res, next);
        res.send('Express REST API');
    });

    // router.get('/chat/', function (req, res, next) {
    //     ChatController.getAll(req, res, next);
    //     res.send('Express REST API');
    // });

    // router.get('/chat', function (req, res, next) {
    //     ChatController.createChat(req, res, next);
    //     res.send('Express REST API');
    // });

    


    module.exports = router;

// \\ end of chat routes \\//\\// 

    app.all("*", (request, response) => { response.sendFile(path.resolve("./angular-app/dist/index.html")) });


};    

