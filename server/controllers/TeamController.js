var mongoose = require('mongoose');
var Team = mongoose.model('Team');
var Channel = mongoose.model('Channel');
module.exports = (function () {


    return {
        index: function (req, res) {
            Team.find({}, function (err, Team) {
                res.render('index', {
                    team: Team
                });
            });
        },
  

        createTeam: function (req, res) {
            console.log('HEY, YOURE CREATING....A TEAM')
            var teams = new Team();
            teams.teamName = req.body.teamName;
            teams._captain = req.body._captain;
            // teams.channels = "general";
            // teams.channels = "random";
            console.log(req.body)
            teams.save(function (error, team) {
                console.log('THIS TEAM IS', teams)
                if (error) {
                    console.log('===-- ERRRORRR --====')
                    console.log(error)
                    return res.json({ 'error': error });
                }
                else {
                    console.log('MAMA, I MADE IT!')
                    console.log('THIS TEAM IS', team)
                    return res.json({ 'newTeam': team })
                }
            });
    },

        getAll: function (req, res) {
            console.log('SOMETHING IS HERE')
            Team.find({}, function (error, response) {
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