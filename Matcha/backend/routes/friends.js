const express = require('express');
const router = express.Router();

// Bring in middlware. Syntax .. to go up one level
const {ensureAuth} = require('../middleware/auth');

const Friend = require('../models/Friend');
const User = require('../models/User');
const { db } = require('../models/User');

// @description     Send friend requests
// @route           POST /friends/add
router.post('/add', async (req, res) => {
    try {
        // req.body is going to give us data sent from form
        // this line doesnt work w Insomniac/Postman testing
        // because user isnt logged in. Not able to get user's ID

        // req.body.requester = req.user.email;
        req.body.status = 0;
        await Friend.create(req.body);
        res.json('Friend request sennt!');
    }catch (err){
        res.status(400).json('Error: ' + err)
    }
})

// @description     Get all your incoming requests
// @route           /friends/requests
router.get('/requests', async (req, res) => {
    try {
        //const stories = await Task.find({recipiants: req.user.email})
        const friends = await Friend.find({recipient: "annievan2000@gmail.com", status: 0})
        .sort({ createdAt: 'desc' })

        res.json({friends});
        res.send({friends});

    } catch (err){
        res.status(400).json('Error: ' + err)
    }
})

// ACCEPTING FRIEND REQUESTS:
// In the html/css, each row is going to be a form with properties requester & receipient
// When they press yes, send status variable as 1 in the body.
// Requester and recipient needs to be sent in the URL put request.
// In the html/css, update that row with a message "Friend request accepted"

// DECLINING FRIEND REQUESTS:
// If you decline, just send status variable as 2 in the body. We will disregard friendship
// requests between these two people from now on because their status is 2.

// @description     Accepting your friend requests
// @route           /friends/action/:requester/:recipient
router.put('/action/:requester/:recipient', async (req, res) => {
    try {
        const friend = await Friend.findOneAndUpdate({requester: req.params.requester, recipient: req.params.recipient }, req.body, {
            new: true,
            runValidators: true
        });

        const recipientUser = await User.findOne({email: friend.requester});
        const requesterUser = await User.findOne({email: friend.recipient});

        const updateRecipient = await User.findOneAndUpdate(
            {_id: recipientUser._id},
            { $push : {friends : requesterUser._id}}
        )

        const updateRequester = await User.findOneAndUpdate(
            {_id: requesterUser._id},
            { $push : {friends : recipientUser._id}}
        )
        
        res.json(recipientUser._id + " and " + requesterUser._id);

        res.json('Friends status updated!');

    } catch (err){
        res.status(400).json('Error: ' + err)
    }
}) 

// @description     Get my friends
// @route           /friends
/**************************** WANT MY FRIENDS PROFILES, AND PUBLIC TASKS ****************************************/
router.get('/', async (req, res) => {
    try {
        const myProfile = await User.findById("5f3b4eb4ab82b451d263b009");
        
        const arrOfFriendsIds = myProfile.friends;
        
        const friends = [];

        for (var i = 0; i < arrOfFriendsIds.length; i++) {
            const eachFriend = await User.findById(arrOfFriendsIds[i]);
            friends.push(eachFriend);
        }

        //  Now I have all my friends inside of the friends array.
        //  Just send this array to the front end to parse the necessary properties (name, icon, publictodoitems)
        res.json(friends);
        //res.send("hi");

    } catch (err){
        res.status(400).json('Error: ' + err);
    }
})

module.exports = router; 