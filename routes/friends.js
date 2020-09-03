const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')
const User = require('../models/User');
const Friend = require('../models/Friend');

// @description     Get all friends' info
// @route           GET /friends
router.get('/', ensureAuth, async (req, res) => {
  try {
    const acceptedmessages = await Friend.find(
      { requesterEmail: req.user.email, status: "0" }).lean()
      // should change "0" to be "1" when accept/reject action finished
    await acceptedmessages.forEach(async (message) => {
      const recipient = await User.findOne({email: message.recipientEmail})
      if (recipient) {
        if (! req.user.friends.some(person => person.email === recipient.email)) {
          req.user.friends.push(recipient)
          console.log(recipient.email)
          console.log("====================")
        }
      }
    })

    console.log("********************")
    console.log(req.user.friends)

    res.render('friends/index', {
      image: req.user.image,
      firstName: req.user.firstName,
      friends: req.user.friends
    })
  } catch (err) {
    console.error(err)
  }
  //res.render('friends/index')
})

// @description     Send Friend Request
// @route           GET /friends/add
router.get('/add', ensureAuth, async (req, res) => {
  try {
    const allmessages = await Friend.find({ recipientEmail: req.user.email, status: "0" }).lean()
    res.render('friends/add', {
      image: req.user.image,
      firstName: req.user.firstName,
      myEmail: req.user.email,
      allmessages: allmessages
    })
  } catch (err) {
    console.error(err)
  }
})

// @description     Process add form from for-me and for-friends
// @route           POST /friends/add
router.post('/add', ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id
    await Friend.create(req.body)
    res.redirect('/friends/add')
  } catch (err) {
    console.error(err)
  }
})


router.post('/accept/:requesterEmail', async (req, res) => {
  try {
    const friend = await Friend.findOneAndUpdate({requesterEmail: req.params.requesterEmail, recipientEmail: req.user.email }, req.body, {
      new: true,
      runValidators: true
    });

    const recipientUser = await User.findOne({email: friend.requesterEmail});
    const requesterUser = await User.findOne({email: friend.recipientEmail});

    const updateRecipient = await User.findOneAndUpdate(
      {_id: recipientUser._id},
      { $push : {friends : requesterUser._id}}
   )

    const updateRequester = await User.findOneAndUpdate(
      {_id: requesterUser._id},
      { $push : {friends : recipientUser._id}}
    )

    //res.send('Add Friend!');
    res.redirect('/friends/add')
  }
  catch (err) {
    console.error(err)
  }
})


// @description     Decline friend
// @route           PUT /friends/accept/:recipientEmail
router.post('/decline/:requesterEmail', async (req, res) => {
  try {
    const friend = await Friend.findOneAndUpdate({requesterEmail: req.params.requesterEmail, recipientEmail: req.user.email }, req.body, {
      new: true,
      runValidators: true
    });

    //res.send('Dont want to be friends status updated!');
    res.redirect('/friends/add')
  }
  catch (err) {
    console.error(err)
  }
})
module.exports = router
