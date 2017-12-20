var mongoose = require('mongoose');
var error;
var Schema = mongoose.Schema;
var ChatSchema = new mongoose.Schema({
    message: {
        type: String,
        minlength: 1,
        trim: true
    },
    nickname: {
        type: String
    },
    _user: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    _channel: {
        type: Schema.Types.ObjectId,
        ref: 'Channel',
    }
}, { timestamps: true });


mongoose.model('Chat', ChatSchema);
var Message = mongoose.model('Chat')