const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/RegistrationSchema'); // Ensure this path is correct
const router = express.Router();


//get my details
router.get('/me', async (req, res) => {
  try {
    // Get the token from the headers
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'No token provided' });
    }
    
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Token is missing' });
    }
    //test
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find the user by ID (extracted from token)
    const user = await User.findById(decoded.id).select('-password'); // Exclude password from the returned data
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Return user data
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ message: 'Invalid token' });
  }
});

module.exports = router;
