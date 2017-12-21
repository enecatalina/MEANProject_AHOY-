var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var error;
// var bcrypt = require('bcrypt-as-promised');
var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        minlength: 1,
        trim: true,
        required: true,
        unique: true,
        validate: {
            validator: function validateEmail(email) 
            {
                var re = /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                return re.test(email);
            }
        }
    },
    fullname: {
        type: String,
        minlength: 1,
        trim: true,
        required: true
    },
    displayname: {
        type: String,
        minlength: 1,
        trim: true,
        required: true
    },
    password: {
        type: String,
        minlength: 1,
        trim: true,
        required: true
    },
    channels: [{
        type: Schema.Types.ObjectId,
        ref: 'Channel',
    }],
    teams: [{
        type: Schema.Types.ObjectId,
        ref: 'Team',
    }],
    chats: [{
        type: Schema.Types.ObjectId,
        ref: 'Chat',
    }],
}, { timestamps: true });

mongoose.model('User', UserSchema);
var User = mongoose.model('User');