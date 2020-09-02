const mongoose = require('mongoose')
var Schema = mongoose.Schema;

var FriendRequestSchema = new Schema({
    requester: {
        googleId: {
            type: String
        },
        required: true
    },
    recipient: {
        googleId: {
            type: String
        },
        required: true
    },
    status:{
        type: int, // 0 -> pending, 1-> accpeted, 2 -> rejected
        required: true
    }
}
)

module.exports = mongoose.model('Friend', UserSchema);