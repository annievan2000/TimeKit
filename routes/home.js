const express = require('express')
const router = express.Router()

// Home Route
router.get('/', (req, res) => {
  res.send('Create')
})

module.exports = router
