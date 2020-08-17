const express = require('express');
const router = express.Router();

// Bring in middlware. Syntax .. to go up one level
const {ensureAuth} = require('../middleware/auth');

const User = require('../models/User');

/************************** Remove hardcoded user id with req.user.id ******************************/

// @description     Edit the user's info
// @route           /user/edit
router.put('/edit', async (req, res) => {
    try {
        let user = await User.findOneAndUpdate({_id: "5f3892371e19ab1578a352ef" }, req.body, {
            new: true,
            runValidators: true
        });
        res.json('User info updated!');

    } catch (err){
        res.status(400).json('Error: ' + err)
    }
})

// @description     Get the user's info
// @route           /user
router.get('/', async (req, res) => {
    try {
        const user = await User.find({_id: "5f3892371e19ab1578a352ef"})

        res.json(user);
        res.send(user);

    } catch (err){
        res.status(400).json('Error: ' + err)
    }
})

module.exports = router; 