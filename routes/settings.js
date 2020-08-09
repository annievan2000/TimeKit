const express = require('express')
const router = express.Router()

// Home Route
router.get('/', (req, res) => {
  res.render('settings/index')
})

module.exports = router
