const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const mongoose = require("mongoose"); // Import mongoose

const app = express();
app.use(cors());
app.use(express.json());

// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });

mongoose.connect("mongodb://localhost:27017/codingMentorshipDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the code block schema
const codeBlockSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
});

// Create the code block model
const CodeBlock = mongoose.model("CodeBlock", codeBlockSchema);

// API route to get code block by title
app.get("/codeblockpage/:title", async (req, res) => {
  const { title } = req.params;
  try {
    const codeBlock = await CodeBlock.findOne({ title }).exec();
    res.json(codeBlock);
  } catch (error) {
    console.error("Error fetching code block:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(3001, function () {
  console.log("Yay! Server is running");
});
