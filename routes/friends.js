const express = require('express')
const router = express.Router()
const Friend = require('../models/friend')

// All Friends Route
router.get('/', async (req, res) => {
  try {
    const friends = await Friend.find({})
    res.render('friends/index', { friends: friends })
  } catch {
    res.redirect('/')
  }
})

// Add New Friend Route
router.get('/add', (req, res) => {
  res.render('friends/add', { friend: new Friend() })
})

// Create Friend Router
router.post('/', async (req, res) => {
  const friend = new Friend({
    email: req.body.email
  })
  try {
    const newFriend = await friend.save()
    res.redirect(`friends`)
  } catch {
    res.render('friends/add', {
      friend: friend,
      errorMessage: 'Error Adding New Friend'
    })
  }
})

// Check messages Router
// --- CODE WRITE HERE ---

module.exports = router
