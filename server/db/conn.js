const mongoose = require("mongoose");

const DB = "mongodb+srv://debabratodas930:8210003751@userdata.qstgd1w.mongodb.net/Mentor?retryWrites=true&w=majority&appName=Userdata";



mongoose.connect(DB,{
}).then(()=>console.log("connection start")).catch((error)=> console.log(error.message));