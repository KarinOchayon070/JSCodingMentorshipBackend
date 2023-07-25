const CodeBlockModel = require("./codeBlockModel");
const express = require('express');

const router = express.Router();

// Define a route to handle GET requests for fetching a specific code block.
router.get("/codeblockpage/:title", async (req, res) => {
    const { title } = req.params;
    
    try {
      // Find the code block in the database using the CodeBlockModel based on the provided title.
      const codeBlock = await CodeBlockModel.findOne({ title }).exec();
      // Respond with the fetched code block in JSON format.
      res.json(codeBlock);
    } catch (error) {
      // If there's an error during the fetch process, log the error and respond with a 500 status code and an error message.
      console.error("Error fetching code block:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  module.exports = router;