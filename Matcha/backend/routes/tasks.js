const express = require('express');
const router = express.Router();

// Bring in middlware. Syntax .. to go up one level
const {ensureAuth} = require('../middleware/auth');

const Task = require('../models/Task');
const User = require('../models/User');

// @description     Add stories
// @route           POST /tasks/add
router.post('/add', async (req, res) => {
    try {
        // req.body is going to give us data sent from form
        // this line doesnt work w Insomniac/Postman testing
        // because user isnt logged in. Not able to get user's ID
        // req.body.user = req.user.id; 
       const task = await Task.create(req.body);

       // Only add public todo items into this todosarray. Makes life easier when you display friends todo items
       const updateUserTodos = await User.findByIdAndUpdate(
            {_id: task.user, status: "public"},
            { $push: { "myTasks" : task._id }}
        )

        res.json('Story added!');
    }catch (err){
        res.status(400).json('Error: ' + err)
    }
})

// @description     Delete the task
// @route           /tasks/delete/:id
router.delete('/delete/:id', async (req, res) => {
    try {
        /*let story = await Task.findById(req.params.id);

        if (!story) {
            res.redirect('/');
        } */

        // Cant validate this in postman/ insomniac b/c we dont
        // Have a req.user.id (testing purposes)
        //if (story.user != req.user.id){
        //    res.redirect('/');
        //}
        //else {

        await Task.remove({_id: req.params.id });
        res.json('Story deleted!');

        //}

    } catch (err){
        res.status(400).json('Error: ' + err)
    }
})

// @description     Edit the task
// @route           /tasks/edit/:id
router.put('/edit/:id', async (req, res) => {
    try {
        let story = await Task.findById(req.params.id);

        /*if (!story) {
            res.redirect('/');
        } */

        // Cant validate this in postman/ insomniac b/c we dont
        // Have a req.user.id (testing purposes)
        //if (story.user != req.user.id){
        //    res.redirect('/');
        //}
        //else {

        story = await Task.findOneAndUpdate({_id: req.params.id }, req.body, {
            new: true,
            runValidators: true
        });
        res.json('Story updated!');

        //}

    } catch (err){
        res.status(400).json('Error: ' + err)
    }
})

// @description     Get all your private stories
// @route           /tasks/private
router.get('/private', async (req, res) => {
    try {
        const stories = await Task.find({privacy: 'private'})
        .sort({ createdAt: 'desc' })

        res.json({stories});
        res.send({stories});

    } catch (err){
        res.status(400).json('Error: ' + err)
    }
})

// @description     Get all your public stories
// @route           /tasks/public
router.get('/public', async (req, res) => {
    try {
        const stories = await Task.find({privacy: 'public'})
        .sort({ createdAt: 'desc' })

        res.json({stories});
        res.send(stories);

    } catch (err){
        res.status(400).json('Error: ' + err)
    }
})

module.exports = router; 