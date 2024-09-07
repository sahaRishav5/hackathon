const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // Additional fields that can be updated later
  education: String,
  college: String,
  department: String,
  city: String,
  pinCode: String,
  address: String,
  linkedinId: String,
  githubId: String,
  portfolioWebsite: String,
  mobileNumber: String,
  jobRole: String,
  company: String,
  skills: [String],
  preferredProjectType: String,
  hobbies: [String],
  projectLinks: [String],

  // Algorithm-generated and otgvher fields
  uniqueId: String,
  devloperconnectionList: [String],
  devloperconnectionRequestList: [String],
  mentorconnectionList: [String],
  mentorconnectionRequestList: [String],
  followerList: [String],
  followerRequestList: [String],
  workRequestList: [String],
  projectIdeasPosted: [String],
  projectsAsDeveloper: [String],
  projectsAsMentor: [String],
  userRewardsBadges: [String],
  recentProjectViews: [String],
  recentProfileViews: [String],
  recentPostLikes: [String],
  recentProfileLikes: [String],
  profileLikes: Number,
  mentorLikes: Number,
  developerLikes: Number,
  developerRating: Number,
  mentorRating: Number,
  userPoints: Number,
  projectPreferences: [String],
  profilePreferences: [String],
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
