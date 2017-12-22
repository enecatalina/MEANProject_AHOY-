
var mongoose = require('mongoose');
var path = require('path');
const fs = require('fs');
var User = mongoose.model('User');
var bcrypt = require('bcryptjs');


module.exports = (function () {
    return {
        index: function (req, res) {
            User.find({}, function (err, User) {
                res.json(User)
            })
        },


        createUser: function (req, res) {
            console.log('IN: User Controller | createUser()')
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(req.body.password, salt, function (err, hash) {
                    console.log(hash);
                    var users = new User() 
                        users.email = req.body.email;
                        users.fullname = req.body.fullname;
                        users.displayname = req.body.displayname;
                        users.password = hash;
                    users.save(function (error, person) {
                console.log('THIS USER IS', users)
                if (error) {
                    console.log('===-- ERRRORRR --====')
                    console.log(error)
                    return res.json({ 'error': error });
                }
                else {
                    console.log('MAMA, I MADE IT!')
                    console.log('THIS USER IS', person)
                    req.session.currentUser = users._id
                    console.log(req.session.currentUser)
                    return res.json({'newPerson': person})
                }
            })
        })
    })
 },

        logging :function(req, res) {
            console.log('===INSIDE USER LOGIN CONTROLLER===')
            console.log('req.body:', req.body)
            User.findOne({ email: req.body.email }, function (errors, resultResponse) {
                console.log('response:', resultResponse)
                if (errors || resultResponse == null) {
                    console.log('===ERROR FINDING USER===')
                    return res.json({ Error: 'Password or email does not match' })
                } else {
                    console.log('===COMPARING PASSWORD===')
                    console.log('req.body.password:', req.body.password)
                    if (bcrypt.compareSync(req.body.password, resultResponse.password)) {
                        console.log(resultResponse.password)
                        let response = {
                            _id: resultResponse._id,
                            email: resultResponse.email,
                            fullname: resultResponse.fullname,
                            displayname: resultResponse.displayname,
                            loggedIn: true
                        }
                        req.session.currentUser = resultResponse._id
                        console.log("SESSION ID: ", req.session.currentUser)
                        return res.json( response )
                    } else {
                        console.log('===FAILED COMPARING PASSWORDS===')
                        return res.json({ Error: 'Password or email does not match', loggedIn: false })
                    }
                }
            });
        },

        getAll: function (req, res) {
            console.log('SOMETHING IS HERE')
            User.find({}, function (error, response) {
                console.log('ERRORS,', error);
                if (error || response == null) {
                    console.log('ERRRORRRR')
                    return res.json({ 'error': error, 'response': response })
                } else {
                    console.log('YASS')
                    // return res.json({ 'response': response })
                    return res.json(response);
                }
            })
        }

    };
})();