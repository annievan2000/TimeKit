const mongoose = require('mongoose')
var Schema = mongoose.Schema;

const TaskSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    description: {
        type: String,
        required: true
    },
    privacy: {
        type: String,
        default: 'public',
        enums: ['public', 'private'],
        required: true
    },
    reminderDate: {
        type: String, // change it later
        required: false
    },
    reminderTime: {
        type: String, // change it later
        required: false
    },
    ifReminder: {
        default: 0,
        enums: [
            0,      // no reminder for task
            1       // yes reminder for task
        ]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Task', TaskSchema);
