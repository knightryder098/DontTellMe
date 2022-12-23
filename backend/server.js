const express = require("express");
const cors = require("cors");
require("./connection");
const userRoutes = require("./routes/userRoutes");
const Message = require("./model/message");
const User = require("./model/user");
require("dotenv").config();

const app = express();

const rooms = ["general", "tech", "Finance"];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/users", userRoutes);

const server = require("http").createServer(app);
const PORT = process.env.PORT || 1515;
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});

const getLastMessageFromRoom = async (room) => {
  const roomMessages = await Message.aggregate([
    { $match: { to: room } },
    { $group: { _id: "$date", messageByDate: { $push: "$$ROOT" } } },
  ]);
  return roomMessages;
};

const sortRoomMessageByDate = (messages) => {
  return messages.sort((a, b) => {
    let date1 = a._id.split("/");
    let date2 = b._id.split("/");

    date1 = date1[2] + date1[0] + date1[1];
    date2 = date2[2] + date2[0] + date2[1];
    return date1 < date2 ? -1 : 1;
  });
};

//socket connection
io.on("connection", (socket) => {
  socket.on("new-user", async () => {
    const members = await User.find();
    io.emit("new-user", members);
  });

  socket.on("join-room", async (newRoom, prevRoom) => {
    // console.log("new room is "+ newRoom);
    // console.log("old room is " + prevRoom);
    
    socket.leave(prevRoom);
    socket.join(newRoom);
    
    let roomMessages = await getLastMessageFromRoom(newRoom);
    roomMessages = sortRoomMessageByDate(roomMessages);
    
    socket.emit("room-messages", roomMessages);
  });

  socket.on("message-room", async (room, content, sender, time, date) => {
    const newMessage = await Message.create({
      content,
      from: sender,
      time,
      date,
      to: room,
    });
    let roomMessage = await getLastMessageFromRoom(room);
    roomMessage = sortRoomMessageByDate(roomMessage);

    io.to(room).emit("room-messages", roomMessage);

    socket.broadcast.emit("notifications", room);
  });

  app.delete("/logout", async (req, res) => {
    try {
      const { _id, newMessages } = req.body;
      const user = await User.findById(_id);
      user.status = "offline";
      user.newMessages = newMessages;
      await user.save();

      const members = await User.find();
      socket.broadcast.emit("new-user", members);

      res.status(200).send();
    } catch (error) {
      console.log(error);
      res.status(400).send();
    }
  });
});

app.get("/rooms", (req, res) => {
  res.json(rooms);
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
