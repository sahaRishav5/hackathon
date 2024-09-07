const express = require('express');
const User = require('../models/RegistrationSchema'); // Ensure this path is correct
const router = express.Router();


//send follower request
router.post('/follow', async (req, res) => {
    const { email, followerList} = req.body; 
  
    try {
      const updatedPost = await User.findOneAndUpdate(
        { email }, 
        { $addToSet: { followerList} }, 
        { new: true } 
      );
  
      if (!updatedPost) {
        return res.status(404).json({ message: 'user not found' });
      }
  
      res.json({ message: 'followed sucessfully', post: updatedPost });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  });
  
  module.exports = router;

