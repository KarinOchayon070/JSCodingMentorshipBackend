const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");
const socketMethods = require("./socketMethods");
const routes = require("./routes");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Update this to match your frontend URL
    methods: ["GET", "POST"],
  },
});

mongoose.connect("mongodb://localhost:27017/codingMentorshipDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/", routes);
socketMethods(io);

server.listen(3001, () => {
  console.log("Yay! Server is running");
});
