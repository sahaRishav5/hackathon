const express = require('express');
const Post = require('../models/Post');


const router = express.Router();
//create post
router.post('/post', async (req, res) => {
  

  const { username, title, description, category, language, keyskills, developer} = req.body;
  const dev = req.body.username;
  developer.push(dev);
  try {
    let postData = new Post({
      username,
      title,
      description,
      category,
      language,
      keyskills,
      developer,
    });

    // Save the user to the database
    await postData.save();
    console.log(postData);
    res.status(201).json({ message: "post uploaded sucessfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});


//get all post list data and send response
router.get('/getposts', async (req, res) => {
  try {
    const posts = await Post.find(); // Fetch all posts from the database
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});






// adds dev

router.post('/post/addDeveloper', async (req, res) => {
  const { uid, developerRequest } = req.body; 

  try {
    const updatedPost = await Post.findOneAndUpdate(
      { uid }, 
      { $addToSet: { developerRequest } }, 
      { new: true } 
    );

    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json({ message: 'Developer added successfully', post: updatedPost });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});




router.post('/post/addMentor', async (req, res) => {
  const { uid, mentorRequest } = req.body; 

  try {
    const updatedPost = await Post.findOneAndUpdate(
      { uid }, 
      { $addToSet: { mentorRequest } }, 
      { new: true } 
    );

    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json({ message: 'mentor added successfully', post: updatedPost });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;