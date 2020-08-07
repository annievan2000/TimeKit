const mongoose = require('mongoose'); 

const user = new mongoose.Schema({
    id:{
        type: String,
        required: true
    },
    firstName:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    }, 
    profileImage:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    friends:{
        type: Object,
        required: true
    },
    list:{
        type: Object,
        required: true
    }
});

module.exports = User = mongoose.model('user', user); 
