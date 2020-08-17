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

module.exports = router; 