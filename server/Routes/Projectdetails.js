const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Get Post details by uid
router.get('/post/:uid', async (req, res) => {
  const { uid } = req.params;

  try {
    const post = await Post.findOne({ uid }); // Find Post by uid

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(post); // Return Post details
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
