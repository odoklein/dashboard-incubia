const socket = io();
let role = null;
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const paddleHeight = 80;
const paddleWidth = 10;
const paddleSpeed = 5;

let leftY = canvas.height / 2 - paddleHeight / 2;
let rightY = canvas.height / 2 - paddleHeight / 2;

socket.on('role', r => { role = r; });

socket.on('paddleMove', data => {
  if (data.role === 'player1') leftY = data.y;
  if (data.role === 'player2') rightY = data.y;
});

document.addEventListener('keydown', e => {
  if (role === 'spectator') return;
  if (e.key === 'ArrowUp') move(-paddleSpeed);
  if (e.key === 'ArrowDown') move(paddleSpeed);
});

function move(delta) {
  if (role === 'player1') {
    leftY = Math.max(0, Math.min(canvas.height - paddleHeight, leftY + delta));
    socket.emit('paddleMove', { y: leftY });
  }
  if (role === 'player2') {
    rightY = Math.max(0, Math.min(canvas.height - paddleHeight, rightY + delta));
    socket.emit('paddleMove', { y: rightY });
  }
}

function draw() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'white';
  ctx.fillRect(10, leftY, paddleWidth, paddleHeight);
  ctx.fillRect(canvas.width - 20, rightY, paddleWidth, paddleHeight);

  requestAnimationFrame(draw);
}

draw();
