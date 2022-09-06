const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
        username: {
            type: String,
            maxLength: 50,
            minLength: 5,
            require:true,
            unique:true
        },
        password: {
            type: String,
            maxLength: 1000,
            minLength: 5
        },
        createdAt: {
            type: Date,
            default: Date.now()
        },


    });

module.exports = mongoose.model('user', UserSchema);