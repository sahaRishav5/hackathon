const express = require('express');
const Post = require('../models/Post');
const router = express.Router();

// Get all my post list data and send response
router.post('/mypost', async (req, res) => {
    const { username } = req.body;

    try {
        // Find posts by username with case insensitivity
        const posts = await Post.find({ username: new RegExp(`^${username}$`, 'i') });
        
        // Check if no posts were found
        if (posts.length === 0) {
            return res.status(400).json({ message: "No posts found" });
        }
        
        // Respond with the posts
        res.json(posts);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;
