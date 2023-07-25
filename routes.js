const CodeBlockModel = require("./codeBlockModel");
const express = require('express');

const router = express.Router();

router.get("/codeblockpage/:title", async (req, res) => {
    const { title } = req.params;
    
    try {
      const codeBlock = await CodeBlockModel.findOne({ title }).exec();
      res.json(codeBlock);
    } catch (error) {
      console.error("Error fetching code block:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  module.exports = router;