var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var error;
var bcrypt = require('bcrypt');
var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        minlength: 1,
        trim: true,
        required: true,
        validate: {
            validator: function validateEmail(email) 
            {
                var re = /^(([^<>()[]\.,;:\s@"]+(.[^<>()[]\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
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

UserSchema.pre('save', function (done) {
    console.log("HASHING NOW.. HASHING NOW..");
    var hashed_password = bcrypt.hashSync(this.password, 10);
    this.password = hashed_password;
    done();
});


mongoose.model('User', UserSchema);
var User = mongoose.model('User')