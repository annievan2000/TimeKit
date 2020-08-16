const mongoose = require('mongoose')
var Schema = mongoose.Schema;

const TaskSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'}, 
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
        type: Date,
        required: false
    },
    reminderTime: {
        type: Number,
        required: false
    },
    amOrPm: {
        type: String,
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

/*const TaskSchema = new Schema({
    description: {
      type: String,
      required: true
    },
  }, {
    timestamps: true,
  }); */

module.exports = mongoose.model('Task', TaskSchema); 