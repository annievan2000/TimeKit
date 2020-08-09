const express = require('express')
const router = express.Router()

// Friends Route
router.get('/', (req, res) => {
  res.render('friends/index')
})

// Add New Friend Route
router.get('/add', (req, res) => {
  res.render('friends/add')
})

// Check messages Router
// --- CODE WRITE HERE ---

module.exports = router
