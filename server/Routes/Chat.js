const express = require('express');
const router = express.Router();
const Post = require('../models/Post'); // Adjust the path according to your project structure

// POST endpoint to send a message
router.post('/posts/:postUid/messages', async (req, res) => {
  const { postUid } = req.params;
  const { username, message } = req.body;

  if (!username || !message) {
      return res.status(400).json({ error: 'Username and message are required' });
  }

  try {
      // Find the post by UID
      const post = await Post.findOne({ uid: postUid });

      if (!post) {
          return res.status(404).json({ error: 'Post not found' });
      }

      // Create a new message object
      const newMessage = {
          username,
          message,
          timestamp: new Date()
      };

      // Add the new message to the chatbox
      post.chatbox.push(newMessage);
      await post.save();

      // Send a success response with the new message
      res.status(200).json(newMessage);
  } catch (error) {
      console.error('Error sending message:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/posts/:postUid/messages', async (req, res) => {
  const { postUid } = req.params;

  try {
      // Find the post by UID
      const post = await Post.findOne({ uid: postUid });

      if (!post) {
          return res.status(404).json({ error: 'Post not found' });
      }

      // Send the chatbox messages
      res.status(200).json(post.chatbox);
  } catch (error) {
      console.error('Error fetching messages:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
