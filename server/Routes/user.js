const express = require('express');
const router = express.Router();
const User = require('../models/RegistrationSchema');
// Get user details by username
router.get('/user/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username }); // Find user by username

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user); // Return user details
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
