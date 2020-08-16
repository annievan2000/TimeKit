const express = require('express');
const router = express.Router();

// Bring in middlware. Syntax .. to go up one level
const {ensureAuth, ensureGuest } = require('../middleware/auth');

// @description     Login/Landing page
// @route           GET /
router.get('/', ensureAuth, (req, res) => {
    res.send('Login')
})

// @description     Home
// @route           GET /home
router.get('/home', ensureGuest, (req, res) => {
    const username = req.user.firstName;
    res.send(`Hello ${username}`);
})

// @description     Add stories
// @route           POST /add
const Task = require('../models/Task');
router.post('/add', ensureAuth, async (req, res) => {
    req.body.user = req.user.id;

    await Task.create(req.body)
      .then(() => res.json('Story added!'))
      .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router; 