const express = require('express')
const router = express.Router()

// All Friends Route
router.get('/', (req, res) => {
  res.render('friends/index')
})

// Add New Friend Route
router.get('/add', (req, res) => {
  res.render('friends/add')
})

module.exports = router
