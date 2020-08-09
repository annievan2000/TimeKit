const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  property: {
    type: String, // for me OR for friends
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: Date,
    required: true
  },
  privacy: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Task', taskSchema)
