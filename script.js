const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const paddle = {
  width: 100,
  height: 10,
  x: (canvas.width - 100) / 2,
  speed: 7,
  dx: 0,
};

const ball = {
  x: canvas.width / 2,
  y: canvas.height - 30,
  size: 10,
  speedX: 4,
  speedY: -4,
};

function drawPaddle() {
  ctx.fillStyle = "#fff";
  ctx.fillRect(paddle.x, canvas.height - paddle.height - 10, paddle.width, paddle.height);
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = "#fff";
  ctx.fill();
  ctx.closePath();
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPaddle();
  drawBall();
}

setInterval(render, 1000 / 60);
