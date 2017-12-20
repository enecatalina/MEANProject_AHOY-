var mongoose = require('mongoose');
var User = mongoose.model('User');
module.exports = (function () {


    return {
        index: function (req, res) {
            User.find({}, function (err, User) {
                res.json(User)
            })
        },


        createUser: function (req, res) {
            console.log('HEY, YOURE CREATING....')
            var users = new User();
            users.email = req.body.email;
            users.fullname = req.body.fullname;
            users.displayname = req.body.displayname;
            users.password = req.body.password;
            users.save(function (error, person) {
                console.log('THIS USER IS', users)
                if (error) {
                    console.log('===-- ERRRORRR --====')
                    console.log(err)
                    return res.json({'error': error});
                }
                else {
                    console.log('MAMA, I MADE IT!')
                    console.log('THIS USER IS', person)
                    return res.json({'newNote': person})
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