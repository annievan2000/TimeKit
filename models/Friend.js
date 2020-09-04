const mongoose = require('mongoose')
var Schema = mongoose.Schema;

const FriendSchema = new mongoose.Schema({
    requesterEmail: {
      type: String,
      required: true
    },
    recipientEmail: {
      type: String,
      required: true
    },
    message: {
      type: String,
      default: 'Add Friend Request',
      required: false
    },
    status: {
        type: String,
        enums: [
            "0",      // sent but not friends
            "1",      // friends
            "2"       // decline
        ],
        required: true
      }
}, {
    timestamps: true
})

module.exports = module.exports = mongoose.model('Friends', FriendSchema);
