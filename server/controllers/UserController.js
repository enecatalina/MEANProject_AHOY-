
var mongoose = require('mongoose');
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

                }
                // User.insert(users, {w:1}, function(err){
                //     return res.json()})
                // users.save(function (error, person) {
                // console.log('THIS USER IS', users)
                // if (error) {
                //     console.log('===-- ERRRORRR --====')
                //     console.log(error)
                //     // return res.json({'error': error});
                // }
                // else {
                //     console.log('MAMA, I MADE IT!')
                //     console.log('THIS USER IS', person)
                //     req.session.currentUser = user._id
                //     return res.json({'newPerson': person})
                // }
            })
        })
    })
 },
            // var users = new User();
            // users.email = req.body.email;
            // users.fullname = req.body.fullname;
            // users.displayname = req.body.displayname;
            // users.password = req.body.password;
            // users.save(function (error, person) {
            //     console.log('THIS USER IS', users)
            //     if (error) {
            //         console.log('===-- ERRRORRR --====')
            //         console.log(error)
            //         // return res.json({'error': error});
            //     }
            //     else {
            //         console.log('MAMA, I MADE IT!')
            //         console.log('THIS USER IS', person)
            //         req.session.currentUser = user._id
            //         return res.json({'newPerson': person})
            //     }

        logging: function (req, res) {
            console.log("IN: User controller | logging")
            const email = req.body.email;
            const password = req.body.password;
            console.log(req.body.password);
            User.findOne({email : req.body.email}, function(error, user){
                bcrypt.compare(req.body.password, user.password, function( error, result){
                    if(error){
                        console.log("logging in error")
                        return res.json({ 'error': error });
                    }
                    else{
                        req.session.currentUser = user._id
                        console.log("Successfully logged in!");
                        return res.json({loggedIn : user})
                    }
                })
            })

            // User.findOne({ email: req.body.email }, function (err, user) {
            //         console.log("finding the user--->", user)
            //     if(errors){
            //         console.log('===-- ERRRORRR --====')
            //         console.log(errors) 
            //     }
            //     else{
            //         // req.body.password === user.password
            //         req.session.currentUser = user._id
            //         console.log("Successfully logged in!");
            //     }
            // })

        },

        // getAll: function (req, res) {
        //     console.log('SOMETHING IS HERE')
        //     User.find({}, function (error, response) {
        //         console.log('ERRORS,', error);
        //         if (error || response == null) {
        //             console.log('ERRRORRRR')
        //             return res.json({ 'error': error, 'response': response })
        //         } else {
        //             console.log('YASS')
        //             // return res.json({ 'response': response })
        //             return res.json(response);
        //         }
        //     })
        // }

    };
})();