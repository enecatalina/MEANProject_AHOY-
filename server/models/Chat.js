var mongoose = require('mongoose');
var error;
var Schema = mongoose.Schema;
var ChatSchema = new mongoose.Schema({
    room: {
        type: String,
        minlength: 1,
        trim: true
    },    
    message: {
        type: String,
        minlength: 1,
        trim: true
    },
    nickname: {
        type: String
    },
    updated_at: 
    { type: Date, default: Date.now },
    // _user: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'User',
    // }],
    // _channel: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Channel',
    // }
}, { timestamps: true });


mongoose.model('Chat', ChatSchema);
var Chat = mongoose.model('Chat')