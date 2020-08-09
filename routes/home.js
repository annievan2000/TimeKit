const express = require('express')
const router = express.Router()

// Home Route
router.get('/', (req, res) => {
  res.render('home/index')
})

// For Me Route
router.get('/forme', (req, res) => {
  res.render('home/forme')
})

// For Friends Router
router.get('/forfriends', (req, res) => {
  res.render('home/forfriends')
})
module.exports = router
