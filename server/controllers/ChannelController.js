var mongoose = require('mongoose');
var Channel = mongoose.model('Channel');
module.exports = (function () {


    return {
        index: function (req, res) {
            Channel.find({_id: req.params.id})
                .populate('_anchor')
                .populate('users')
                .exec(function(err, channel) {
                    if (err) {
                        console.log('===-- ERRRORRR --====')
                        console.log(err)
                        // return res.json({ 'error': error });
                    }
                    else {
                        console.log("Success!")
                        console.log('THIS CHANNEL IS', channel)
                        return res.json(channel);
                    }
                })
                // res.json({ 'channels': channel })
                
        },


        createChannel: function (req, res) {
            console.log('HEY, YOURE CREATING....')
            var channels = new Channel();
            channels.channelName = req.body.channelName;
            channels.purpose = req.body.purpose;
            // channels._user = req.body._user;
            // channels.invited = req.body.invited;
            channels.save(function (error, channel) {
                console.log('THIS CHANNEL IS', channels)
                if (error) {
                    console.log('===-- ERRRORRR --====')
                    console.log(err)
                    return res.json({ 'error': error });
                }
                else {
                    req.session.currentUser = channel._id
                    console.log('MAMA, I MADE IT!')
                    console.log('THIS CHANNEL IS', channel)
                    return res.json({ 'newChannel': channel })
                }

            });

        },

    };
})();