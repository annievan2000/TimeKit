const mongoose = require('mongoose')
var Schema = mongoose.Schema;

const FriendSchema = new mongoose.Schema({
    requester: { type: Schema.Types.ObjectId, ref: 'User'},
    recipient: { type: Schema.Types.ObjectId, ref: 'User'},
    messages: {type: String},
    status: {
        type: Number,
        enums: [
            0,      // sent but not friends
            1       // friends
        ]
      }
}, {
    timestamps: true
})

module.exports = module.exports = mongoose.model('Friends', FriendSchema);