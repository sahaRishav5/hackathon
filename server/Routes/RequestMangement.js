const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/RegistrationSchema');
const Post = require('../models/Post');  // Adjust the path as necessary
const router = express.Router();

// Middleware to ensure the user is authenticated (you can implement it based on your auth system)
const ensureAuthenticated = (req, res, next) => {
  // Example: Ensure the user is authenticated, then call next()
  // If not authenticated, return res.status(401).json({ message: 'Unauthorized' });
  next();
};

// Update profile API
router.post('/update-profile', ensureAuthenticated, async (req, res) => {
  const { username, uid } = req.body;

  try {
    // Find the user by their username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the uid exists in the devloperconnectionRequestList array
    const requestIndex = user.devloperconnectionRequestList.indexOf(uid);

    if (requestIndex === -1) {
      return res.status(404).json({ message: 'UID not found in developer connection request list' });
    }

    // Remove the uid from the devloperconnectionRequestList
    user.devloperconnectionRequestList = user.devloperconnectionRequestList.filter(id => id !== uid);
    // Add the uid to the projectsAsDeveloper array
    user.projectsAsDeveloper.push(uid);

    // Save the updated user document
    await user.save();

    return res.status(200).json({ message: 'Profile updated successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});
// Adjust the path as necessary

// POST API to add a developer to a post
router.post('/add-developer-to-post', async (req, res) => {
  const { uid, username } = req.body;

  try {
    // Find the post by uid
    const post = await Post.findOne({ uid });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the username is already in the developer array
    if (post.developer.includes(username)) {
      return res.status(400).json({ message: 'User is already a developer on this post' });
    }

    // Add the username to the developer array
    post.developer.push(username);

    // Save the updated post
    await post.save();

    res.status(200).json({ message: 'Developer added successfully', post });
  } catch (error) {
    console.error('Error adding developer:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


router.post('/remove-req-in-dev-profile', ensureAuthenticated, async (req, res) => {
  const { username, uid } = req.body;

  try {
    // Find the user by their username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the uid exists in the devloperconnectionRequestList array
    const requestIndex = user.devloperconnectionRequestList.indexOf(uid);

    if (requestIndex === -1) {
      return res.status(404).json({ message: 'UID not found in developer connection request list' });
    }

    // Remove the uid from the devloperconnectionRequestList
    user.devloperconnectionRequestList = user.devloperconnectionRequestList.filter(id => id !== uid);

    // Save the updated user document
    await user.save();

    return res.status(200).json({ message: 'Profile updated successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
