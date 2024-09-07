const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

// Define the message schema for the chatbox
const messageSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
}, { _id: false });

// Define the main post schema
const postSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  keyskills: {
    type: [String],
    required: true,
  },
  developerRequest: {
    type: [String], // Array of usernames or user IDs requesting to be developers
    default: [],
  },
  mentorRequest: {
    type: [String], // Array of usernames or user IDs requesting to be mentors
    default: [],
  },
  developer: {
    type: [String], // Array of assigned developers' usernames
    default: [],
  },
  mentor: {
    type: [String], // Array of assigned mentors' usernames
    default: [],
  },
  githubLink: {
    type: String,
    default: '',
  },
  uid: {
    type: String,
    default: () => uuidv4().slice(0, 8), // Takes the first 8 characters of the UUID
    unique: true,
  },
  chatbox: {
    type: [messageSchema], // Array of messages within the chatbox
    default: [],
  },
  noticebox: {
    type: [String], // Array for storing notices or announcements
    default: [],
  },
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
