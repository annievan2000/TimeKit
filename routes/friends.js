const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')
const User = require('../models/User');
const Friend = require('../models/Friend');
const Task = require('../models/Task');

// @description     Get all friends' info
// @route           GET /friends
router.get('/', ensureAuth, async (req, res) => {
  try {

    const allfriends = await Promise.all(req.user.friends.map(async (userId) => (
      await User.findById(userId, (err, docs) => (docs))
    )));

    res.render('friends/index', {
      image: req.user.image,
      firstName: req.user.firstName,
      friends: allfriends
    })
  } catch (err) {
    console.error(err)
  }
  //res.render('friends/index')
})

// @description     See friend tasks
// @route           GET /view/:friendEmail
router.get('/view/:friendEmail', ensureAuth, async (req, res) => {
  try {
    const allfriends = await Promise.all(req.user.friends.map(async (userId) => (
      await User.findById(userId, (err, docs) => (docs))
    )));
    const friendUser = await User.findOne({email: req.params.friendEmail});
    const friendpublictasks = await Task.find({ user: friendUser._id, privacy: 'public' }).lean()

    res.render('friends/displayfriendtasks', {
      image: req.user.image,
      firstName: req.user.firstName,
      friends: allfriends,
      publictasks: friendpublictasks,
      friendEmail: req.params.friendEmail
    })
    //res.send('Create')
  } catch (err) {
    console.error(err)
  }
})


// @description     Add a new task for friend (public)
// @route           GET /friends/view/:friendEmail/add
router.get('/view/:friendEmail/add', ensureAuth, (req, res) => {
  res.render('friends/friendtask', {
    image: req.user.image,
    firstName: req.user.firstName,
    privacy: 'public',
    friendEmail: req.params.friendEmail
  })
})

// @description
// @route           POST /friends/view/:friendEmail/add
router.post('/view/:friendEmail', ensureAuth, async (req, res) => {
  try {
    const friendUser = await User.findOne({email: req.params.friendEmail});
    req.body.user = friendUser._id
    await Task.create(req.body)
    res.redirect('/friends/view/' + req.params.friendEmail)
  } catch (err) {
    console.error(err)
  }
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
