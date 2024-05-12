const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// Route to send a message
router.post('/send', async (req, res) => {
  const { senderUsername, recipientUsername, message } = req.body;
  try {
    const newMessage = await messageController.sendMessage(senderUsername, recipientUsername, message);
    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error sending message:', error.message);
    res.status(500).json({ message: 'Error sending message' });
  }
});

// retrieving messages for a user
router.get('/user/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const messages = await messageController.getMessagesForUser(username);
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error retrieving messages:', error.message);
    res.status(500).json({ message: 'Error retrieving messages' });
  }
});

module.exports = router;
