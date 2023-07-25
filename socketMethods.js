const CodeBlockModel = require("./codeBlockModel");

let mentorSocketId = null;

// Socket.IO methods for handling events related to mentorship and code block changes.
const socketMethods = (io) => {
  io.on("connection", (socket) => {

    // When a new user (socket) connects, check if the mentor socket ID is not already set, and if not, set it to the current socket ID.
    if (!mentorSocketId) {
      mentorSocketId = socket.id;
    }

     // Event handler for "mentorStatus" event, emits "getMentorStatus" event to the current socket with a boolean indicating
     // if it's the mentor or not.
    socket.on("mentorStatus", () => {
      socket.emit("getMentorStatus", socket.id === mentorSocketId); 
    });

    // Event handler for "disconnect" event, clears the mentorSocketId if the disconnecting socket was the mentor.
    socket.on("disconnect", () => {
      if (mentorSocketId === socket.id) {
        mentorSocketId = null;
      }
    });

     // Updates the code and solution for a specific code block in the database.
     // Emits "codeBlockUpdated" event to all connected sockets with the updated code block data.
    socket.on("codeBlockChange", async (data) => {
      try {
        const { title, code , solution} = data;
        const codeBlock = await CodeBlockModel.findOneAndUpdate(
          { title },
          { code, solution },
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
