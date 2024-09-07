const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/RegistrationSchema');
const jwt = require('jsonwebtoken'); // For token-based authentication

const router = express.Router();

// Register Route
router.post('/register', async (req, res) => {
  const { firstName, lastName, dateOfBirth, email, username, password } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    user = new User({
      firstName,
      lastName,
      dateOfBirth,
      email,
      username,
      password: hashedPassword,
    });

    // Save the user to the database
    await user.save();
    console.log(user);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Respond with the token and user info (excluding password)
    res.json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// API to add/update additional user details
router.put('/update-details', async (req, res) => {
  const {
    username,
    education,
    college,
    department,
    city,
    pinCode,
    address,
    linkedinId,
    githubId,
    portfolioWebsite,
    mobileNumber,
    jobRole,
    company,
    skills,
    preferredProjectType,
    hobbies
  } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });

    // If user not found, return an error
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user details
    user.education = education || user.education;
    user.college = college || user.college;
    user.department = department || user.department;
    user.city = city || user.city;
    user.pinCode = pinCode || user.pinCode;
    user.address = address || user.address;
    user.linkedinId = linkedinId || user.linkedinId;
    user.githubId = githubId || user.githubId;
    user.portfolioWebsite = portfolioWebsite || user.portfolioWebsite;
    user.mobileNumber = mobileNumber || user.mobileNumber;
    user.jobRole = jobRole || user.jobRole;
    user.company = company || user.company;
    user.skills = skills || user.skills;
    user.preferredProjectType = preferredProjectType || user.preferredProjectType;
    user.hobbies = hobbies || user.hobbies;

    // Save updated user details to the database
    await user.save();

    res.status(200).json({ message: 'User details updated successfully', user });
  } catch (error) {
    console.error('Error updating user details:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Send developer connection request to a user
router.post('/add-connection-request-userprofile', async (req, res) => {
  try {
    const { username, uid } = req.body;

    // Check if username and uid are provided
    if (!username || !uid) {
      return res.status(400).json({ message: 'Username and UID are required.' });
    }

    // Find the user by their username
    const user = await User.findOne({ username });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Check if the UID is already in the developerConnectionRequestList
    if (user.devloperconnectionRequestList.includes(uid)) {
      return res.status(400).json({ message: 'UID is already in the connection request list.' });
    }

    // Push the UID to the developerConnectionRequestList
    user.devloperconnectionRequestList.push(uid);

    // Save the updated user document
    await user.save();

    // Send success response
    return res.status(200).json({ message: 'Connection request added successfully.' });
  } catch (error) {
    console.error('Error adding connection request:', error.message);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

// Send mentor connection request to a user
router.post('/add-mentorconnection-request-userprofile', async (req, res) => {
  try {
    const { username, uid } = req.body;

    // Check if username and uid are provided
    if (!username || !uid) {
      return res.status(400).json({ message: 'Username and UID are required.' });
    }

    // Find the user by their username
    const user = await User.findOne({ username });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Check if the UID is already in the mentorConnectionRequestList
    if (user.mentorconnectionRequestList.includes(uid)) {
      return res.status(400).json({ message: 'UID is already in the connection request list.' });
    }

    // Push the UID to the mentorConnectionRequestList
    user.mentorconnectionRequestList.push(uid);

    // Save the updated user document
    await user.save();

    // Send success response
    return res.status(200).json({ message: 'Connection request added successfully.' });
  } catch (error) {
    console.error('Error adding connection request:', error.message);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

module.exports = router;
