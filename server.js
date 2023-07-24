const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");
const socketMethods = require("./socketMethods");
const routes = require("./routes");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "https://js-coding-mentorship-frontend.onrender.com"], 
    methods: ["GET"],
  },
});

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@costmanager.tqoiuuv.mongodb.net/codingMentorshipDB`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/", routes);
socketMethods(io);

const PORT = process.env.PORT || 3001 

server.listen(PORT, () => {
  console.log("Yay! Server is running");
});
