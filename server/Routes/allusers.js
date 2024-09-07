const express = require('express');
const User = require('../models/RegistrationSchema'); // Ensure this path is correct
const router = express.Router();



//get the list of all users of platform
router.get('/allusers', async (req, res) => {
  try {
    const userlist = [];
    const user = await User.find(); 
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    else
    {
        for(let i = 0; i<user.length; i++)
        {
            let email = user[i].email;
            let name = user[i].firstName + " " + user[i].lastName;
            let username = user[i].username;
            let pin = user[i].pinCode
            userlist.push({email: email, name: name, username: username, pinCode: pin});
        }
    }

    res.json(userlist);
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ message: 'Invalid token' });
  }
});

module.exports = router;
