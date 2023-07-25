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

// Create an HTTP server using the Express app.
const server = http.createServer(app);
const io = new Server(server, {
  // Configure CORS options for the socket.io server.
  cors: {
    origin: ["http://localhost:3000", "https://js-coding-mentorship-frontend.onrender.com"], 
    methods: ["GET"],
  },
});

// Connect to the MongoDB database using Mongoose.
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@costmanager.tqoiuuv.mongodb.net/codingMentorshipDB`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Mount the custom routes to the application, handling API endpoints.
app.use("/", routes);
// Set up custom socket.io methods for handling real-time communication.
socketMethods(io);

const PORT = process.env.PORT || 3001 

server.listen(PORT, () => {
  console.log(`Yay! Server is running on port ${PORT}`);
});
