const express = require('express')
const router = express.Router()

// All Friends Route
router.get('/', async (req, res) => {
  try{
    const currentRequests = await Friend.find({ recipient: req.user.id}).lean()
    res.render('friend/index', {
      requester: currentRequests.requester,
    })
  }
  catch (err) {
    console.error(err)
  }
})

// Add New Friend Route


router.post('/', ensureAuth, async (req, res) => {
  try {
    req.body.requester = req.user.id
    req.body.recipient = req.user.id // still trying to get the id of the recipient
    await Friend.create(req.body)
    res.redirect('/home')
  } catch (err) {
    console.error(err)
  }
})








module.exports = router
