const express = require("express");
const cors=require('cors')
require('dotenv').config()
const app = express();

const room = ["general", "tech", "Finance"];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const server = require("http").createServer(app);
const PORT=process.env.PORT|1515;
const io=require('socket.io')(server,{
  cors:{
    origin:'http://localhost:3000',
    methods:['GET','POST']
  }
})


server.listen(PORT,()=>console.log(`Listening on port ${PORT}`))