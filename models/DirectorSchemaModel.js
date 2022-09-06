const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DirectorSchema = new Schema({
    name:{
        type:String,
        maxLength:100,
        minLength:5
    }
    ,
    surname:{
        type:String,
        maxLength:100,
        minLength:5
    },
    bio:{
        type:String,
        maxLength:1000,
        minLength:5
    },
    date: {
        type: Date,
        default: Date.now()
    },
    createdAt:{
        type:Date,
        default: Date.now()
    },
    lastUpdate:{
        type:Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('director', DirectorSchema);