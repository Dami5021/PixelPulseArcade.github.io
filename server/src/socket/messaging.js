const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const messageController = require('./controllers/messageController');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const userConnections = {};

io.on('connection', (socket) => {
  socket.on('sendMessage', async (data) => { 
    try {
      const newMessage = await messageController.sendMessage(data.senderUsername, data.recipientUsername, data.message);
      const recipientSocket = userConnections[data.recipientUsername];
      if (recipientSocket) {
        recipientSocket.emit('message', newMessage);
      }
    } catch (error) {
      console.error('Error sending message:', error.message);
    }
  });

  socket.on('disconnect', () => {
    const disconnectedUsername = Object.keys(userConnections).find(
      (username) => userConnections[username] === socket
    );
    if (disconnectedUsername) {
      delete userConnections[disconnectedUsername];
    }
  });

  socket.on('userConnected', (username) => {
    userConnections[username] = socket;
  });
});
