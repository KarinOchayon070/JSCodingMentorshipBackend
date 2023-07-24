const CodeBlockModel = require("./codeBlockModel");

let mentorSocketId = null;

const socketMethods = (io) => {
  io.on("connection", (socket) => {

    if (!mentorSocketId) {
      mentorSocketId = socket.id;
    }

    socket.on("mentorStatus", () => {
      socket.emit("getMentorStatus", socket.id === mentorSocketId); 
    });

    socket.on("disconnect", () => {
      if (mentorSocketId === socket.id) {
        mentorSocketId = null;
      }
    });

    socket.on("codeBlockChange", async (data) => {
      try {
        const { title, code } = data;
        const codeBlock = await CodeBlockModel.findOneAndUpdate(
          { title },
          { code },
          { new: true }
        ).exec();
        socket.broadcast.emit("codeBlockUpdated", codeBlock);
      } catch (error) {
        console.error("Error updating code block:", error);
      }
    });
  });
};

module.exports = socketMethods;
