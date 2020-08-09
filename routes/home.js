const express = require('express')
const router = express.Router()
const Task = require('../models/task')

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

// Add New Task (either For Me or For Friends) router
router.post('/', (req, res) => {
  res.send('Create')
})
module.exports = router
