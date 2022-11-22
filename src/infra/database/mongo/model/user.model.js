const mongoose = require('mongoose');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            trim: true,
            required: true,
            max: 32,
            unique: true,
            index: true,
            lowercase: true
        },
        name: {
            type: String,
            trim: true,
            required: true,
            max: 32
        },
        email: {
            type: String,
            trim: true,
            required: true,
            max: 32,
            unique: true,
            lowercase: true
        },
        profile: {
            type: String,
            required: true
        },
        hashed_password: {
            type: String,
            required: true
        },
        salt: String,
        about: {
            type: String
        },
        role: {
            type: Number,
            default: 0
        },
        photo: {
            data: Buffer,
            contentType: String
        },
        resetPasswordLink: {
            data: String,
            default: ''
        }
    },
    { timestamps: true }
);

UserSchema.index({ role: 1 });

UserSchema.virtual('password')
    .set(function(password) {
        // generate salt
        this.salt = this.makeSalt();

        // encrypt password
        this.hashed_password = password;
    })
    .get(function() {
        return this.hashed_password;
    });

UserSchema.methods = {
    // when we get the plain password form the client,encrypt the plain password
    // and compare it with the hashed version of it from database
    // if passwords match, authenticate the user
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },
    makeSalt: function() {
        return Math.round(new Date().valueOf() * Math.random()) + '';
    }
};

module.exports = mongoose.model('User', UserSchema);
