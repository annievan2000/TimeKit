const mongoose = require('mongoose')

const friendSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Friend', friendSchema)
