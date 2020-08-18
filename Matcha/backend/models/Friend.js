const mongoose = require('mongoose')
var Schema = mongoose.Schema;

const FriendSchema = new mongoose.Schema({
    requester: { 
        type: String
    },
    recipient: { 
        type: String
    },
    message: {type: String},
    status: {
        type: Number,
        enums: [
            0,      // sent but not friends
            1,      // friends
            2       // decline
        ],
        required: true
      }
}, {
    timestamps: true
})

module.exports = module.exports = mongoose.model('Friends', FriendSchema);