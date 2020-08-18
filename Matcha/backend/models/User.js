const mongoose = require('mongoose')
var Schema = mongoose.Schema;
//var Friends = require('./Friend');

const UserSchema = new mongoose.Schema({
    googleId: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'Friends'
    }],
    myTasks: [{
        type: Schema.Types.ObjectId,
        ref: 'Task'
    }],
    /******************* NEED A SECTION OF ALL MY TODOS ***************/
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', UserSchema);