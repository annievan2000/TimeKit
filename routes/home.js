const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')
const Task = require('../models/Task');

// @description     Get all private and public tasks
// @route           GET /home
router.get('/', ensureAuth, async (req, res) => {
  try {
    const privatetasks = await Task.find({ user: req.user.id, privacy: 'private' }).lean()
    const publictasks = await Task.find({ user: req.user.id, privacy: 'public' }).lean()
    res.render('home/index', {
      image: req.user.image,
      firstName: req.user.firstName,
      privatetasks: privatetasks,
      publictasks: publictasks
    })
  } catch (err) {
    console.error(err)
  }
})


// @description     Add a new task for me (private)
// @route           GET /home/forme
router.get('/forme', ensureAuth, (req, res) => {
  res.render('home/forme', {
    image: req.user.image,
    firstName: req.user.firstName,
    privacy: 'private'
  })
})


// @description     Add a new task for friends (public)
// @route           GET /home/forfriends
router.get('/forfriends', ensureAuth, (req, res) => {
  res.render('home/forfriends', {
    image: req.user.image,
    firstName: req.user.firstName,
    privacy: 'public'
  })
})


// @description     Process add form from for-me and for-friends
// @route           POST /home
router.post('/', ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id
    await Task.create(req.body)
    res.redirect('/home')
  } catch (err) {
    console.error(err)
  }
})


module.exports = router
