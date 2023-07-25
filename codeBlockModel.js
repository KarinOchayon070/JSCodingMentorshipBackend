const mongoose = require("mongoose");

const codeBlockSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    solution: {
      type: String,
      required: true,
    },
  });
  
  const CodeBlockModel = mongoose.model("CodeBlock", codeBlockSchema)
  
  module.exports = CodeBlockModel;
