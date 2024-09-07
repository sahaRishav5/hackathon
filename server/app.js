const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const registerRoute = require('./Routes/route');
const loginRoute = require('./Routes/route'); 
const postroute = require('./Routes/PostData');
const addDeveloper = require('./Routes/PostData');
const me = require('./Routes/userData');
const allusers = require('./Routes/allusers');
const mypost = require('./Routes/mypostList');
const follow = require('./Routes/follow');
const user = require('./Routes/user');
const postdetails = require('./Routes/Projectdetails');
const chatRoutes = require('./Routes/Chat'); // Adjust the path as needed
const reqmangement = require('./Routes/RequestMangement');
const Calander = require('./Routes/Calander');
const ProjectDashboard = require('./Routes/ProjectDashBoardReqMangement')
const chatboxNormal = require('./Routes/chatboxNormal');

require('dotenv').config();

// Create the Express app
const app = express();
const server = http.createServer(app);




// Use middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
require("./db/conn");

// Use routes
const port = 8008;
app.use('/api', registerRoute); // Prefix routes with /api
app.use('/api', loginRoute);    // Prefix routes with /api
app.use('/api', me); 
app.use('/api', postroute);  
app.use('/api', allusers);  
app.use('/api', mypost);  
app.use('/api', addDeveloper); 
app.use('/api', follow); 
app.use('/api', user);
app.use('/api', postdetails);
app.use('/api', chatRoutes);
app.use('/api', reqmangement);
app.use('/api', Calander);
app.use('/api', ProjectDashboard);
app.use('/api', chatboxNormal);

// Start the server
server.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${port}`);
  });