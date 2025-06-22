const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const brick = {
  rowCount: 3,
  columnCount: 6,
  width: 100,
  height: 20,
  padding: 10,
  offsetTop: 50,
  offsetLeft: 35,
};

let bricks = [];
for (let c = 0; c < brick.columnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brick.rowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

function drawBricks() {
  for (let c = 0; c < brick.columnCount; c++) {
    for (let r = 0; r < brick.rowCount; r++) {
      if (bricks[c][r].status === 1) {
        const brickX = c * (brick.width + brick.padding) + brick.offsetLeft;
        const brickY = r * (brick.height + brick.padding) + brick.offsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.fillStyle = "#00f";
        ctx.fillRect(brickX, brickY, brick.width, brick.height);
      }
    }
  }
}

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
  drawBricks();
  drawPaddle();
  drawBall();
}

function movePaddle() {
  paddle.x += paddle.dx;
  if (paddle.x < 0) paddle.x = 0;
  if (paddle.x + paddle.width > canvas.width) {
    paddle.x = canvas.width - paddle.width;
  }
}

function moveBall() {
  ball.x += ball.speedX;
  ball.y += ball.speedY;

  if (ball.x < ball.size || ball.x > canvas.width - ball.size) ball.speedX *= -1;
  if (ball.y < ball.size) ball.speedY *= -1;

  if (
    ball.y + ball.size > canvas.height - paddle.height - 10 &&
    ball.x > paddle.x &&
    ball.x < paddle.x + paddle.width
  ) {
    ball.speedY *= -1;
  }

  if (ball.y > canvas.height) {
    resetGame();
  }
}

function collisionDetection() {
  for (let c = 0; c < brick.columnCount; c++) {
    for (let r = 0; r < brick.rowCount; r++) {
      const b = bricks[c][r];
      if (b.status === 1) {
        if (
          ball.x > b.x &&
          ball.x < b.x + brick.width &&
          ball.y > b.y &&
          ball.y < b.y + brick.height
        ) {
          ball.speedY *= -1;
          b.status = 0;
        }
      }
    }
  }
}

function resetGame() {
  // Reiniciar la pelota
  ball.x = canvas.width / 2;
  ball.y = canvas.height - 30;
  ball.speedX = 4;
  ball.speedY = -4;

  paddle.x = (canvas.width - paddle.width) / 2;
  paddle.dx = 0;

  for (let c = 0; c < brick.columnCount; c++) {
    for (let r = 0; r < brick.rowCount; r++) {
      bricks[c][r].status = 1;
    }
  }
}

function update() {
  movePaddle();
  moveBall();
  collisionDetection();
  render();
}

function keyDown(e) {
  if (e.key === "ArrowRight") {
    paddle.dx = paddle.speed;
  } else if (e.key === "ArrowLeft") {
    paddle.dx = -paddle.speed;
  }
}

function keyUp(e) {
  if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
    paddle.dx = 0;
  }
}

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

// Iniciar bucle del juego
setInterval(update, 1000 / 60);
