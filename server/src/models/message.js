const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema({
  senderUsername: { type: String, required: true },
  recipientUsername: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Message", MessageSchema);
