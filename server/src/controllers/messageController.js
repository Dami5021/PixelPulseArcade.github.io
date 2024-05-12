const Message = require("../models/message");

const getMessagesForUser = async (recipientUsername) => {
  try {
    const messages = await Message.find({ recipientUsername });

    return messages;
  } catch (error) {
    console.error('Error retrieving messages:', error.message);
    throw error;
  }
};

const sendMessage = async (senderUsername, recipientUsername, message) => {
  try {
    const sender = await User.findOne({ username: senderUsername });
    const recipient = await User.findOne({ username: recipientUsername });

    if (!sender || !recipient) {
      throw new Error('Sender or recipient not found');
    }

    const newMessage = await Message.create({
      senderUsername: sender.username,
      recipientUsername: recipient.username,
      message,
    });

    return newMessage;
  } catch (error) {
    console.error('Error sending message:', error.message);
    throw error;
  }
};

module.exports = {
  getMessagesForUser,
  sendMessage,
};
