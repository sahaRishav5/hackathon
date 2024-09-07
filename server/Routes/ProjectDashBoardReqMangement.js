const express = require('express');
const router = express.Router();
const Post = require('../models/Post'); 
const User = require('../models/RegistrationSchema'); // Assuming the schema is in the 'models' folder

// POST API to assign developer
router.post('/assign-developer-to-project', async (req, res) => {
  const { uid, username } = req.body;

  try {
    // Find the post by uid
    const post = await Post.findOne({ uid });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the username exists in the developerRequest array
    const developerRequestIndex = post.developerRequest.indexOf(username);

    if (developerRequestIndex === -1) {
      return res.status(400).json({ message: 'User not found in developer request list' });
    }

    // Remove the username from developerRequest
    post.developerRequest.splice(developerRequestIndex, 1);

    // Add the username to developer
    if (!post.developer.includes(username)) {
      post.developer.push(username);
    }

    // Save the updated post
    await post.save();

    res.status(200).json({ message: 'Developer assigned successfully', post });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// POST API to assign a project to a developer
router.post('/assign-project-to-devloper', async (req, res) => {
  const { uid, username } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the uid is already in the projectsAsDeveloper array
    if (!user.projectsAsDeveloper.includes(uid)) {
      // Add the uid to the projectsAsDeveloper array
      user.projectsAsDeveloper.push(uid);
      
      // Save the updated user
      await user.save();

      return res.status(200).json({ message: 'UID added to projectsAsDeveloper', user });
    } else {
      return res.status(400).json({ message: 'UID already exists in projectsAsDeveloper' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// POST API to assign mentor
router.post('/assign-mentor-to-project', async (req, res) => {
  const { uid, username } = req.body;

  try {
    // Find the post by uid
    const post = await Post.findOne({ uid });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the username exists in the mentorRequest array
    const mentorRequestIndex = post.mentorRequest.indexOf(username);

    if (mentorRequestIndex === -1) {
      return res.status(400).json({ message: 'User not found in mentor request list' });
    }

    // Remove the username from mentorRequest
    post.mentorRequest.splice(mentorRequestIndex, 1);

    // Add the username to mentor
    if (!post.mentor.includes(username)) {
      post.mentor.push(username);
    }

    // Save the updated post
    await post.save();

    res.status(200).json({ message: 'Mentor assigned successfully', post });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// POST API to store a click (projectId) in recentProjectViews[]
router.post('/storeclick', async (req, res) => {
  const { username, catogery } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Add the projectId to recentProjectViews arr
    user.recentProjectViews.push(catogery);

    // Save the updated user
    await user.save();

    res.status(200).json({ message: 'ProjectId added to recentProjectViews', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
