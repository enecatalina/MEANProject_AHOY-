var mongoose = require('mongoose');
var User = mongoose.model('User');
// var bcrypt = require('bcrypt-as-promised');
module.exports = (function () {


    return {
        index: function (req, res) {
            User.find({}, function (err, User) {
                res.json(User)
            })
        },


        createUser: function (req, res) {
            console.log('IN: User Controller | createUser()')
            var users = new User();
            users.email = req.body.email;
            users.fullname = req.body.fullname;
            users.displayname = req.body.displayname;
            users.password = req.body.password;
            users.save(function (error, person) {
                console.log('THIS USER IS', users)
                if (error) {
                    console.log('===-- ERRRORRR --====')
                    console.log(error)
                    return res.json({'error': error});
                }
                else {
                    console.log('MAMA, I MADE IT!')
                    console.log('THIS USER IS', person)
                    req.session.currentUser = user._id
                    return res.json({'newNote': person})
                }

            });

        },

        logging: function (req, res) {
            console.log("IN: User controller | logging")
            const email = req.body.email;
            const password = req.body.password;
            console.log(req.body.password);
            User.findOne({ email: req.body.email }, function (err, user) {
                if (user) {
                    console.log(user);
                    //     bcrypt.compare(req.body.password, user.password) //should not be strings!
                    //     .then(function (result) { //must name this something different from the query //will come back true or false
                    //         req.session.currentUser = user._id
                    //         console.log("Successfully logged in!");
                    //     })
                    //     .catch(function (err, _result) {
                    //         console.log("WRONG PASS")
                    //         console.log(err);
                    //     })
                }
                if(req.body.password === user.password){
                    req.session.currentUser = user._id
                    console.log("Successfully logged in!");
                }
                else {
                    console.log(err);
                    return res.json({ err: 'Password or email does not match', loggedIn: false })
                }
            })

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