const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')

// @description     Settings Page
// @route           GET /settings
router.get('/', ensureAuth, async (req, res) => {
  try {
    res.render('settings/index', {
      image: req.user.image,
      firstName: req.user.firstName
    })
  } catch (err) {
    console.error(err)
  }
  //res.render('settings/index')
})

module.exports = router
