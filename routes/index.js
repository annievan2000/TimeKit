const express = require('express')
const router = express.Router()
const { ensureGuest } = require('../middleware/auth')

// @description     Login/Landing page
// @route           GET /
router.get('/', ensureGuest, (req, res) => {
  //res.render('index')
  res.render('login', {
    layout: 'login',
  })
})

module.exports = router
