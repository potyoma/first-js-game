
                  /* here be the variables */

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let x = canvas.width/2;
let y = canvas.height-30;
let dx = 2;
let dy = -2;
let ballRadius = 10;
let paddleHeight = 10;
let paddleWidth = 200;
let paddleX = (canvas.width-paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;
let score = 0;
let brick = {
  rowCount: 3,
  columnCount: 5,
  width: 75,
  height: 20,
  padding: 10,
  offsetTop: 30,
  offsetLeft: 30 };
let lives = 3;

let bricks = [];
for(let c = 0; c < brick.columnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brick.rowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1};
  }
}


                /* let the code begin */

function keyDownHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = true;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false;
  }
}

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

function collisionDetection() {
    for(var c=0; c<brick.columnCount; c++) {
        for(let r=0; r<brick.rowCount; r++) {
            let b = bricks[c][r];
            if(b.status == 1) {
              if(x > b.x && x < b.x+brick.width && y > b.y && y < b.y+brick.height) {
                  dy = -dy;
                  b.status = 0;
                  score++;
                  if(score == brick.rowCount*brick.columnCount) {
                        alert("YOU WIN, CONGRATULATIONS!");
                        document.location.reload();
                        requestAnimationFrame(draw);
                  }
            }
        }
    }
  }
}

function drawScore() {
  ctx.font = `16px Roboto`;
  ctx.fillStyle = `#0095DD`;
  ctx.fillText(`Score: ` + score, 8, 20);
}

function drawBricks() {
  for(let c = 0; c<brick.columnCount; c++) {
    for(let r = 0; r<brick.rowCount; r++) {
      if(bricks[c][r].status == 1) {
        let brickX = c*(brick.width + brick.padding) + brick.offsetLeft;
        let brickY = r*(brick.height + brick.padding) + brick.offsetTop;

        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brick.width, brick.height);
        ctx.fillStyle = `#0095DD`;
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPaddle();
  drawBall();
  drawBricks();
  collisionDetection();
  drawScore();
  drawLives();

  if(y + dy < ballRadius) {
    dy = -dy;
  } else if(y + dy > canvas.height-ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = - dy;
    } else {
      lives--;
      if(!lives) {
        alert("GAME OVER");
        document.location.reload();
        requestAnimationFrame(draw);
      } else {
      x = canvas.width/2;
      y = canvas.height-30;
      dx = 2;
      dy = -2;
      paddleX = (canvas.width-paddleWidth)/2;
      }
    }
  }
  if(x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = - dx;
  }

  x += dx;
  y += dy;

  if(rightPressed && paddleX < canvas.width-paddleWidth) {
    paddleX += 7;
  }
  else if(leftPressed && paddleX > 0) {
    paddleX -= 7;
  }
  requestAnimationFrame(draw);
}

draw();
