var mongoose = require('mongoose');
var error;
var Schema = mongoose.Schema;
var TeamSchema = new mongoose.Schema({
    teamName: {
        type: String,
        minlength: 1,
        trim: true,
        required: true
    },
    _captain: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    channels: [{
        type: Schema.Types.ObjectId,
        ref: 'Channel',
    }]
}, { timestamps: true });


mongoose.model('Team', TeamSchema);
var Team = mongoose.model('Team')