// Simple Socket.IO server for a two-player Pong game.
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3001;

app.use(express.static('public/pong'));

const players = {};

io.on('connection', socket => {
  let role = 'spectator';
  if (!players.player1) {
    players.player1 = socket.id;
    role = 'player1';
  } else if (!players.player2) {
    players.player2 = socket.id;
    role = 'player2';
  }

  socket.emit('role', role);
  console.log(`Client ${socket.id} connected as ${role}`);

  socket.on('paddleMove', data => {
    socket.broadcast.emit('paddleMove', { role, y: data.y });
  });

  socket.on('disconnect', () => {
    if (players.player1 === socket.id) delete players.player1;
    if (players.player2 === socket.id) delete players.player2;
    console.log(`Client ${socket.id} disconnected`);
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
