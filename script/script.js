let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

function square(color, coordinates) {   /*color: hex as string; coordinates: array of left-position, top-position, width, height*/
  ctx.beginPath();
  ctx.rect(coordinates[0], coordinates[1], coordinates[2], coordinates[3]);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}

function round(color, coordinates) {  /*color: same as aquare; coordinates: array[x, y, radius, start angle, end angle, direction(false - clockwise, true - reverse)]*/
  ctx.beginPath();
  ctx.arc(240, 160, 20, 0, Math.PI*2, false);
  ctx.fillStyle = "green";
  ctx.fill();
  ctx.closePath();
}

let x = canvas.width/2;
let y = canvas.height-30;
let dx = 2;
let dy = -2;
let ballRadius = 10;
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width-paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();

  if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
  }
  if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
        dy = -dy;
  }

  if(rightPressed) {
        paddleX += 7;
        if (paddleX + paddleWidth > canvas.width){
            paddleX = canvas.width - paddleWidth;
        }
  }
    else if(leftPressed) {
        paddleX -= 7;
        if (paddleX < 0){
            paddleX = 0;
        }
  }
    
  x += dx;
  y += dy;
}


document.addEventListener("keydown", keyDownHandler, false);
function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

document.addEventListener("keyup", keyUpHandler, false);
function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}
setInterval(draw, 10);
